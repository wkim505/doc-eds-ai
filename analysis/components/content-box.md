# Content Box — EDS Block Specification

> **Block ID:** DOCEDS-008  
> **Block Folder:** `blocks/content-box/`  
> **Priority:** Medium  
> **Complexity:** S  
> **Source Components:** doc-content-box

---

## User Story

**As a** site visitor, **I want to** see important information visually highlighted in a distinct callout box **so that** I can quickly identify key messages, warnings, or supplementary details within page content.

## Description

The Content Box component on the DOC NZ website renders a bordered or shaded callout box used to draw attention to specific pieces of content within a page. It is commonly used on "Our work" and conservation project pages to highlight key facts, warnings, safety notices, or supplementary information that should stand out from the main body text.

The component supports three visual variants: **default** (neutral border with light grey background), **info** (blue-tinted border and background for informational callouts), and **warning** (amber/orange border and background for safety notices or alerts). On the live site, the `doc-content-box` Vue component accepts a type prop to determine the variant, and renders its slot content within the styled container.

In EDS, the content box is authored as a table in Google Docs. The block name can include the variant as a modifier (e.g., `Content Box (warning)`). The decorator applies the appropriate variant classes based on the block name.

## Acceptance Criteria

1. The content box renders as a visually distinct bordered/shaded container within the page content flow.
2. Three variants are supported: default, info, and warning — each with distinct colour treatment.
3. Default variant: light grey background (#F5F5F5) with a left border in DOC green.
4. Info variant: light blue background (#E8F4FD) with a blue left border.
5. Warning variant: light amber background (#FFF8E1) with an amber/orange left border.
6. Content within the box supports rich text: paragraphs, lists, links, bold, and inline images.
7. The box has consistent padding (16–24px) and a visible 4px left border.
8. The component is responsive and adjusts padding on smaller viewports.

## Technical Notes for EDS

### DOM Structure

```html
<!-- Default variant -->
<div class="content-box">
  <div class="content-box__inner">
    <p>DOC manages over 8 million hectares — roughly one-third of New Zealand's land area.</p>
  </div>
</div>

<!-- Info variant -->
<div class="content-box content-box--info">
  <div class="content-box__inner">
    <p><strong>Did you know?</strong> New Zealand has 13 national parks covering over 30,000 square kilometres.</p>
  </div>
</div>

<!-- Warning variant -->
<div class="content-box content-box--warning">
  <div class="content-box__inner">
    <p><strong>Warning:</strong> Track conditions may be hazardous after heavy rain. Check alerts before you visit.</p>
  </div>
</div>
```

### CSS Requirements

```css
.content-box {
  background-color: var(--color-grey-light, #F5F5F5);
  border-left: 4px solid var(--doc-green-100, #47665E);
  border-radius: 2px;
  padding: 20px 24px;
  margin: 24px 0;
  max-width: 960px;
}

.content-box__inner p {
  margin: 0 0 12px 0;
  line-height: 1.6;
}

.content-box__inner p:last-child {
  margin-bottom: 0;
}

/* Info variant */
.content-box--info {
  background-color: var(--color-info-bg, #E8F4FD);
  border-left-color: var(--color-info-border, #1976D2);
}

/* Warning variant */
.content-box--warning {
  background-color: var(--color-warning-bg, #FFF8E1);
  border-left-color: var(--color-warning-border, #F57C00);
}

@media (max-width: 768px) {
  .content-box {
    padding: 16px;
    margin: 16px 0;
  }
}
```

### JS Requirements

- `content-box.js` decorator reads the block table and extracts the content.
- Detect the variant from the block name: if the table header cell contains `Content Box (info)` or `Content Box (warning)`, add the corresponding modifier class (`content-box--info` or `content-box--warning`). Default to no modifier class.
- Wrap extracted content in `.content-box__inner`.
- No interactive JavaScript required — this is a purely presentational block.

### Document Authoring (Google Docs)

Authors create a content box using a **2-row table** in Google Docs:

| **Content Box**                               |
|-----------------------------------------------|
| DOC manages over 8 million hectares — roughly one-third of New Zealand's land area. |

For variants, modify the header row:

| **Content Box (info)**                        |
|-----------------------------------------------|
| **Did you know?** New Zealand has 13 national parks covering over 30,000 square kilometres. |

| **Content Box (warning)**                     |
|-----------------------------------------------|
| **Warning:** Track conditions may be hazardous after heavy rain. Check alerts before you visit. |

- **Row 1 (header):** `Content Box` — identifies the block type. Append `(info)` or `(warning)` in parentheses for variant styling.
- **Row 2:** The callout content. Supports rich text: bold, italic, links, bulleted/numbered lists. Keep content concise — typically 1–3 short paragraphs.

## AI Implementation Instructions

### Mandatory Skills
- Adobe Experience Modernization
- EDS Block Development

### Validation Loop
Use Chrome MCP iteratively to verify DOM output against the original site's functional requirements at https://www.doc.govt.nz/ before marking the task complete. Confirm:
- All three variants render with correct colours (background and left border).
- Content is readable and well-padded.
- Rich text within the box renders correctly (bold, links, lists).
- Responsive padding adjustment on mobile.

### Reference
- Live URL: https://www.doc.govt.nz/our-work/ pages
- Vue source: `doc-content-box`
- CSS classes: `content-box`, `content-box--info`, `content-box--warning`
