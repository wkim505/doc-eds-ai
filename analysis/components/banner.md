# Banner Block — Component Specification

## User Story
**DOCEDS-039**
**As a** content author, **I want to** add promotional banners to pages **so that** visitors see campaign-specific messaging.

## Description
Promotional/campaign banner block for highlighting special initiatives or campaigns.

## Source Vue Components
- `DocBanner`

## Acceptance Criteria
1. Banner image or background
2. Heading and description text
3. CTA button/link
4. Dismissible option (optional)
5. Must be authorable via Universal Editor

## Technical Notes for EDS
### Block Structure
```
banner (block)
├── background (image or color)
├── heading
├── description
├── cta-button (linked)
└── close-button (optional)
```

## AI Implementation Instructions
### Mandatory Skills
- `building-blocks` — EDS block JS/CSS structure and decoration

### Validation Loop
Use Chrome MCP to verify banner renders with correct styling and CTA.

## Live References
| Variation | URL |
|-----------|-----|
| Campaign pages | https://www.doc.govt.nz/always-be-naturing |
