# Counter Card Block — Component Specification

## User Story
**DOCEDS-010**
**As a** content author, **I want to** display key statistics as counter cards **so that** visitors can see impact metrics at a glance.

## Description
Counter cards display numeric statistics with labels, used to showcase conservation impact metrics and engagement numbers.

## Source Vue Components
- `AbnCounterCard`

## Acceptance Criteria
1. Numeric counter with label
2. Optional animation/increment effect on scroll into view
3. Supports large numbers with formatting (e.g., "1,000+")
4. Responsive layout
5. Must be authorable via Universal Editor

## Technical Notes for EDS
### CSS Requirements
- Large number typography
- Label below/beside number
- ABN brand theming option

### JS Requirements
- Optional: IntersectionObserver for count-up animation
- Number formatting

### Block Structure
```
counter-card (block)
├── number (formatted)
├── label
└── icon (optional)
```

## AI Implementation Instructions
### Mandatory Skills
- `building-blocks` — EDS block JS/CSS structure and decoration

### Validation Loop
Use Chrome MCP to verify counter renders and animates.

## Live References
| Variation | URL |
|-----------|-----|
| ABN counter cards | https://www.doc.govt.nz/always-be-naturing |
