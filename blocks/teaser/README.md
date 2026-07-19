# Teaser Block

A reusable promotional card for the DOC NZ Edge Delivery Services site: an
optional image on top, a title, a short body, and an optional "read more" link.
It renders gracefully when the image or link is omitted and matches the visual
conventions and design tokens used by the `hero` and `cards` blocks.

## Authoring

The Teaser is authored in the Universal Editor via explicit, labelled fields
(no row order to remember):

| Field | Component | Required | Notes |
|-------|-----------|----------|-------|
| Image | `reference` | No | Optional teaser image, shown on top |
| Alt | `text` | No | Alt text for the image (accessibility) |
| Title | `text` | Yes | Rendered as an `h3` |
| Body | `richtext` | No | Short intro paragraph(s) |
| Link | `aem-content` | No | Call-to-action URL |
| Link Text | `text` | No | Visible CTA text |

The CTA is only rendered when **both** Link and Link Text are provided.

## Variants

| Variant | How to trigger | Result |
|---------|----------------|--------|
| Standard | Image + title + body + link | Full stacked card with CTA |
| Text-only | Omit the image | Card with no image, no broken layout |
| No CTA | Omit link and/or link text | Informational card, no button |

## Decorated DOM

```
.teaser
├── .teaser-image > picture            (only when an image is authored)
└── .teaser-body
    ├── h3.teaser-title
    ├── .teaser-text                    (only when body has content)
    └── p.teaser-cta > a                (only when link + link text present)
```

The `.teaser-image` and `.teaser-cta` wrappers are omitted entirely when their
content is absent, so empty markup never ships.

## Accessibility

- The title renders as an `h3`, keeping a correct heading hierarchy under the
  page title.
- Image alt text is authored via the dedicated **Alt** field.
- The CTA link has a visible `:focus-visible` outline for keyboard users.

## Performance

- The image is emitted through `createOptimizedPicture` (from `scripts/aem.js`)
  for responsive `webp` output.
- Universal Editor instrumentation is preserved via `moveInstrumentation`
  (from `scripts/scripts.js`).

## Registration

The block is auto-registered through the existing `blocks/*/_*.json` glob in
`models/_component-*.json`. Run `npm run build:json` to regenerate the root
`component-definition.json`, `component-models.json`, and
`component-filters.json`.
