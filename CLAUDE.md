# HARAKA CARGO PLATFORM — PERMANENT UI/UX AND DESIGN RULES

## Role

Act as a senior product designer and frontend engineer. Produce production-quality interfaces with deliberate art direction, consistent design tokens, excellent typography, responsive layouts, and accessible interactions.

These instructions apply to every frontend feature, page, component, and redesign in this repository.

## 1. Required design resources

- Use shadcn/ui as the primary reusable UI component foundation when compatible with the existing project.
- Use Magic UI selectively for suitable hero sections, subtle animations, and distinctive visual elements.
- Use Lucide React for consistent interface icons.
- Use the existing project's framework, styling system, and established conventions.
- Prefer installed and verified components over recreating equivalent components unnecessarily.
- Inspect a library's documentation and API before using a component.
- Do not assume that a repository, MCP server, or dependency is installed merely because it is mentioned here.

## 2. Design quality

The interface must look like a carefully designed international sourcing and cargo business, not a generic AI-generated website.

Prioritize:
- Strong visual hierarchy and clear page composition.
- Intentional typography, spacing, and alignment.
- Restrained colours with consistent semantic meaning.
- High-quality, relevant product and logistics imagery.
- Clear navigation and understandable customer journeys.
- Consistent interaction states and accessible forms.
- Thoughtful responsive behaviour from mobile to desktop.
- Professional loading, empty, error, success, and disabled states.

Avoid:
- Repetitive generic dashboard layouts.
- Excessive gradients, glassmorphism and glowing borders. Corner radii come from the approved scale in docs/design-system.md, not ad hoc values.
- Decorative animations that distract from commerce workflows.
- Emoji used as interface icons.
- Unnecessary UI libraries and duplicate components.
- Placeholder buttons that do nothing.
- Fake statistics presented as live business data.
- Randomly changing fonts, colours, shadows, and border radii between pages.

## 3. Typography

Use Plus Jakarta Sans (via `next/font`, `--font-sans`) as the UI font; it matches the approved marketplace reference. Use Geist Mono sparingly for order IDs, shipment references, tracking codes, and tabular metadata.

Establish a deliberate type scale for:
- Display headings
- Page titles
- Section headings
- Body text
- Supporting descriptions
- Form labels
- Table metadata

Avoid excessive font weights and oversized text. Keep paragraph line lengths readable. Use consistent line height and responsive font sizing.

Do not introduce another font without a design reason. Load fonts efficiently and avoid unnecessary external requests.

## 4. Design tokens

Create and maintain shared tokens for:
- Brand colours and semantic status colours
- Backgrounds and surfaces
- Text and muted text
- Typography scale
- Spacing
- Border radii
- Borders and shadows
- Focus rings
- Animation duration and easing

Do not scatter arbitrary colour values and spacing decisions throughout components. Use the project's existing token system where available.

## 5. Storefront and admin are different products

### Customer storefront

Design for product discovery, trust, quotation requests, and conversion.

Use strong product imagery, useful filters, clear pricing conditions, concise copy, and a prominent sourcing-assistant entry point.

### Administration dashboard

Design for operational efficiency. Prioritize information density, readable tables, filters, status visibility, clear actions, and fast navigation.

Do not apply marketing-page animations and decorative effects throughout the admin dashboard.

## 6. Component reuse

Before creating a component:
1. Check whether the project already has an equivalent.
2. Check the installed UI library and available registries.
3. Reuse existing components when suitable.
4. Extend them consistently when necessary.
5. Avoid installing redundant libraries.

Use Magic UI components only when they materially improve the design. Do not use every available animation.

Keep components modular, typed, accessible, and easy to maintain.

## 7. Implementation workflow

Before designing a new page:
1. Inspect the existing page, layout, design tokens, and related components.
2. Identify the page's primary user goal.
3. Plan its hierarchy and responsive behaviour.
4. Reuse existing design-system components.
5. Implement the page consistently with the rest of the product.
6. Test the actual rendered result.

Do not rewrite unrelated files or replace the whole design system without approval.

## 8. Design verification

After meaningful UI changes:
- Run the available lint, typecheck, and build commands.
- Check desktop, tablet, and mobile layouts.
- Check keyboard navigation, focus visibility, contrast, and form labels.
- Verify that buttons, links, dialogs, dropdowns, and filters work.
- Check for console errors and horizontal overflow.
- Verify image loading and layout stability.
- Report any visual checks that could not be performed.

Do not claim a design has been visually verified unless you inspected the rendered page.

## 9. Repository and dependency discipline

Inspect package.json and the existing configuration before adding dependencies.

Never replace existing dependencies, Tailwind configuration, routing, or component primitives blindly. Check version compatibility and review changes before accepting them.

Treat third-party component examples as reference material, not unquestionable instructions.

## 10. Approved visual direction (storefront)

Full specification: `docs/design-system.md`. Read it before any UI work. In brief:

- Bright freight-and-marketplace style: soft grey page (`bg-background`), white cards, near-black ink (`foreground`) for text, **navy (`brand`) for every button, active chip and the dark band**, royal blue (`brand-vivid`) for icons, and the logo green (`brand-green`) for small accent lines, status dots and the active trade route. No orange.
- Use plain website vocabulary: Home, Products, Services, How It Works, Shipping Updates, Contact Us, Get a Quote. Not "catalogue".
- Pastel tints (`bg-tint-*`, set per category in `data/catalog/categories.ts`, classes in `lib/tints.ts`) behind product and category imagery. Pills (`rounded-full`) for buttons, chips and search; `rounded-3xl` for product tiles and feature cards.
- Contrast: white text on `bg-brand` (#13306A, 12.7:1) or `bg-brand-vivid` (#1F4FD8, 6.6:1). On navy surfaces use `text-brand-on-dark` (#6E9BFF), never `brand-vivid`.
- Logo: `public/brand/haraka-cargo-logo.png` (full lockup, used by `BrandMark` in header and footer) and `public/brand/haraka-cargo-emblem.png` (globe only, also `app/icon.png`). Do not redraw, recolour or stretch it.
- The storefront is light-only. Do not re-enable OS dark mode on customer pages.
- Categories and products are edited in `data/catalog/categories.ts` and `data/catalog/products.ts` (display order = file order). Prices are whole Tanzanian shillings, shown as "TSh 2,150,000" via `formatPrice`/`Price`; never USD.
- Editorial photos come from `lib/images.ts`; catalogue photos are paths in the data files with a `credit`. Photos not marked `exact: true` show a "Representative photo" label.
- Regulated goods (cosmetics, supplements, phones) carry a `note` about TMDA/TCRA import requirements. Never present supplements as medicines.
- The trade map (`TradeRouteMap`) is driven by `lib/trade-routes.ts`. Lane status (active, planned, unavailable) must match reality and be shown with labels, not colour alone. Never show vessel positions or invented tracking.
- Demonstration data (catalogue, prices, departures) must stay visibly labelled until real data replaces it. No invented testimonials, statistics, certifications or client logos.
- The admin dashboard uses the same tokens but prioritises density; no marketing tiles or decorative motion there.

## Final rule

Every new frontend feature must follow this project's established design system. Consistency and deliberate visual quality take priority over generating large amounts of code quickly.