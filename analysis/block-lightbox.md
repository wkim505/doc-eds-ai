# User Story: Lightbox Block

## Summary
Implement a `lightbox` EDS block to replace the `DocLightBox` Vue component on the DOC NZ website, providing full-screen image overlay viewing.

## User Story
**As a** DOC NZ website visitor,  
**I want to** click on images or gallery items to view them full-screen in an overlay,  
**So that** I can appreciate the detail of nature and landscape photography without leaving the page.

## Background
The `DocLightBox` component is used in conjunction with image carousels and standalone images on park, track, species, and campaign pages. It renders an overlay that displays the full-resolution image with navigation controls (when part of a gallery), a caption, and attribution details. This component must integrate with the `carousel` block.

## Acceptance Criteria

### AC1 — Image click triggers lightbox
- **Given** an image on the page has the `lightbox` behaviour enabled,  
- **When** a user clicks the image,  
- **Then** a full-screen overlay opens displaying the full-resolution version of the image.

### AC2 — Overlay close button
- **Given** the lightbox overlay is open,  
- **When** a user clicks the close button (×) or presses `Escape`,  
- **Then** the overlay closes and focus returns to the triggering image element.

### AC3 — Caption and attribution display
- **Given** the image has an authored caption or attribution,  
- **When** the lightbox opens,  
- **Then** the caption and photographer attribution are displayed below the image within the overlay.

### AC4 — Gallery navigation
- **Given** the lightbox is triggered from within a `carousel` block with multiple images,  
- **When** the overlay is open,  
- **Then** previous/next navigation arrows are shown, allowing the user to navigate between gallery images without closing the overlay.

### AC5 — Keyboard navigation
- **Given** the lightbox is open,  
- **When** the user presses the left/right arrow keys,  
- **Then** the previous/next image is shown (if in gallery mode).

### AC6 — Background click to close
- **Given** the lightbox overlay is open,  
- **When** a user clicks the overlay background (outside the image),  
- **Then** the overlay closes.

### AC7 — Focus trap
- **Given** the lightbox overlay is open,  
- **When** a user presses `Tab`,  
- **Then** focus cycles only within the lightbox (close button, prev/next buttons) and does not reach elements behind the overlay.

### AC8 — Scroll lock
- **Given** the lightbox overlay is open,  
- **When** the overlay is visible,  
- **Then** the body does not scroll behind the overlay (`overflow: hidden` on `<body>`).

### AC9 — Responsive image in overlay
- **Given** the lightbox is open on a mobile device,  
- **When** displayed,  
- **Then** the image fits within the viewport (max 100vw × 100vh) with `object-fit: contain`, and navigation arrows are accessible (not obscured by the image).

### AC10 — ARIA dialog pattern
- **Given** the lightbox overlay opens,  
- **When** inspected with a screen reader,  
- **Then** the overlay has `role="dialog"`, `aria-modal="true"`, and `aria-label` describing the image; the image has appropriate alt text.

## Live Reference

| Variant | Live URL | Notes |
|---|---|---|
| Species photo gallery | https://www.doc.govt.nz/nature/native-animals/birds/birds-a-z/kiwi/ | Click any gallery image to open lightbox overlay |
| Park photo gallery | https://www.doc.govt.nz/parks-and-recreation/places-to-go/northland/ | Regional scenic photos — click to expand |
| Track gallery | https://www.doc.govt.nz/parks-and-recreation/things-to-do/walking-and-tramping/waikato-walks/hakarimata-summit-track/ | Walk photos — click to open lightbox |

> **Note:** Lightbox overlay is triggered by clicking gallery images. Requires JavaScript-enabled browser. Click any image within a carousel or gallery on the above pages.

## Variants

| Variant | Block Name | Description |
|---|---|---|
| Single image | `lightbox` | Opens one image full-screen; no prev/next navigation |
| Gallery (from carousel) | `lightbox` | Full-screen with prev/next navigation across all carousel images |
| With caption | `lightbox` | Caption and attribution shown below image in overlay |
| Without caption | `lightbox` | Image only; clean overlay |

## Technical Notes
- Replaces: `DocLightBox`
- Integrates with: `carousel` block (gallery navigation)
- Also available standalone: applied to any image with `data-lightbox` attribute
- Image URL: high-res version via EDS media URL (remove dimension constraints from `?width=` param)
- Focus trap: cycle focus between close button and prev/next using `tabindex` management
- Scroll lock: `document.body.style.overflow = 'hidden'` on open, restore on close

## Definition of Done
- [ ] Block renders correctly in EDS preview and live
- [ ] All 10 acceptance criteria pass
- [ ] Keyboard navigation and focus trap verified
- [ ] Screen reader dialog pattern verified (NVDA, VoiceOver)
- [ ] Integration with `carousel` block verified
- [ ] Mobile layout verified at 375px
- [ ] Code reviewed and merged
- [ ] Documented with authoring guide
