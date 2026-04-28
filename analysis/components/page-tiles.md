# Page Tiles — EDS Block Specification

> **Block ID:** DOCEDS-018  
> **Block Folder:** `blocks/page-tiles/`  
> **Priority:** Medium  
> **Complexity:** M  
> **Source Components:** abn-page-tile, abn-page-tile-carousel

---

## User Story

**As a** visitor, **I want to** see image tiles linking to related child pages **so that** I can visually browse and navigate to relevant sub-sections of the site.

## Description

The Page Tiles block renders a grid or carousel of image-based tiles, each linking to a child page. On the live DOC NZ site, the `abn-page-tile` component appears on campaign pages and section landing pages, displaying a background image with an overlaid title for each linked page. The `abn-page-tile-carousel` variant arranges these tiles in a horizontal carousel for when there are many tiles to display without overwhelming the page layout.

In EDS, the block outputs either a CSS Grid layout (default) or a scroll-snap carousel layout (variant). Each tile features a background image with a semi-transparent overlay at the bottom containing the page title. Tiles are fully clickable anchor elements. The grid variant uses 3 columns on desktop, 2 on tablet, and 1 on mobile. The carousel variant displays tiles in a single scrollable row with navigation arrows.

Tiles use a consistent square or landscape aspect ratio (4:3) for visual uniformity. Images are served through the EDS media pipeline with WebP optimisation. The overlay gradient ensures text legibility over any image.

## Acceptance Criteria

1. Grid variant renders tiles in 3 columns on desktop, 2 on tablet, 1 on mobile.
2. Carousel variant renders tiles in a horizontal scroll-snap row with prev/next arrows.
3. Each tile displays a background image with an overlaid title at the bottom.
4. Tiles maintain a consistent 4:3 aspect ratio.
5. The entire tile area is clickable, linking to the target page.
6. Gradient overlay ensures WCAG AA text contrast for the title.
7. Hover state slightly scales the image and deepens the overlay.
8. Focus state displays a visible outline for keyboard navigation.
9. Images are lazy-loaded with responsive `srcset` attributes.
10. Block handles 1–12 tiles without layout issues.

## Technical Notes for EDS

### DOM Structure
```html
<!-- Grid variant -->
<div class="page-tiles">
  <ul class="page-tiles-grid">
    <li class="page-tiles-tile">
      <a href="/parks-and-recreation/places-to-go/fiordland/" class="page-tiles-link">
        <picture class="page-tiles-image">
          <source type="image/webp" srcset="./media_hash.webp?width=500 500w, ./media_hash.webp?width=800 800w">
          <img src="./media_hash.jpeg?width=500" alt="" loading="lazy" width="500" height="375" aria-hidden="true">
        </picture>
        <div class="page-tiles-overlay">
          <h3 class="page-tiles-title">Fiordland National Park</h3>
        </div>
      </a>
    </li>
    <li class="page-tiles-tile">
      <a href="/parks-and-recreation/places-to-go/tongariro/" class="page-tiles-link">
        <picture class="page-tiles-image">
          <source type="image/webp" srcset="./media_hash.webp?width=500 500w, ./media_hash.webp?width=800 800w">
          <img src="./media_hash.jpeg?width=500" alt="" loading="lazy" width="500" height="375" aria-hidden="true">
        </picture>
        <div class="page-tiles-overlay">
          <h3 class="page-tiles-title">Tongariro National Park</h3>
        </div>
      </a>
    </li>
    <!-- Additional tiles -->
  </ul>
</div>

<!-- Carousel variant -->
<div class="page-tiles carousel">
  <div class="page-tiles-track" role="region" aria-roledescription="carousel" aria-label="Related pages">
    <div class="page-tiles-slides">
      <a href="/destination/page-1/" class="page-tiles-tile" role="tabpanel">
        <picture class="page-tiles-image">
          <source type="image/webp" srcset="./media_hash.webp?width=500 500w">
          <img src="./media_hash.jpeg?width=500" alt="" loading="lazy" width="500" height="375" aria-hidden="true">
        </picture>
        <div class="page-tiles-overlay">
          <h3 class="page-tiles-title">Page Title</h3>
        </div>
      </a>
      <!-- Additional slides -->
    </div>
    <button class="page-tiles-arrow page-tiles-arrow-prev" aria-label="Previous">&#8249;</button>
    <button class="page-tiles-arrow page-tiles-arrow-next" aria-label="Next">&#8250;</button>
  </div>
</div>
```

