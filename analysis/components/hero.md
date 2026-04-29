# Hero Block — Component Specification

## User Story
**DOCEDS-004**
**As a** site visitor, **I want to** see a visually impactful hero image with page title and optional quick links **so that** I understand the page context immediately.

## Description
The hero block appears at the top of most pages. It displays a full-width responsive image with the page title overlaid. It has multiple variants: with image + caption, with fridge magnets (homepage), and without image.

## Source Vue Components
- Hero section (server-rendered HTML, not a dedicated Vue component)
- `DocImageCaption` — image credit/caption overlay
- `DocFridgeMagnetGroup` — quick-link pill buttons (homepage only)

## Source HTML Structure
```html
<section class="doc-main-layout__hero">
  <div class="hero group has-image">
    <div class="hero__top">
      <div class="hero__top-caption">
        <doc-image-caption caption="Green gecko">
          <div class="hide-content">
            <span><b>Image: </b></span>
            Photographer Name | <a href="...">Creative Commons</a>
          </div>
        </doc-image-caption>
      </div>
    </div>
    <div class="hero__image-container">
      <div class="hero__bottom-left">
        <!-- h1 title overlay here -->
      </div>
      <picture>
        <source media="(max-width: 768px)" srcset="/thumbs/heromini/...">
        <source media="(max-width: 480px)" srcset="/thumbs/heromini/...">
        <img src="/thumbs/hero/..." fetchpriority="high" loading="eager" alt="...">
      </picture>
    </div>
  </div>
</section>
```

## Variants
1. **Standard with image** (`hero group has-image`): Full hero image + title + optional caption. Used on: Section landing pages, summary pages
2. **Homepage with fridge magnets** (`hero group has-image`): Hero image + DocFridgeMagnetGroup pills. Used on: Homepage only
3. **No image** (`hero group`): Title only, no image. Used on: StandardPage type (e.g., Predator Free 2050)

## Acceptance Criteria
1. Full-width responsive image using `<picture>` element
2. Desktop (≥768px): `/thumbs/hero/` image variant
3. Mobile (≤480px): `/thumbs/heromini/` image variant
4. Page title (h1) overlaid on bottom-left of image
5. Optional image caption with photographer credit and copyright (DocImageCaption)
6. Optional fridge magnet quick-link pills (homepage variant only)
7. Image loading: `fetchpriority="high"`, `loading="eager"` for LCP optimization
8. Class `has-image` when hero has background image
9. Must handle 3 variants: standard, with-fridge-magnets, no-image
10. Must be authorable via Universal Editor: image, caption, title, fridge magnets

## Technical Notes for EDS
### CSS Requirements
- `.hero.group.has-image` — container with image
- `.hero__top` — top overlay area (caption)
- `.hero__image-container` — responsive image container
- `.hero__bottom-left` — title overlay position
- `.hero__top-caption` — caption/credit area
- Full-bleed layout (edge-to-edge)
- Title overlay: white text with dark gradient/shadow for readability

### JS Requirements
- Image lazy-loading strategy (eager for hero, lazy for others)
- Fridge magnet group rendering (homepage variant)
- Caption expand/collapse

### Block Structure
```
hero (block)
├── picture
│   ├── source (mobile)
│   └── img (desktop, fetchpriority=high)
├── title-overlay (h1)
├── image-caption (optional)
│   ├── caption-text
│   └── credit (photographer, license)
└── fridge-magnets (optional, homepage only)
    └── pill-links[]
```

## AI Implementation Instructions
### Mandatory Skills
- `building-blocks` — EDS block JS/CSS structure and decoration
- `content-driven-development` — For authoring model
- `block-collection-and-party` — For block patterns

### Validation Loop
Use Chrome MCP iteratively to verify:
1. Hero image renders full-width on desktop
2. Mobile breakpoint switches to heromini variant
3. Page title (h1) is visible overlaid on image
4. Image caption shows/hides correctly
5. Homepage variant shows fridge magnet pills
6. No-image variant renders correctly
7. fetchpriority="high" is set on hero img
8. LCP audit passes (hero is LCP element)

## Live References
| Variation | URL |
|-----------|-----|
| With image + caption | https://www.doc.govt.nz/nature/native-animals/ |
| Homepage with fridge magnets | https://www.doc.govt.nz/ |
| No image | https://www.doc.govt.nz/our-work/predator-free-2050/ |
| With image + caption | https://www.doc.govt.nz/get-involved/volunteer/ |
| Section landing | https://www.doc.govt.nz/parks-and-recreation/ |
