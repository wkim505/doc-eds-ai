# Section Highlights — EDS Block Specification

> **Block ID:** DOCEDS-009  
> **Block Folder:** `blocks/highlights/`  
> **Priority:** Medium  
> **Complexity:** M  
> **Source Components:** doc-highlights

---

## User Story

**As a** site visitor, **I want to** see featured content highlighted in a visually distinct band on section landing pages **so that** I can quickly discover the most important or popular items in this section.

## Description

The Section Highlights component renders a full-width coloured background band that breaks up the white page content with a visually prominent section. It contains a heading (e.g., "Popular places", "Featured stories") followed by a grid of card items, each linking to a detail page. The cards typically feature an image thumbnail, a title, and an optional short description.

On the live DOC site, `doc-highlights` renders this band using the CSS class `section-highlights` for the container and `section-item` for each card. The background colour is typically a light grey or muted green, providing contrast against the white content areas above and below. The card grid uses a responsive layout: three or four cards per row on desktop, two on tablet, and a single stacked column on mobile.

In EDS, the highlights block is authored as a table in Google Docs where each content row represents a card with its image, title, description, and link. The `blocks/highlights/highlights.js` decorator transforms this into the card grid layout with the coloured background band.

## Acceptance Criteria

1. The block renders as a full-width band with a coloured background (light grey or muted green).
2. A section heading is displayed at the top of the band (e.g., "Popular places").
3. Below the heading, a responsive card grid displays 3–4 cards per row on desktop.
4. Each card contains: a thumbnail image, a title (linked), and an optional short description.
5. Cards link to the target detail page.
6. On tablet (768–1024px), the grid displays 2 cards per row.
7. On mobile (< 768px), cards stack in a single column.
8. Card images use lazy loading and responsive `srcset` for performance.
9. The heading and card layout are centred within a max-width container.
10. Cards have consistent spacing (gap) and optional hover effects (subtle shadow or lift).

## Technical Notes for EDS

### DOM Structure

```html
<div class="highlights section-highlights">
  <div class="highlights__inner">
    <h2 class="highlights__heading">Popular places</h2>
    <div class="highlights__grid">
      <a href="/parks-and-recreation/places-to-go/abel-tasman/" class="highlights__card section-item">
        <div class="highlights__card-image">
          <picture>
            <source type="image/webp" srcset="./media_abel-tasman.webp?width=600&format=webply&optimize=medium" />
            <img src="./media_abel-tasman.jpeg?width=600&format=jpeg&optimize=medium"
                 alt="Abel Tasman golden beach" loading="lazy" width="600" height="400" />
          </picture>
        </div>
        <div class="highlights__card-body">
          <h3 class="highlights__card-title">Abel Tasman National Park</h3>
          <p class="highlights__card-desc">Golden beaches, coastal track, and kayaking adventures.</p>
        </div>
      </a>

      <a href="/parks-and-recreation/places-to-go/tongariro/" class="highlights__card section-item">
        <div class="highlights__card-image">
          <picture>
            <source type="image/webp" srcset="./media_tongariro.webp?width=600&format=webply&optimize=medium" />
            <img src="./media_tongariro.jpeg?width=600&format=jpeg&optimize=medium"
                 alt="Tongariro volcanic landscape" loading="lazy" width="600" height="400" />
          </picture>
        </div>
        <div class="highlights__card-body">
          <h3 class="highlights__card-title">Tongariro National Park</h3>
          <p class="highlights__card-desc">Home to the famous Tongariro Alpine Crossing.</p>
        </div>
      </a>

      <a href="/parks-and-recreation/places-to-go/fiordland/" class="highlights__card section-item">
        <div class="highlights__card-image">
          <picture>
            <source type="image/webp" srcset="./media_fiordland.webp?width=600&format=webply&optimize=medium" />
            <img src="./media_fiordland.jpeg?width=600&format=jpeg&optimize=medium"
                 alt="Milford Sound in Fiordland" loading="lazy" width="600" height="400" />
          </picture>
        </div>
        <div class="highlights__card-body">
          <h3 class="highlights__card-title">Fiordland National Park</h3>
          <p class="highlights__card-desc">Dramatic fiords, rainforest, and the Milford Track.</p>
        </div>
      </a>
    </div>
  </div>
</div>
```

