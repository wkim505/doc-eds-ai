# Related Section Block — Component Specification

## User Story
**DOCEDS-015**
**As a** content author, **I want to** show related content at the bottom of pages **so that** visitors can discover more relevant information.

## Description
Related content section shown at the bottom of content pages with links to contextually relevant pages.

## Source Vue Components
- `DocRelatedSection`

## Acceptance Criteria
1. "Related" or custom section heading
2. List of related content links with optional thumbnails
3. Appears at bottom of content area
4. Must be authorable via Universal Editor

## Technical Notes for EDS
### Block Structure
```
related-section (block)
├── heading
└── related-links[]
    ├── thumbnail (optional)
    ├── title (linked)
    └── description (optional)
```

## AI Implementation Instructions
### Mandatory Skills
- `building-blocks` — EDS block JS/CSS structure and decoration

### Validation Loop
Use Chrome MCP to verify related links render at page bottom.

## Live References
| Variation | URL |
|-----------|-----|
| Content pages | https://www.doc.govt.nz/nature/native-animals/ |
