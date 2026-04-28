# Hotspot Region Map — EDS Block Specification

> **Block ID:** DOCEDS-026  
> **Block Folder:** `blocks/hotspot-map/`  
> **Priority:** Medium  
> **Complexity:** C  
> **Source Components:** doc-hot-spot-map, doc-region-selector-panel

---

## User Story

**As a** site visitor, **I want to** click on regions of a New Zealand map to explore parks and activities in that area **so that** I can browse DOC places by geographic region visually.

## Description

The Hotspot Region Map block displays an SVG map of New Zealand divided into clickable regions. Each region highlights on hover and navigates to the corresponding region page on click. This is the primary visual navigation pattern on the "Places to Go" landing page, allowing visitors to intuitively explore DOC locations by geography rather than text-based navigation.

On the Vue site, `doc-hot-spot-map` renders an inline SVG with `<path>` elements for each region. `doc-region-selector-panel` provides an adjacent panel listing region names as text links for accessibility and as an alternative to the map interaction. Hovering over a region in the SVG highlights the path fill colour, and hovering over a region name in the panel highlights the corresponding SVG path, creating a synchronised interaction.

In EDS, the block should render the SVG map inline for full CSS/JS control. The SVG paths need `data-region` attributes for JS targeting. The region panel should be rendered alongside the map (side-by-side on desktop, stacked on mobile) with hover synchronisation between map paths and panel links. Clicking either navigates to the region page.

## Acceptance Criteria

1. SVG map of New Zealand renders with distinct, clickable regions.
2. Hovering over a region path highlights it with a fill colour change.
3. Clicking a region navigates to the correct region page URL.
4. Adjacent region panel lists all region names as links.
5. Hover synchronisation: hovering a panel link highlights the corresponding SVG region, and vice versa.
6. Map and panel are side-by-side on desktop (map ~60%, panel ~40%).
7. On mobile, panel appears above or below the map in a stacked layout.
8. SVG regions are keyboard accessible: focusable with Tab, activatable with Enter.
9. Each SVG region has an accessible name via `<title>` or `aria-label`.
10. If SVG fails to load or JS is unavailable, the region panel still works as plain links.

## Technical Notes for EDS

### DOM Structure
```html
<div class="hotspot-map-block">
  <div class="hotspot-map-svg-container">
    <svg viewBox="0 0 400 800" class="hotspot-map-svg" role="img" aria-label="Map of New Zealand regions">
      <a href="/parks-and-recreation/places-to-go/northland/" data-region="northland">
        <title>Northland</title>
        <path d="M..." class="hotspot-region" />
      </a>
      <a href="/parks-and-recreation/places-to-go/auckland/" data-region="auckland">
        <title>Auckland</title>
        <path d="M..." class="hotspot-region" />
      </a>
      <a href="/parks-and-recreation/places-to-go/waikato/" data-region="waikato">
        <title>Waikato</title>
        <path d="M..." class="hotspot-region" />
      </a>
      <!-- More regions -->
    </svg>
  </div>

  <div class="hotspot-map-panel">
    <h3 class="hotspot-map-panel-title">Choose a region</h3>
    <ul class="hotspot-map-region-list" role="list">
      <li><a href="/parks-and-recreation/places-to-go/northland/" data-region="northland">Northland</a></li>
      <li><a href="/parks-and-recreation/places-to-go/auckland/" data-region="auckland">Auckland</a></li>
      <li><a href="/parks-and-recreation/places-to-go/waikato/" data-region="waikato">Waikato</a></li>
      <li><a href="/parks-and-recreation/places-to-go/bay-of-plenty/" data-region="bay-of-plenty">Bay of Plenty</a></li>
      <li><a href="/parks-and-recreation/places-to-go/east-coast/" data-region="east-coast">East Coast</a></li>
      <li><a href="/parks-and-recreation/places-to-go/central-north-island/" data-region="central-north-island">Central North Island</a></li>
      <li><a href="/parks-and-recreation/places-to-go/manawatu-whanganui/" data-region="manawatu-whanganui">Manawatū-Whanganui</a></li>
      <li><a href="/parks-and-recreation/places-to-go/wellington-kapiti/" data-region="wellington-kapiti">Wellington-Kapiti</a></li>
      <li><a href="/parks-and-recreation/places-to-go/nelson-tasman/" data-region="nelson-tasman">Nelson-Tasman</a></li>
      <li><a href="/parks-and-recreation/places-to-go/marlborough/" data-region="marlborough">Marlborough</a></li>
      <li><a href="/parks-and-recreation/places-to-go/west-coast/" data-region="west-coast">West Coast</a></li>
      <li><a href="/parks-and-recreation/places-to-go/canterbury/" data-region="canterbury">Canterbury</a></li>
      <li><a href="/parks-and-recreation/places-to-go/otago/" data-region="otago">Otago</a></li>
      <li><a href="/parks-and-recreation/places-to-go/southland/" data-region="southland">Southland</a></li>
    </ul>
  </div>
</div>
```

