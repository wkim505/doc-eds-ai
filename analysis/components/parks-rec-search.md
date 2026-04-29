# Parks & Recreation Search Block — Component Specification

## User Story
**DOCEDS-017**
**As a** site visitor, **I want to** search for parks, tracks, and activities by region and activity type **so that** I can plan my outdoor recreation.

## Description
The primary search interface for the Parks & Recreation section. Features region selector, activity type multi-select, and free-text search.

## Source Vue Components
- `DocParksRecSearch` — main search container
- `DocRegionSelectorPanel` — region selector (`show-regions=true`)
- `DocMultiSelect` / `AbnMultiSelect` — activity type selector
- `DocMultiCategory` — category grouping
- `DocSingleCategory` — single category selector

## Acceptance Criteria
1. Region selector panel with all NZ regions
2. Activity type multi-select (20+ options)
3. Activities categorized: Popular (walking, biking, hunting) and All
4. Free-text search input
5. Results link to filtered listing pages
6. Responsive layout
7. `idio:_TypeShortName` = `SearchPage` for pages using this component
8. Must be authorable via Universal Editor

## Technical Notes for EDS
### CSS Requirements
- Search form layout with region panel, activity selectors, text input
- Multi-select dropdown styling
- Category tabs/grouping

### JS Requirements
- Region selection state management
- Multi-select with checkbox list
- URL parameter building for filtered results (useUrlBuilder composable)
- Category filtering (useIconCategoryMapper composable)

### Block Structure
```
parks-rec-search (block)
├── text-search-input
├── region-selector-panel
├── activity-multi-select
│   ├── popular-category
│   └── all-category
└── search-button
```

## AI Implementation Instructions
### Mandatory Skills
- `building-blocks` — EDS block JS/CSS structure and decoration

### Validation Loop
Use Chrome MCP to verify:
1. Region selector shows all regions
2. Activity multi-select works
3. Search results link correctly

## Live References
| Variation | URL |
|-----------|-----|
| Parks & Rec landing | https://www.doc.govt.nz/parks-and-recreation/ |
| Walking & Tramping search | https://www.doc.govt.nz/parks-and-recreation/things-to-do/walking-and-tramping/ |
