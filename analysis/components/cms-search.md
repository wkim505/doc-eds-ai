# CMS Search Block — Component Specification

## User Story
**DOCEDS-018**
**As a** content author, **I want to** add a content search interface to listing pages **so that** visitors can filter content.

## Description
Content management search used on listing pages. Provides search input with optional category/type filters.

## Source Vue Components
- `DocCmsSearch` / `AbnCmsSearch`

## Acceptance Criteria
1. Search input with category/type filters
2. Results rendered inline on the page
3. Uses EPiServer Find search service
4. Must be authorable via Universal Editor

## Technical Notes for EDS
### Block Structure
```
cms-search (block)
├── search-input
├── filter-selectors
└── results-container
```

## AI Implementation Instructions
### Mandatory Skills
- `building-blocks` — EDS block JS/CSS structure and decoration

### Validation Loop
Use Chrome MCP to verify search and filter functionality.

## Live References
| Variation | URL |
|-----------|-----|
| News listing | https://www.doc.govt.nz/news/media-releases/ |
