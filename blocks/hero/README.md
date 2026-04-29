# Hero Block

Replaces the `DocBanner` (server-rendered) hero from the DOC NZ Optimizely
site. Visually matches the live https://www.doc.govt.nz/ pattern: full-bleed
image with a white "title box" overlapping the bottom-left, a slab-serif dark
title inside the box, optional intro text in a white panel below the image,
and an optional collapsible "i" image-credit button in the top-right.

Implements user story **DOCEDS-004** (`analysis/components/hero.md`).

## Authoring

Add a **Hero** block table to your document. Rows are classified by their
content (image / heading + text / italic-only paragraph / link-only
paragraph), so the order of rows is flexible.

### Standard (image + heading)

| Hero | |
|------|---|
| _(background image)_ | |
| **Page Heading** | |

### With intro text

The intro paragraph is rendered in the white panel below the image (matches
the DOC pattern — no white-on-image overlay).

| Hero | |
|------|---|
| _(background image)_ | |
| **Page Heading** | |
| Intro paragraph text goes here. | |

### With CTA button

A row whose only content is a single link is rendered as a CTA button under
the intro paragraph. The button uses the section-theme colour when set.

| Hero | |
|------|---|
| _(background image)_ | |
| **Page Heading** | |
| Intro paragraph text. | |
| [Book now](https://example.com) | |

### With image caption (credit)

A row whose only content is a single italic paragraph is treated as the image
credit and rendered behind a collapsible "i" button in the top-right corner of
the image (matches DOC's `i` toggle).

| Hero | |
|------|---|
| _(background image)_ | |
| **Page Heading** | |
| _Image: Green gecko by Photographer Name &#124; [Creative Commons](https://creativecommons.org/licenses/by/4.0/)_ | |

### Without image (no-image variant)

Omit the image row. The block renders the title box at the top of a plain
white content area (matches DOC's `predator-free-2050` page pattern — no full
hero image, no solid section-colour background).

| Hero | |
|------|---|
| **Page Heading** | |
| Intro text. | |

### Homepage with fridge magnets

The fridge magnet pills are a separate block (`fridge-magnet-group`,
DOCEDS-013). Author them as a sibling block in the section immediately after
the hero — no special hero markup is required.

## Page Metadata

| Key | Values | Notes |
|-----|--------|-------|
| `section-theme` | `ranginui` \| `paptuanuku` \| `atawhenua` \| `weta` | Adds `theme-<name>` class — sets a 6 px left-border accent on the title box and the CTA button colour |

Add a **Metadata** block anywhere on the page:

| Metadata | |
|----------|---|
| section-theme | ranginui |

## Variants

| Variant | How to trigger | Visual result |
|---------|----------------|---------------|
| Standard | Image + heading rows | Full-bleed image, white title box bottom-left |
| With intro | Add a paragraph row | Intro shown in white panel below image |
| With CTA | Add a link-only row | Themed pill button under the intro |
| With caption | Add an italic-only row | Top-right "i" toggle expands the credit |
| No image | Omit the image row | Title box at top of plain white content area |
| Themed | Set `section-theme` metadata | Coloured left border on title box + CTA |

## Section Themes

| Token | Section | Colour |
|-------|---------|--------|
| `ranginui` | Parks & Recreation | Blue `#1579b7` |
| `paptuanuku` | Nature | Forest Green `#194036` |
| `atawhenua` | Get Involved | Earth `#8c5e2a` |
| `weta` | Our Work | Brown `#80331a` |

## Decorated DOM

```
.hero.group.has-image[.theme-<name>]
├── .hero-image-container
│   ├── .hero-picture > picture            (image, clipped)
│   ├── .hero-top                          (only when caption row present)
│   │   ├── button.hero-caption-toggle      ("i", top-right)
│   │   └── .hero-caption-body              (credit, hidden by default)
│   └── .hero-title-row                    (centered, max-width 1200, padded)
│       └── .hero-title-box                (white 85% bg, dark serif h1)
│           └── h1                          (heading promoted to h1)
└── .hero-content                          (white panel below image)
    ├── p                                   (intro paragraphs)
    └── .hero-cta > a                       (optional)
```

`.hero-title-row` uses the **same horizontal centring rules as a global
`main > .section > div`** (`max-width: 1200px; margin: auto; padding: 0 24px`
→ `0 32px` ≥ 900 px), so the title box's left edge always lines up with the
intro paragraphs and any content sections that follow the hero, regardless
of viewport width.

For the no-image variant, `.hero-image-container` is hidden and `.hero-title-row`
is moved into `.hero-content`; the row's own padding/max-width is reset so it
inherits the panel's column instead of doubling up.

## Live References

| Page | URL |
|------|-----|
| Homepage (with fridge magnets) | https://www.doc.govt.nz/ |
| Section landing | https://www.doc.govt.nz/parks-and-recreation/ |
| With image + caption | https://www.doc.govt.nz/nature/native-animals/ |
| No image | https://www.doc.govt.nz/our-work/predator-free-2050/ |
| Get Involved | https://www.doc.govt.nz/get-involved/volunteer/ |

## Do / Don't

**Do:**

- Always provide alt text for the hero image
- Promote the page title to `h1` (the block does this automatically — only one
  hero per page)
- Set `section-theme` metadata when the page belongs to a DOC section

**Don't:**

- Do not nest another block inside the hero
- Do not add more than one CTA link
- Do not add images outside the dedicated image row

## Accessibility

- The background image alt text is preserved from the authored `<img>` element
- Title text uses `var(--text-color)` on a 85 %-opacity white background,
  meeting WCAG AA contrast against any image colour
- The caption toggle is a real `<button>` with `aria-expanded` and an
  `aria-label` that swaps between "Show image credit" and "Hide image credit";
  the body is `hidden` until expanded
- CTA links have visible focus outlines via `:focus-visible`

## Performance

- The hero `<img>` is set to `fetchpriority="high"` and `loading="eager"` so
  it is the LCP candidate
- EDS serves the image via the optimised `<picture>` (`webp` + responsive
  `srcset`); the spec's "heromini" variant for ≤ 480 px is satisfied by the
  smaller `<source>` EDS emits below 600 px
- All decoration is synchronous; no module imports beyond `aem.js` /
  `scripts.js`
