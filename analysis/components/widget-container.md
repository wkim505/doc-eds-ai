# Widget Container Block — Component Specification

## User Story
**DOCEDS-008**
**As a** content author, **I want to** group related content cards under a heading with a "More" link **so that** visitors can see curated content sections.

## Description
The widget container groups 1-4 standard product cards under a section heading with a "More" button. Used extensively on the homepage for Blog, Featured content, and Media Releases sections.

## Source Vue Components
- `DocWidgetHeading` — section heading
- `DocProductSet` — card container
- `DocStandardProductCard` — individual cards within

## Acceptance Criteria
1. Widget heading (h2) with section title
2. Contains 1-4 standard product cards
3. "More" button linking to full listing page
4. Screen-reader text on "More" button for context (e.g., "More media releases")
5. Responsive: cards in grid on desktop, stacked on mobile
6. Must be authorable via Universal Editor: heading, cards, more-link

## Technical Notes for EDS
### CSS Requirements
- Section container with heading + card grid + more button
- Heading: h2 with consistent styling
- More button: right-aligned or centered below cards

### JS Requirements
- None (static layout)

### Block Structure
```
widget-container (block)
├── heading (h2)
├── cards[]
│   └── standard-product-card (1-4)
└── more-link (button with sr-only context text)
```

## AI Implementation Instructions
### Mandatory Skills
- `building-blocks` — EDS block JS/CSS structure and decoration
- `content-driven-development` — Authoring model

### Validation Loop
Use Chrome MCP to verify:
1. Section heading renders as h2
2. Cards display in correct count (1-4)
3. More button links to listing page
4. Screen reader text is present on More button

## Live References
| Variation | URL |
|-----------|-----|
| Blog widget | https://www.doc.govt.nz/ |
| Featured widget | https://www.doc.govt.nz/ |
| Media releases widget | https://www.doc.govt.nz/ |
