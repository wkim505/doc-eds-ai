# Accordion — EDS Block Specification

> **Block ID:** DOCEDS-006  
> **Block Folder:** `blocks/accordion/`  
> **Priority:** High  
> **Complexity:** S  
> **Source Components:** doc-accordion, doc-accordion-item, doc-show-hide

---

## User Story

**As a** site visitor, **I want to** expand and collapse sections of content **so that** I can focus on the information relevant to me without being overwhelmed by long pages.

## Description

The Accordion component on the DOC NZ website presents content in collapsible panels. Each panel has a clickable header (trigger) with a chevron icon that rotates to indicate open/closed state. Only the headers are visible by default; clicking a header expands its associated content panel with a smooth animation. Multiple panels can be open simultaneously.

On the live site, `doc-accordion` is the wrapper Vue component, with each expandable section rendered by `doc-accordion-item`. The `doc-show-hide` component provides the underlying expand/collapse behaviour and animation logic. Chevron icons rotate 180° on expansion, and the content area uses `max-height` transitions for smooth open/close animations.

In EDS, the accordion is authored as a multi-row table in Google Docs, where alternating rows represent headers and content. The `blocks/accordion/accordion.js` decorator transforms this table into accessible `<details>`/`<summary>` elements or ARIA-attributed `<div>` structures, depending on the project's chosen pattern. Using native `<details>` is preferred for simplicity and built-in accessibility.

## Acceptance Criteria

1. Each accordion panel has a clickable header that toggles the visibility of its content.
2. A chevron icon on the header indicates open (rotated down) or closed (pointing right) state.
3. Multiple panels can be open simultaneously (independent toggle).
4. Content panels animate smoothly on open/close (slide-down/slide-up effect).
5. Keyboard accessible: Enter/Space toggles a focused header, Tab moves between headers.
6. Screen readers announce the expanded/collapsed state of each panel.
7. Proper ARIA attributes: `aria-expanded`, `aria-controls`, and `role="region"` on content panels (if using `<div>` pattern), or native `<details>` elements.
8. Content within panels supports rich text: paragraphs, lists, links, images.

## Technical Notes for EDS

### DOM Structure

```html
<!-- Option A: Native <details>/<summary> (preferred) -->
<div class="accordion">
  <details class="accordion__item">
    <summary class="accordion__header">
      <span class="accordion__title">What to bring</span>
      <span class="accordion__icon" aria-hidden="true"></span>
    </summary>
    <div class="accordion__content">
      <p>Make sure you pack warm clothing, sturdy footwear, and plenty of water. Check the weather forecast before you go.</p>
    </div>
  </details>

  <details class="accordion__item">
    <summary class="accordion__header">
      <span class="accordion__title">Safety information</span>
      <span class="accordion__icon" aria-hidden="true"></span>
    </summary>
    <div class="accordion__content">
      <p>Always tell someone your plans. Sign the intentions book at the start of any track. Carry a personal locator beacon on backcountry trips.</p>
    </div>
  </details>

  <details class="accordion__item">
    <summary class="accordion__header">
      <span class="accordion__title">Getting there</span>
      <span class="accordion__icon" aria-hidden="true"></span>
    </summary>
    <div class="accordion__content">
      <p>The trailhead is accessible via State Highway 6. Parking is available at the visitor centre.</p>
    </div>
  </details>
</div>
```

### CSS Requirements

```css
.accordion {
  max-width: 960px;
  margin: 0 auto;
}

.accordion__item {
  border-bottom: 1px solid var(--color-border, #ddd);
}

.accordion__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0;
  cursor: pointer;
  list-style: none; /* Remove default <details> marker */
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--text-color, #333);
}

/* Remove default marker in webkit */
.accordion__header::-webkit-details-marker {
  display: none;
}

.accordion__icon {
  width: 24px;
  height: 24px;
  transition: transform 0.3s ease;
  background: url('/icons/chevron-down.svg') no-repeat center;
  background-size: contain;
}

/* Rotate chevron when open */
details[open] .accordion__icon {
  transform: rotate(180deg);
}

.accordion__content {
  padding: 0 0 24px 0;
  font-size: 1rem;
  line-height: 1.6;
  color: var(--text-color, #333);
}

.accordion__content p {
  margin: 0 0 16px 0;
}

.accordion__content p:last-child {
  margin-bottom: 0;
}

@media (max-width: 768px) {
  .accordion__header {
    padding: 12px 0;
    font-size: 1rem;
  }
}
```

### JS Requirements

- `accordion.js` decorator converts the block table into `<details>`/`<summary>` elements.
- Optional: Add JavaScript to animate the content panel height transition (native `<details>` does not animate). This can be done by wrapping content in an inner `<div>`, measuring its `scrollHeight`, and animating `max-height` from 0 to `scrollHeight` on the `toggle` event.
- If animation is implemented, listen for the `toggle` event on each `<details>` element to add/remove an `animating` class.
- No external dependencies required.

### Document Authoring (Google Docs)

Authors create an accordion block using a **multi-row table** in Google Docs:

| **Accordion**                                 |
|-----------------------------------------------|
| What to bring                                 |
| Make sure you pack warm clothing, sturdy footwear, and plenty of water. Check the weather forecast before you go. |
| Safety information                            |
| Always tell someone your plans. Sign the intentions book at the start of any track. Carry a personal locator beacon on backcountry trips. |
| Getting there                                 |
| The trailhead is accessible via State Highway 6. Parking is available at the visitor centre. |

- **Row 1 (header):** The word `Accordion` — identifies the block type.
- **Subsequent rows alternate:** Odd rows (2, 4, 6…) are panel headers/titles. Even rows (3, 5, 7…) are the corresponding content for the preceding header. Content rows support rich text formatting (bold, links, lists, images).

## AI Implementation Instructions

### Mandatory Skills
- Adobe Experience Modernization
- EDS Block Development

### Validation Loop
Use Chrome MCP iteratively to verify DOM output against the original site's functional requirements at https://www.doc.govt.nz/ before marking the task complete. Confirm:
- All panels expand/collapse on click.
- Chevron icon rotates correctly.
- Keyboard navigation works (Tab between headers, Enter/Space to toggle).
- Screen reader announces expanded/collapsed state.
- Content supports rich text formatting.

### Reference
- Live URL: Various DOC content pages (e.g., track detail pages with "What to bring", "Getting there" sections)
- Vue source: `doc-accordion`, `doc-accordion-item`, `doc-show-hide`
- CSS classes: `accordion`, `accordion__item`, `accordion__header`, `accordion__content`
