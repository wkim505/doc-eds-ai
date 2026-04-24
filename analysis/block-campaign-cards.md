# User Story: Campaign Cards Block (Always Be Naturing)

## Summary
Implement a `campaign-cards` EDS block to replace the `AbnActionCard`, `AbnCounterCard`, `AbnPageTileCarousel`, and `AbnStandardProductCard` Vue components used in the Always Be Naturing (ABN) campaign on the DOC NZ website.

## User Story
**As a** DOC campaign content author,  
**I want to** create engaging campaign card layouts for the Always Be Naturing initiative using document tables,  
**So that** I can present conservation activities, counters, and calls-to-action in a visually distinct campaign style without bespoke development for each campaign update.

## Background
The Always Be Naturing (ABN) campaign is DOC's primary public engagement campaign, encouraging New Zealanders to participate in conservation activities. It uses a distinct card component set (`AbnActionCard`, `AbnCounterCard`, `AbnPageTileCarousel`, `AbnStandardProductCard`) that differs visually from the standard DOC design system. These components feature bold imagery, counter animations, and action-oriented layouts.

## Acceptance Criteria

### AC1 — Action card rendering
- **Given** a `campaign-cards (action)` block contains rows with image, heading, description, and CTA link,  
- **When** rendered,  
- **Then** each card displays in the ABN campaign style: bold imagery, large heading, short description, and a primary action button.

### AC2 — Counter card rendering
- **Given** a `campaign-cards (counter)` block contains rows with a numeric value, label, and optional description,  
- **When** the block scrolls into the viewport,  
- **Then** the counter animates from zero to the target value over ~1.5s, displaying the final value as a large, bold number with its label (e.g. "12,400 volunteers").

### AC3 — Counter animation respects reduced motion
- **Given** a user has `prefers-reduced-motion: reduce` set,  
- **When** the counter card enters the viewport,  
- **Then** the counter displays the final value immediately without animation.

### AC4 — Standard product card
- **Given** a `campaign-cards (product)` block contains rows with image, category, heading, and link,  
- **When** rendered,  
- **Then** each card shows a category tag, image, heading, and a "Learn more" link in the ABN product card style.

### AC5 — Page tile carousel variant
- **Given** a `campaign-cards (carousel)` block contains multiple card rows,  
- **When** rendered on desktop,  
- **Then** cards display in a horizontal scrollable carousel with navigation arrows; on mobile, cards stack vertically.

### AC6 — Campaign colour scheme
- **Given** the ABN campaign blocks render,  
- **When** displayed,  
- **Then** they use the ABN campaign colour palette (distinct from the standard DOC section colour tokens), defined as CSS custom properties in a campaign-specific stylesheet.

### AC7 — Responsive grid layout
- **Given** a `campaign-cards (action)` block renders multiple cards,  
- **When** viewed at different breakpoints,  
- **Then** the layout is 3-up on desktop (≥ 1024px), 2-up on tablet (≥ 768px), and 1-up on mobile.

### AC8 — Accessible card structure
- **Given** campaign cards render,  
- **When** inspected with a screen reader,  
- **Then** each card's heading is a proper `<h>` element, images have non-empty alt text, and CTA links have descriptive accessible names (not just "Learn more").

## Live Reference

| Variant | Live URL | Notes |
|---|---|---|
| ABN activity cards | https://www.doc.govt.nz/get-involved/conservation-activities/ | Action cards for conservation activities |
| ABN counter cards | https://www.doc.govt.nz/nature/pests-and-threats/predator-free-2050/ | Counter stats (e.g. traps set, volunteers involved) |
| ABN product cards | https://www.doc.govt.nz/get-involved/ | Section feature cards in ABN campaign style |
| ABN carousel | https://www.doc.govt.nz/ | Homepage campaign content carousel (seasonal) |

> **Note:** ABN campaign blocks are rendered via Vue.js. Use a JavaScript-enabled browser to see the animated counters and carousel interactions.

## Variants

| Variant | Block Name | Description |
|---|---|---|
| Action card | `campaign-cards (action)` | Bold image, heading, description, and CTA button |
| Counter card | `campaign-cards (counter)` | Animated number counter with label (animates on scroll-into-view) |
| Counter card — reduced motion | `campaign-cards (counter)` | Static value displayed immediately; no animation |
| Product card | `campaign-cards (product)` | Category tag, image, heading, "Learn more" link |
| Carousel | `campaign-cards (carousel)` | Horizontally scrollable carousel of campaign tiles |
| 3-up grid (desktop) | `campaign-cards` | Default grid layout — 3 per row on desktop |
| 2-up grid (tablet) | `campaign-cards` | 2 per row on tablet |
| 1-up (mobile) | `campaign-cards` | Stacked single column on mobile |

## Technical Notes
- Replaces: `AbnActionCard`, `AbnCounterCard`, `AbnPageTileCarousel`, `AbnStandardProductCard`
- Variants: `campaign-cards (action)`, `campaign-cards (counter)`, `campaign-cards (product)`, `campaign-cards (carousel)`
- ABN campaign CSS: separate stylesheet `styles/campaign.css` imported by campaign pages via metadata
- Counter animation: `requestAnimationFrame` loop; skip if `prefers-reduced-motion`
- Intersection Observer used to trigger counter animation on scroll-in

## Definition of Done
- [ ] All four card variants render correctly in EDS preview and live
- [ ] All 8 acceptance criteria pass
- [ ] Counter animation verified (including reduced-motion fallback)
- [ ] ABN campaign colour palette confirmed with DOC design team
- [ ] Mobile layout verified for all variants
- [ ] Authored and verified in SharePoint/Google Drive document
- [ ] Code reviewed and merged
- [ ] Documented with authoring guide covering all 4 variants
