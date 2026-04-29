# Social Media Links Block — Component Specification

## User Story
**DOCEDS-037**
**As a** site visitor, **I want to** see links to DOC's social media channels **so that** I can follow and engage on social platforms.

## Description
Social media icon links in the footer connecting to DOC's official channels.

## Acceptance Criteria
1. Icons for: Facebook, Blog, Instagram, YouTube
2. External links open in new tab (`target="_blank"`)
3. Accessible: `aria-label` or `title` for each icon
4. Present in footer
5. Must be authorable via Universal Editor

## Technical Notes for EDS
### Block Structure
```
social-media-links (sub-component of footer)
└── link[] (icon + url + aria-label)
```

## AI Implementation Instructions
### Mandatory Skills
- `building-blocks` — EDS block JS/CSS structure and decoration

### Validation Loop
Use Chrome MCP to verify icons render and links open in new tabs.

## Live References
| Variation | URL |
|-----------|-----|
| Footer (all pages) | https://www.doc.govt.nz/ |
