# Introduction Text Block — Component Specification

## User Story
**DOCEDS-034**
**As a** content author, **I want to** add a styled introduction paragraph at the top of pages **so that** visitors get a quick summary.

## Description
Lead paragraph with larger font and lighter weight, appearing below the hero and above main content. Often paired with a save-to-list toggle.

## Acceptance Criteria
1. Lead paragraph styling (larger font, lighter weight)
2. Optional save-to-list toggle alongside
3. Positioned between hero and main content
4. Must be authorable via Universal Editor

## Technical Notes for EDS
### Block Structure
```
introduction-text (default content / section metadata)
├── lead-paragraph
└── save-to-list (optional)
```

## AI Implementation Instructions
### Mandatory Skills
- `building-blocks` — EDS block JS/CSS structure and decoration

### Validation Loop
Use Chrome MCP to verify lead paragraph styling.

## Live References
| Variation | URL |
|-----------|-----|
| Section pages | https://www.doc.govt.nz/nature/native-animals/ |
| Content pages | https://www.doc.govt.nz/get-involved/volunteer/ |
