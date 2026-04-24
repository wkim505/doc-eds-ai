# User Story: Hero Block

## Summary
Implement a `hero` EDS block to replace the existing `DocBanner` Vue component on the DOC NZ website.

## User Story
**As a** DOC content author,  
**I want to** add a full-width hero banner to any page using a simple document-based table,  
**So that** I can present a strong visual introduction to each section or page without needing developer involvement.

## Background
The existing `DocBanner` Vue component is used on section landing pages (Parks & Recreation, Nature, Get Involved, Our Work, About Us) and campaign pages to display a full-width background image with an overlaid heading and introductory text. Each section has a distinct brand colour token (`ranginui`, `paptuanuku`, `atawhenua`, `weta`) that must be reflected in the hero styling.

## Acceptance Criteria

### AC1 — Basic rendering
- **Given** a page document contains a `hero` block table with an image, heading, and body text,  
- **When** the page is loaded in a browser,  
- **Then** the hero renders full-width with the image as the background, the heading overlaid in white, and the body text visible below the heading.

### AC2 — Section colour theming
- **Given** the page document contains a `section-theme` metadata value (e.g. `ranginui`, `paptuanuku`, `atawhenua`, `weta`),  
- **When** the hero block is rendered,  
- **Then** the hero's overlay/accent colour reflects the correct brand colour for that section.

### AC3 — Image responsive behaviour
- **Given** the hero block is rendered on a mobile device (viewport < 768px),  
- **When** the page loads,  
- **Then** the hero image is cropped and centred appropriately, the heading remains legible, and no layout overflow occurs.

### AC4 — Optional subtitle/intro text
- **Given** a hero block table includes an optional subtitle row,  
- **When** the block is rendered,  
- **Then** the subtitle appears below the main heading in a smaller font weight, styled consistently with the DOC design system.

### AC5 — Image alt text
- **Given** the hero image cell contains alt text,  
- **When** the page is inspected with a screen reader or accessibility tool (e.g. Monsido),  
- **Then** the `<img>` element has a non-empty `alt` attribute matching the authored value.

### AC6 — No hero image fallback
- **Given** no image is provided in the hero block,  
- **When** the block is rendered,  
- **Then** the block falls back to a solid section colour background with no broken image element visible.

### AC7 — Optional CTA button
- **Given** the hero block includes an optional CTA link row (link text + URL),  
- **When** the block renders,  
- **Then** a styled button appears within the hero, linking to the provided URL.

### AC8 — Performance
- **Given** the hero image is a large photograph,  
- **When** the page loads,  
- **Then** the hero image is lazy-loaded (or preloaded as LCP candidate with `fetchpriority="high"`), and the Largest Contentful Paint (LCP) score does not degrade below 2.5s on a simulated 4G connection.

### AC9 — Print styles
- **Given** a user prints a page containing a hero block,  
- **When** the browser print stylesheet is applied,  
- **Then** the hero image is hidden and only the heading and body text are printed.

## Live Reference

| Variant | Live URL | Notes |
|---|---|---|
| Standard hero (ranginui/blue) | https://www.doc.govt.nz/parks-and-recreation/ | Parks & Recreation section landing |
| Standard hero (paptuanuku/green) | https://www.doc.govt.nz/nature/ | Nature section landing |
| Standard hero (atawhenua/earth) | https://www.doc.govt.nz/get-involved/ | Get Involved section landing |
| Standard hero (weta/brown) | https://www.doc.govt.nz/our-work/ | Our Work section landing |
| Hero with intro text | https://www.doc.govt.nz/parks-and-recreation/things-to-do/walking-and-tramping/great-walks/ | Hero + long intro paragraph |
| Hero without CTA | https://www.doc.govt.nz/nature/native-animals/ | Image + heading only |

> **Note:** The site is a Vue.js SPA — full component rendering requires a JavaScript-enabled browser. Use Chrome DevTools to inspect the rendered DOM.

## Variants

| Variant | Block Name | Description |
|---|---|---|
| Standard | `hero` | Full-width background image with heading and optional intro text |
| With CTA button | `hero` | Includes one primary action button (e.g. "Book now") |
| Without image | `hero` | Falls back to section colour background when no image is provided |
| With subtitle | `hero` | Adds a secondary heading below the main heading |
| Section-themed | `hero` | Colour accent driven by `section-theme` metadata (`ranginui`, `paptuanuku`, `atawhenua`, `weta`) |

## Technical Notes
- Replaces: `DocBanner` Vue component
- Image delivery: use EDS image optimisation (`/media_*` hashing) via `picture` element with `webp` format
- Section metadata key: `section-theme`
- Brand colour tokens: `--color-ranginui`, `--color-paptuanuku`, `--color-atawhenua`, `--color-weta` (defined in `styles/vars.css`)
- Zilla Slab font must be loaded before hero renders to avoid FOUT on heading

## Definition of Done
- [ ] Block renders correctly in Edge Delivery Services preview and live environments
- [ ] All 9 acceptance criteria pass
- [ ] Passes Lighthouse accessibility audit (score ≥ 90)
- [ ] Authored and verified in SharePoint/Google Drive document format
- [ ] Code reviewed and merged to main branch
- [ ] Documented in block README with authoring guide
