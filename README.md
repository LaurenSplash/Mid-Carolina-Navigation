# Mid Carolina Credit Union — Mega Navigation System

An interactive, single-file prototype of a warm, modern "digital branch" navigation system for Mid Carolina Credit Union. It demonstrates the desktop utility bar, primary header, hover/click/keyboard mega menus, a mobile drawer with sticky search and quick actions, a consolidated Rates & Fees page pattern, interaction-state references, the brand palette, and developer handoff notes.

## Viewing it

No build step or dependencies — everything (HTML, CSS, JS, and inline assets) lives in `index.html`.

Open the file directly in a browser:

```bash
open index.html        # macOS
```

Or serve it locally:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Try the interactions

- **Desktop:** hover or click the primary nav (Personal, Loans, Business, Digital Banking, Resources, About, Support) to open mega menus. Tab through to test focus states; press `Esc` to close.
- **Mobile:** scroll to the mobile section and tap the menu icon to open the drawer. The search bar stays pinned while the rest of the menu scrolls; member tasks sit in a 3-across quick-action grid.
- **Routing number:** any "Routing Number" / "Routing #" control opens a copy-to-clipboard modal.

## Developer handoff

Technical and design notes (tokens, interaction model, accessibility, IA, component inventory) live in [`DEVELOPER-HANDOFF.md`](DEVELOPER-HANDOFF.md). They were removed from the prototype itself so `index.html` stays client-facing.

## Review changes (July 8, 2026)

This build incorporates client review feedback from Savannah Bates, Kalynn Benoit, Shelley Lyles, and Phil Stewart:

- Centered button labels across all pill buttons; outlined the utility-bar Member Login so it's distinct from the primary CTA.
- Removed the featured callout card on the wide (Loans, Resources) mega menus so columns spread and titles don't wrap.
- Added unique, non-duplicated icons to every menu item across all seven menus.
- Made Home Lending hierarchical: Mortgages, Adjustable Rate Mortgages, Home Equity / HELOC, and Land Loans nest under Home Loans.
- Finished the truncated Loan Rates sentence; removed Archived Promotions; consolidated the duplicate news tab; pluralized "Adjustable Rate Mortgages."
- Restructured the mobile drawer (sticky search, scrollable body, 3-across quick actions including Routing #, Member Services, and Branch/ATM).
- Footer fixes: app-badge spacing/alignment, centered newsletter input, larger logo, a prominent Routing # button, and link-styled routing control.
- Aligned the Rates & Fees tables so columns line up down the page.

## Outstanding items (need assets/decisions)

- Swap in the official Mid Carolina CU logos (per brand standard).
- Cross-reference the full current sitemap to confirm every page is accounted for.

## Structure

```
mccu-mega-nav/
├── index.html             # the complete, client-facing prototype
├── DEVELOPER-HANDOFF.md   # design tokens, interaction/accessibility notes, IA, components
└── README.md
```
