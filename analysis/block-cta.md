# User Story: CTA (Call to Action) Block

## Summary
Implement a `cta` EDS block to replace the `DocCallToAction` Vue component on the DOC NZ website.

## User Story
**As a** DOC content author,  
**I want to** add a prominent call-to-action banner to a page using a document table,  
**So that** I can direct visitors to key actions such as booking a hut, making a donation, or applying for a permit.

## Background
The `DocCallToAction` component is used throughout DOC NZ to drive conversions — directing users to the booking system (`bookings.doc.govt.nz`), donation pages, volunteer sign-ups, and permit applications. CTAs typically include a heading, short description, and one or two action buttons. They appear mid-page and at the bottom of content pages.

## Acceptance Criteria

### AC1 — Basic CTA rendering
- **Given** a page document contains a `cta` block with a heading, description, and a button link,  
- **When** the page renders,  
- **Then** the block displays a visually distinct banner with the heading, description, and a styled primary button.

### AC2 — Primary and secondary buttons
- **Given** a `cta` block includes two link rows (primary and secondary),  
- **When** the block renders,  
- **Then** the first link renders as a filled primary button and the second as an outlined secondary button.

### AC3 — External link handling
- **Given** a CTA button links to an external domain (e.g. `bookings.doc.govt.nz`),  
- **When** the user clicks the button,  
- **Then** the link opens in a new tab with `rel="noopener noreferrer"` and an external link icon is shown.

### AC4 — Section colour theming
- **Given** the page has a `section-theme` metadata value,  
- **When** the CTA renders,  
- **Then** the primary button background and banner accent use the section's brand colour token.

### AC5 — Optional background image
- **Given** a `cta` block includes a background image,  
- **When** the block renders,  
- **Then** the image is used as the block background with a colour overlay ensuring text legibility (minimum contrast ratio 4.5:1).

### AC6 — Full-width layout
- **Given** a `cta (full-width)` variant is specified,  
- **When** the block renders,  
- **Then** the CTA spans the full page width, breaking out of the standard content column.

### AC7 — Mobile responsiveness
- **Given** the CTA is viewed on mobile (< 768px),  
- **When** the page loads,  
- **Then** the layout stacks vertically (heading → description → buttons), buttons are full-width, and no text is truncated.

### AC8 — Accessible button labels
- **Given** a CTA button is rendered,  
- **When** inspected with a screen reader,  
- **Then** the button has a descriptive accessible name (not just "Click here" or "Learn more").

## Live Reference

| Variant | Live URL | Notes |
|---|---|---|
| Standard CTA — Donate | https://www.doc.govt.nz/get-involved/ | "Donate to nature" CTA mid-page |
| CTA with booking link | https://www.doc.govt.nz/parks-and-recreation/places-to-stay/stay-in-a-hut/kime-hut/ | "Book now" CTA for hut reservations |
| CTA — Great Walk bookings | https://www.doc.govt.nz/parks-and-recreation/things-to-do/walking-and-tramping/great-walks/ | Season booking open dates + CTA |
| Full-width CTA | https://www.doc.govt.nz/nature/pests-and-threats/predator-free-2050/ | "Get involved" full-width section CTA |

> **Note:** The site is a Vue.js SPA — full rendering requires a JavaScript-enabled browser.

## Variants

| Variant | Block Name | Description |
|---|---|---|
| Standard | `cta` | Constrained-width banner with heading, text, and one primary button |
| Full-width | `cta (full-width)` | Edge-to-edge banner, breaks out of content column |
| With secondary button | `cta` | Primary + secondary (outlined) buttons side by side |
| With background image | `cta` | Full background image with colour overlay for legibility |
| External link | `cta` | Primary button targets external domain (e.g. bookings.doc.govt.nz); opens in new tab |
| Section-themed | `cta` | Button and accent colour driven by `section-theme` metadata |

## Technical Notes
- Replaces: `DocCallToAction`
- Variant: `cta (full-width)` for edge-to-edge layout
- Brand colour tokens applied via `data-section-theme` attribute on section or block wrapper
- External link icon via CSS `::after` pseudo-element targeting `[href^="http"]`

## Definition of Done
- [ ] Block renders correctly in EDS preview and live
- [ ] All 8 acceptance criteria pass
- [ ] Contrast ratios verified for all colour theme variants
- [ ] Keyboard navigation verified (button focus styles visible)
- [ ] Authored and verified in SharePoint/Google Drive document
- [ ] Code reviewed and merged
- [ ] Documented with authoring guide
