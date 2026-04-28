# Image with Caption — EDS Block Specification

> **Block ID:** DOCEDS-011  
> **Block Folder:** `blocks/image/`  
> **Priority:** High  
> **Complexity:** S  
> **Source Components:** doc-image, doc-fancy-image, doc-image-caption

---

## User Story

**As a** content author, **I want to** add images with captions and photographer attribution **so that** visitors see properly credited visual content that supports the narrative.

## Description

The Image with Caption block renders an inline image within page content, accompanied by an optional caption and photographer attribution line. On the live DOC NZ site, this component appears throughout nature detail pages, species profiles, and place descriptions. The Vue components `doc-image`, `doc-fancy-image`, and `doc-image-caption` work together to produce a `<figure>` / `<figcaption>` pattern with responsive image sizing and lazy loading.

In EDS, the default content image handling already supports basic inline images via markdown. This block extends that behaviour by wrapping images in a semantic `<figure>` element and appending a `<figcaption>` containing the caption text and an attribution span. Authors control the caption and credit directly from the Google Docs authoring table.

The block should support both full-width and constrained-width variants. Images must be served via the EDS media pipeline with WebP optimisation and responsive `srcset` attributes for performance.

## Acceptance Criteria

1. Images render inside a `<figure>` element with correct alt text.
2. Caption text displays below the image inside a `<figcaption>` element.
3. Photographer attribution renders as a separate styled span within the figcaption.
4. Images are lazy-loaded and use responsive `srcset`/`sizes` attributes.
5. Full-width variant spans the content area edge-to-edge.
6. On mobile viewports (< 768px), images scale to 100% width with proportional height.
7. Missing caption or attribution fields gracefully hide the corresponding elements.
8. Block passes Lighthouse accessibility audit (alt text, figure/figcaption association).

## Technical Notes for EDS

### DOM Structure
```html
<div class="image">
  <figure>
    <picture>
      <source type="image/webp" srcset="./media_hash.webp?width=750&format=webply 750w, ./media_hash.webp?width=1000&format=webply 1000w, ./media_hash.webp?width=2000&format=webply 2000w" sizes="(max-width: 768px) 100vw, 750px">
      <img src="./media_hash.jpeg?width=750&format=jpeg" alt="Description of image" loading="lazy" width="750" height="500">
    </picture>
    <figcaption>
      <p class="image-caption">Kākāpō in its natural forest habitat on Whenua Hou.</p>
      <p class="image-attribution">Photo: <span class="image-credit">DOC / Jane Smith</span></p>
    </figcaption>
  </figure>
</div>
```

### CSS Requirements
```css
.image figure {
  margin: 0 0 var(--spacing-m) 0;
}

.image img {
  width: 100%;
  height: auto;
  display: block;
  border-radius: var(--border-radius-s, 4px);
}

.image figcaption {
  padding: var(--spacing-xs) 0;
  font-size: var(--font-size-s, 0.875rem);
  color: var(--color-text-secondary, #555);
  line-height: 1.4;
}

.image .image-attribution {
  font-style: italic;
  color: var(--color-text-tertiary, #777);
}

/* Full-width variant */
.image.full-width figure {
  margin-inline: calc(-1 * var(--section-padding, 24px));
}

@media (max-width: 768px) {
  .image img {
    border-radius: 0;
  }
}
```

### JS Requirements
- No JavaScript required for the basic variant.
- EDS auto-blocking handles lazy loading natively.
- If a `full-width` class is specified in the block table, apply the full-width variant.

### Document Authoring (Google Docs)
Authors create an **Image** block using a single-column table:

| Image                                              |
|----------------------------------------------------|
| ![Alt text for the image](image-url)               |
| Caption text describing the image                  |
| Photo: DOC / Photographer Name                     |

- **Row 1:** The image (drag-and-drop into Google Docs).
- **Row 2:** Caption text (plain text).
- **Row 3:** Attribution line prefixed with `Photo:`.

If only an image is provided with no caption rows, the block renders without a figcaption.

## AI Implementation Instructions

### Mandatory Skills
- Adobe Experience Modernization
- EDS Block Development

### Validation Loop
Use Chrome MCP iteratively to verify DOM output against the original site's functional requirements at https://www.doc.govt.nz/ before marking the task complete.

### Reference
- Live URL: https://www.doc.govt.nz/nature/native-animals/birds/birds-a-z/kakapo/ (nature detail pages)
- Vue source: doc-image, doc-fancy-image, doc-image-caption
- CSS classes: `figure`, `figcaption`, `image-caption`, `image-credit`
