# Haraka Cargo design system

The source of truth for storefront and dashboard visuals. Token values live in
`app/globals.css`. This document explains how to use them. If the two
disagree, fix one of them in the same change.

## 1. Direction

A bright, colourful freight and B2B marketplace. Two approved references
(supplied 2026-11-03) guide it: a marketplace app (soft grey surfaces, white
cards, pill controls, product photography on pastel tiles) and a freight
company homepage (very large headline, short company brief, photo service
cards for sea and air freight with round icon buttons, white pill navigation).
**Navy replaces orange for every action.** We adopt palette, type character
and component shapes; we do not copy layouts, content or identities.

The brand must read as **trustworthy, international and commercially
competent**. Colour is used for wayfinding and product richness, not
decoration.

## 2. Colour

| Role | Token / class | Value | Use |
|---|---|---|---|
| Page | `bg-background` | #F4F4F5 | Page canvas |
| Surface | `bg-card` | #FFFFFF | Cards, header, panels |
| Ink | `text-foreground` | #16171B | Text |
| Muted text | `text-muted-foreground` | #66676E | Supporting copy (5.1:1 on page) |
| Muted surface | `bg-muted` | #ECECEE | Inactive chips, search pill |
| Border | `border` | #E2E2E5 | Hairlines |
| Brand (navy) | `bg-brand` / `hover:bg-brand-hover` | #13306A / #0C2252 | All buttons, active chips, icon circles, white text 12.7:1 |
| Brand vivid (royal blue) | `bg-brand-vivid`, `text-brand-vivid` | #1F4FD8 | Icons, dots, map routes, accent text (6.6:1 on white) |
| Brand ink | `text-brand-ink` | #1F4FD8 | Accent text on light surfaces |
| Brand on dark | `text-brand-on-dark` | #6E9BFF | Accents on navy band or dark photo overlays (6.3:1) |
| Dark band | `bg-surface-inverse` | #0B1B3F | The single deep-navy section |
| Logo green | `bg-brand-green` | #2AA848 | Small accents only: section label lines, status dots, footer stripe, active trade route |
| Green ink | `text-brand-green-ink` | #1E7A38 | Green text or small icons on light surfaces (5.4:1) |
| Success / warning / error | `success`, `warning`, `destructive` | #1F7A50 / #94600F / #B42318 | Status only |

**Pastel tints** (`bg-tint-blue`, `-peach`, `-mint`, `-lavender`, `-sand`,
`-rose`, `-grey`) sit behind product and category imagery. Each category has
one fixed tint in `data/catalog/categories.ts`. Use `tintBackground` from `lib/tints.ts`
so Tailwind sees literal class names. Do not use tints for text or status.

Rules:
- Never use `brand-vivid` as text on the navy band (2.6:1); use `brand-on-dark`.
- No orange anywhere. Buttons are navy.
- Green is an accent taken from the logo: lines, dots, the active route. Never
  for buttons or large fills, and never `brand-green` as small text on white
  (3.1:1); use `brand-green-ink`.
- Do not introduce raw hex values in components. Add a token first.
- Dark bands (`bg-surface-inverse`) are used at most once per page.

### Logo

- Full lockup: `public/brand/haraka-cargo-logo.png` (transparent PNG),
  rendered by `components/site/brand-mark.tsx` at 48–56px tall in the header
  and 80px in the footer. Never smaller than 44px tall.
- Emblem (globe, plane, ship): `public/brand/haraka-cargo-emblem.png`, also
  `app/icon.png` for the browser tab.
- The logo's own navy, blue, green and yellow belong to the logo artwork.
  Site UI colours stay on the tokens above.

## 3. Typography

- UI font: **Plus Jakarta Sans** via `next/font/google` (self-hosted at build
  time, no runtime requests). Chosen to match the reference's geometric
  character.
- Mono: **Geist Mono** only for references (`DEMO-TX-0101`), port and route
  codes (`INNSA`, `TZDAR`) and tabular metadata.
- Scale (tokens in `globals.css`): `text-hero` (home headline, up to 72px,
  weight 500), `text-display` (up to 50px),
  `text-title`, `text-heading`, `text-subheading`, `text-lead`, `text-body`,
  `text-label`, `text-meta`, `text-eyebrow`.
- Headings 600, card titles 500, body 400. Prices are 600 with cents at 62%
  size (`Price` in `components/site/product-card.tsx`).
- Body copy stays within `max-w-prose` (38rem).

## 4. Shape, spacing and layout

- Radii: buttons, chips, search and status pills `rounded-full`. Product
  tiles, feature cards and photography `rounded-3xl` (outer) / `rounded-2xl`
  (inset image). Form controls use the base `rounded-lg`.
- Page width `max-w-page` (78rem) with `px-gutter`. Vertical rhythm
  `py-section` between sections.
- Grids: always `grid-cols-1` before a breakpoint column count, and
  `min-w-0` on columns containing horizontal scrollers, so content cannot
  force the page wider than the viewport.
