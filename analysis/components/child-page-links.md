# Child Page Links Block — Component Specification

## User Story
**DOCEDS-012**
**As a** site visitor, **I want to** see links to all child pages of the current section **so that** I can navigate deeper into the site hierarchy.

## Description
Renders a list of links to child pages, commonly used on section landing pages to show all sub-sections.

## Source Vue Components
- `DocChildPageLinks` — renders from JSON array prop

## Acceptance Criteria
1. Renders as a list of links from JSON array
2. Supports external links (target attribute)
3. Used on section landing pages (SummaryPage type)
4. Displays page title as link text
5. Must be authorable via Universal Editor

## Technical Notes for EDS
### CSS Requirements
- List styling (possibly styled as cards or button-like links)
- Responsive stacking

### JS Requirements
- None (static links)

### Block Structure
```
child-page-links (block)
└── link[] (title + href)
```

## AI Implementation Instructions
### Mandatory Skills
- `building-blocks` — EDS block JS/CSS structure and decoration

### Validation Loop
Use Chrome MCP to verify links render and navigate correctly.

## Live References
| Variation | URL |
|-----------|-----|
| Parks & Rec landing | https://www.doc.govt.nz/parks-and-recreation/ |
| Nature landing | https://www.doc.govt.nz/nature/ |
| About Us landing | https://www.doc.govt.nz/about-us/ |
