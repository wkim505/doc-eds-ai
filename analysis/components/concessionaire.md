# Concessionaire Block — Component Specification

## User Story
**DOCEDS-030**
**As a** commercial operator, **I want to** apply for concessions and find existing concessionaires **so that** I can operate on conservation land.

## Description
Combined concession application form and concessionaire directory listing.

## Source Vue Components
- `DocConcessionaireFormBlock` — application form
- `DocConcessionaireList` — directory listing with search/filter

## Acceptance Criteria
1. Application form with validation
2. Directory listing of concessionaires
3. Search/filter by area and type
4. Must be authorable via Universal Editor

## Technical Notes for EDS
### Block Structure
```
concessionaire (block)
├── form-variant
│   ├── form-fields
│   └── submit-button
└── list-variant
    ├── search/filter
    └── results[]
```

## AI Implementation Instructions
### Mandatory Skills
- `building-blocks` — EDS block JS/CSS structure and decoration

### Validation Loop
Use Chrome MCP to verify form and listing functionality.

## Live References
| Variation | URL |
|-----------|-----|
| Permissions section | https://www.doc.govt.nz/get-involved/apply-for-permits/ |
