# Teaser 2 Block

A vertically stacked promotional card for the DOC NZ site: an optional eyebrow
label, a headline, a short body, an optional image, and a required
call-to-action. Implements the `teaser` development-ready spec
(`analysis/components/teaser.md`) as an independent block.

## Authoring

Authored in the Universal Editor via explicit, labelled fields (no row order to
remember):

| Field | Component | Required | Notes |
|-------|-----------|----------|-------|
| Eyebrow | `text` | No | Short label shown above the headline; omit or leave empty to skip |
| Title | `text` | Yes | Rendered as a single `h2` |
| Body | `richtext` | Yes | Primary copy (paragraphs / line breaks preserved) |
| Image | `reference` | No | Optional teaser image |
| Alt | `text` | No | Alt text for the image (required when an image is set) |
| CTA Link | `aem-content` | Yes | Call-to-action destination |
| CTA Label | `text` | Yes | Visible call-to-action text |

The Image + Alt fields collapse into one block-table row, as do CTA Link + CTA
Label, giving five rows in field order: eyebrow, title, body, image, CTA.

## Variants

| Variant | How to trigger | Result |
|---------|----------------|--------|
| Standard | Eyebrow + title + body + image + CTA | Full stacked card |
| Text-only | Omit the image | Card with no image, no broken layout |
| No eyebrow | Leave the eyebrow empty | Card with heading first, no eyebrow wrapper |

## Decorated DOM

```
.teaser2
├── p.teaser2-eyebrow            (only when eyebrow authored)
├── h2.teaser2-title
├── .teaser2-text                (body copy)
├── .teaser2-image > picture     (only when an image is authored)
└── p.teaser2-cta > a
```

Optional wrappers (eyebrow, image) are omitted entirely when their content is
absent, so no empty markup ships to the accessibility tree.

## Accessibility

- The eyebrow, when present, precedes the heading in reading order (spec AC5).
- The title renders as a single `h2`, giving the card one heading element under
  the page `h1` (spec AC1). Heading level chosen as `h2` for a sub-section promo.
- Image alt text is authored via the dedicated **Alt** field (spec AC7).
- The CTA is an `<a href>` whose accessible name includes the label (spec AC3),
  with a visible `:focus-visible` outline for keyboard users (spec AC8).

## Performance

- The image is emitted through `createOptimizedPicture` (from `scripts/aem.js`)
  with `loading="lazy"` for responsive `webp` output.
- Universal Editor instrumentation is preserved via `moveInstrumentation`
  (from `scripts/scripts.js`).

## Registration

Auto-registered through the existing `blocks/*/_*.json` glob in
`models/_component-*.json`. Run `npm run build:json` to regenerate the root
`component-definition.json`, `component-models.json`, and
`component-filters.json`.
