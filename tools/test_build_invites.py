import sys
import tempfile
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
import build_invites as b  # noqa: E402

# Made-up guests. Real names never belong in this repository.
SAMPLE = (
    "code,names,events,party\n"
    "aaaa22,Asha & Ravi,both,2\n"
    "bbbb33,Meena,reception,1\n"
    ',"Mr & Mrs Example, and family",reception,2\n'
)
WEDDING_ONLY_TEXT = ["Kovil", "Kochchikade", "12 February", "share.google", "Wedding Ceremony",
                     "Wedding only", "Wedding and reception", "ceremony"]
TEMPLATE = (b.ROOT / "templates" / "invite.html").read_text(encoding="utf-8")


class ParseTests(unittest.TestCase):
    def test_reads_rows_and_quoted_commas(self):
        guests = b.parse_guests(SAMPLE)
        self.assertEqual(len(guests), 3)
        self.assertEqual(guests[2]["names"], "Mr & Mrs Example, and family")
        self.assertEqual(guests[0], {"code": "aaaa22", "names": "Asha & Ravi", "events": "both", "party": 2})

    def test_accepts_excel_byte_order_mark_and_blank_lines(self):
        guests = b.parse_guests("﻿Code,Names,Events,Party\n,,,\nabcd,Meena,Reception,1\n")
        self.assertEqual([g["code"] for g in guests], ["abcd"])

    def test_bad_values_fail_without_naming_the_guest(self):
        for bad in ("x,Meena,wedding,1", "x,Meena,both,3", ",,both,1", "a!,Meena,both,1"):
            with self.assertRaises(b.GuestListError) as caught:
                b.parse_guests("code,names,events,party\n" + bad + "\n")
            self.assertNotIn("Meena", str(caught.exception))
            self.assertIn("Row 2", str(caught.exception))

    def test_duplicate_codes_and_missing_columns_fail(self):
        with self.assertRaises(b.GuestListError):
            b.parse_guests("code,names,events,party\nabcd,A,both,1\nabcd,B,both,1\n")
        with self.assertRaises(b.GuestListError):
            b.parse_guests("names,events\nA,both\n")


class CodeTests(unittest.TestCase):
    def test_existing_codes_are_kept_and_blank_ones_filled(self):
        guests = b.parse_guests(SAMPLE)
        self.assertEqual(b.assign_codes(guests), 1)
        self.assertEqual([g["code"] for g in guests[:2]], ["aaaa22", "bbbb33"])
        self.assertRegex(guests[2]["code"], r"^[a-z0-9]{6}$")
        self.assertEqual(b.assign_codes(guests), 0)
        self.assertEqual(len({g["code"] for g in guests}), 3)


class RenderTests(unittest.TestCase):
    def setUp(self):
        self.guests = b.parse_guests(SAMPLE)
        b.assign_codes(self.guests)

    def test_wedding_page_has_both_events_and_four_choices(self):
        page = b.render(TEMPLATE, self.guests[0])
        for text in ("Dear Asha &amp; Ravi", "You are invited to the wedding &amp; reception of", "Wedding Ceremony", "Wedding Reception", "Kochchikade",
                     "Pegasus Reef Hotel", 'data-countdown="2027-02-12T09:00:00+05:30"', 'id="party-field"'):
            self.assertIn(text, page)
        self.assertEqual(page.count('name="attending"'), 4)

    def test_reception_pages_hold_no_wedding_details(self):
        for page in (b.render(TEMPLATE, self.guests[1]), b.render(TEMPLATE, self.guests[2]), b.render(TEMPLATE)):
            for text in WEDDING_ONLY_TEXT:
                self.assertNotIn(text, page)
            self.assertEqual(page.count('name="attending"'), 2)
            self.assertIn("wedding reception of</p>", page)
            self.assertIn('data-countdown="2027-02-13T19:00:00+05:30"', page)

    def test_shared_files_hold_no_wedding_details(self):
        for name in ("invite.js", "invite.css"):
            shared = (b.ROOT / "site" / name).read_text(encoding="utf-8")
            for text in WEDDING_ONLY_TEXT:
                self.assertNotIn(text, shared)

    def test_headcount_only_for_couples_and_greeting_only_when_named(self):
        self.assertNotIn("party-field", b.render(TEMPLATE, self.guests[1]))
        self.assertIn("party-field", b.render(TEMPLATE, self.guests[2]))
        general = b.render(TEMPLATE)
        self.assertNotIn("Dear ", general)
        self.assertNotIn("party-field", general)
        self.assertIn('data-guest=""', general)

    def test_names_are_escaped(self):
        guest = {"code": "abcd", "names": '<script>"x"</script>', "events": "reception", "party": 1}
        page = b.render(TEMPLATE, guest)
        self.assertNotIn("<script>\"x\"", page)
        self.assertIn("&lt;script&gt;&quot;x&quot;&lt;/script&gt;", page)

    def test_nothing_left_unfilled(self):
        for page in (b.render(TEMPLATE), b.render(TEMPLATE, self.guests[0])):
            self.assertNotIn("{{", page)
            self.assertNotIn("<!--if:", page)


class BuildTests(unittest.TestCase):
    def test_build_writes_general_page_guest_pages_and_assets(self):
        guests = b.parse_guests(SAMPLE)
        b.assign_codes(guests)
        with tempfile.TemporaryDirectory() as folder:
            out = Path(folder) / "out"
            b.build(guests, out)
            self.assertTrue((out / "index.html").is_file())
            self.assertTrue((out / "invite.js").is_file())
            self.assertTrue((out / "art" / "temple.jpg").is_file())
            self.assertEqual(sorted(p.name for p in (out / "i").iterdir()), sorted(g["code"] for g in guests))

    def test_committed_general_page_matches_the_template(self):
        # site/index.html keeps the root link working if the site is ever served without the build step.
        committed = (b.ROOT / "site" / "index.html").read_text(encoding="utf-8")
        self.assertEqual(committed, b.render(TEMPLATE), "Run tools/build_invites.py and copy _site/index.html to site/index.html")

    def test_build_refuses_rows_without_codes(self):
        with tempfile.TemporaryDirectory() as folder:
            with self.assertRaises(b.GuestListError):
                b.build(b.parse_guests(SAMPLE), Path(folder) / "out")


if __name__ == "__main__":
    unittest.main()
