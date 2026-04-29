# Call to Action Block — Component Specification

## User Story
**DOCEDS-014**
**As a** content author, **I want to** add prominent CTA sections **so that** visitors are guided toward key actions.

## Description
Styled call-to-action block with heading, description, and button/link. Used within content flow for prominent action prompts.

## Source Vue Components
- `DocCallToAction`

## Acceptance Criteria
1. CTA heading + description + button/link
2. Styled prominently within content flow
3. Multiple visual variants (primary, secondary)
4. Must be authorable via Universal Editor

## Technical Notes for EDS
### Block Structure
```
call-to-action (block)
├── heading
├── description
└── button/link
```

## AI Implementation Instructions
### Mandatory Skills
- `building-blocks` — EDS block JS/CSS structure and decoration

### Validation Loop
Use Chrome MCP to verify CTA renders with correct styling.

## Live References
| Variation | URL |
|-----------|-----|
| Various content pages | https://www.doc.govt.nz/get-involved/ |
