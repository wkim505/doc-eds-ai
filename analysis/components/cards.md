# Cards Grid — EDS Block Specification

> **Block ID:** DOCEDS-015  
> **Block Folder:** `blocks/cards/`  
> **Priority:** High  
> **Complexity:** M  
> **Source Components:** doc-feature-card, doc-standard-product-card, doc-resizable-product-card, abn-standard-product-card

---

## User Story

**As a** visitor, **I want to** browse a grid of visually rich cards linking to places, activities, or news articles **so that** I can quickly discover and navigate to content that interests me.

## Description

The Cards Grid block renders a responsive grid of linked cards, each containing an image, title, and short description. On the live DOC NZ site, this is one of the most widely used patterns — appearing on the Parks & Recreation landing page, the homepage, news listings, and activity category pages. The Vue components `doc-feature-card`, `doc-standard-product-card`, `doc-resizable-product-card`, and `abn-standard-product-card` implement several visual variants but share the same core card layout: a clickable card with an image header, a title, and a description body.

In EDS, the block outputs a CSS Grid container with responsive column counts: 3 columns on desktop (≥ 1024px), 2 columns on tablet (768px–1023px), and 1 column on mobile (< 768px). Each card is a fully clickable anchor element that wraps the image, title, and description. Images use the EDS media pipeline for optimised delivery. Cards have a subtle hover effect (shadow lift) to indicate interactivity.

The block supports an optional "featured" variant where the first card spans two columns and displays a larger image. Card content is authored in a Google Docs table, with each row representing a card.

## Acceptance Criteria

1. Cards render in a CSS Grid: 3 columns on desktop, 2 on tablet, 1 on mobile.
2. Each card contains an image, title, and description text.
3. The entire card is a clickable link wrapping all card content.
4. Card images maintain consistent aspect ratio (3:2) across all cards.
5. Hover state adds a subtle box-shadow lift effect.
6. Focus state shows a visible outline for keyboard navigation.
7. Featured variant: first card spans 2 columns with a larger image on desktop.
8. Card titles are rendered as heading elements (`<h3>` or appropriate level).
9. Images are lazy-loaded with responsive `srcset` attributes.
10. Empty card fields (no description or no image) render gracefully without broken layout.
11. Block supports 1–12 cards without layout issues.

## Technical Notes for EDS

### DOM Structure
```html
<div class="cards">
  <ul class="cards-grid">
    <li class="cards-card">
      <a href="/parks-and-recreation/places-to-go/fiordland/" class="cards-card-link">
        <div class="cards-card-image">
          <picture>
            <source type="image/webp" srcset="./media_hash.webp?width=400 400w, ./media_hash.webp?width=600 600w" sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw">
            <img src="./media_hash.jpeg?width=400" alt="Milford Sound, Fiordland" loading="lazy" width="400" height="267">
          </picture>
        </div>
        <div class="cards-card-body">
          <h3 class="cards-card-title">Fiordland National Park</h3>
          <p class="cards-card-description">Explore dramatic fiords, ancient rainforest, and some of New Zealand's most iconic Great Walks.</p>
        </div>
      </a>
    </li>
    <li class="cards-card">
      <a href="/parks-and-recreation/places-to-go/abel-tasman/" class="cards-card-link">
        <div class="cards-card-image">
          <picture>
            <source type="image/webp" srcset="./media_hash.webp?width=400 400w, ./media_hash.webp?width=600 600w" sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw">
            <img src="./media_hash.jpeg?width=400" alt="Golden beach at Abel Tasman" loading="lazy" width="400" height="267">
          </picture>
        </div>
        <div class="cards-card-body">
          <h3 class="cards-card-title">Abel Tasman National Park</h3>
          <p class="cards-card-description">Golden beaches, clear waters, and coastal walks in one of New Zealand's most popular parks.</p>
        </div>
      </a>
    </li>
    <!-- Additional cards -->
  </ul>
</div>
```

### CSS Requirements
```css
.cards {
  margin: var(--spacing-l) 0;
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--spacing-m, 24px);
  list-style: none;
  padding: 0;
  margin: 0;
}

.cards-card {
  border-radius: var(--border-radius-m, 8px);
  overflow: hidden;
  background: var(--color-background, #fff);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.2s ease, transform 0.2s ease;
}

.cards-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transform: translateY(-2px);
}

.cards-card-link {
  display: flex;
  flex-direction: column;
  text-decoration: none;
  color: inherit;
  height: 100%;
}

.cards-card-link:focus-visible {
  outline: 2px solid var(--color-primary, #00524e);
  outline-offset: 2px;
  border-radius: var(--border-radius-m, 8px);
}

.cards-card-image {
  aspect-ratio: 3 / 2;
  overflow: hidden;
}

.cards-card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.cards-card-body {
  padding: var(--spacing-s) var(--spacing-m);
  flex: 1;
}

.cards-card-title {
  font-size: var(--font-size-m, 1.125rem);
  font-weight: var(--font-weight-bold, 700);
  margin: 0 0 var(--spacing-xs) 0;
  color: var(--color-primary, #00524e);
}

.cards-card-description {
  font-size: var(--font-size-s, 0.875rem);
  color: var(--color-text-secondary, #555);
  margin: 0;
  line-height: 1.5;
}

/* Featured variant — first card spans 2 columns */
.cards.featured .cards-card:first-child {
  grid-column: span 2;
}

.cards.featured .cards-card:first-child .cards-card-image {
  aspect-ratio: 16 / 9;
}

@media (max-width: 1023px) {
  .cards-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 767px) {
  .cards-grid {
    grid-template-columns: 1fr;
  }

  .cards.featured .cards-card:first-child {
    grid-column: span 1;
  }
}
```

### JS Requirements
```
- No JavaScript required for the base grid layout.
- Block decoration function:
  1. Parse each row in the block table as a card.
  2. Extract image, title (first text element), description (subsequent text), and link URL.
  3. Build the card DOM structure and append to the grid.
  4. If the block has the "featured" variant class, apply .featured to the container.
- Optional: if more than 6 cards, implement a "Show more" button that reveals hidden cards.
```

### Document Authoring (Google Docs)
Authors create a **Cards** block using a multi-row, multi-column table:

| Cards                                                                        |
|------------------------------------------------------------------------------|
| ![Image alt text](image-url)                                                 |
| [Card Title](link-url)                                                       |
| Short description text for the card.                                         |
| ---                                                                          |
| ![Image alt text](image-url)                                                 |
| [Card Title](link-url)                                                       |
| Short description text for the card.                                         |
| ---                                                                          |
| ![Image alt text](image-url)                                                 |
| [Card Title](link-url)                                                       |
| Short description text for the card.                                         |

- Each card is separated by a `---` divider row.
- **Image row:** The card image (drag-and-drop).
- **Title row:** A hyperlink with the card title text and destination URL.
- **Description row:** Plain text description.

For the featured variant, use the block name `Cards (featured)`.

## AI Implementation Instructions

### Mandatory Skills
- Adobe Experience Modernization
- EDS Block Development

### Validation Loop
Use Chrome MCP iteratively to verify DOM output against the original site's functional requirements at https://www.doc.govt.nz/ before marking the task complete.

### Reference
- Live URL: https://www.doc.govt.nz/parks-and-recreation/ (card grids), https://www.doc.govt.nz/ (homepage widgets)
- Vue source: doc-feature-card, doc-standard-product-card, doc-resizable-product-card, abn-standard-product-card
- CSS classes: `card`, `card_header`, `card_link`, `product-card`, `product-media`, `product-description`
