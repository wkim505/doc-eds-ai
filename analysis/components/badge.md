# Badge — EDS Block Specification

> **Block ID:** DOCEDS-022  
> **Block Folder:** `blocks/badge/`  
> **Priority:** Low  
> **Complexity:** S  
> **Source Components:** doc-badge

---

## User Story

**As a** site visitor, **I want to** see small coloured labels on cards indicating status or attributes **so that** I can quickly identify new content, popular items, or difficulty levels.

## Description

The Badge component is a small coloured label used on cards and listing items across the DOC NZ site. Badges communicate quick-reference metadata such as "New", "Popular", difficulty levels ("Easy", "Intermediate", "Advanced"), or status indicators like "Open" and "Closed". They appear as compact pill-shaped or rectangular labels overlaid on or adjacent to card content.

On the original Vue site, doc-badge is a simple presentational component that receives a label and variant prop. In EDS, this is best implemented as a **CSS utility pattern** rather than a standalone block, since badges are always used within other blocks (cards, hero, listings). The badge styles should be defined in the global `styles/` directory and applied via class names within parent blocks.

The EDS approach will define a `.badge` CSS class with variant modifiers (`.badge-success`, `.badge-warning`, `.badge-danger`, `.badge-info`, `.badge-new`, `.badge-popular`). Parent blocks like cards will include badge markup directly in their HTML output based on metadata from the authored content.

## Acceptance Criteria

1. Badge renders as an inline or inline-block element with pill-shaped or rounded-rectangle styling.
2. Variant colours are correct: green for success/open, red for danger/closed, blue for info, yellow for warning, purple for new, orange for popular.
3. Text is uppercase or small-caps with reduced font size (12–13px).
4. Badge is legible against its background with sufficient contrast (WCAG AA).
5. Badge works within card blocks, hero blocks, and listing items without layout disruption.
6. On mobile, badge font size scales appropriately and does not overflow its container.

## Technical Notes for EDS

### DOM Structure
```html
<!-- Badge used within a card block -->
<span class="badge badge-new">New</span>
<span class="badge badge-success">Open</span>
<span class="badge badge-danger">Closed</span>
<span class="badge badge-info">Easy</span>
<span class="badge badge-warning">Intermediate</span>
<span class="badge badge-popular">Popular</span>
```

### CSS Requirements
```css
/* Base badge styles — defined in styles/styles.css or styles/badges.css */
.badge {
  display: inline-block;
  padding: 2px 10px;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  line-height: 1.4;
  border-radius: 12px;
  white-space: nowrap;
  vertical-align: middle;
}

/* Variant tokens */
.badge-success  { background: #d4edda; color: #155724; }
.badge-danger   { background: #f8d7da; color: #721c24; }
.badge-warning  { background: #fff3cd; color: #856404; }
.badge-info     { background: #d1ecf1; color: #0c5460; }
.badge-new      { background: #e8d5f5; color: #4a1d7a; }
.badge-popular  { background: #ffe0cc; color: #8a4100; }

/* Responsive */
@media (max-width: 768px) {
  .badge { font-size: 11px; padding: 2px 8px; }
}
```

### JS Requirements
- None. Pure CSS component.
- Parent blocks are responsible for rendering the correct badge markup based on content metadata.

### Document Authoring (Google Docs)

Badges are **not authored as standalone blocks**. Instead, they are controlled by metadata within parent blocks. For example, in a Cards block table:

| Cards      |                     |
|------------|---------------------|
| image.jpg  | Track Name          |
|            | Description text    |
|            | badge: New          |
|            | /link               |

- The `badge: {label}` row in a card entry tells the card block to render a badge.
- The card block's JavaScript maps the label text to the appropriate variant class.
- Alternatively, authors can specify variant explicitly: `badge: New (info)`.

## AI Implementation Instructions

### Mandatory Skills
- Adobe Experience Modernization
- EDS Block Development

### Validation Loop
Use Chrome MCP iteratively to verify DOM output against the original site's functional requirements at https://www.doc.govt.nz/ before marking the task complete.

### Reference
- Live URL: Card listings across the site (e.g., track cards, place cards)
- Vue source: doc-badge
- CSS classes: doc-badge, badge--new, badge--popular, badge--easy, badge--intermediate, badge--advanced
