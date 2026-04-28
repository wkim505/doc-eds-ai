# Link Tiles — EDS Block Specification

> **Block ID:** DOCEDS-017  
> **Block Folder:** `blocks/link-tiles/`  
> **Priority:** High  
> **Complexity:** M  
> **Source Components:** doc-link-tile, abn-link-tile, doc-park-rec-link-tile, doc-child-page-links, doc-child-page-link

---

## User Story

**As a** visitor, **I want to** see a grid of clickable navigation tiles with icons or images **so that** I can quickly find and navigate to key sections of the site.

## Description

The Link Tiles block renders a grid of clickable navigation tiles, each containing an icon or small image alongside a title. On the live DOC NZ site, this pattern is used extensively on section landing pages to guide visitors to child pages. The `doc-link-tile` and `abn-link-tile` components display simple icon + title tiles, while `doc-park-rec-link-tile` adds a parks & recreation variant with activity icons (walking, camping, cycling, etc.). The `doc-child-page-links` and `doc-child-page-link` components render hierarchical navigation tiles linking to child pages of the current section.

In EDS, the block outputs a CSS Grid of uniformly sized tiles. Each tile is a fully clickable anchor element containing an icon/image and a title. The grid adapts responsively: 4 columns on desktop, 3 on tablet, and 2 on mobile. The parks variant uses DOC's activity icon set and applies a green accent colour scheme. A hover state subtly highlights the tile with a background colour change and slight elevation.

The block can be configured with or without icons. When icons are used, they should be SVG icons loaded from the `/icons/` directory or inline SVGs for performance. For the child-page-links variant, the block auto-generates tiles from the site's page hierarchy.

## Acceptance Criteria

1. Tiles render in a CSS Grid: 4 columns on desktop, 3 on tablet, 2 on mobile.
2. Each tile is a fully clickable anchor element with icon/image and title.
3. Hover state shows a subtle background colour change and shadow lift.
4. Focus state displays a visible outline for keyboard navigation.
5. Icons render as inline SVGs or `<img>` elements within each tile.
6. Parks variant uses DOC activity icon set with green accent colour.
7. Tiles without icons display a default placeholder or text-only layout.
8. All tiles in a row have equal height regardless of title length.
9. Block supports 2–12 tiles without layout breaking.
10. Child-page-links variant auto-generates tiles from page index data.

## Technical Notes for EDS

### DOM Structure
```html
<div class="link-tiles">
  <ul class="link-tiles-grid">
    <li class="link-tiles-tile">
      <a href="/parks-and-recreation/things-to-do/walking-and-tramping/" class="link-tiles-link">
        <span class="link-tiles-icon">
          <img src="/icons/walking.svg" alt="" aria-hidden="true" width="48" height="48">
        </span>
        <span class="link-tiles-title">Walking & Tramping</span>
      </a>
    </li>
    <li class="link-tiles-tile">
      <a href="/parks-and-recreation/things-to-do/camping/" class="link-tiles-link">
        <span class="link-tiles-icon">
          <img src="/icons/camping.svg" alt="" aria-hidden="true" width="48" height="48">
        </span>
        <span class="link-tiles-title">Camping</span>
      </a>
    </li>
    <li class="link-tiles-tile">
      <a href="/parks-and-recreation/things-to-do/mountain-biking/" class="link-tiles-link">
        <span class="link-tiles-icon">
          <img src="/icons/cycling.svg" alt="" aria-hidden="true" width="48" height="48">
        </span>
        <span class="link-tiles-title">Mountain Biking</span>
      </a>
    </li>
    <li class="link-tiles-tile">
      <a href="/parks-and-recreation/things-to-do/fishing/" class="link-tiles-link">
        <span class="link-tiles-icon">
          <img src="/icons/fishing.svg" alt="" aria-hidden="true" width="48" height="48">
        </span>
        <span class="link-tiles-title">Fishing</span>
      </a>
    </li>
    <!-- Additional tiles -->
  </ul>
</div>
```

