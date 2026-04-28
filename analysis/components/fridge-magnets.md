# Fridge Magnets — EDS Block Specification

> **Block ID:** DOCEDS-019  
> **Block Folder:** `blocks/fridge-magnets/`  
> **Priority:** Medium  
> **Complexity:** M  
> **Source Components:** doc-fridge-magnet-group

---

## User Story

**As a** visitor, **I want to** see a grid of square icon-based quick-links for activities **so that** I can quickly identify and navigate to the type of outdoor activity I am interested in.

## Description

The Fridge Magnets block renders a distinctive grid of square, colourful quick-link tiles — each featuring an activity icon and a short label. On the live DOC NZ site, this pattern appears prominently on the "Things to do" page at `/parks-and-recreation/things-to-do/`, where the `doc-fridge-magnet-group` Vue component displays activity categories such as walking, camping, cycling, fishing, hunting, and boating as visually appealing icon tiles arranged in a 4–6 column grid.

The design intentionally mimics the look of refrigerator magnets — square tiles with rounded corners, a coloured background, a centred icon, and a label below. Each tile links to the corresponding activity listing page. The visual metaphor is playful and inviting, encouraging exploration of outdoor activities.

In EDS, the block outputs a CSS Grid of square tiles with a consistent aspect ratio (1:1). Each tile features a coloured background (using DOC's activity colour palette), a centred SVG icon, and a label. The grid uses 6 columns on large desktops, 4 on standard desktops, 3 on tablet, and 2 on mobile. Icons should be sourced from the `/icons/` directory as SVG files for crisp rendering at any size.

## Acceptance Criteria

1. Tiles render in a CSS Grid: 6 cols on large desktop (≥ 1280px), 4 on desktop (≥ 1024px), 3 on tablet, 2 on mobile.
2. Each tile is square (1:1 aspect ratio) with rounded corners.
3. Each tile displays a centred icon above a short label.
4. Tiles have distinct background colours from the DOC activity colour palette.
5. The entire tile is clickable, navigating to the activity listing page.
6. Hover state slightly elevates the tile and intensifies the background colour.
7. Focus state shows a visible outline for keyboard navigation.
8. Icons render as SVGs at 48×48px on desktop, 36×36px on mobile.
9. Labels truncate with ellipsis if they exceed the tile width.
10. Block supports 4–12 tiles without layout issues.
11. Grid alignment is centred when the last row has fewer tiles than columns.

## Technical Notes for EDS

### DOM Structure
```html
<div class="fridge-magnets">
  <ul class="fridge-magnets-grid">
    <li class="fridge-magnets-tile" style="--tile-bg: #4a9e3f;">
      <a href="/parks-and-recreation/things-to-do/walking-and-tramping/" class="fridge-magnets-link">
        <span class="fridge-magnets-icon">
          <img src="/icons/walking.svg" alt="" aria-hidden="true" width="48" height="48">
        </span>
        <span class="fridge-magnets-label">Walking & Tramping</span>
      </a>
    </li>
    <li class="fridge-magnets-tile" style="--tile-bg: #2e7d32;">
      <a href="/parks-and-recreation/things-to-do/camping/" class="fridge-magnets-link">
        <span class="fridge-magnets-icon">
          <img src="/icons/camping.svg" alt="" aria-hidden="true" width="48" height="48">
        </span>
        <span class="fridge-magnets-label">Camping</span>
      </a>
    </li>
    <li class="fridge-magnets-tile" style="--tile-bg: #e65100;">
      <a href="/parks-and-recreation/things-to-do/mountain-biking/" class="fridge-magnets-link">
        <span class="fridge-magnets-icon">
          <img src="/icons/cycling.svg" alt="" aria-hidden="true" width="48" height="48">
        </span>
        <span class="fridge-magnets-label">Mountain Biking</span>
      </a>
    </li>
    <li class="fridge-magnets-tile" style="--tile-bg: #1565c0;">
      <a href="/parks-and-recreation/things-to-do/fishing/" class="fridge-magnets-link">
        <span class="fridge-magnets-icon">
          <img src="/icons/fishing.svg" alt="" aria-hidden="true" width="48" height="48">
        </span>
        <span class="fridge-magnets-label">Fishing</span>
      </a>
    </li>
    <li class="fridge-magnets-tile" style="--tile-bg: #6a1b9a;">
      <a href="/parks-and-recreation/things-to-do/hunting/" class="fridge-magnets-link">
        <span class="fridge-magnets-icon">
          <img src="/icons/hunting.svg" alt="" aria-hidden="true" width="48" height="48">
        </span>
        <span class="fridge-magnets-label">Hunting</span>
      </a>
    </li>
    <li class="fridge-magnets-tile" style="--tile-bg: #00838f;">
      <a href="/parks-and-recreation/things-to-do/boating/" class="fridge-magnets-link">
        <span class="fridge-magnets-icon">
          <img src="/icons/boating.svg" alt="" aria-hidden="true" width="48" height="48">
        </span>
        <span class="fridge-magnets-label">Boating</span>
      </a>
    </li>
    <!-- Additional tiles -->
  </ul>
</div>
```

### CSS Requirements
```css
.fridge-magnets {
  margin: var(--spacing-l) 0;
}

.fridge-magnets-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--spacing-s, 16px);
  list-style: none;
  padding: 0;
  margin: 0;
  justify-items: center;
}

.fridge-magnets-tile {
  width: 100%;
  aspect-ratio: 1 / 1;
  border-radius: var(--border-radius-l, 12px);
  overflow: hidden;
  background: var(--tile-bg, #4a9e3f);
  transition: transform 0.2s, box-shadow 0.2s, filter 0.2s;
}

.fridge-magnets-tile:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
  filter: brightness(1.1);
}

.fridge-magnets-link {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 100%;
  height: 100%;
  padding: var(--spacing-m);
  text-decoration: none;
  color: white;
  gap: var(--spacing-s);
}

.fridge-magnets-link:focus-visible {
  outline: 3px solid var(--color-focus, #ffdd00);
  outline-offset: -3px;
  border-radius: var(--border-radius-l, 12px);
}

.fridge-magnets-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
}

.fridge-magnets-icon img,
.fridge-magnets-icon svg {
  width: 100%;
  height: 100%;
  filter: brightness(0) invert(1); /* ensure white icons on coloured bg */
}

.fridge-magnets-label {
  font-size: var(--font-size-s, 0.875rem);
  font-weight: var(--font-weight-semibold, 600);
  line-height: 1.2;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
}

@media (min-width: 1280px) {
  .fridge-magnets-grid {
    grid-template-columns: repeat(6, 1fr);
  }
}

@media (max-width: 1023px) {
  .fridge-magnets-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 767px) {
  .fridge-magnets-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .fridge-magnets-icon {
    width: 36px;
    height: 36px;
  }

  .fridge-magnets-label {
    font-size: var(--font-size-xs, 0.75rem);
  }
}
```

### JS Requirements
```
- Block decoration:
  1. Parse each row in the block table as a fridge magnet tile.
  2. Extract icon image, label text, link URL, and optional background colour.
  3. Build tile DOM with coloured background, centred icon, and label.
  4. Set --tile-bg CSS custom property from the colour value in the block data.
- Colour assignment: if no colour is specified per tile, cycle through a default
  DOC activity colour palette:
  ["#4a9e3f", "#2e7d32", "#e65100", "#1565c0", "#6a1b9a", "#00838f",
   "#c62828", "#f9a825", "#00695c", "#ad1457"]
- Icon loading: use <img> tags pointing to /icons/ SVG files.
  Apply CSS filter to invert icons to white on coloured backgrounds.
```

### Document Authoring (Google Docs)
Authors create a **Fridge Magnets** block using a table:

| Fridge Magnets                                                               |
|------------------------------------------------------------------------------|
| ![Walking icon](/icons/walking.svg)                                          |
| [Walking & Tramping](/parks-and-recreation/things-to-do/walking-and-tramping/)|
| Colour: #4a9e3f                                                             |
| ---                                                                          |
| ![Camping icon](/icons/camping.svg)                                          |
| [Camping](/parks-and-recreation/things-to-do/camping/)                       |
| Colour: #2e7d32                                                             |
| ---                                                                          |
| ![Cycling icon](/icons/cycling.svg)                                          |
| [Mountain Biking](/parks-and-recreation/things-to-do/mountain-biking/)       |
| Colour: #e65100                                                             |

- Each tile is separated by a `---` divider row.
- **Icon row:** SVG icon image for the activity.
- **Title row:** A hyperlink with the label text and destination URL.
- **Colour row:** `Colour:` prefix followed by a hex colour value (optional; auto-assigned if omitted).

## AI Implementation Instructions

### Mandatory Skills
- Adobe Experience Modernization
- EDS Block Development

### Validation Loop
Use Chrome MCP iteratively to verify DOM output against the original site's functional requirements at https://www.doc.govt.nz/ before marking the task complete.

### Reference
- Live URL: https://www.doc.govt.nz/parks-and-recreation/things-to-do/ (fridge magnet grid)
- Vue source: doc-fridge-magnet-group
- CSS classes: `fridge-magnet`, `fridge-magnet-group`, `fridge-magnet__icon`, `fridge-magnet__label`
