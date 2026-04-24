# User Story: Carousel Block

## Summary
Implement a `carousel` EDS block to replace the `DocImageCarousel` Vue component on the DOC NZ website.

## User Story
**As a** DOC content author,  
**I want to** display a scrollable image carousel on a page using a document table,  
**So that** visitors can browse multiple photographs of a park, track, or species without the page becoming excessively long.

## Background
The `DocImageCarousel` component is used on park, track, hut, and species pages to present a curated gallery of photographs. Carousels on DOC NZ typically contain 3–10 images with optional captions. The block should integrate with the `lightbox` block to allow full-screen image viewing.

## Acceptance Criteria

### AC1 — Basic carousel rendering
- **Given** a page document contains a `carousel` block with multiple image rows (image + optional caption),  
- **When** the page loads,  
- **Then** images are displayed in a horizontally scrollable carousel with navigation arrows (previous/next).

### AC2 — Navigation controls
- **Given** a carousel is rendered with more than one image,  
- **When** a user clicks the next/previous arrow,  
- **Then** the carousel advances or retreats by one image with a smooth CSS transition.

### AC3 — Dot indicators
- **Given** a carousel contains multiple images,  
- **When** the carousel renders,  
- **Then** dot indicators below the carousel reflect the total number of images and highlight the currently visible image index.

### AC4 — Image captions
- **Given** a carousel image row includes a caption,  
- **When** the image is displayed,  
- **Then** the caption is shown below or overlaid on the image with appropriate contrast and font styling.

### AC5 — Lightbox integration
- **Given** a carousel image is clicked,  
- **When** the user interacts with it,  
- **Then** the image opens in a full-screen lightbox overlay with a close button and previous/next navigation.

### AC6 — Keyboard and touch support
- **Given** a carousel is rendered,  
- **When** a user swipes left/right on a touch device or uses left/right arrow keys on keyboard,  
- **Then** the carousel advances or retreats accordingly.

### AC7 — Accessible image alt text
- **Given** each image in the carousel has alt text authored,  
- **When** rendered,  
- **Then** each `<img>` has a non-empty `alt` attribute.

### AC8 — Autoplay disabled by default
- **Given** no autoplay variant is specified,  
- **When** the carousel renders,  
- **Then** the carousel does not auto-advance (respects `prefers-reduced-motion` and WCAG 2.1 SC 2.2.2).

### AC9 — Responsive image delivery
- **Given** the carousel renders on various device sizes,  
- **When** images load,  
- **Then** appropriately sized image variants are served via EDS `srcset` and `picture` elements (webp preferred).

## Live Reference

| Variant | Live URL | Notes |
|---|---|---|
| Species photo gallery | https://www.doc.govt.nz/nature/native-animals/birds/birds-a-z/kiwi/ | Kiwi species image carousel with captions |
| Park photo gallery | https://www.doc.govt.nz/parks-and-recreation/places-to-go/northland/ | Regional park scenic photos |
| Great Walk gallery | https://www.doc.govt.nz/parks-and-recreation/things-to-do/walking-and-tramping/great-walks/ | Track scenery carousel |

> **Note:** The site is a Vue.js SPA — full rendering requires a JavaScript-enabled browser.

## Variants

| Variant | Block Name | Description |
|---|---|---|
| Standard carousel | `carousel` | Horizontal slide carousel with prev/next arrows and dot indicators |
| With captions | `carousel` | Each image includes a caption and optional photographer attribution |
| With lightbox | `carousel` | Clicking an image opens it in the `lightbox` block overlay |
| No autoplay (default) | `carousel` | Static until user interaction |
| Autoplay | `carousel (autoplay)` | Auto-advances slides (use sparingly; must respect `prefers-reduced-motion`) |

## Technical Notes
- Replaces: `DocImageCarousel`
- Integrates with: `lightbox` block
- Touch events: `touchstart`/`touchend` delta for swipe detection
- No autoplay by default; optional `carousel (autoplay)` variant available
- Images via EDS media pipeline

## Definition of Done
- [ ] Block renders correctly in EDS preview and live
- [ ] All 9 acceptance criteria pass
- [ ] Touch/swipe tested on iOS and Android
- [ ] Keyboard navigation verified
- [ ] Lighthouse performance score not degraded by carousel images
- [ ] Authored and verified in SharePoint/Google Drive document
- [ ] Code reviewed and merged
- [ ] Documented with authoring guide
