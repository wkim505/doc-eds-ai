# User Story: Region Selector Block

## Summary
Implement a `region-selector` EDS block to replace the `DocRegionSelectorPanel` Vue component on the DOC NZ website.

## User Story
**As a** DOC NZ website visitor,  
**I want to** select a New Zealand region from an interactive map or dropdown,  
**So that** I can filter parks, tracks, huts, and activities relevant to the region I plan to visit.

## Background
The `DocRegionSelectorPanel` component presents an interactive SVG map of New Zealand divided into DOC's regional zones, allowing users to click a region to navigate to relevant content. It also provides a text dropdown as an accessible alternative. This is a primary navigation tool for Parks & Recreation content discovery.

## Acceptance Criteria

### AC1 — Interactive SVG map rendering
- **Given** a page contains a `region-selector` block,  
- **When** the page loads,  
- **Then** an interactive SVG map of New Zealand is displayed with clearly delineated DOC regions (e.g. Northland, Auckland, Waikato, Bay of Plenty, East Coast, Hawke's Bay, Wellington/Kapiti, Nelson/Marlborough, West Coast, Canterbury, Otago, Southland, Fiordland, Stewart Island).

### AC2 — Region hover state
- **Given** the region map is rendered on a desktop device,  
- **When** a user hovers over a region,  
- **Then** the region polygon highlights with the section brand colour and a tooltip showing the region name appears.

### AC3 — Region click navigation
- **Given** a user clicks a region on the map,  
- **When** the click event fires,  
- **Then** the user is navigated to the correct DOC regional content page (e.g. `/parks-and-recreation/places-to-go/northland/`).

### AC4 — Dropdown alternative
- **Given** the region selector block is rendered,  
- **When** on any device or when the SVG map cannot render,  
- **Then** a labelled `<select>` dropdown listing all regions is also present, providing an accessible alternative to the map.

### AC5 — Mobile fallback
- **Given** the block is viewed on a mobile device (< 768px),  
- **When** the page loads,  
- **Then** the SVG map is replaced by (or supplemented with) the dropdown selector as the primary interaction method, given the difficulty of tapping small SVG regions.

### AC6 — Keyboard accessibility
- **Given** a user navigates using keyboard,  
- **When** focus enters the SVG map,  
- **Then** each region is a focusable element (via `tabindex`) with an accessible name, and `Enter` navigates to the region's page.

### AC7 — Selected region highlight
- **Given** the current page is within a specific region's content hierarchy,  
- **When** the region selector renders,  
- **Then** the user's current region is highlighted on the map and pre-selected in the dropdown.

### AC8 — ARIA labels on SVG
- **Given** the SVG map regions are rendered,  
- **When** inspected with a screen reader,  
- **Then** the SVG has `role="img"` with a descriptive `aria-label`, and each interactive region has `role="link"` or `role="button"` with the region name as its accessible label.

## Live Reference

| Variant | Live URL | Notes |
|---|---|---|
| Full NZ region map | https://www.doc.govt.nz/parks-and-recreation/places-to-go/ | Interactive NZ SVG map for region selection |
| Region selector on landing | https://www.doc.govt.nz/parks-and-recreation/places-to-stay/ | "Select your region" map for hut/campsite browsing |

> **Note:** The region selector map is entirely client-side. Navigate to the above URL in a JavaScript-enabled browser and interact with the SVG map.

## Variants

| Variant | Block Name | Description |
|---|---|---|
| Full SVG map | `region-selector` | Interactive NZ map with clickable SVG region polygons |
| Dropdown only | `region-selector (dropdown)` | `<select>` element listing all regions; mobile-default and no-JS fallback |
| With current region highlighted | `region-selector` | Auto-highlights user's current region based on page URL hierarchy |

## Technical Notes
- Replaces: `DocRegionSelectorPanel`
- SVG map: custom NZ regional boundaries (DOC regions, not Stats NZ regions)
- Region URL pattern: `/parks-and-recreation/places-to-go/{region-slug}/`
- Current region detection: compare URL path to region slug list
- Mobile breakpoint: ≤ 767px uses dropdown as primary control

## Definition of Done
- [ ] Block renders correctly in EDS preview and live
- [ ] All 8 acceptance criteria pass
- [ ] SVG region boundaries match DOC's official regional content structure
- [ ] Keyboard navigation verified on SVG elements
- [ ] Screen reader tested (SVG ARIA roles)
- [ ] Mobile dropdown verified at 375px
- [ ] Authored and verified in SharePoint/Google Drive document
- [ ] Code reviewed and merged
- [ ] Documented with authoring guide
