# Two Columns — EDS Block Specification

> **Block ID:** DOCEDS-010  
> **Block Folder:** `blocks/columns/`  
> **Priority:** Medium  
> **Complexity:** S  
> **Source Components:** abn-double-column

---

## User Story

**As a** content author, **I want to** lay out content in two side-by-side columns **so that** I can present complementary information — such as text alongside an image, or two content areas — in a visually balanced layout.

## Description

The Two Columns component on the DOC NZ website renders a two-column layout where content is placed side-by-side on desktop viewports and stacks vertically on mobile. This pattern is used across many page types to present text alongside images, related content areas side-by-side, or to create visual variety in long-form content pages.

On the live site, the `abn-double-column` Vue component renders two content slots in a flexible grid. The default split is 50/50, but the component also supports variant ratios such as 60/40 or 40/60 for asymmetric layouts (e.g., wider text column with a narrower image column). The columns maintain consistent gutters and align to the site's content grid.

In EDS, the columns block leverages the built-in EDS Columns block pattern. Authors create a two-column table in Google Docs, and the `blocks/columns/columns.js` decorator structures the content into a CSS grid or flexbox two-column layout. Variant ratios can be specified via block name modifiers (e.g., `Columns (60-40)`).

## Acceptance Criteria

1. Content renders in two side-by-side columns on desktop viewports (≥ 768px).
2. The default column ratio is 50/50 (equal width).
3. Variant ratios are supported: 60/40 and 40/60 (specified via block name modifier).
4. Columns stack vertically on mobile (< 768px), with the left column on top.
5. A consistent gutter (24–32px) separates the two columns.
6. Each column supports rich content: paragraphs, headings, images, lists, links, and nested blocks.
7. Images within columns scale to fit the column width while maintaining aspect ratio.
8. The column layout is contained within the site's max-width (1200px) and centred.

## Technical Notes for EDS

### DOM Structure

```html
<!-- Default 50/50 -->
<div class="columns">
  <div class="columns__col">
    <h3>Conservation efforts</h3>
    <p>DOC works with communities, iwi, businesses, and volunteers to protect New Zealand's unique natural heritage for current and future generations.</p>
    <a href="/getting-involved/">Find out how to get involved</a>
  </div>
  <div class="columns__col">
    <picture>
      <source type="image/webp" srcset="./media_conservation.webp?width=600&format=webply&optimize=medium" />
      <img src="./media_conservation.jpeg?width=600&format=jpeg&optimize=medium"
           alt="Volunteers planting native trees" loading="lazy" width="600" height="400" />
    </picture>
  </div>
</div>

<!-- 60/40 variant -->
<div class="columns columns--60-40">
  <div class="columns__col">
    <h3>Plan your visit</h3>
    <p>Check track conditions, book huts and campsites, and find essential safety information for your outdoor adventure.</p>
  </div>
  <div class="columns__col">
    <img src="./media_plan.jpeg" alt="Tramper on a mountain track" loading="lazy" width="400" height="300" />
  </div>
</div>
```

### CSS Requirements

```css
.columns {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;
  max-width: 1200px;
  margin: 32px auto;
  padding: 0 24px;
  align-items: start;
}

.columns__col {
  min-width: 0; /* Prevent grid blowout */
}

.columns__col img {
  width: 100%;
  height: auto;
  display: block;
  border-radius: 2px;
}

.columns__col h3 {
  margin: 0 0 16px 0;
  font-size: var(--heading-font-size-m, 1.5rem);
}

.columns__col p {
  margin: 0 0 16px 0;
  line-height: 1.6;
}

/* 60/40 variant */
.columns--60-40 {
  grid-template-columns: 3fr 2fr;
}

/* 40/60 variant */
.columns--40-60 {
  grid-template-columns: 2fr 3fr;
}

/* Mobile: stack */
@media (max-width: 768px) {
  .columns,
  .columns--60-40,
  .columns--40-60 {
    grid-template-columns: 1fr;
    gap: 24px;
    padding: 0 16px;
    margin: 24px auto;
  }
}
```

### JS Requirements

- `columns.js` decorator reads the block table's two-column row and places each cell's content into a `.columns__col` wrapper.
- Detect variant from the block name: if the header cell contains `Columns (60-40)`, add class `columns--60-40`. If `Columns (40-60)`, add `columns--40-60`. Default to equal-width grid if no modifier.
- Process images within columns to use EDS optimised `srcset` URLs.
- No interactive JavaScript — this is a layout-only block.

### Document Authoring (Google Docs)

Authors create a columns block using a **2-row, 2-column table** in Google Docs:

| **Columns**                                   |                              |
|-----------------------------------------------|------------------------------|
| **Conservation efforts** DOC works with communities, iwi, businesses, and volunteers to protect New Zealand's unique natural heritage. [Find out how to get involved](/getting-involved/) | *(Insert image here)* |

- **Row 1 (header):** The word `Columns` — identifies the block type. For variants, use `Columns (60-40)` or `Columns (40-60)`.
- **Row 2:** Two cells, each containing the content for one column. Each cell can contain any combination of text, headings, images, lists, and links.

For the 60/40 variant:

| **Columns (60-40)**                           |                              |
|-----------------------------------------------|------------------------------|
| *(Wider text content — 60%)*                  | *(Narrower image — 40%)*    |

## AI Implementation Instructions

### Mandatory Skills
- Adobe Experience Modernization
- EDS Block Development

### Validation Loop
Use Chrome MCP iteratively to verify DOM output against the original site's functional requirements at https://www.doc.govt.nz/ before marking the task complete. Confirm:
- Two columns display side-by-side on desktop.
- Columns stack vertically on mobile (< 768px).
- Variant ratios (60/40, 40/60) produce visibly asymmetric layouts.
- Images scale to fit column width.
- Gutter spacing is consistent.
- Rich content (headings, lists, links) renders correctly within columns.

### Reference
- Live URL: Various DOC content pages with side-by-side layouts
- Vue source: `abn-double-column`
- CSS classes: `columns`, `columns--60-40`, `columns--40-60`
