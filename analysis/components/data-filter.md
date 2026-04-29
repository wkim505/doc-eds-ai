# Data Filter Block — Component Specification

## User Story
**DOCEDS-019**
**As a** site visitor, **I want to** filter content by multiple criteria **so that** I can narrow down results to what's relevant.

## Description
Custom filtering interface with multi-select dropdowns for category and region filters. Provides dynamic result updates.

## Source Vue Components
- `DocCustomDataFilter`
- `DocMultiCategory` — category grouping
- `DocSingleCategory` — single category
- `DocMultiSelect` — multi-select dropdown
- `DocRegionSelectorPanel` — region selection

## Acceptance Criteria
1. Custom filtering interface with multi-select dropdowns
2. Category and region filters
3. Dynamic result updates without page reload
4. Clear/reset filters option
5. Must be authorable via Universal Editor

## Technical Notes for EDS
### JS Requirements
- State management for selected filters
- Dynamic content filtering (client-side or API-driven)
- URL parameter sync for shareable filter states

### Block Structure
```
data-filter (block)
├── filter-group[]
│   ├── label
│   └── multi-select
├── region-selector
├── results-container
└── clear-filters-button
```

## AI Implementation Instructions
### Mandatory Skills
- `building-blocks` — EDS block JS/CSS structure and decoration

### Validation Loop
Use Chrome MCP to verify filter interactions and result updates.

## Live References
| Variation | URL |
|-----------|-----|
| Parks & Rec search | https://www.doc.govt.nz/parks-and-recreation/ |
| Walking & Tramping | https://www.doc.govt.nz/parks-and-recreation/things-to-do/walking-and-tramping/ |
