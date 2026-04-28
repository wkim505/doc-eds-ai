# Interactive Map — EDS Block Specification

> **Block ID:** DOCEDS-025  
> **Block Folder:** `blocks/map/`  
> **Priority:** Medium  
> **Complexity:** C  
> **Source Components:** doc-map

---

## User Story

**As a** site visitor, **I want to** see parks, tracks, and huts on an interactive map with clickable markers **so that** I can explore locations visually and find places near me.

## Description

The Interactive Map block renders a zoomable, pannable map using Leaflet.js with markers representing DOC places (parks, tracks, huts, campsites). Markers are clustered at lower zoom levels using the MarkerCluster plugin to prevent visual overload. Clicking a marker opens a popup with the place name, a brief description, and a link to the full detail page.

On the DOC NZ site, `doc-map` is used on place detail pages to show the specific location, and on listing/search pages to show multiple results geographically. The map supports a Map/List view toggle, typically implemented through integration with a tabs block. Users can zoom into regions to see individual markers emerge from clusters.

In EDS, the map block will load Leaflet.js and MarkerCluster from a CDN, accept a GeoJSON data source, and render markers with popup content. The block should be lazy-loaded (only initialise when scrolled into view) to avoid impacting initial page performance. Tile layers should use OpenStreetMap or the LINZ basemap tiles used by DOC.

## Acceptance Criteria

1. Map renders at the correct coordinates and zoom level for the given context.
2. Markers display at correct lat/lng positions from the provided data source.
3. Markers cluster at lower zoom levels and expand on zoom-in or cluster click.
4. Clicking a marker opens a popup with place name, short description, and detail page link.
5. Map is responsive — fills container width, maintains a 16:9 or similar aspect ratio.
6. Map is lazy-loaded via Intersection Observer — Leaflet JS/CSS loaded only when block enters viewport.
7. Map controls (zoom +/−, attribution) are visible and functional.
8. On mobile, map is still interactive with touch gestures (pinch to zoom, drag to pan).
9. A fallback message or static image displays if JavaScript is unavailable.
10. Map/List toggle integration: when used with a tabs block, switching to "Map" tab initialises/resizes the map.

## Technical Notes for EDS

### DOM Structure
```html
<div class="map-block">
  <div class="map-container" id="map-unique-id"
       data-lat="-41.2865"
       data-lng="174.7762"
       data-zoom="6"
       data-geojson="/api/places.geojson"
       style="aspect-ratio: 16/9;">
    <noscript>
      <p>Interactive map requires JavaScript. <a href="/parks-and-recreation/places-to-go/">Browse places as a list</a>.</p>
    </noscript>
  </div>
</div>
```

### CSS Requirements
```css
/* Map container */
.map-block { margin: 24px 0; }
.map-container {
  width: 100%; aspect-ratio: 16 / 9; min-height: 300px;
  border-radius: 8px; overflow: hidden;
  background: #e8e8e8;
}

/* Override Leaflet defaults for DOC branding */
.leaflet-popup-content-wrapper {
  border-radius: 8px; padding: 0;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}
.map-popup { padding: 12px 16px; }
.map-popup h3 { margin: 0 0 4px; font-size: 1rem; }
.map-popup p { margin: 0 0 8px; font-size: 0.85rem; color: var(--color-text-muted); }
.map-popup a { color: var(--color-primary); font-weight: 600; }

/* Marker cluster override */
.marker-cluster-small { background: rgba(0, 100, 0, 0.3); }
.marker-cluster-small div { background: rgba(0, 100, 0, 0.6); color: #fff; }
.marker-cluster-medium { background: rgba(0, 100, 0, 0.4); }
.marker-cluster-medium div { background: rgba(0, 100, 0, 0.7); color: #fff; }

/* Responsive */
@media (max-width: 768px) {
  .map-container { aspect-ratio: 4 / 3; min-height: 250px; }
}
```

### JS Requirements
- Use Intersection Observer to detect when `.map-container` enters the viewport.
- Dynamically load Leaflet CSS and JS from CDN (e.g., `https://unpkg.com/leaflet@1.9/dist/`).
- Dynamically load MarkerCluster plugin CSS and JS.
- Initialise the map with centre/zoom from `data-*` attributes.
- Add tile layer: OpenStreetMap or LINZ Topo basemap (`https://tiles.maps.linz.io/...`).
- Fetch GeoJSON from the `data-geojson` URL and add markers to a MarkerClusterGroup.
- Each marker popup renders: place name (linked), description excerpt, and category icon.
- On map/list toggle (if integrated with tabs): call `map.invalidateSize()` after tab switch to fix rendering.
- For single-place pages, render a single marker at the given coordinates with no clustering.
- Clean up map instance on block removal to prevent memory leaks.

### Document Authoring (Google Docs)

Authors create a **Map** table in Google Docs:

| Map        |                              |
|------------|------------------------------|
| lat        | -41.2865                     |
| lng        | 174.7762                     |
| zoom       | 6                            |
| data       | /api/places.geojson          |
| tiles      | osm                          |
| height     | 500                          |

- **Row 1:** Block name "Map".
- **lat/lng:** Centre coordinates for the map.
- **zoom:** Initial zoom level (1–18).
- **data:** URL to GeoJSON data source. If omitted, renders a single marker at the lat/lng.
- **tiles:** Tile provider (`osm` for OpenStreetMap, `linz` for LINZ basemap).
- **height:** Optional fixed height in pixels (overrides aspect ratio).

## AI Implementation Instructions

### Mandatory Skills
- Adobe Experience Modernization
- EDS Block Development

### Validation Loop
Use Chrome MCP iteratively to verify DOM output against the original site's functional requirements at https://www.doc.govt.nz/ before marking the task complete.

### Reference
- Live URL: Place detail pages (e.g., park/track pages with maps)
- Vue source: doc-map
- CSS classes: doc-map, leaflet-container, marker-cluster, leaflet-popup
