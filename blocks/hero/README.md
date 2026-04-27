# Hero Block

Replaces the `DocBanner` Vue component from the DOC NZ Optimizely site.

Renders a full-width background image with a page title anchored to the bottom-left, optional intro text, and an optional CTA button. Section-colour theming is applied via page metadata.

## Authoring

Add a **Hero** block table to your document:

### Standard (heading only)

| Hero | |
|------|---|
| *(background image)* | |
| | **Page Heading** |

### With intro text

| Hero | |
|------|---|
| *(background image)* | |
| | **Page Heading** |
| | Intro paragraph text goes here. |

### With CTA button

| Hero | |
|------|---|
| *(background image)* | |
| | **Page Heading** |
| | Intro paragraph text. |
| | [Book now](https://example.com) |

### Without image (no-image variant)

| Hero | |
|------|---|
| | **Page Heading** |
| | Intro text on a solid background. |

The block automatically detects the absence of a `<picture>` element and renders a solid section-colour background.

## Page Metadata

| Key | Values | Notes |
|-----|--------|-------|
| `section-theme` | `ranginui` \| `paptuanuku` \| `atawhenua` \| `weta` | Sets accent bar colour and CTA button colour |

Add a **Metadata** block anywhere on the page:

| Metadata | |
|----------|---|
| section-theme | ranginui |

## Variants

| Variant | How to trigger | Visual result |
|---------|---------------|---------------|
| Standard | Default | Full-bleed image + white heading, bottom-left |
| With intro | Add paragraph row | Intro text shown ≥ 768px viewport |
| With CTA | Add link row | Primary button coloured by section theme |
| No-image | Omit image from table | Solid section-colour background |
| Themed | Set `section-theme` metadata | Accent bar + CTA button use section colour |

## Section Themes

| Token | Section | Colour |
|-------|---------|--------|
| `ranginui` | Parks & Recreation | Blue `#1579b7` |
| `paptuanuku` | Nature | Forest Green `#194036` |
| `atawhenua` | Get Involved | Earth `#8c5e2a` |
| `weta` | Our Work | Brown `#80331a` |

## Live References

| Page | URL |
|------|-----|
| Parks & Recreation | https://www.doc.govt.nz/parks-and-recreation/ |
| Nature | https://www.doc.govt.nz/nature/ |
| Get Involved | https://www.doc.govt.nz/get-involved/ |
| Our Work | https://www.doc.govt.nz/our-work/ |
| Great Walks (with intro) | https://www.doc.govt.nz/parks-and-recreation/things-to-do/walking-and-tramping/great-walks/ |

## Do / Don't

**Do:**
- Always provide alt text for the hero image
- Use `h1` (or `h2` if the doc already has an `h1` above) for the page title — the block promotes any heading to `h1`
- Set `section-theme` metadata when the page belongs to a DOC section

**Don't:**
- Do not nest another block inside the hero
- Do not use more than two CTA links (primary + secondary)
- Do not add images to the content column — only in the first/image column

## Accessibility

- The background image alt text is preserved from the authored `<img>` element
- The gradient overlay ensures WCAG AA contrast (4.5:1) between white text and image
- CTA links have visible focus outlines via `:focus-visible` styles
- In the no-image variant, section-colour backgrounds meet the same contrast ratio with white text

## Performance

- The hero image is loaded with `fetchpriority="high"` and `loading="eager"` (LCP candidate)
- EDS automatically serves the image via optimised `<picture>` with `webp` and responsive `srcset`