- Shadows: `shadow-card` at rest, `shadow-raised` on hover or for emphasis.

## 5. Imagery

- Editorial images (hero, services, operations) are registered in
  `lib/images.ts` with alt text, focal point, source and licence.
- Category and product photos are set as `/images/...` paths in
  `data/catalog/` with `alt` and `credit`, so the catalogue can be edited in
  one place. Never use remote image URLs.
- Current images are Unsplash License stock photos stored in
  `public/images/`. They are **illustrative**. Never caption them as Haraka
  suppliers, premises or shipments.
- Product cards show the product's photo, or the category photo. Unless the
  photo is marked `exact: true`, it is visibly labelled "Representative
  photo".
- Aspect ratios: product `--aspect-product` (4:3), editorial
  `--aspect-editorial` (3:2), hero lead tile 16:9.
- Avoid photos with prominent third-party logos or brand names.
- Replace stock photos with authorised Haraka photography as it becomes
  available, updating the manifest notes.

Asset roles still missing (to source or photograph): construction tiles in
stock, motorcycle spares, packaging that is a real photograph rather than a
render, freight loading at origin, Dar es Salaam port.

## 6. Components

| Component | File | Notes |
|---|---|---|
| Header | `components/site/site-nav.tsx` | White pill nav items, Contact Us, navy Get a Quote, Base UI dialog for mobile menu |
| Home hero | `components/site/home-hero.tsx` | Large headline, Haraka brief, Get a Quote / Browse Products |
| Service cards | `components/site/service-carousel.tsx` | Sea, air, sourcing, consolidation, clearance cards; arrows scroll the row and disable at the ends |
| Trade map | `components/site/trade-route-map.tsx` | See section 7 |
| Category grid | `components/site/category-browser.tsx` | Pastel tiles with inset photos |
| Product card | `components/site/product-card.tsx` | Tinted tile, MOQ chip, price, navy Quote pill |
| Catalogue preview | `components/site/product-showcase.tsx` | Client-side filter of demo data only |
| Sourcing request | `components/site/sourcing-section.tsx` | Form prepares a draft; nothing is sent yet |
| Process | `components/site/process-steps.tsx` | Six steps with explicit status names |
| Shipping updates | `components/site/courier-announcements.tsx` | Demo departures, labelled |
| Buttons | `components/ui/button.tsx` | `default` (ink), `brand` (orange), `outline`, `ghost` |

Before adding a component, check this table and `components/ui/`.

## 7. Trade map rules

- Geography: Natural Earth 1:110m (public domain) projected by
  `scripts/generate-trade-map.mjs` into `lib/geo/trade-map-geometry.ts`.
  Re-run the script only to change the visible window or the highlighted
  countries.
- Routes, locations and markets come from `lib/trade-routes.ts`. Points are
  projected at render time by `lib/geo/project.ts`, so adding a lane needs no
  regeneration.
- Status is shown with both styling and words: active is a solid orange line
  with an "Active" chip; planned is a dashed grey line marked "Planned"; not
  yet served is shown as hatched countries in the legend.
- Labels are HTML overlays, so they stay legible on small screens. Labels
  marked `secondary` hide below `sm`, and left-side labels flip right.
- No vessel positions, ETAs or live tracking on this map. Waypoints are
  illustrative sea-lane bends.
- The only motion is a slow dash flow on active lanes, disabled under
  `prefers-reduced-motion`.

## 8. Responsive behaviour

Check every change at 320, 375, 834, 1280 and 1440px widths. Horizontal
scrolling is allowed only inside chip rows. The page itself must never
scroll sideways. Hero columns stack below `lg`. Product grids are 1, 2 and 3
columns.

## 9. Content honesty

- Prices are indicative, in whole Tanzanian shillings ("TSh 2,150,000"),
  before freight, import duties and delivery. No USD on customer pages.
- Cosmetics, supplements and phones show their TMDA/TCRA import note.
  Supplements are never described as medicines or with medical claims.

- Catalogue items, prices and departures are demonstration data until the
  backend lands. Keep the `DemoBadge`/`DemoNotice` visible wherever they
  appear.
- An inquiry, a quotation, a confirmed order, a payment confirmation and a
  shipment status are different states. Name them consistently.
- Contact channels, AI processing and WhatsApp notifications must say
  "not active yet" until they are connected.

## 10. Anti-patterns

- Dark-theme storefront pages, or following the OS colour scheme.
- Orange accents or buttons (retired 2026-11-03).
- "Catalogue" or other uncommon labels where plain website words exist.
- Raw hex, ad hoc radii or font sizes in components.
- One photo reused as decoration across unrelated sections.
- Remote image URLs, or images not in the manifest.
- Fake ratings, reviews, testimonials, volumes, certifications or logos.
- Decorative animation on commerce flows or anywhere in the admin dashboard.
- Installing a second component library for a role shadcn/Base UI already
  covers.
