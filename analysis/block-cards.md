# User Story: Cards Block

## Summary
Implement a `cards` EDS block to replace the `DocRelatedSection`, `DocChildPageLinks`, and `DocProductSet` Vue components on the DOC NZ website.

## User Story
**As a** DOC content author,  
**I want to** display a grid of content cards on a page using a document table,  
**So that** I can highlight related pages, child sections, or featured content in a visually consistent way.

## Background
Cards are used extensively across DOC NZ — on section landing pages to link to child sub-sections (e.g. Parks & Recreation → Places to go, Things to do, Places to stay), in search results previews, and in editorial content to surface related articles or species. The existing Vue components (`DocRelatedSection`, `DocChildPageLinks`, `DocProductSet`) all render variants of a card grid. This block must support 2-up, 3-up, and 4-up layouts.

## Acceptance Criteria

### AC1 — Basic card grid rendering
- **Given** a page document contains a `cards` block with multiple rows (each row: image, heading, description, link),  
- **When** the page is rendered,  
- **Then** cards are displayed in a responsive grid (default 3-up on desktop, 2-up on tablet, 1-up on mobile).

### AC2 — Card image
- **Given** a card row includes an image,  
- **When** the card renders,  
- **Then** the image is displayed in a fixed-ratio thumbnail (16:9 or 4:3) with `object-fit: cover`, with correct alt text applied to the `<img>` element.

### AC3 — Card without image
- **Given** a card row does not include an image,  
- **When** the card renders,  
- **Then** no broken image placeholder is shown; the card renders with heading and description only, using the section colour as a background accent.

### AC4 — Link behaviour
- **Given** a card row includes a URL,  
- **When** a user clicks the card,  
- **Then** the user is navigated to the linked page. If the URL is external, it opens in a new tab with `rel="noopener noreferrer"`.

### AC5 — Column count variants
- **Given** the block's first row contains a variant descriptor (e.g. `cards (2-up)` or `cards (4-up)`),  
- **When** the block renders on desktop,  
- **Then** the grid displays the specified number of columns.

### AC6 — Section colour theming
- **Given** the page has a `section-theme` metadata value,  
- **When** cards render,  
- **Then** card headings or accent borders use the section's brand colour token.

### AC7 — Accessible card markup
- **Given** a cards block is rendered,  
- **When** inspected with a screen reader,  
- **Then** each card is a focusable, keyboard-navigable link with a descriptive accessible name (heading text used as link label).

### AC8 — Optional badge/label
- **Given** a card row includes an optional badge value (e.g. "New", "Featured"),  
- **When** the card renders,  
- **Then** a styled badge label appears on the card image or header area.

## Live Reference

| Variant | Live URL | Notes |
|---|---|---|
| 3-up cards with images | https://www.doc.govt.nz/nature/native-animals/ | Animal type cards grid |
| 3-up cards — section links | https://www.doc.govt.nz/get-involved/ | Section topic cards |
| Child page cards | https://www.doc.govt.nz/parks-and-recreation/places-to-go/northland/ | Sub-section link cards |
| Related content cards | https://www.doc.govt.nz/nature/pests-and-threats/predator-free-2050/ | Related pages at bottom |

> **Note:** The site is a Vue.js SPA — full rendering requires a JavaScript-enabled browser.

## Variants

| Variant | Block Name | Description |
|---|---|---|
| 3-up (default) | `cards` | Three columns on desktop, two on tablet, one on mobile |
| 2-up | `cards (2-up)` | Two columns on desktop; used for prominent feature cards |
| 4-up | `cards (4-up)` | Four columns on desktop; used for compact category tiles |
| With image | `cards` | Thumbnail image above heading and description |
| Without image | `cards` | Text-only card with section colour accent; used for child page links |
| With badge | `cards` | Includes a "New" or "Featured" label badge on the card |
| Linked card | `cards` | Entire card is clickable (wraps in `<a>`) |
| Non-linked card | `cards` | Informational only — no link |

## Technical Notes
- Replaces: `DocRelatedSection`, `DocChildPageLinks`, `DocProductSet`
- Default column layout: 3-up (desktop), 2-up (tablet ≥ 768px), 1-up (mobile < 768px)
- Images served via EDS media pipeline (`picture` + `webp` + `srcset`)
- Section theme consumed from page metadata via `getMetadata('section-theme')`

## Definition of Done
- [ ] Block renders correctly in EDS preview and live
- [ ] All 8 acceptance criteria pass
- [ ] Responsive layout verified at 375px, 768px, 1280px, 1440px viewports
- [ ] Passes Lighthouse accessibility audit (score ≥ 90)
- [ ] Authored and verified in SharePoint/Google Drive document
- [ ] Code reviewed and merged
- [ ] Documented with authoring guide
