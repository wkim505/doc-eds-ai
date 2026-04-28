# Action Cards — EDS Block Specification

> **Block ID:** DOCEDS-016  
> **Block Folder:** `blocks/action-cards/`  
> **Priority:** High  
> **Complexity:** M  
> **Source Components:** abn-action-card, abn-action-card-carousel, abn-action-card-pills

---

## User Story

**As a** visitor, **I want to** see visually striking call-to-action cards with full-bleed background images **so that** I am drawn to key campaigns, activities, and featured content.

## Description

The Action Cards block renders large, visually impactful CTA cards featuring full-bleed background images with overlay text and optional category pills. On the live DOC NZ site, these appear prominently on the homepage and campaign pages — the `abn-action-card` component displays a background image overlaid with a heading, short description, and a call-to-action link. The `abn-action-card-carousel` variant arranges multiple action cards in a horizontal carousel with navigation controls, while `abn-action-card-pills` adds filterable category pill buttons above the cards.

In EDS, the block renders action cards as a grid or carousel of large clickable areas, each with a CSS background image (or `<img>` with object-fit cover and absolute positioning), a dark gradient overlay for text legibility, and the overlay content (heading, description, CTA button). The carousel variant reuses the scroll-snap pattern from DOCEDS-012. The pills variant adds a horizontal row of filter buttons above the cards that show/hide cards by category.

Cards must maintain a minimum height to ensure visual impact and consistent layout regardless of content length. The gradient overlay must ensure WCAG AA contrast for white text over any image.

## Acceptance Criteria

1. Each action card displays a full-bleed background image with a dark gradient overlay.
2. Overlay text (heading + description + CTA link) is legible with WCAG AA contrast.
3. The entire card area is clickable, navigating to the CTA URL.
4. Cards maintain a minimum height of 400px on desktop, 300px on mobile.
5. Grid layout: 2 columns on desktop, 1 column on mobile.
6. Carousel variant: horizontal scroll-snap with prev/next arrows.
7. Pills variant: category filter buttons show/hide cards by data attribute.
8. Active pill button is visually highlighted.
9. Cards use responsive images with `srcset` for different viewport sizes.
10. Hover state dims the overlay slightly to indicate interactivity.
11. Focus state shows visible outline on the card link.

## Technical Notes for EDS

### DOM Structure
```html
<!-- Grid variant -->
<div class="action-cards">
  <div class="action-cards-pills">
    <button class="action-cards-pill active" data-category="all">All</button>
    <button class="action-cards-pill" data-category="walks">Walks</button>
    <button class="action-cards-pill" data-category="wildlife">Wildlife</button>
    <button class="action-cards-pill" data-category="camping">Camping</button>
  </div>
  <div class="action-cards-grid">
    <a href="/great-walks/milford-track/" class="action-cards-card" data-category="walks">
      <picture class="action-cards-bg">
        <source type="image/webp" srcset="./media_hash.webp?width=800 800w, ./media_hash.webp?width=1200 1200w">
        <img src="./media_hash.jpeg?width=800" alt="" loading="lazy" width="800" height="500" aria-hidden="true">
      </picture>
      <div class="action-cards-overlay">
        <span class="action-cards-tag">Great Walks</span>
        <h3 class="action-cards-title">Milford Track</h3>
        <p class="action-cards-description">Walk one of the finest tracks in the world through dramatic mountain scenery.</p>
        <span class="action-cards-cta">Explore now →</span>
      </div>
    </a>
    <a href="/get-involved/volunteer/" class="action-cards-card" data-category="wildlife">
      <picture class="action-cards-bg">
        <source type="image/webp" srcset="./media_hash.webp?width=800 800w, ./media_hash.webp?width=1200 1200w">
        <img src="./media_hash.jpeg?width=800" alt="" loading="lazy" width="800" height="500" aria-hidden="true">
      </picture>
      <div class="action-cards-overlay">
        <span class="action-cards-tag">Get Involved</span>
        <h3 class="action-cards-title">Volunteer for Conservation</h3>
        <p class="action-cards-description">Join hands-on conservation projects protecting New Zealand's unique wildlife.</p>
        <span class="action-cards-cta">Learn more →</span>
      </div>
    </a>
    <!-- Additional cards -->
  </div>
</div>
```

