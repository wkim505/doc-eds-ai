# Image Carousel — EDS Block Specification

> **Block ID:** DOCEDS-012  
> **Block Folder:** `blocks/carousel/`  
> **Priority:** Medium  
> **Complexity:** M  
> **Source Components:** doc-image-carousel

---

## User Story

**As a** visitor, **I want to** browse through multiple images in a horizontal carousel **so that** I can explore different views of a species, place, or activity without leaving the page.

## Description

The Image Carousel block presents a set of images in a horizontally scrollable container with previous/next navigation arrows and dot indicators. On the live DOC NZ site, this component appears on nature/species pages and place detail pages where multiple photographs showcase different aspects of the subject. The Vue component `doc-image-carousel` manages slide transitions, keyboard navigation, and touch/swipe gesture support.

In EDS, the carousel block should use a CSS scroll-snap approach for the sliding behaviour with lightweight JavaScript for the arrow controls, dot indicators, and swipe detection. Each slide contains an image with an optional caption. The carousel must be fully accessible, supporting keyboard arrow-key navigation and appropriate ARIA roles (`role="region"`, `aria-roledescription="carousel"`, `aria-label`).

Performance is critical: only the first two images should load eagerly, with the rest lazy-loaded. The carousel should not use a heavy third-party library — a vanilla JS implementation keeps the bundle lean.

## Acceptance Criteria

1. Carousel renders a horizontal strip of images with CSS scroll-snap alignment.
2. Left/right arrow buttons appear overlaid on the carousel edges.
3. Dot indicators below the carousel reflect the active slide.
4. Clicking an arrow or dot transitions to the corresponding slide smoothly.
5. Touch swipe gestures navigate between slides on mobile devices.
6. Keyboard left/right arrow keys navigate slides when the carousel is focused.
7. ARIA attributes are present: `role="region"`, `aria-roledescription="carousel"`, `aria-label`, and each slide has `role="tabpanel"`.
8. Only the first two images load eagerly; remaining images use `loading="lazy"`.
9. Dot indicators update their active state on scroll (not just on click).
10. Carousel is responsive: full-width on mobile, constrained on desktop.

## Technical Notes for EDS

### DOM Structure
```html
<div class="carousel" role="region" aria-roledescription="carousel" aria-label="Image gallery">
  <div class="carousel-slides">
    <div class="carousel-slide active" role="tabpanel" aria-label="Slide 1 of 5">
      <picture>
        <source type="image/webp" srcset="./media_1.webp?width=800 800w, ./media_1.webp?width=1200 1200w">
        <img src="./media_1.jpeg?width=800" alt="Kea on alpine rock" loading="eager" width="800" height="533">
      </picture>
      <p class="carousel-caption">Kea foraging in alpine habitat, Arthur's Pass.</p>
    </div>
    <div class="carousel-slide" role="tabpanel" aria-label="Slide 2 of 5">
      <picture>
        <source type="image/webp" srcset="./media_2.webp?width=800 800w, ./media_2.webp?width=1200 1200w">
        <img src="./media_2.jpeg?width=800" alt="Kea in flight" loading="lazy" width="800" height="533">
      </picture>
      <p class="carousel-caption">Kea displaying wingspan during flight.</p>
    </div>
    <!-- Additional slides -->
  </div>
  <button class="carousel-arrow carousel-arrow-prev" aria-label="Previous slide">&#8249;</button>
  <button class="carousel-arrow carousel-arrow-next" aria-label="Next slide">&#8250;</button>
  <div class="carousel-dots" role="tablist">
    <button class="carousel-dot active" role="tab" aria-selected="true" aria-label="Go to slide 1"></button>
    <button class="carousel-dot" role="tab" aria-selected="false" aria-label="Go to slide 2"></button>
    <!-- Additional dots -->
  </div>
</div>
```

### CSS Requirements
```css
.carousel {
  position: relative;
  overflow: hidden;
  margin: var(--spacing-m) 0;
}

.carousel-slides {
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
}

.carousel-slides::-webkit-scrollbar {
  display: none;
}

.carousel-slide {
  flex: 0 0 100%;
  scroll-snap-align: start;
}

.carousel-slide img {
  width: 100%;
  height: auto;
  display: block;
}

.carousel-caption {
  padding: var(--spacing-xs) var(--spacing-s);
  font-size: var(--font-size-s, 0.875rem);
  color: var(--color-text-secondary, #555);
}

.carousel-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 1.5rem;
  z-index: 2;
}

.carousel-arrow-prev { left: var(--spacing-s); }
.carousel-arrow-next { right: var(--spacing-s); }

.carousel-dots {
  display: flex;
  justify-content: center;
  gap: var(--spacing-xs);
  padding: var(--spacing-s) 0;
}

.carousel-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: none;
  background: var(--color-border, #ccc);
  cursor: pointer;
}

.carousel-dot.active {
  background: var(--color-primary, #00524e);
}

@media (min-width: 1024px) {
  .carousel {
    max-width: 800px;
    margin-inline: auto;
  }
}
```

### JS Requirements
```
- Scroll-snap observer: use IntersectionObserver on slides to detect active slide and update dots.
- Arrow click handlers: scrollBy one slide width on the slides container.
- Dot click handlers: scrollTo the corresponding slide position.
- Swipe detection: handled natively by scroll-snap; no additional JS needed for touch.
- Keyboard: listen for ArrowLeft/ArrowRight on the carousel container.
- Lazy loading: native `loading="lazy"` attribute; no JS needed.
```

### Document Authoring (Google Docs)
Authors create a **Carousel** block using a single-column table with multiple rows:

| Carousel                                           |
|----------------------------------------------------|
| ![Alt text for image 1](image-1-url)               |
| Caption for image 1                                |
| ---                                                |
| ![Alt text for image 2](image-2-url)               |
| Caption for image 2                                |
| ---                                                |
| ![Alt text for image 3](image-3-url)               |
| Caption for image 3                                |

- Each image + caption pair is separated by a horizontal rule (`---`) row.
- Captions are optional; omit the caption row to display image only.
- Minimum 2 images, maximum recommended 8.

## AI Implementation Instructions

### Mandatory Skills
- Adobe Experience Modernization
- EDS Block Development

### Validation Loop
Use Chrome MCP iteratively to verify DOM output against the original site's functional requirements at https://www.doc.govt.nz/ before marking the task complete.

### Reference
- Live URL: https://www.doc.govt.nz/nature/native-animals/birds/birds-a-z/kea/ (nature/species pages)
- Vue source: doc-image-carousel
- CSS classes: `carousel`, `carousel-slides`, `carousel-slide`, `carousel-arrow`, `carousel-dots`, `carousel-dot`
