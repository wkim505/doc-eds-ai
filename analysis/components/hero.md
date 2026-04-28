# Hero Banner — EDS Block Specification

> **Block ID:** DOCEDS-001  
> **Block Folder:** `blocks/hero/`  
> **Priority:** Critical  
> **Complexity:** M  
> **Source Components:** doc-banner, doc-page-title  
> **Status:** Already built in `/blocks/hero/`

---

## User Story

**As a** site visitor, **I want to** see a large, visually striking hero image with a clear page title **so that** I immediately understand what section of the DOC site I am on and feel engaged.

## Description

The Hero Banner is the primary visual element at the top of section landing pages on the DOC NZ website. It consists of a full-width background image with a two-zone layout: the page title is displayed inside a translucent white box positioned in the bottom-left corner of the image, and a subtitle or section descriptor bar sits directly below the image.

On the live site, the `doc-banner` Vue component renders the background image at full viewport width, while `doc-page-title` overlays the title text. The translucent white box uses approximately 85% opacity to ensure readability over diverse imagery. On mobile viewports, the hero image reduces in height and the title box adjusts to remain legible.

In EDS, this block is authored as a two-row table in Google Docs. The first row contains the hero image, and the second row contains the title and optional subtitle. The block decorator in `blocks/hero/hero.js` transforms this into the required DOM structure with the translucent overlay and bottom bar.

## Acceptance Criteria

1. The hero block renders a full-width image that spans the content area.
2. The page title appears inside a translucent white box (opacity ~0.85) positioned at the bottom-left of the image.
3. An optional subtitle bar appears below the image as a coloured strip.
4. The image is lazy-loaded and uses `<picture>` with responsive `srcset` for performance.
5. On viewports ≤ 768px, the hero image height reduces and the title box stacks below the image.
6. The block meets WCAG 2.1 AA contrast requirements for title text over the translucent box.
7. Authors can set the hero image and title text via a Google Docs table.

## Technical Notes for EDS

### DOM Structure

```html
<div class="hero">
  <div class="hero__image-container">
    <picture>
      <source type="image/webp" srcset="./media_hero.webp?width=2000&format=webply&optimize=medium" />
      <img src="./media_hero.jpeg?width=2000&format=jpeg&optimize=medium"
           alt="Scenic view of a New Zealand national park"
           loading="eager"
           width="2000" height="800" />
    </picture>
    <div class="hero__bottom-left">
      <div class="hero__title-box inline-block opacity-85">
        <h1>Parks &amp; recreation</h1>
      </div>
    </div>
  </div>
  <div class="hero__subtitle-bar">
    <p>Explore New Zealand's great outdoors</p>
  </div>
</div>
```

### CSS Requirements

```css
.hero {
  position: relative;
  width: 100%;
}

.hero__image-container {
  position: relative;
  overflow: hidden;
  max-height: 500px;
}

.hero__image-container img {
  width: 100%;
  height: auto;
  object-fit: cover;
}

.hero__bottom-left {
  position: absolute;
  bottom: 24px;
  left: 24px;
  z-index: 2;
}

.hero__title-box {
  display: inline-block;
  background-color: rgba(255, 255, 255, 0.85); /* opacity-85 */
  padding: 16px 32px;
}

.hero__title-box h1 {
  margin: 0;
  font-size: var(--heading-font-size-xl, 2.5rem);
  color: var(--text-color, #333);
}

.hero__subtitle-bar {
  background-color: var(--doc-green-100, #47665E);
  color: #fff;
  padding: 12px 24px;
  text-align: left;
}

/* Responsive: stack on mobile */
@media (max-width: 768px) {
  .hero__image-container {
    max-height: 280px;
  }

  .hero__bottom-left {
    position: relative;
    bottom: auto;
    left: auto;
    padding: 16px;
  }

  .hero__title-box {
    background-color: rgba(255, 255, 255, 1);
    padding: 12px 16px;
  }

  .hero__title-box h1 {
    font-size: var(--heading-font-size-l, 1.75rem);
  }
}
```

### JS Requirements

- `hero.js` decorator reads the block table rows and restructures them into the DOM above.
- Row 1: Image — extract the `<picture>` element and place it inside `.hero__image-container`.
- Row 2: Title/subtitle — split into `.hero__title-box` (first child) and `.hero__subtitle-bar` (second child if present).
- Set `loading="eager"` on the hero image since it is above the fold (LCP optimisation).

### Document Authoring (Google Docs)

Authors create a hero block using a **2-row table** in Google Docs:

| **Hero**                                      |
|-----------------------------------------------|
| *(Insert hero image here)*                    |
| Parks & recreation \| Explore New Zealand's great outdoors |

- **Row 1 (header):** The word `Hero` — identifies the block type.
- **Row 2:** The hero image (inserted via Google Docs image insertion).
- **Row 3:** Title text. Optionally use a pipe `|` separator to split into title and subtitle. The first segment becomes the `<h1>` title overlay, and the second becomes the subtitle bar.

## AI Implementation Instructions

### Mandatory Skills
- Adobe Experience Modernization
- EDS Block Development

### Validation Loop
Use Chrome MCP iteratively to verify DOM output against the original site's functional requirements at https://www.doc.govt.nz/ before marking the task complete. Confirm:
- Two-zone layout renders correctly (title box over image, subtitle bar below).
- Translucent white box is visible and readable.
- Responsive breakpoint at 768px stacks layout correctly.

### Reference
- Live URL: https://www.doc.govt.nz/parks-and-recreation/
- Vue source: `doc-banner`, `doc-page-title`
- CSS classes: `hero__image-container`, `hero__bottom-left`, `inline-block`, `opacity-85`