### CSS Requirements
```css
.action-cards {
  margin: var(--spacing-l) 0;
}

.action-cards-pills {
  display: flex;
  gap: var(--spacing-xs);
  margin-bottom: var(--spacing-m);
  flex-wrap: wrap;
}

.action-cards-pill {
  padding: var(--spacing-xs) var(--spacing-s);
  border: 1px solid var(--color-border, #ccc);
  border-radius: var(--border-radius-pill, 100px);
  background: transparent;
  color: var(--color-text, #333);
  cursor: pointer;
  font-size: var(--font-size-s, 0.875rem);
  transition: all 0.2s;
}

.action-cards-pill.active,
.action-cards-pill:hover {
  background: var(--color-primary, #00524e);
  color: white;
  border-color: var(--color-primary, #00524e);
}

.action-cards-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--spacing-m, 24px);
}

.action-cards-card {
  position: relative;
  display: flex;
  align-items: flex-end;
  min-height: 400px;
  border-radius: var(--border-radius-m, 8px);
  overflow: hidden;
  text-decoration: none;
  color: white;
  transition: transform 0.2s;
}

.action-cards-card:hover {
  transform: scale(1.01);
}

.action-cards-card:focus-visible {
  outline: 3px solid var(--color-focus, #ffdd00);
  outline-offset: 2px;
}

.action-cards-bg {
  position: absolute;
  inset: 0;
}

.action-cards-bg img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.action-cards-overlay {
  position: relative;
  z-index: 1;
  padding: var(--spacing-l) var(--spacing-m);
  width: 100%;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.3) 60%, transparent 100%);
}

.action-cards-tag {
  display: inline-block;
  font-size: var(--font-size-xs, 0.75rem);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: var(--spacing-xs);
  opacity: 0.9;
}

.action-cards-title {
  font-size: var(--font-size-xl, 1.5rem);
  font-weight: var(--font-weight-bold, 700);
  margin: 0 0 var(--spacing-xs) 0;
  line-height: 1.2;
}

.action-cards-description {
  font-size: var(--font-size-s, 0.875rem);
  margin: 0 0 var(--spacing-s) 0;
  line-height: 1.4;
  opacity: 0.9;
}

.action-cards-cta {
  font-size: var(--font-size-s, 0.875rem);
  font-weight: var(--font-weight-semibold, 600);
  text-decoration: underline;
}

.action-cards-card[hidden] {
  display: none;
}

@media (max-width: 767px) {
  .action-cards-grid {
    grid-template-columns: 1fr;
  }

  .action-cards-card {
    min-height: 300px;
  }
}
```

### JS Requirements
```
- Block decoration:
  1. Parse each card from the block table rows.
  2. Extract image, title, description, CTA text + URL, and optional category tag.
  3. Build card DOM with background image, overlay content.
- Pills filtering:
  1. On pill click, set active state and filter cards by data-category attribute.
  2. "All" pill shows all cards.
  3. Use hidden attribute to hide non-matching cards.
- Carousel variant (if block name is "Action Cards (carousel)"):
  1. Replace grid with horizontal scroll-snap container.
  2. Add prev/next arrow buttons.
  3. Reuse carousel logic from DOCEDS-012.
```

### Document Authoring (Google Docs)
Authors create an **Action Cards** block using a multi-column table:

| Action Cards                                                                 |
|------------------------------------------------------------------------------|
| ![Background image](image-url)                                               |
| Tag: Great Walks                                                             |
| [Milford Track](/great-walks/milford-track/)                                 |
| Walk one of the finest tracks in the world through dramatic mountain scenery.|
| CTA: Explore now                                                             |
| Category: walks                                                              |
| ---                                                                          |
| ![Background image](image-url)                                               |
| Tag: Get Involved                                                            |
| [Volunteer for Conservation](/get-involved/volunteer/)                        |
| Join hands-on conservation projects protecting unique wildlife.              |
| CTA: Learn more                                                             |
| Category: wildlife                                                           |

- Each card is separated by a `---` divider row.
- **Image row:** Full-bleed background image.
- **Tag row:** `Tag:` prefix for the category label displayed on the card.
- **Title row:** Hyperlink with card title and destination URL.
- **Description row:** Plain text.
- **CTA row:** `CTA:` prefix for the call-to-action button text.
- **Category row:** `Category:` prefix for pill filter matching (optional).

For carousel variant, use block name `Action Cards (carousel)`.
For variant without pills, omit the `Category:` rows.

## AI Implementation Instructions

### Mandatory Skills
- Adobe Experience Modernization
- EDS Block Development

### Validation Loop
Use Chrome MCP iteratively to verify DOM output against the original site's functional requirements at https://www.doc.govt.nz/ before marking the task complete.

### Reference
- Live URL: https://www.doc.govt.nz/ (homepage action cards), campaign pages
- Vue source: abn-action-card, abn-action-card-carousel, abn-action-card-pills
- CSS classes: `action-card`, `action-card-carousel`, `action-card-pills`, `action-card__overlay`, `action-card__title`
