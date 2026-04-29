# Action Card Block — Component Specification

## User Story
**DOCEDS-009**
**As a** content author, **I want to** display "Always Be Naturing" themed action cards **so that** visitors are encouraged to participate in conservation activities.

## Description
Action cards are part of the ABN (Always Be Naturing) campaign. They feature icon-based designs with action titles and links encouraging conservation participation.

## Source Vue Components
- `AbnActionCard`

## Acceptance Criteria
1. Icon-based card with action title and link
2. ABN branding and styling
3. Engaging visual design to encourage participation
4. Responsive card layout
5. Must be authorable via Universal Editor

## Technical Notes for EDS
### CSS Requirements
- ABN brand colors and typography
- Icon integration (SVG or icon font)
- Card hover effects

### JS Requirements
- None (static content)

### Block Structure
```
action-card (block)
├── icon (SVG)
├── title
└── link
```

## AI Implementation Instructions
### Mandatory Skills
- `building-blocks` — EDS block JS/CSS structure and decoration

### Validation Loop
Use Chrome MCP to verify ABN styling and icon rendering.

## Live References
| Variation | URL |
|-----------|-----|
| ABN action cards | https://www.doc.govt.nz/always-be-naturing |
