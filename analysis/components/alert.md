# Alert Block — Component Specification

## User Story
**DOCEDS-032**
**As a** content author, **I want to** display urgent alerts and notifications **so that** visitors are aware of closures, hazards, or important announcements.

## Description
Alert banner for urgent notifications displayed prominently above content.

## Source Vue Components
- `DocAlerts`

## Acceptance Criteria
1. Alert banner with type variants: warning (amber), info (blue), danger (red)
2. Dismissible option (close button)
3. Prominent placement above main content
4. Icon per type (warning triangle, info circle, danger exclamation)
5. Must be authorable via Universal Editor

## Technical Notes for EDS
### Block Structure
```
alert (block)
├── icon (type-specific)
├── message (rich text)
└── close-button (optional)
```

## AI Implementation Instructions
### Mandatory Skills
- `building-blocks` — EDS block JS/CSS structure and decoration

### Validation Loop
Use Chrome MCP to verify alert renders with correct type styling and dismissal.

## Live References
| Variation | URL |
|-----------|-----|
| Pages with active alerts | https://www.doc.govt.nz/ (when alerts are active) |
