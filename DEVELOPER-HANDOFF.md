# Developer Handoff — Tokens & Component Notes

Mid Carolina Credit Union — Mega Navigation System. This document holds the technical/design handoff notes that previously lived at the bottom of the prototype. The prototype (`index.html`) is now client-facing; this file is the reference for the build team.

## Design tokens

| Token | Value | Use |
|---|---|---|
| `--mccu-teal` | `#00778B` | Primary actions, active nav, links |
| `--green-fresh` | `#60A418` | Secondary CTA, accents, "open" actions |
| `--green-lime` | `#7EBA04` | Hover accents (e.g. footer link marker), gradient end |
| `--cta-yellow` | `#FCB829` | Single strongest moment only (featured-card button, Subscribe) |
| `--warm-050` | `#F7F5F2` | Utility bar, soft panel backgrounds |
| `--ink` | `#152433` | Body text |
| `--r-panel / --r-card / --r-pill` | `24px / 18px / 999px` | Mega panel · CTA card · buttons |
| `--shadow-panel` | `0 24px 60px -24px rgba(0,60,72,.28)` | Mega menu elevation (soft, never harsh) |
| `--dur-menu / --ease-soft` | `220ms / cubic-bezier(.22,.61,.36,1)` | Open/close fade + slide |
| `--focus-ring` | `2px white + 2px #0096A6 halo` | All keyboard focus states |
| Type scale | Acumin Variable Concept · 13 / 15 / 19px | Utility · links · group titles & card heads |

Full token set lives in the `:root` block at the top of `index.html`.

## Interaction model

- **Hover intent:** opening is debounced ~120ms; leaving the trigger + panel closes after ~180ms so diagonal travel toward the panel doesn't drop it.
- **Click:** toggles the menu and pins it open until the user clicks a link, clicks outside, presses `Esc`, or opens another menu.
- **Caret** rotates 180° and a teal→green underline appears on the active trigger.
- **Backdrop:** a light top-gradient scrim (not a full-page dim) separates the open panel from page content.
- **Desktop nav collapses at ≤920px** (`.primary-nav{display:none}`); the mobile drawer pattern takes over on narrow screens.

## Accessibility

- Triggers are real `<button>`s with `aria-expanded` and `aria-controls`; each panel has a matching `id`. Nav is wrapped in `<nav aria-label="Primary">` with semantic `<ul>` link lists.
- `Enter`/`Space` opens or closes a menu; `Esc` closes and returns focus to its trigger; `Tab` moves naturally into and through panel links.
- Every section's first link is an "…Overview" destination, so the top-level page is always reachable as a plain full page — menus enhance, never trap.
- Focus rings are high-contrast and brand-aligned; ARIA is kept minimal (no `menu`/`menuitem` desktop-app semantics that would hijack normal browsing).
- Mobile drawer sets `aria-hidden`, traps nothing destructively, and closes on `Esc` / overlay / close button.
- The footer email is a `mailto:` link labeled "Email Us" with an `aria-label` for screen readers.

## Information architecture

Seven calm primary items, each opening an intent-grouped mega menu: Personal · Loans · Business · Digital Banking · Resources · About · Support. The nav mirrors the **Slickplan "MCCU 2.0" outline** (127-page IA); group headings within each mega menu are presentational — the pages, order, and parent/child nesting follow the outline. Deep leaf pages (e.g., individual fee/rate pages) live on their landing page rather than in the header menu.

- **Home** — single destination; the logo links to it (plus a Home chip in the mobile drawer). No duplicate "Homepage".
- **Utility region (not pages)** — Make A Payment, Rates & Fees, Locations, ATM Locator, Contact, Routing # and Search sit in the top utility bar; Member Login (outlined), Apply For A Loan and Open An Account are the high-priority header CTAs. Visible without opening a menu. (Member Login and ATM Locator are parented under Personal/utility in the outline but surface here rather than inside a dropdown.)
- **Loans** — Home Loans is a parent category with Mortgages, Adjustable Rate Mortgages, and Home Equity / HELOC nested beneath it. **Land Loans is a top-level Loans item** (sibling of Home Loans), not a child. uChoose Rewards was removed per the updated outline. Credit Cards sits under Loans, matching the live site.
- **Promotions** — consolidated to a single **Promotions & Offers** page under *Resources* (and in the footer). Implement as a custom post type with a list view (the "Promotions & Offers" landing page) and a detail view per promotion; individual promos are no longer separate nav links. Archived promotions stay out of front-end nav (CMS/admin only).
- **About** — restructured into Membership, About Us, and a **News & Community** section (News & Community Overview, News From The Vault, Community Involvement, Newsletter Archive, Annual Meeting, Scholarship/Grant Winners, Branch Updates, Events, CEO Updates). Our History, Our Philosophy, Holiday Schedule, and Join Our Board were dropped; Contact moved to Support.
- **Support** — Get Help Fast, Account Services, and Rates/Forms/Policies. **Rates & Fees** is a hub link (its Deposit/Loan/Mortgage/Credit-Card rate and fee sub-pages live on that page's on-page sub-nav, not the header). ATM Locator lives in the utility bar; Fee Schedule lives under Rates & Fees. Routing Number links open the copy modal anywhere they appear.
- **Resources** — Schools & Educators was removed per the outline; Youth Financial Education now lives under Resources (not Personal).
- **Footer** — curated secondary sitemap covering all sections plus disclosures (NCUA, Equal Housing), policy links, and the "Website by Splash Omnimedia" credit.

## Icon system

- One icon set (`const I` in `index.html`), rendered via the `svg(key)` helper at a consistent 24×24 viewBox, 2px stroke, `stroke-linecap/linejoin: round`.
- Every item across all seven menus uses a **unique** icon within its menu — no duplicates. Icon chips are a uniform 30×30 with `--teal-050` background and teal glyph; nested (child) items use the same treatment.

## Component inventory

- **UtilityBar** · **PrimaryHeader** (Brand, PrimaryNav, CtaCluster) · **MegaPanel** (Eyebrow, Group×N, optional FeaturedCard) — all data-driven from one `NAV` model. Wide menus (Loans, Resources) render without the featured card so columns spread full-width.
- **MobileHeader** · **Drawer** — sticky search header over a scrollable body containing a full-width Member Login, a 3-across quick-action grid (Open An Account, Apply For A Loan, Make A Payment, Routing #, Member Services, Branch / ATM), quick links (Home, Rates & Fees, Locations), then the nav accordions.
- **StickyQuickActions** (Login / Apply / Open / Pay) on the standalone mobile home demo.
- **Footer** — brand lockup (logo + "Our community. Our focus." paired with a divider), Routing # button, social icons, official-style App Store / Google Play badges, 7-column sitemap, contact row, newsletter, and legal/disclosure row.
- **Routing modal** — copy-to-clipboard dialog opened by any `.routing-open` control.

## Outstanding items (need a client asset or decision)

- **Official logo SVG** — the header and footer use the production MCCU logo as an embedded PNG (reversed for the footer). Swap in the vector SVG when available; keep fixed clear-space and do not recolor, crop, or combine with other graphics.
- **App Store / Google Play badges** — currently custom-drawn to look official. For production, use Apple's and Google's official badge artwork to meet their brand guidelines.
- **Sitemap sign-off** — IA was cross-checked against the current midcarolinacu.com sitemap; confirm no in-flight/unpublished pages need a home.
