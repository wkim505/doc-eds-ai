# User Story: Link List Block

## Summary
Implement a `link-list` EDS block to replace the `DocPopularLinks` and `DocChildPageLinks` Vue components on the DOC NZ website.

## User Story
**As a** DOC content author,  
**I want to** display a styled list of navigation links on a page using a document table,  
**So that** visitors can quickly access the most popular or relevant pages within a section (e.g. "Walking & tramping", "Stay at a campsite", "Great Walks").

## Background
Popular links lists appear in the main navigation mega-menu panels and on section landing pages to surface the most-visited destinations within each section. The existing `DocPopularLinks` component renders a compact, icon-accented list of internal links. These are some of the highest-traffic navigation elements on the site.

## Acceptance Criteria

### AC1 — Basic link list rendering
- **Given** a page document contains a `link-list` block with multiple link rows (link text + URL),  
- **When** the page renders,  
- **Then** a styled vertical list of links is displayed with consistent spacing and typography.

### AC2 — Section colour accent
- **Given** the page has a `section-theme` metadata value,  
- **When** the link list renders,  
- **Then** each link has a left border, icon, or underline in the section's brand colour.

### AC3 — Optional heading
- **Given** a `link-list` block includes a heading row,  
- **When** the block renders,  
- **Then** the heading appears above the list styled as a sub-section label.

### AC4 — External link indicator
- **Given** a link in the list points to an external domain,  
- **When** rendered,  
- **Then** an external link icon appears after the link text and the link opens in a new tab with `rel="noopener noreferrer"`.

### AC5 — Horizontal layout variant
- **Given** a `link-list (horizontal)` variant is specified,  
- **When** the block renders on desktop,  
- **Then** links are displayed in a horizontal row (wrapping on overflow), suitable for use in nav panels.

### AC6 — Keyboard accessibility
- **Given** a user navigates the link list with keyboard,  
- **When** tabbing through links,  
- **Then** each link receives a visible focus indicator and can be activated with `Enter`.

### AC7 — Mobile layout
- **Given** the link list is viewed on mobile (< 768px),  
- **When** rendered,  
- **Then** all links are displayed in a stacked vertical layout with adequate tap target size (minimum 44×44px).

## Live Reference

| Variant | Live URL | Notes |
|---|---|---|
| Popular links in nav panel | https://www.doc.govt.nz/ | Visible in Parks & Rec mega-nav "Popular" column (requires hover on desktop) |
| Child section links | https://www.doc.govt.nz/parks-and-recreation/places-to-go/northland/ | "Nearby places" or sub-section links list |
| Section index links | https://www.doc.govt.nz/nature/native-animals/ | Animal group navigation links |
| Related links sidebar | https://www.doc.govt.nz/nature/pests-and-threats/predator-free-2050/ | "Related" links panel |

> **Note:** The site is a Vue.js SPA — full rendering requires a JavaScript-enabled browser.

## Variants

| Variant | Block Name | Description |
|---|---|---|
| Vertical (default) | `link-list` | Stacked vertical list with section colour accent |
| Horizontal | `link-list (horizontal)` | Inline row of links; used in nav panels and footer |
| With heading | `link-list` | Optional section heading label above the list |
| With external link icons | `link-list` | External links display an icon and open in new tab |
| With section colour | `link-list` | Left border or underline uses `section-theme` colour |

## Technical Notes
- Replaces: `DocPopularLinks`, `DocChildPageLinks` (list-only usage)
- Variant: `link-list (horizontal)` for nav panel usage
- External link detection: `href` starts with `http` and domain differs from `doc.govt.nz`
- Section theme from `getMetadata('section-theme')`

## Definition of Done
- [ ] Block renders correctly in EDS preview and live
- [ ] All 7 acceptance criteria pass
- [ ] Tap targets verified at mobile viewport
- [ ] Authored and verified in SharePoint/Google Drive document
- [ ] Code reviewed and merged
- [ ] Documented with authoring guide
