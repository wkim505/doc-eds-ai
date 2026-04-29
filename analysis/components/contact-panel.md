# Contact Panel Block — Component Specification

## User Story
**DOCEDS-029**
**As a** site visitor, **I want to** see contact information for relevant DOC offices **so that** I can reach out for assistance.

## Description
Displays contact details for relevant DOC offices including phone, email, address, and office hours.

## Source Vue Components
- `DocGenericContactsPanel`

## Acceptance Criteria
1. Contact details: phone, email, address
2. Office hours
3. Responsive layout
4. Must be authorable via Universal Editor

## Technical Notes for EDS
### Block Structure
```
contact-panel (block)
├── heading (office name)
├── phone
├── email
├── address
└── hours
```

## AI Implementation Instructions
### Mandatory Skills
- `building-blocks` — EDS block JS/CSS structure and decoration

### Validation Loop
Use Chrome MCP to verify contact info renders correctly.

## Live References
| Variation | URL |
|-----------|-----|
| Contact pages | https://www.doc.govt.nz/footer-links/contact-us/ |
