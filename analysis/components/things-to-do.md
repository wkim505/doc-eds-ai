# Things To Do Block — Component Specification

## User Story
**DOCEDS-036**
**As a** site visitor, **I want to** browse available activities at a location **so that** I can plan what to do during my visit.

## Description
Activity listing with icons and categories for specific locations, showing what activities are available.

## Source Vue Components
- `DocThingsToDo`
- `useIconCategoryMapper` — maps activity types to icons

## Acceptance Criteria
1. Activity listing with icons and categories
2. Filterable by type
3. Links to activity detail pages
4. Activity icons mapped by category (useIconCategoryMapper)
5. Must be authorable via Universal Editor

## Technical Notes for EDS
### Block Structure
```
things-to-do (block)
├── heading
└── activity[]
    ├── icon (category-mapped)
    ├── title (linked)
    └── description (optional)
```

## AI Implementation Instructions
### Mandatory Skills
- `building-blocks` — EDS block JS/CSS structure and decoration

### Validation Loop
Use Chrome MCP to verify activities render with correct icons.

## Live References
| Variation | URL |
|-----------|-----|
| Parks & Rec section | https://www.doc.govt.nz/parks-and-recreation/things-to-do/ |
