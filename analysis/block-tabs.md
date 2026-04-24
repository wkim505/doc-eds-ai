# User Story: Tabs Block

## Summary
Implement a `tabs` EDS block to replace the `DocTabs` Vue component on the DOC NZ website.

## User Story
**As a** DOC content author,  
**I want to** organise page content into labelled tabs using a document table,  
**So that** visitors can switch between related content groups (e.g. track details, facilities, safety info) without navigating to a new page.

## Background
The `DocTabs` component is used on destination and activity pages to separate content into logical panels — for example, a hut page may have tabs for "Overview", "Getting there", "Facilities", and "Bookings". Tabs reduce page length and help users find relevant information quickly.

## Acceptance Criteria

### AC1 — Basic tab rendering
- **Given** a page document contains a `tabs` block with multiple tab name/content column pairs,  
- **When** the page loads,  
- **Then** a tab bar renders with one tab button per defined tab, and the first tab's content is visible by default.

### AC2 — Tab switching
- **Given** a tabs block is rendered,  
- **When** a user clicks a non-active tab,  
- **Then** the clicked tab becomes active (visually highlighted), the previously active tab's panel is hidden, and the new tab's content panel is shown.

### AC3 — Section colour on active tab
- **Given** the page has a `section-theme` metadata value,  
- **When** a tab is active,  
- **Then** the active tab indicator (underline or background) uses the section's brand colour token.

### AC4 — Rich content within panels
- **Given** a tab panel contains rich content (images, lists, maps, embedded blocks),  
- **When** the panel is shown,  
- **Then** all content renders correctly, including any nested EDS blocks.

### AC5 — Keyboard accessibility
- **Given** a user navigates to the tab bar using keyboard,  
- **When** focus is on a tab button, pressing the left/right arrow keys,  
- **Then** focus moves to the previous/next tab and activates it, following the ARIA tabs pattern.

### AC6 — ARIA roles
- **Given** a tabs block is rendered,  
- **When** inspected with a screen reader,  
- **Then** the tab list has `role="tablist"`, each tab has `role="tab"` with `aria-selected`, and each panel has `role="tabpanel"` with `aria-labelledby` pointing to its tab.

### AC7 — Mobile stacked layout
- **Given** the tabs block is viewed on a mobile device (viewport < 768px),  
- **When** the page loads,  
- **Then** the tab bar scrolls horizontally if tabs overflow, or falls back to a stacked accordion layout. No content is clipped or hidden.

### AC8 — URL hash navigation
- **Given** a URL contains a fragment matching a tab label slug (e.g. `#facilities`),  
- **When** the page loads,  
- **Then** the matching tab is activated and scrolled into view.

## Live Reference

| Variant | Live URL | Notes |
|---|---|---|
| Standard tabs | https://www.doc.govt.nz/parks-and-recreation/things-to-do/walking-and-tramping/great-walks/ | Bookings info across multiple Great Walk tabs |
| Tabs on track page | https://www.doc.govt.nz/parks-and-recreation/things-to-do/walking-and-tramping/waikato-walks/hakarimata-summit-track/ | Track overview / Getting there / Facilities tabs |
| Tabs on hut page | https://www.doc.govt.nz/parks-and-recreation/places-to-stay/stay-in-a-hut/kime-hut/ | Hut details / Facilities / Getting there |

> **Note:** The site is a Vue.js SPA — full rendering requires a JavaScript-enabled browser.

## Variants

| Variant | Block Name | Description |
|---|---|---|
| Standard tabs | `tabs` | Horizontal tab bar with one panel active at a time |
| Mobile stacked (auto) | `tabs` | Automatically switches to accordion on mobile (< 768px) |
| With URL hash | `tabs` | Active tab driven by URL fragment (e.g. `#facilities`) |
| With nested blocks | `tabs` | Tab panels contain embedded blocks (maps, carousels, etc.) |

## Technical Notes
- Replaces: `DocTabs`
- ARIA pattern: WAI-ARIA Tabs (keyboard: arrow keys navigate tabs; `Tab` key moves to panel content)
- Mobile fallback: horizontal scroll with `overflow-x: auto` on tab list
- Tab label slugs auto-generated from heading text (lowercased, spaces → hyphens)

## Definition of Done
- [ ] Block renders correctly in EDS preview and live
- [ ] All 8 acceptance criteria pass
- [ ] Keyboard navigation verified manually
- [ ] Screen reader tested
- [ ] Mobile layout verified at 375px
- [ ] Authored and verified in SharePoint/Google Drive document
- [ ] Code reviewed and merged
- [ ] Documented with authoring guide
