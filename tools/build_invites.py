#!/usr/bin/env python3
"""Build the invitation site: one page per guest. Without a guest's code there is no invitation.

The guest list is confidential and never committed. It is read from the
GUESTS_CSV environment variable (the deploy workflow passes a repository
secret) or from a local guests.csv. Messages name row numbers only, never
guests, because deploy logs on this repository are public.
"""
import argparse
import csv
import html
import io
import os
import re
import secrets
import shutil
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SITE_URL = "https://mcmuralishclint.github.io"
COLUMNS = ["code", "names", "events", "party"]
CODE_ALPHABET = "abcdefghjkmnpqrstuvwxyz23456789"  # no look-alikes (i, l, o, 0, 1)
CODE_PATTERN = re.compile(r"^[a-z0-9]{4,12}$")

WEDDING_DESCRIPTION = (
    "Wedding: Friday, 12 February 2027, 9 am, Sri Ponnambalavaneswarar Kovil, Kochchikade. "
    "Reception: Saturday, 13 February 2027, 7 pm, Pegasus Reef Hotel, Wattala."
)
RECEPTION_DESCRIPTION = "Saturday, 13 February 2027, 7 pm onwards. Pegasus Reef Hotel, Wattala."


class GuestListError(Exception):
    pass


def parse_guests(text):
    """Return the guest rows from CSV text, validated. Codes may be blank."""
    reader = csv.DictReader(io.StringIO(text.lstrip("﻿")))
    headers = [(h or "").strip().lower() for h in (reader.fieldnames or [])]
    missing = [c for c in COLUMNS if c not in headers]
    if missing:
        raise GuestListError("The guest list is missing the column(s): " + ", ".join(missing))
    reader.fieldnames = headers
    guests, seen = [], set()
    for number, row in enumerate(reader, start=2):
        row = {k: (v or "").strip() for k, v in row.items() if k}
        if not any(row.values()):
            continue
        code, events, party = row["code"].lower(), row["events"].lower(), row["party"]
        if not row["names"]:
            raise GuestListError(f"Row {number}: 'names' is empty.")
        if events not in ("both", "reception"):
            raise GuestListError(f"Row {number}: 'events' must be 'both' or 'reception'.")
        if party not in ("1", "2"):
            raise GuestListError(f"Row {number}: 'party' must be 1 or 2.")
        if code:
            if not CODE_PATTERN.match(code):
                raise GuestListError(f"Row {number}: 'code' must be 4 to 12 letters or digits.")
            if code in seen:
                raise GuestListError(f"Row {number}: 'code' is used by an earlier row.")
            seen.add(code)
        guests.append({"code": code, "names": row["names"], "events": events, "party": int(party)})
    return guests


def assign_codes(guests):
    """Give every guest without a code a new one. Existing codes never change."""
    used = {g["code"] for g in guests if g["code"]}
    added = 0
    for guest in guests:
        if guest["code"]:
            continue
        while True:
            code = "".join(secrets.choice(CODE_ALPHABET) for _ in range(6))
            if code not in used:
                break
        guest["code"] = code
        used.add(code)
        added += 1
    return added


def guest_url(code):
    return f"{SITE_URL}/i/{code}/"


def render(template, guest):
    """Render the invitation page for one guest."""
    both = guest["events"] == "both"
    flags = {"both": both, "reception": not both, "couple": guest["party"] == 2}

    def block(match):
        return match.group(2) if flags[match.group(1)] else ""

    page = re.sub(r"<!--if:(\w+)-->(.*?)<!--/if:\1-->", block, template, flags=re.S)

    names = guest["names"]
    occasion = "Wedding" if both else "Wedding Reception"
    values = {
        "names": names,
        "url": guest_url(guest["code"]),
        "title": f"Muralish & Loshini {occasion}",
        "og_title": f"{names}, you are invited | Muralish & Loshini | {occasion}",
        "description": WEDDING_DESCRIPTION if both else RECEPTION_DESCRIPTION,
        "countdown": "2027-02-12T09:00:00+05:30" if both else "2027-02-13T19:00:00+05:30",
        "invite_label": "Wedding and reception" if both else "Reception only",
        "hero_lead": "You are invited to the wedding & reception of" if both
        else "You are invited to the wedding reception of",
        "invited_line": "You are invited to the wedding ceremony and the reception."
        if both else "You are invited to the wedding reception.",
    }
    page = re.sub(r"\{\{(\w+)\}\}", lambda m: html.escape(values[m.group(1)], quote=True), page)
    if "<!--if:" in page or "<!--/if:" in page:
        raise ValueError("The template has an unmatched <!--if:...--> block.")
    return page


def build(guests, out_dir, site_dir=ROOT / "site", template_path=ROOT / "templates" / "invite.html"):
    """Write the whole site to out_dir: the files in site/ plus a page for each guest."""
    if any(not g["code"] for g in guests):
        raise GuestListError("Some rows have no code. Run with --assign-codes on your computer first.")
    template = Path(template_path).read_text(encoding="utf-8")
    out_dir = Path(out_dir)
    if out_dir.exists():
        shutil.rmtree(out_dir)
    shutil.copytree(site_dir, out_dir)
    for guest in guests:
        page_dir = out_dir / "i" / guest["code"]
        page_dir.mkdir(parents=True)
        (page_dir / "index.html").write_text(render(template, guest), encoding="utf-8")


def write_csv(path, header, rows):
    with open(path, "w", newline="", encoding="utf-8") as handle:
        writer = csv.writer(handle)
        writer.writerow(header)
        writer.writerows(rows)


def main(argv=None):
    parser = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    parser.add_argument("--guests", type=Path, help="guest list file (default: $GUESTS_CSV, then guests.csv)")
    parser.add_argument("--out", type=Path, default=ROOT / "_site", help="output folder (default: _site)")
    parser.add_argument("--assign-codes", action="store_true",
                        help="fill in blank codes in the guest list file and write guest-links.csv")
    args = parser.parse_args(argv)

    path = args.guests or ROOT / "guests.csv"
    try:
        if args.guests or args.assign_codes or not os.environ.get("GUESTS_CSV"):
            text = path.read_text(encoding="utf-8-sig") if path.exists() else ""
            if args.assign_codes and not path.exists():
                raise GuestListError(f"{path} does not exist.")
        else:
            text = os.environ["GUESTS_CSV"]
        guests = parse_guests(text) if text.strip() else []

        if args.assign_codes:
            added = assign_codes(guests)
            write_csv(path, COLUMNS, [[g["code"], g["names"], g["events"], g["party"]] for g in guests])
            links = path.with_name("guest-links.csv")
            write_csv(links, ["names", "events", "link"],
                      [[g["names"], g["events"], guest_url(g["code"])] for g in guests])
            print(f"Added {added} new code(s). Links are in {links.name}.")

        build(guests, args.out)
    except GuestListError as error:
        print(f"Guest list problem: {error}", file=sys.stderr)
        return 1
    wedding = sum(1 for g in guests if g["events"] == "both")
    print(f"Built {len(guests)} invitation(s): "
          f"{wedding} wedding and reception, {len(guests) - wedding} reception only.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
