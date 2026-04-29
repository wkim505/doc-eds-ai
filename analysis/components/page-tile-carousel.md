# Page Tile Carousel Block — Component Specification

## User Story
**DOCEDS-011**
**As a** content author, **I want to** display a horizontal scrolling carousel of page tiles **so that** visitors can browse multiple items in limited space.

## Description
A horizontal scrolling carousel of page tiles with images and titles, providing compact multi-item browsing.

## Source Vue Components
- `AbnPageTileCarousel`

## Acceptance Criteria
1. Horizontal scroll with touch/swipe support
2. Page tile cards with image + title
3. Navigation arrows on desktop
4. Responsive container (fewer visible tiles on mobile)
5. Smooth scrolling animation
6. Must be authorable via Universal Editor

## Technical Notes for EDS
### CSS Requirements
- Horizontal scroll container with `overflow-x: auto` or CSS scroll-snap
- Tile sizing: fixed width per tile
- Navigation arrow positioning (absolute, left/right edges)
- Hide scrollbar on desktop

### JS Requirements
- Touch/swipe gesture support
- Arrow button click handlers (scroll by tile width)
- Optional: IntersectionObserver for active tile indicator

### Block Structure
```
carousel (block)
├── nav-arrow-left
├── tiles-container (scrollable)
│   └── tile[]
│       ├── image
│       └── title (linked)
└── nav-arrow-right
```

## AI Implementation Instructions
### Mandatory Skills
- `building-blocks` — EDS block JS/CSS structure and decoration

### Validation Loop
Use Chrome MCP to verify:
1. Carousel scrolls horizontally
2. Touch/swipe works on mobile
3. Arrow navigation works on desktop
4. Tiles display correctly

## Live References
| Variation | URL |
|-----------|-----|
| Page tile carousel | https://www.doc.govt.nz/always-be-naturing |
