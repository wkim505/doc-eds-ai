# Fridge Magnet Group Block — Component Specification

## User Story
**DOCEDS-013**
**As a** site visitor, **I want to** see quick-access pill buttons on the homepage hero **so that** I can jump to popular destinations.

## Description
Horizontal pill/tag-style buttons overlaid on the homepage hero image. Provides quick access to popular site destinations.

## Source Vue Components
- `DocFridgeMagnetGroup` — container for pill buttons

## Acceptance Criteria
1. Horizontal pill/tag-style buttons
2. Links to: Online bookings, Walking, Know before you go, Huts, Camping, Hunting, Fishing, Predator Free 2050, Permissions, Heritage, Publications, Maps, Royal Cam
3. Overlaid on hero bottom-left area
4. Responsive: wraps on smaller screens
5. Homepage only
6. Must be authorable via Universal Editor

## Technical Notes for EDS
### CSS Requirements
- Pill button styling (rounded, colored background)
- Flex wrap layout
- Absolute positioning over hero image

### JS Requirements
- None (static links)

### Block Structure
```
fridge-magnet-group (block)
└── pill-link[] (text + href)
```

## AI Implementation Instructions
### Mandatory Skills
- `building-blocks` — EDS block JS/CSS structure and decoration

### Validation Loop
Use Chrome MCP to verify pills render on homepage hero and wrap responsively.

## Live References
| Variation | URL |
|-----------|-----|
| Homepage fridge magnets | https://www.doc.govt.nz/ |