### CSS Requirements
```css
.page-tiles {
  margin: var(--spacing-l) 0;
}

.page-tiles-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--spacing-m, 24px);
  list-style: none;
  padding: 0;
  margin: 0;
}

.page-tiles-tile {
  border-radius: var(--border-radius-m, 8px);
  overflow: hidden;
}

.page-tiles-link {
  position: relative;
  display: block;
  aspect-ratio: 4 / 3;
  overflow: hidden;
  text-decoration: none;
  color: white;
}

.page-tiles-image {
  position: absolute;
  inset: 0;
}

.page-tiles-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.3s ease;
}

.page-tiles-link:hover .page-tiles-image img {
  transform: scale(1.05);
}

.page-tiles-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: var(--spacing-m) var(--spacing-s);
  background: linear-gradient(to top, rgba(0, 0, 0, 0.65) 0%, transparent 100%);
  z-index: 1;
}

.page-tiles-title {
  font-size: var(--font-size-m, 1.125rem);
  font-weight: var(--font-weight-bold, 700);
  margin: 0;
  line-height: 1.3;
}

.page-tiles-link:focus-visible {
  outline: 3px solid var(--color-focus, #ffdd00);
  outline-offset: 2px;
  border-radius: var(--border-radius-m, 8px);
}

/* Carousel variant */
.page-tiles.carousel .page-tiles-track {
  position: relative;
}

.page-tiles.carousel .page-tiles-slides {
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  gap: var(--spacing-m);
  scrollbar-width: none;
}

.page-tiles.carousel .page-tiles-slides::-webkit-scrollbar {
  display: none;
}

.page-tiles.carousel .page-tiles-tile {
  flex: 0 0 calc(33.333% - var(--spacing-m));
  scroll-snap-align: start;
}

.page-tiles-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 1.5rem;
  z-index: 2;
}

.page-tiles-arrow-prev { left: var(--spacing-xs); }
.page-tiles-arrow-next { right: var(--spacing-xs); }

@media (max-width: 1023px) {
  .page-tiles-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .page-tiles.carousel .page-tiles-tile {
    flex: 0 0 calc(50% - var(--spacing-m));
  }
}

@media (max-width: 767px) {
  .page-tiles-grid {
    grid-template-columns: 1fr;
  }

  .page-tiles.carousel .page-tiles-tile {
    flex: 0 0 85%;
  }
}
```

### JS Requirements
```
- Block decoration:
  1. Parse each row in the block table as a tile.
  2. Extract image, title, and link URL for each tile.
  3. Build tile DOM with positioned image, gradient overlay, and title.
- Carousel variant (block name "Page Tiles (carousel)"):
  1. Apply .carousel class to the container.
  2. Replace grid with flex scroll-snap layout.
  3. Add prev/next arrow button handlers to scrollBy one tile width.
  4. Use IntersectionObserver to toggle arrow visibility at scroll boundaries.
- Lazy loading: native loading="lazy" attribute on images.
```

### Document Authoring (Google Docs)
Authors create a **Page Tiles** block using a table:

| Page Tiles                                                                   |
|------------------------------------------------------------------------------|
| ![Fiordland landscape](image-url)                                            |
| [Fiordland National Park](/parks-and-recreation/places-to-go/fiordland/)     |
| ---                                                                          |
| ![Tongariro landscape](image-url)                                            |
| [Tongariro National Park](/parks-and-recreation/places-to-go/tongariro/)     |
| ---                                                                          |
| ![Abel Tasman beach](image-url)                                              |
| [Abel Tasman National Park](/parks-and-recreation/places-to-go/abel-tasman/) |

- Each tile is separated by a `---` divider row.
- **Image row:** The tile background image.
- **Title row:** A hyperlink with the tile title and destination URL.

For carousel variant, use block name `Page Tiles (carousel)`.

## AI Implementation Instructions

### Mandatory Skills
- Adobe Experience Modernization
- EDS Block Development

### Validation Loop
Use Chrome MCP iteratively to verify DOM output against the original site's functional requirements at https://www.doc.govt.nz/ before marking the task complete.

### Reference
- Live URL: https://www.doc.govt.nz/ (campaign pages with page tile grids)
- Vue source: abn-page-tile, abn-page-tile-carousel
- CSS classes: `page-tile`, `page-tile__image`, `page-tile__title`, `page-tile-carousel`
