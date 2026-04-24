# User Story: Accordion Block

## Summary
Implement an `accordion` EDS block to replace the `DocAccordion` and `DocShowHide` Vue components on the DOC NZ website.

## User Story
**As a** DOC content author,  
**I want to** add collapsible accordion sections to a page using a document table,  
**So that** I can present large amounts of information (e.g. permit conditions, safety guidelines, FAQs) in a compact and scannable format without overwhelming the reader.

## Background
Accordions appear across DOC NZ in permit/permissions pages (listing conditions for each permit type), Know Before You Go safety guidance, species information pages (habitat, behaviour, conservation status sections), and FAQ sections. The existing `DocAccordion` component supports multiple items each with a heading and rich body content. `DocShowHide` is a simpler variant used for toggling a single section of content.

## Acceptance Criteria

### AC1 — Basic accordion rendering
- **Given** a page document contains an `accordion` block table with multiple heading/content row pairs,  
- **When** the page loads,  
- **Then** each item is rendered with a visible heading row and the body content initially collapsed (hidden).

### AC2 — Expand/collapse toggle
- **Given** an accordion is rendered with all items collapsed,  
- **When** a user clicks an accordion heading,  
- **Then** the corresponding content panel expands with an animated transition, and the toggle icon (chevron or plus) rotates/changes state.

### AC3 — Only one open at a time (exclusive mode)
- **Given** an accordion is in exclusive mode (single open item),  
- **When** a user opens a second accordion item,  
- **Then** the previously open item collapses automatically.

### AC4 — Multiple open items (standard mode)
- **Given** an accordion block does not specify exclusive mode,  
- **When** a user opens multiple items,  
- **Then** all opened items remain expanded simultaneously.

### AC5 — Rich content in panels
- **Given** an accordion panel body contains rich content (images, lists, links, tables),  
- **When** the panel is expanded,  
- **Then** all rich content renders correctly with proper styling.

### AC6 — Keyboard accessibility
- **Given** a user navigates the page using keyboard only,  
- **When** focus reaches an accordion heading,  
- **Then** pressing `Enter` or `Space` toggles the panel, and `Tab` moves focus to the next interactive element inside the open panel.

### AC7 — ARIA attributes
- **Given** an accordion is rendered,  
- **When** inspected with a screen reader,  
- **Then** each heading button has `aria-expanded="true/false"`, each panel has `role="region"` and `aria-labelledby` pointing to its heading, and collapsed panels have `hidden` or `aria-hidden="true"`.

### AC8 — Show/hide variant (single item)
- **Given** a `show-hide` variant accordion block contains a single heading and body,  
- **When** the page loads,  
- **Then** the content is hidden by default with a "Show more" / "Show less" toggle link.

### AC9 — Deep-link to open item
- **Given** a URL contains a fragment matching an accordion heading ID (e.g. `#dog-access`),  
- **When** the page loads,  
- **Then** the matching accordion item is automatically expanded and scrolled into view.

## Live Reference

| Variant | Live URL | Notes |
|---|---|---|
| Show/hide (single item) | https://www.doc.govt.nz/parks-and-recreation/know-before-you-go/land-safety-code/ | "Show more" toggle for translated documents |
| Multi-item accordion | https://www.doc.govt.nz/get-involved/apply-for-permits/ | Permit types as accordion items |
| FAQ accordion | https://www.doc.govt.nz/parks-and-recreation/know-before-you-go/ | Safety guidance sections |

> **Note:** The site is a Vue.js SPA — full rendering requires a JavaScript-enabled browser.

## Variants

| Variant | Block Name | Description |
|---|---|---|
| Standard (multiple open) | `accordion` | Multiple panels can be open simultaneously |
| Exclusive (single open) | `accordion (exclusive)` | Only one panel open at a time; opening a new one closes the previous |
| Show/hide (single item) | `show-hide` | Single collapsible section with "Show more" / "Show less" label |
| With rich content | `accordion` | Panel body contains images, tables, lists, or links |
| With deep-link anchor | `accordion` | URL fragment targets a specific panel and auto-expands it |

## Technical Notes
- Replaces: `DocAccordion`, `DocShowHide`
- Variant: `accordion (exclusive)` for single-open mode
- Variant: `show-hide` for the simple single-toggle pattern
- Uses native `<details>`/`<summary>` elements where appropriate, or ARIA button pattern
- Animation: CSS `max-height` transition or `grid-template-rows` for smooth expand/collapse

## Definition of Done
- [ ] Block renders correctly in EDS preview and live
- [ ] All 9 acceptance criteria pass
- [ ] Keyboard navigation verified manually
- [ ] Screen reader tested (NVDA/VoiceOver)
- [ ] Passes Lighthouse accessibility audit (score ≥ 90)
- [ ] Authored and verified in SharePoint/Google Drive document
- [ ] Code reviewed and merged
- [ ] Documented with authoring guide
