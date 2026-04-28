# Background Section — EDS Block Specification

> **Block ID:** DOCEDS-037  
> **Block Folder:** `blocks/background-section/`  
> **Priority:** Low  
> **Complexity:** S  
> **Source Components:** abn-background-section

---

## User Story

**As a** content author, **I want to** wrap content sections in a full-width background colour or image **so that** I can create visual variety and emphasis on campaign and landing pages.

## Description

The Background Section block provides a full-width wrapper that applies a background colour or background image to a section of content. On the DOC NZ site, this is used on campaign pages and landing pages to break up content into visually distinct sections — for example, alternating between white and light green backgrounds, or adding a hero-style background image behind a text section.

On the Vue site, `abn-background-section` is a container component that accepts background colour, background image, and optional overlay opacity as props. Child content is rendered within the section, inheriting appropriate text colours (light text on dark backgrounds).

In EDS, this pattern is best achieved using the built-in **Section Metadata** block rather than creating a custom block. EDS Section Metadata allows authors to apply styles (including background colours and images) to content sections by adding a metadata table at the end of a section in Google Docs. However, a lightweight custom block may be needed for advanced features like parallax scrolling, gradient overlays, or responsive background switching. This spec covers both approaches.

## Acceptance Criteria

1. Section renders with the specified background colour or image.
2. Full-width background extends edge-to-edge, while inner content respects max-width constraints.
3. Text colour automatically adjusts for readability on dark backgrounds.
4. Background image uses `cover` sizing and centre positioning.
5. Optional dark overlay on background images for text readability.
6. On mobile, background images may be replaced with a solid colour for performance.
7. Section padding is consistent: 48–64px vertical on desktop, 32px on mobile.
8. Nested content blocks (cards, text, counters) render correctly within the background section.

## Technical Notes for EDS

### DOM Structure
```html
<!-- EDS Section Metadata approach (preferred) -->
<div class="section background-green">
  <!-- Content blocks within this section -->
  <div class="default-content-wrapper">
    <h2>Conservation Matters</h2>
    <p>DOC manages over 8 million hectares of public conservation land.</p>
  </div>
  <!-- Cards block, Counter block, etc. -->
</div>

<!-- Custom block approach (for advanced features) -->
<div class="background-section-block"
     style="--bg-color: #e8f5e9; --bg-image: url('/media/forest-bg.jpg'); --overlay-opacity: 0.3;">
  <div class="background-section-overlay"></div>
  <div class="background-section-content">
    <!-- Child content rendered here -->
  </div>
</div>
```

### CSS Requirements
```css
/* Section Metadata approach — define style variants */
.section.background-green {
  background-color: var(--color-primary-light, #e8f5e9);
  padding: 48px 0;
}
.section.background-dark {
  background-color: var(--color-primary-dark, #1b5e20);
  color: #fff; padding: 48px 0;
}
.section.background-dark a { color: #b2dfdb; }
.section.background-dark a:hover { color: #fff; }
.section.background-grey {
  background-color: #f5f5f5; padding: 48px 0;
}

/* Custom block approach */
.background-section-block {
  position: relative; width: 100vw;
  margin-left: calc(-50vw + 50%);
  padding: 64px 0;
  background-color: var(--bg-color, transparent);
  background-image: var(--bg-image, none);
  background-size: cover; background-position: center;
}
.background-section-overlay {
  position: absolute; top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0, 0, 0, var(--overlay-opacity, 0));
  pointer-events: none;
}
.background-section-content {
  position: relative; z-index: 1;
  max-width: var(--content-width, 1200px);
  margin: 0 auto; padding: 0 24px;
}

/* Responsive */
@media (max-width: 768px) {
  .section.background-green,
  .section.background-dark,
  .section.background-grey { padding: 32px 0; }
  .background-section-block { padding: 32px 0; }
}
```

### JS Requirements
- **Section Metadata approach:** No JS needed — pure CSS styling via class names.
- **Custom block approach (if needed):**
  - Read background configuration from block table cells.
  - Apply CSS custom properties (`--bg-color`, `--bg-image`, `--overlay-opacity`) to the block element.
  - Optionally: detect if the background is dark and add a `.dark-theme` class to adjust child text colours.
  - Optionally: implement subtle parallax scrolling on background images using `transform: translateY()` on scroll (with `requestAnimationFrame`).

### Document Authoring (Google Docs)

**Preferred: Using EDS Section Metadata**

Authors add a Section Metadata table at the end of a content section:

| Section Metadata |                      |
|------------------|----------------------|
| style            | background-green     |

Or for a background image:

| Section Metadata |                                      |
|------------------|--------------------------------------|
| style            | background-image                     |
| background       | /media/forest-bg.jpg                 |

**Alternative: Custom Background Section block**

| Background Section |                        |
|--------------------|------------------------|
| color              | #e8f5e9                |
| image              | /media/forest-bg.jpg   |
| overlay            | 0.3                    |

- **color:** Background colour (hex, rgb, or named colour).
- **image:** Optional background image URL.
- **overlay:** Optional overlay opacity (0–1) for darkening the image.

The EDS Section Metadata approach is strongly preferred as it uses native EDS patterns and requires no custom JavaScript.

## AI Implementation Instructions

### Mandatory Skills
- Adobe Experience Modernization
- EDS Block Development

### Validation Loop
Use Chrome MCP iteratively to verify DOM output against the original site's functional requirements at https://www.doc.govt.nz/ before marking the task complete.

### Reference
- Live URL: Campaign pages on https://www.doc.govt.nz/
- Vue source: abn-background-section
- CSS classes: abn-background-section, background-section__overlay, background-section__content
