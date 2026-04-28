# Back to Top — EDS Block Specification

> **Block ID:** DOCEDS-034  
> **Block Folder:** `blocks/back-to-top/`  
> **Priority:** Low  
> **Complexity:** S  
> **Source Components:** doc-back-to-top

---

## User Story

**As a** site visitor reading a long page, **I want to** quickly scroll back to the top of the page **so that** I can access the navigation or start reading from the beginning without manually scrolling.

## Description

The Back to Top block renders a floating button in the bottom-right corner of the viewport that appears after the user scrolls past a defined threshold. Clicking the button smoothly scrolls the page back to the top. This is a common usability pattern on content-heavy sites, and on the DOC NZ site it appears on virtually every page with significant content length.

On the Vue site, `doc-back-to-top` is a simple component that monitors the scroll position via a scroll event listener and toggles visibility. It uses CSS transitions for the appear/disappear animation and `window.scrollTo` with smooth behaviour for the scroll action.

In EDS, this is best implemented as a global utility rather than a per-page block. It can be included in the global `scripts/scripts.js` to appear on all pages automatically, or authored as a block on specific pages. The implementation should use `IntersectionObserver` on a sentinel element near the top of the page (more performant than scroll event listeners) to toggle the button visibility.

## Acceptance Criteria

1. A floating button appears in the bottom-right corner after scrolling past the threshold (e.g., 400px).
2. The button is hidden when the user is near the top of the page.
3. Clicking the button smoothly scrolls the page to the top.
4. The button has a fade-in/fade-out animation on appear/disappear.
5. The button does not obscure important content or other fixed elements.
6. The button is accessible: `aria-label="Back to top"`, keyboard focusable and activatable.
7. On mobile, the button is sized appropriately (minimum 44×44px touch target).
8. The button uses `prefers-reduced-motion` media query to disable animation if requested.

## Technical Notes for EDS

### DOM Structure
```html
<button class="back-to-top" aria-label="Back to top" hidden>
  <span class="icon icon-chevron-up" aria-hidden="true"></span>
</button>
```

### CSS Requirements
```css
/* Button positioning and style */
.back-to-top {
  position: fixed; bottom: 24px; right: 24px; z-index: 1000;
  width: 48px; height: 48px;
  display: flex; align-items: center; justify-content: center;
  background: var(--color-primary, #2e7d32); color: #fff;
  border: none; border-radius: 50%;
  box-shadow: 0 2px 8px rgba(0,0,0,0.2);
  cursor: pointer;
  opacity: 0; transform: translateY(16px);
  transition: opacity 0.3s ease, transform 0.3s ease;
  pointer-events: none;
}

/* Visible state */
.back-to-top.is-visible {
  opacity: 1; transform: translateY(0);
  pointer-events: auto;
}
.back-to-top[hidden] { display: none; }

/* Hover/focus */
.back-to-top:hover { background: var(--color-primary-dark, #1b5e20); }
.back-to-top:focus-visible { outline: 2px solid #fff; outline-offset: 2px; }

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  .back-to-top { transition: none; }
}

/* Mobile adjustments */
@media (max-width: 768px) {
  .back-to-top { bottom: 16px; right: 16px; width: 44px; height: 44px; }
}
```

### JS Requirements
- Create a sentinel `<div>` at the top of `<main>` (or use the first element in the page).
- Use `IntersectionObserver` on the sentinel:
  - When sentinel is **not intersecting** (user scrolled down): add `.is-visible` and remove `hidden`.
  - When sentinel **is intersecting** (user at top): remove `.is-visible`, add `hidden` after transition.
- On button click: `window.scrollTo({ top: 0, behavior: 'smooth' })`.
- Respect `prefers-reduced-motion`: if enabled, use `behavior: 'auto'` instead of `'smooth'`.
- Button element can be created dynamically in JS (no authored HTML needed) or rendered from block table.

### Document Authoring (Google Docs)

The Back to Top button is typically **not authored per-page** — it is a global feature added via `scripts/scripts.js` or the page template.

If authors want to include it explicitly on a specific page:

| Back to Top |               |
|-------------|---------------|
| threshold   | 400           |

- **Row 1:** Block name "Back to Top".
- **threshold:** Optional scroll distance in pixels before the button appears (default: 400).

## AI Implementation Instructions

### Mandatory Skills
- Adobe Experience Modernization
- EDS Block Development

### Validation Loop
Use Chrome MCP iteratively to verify DOM output against the original site's functional requirements at https://www.doc.govt.nz/ before marking the task complete.

### Reference
- Live URL: Any long content page on https://www.doc.govt.nz/
- Vue source: doc-back-to-top
- CSS classes: back-to-top, back-to-top--visible