### CSS Requirements
```css
/* Layout */
.hotspot-map-block {
  display: grid; grid-template-columns: 3fr 2fr; gap: 32px;
  align-items: start; margin: 32px 0;
}

/* SVG Map */
.hotspot-map-svg-container { max-width: 400px; }
.hotspot-map-svg { width: 100%; height: auto; }
.hotspot-region {
  fill: var(--color-primary-light, #c8e6c9);
  stroke: #fff; stroke-width: 1.5;
  transition: fill 0.2s ease;
  cursor: pointer;
}
.hotspot-region:hover,
.hotspot-region.is-active {
  fill: var(--color-primary, #2e7d32);
}
.hotspot-region:focus {
  outline: 2px solid var(--color-focus);
  outline-offset: -2px;
}

/* Region panel */
.hotspot-map-panel-title { font-size: 1.25rem; margin-bottom: 12px; }
.hotspot-map-region-list { list-style: none; padding: 0; }
.hotspot-map-region-list li { margin-bottom: 4px; }
.hotspot-map-region-list a {
  display: block; padding: 8px 12px;
  color: var(--color-text); text-decoration: none;
  border-radius: 4px; transition: background 0.15s;
}
.hotspot-map-region-list a:hover,
.hotspot-map-region-list a.is-active {
  background: var(--color-primary-light);
  color: var(--color-primary-dark);
}

/* Responsive */
@media (max-width: 768px) {
  .hotspot-map-block { grid-template-columns: 1fr; }
  .hotspot-map-svg-container { max-width: 100%; margin: 0 auto; }
}
```

### JS Requirements
- Add `mouseenter`/`mouseleave` listeners to each `[data-region]` SVG link and panel link.
- On hover of SVG region: add `.is-active` class to the matching panel link (`[data-region="same"]`).
- On hover of panel link: add `.is-active` class to the matching SVG region path.
- On `mouseleave`: remove `.is-active` from all elements.
- On click: navigate to the `href` — SVG `<a>` elements handle this natively, but ensure touch devices work.
- Add `tabindex="0"` and keyboard event listeners for SVG regions if not natively focusable.
- SVG path data should be embedded in the block's HTML (stored as a static asset in the block folder).

### Document Authoring (Google Docs)

Authors create a **Hotspot Map** table in Google Docs:

| Hotspot Map |                                                              |
|-------------|--------------------------------------------------------------|
| title       | Choose a region                                              |
| Northland   | /parks-and-recreation/places-to-go/northland/                |
| Auckland    | /parks-and-recreation/places-to-go/auckland/                 |
| Waikato     | /parks-and-recreation/places-to-go/waikato/                  |
| Bay of Plenty | /parks-and-recreation/places-to-go/bay-of-plenty/          |
| East Coast  | /parks-and-recreation/places-to-go/east-coast/               |
| Central North Island | /parks-and-recreation/places-to-go/central-north-island/ |
| Manawatū-Whanganui | /parks-and-recreation/places-to-go/manawatu-whanganui/ |
| Wellington-Kapiti | /parks-and-recreation/places-to-go/wellington-kapiti/    |
| Nelson-Tasman | /parks-and-recreation/places-to-go/nelson-tasman/          |
| Marlborough | /parks-and-recreation/places-to-go/marlborough/              |
| West Coast  | /parks-and-recreation/places-to-go/west-coast/               |
| Canterbury  | /parks-and-recreation/places-to-go/canterbury/               |
| Otago       | /parks-and-recreation/places-to-go/otago/                    |
| Southland   | /parks-and-recreation/places-to-go/southland/                |

- **Row 1:** Block name "Hotspot Map".
- **title:** Heading text for the region panel.
- **Subsequent rows:** Column 1 = region name, Column 2 = destination URL.
- The SVG map itself is a static asset within the block folder, not authored in the document.

## AI Implementation Instructions

### Mandatory Skills
- Adobe Experience Modernization
- EDS Block Development

### Validation Loop
Use Chrome MCP iteratively to verify DOM output against the original site's functional requirements at https://www.doc.govt.nz/ before marking the task complete.

### Reference
- Live URL: https://www.doc.govt.nz/parks-and-recreation/places-to-go/
- Vue source: doc-hot-spot-map, doc-region-selector-panel
- CSS classes: hotspotmapblock, region-map-content-wrapper, hotspot-region, region-selector-panel