### CSS Requirements
```css
.link-tiles {
  margin: var(--spacing-l) 0;
}

.link-tiles-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--spacing-s, 16px);
  list-style: none;
  padding: 0;
  margin: 0;
}

.link-tiles-tile {
  border-radius: var(--border-radius-m, 8px);
  overflow: hidden;
  background: var(--color-background, #fff);
  border: 1px solid var(--color-border, #e0e0e0);
  transition: background-color 0.2s, box-shadow 0.2s, transform 0.2s;
}

.link-tiles-tile:hover {
  background: var(--color-background-hover, #f0f7f6);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transform: translateY(-1px);
}

.link-tiles-link {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: var(--spacing-m);
  text-decoration: none;
  color: var(--color-text, #333);
  height: 100%;
  gap: var(--spacing-s);
}

.link-tiles-link:focus-visible {
  outline: 2px solid var(--color-primary, #00524e);
  outline-offset: -2px;
  border-radius: var(--border-radius-m, 8px);
}

.link-tiles-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
}

.link-tiles-icon img,
.link-tiles-icon svg {
  width: 100%;
  height: 100%;
}

.link-tiles-title {
  font-size: var(--font-size-s, 0.875rem);
  font-weight: var(--font-weight-semibold, 600);
  color: var(--color-primary, #00524e);
  line-height: 1.3;
}

/* Parks variant — green accent */
.link-tiles.parks .link-tiles-tile {
  border-color: var(--color-primary-light, #e0f2f1);
  background: var(--color-primary-lightest, #f0f7f6);
}

.link-tiles.parks .link-tiles-tile:hover {
  background: var(--color-primary-light, #e0f2f1);
}

@media (max-width: 1023px) {
  .link-tiles-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 767px) {
  .link-tiles-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .link-tiles-link {
    padding: var(--spacing-s);
  }

  .link-tiles-icon {
    width: 36px;
    height: 36px;
  }
}
```

### JS Requirements
```
- Block decoration:
  1. Parse each row in the block table as a tile.
  2. Extract icon image/SVG, title text, and link URL.
  3. Build tile DOM structure and append to the grid.
- Parks variant: if block name is "Link Tiles (parks)", apply .parks class.
- Child-page-links variant: if block name is "Link Tiles (auto)":
  1. Fetch the page's query-index.json to get child pages.
  2. Build tiles dynamically from the child page data (title, path, image).
  3. Handle loading state with skeleton placeholders.
- Icon loading: prefer inline <img> for SVG icons from /icons/ directory.
```

### Document Authoring (Google Docs)
Authors create a **Link Tiles** block using a table:

| Link Tiles                                                                   |
|------------------------------------------------------------------------------|
| ![Walking icon](/icons/walking.svg)                                          |
| [Walking & Tramping](/parks-and-recreation/things-to-do/walking-and-tramping/)|
| ---                                                                          |
| ![Camping icon](/icons/camping.svg)                                          |
| [Camping](/parks-and-recreation/things-to-do/camping/)                       |
| ---                                                                          |
| ![Cycling icon](/icons/cycling.svg)                                          |
| [Mountain Biking](/parks-and-recreation/things-to-do/mountain-biking/)       |

- Each tile is separated by a `---` divider row.
- **Icon row:** An image (SVG icon preferred) — optional, omit for text-only tiles.
- **Title row:** A hyperlink with the tile title and destination URL.

For parks variant: `Link Tiles (parks)`
For auto-generated child-page tiles: `Link Tiles (auto)` (no table rows needed; tiles generated from page index).

## AI Implementation Instructions

### Mandatory Skills
- Adobe Experience Modernization
- EDS Block Development

### Validation Loop
Use Chrome MCP iteratively to verify DOM output against the original site's functional requirements at https://www.doc.govt.nz/ before marking the task complete.

### Reference
- Live URL: https://www.doc.govt.nz/parks-and-recreation/ (section landing pages with navigation tiles)
- Vue source: doc-link-tile, abn-link-tile, doc-park-rec-link-tile, doc-child-page-links, doc-child-page-link
- CSS classes: `link-tile`, `link-tile__icon`, `link-tile__title`, `child-page-links`, `park-rec-link-tile`
