# Accordion Block — Component Specification

## User Story
**DOCEDS-021**
**As a** content author, **I want to** organize content into expandable/collapsible sections **so that** visitors can scan headings and expand details on demand.

## Description
Expandable/collapsible content sections used extensively across the site for FAQs, detailed information, and organized content. Common on StandardPage and SummaryPage types.

## Source Vue Components
- `DocAccordion`

## Acceptance Criteria
1. Multiple accordion items with heading + hidden content
2. Click to expand/collapse with smooth animation
3. Accessible: `aria-expanded`, `aria-controls`, `role="button"` on trigger
4. Optional "expand all / collapse all" controls
5. Rich text content within accordion panels
6. Can contain nested components (images, links, lists)
7. Only one panel open at a time (optional: multi-open mode)
8. Must be authorable via Universal Editor

## Technical Notes for EDS
### CSS Requirements
- Accordion item border/separator
- Chevron icon rotation animation on expand/collapse
- Content area with padding
- Transition: max-height or height animation

### JS Requirements
- Click handler to toggle `aria-expanded`
- Animation for expand/collapse
- Optional "expand all / collapse all" functionality
- Keyboard accessibility (Enter/Space to toggle)

### Block Structure
```
accordion (block)
├── expand-all-toggle (optional)
└── accordion-item[]
    ├── trigger (heading + chevron icon)
    └── panel (rich text content)
```

## AI Implementation Instructions
### Mandatory Skills
- `building-blocks` — EDS block JS/CSS structure and decoration
- `content-driven-development` — Authoring model

### Validation Loop
Use Chrome MCP iteratively to verify:
1. Accordion items expand/collapse on click
2. `aria-expanded` toggles correctly
3. Animation is smooth
4. Rich text renders within panels
5. Keyboard navigation works

## Live References
| Variation | URL |
|-----------|-----|
| Standard page with accordion | https://www.doc.govt.nz/our-work/predator-free-2050/ |
| FAQ-style accordion | https://www.doc.govt.nz/parks-and-recreation/know-before-you-go/ |
