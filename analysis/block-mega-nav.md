# User Story: Mega Nav Block

## Summary
Implement the EDS site header with a `mega-nav` behaviour to replace the `DocPopoverNav` and `DocHamburgerNav` Vue components on the DOC NZ website.

## User Story
**As a** DOC NZ website visitor,  
**I want to** navigate between major site sections using a mega-nav menu that shows sub-sections and popular links,  
**So that** I can quickly find the area of the site I need — whether browsing Parks & Recreation, Nature, Get Involved, or Our Work — without having to drill through multiple pages.

## Background
The DOC NZ header features a mega-nav with five primary sections (Parks & Recreation, Nature, Get Involved, Our Work, About Us). Each section expands on hover/click to reveal a secondary nav panel containing sub-section links and a "Popular links" column. A hamburger menu is used on mobile. The navigation is colour-coded per section (`ranginui`, `paptuanuku`, `atawhenua`, `weta`). This is driven by EDS's standard `nav` block pattern, extended with DOC-specific theming and the popular links panel.

## Acceptance Criteria

### AC1 — Primary navigation rendering
- **Given** the EDS nav fragment is configured with five primary sections,  
- **When** the page loads,  
- **Then** the header displays the DOC logo, five primary nav items, a search icon, and a bookings link in the header bar.

### AC2 — Mega-nav panel on hover/click
- **Given** a user hovers over (desktop) or clicks (touch) a primary nav item,  
- **When** the interaction fires,  
- **Then** a mega-nav panel opens below the header showing: sub-section links in the left column and "Popular links" in the right column.

### AC3 — Section colour coding
- **Given** each primary nav section has a defined colour token,  
- **When** a section's mega-nav panel opens,  
- **Then** the panel's active indicator, headings, and link accents use the section's brand colour (ranginui, paptuanuku, atawhenua, weta).

### AC4 — Keyboard navigation
- **Given** a keyboard user navigates to a primary nav item,  
- **When** they press `Enter` or `Space`,  
- **Then** the mega-nav panel opens; arrow keys move focus between sub-links; `Escape` closes the panel and returns focus to the primary nav item.

### AC5 — Hamburger menu on mobile
- **Given** the page is viewed on mobile (< 1024px),  
- **When** the hamburger icon is clicked,  
- **Then** a full-height slide-in navigation drawer opens with the primary sections as accordion items, expandable to show sub-sections.

### AC6 — Active page indicator
- **Given** the current page is within a specific section (e.g. a track page within Parks & Recreation),  
- **When** the header renders,  
- **Then** the corresponding primary nav item is visually highlighted as active (underline or colour indicator).

### AC7 — ARIA navigation pattern
- **Given** the mega-nav renders,  
- **When** inspected with a screen reader,  
- **Then** the `<nav>` has `aria-label="Main navigation"`, each primary item with a sub-panel has `aria-expanded="true/false"`, and sub-panels have `aria-hidden="true"` when closed.

### AC8 — Click-outside to close
- **Given** a mega-nav panel is open,  
- **When** the user clicks anywhere outside the nav,  
- **Then** the panel closes.

### AC9 — Popular links column
- **Given** a section has a configured popular links list,  
- **When** the section's mega-nav panel opens,  
- **Then** a "Popular" column renders on the right of the panel with the top 5–8 links for that section.

### AC10 — Print header
- **Given** a user prints a page,  
- **When** the print stylesheet applies,  
- **Then** only the DOC logo and site URL are shown in the header; the navigation is hidden.

## Live Reference

| Variant | Live URL | Notes |
|---|---|---|
| Desktop mega-nav | https://www.doc.govt.nz/ | Hover over "Parks & Recreation", "Nature" etc. to open panels |
| Mobile hamburger nav | https://www.doc.govt.nz/ | Resize browser to < 1024px or open on mobile to see hamburger |
| Popular links panel | https://www.doc.govt.nz/ | Right column of each mega-nav section panel |
| Colour-coded nav sections | https://www.doc.govt.nz/ | Each section has a distinct colour accent in the nav |

> **Note:** The mega-nav is driven by Vue.js (`DocPopoverNav`, `DocHamburgerNav`). For live reference, open the site in a browser and interact with the header navigation on desktop and mobile.

## Variants

| Variant | Block Name | Description |
|---|---|---|
| Desktop mega-nav | `mega-nav` | Hover-activated flyout panel with sub-links and popular links column |
| Mobile hamburger | `mega-nav (mobile)` | Full-height drawer with accordion-style section expansion |
| Section-coloured | `mega-nav` | Active section heading and indicators use section brand colour |
| With popular links | `mega-nav` | Right column in each panel shows 5–8 popular links for that section |
| Active page highlight | `mega-nav` | Current section's nav item has active underline/colour indicator |

## Technical Notes
- Replaces: `DocPopoverNav`, `DocHamburgerNav`, `DocPopoverNavItem`, `DocHamburgerNavItem`
- Driven by EDS standard nav fragment (`/nav` document in SharePoint/Google Drive)
- Popular links: second column in nav document table per section
- Section colour: `data-nav-section` attribute on `<li>` mapped to CSS custom property
- Mobile drawer: CSS transform slide-in, overlay background with `pointer-events: none`
- Hamburger breakpoint: `< 1024px`

## Definition of Done
- [ ] Nav renders correctly in EDS preview and live
- [ ] All 10 acceptance criteria pass
- [ ] All five sections and their sub-links verified against current site IA
- [ ] Keyboard navigation fully verified
- [ ] Mobile hamburger menu tested on iOS and Android
- [ ] Screen reader tested (NVDA, VoiceOver)
- [ ] Print styles verified
- [ ] Nav document format documented for authors
- [ ] Code reviewed and merged
