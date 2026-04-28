# Section Intro — EDS Block Specification

> **Block ID:** DOCEDS-005  
> **Block Folder:** `blocks/section-intro/`  
> **Priority:** High  
> **Complexity:** S  
> **Source Components:** doc-introduction-text, doc-standard-overview

---

## User Story

**As a** site visitor, **I want to** read a concise introductory summary of the current section **so that** I quickly understand what content and resources are available before scrolling further.

## Description

The Section Intro component renders a full-width white band directly below the hero banner on section landing pages. It contains a lead paragraph of introductory text styled in DOC's signature green colour (#47665E), set at a larger font size than body copy to create visual hierarchy. The text is constrained to a maximum width of 961px and centred within the content area for optimal readability.

On the live DOC site, the `doc-standard-overview` Vue component wraps the section intro area. Within it, `doc-introduction-text` renders the lead paragraph with the CSS classes `lead` and `text-doc-green-100` applied. The text provides a high-level summary of the section — for example, on the Parks & Recreation landing page, it describes the range of outdoor experiences available across New Zealand's conservation areas.

In EDS, this block is authored as a simple table in Google Docs with the block name and a single paragraph of text. The `blocks/section-intro/section-intro.js` decorator applies the correct styling classes and constrains the text width.

## Acceptance Criteria

1. The section intro renders as a full-width white band below the hero banner.
2. The lead paragraph text is styled in DOC green (#47665E) at a visibly larger font size than standard body text.
3. Text content is constrained to a maximum width of 961px and centred horizontally.
4. The block has appropriate top and bottom padding (32–48px) to provide visual breathing room.
5. On mobile viewports (< 768px), padding reduces and font size scales down proportionally.
6. The text content is authored as a single paragraph (no headings within the block).
7. The block renders semantic HTML — a `<div>` wrapper with a `<p>` lead paragraph.

## Technical Notes for EDS

### DOM Structure

```html
<div class="section-intro doc-standard-overview">
  <div class="section-intro__inner doc-standard-overview__intro">
    <p class="section-intro__text doc-standard-overview__intro-text lead text-doc-green-100">
      Find your next adventure in New Zealand's stunning national parks, forests, marine reserves and more. Whether you're looking for a short walk, an epic multi-day tramp, or a family-friendly picnic spot, DOC has something for you.
    </p>
  </div>
</div>
```

### CSS Requirements

```css
.section-intro {
  background-color: #fff;
  padding: 48px 24px;
  text-align: center;
}

.section-intro__inner {
  max-width: 961px;
  margin: 0 auto;
}

.section-intro__text {
  font-size: 1.375rem; /* ~22px — lead text size */
  line-height: 1.6;
  margin: 0;
}

/* DOC green text colour */
.text-doc-green-100 {
  color: var(--doc-green-100, #47665E);
}

.lead {
  font-size: 1.375rem;
  font-weight: 400;
  line-height: 1.6;
}

@media (max-width: 768px) {
  .section-intro {
    padding: 32px 16px;
  }

  .section-intro__text,
  .lead {
    font-size: 1.125rem;
  }
}
```

### JS Requirements

- `section-intro.js` decorator extracts the paragraph content from the block table.
- Applies the classes `lead` and `text-doc-green-100` to the `<p>` element.
- Wraps the content in the `.section-intro__inner` container for max-width constraint.
- No interactive JavaScript is needed — this is a purely presentational block.

### Document Authoring (Google Docs)

Authors create a section intro block using a **2-row table** in Google Docs:

| **Section Intro**                                       |
|---------------------------------------------------------|
| Find your next adventure in New Zealand's stunning national parks, forests, marine reserves and more. Whether you're looking for a short walk, an epic multi-day tramp, or a family-friendly picnic spot, DOC has something for you. |

- **Row 1 (header):** The words `Section Intro` — identifies the block type.
- **Row 2:** The introductory paragraph text. Keep to a single paragraph of 2–4 sentences for best visual impact. Do not include headings, images, or links within this block.

## AI Implementation Instructions

### Mandatory Skills
- Adobe Experience Modernization
- EDS Block Development

### Validation Loop
Use Chrome MCP iteratively to verify DOM output against the original site's functional requirements at https://www.doc.govt.nz/ before marking the task complete. Confirm:
- Text renders in DOC green (#47665E).
- Text is constrained to ~961px maximum width and centred.
- Lead font size is visibly larger than body copy.
- Adequate padding above and below the text.
- Responsive sizing on mobile viewports.

### Reference
- Live URL: https://www.doc.govt.nz/parks-and-recreation/
- Vue source: `doc-introduction-text`, `doc-standard-overview`
- CSS classes: `doc-standard-overview`, `doc-standard-overview__intro`, `doc-standard-overview__intro-text`, `lead`, `text-doc-green-100`
