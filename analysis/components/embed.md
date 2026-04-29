# Embed Block — Component Specification

## User Story
**DOCEDS-035**
**As a** content author, **I want to** embed external content via iframe **so that** third-party tools and content can be displayed inline.

## Description
Generic iframe container for embedding external content (maps, forms, tools).

## Source Vue Components
- `DocGenericIframe`

## Acceptance Criteria
1. Generic iframe container
2. Responsive sizing (aspect ratio or min-height)
3. Title attribute for accessibility
4. Lazy loading for performance
5. Must be authorable via Universal Editor

## Technical Notes for EDS
### Block Structure
```
embed (block)
├── title (optional)
└── iframe (src, title, lazy loading)
```

## AI Implementation Instructions
### Mandatory Skills
- `building-blocks` — EDS block JS/CSS structure and decoration

### Validation Loop
Use Chrome MCP to verify iframe renders and is accessible.

## Live References
| Variation | URL |
|-----------|-----|
| Pages with embedded content | https://www.doc.govt.nz/ |