### CSS Requirements

```css
.highlights {
  background-color: var(--color-grey-light, #F0F0F0);
  padding: 48px 24px;
}

.highlights__inner {
  max-width: 1200px;
  margin: 0 auto;
}

.highlights__heading {
  font-size: var(--heading-font-size-l, 1.75rem);
  margin: 0 0 32px 0;
  color: var(--text-color, #333);
}

.highlights__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.highlights__card {
  background: #fff;
  border-radius: 4px;
  overflow: hidden;
  text-decoration: none;
  color: inherit;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.2s, transform 0.2s;
}

.highlights__card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transform: translateY(-2px);
}

.highlights__card-image img {
  width: 100%;
  height: auto;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  display: block;
}

.highlights__card-body {
  padding: 16px;
}

.highlights__card-title {
  font-size: 1.125rem;
  font-weight: 600;
  margin: 0 0 8px 0;
  color: var(--link-color, #0053A3);
}

.highlights__card-desc {
  font-size: 0.875rem;
  margin: 0;
  color: var(--text-color-muted, #666);
  line-height: 1.5;
}

/* Tablet: 2 columns */
@media (max-width: 1024px) {
  .highlights__grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Mobile: 1 column */
@media (max-width: 768px) {
  .highlights {
    padding: 32px 16px;
  }

  .highlights__grid {
    grid-template-columns: 1fr;
  }

  .highlights__heading {
    font-size: var(--heading-font-size-m, 1.5rem);
  }
}
```

### JS Requirements

- `highlights.js` decorator reads the block table and constructs the card grid DOM.
- Row 1 of the content (after the block header) may contain the section heading text.
- Subsequent rows each represent a card: extract the image, title (as a link), and description from the table cells.
- Generate `<picture>` elements with EDS optimised `srcset` URLs from the authored images.
- Set `loading="lazy"` on all card images.
- No interactive JavaScript beyond DOM construction — hover effects are CSS-only.

### Document Authoring (Google Docs)

Authors create a highlights block using a **multi-row, multi-column table** in Google Docs:

| **Highlights**                   |                              |                   |
|----------------------------------|------------------------------|-------------------|
| Popular places                   |                              |                   |
| *(Abel Tasman image)*            | Abel Tasman National Park    | Golden beaches, coastal track, and kayaking adventures. |
| *(Tongariro image)*              | Tongariro National Park      | Home to the famous Tongariro Alpine Crossing. |
| *(Fiordland image)*              | Fiordland National Park      | Dramatic fiords, rainforest, and the Milford Track. |

- **Row 1 (header):** The word `Highlights` — identifies the block type.
- **Row 2:** Section heading text (e.g., "Popular places") spanning the row.
- **Rows 3+:** One row per card with three columns:
  - **Column 1:** Card image (inserted via Google Docs image insertion).
  - **Column 2:** Card title — make this a link to the target page.
  - **Column 3:** Short description (1–2 sentences).

## AI Implementation Instructions

### Mandatory Skills
- Adobe Experience Modernization
- EDS Block Development

### Validation Loop
Use Chrome MCP iteratively to verify DOM output against the original site's functional requirements at https://www.doc.govt.nz/ before marking the task complete. Confirm:
- Full-width coloured band renders with correct background colour.
- Card grid is responsive: 3 columns → 2 → 1 at defined breakpoints.
- Card images are lazy-loaded and use optimised formats.
- Card links navigate to the correct detail pages.
- Hover effects work on desktop.

### Reference
- Live URL: Section landing pages (e.g., https://www.doc.govt.nz/parks-and-recreation/)
- Vue source: `doc-highlights`
- CSS classes: `section-highlights`, `section-item`
