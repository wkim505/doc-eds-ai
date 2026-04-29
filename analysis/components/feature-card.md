# Feature Card Block — Component Specification

## User Story
**DOCEDS-007**
**As a** content author, **I want to** highlight a key piece of content with a large featured card **so that** it receives prominent visibility on the page.

## Description
A large featured card used to highlight key content. Appears on the homepage for the primary "Always Be Naturing" feature and other high-priority content promotions.

## Source Vue Components
- `DocFeatureCard`

## Acceptance Criteria
1. Large image with constrained layout
2. Title as heading link
3. Rich text description
4. Prominent placement (standalone or hero-adjacent)
5. Must be authorable via Universal Editor

## Technical Notes for EDS
### CSS Requirements
- Large image container (wider than standard card)
- Title as prominent heading
- Description with rich text support

### JS Requirements
- None required (static content)

### Block Structure
```
feature-card (block)
├── image (large)
├── title (linked heading)
└── description (rich text)
```

## AI Implementation Instructions
### Mandatory Skills
- `building-blocks` — EDS block JS/CSS structure and decoration
- `content-driven-development` — For authoring model

### Validation Loop
Use Chrome MCP to verify:
1. Feature card renders with large image
2. Title links correctly
3. Description renders rich text

## Live References
| Variation | URL |
|-----------|-----|
| Homepage feature | https://www.doc.govt.nz/ |
