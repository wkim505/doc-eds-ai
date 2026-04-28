# Counter/Stats — EDS Block Specification

> **Block ID:** DOCEDS-036  
> **Block Folder:** `blocks/counter/`  
> **Priority:** Low  
> **Complexity:** M  
> **Source Components:** abn-counter, abn-counter-card

---

## User Story

**As a** site visitor on a campaign or about page, **I want to** see animated statistics and key figures **so that** I can quickly understand the scale and impact of DOC's work.

## Description

The Counter/Stats block displays a row of animated number counters that count up from zero to their target value when the block scrolls into view. Each counter card shows a large number (optionally with prefix/suffix like "$" or "+"), a label describing the statistic, and optionally a short description. Common usage includes metrics like "14,000+ km of tracks maintained", "950+ huts and campsites", or "$2.5M invested in conservation".

On the Vue site, `abn-counter` is the parent container managing the grid layout and triggering the animation, while `abn-counter-card` is the individual counter component that handles the number animation using `requestAnimationFrame`. The animation is triggered by an Intersection Observer that fires when the block enters the viewport.

In EDS, the block should replicate this behaviour with vanilla JavaScript. The number animation should use `requestAnimationFrame` for smooth performance, and the Intersection Observer should trigger the animation only once (not re-trigger on subsequent scrolls). Numbers should include locale-aware formatting (thousands separators) using `Intl.NumberFormat`.

## Acceptance Criteria

1. Block renders 2–4 counter cards in a responsive grid row.
2. Each counter card displays: number, optional prefix, optional suffix, and label.
3. Numbers animate from 0 to the target value when the block enters the viewport.
4. Animation uses easing (ease-out) and completes within ~2 seconds.
5. Numbers are formatted with thousands separators (e.g., "14,000").
6. Decimal numbers are supported (e.g., "2.5").
7. Animation triggers only once — subsequent scrolls past the block do not re-animate.
8. If `prefers-reduced-motion` is enabled, numbers display immediately without animation.
9. On mobile, grid collapses to 2 columns or single column.
10. Block is accessible: counter values have `aria-label` with the full text (e.g., "14,000 kilometres of tracks maintained").

## Technical Notes for EDS

### DOM Structure
```html
<div class="counter-block">
  <div class="counter-grid">
    <div class="counter-card" data-target="14000" data-suffix="+" aria-label="14,000+ kilometres of tracks maintained">
      <div class="counter-value">
        <span class="counter-prefix"></span>
        <span class="counter-number">0</span>
        <span class="counter-suffix">+</span>
      </div>
      <p class="counter-label">Kilometres of tracks maintained</p>
    </div>
    <div class="counter-card" data-target="950" data-suffix="+" aria-label="950+ huts and campsites">
      <div class="counter-value">
        <span class="counter-prefix"></span>
        <span class="counter-number">0</span>
        <span class="counter-suffix">+</span>
      </div>
      <p class="counter-label">Huts and campsites</p>
    </div>
    <div class="counter-card" data-target="2.5" data-prefix="$" data-suffix="M" aria-label="$2.5M invested in conservation">
      <div class="counter-value">
        <span class="counter-prefix">$</span>
        <span class="counter-number">0</span>
        <span class="counter-suffix">M</span>
      </div>
      <p class="counter-label">Invested in conservation</p>
    </div>
    <div class="counter-card" data-target="400" data-suffix="+" aria-label="400+ conservation projects">
      <div class="counter-value">
        <span class="counter-prefix"></span>
        <span class="counter-number">0</span>
        <span class="counter-suffix">+</span>
      </div>
      <p class="counter-label">Conservation projects</p>
    </div>
  </div>
</div>
```

### CSS Requirements
```css
/* Grid layout */
.counter-block { padding: 48px 0; }
.counter-grid {
  display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 32px; max-width: var(--content-width, 1200px); margin: 0 auto;
  text-align: center;
}

/* Counter card */
.counter-card { padding: 24px 16px; }
.counter-value {
  font-size: 3rem; font-weight: 700; line-height: 1.1;
  color: var(--color-primary, #2e7d32);
  margin-bottom: 8px;
}
.counter-prefix, .counter-suffix { font-size: 2rem; }
.counter-label {
  font-size: 1rem; color: var(--color-text-muted);
  line-height: 1.4; margin: 0;
}

/* Responsive */
@media (max-width: 768px) {
  .counter-grid { grid-template-columns: 1fr 1fr; gap: 24px; }
  .counter-value { font-size: 2.25rem; }
}
@media (max-width: 480px) {
  .counter-grid { grid-template-columns: 1fr; }
}
```

### JS Requirements
- Use `IntersectionObserver` with `{ threshold: 0.3 }` to detect when the block enters the viewport.
- On intersection, animate each `.counter-number` from 0 to `data-target` using `requestAnimationFrame`.
- Animation algorithm:
  ```
  duration = 2000ms
  easing = easeOutQuad: t => t * (2 - t)
  currentValue = targetValue * easing(elapsed / duration)
  ```
- Format numbers with `new Intl.NumberFormat('en-NZ')` for thousands separators.
- For decimal targets (e.g., 2.5), use `minimumFractionDigits` and `maximumFractionDigits` options.
- Disconnect the observer after animation triggers (fire once).
- If `window.matchMedia('(prefers-reduced-motion: reduce)').matches`, skip animation and display final numbers immediately.
- Prefix and suffix are rendered from `data-prefix` and `data-suffix` attributes.

### Document Authoring (Google Docs)

Authors create a **Counter** table in Google Docs:

| Counter    |                                   |
|------------|-----------------------------------|
| 14000+     | Kilometres of tracks maintained   |
| 950+       | Huts and campsites                |
| $2.5M      | Invested in conservation          |
| 400+       | Conservation projects             |

- **Row 1:** Block name "Counter".
- **Subsequent rows:** Column 1 = number with optional prefix/suffix (parsed by JS), Column 2 = label text.
- The block JS parses the number string to extract prefix (leading non-digit chars), number (digits and decimals), and suffix (trailing non-digit chars).
- Example: "$2.5M" → prefix: "$", number: 2.5, suffix: "M".

## AI Implementation Instructions

### Mandatory Skills
- Adobe Experience Modernization
- EDS Block Development

### Validation Loop
Use Chrome MCP iteratively to verify DOM output against the original site's functional requirements at https://www.doc.govt.nz/ before marking the task complete.

### Reference
- Live URL: Campaign pages on https://www.doc.govt.nz/
- Vue source: abn-counter, abn-counter-card
- CSS classes: abn-counter, counter-card, counter-value, counter-label
