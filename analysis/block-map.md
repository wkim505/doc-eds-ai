# User Story: Map Block

## Summary
Implement a `map` EDS block to replace the `DocMap` and `DocHotSpotMap` Vue components on the DOC NZ website, enabling embeddable map views on individual park, track, hut, and campsite pages.

## User Story
**As a** DOC content author,  
**I want to** embed an interactive or static map on a page using a document table with coordinates or a map URL,  
**So that** visitors can see the location of a track, hut, or park without leaving the page.

## Background
The `DocMap` component renders ArcGIS-powered interactive maps on destination pages showing track routes, hut locations, and park boundaries. The `DocHotSpotMap` displays hotspot markers on a static image map. For the EDS migration, page-level maps should use an ArcGIS embed (iframe) approach for V1, with a progressive enhancement path to the full ArcGIS JS SDK. The full DOC Maps app (`/map/index.html`) remains a standalone ArcGIS web app and is out of scope for this block.

## Acceptance Criteria

### AC1 — ArcGIS embed rendering
- **Given** a page document contains a `map` block with an ArcGIS web map URL,  
- **When** the page loads,  
- **Then** an ArcGIS embedded map renders within the content area, showing the specified map view (centred on the provided coordinates or extent).

### AC2 — Static map fallback
- **Given** a `map` block specifies a static image fallback (for no-JS or print),  
- **When** JavaScript is disabled or the page is printed,  
- **Then** a static map image is shown with appropriate alt text describing the location.

### AC3 — Lazy loading
- **Given** a map block is on the page,  
- **When** the page initially loads,  
- **Then** the ArcGIS iframe does not load until the block enters the viewport (Intersection Observer), preventing unnecessary third-party network requests on page load.

### AC4 — Coordinates display
- **Given** a `map` block includes latitude/longitude values,  
- **When** rendered,  
- **Then** the coordinates are displayed below the map in a human-readable format (e.g. "40.3523° S, 175.6082° E") for users who wish to use their own GPS device.

### AC5 — "Open in DOC Maps" link
- **Given** a map block renders,  
- **When** the user sees the map,  
- **Then** a link "Open in DOC Maps" is displayed beneath the map, linking to the full DOC Maps app with the relevant location pre-selected.

### AC6 — Map height/size variants
- **Given** a `map (large)` or `map (small)` variant is specified,  
- **When** the block renders,  
- **Then** the map iframe height adjusts accordingly (small: 300px, default: 450px, large: 600px).

### AC7 — Accessible title for iframe
- **Given** a map block renders an iframe,  
- **When** inspected with a screen reader,  
- **Then** the iframe has a descriptive `title` attribute (e.g. "Map showing Mount Victoria Loop Track location").

### AC8 — Mobile responsiveness
- **Given** the map block is viewed on mobile,  
- **When** the page loads,  
- **Then** the map is full-width within the content column and the iframe height does not cause horizontal scroll.

## Live Reference

| Variant | Live URL | Notes |
|---|---|---|
| Regional hotspot map | https://www.doc.govt.nz/parks-and-recreation/places-to-go/northland/ | Map showing conservation areas in Northland |
| Full DOC Maps app | https://www.doc.govt.nz/map/index.html | Standalone ArcGIS web app (deep-link target only — not migrated) |
| Track route map | https://www.doc.govt.nz/parks-and-recreation/things-to-do/walking-and-tramping/waikato-walks/hakarimata-summit-track/ | Track route on individual walk page |
| Hut location map | https://www.doc.govt.nz/parks-and-recreation/places-to-stay/stay-in-a-hut/kime-hut/ | Single hut marker on hut detail page |

> **Note:** The site is a Vue.js SPA — full rendering requires a JavaScript-enabled browser. ArcGIS maps require the ArcGIS JS SDK and may not render in a basic scraper.

## Variants

| Variant | Block Name | Description |
|---|---|---|
| Default (450px height) | `map` | Standard embedded ArcGIS map |
| Small (300px) | `map (small)` | Compact map for sidebar or narrow columns |
| Large (600px) | `map (large)` | Expanded map for prominent destination pages |
| With coordinates display | `map` | GPS coordinates shown below the map |
| With "Open in DOC Maps" link | `map` | Always-present link to full DOC Maps app |
| Static image fallback | `map` | No-JS or print fallback using a static map image |

## Technical Notes
- Replaces: `DocMap`, `DocHotSpotMap`
- V1: ArcGIS iframe embed via `https://www.arcgis.com/apps/Embed/index.html?...`
- V2 (future): ArcGIS JS API 4.x loaded lazily in block JS
- Lazy load trigger: `IntersectionObserver` with 200px root margin
- DOC Maps deep-link pattern: `https://doc.govt.nz/map/index.html?location={lat},{lng}`
- Full DOC Maps app remains a standalone ArcGIS web app — not migrated to EDS

## Definition of Done
- [ ] Block renders correctly in EDS preview and live
- [ ] All 8 acceptance criteria pass
- [ ] ArcGIS iframe confirmed loading lazily (verified in Network tab)
- [ ] Static fallback verified with JS disabled
- [ ] Mobile layout verified at 375px
- [ ] Authored and verified in SharePoint/Google Drive document
- [ ] Code reviewed and merged
- [ ] Documented with authoring guide
