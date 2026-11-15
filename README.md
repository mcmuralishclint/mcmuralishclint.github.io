# Muralish & Loshini — Wedding Invitations

Static invitation site served by GitHub Pages. Each guest gets a personal page at `/i/<code>/`; the root page is a general, reception-only invitation.

- `templates/invite.html` — the page template. Blocks marked `<!--if:both-->`, `<!--if:reception-->`, `<!--if:named-->` and `<!--if:couple-->` are kept or removed per guest.
- `site/` — files served as they are: `invite.css`, `invite.js`, `art/`, and `index.html` (the general page, a built copy of the template).
- `tools/build_invites.py` — builds `_site/` from the template and the guest list.
- RSVP replies are posted to a Google Form.

## Guest list

The guest list is confidential and is **never committed** (this repository is public). It lives in `guests.csv` in the repository root, which is gitignored. See `tools/guests.example.csv` for the format:

| Column | Value |
|---|---|
| `code` | Leave blank. The tool fills it in once; never change it after the link is sent. |
| `names` | As it should read after "Dear". Quote it if it contains a comma. |
| `events` | `both` (wedding and reception) or `reception` |
| `party` | `1`, or `2` for a couple (adds "Number attending" to the RSVP) |

After editing the list:

```sh
python3 tools/build_invites.py --assign-codes   # fills blank codes, writes guest-links.csv, builds _site/
python3 -m http.server -d _site                 # preview at http://localhost:8000/i/<code>/
gh secret set GUESTS_CSV < guests.csv           # give the list to the deploy workflow
```

Then run the "Deploy to GitHub Pages" workflow. The workflow must run `python3 tools/build_invites.py --out _site` with the `GUESTS_CSV` secret and publish `_site` (not `site`), and should delete the uploaded artifact afterwards, because artifacts on a public repository can be downloaded.

## Tests

```sh
python3 -m unittest discover -s tools -p 'test_*.py'
```

If the template changes, rebuild and copy `_site/index.html` to `site/index.html`; a test checks they match.

The previous portfolio site is kept on the `portfolio` branch.
