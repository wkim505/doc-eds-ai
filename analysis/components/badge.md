# Badge Block — Component Specification

## User Story
**DOCEDS-033**
**As a** content author, **I want to** display status/category badges on content items **so that** visitors can quickly identify content types.

## Description
Small label/tag badges used on cards and content items to indicate type or status.

## Source Vue Components
- `DocBadge` (2 chunk variants: `Cg_Hyuid.js` and `qPy1i88a.js`)

## Acceptance Criteria
1. Small label/tag with background color
2. Used on cards for content type indication
3. Multiple color variants for different types
4. Must be authorable via Universal Editor

## Technical Notes for EDS
### Block Structure
```
badge (inline component)
├── label-text
└── type/color-variant
```

## AI Implementation Instructions
### Mandatory Skills
- `building-blocks` — EDS block JS/CSS structure and decoration

### Validation Loop
Use Chrome MCP to verify badge renders with correct styling.

## Live References
| Variation | URL |
|-----------|-----|
| Cards with badges | https://www.doc.govt.nz/ |
