# Show/Hide Block — Component Specification

## User Story
**DOCEDS-027**
**As a** content author, **I want to** show/hide content sections **so that** I can keep pages clean while providing optional detail.

## Description
Simple toggle to show/hide content sections, lighter-weight than accordion for single content blocks.

## Source Vue Components
- `DocShowHide`

## Acceptance Criteria
1. Toggle button to show/hide content
2. Smooth animation (expand/collapse)
3. Accessible state management (`aria-expanded`)
4. Button text changes: "Show more" / "Show less"
5. Must be authorable via Universal Editor

## Technical Notes for EDS
### Block Structure
```
show-hide (block)
├── toggle-button ("Show more" / "Show less")
└── content (rich text, initially hidden)
```

## AI Implementation Instructions
### Mandatory Skills
- `building-blocks` — EDS block JS/CSS structure and decoration

### Validation Loop
Use Chrome MCP to verify toggle functionality and animation.

## Live References
| Variation | URL |
|-----------|-----|
| Content pages | https://www.doc.govt.nz/nature/native-animals/ |
