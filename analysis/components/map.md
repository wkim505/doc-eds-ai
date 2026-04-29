# Map Block — Component Specification

## User Story
**DOCEDS-026**
**As a** site visitor, **I want to** view interactive maps showing locations of parks, tracks, and facilities **so that** I can plan my visit geographically.

## Description
Interactive map component using ArcGIS services. Has two variants: standard map and hotspot map with clickable regions.

## Source Vue Components
- `DocMap` (2 chunk variants: `BlX4ylh1.js` and `NpNvT-GI.js`)
- `DocHotSpotMap` — clickable region map variant

## External Dependencies
- ArcGIS: `services.arcgisonline.co.nz`
- DOC Maps: `/map/index.html`

## Acceptance Criteria
1. ArcGIS map embed with DOC markers/layers
2. Markers for points of interest (parks, huts, campsites)
3. HotSpot variant for clickable regions (image-based map)
4. Responsive container
5. Zoom/pan controls
6. Must handle no-JS gracefully (link to standalone map)

## Technical Notes for EDS
### JS Requirements
- ArcGIS JS API integration
- Map initialization with DOC feature layers
- Marker clustering for dense areas
- HotSpot variant: image map with clickable areas

### Block Structure
```
map (block)
├── map-container
│   ├── arcgis-map (standard variant)
│   └── hotspot-image-map (hotspot variant)
└── fallback-link (/map/index.html)
```

## AI Implementation Instructions
### Mandatory Skills
- `building-blocks` — EDS block JS/CSS structure and decoration

### Validation Loop
Use Chrome MCP to verify map loads and markers display.

## Live References
| Variation | URL |
|-----------|-----|
| Standard map | https://www.doc.govt.nz/map/index.html |
| Content page with map | https://www.doc.govt.nz/parks-and-recreation/ |
