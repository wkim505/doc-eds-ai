# Lightbox Block — Component Specification

## User Story
**DOCEDS-025**
**As a** site visitor, **I want to** view images in a full-screen overlay **so that** I can see details without leaving the page.

## Description
Full-screen image overlay triggered by clicking images in carousels or inline content. Supports multi-image navigation.

## Source Vue Components
- `DocLightBox` (2 chunk variants: `BYjFgw_4.js` and `GHUCzvyW.js`)

## Acceptance Criteria
1. Click image to open lightbox overlay
2. Navigation between images (prev/next)
3. Close on Escape key or click outside
4. Accessible focus trap within lightbox
5. Image zoom or original-size display
6. Caption/credit display below image
7. Background overlay with dimming

## Technical Notes for EDS
### JS Requirements
- Modal open/close management
- Focus trap implementation
- Keyboard navigation (Escape to close, arrows for prev/next)
- Body scroll lock when open

### Block Structure
```
lightbox (utility, not standalone block)
├── overlay (background dim)
├── image (full-size)
├── caption
├── nav-prev
├── nav-next
└── close-button
```

## AI Implementation Instructions
### Mandatory Skills
- `building-blocks` — EDS block JS/CSS structure and decoration

### Validation Loop
Use Chrome MCP to verify lightbox opens, navigates, and closes correctly.

## Live References
| Variation | URL |
|-----------|-----|
| Image galleries | https://www.doc.govt.nz/nature/native-animals/ |
