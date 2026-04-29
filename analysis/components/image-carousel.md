# Image Carousel Block — Component Specification

## User Story
**DOCEDS-023**
**As a** content author, **I want to** display a gallery of images as a carousel **so that** visitors can browse multiple photos.

## Description
Horizontal image carousel for photo galleries with navigation controls and optional captions. Integrates with the lightbox component for full-size viewing.

## Source Vue Components
- `DocImageCarousel`
- `DocLightBox` — opens when image is clicked
- `DocImageCaption` — per-image captions

## Acceptance Criteria
1. Horizontal image carousel with prev/next navigation
2. Touch/swipe support on mobile
3. Optional captions per image
4. Click to open lightbox for full-size viewing
5. Image counter indicator (e.g., "3 of 12")
6. Lazy loading for off-screen images
7. Must be authorable via Universal Editor

## Technical Notes for EDS
### CSS Requirements
- Carousel container with overflow hidden
- Image sizing/cropping
- Navigation arrow styling
- Caption overlay or below-image placement

### JS Requirements
- Carousel navigation logic (prev/next)
- Touch/swipe gesture detection
- Lightbox integration on image click
- Lazy loading with IntersectionObserver

### Block Structure
```
image-carousel (block)
├── nav-arrow-prev
├── slides-container
│   └── slide[]
│       ├── image
│       └── caption (optional)
├── nav-arrow-next
└── counter (e.g., "3 of 12")
```

## AI Implementation Instructions
### Mandatory Skills
- `building-blocks` — EDS block JS/CSS structure and decoration

### Validation Loop
Use Chrome MCP to verify carousel navigation and lightbox integration.

## Live References
| Variation | URL |
|-----------|-----|
| Gallery pages | https://www.doc.govt.nz/nature/native-animals/ |
