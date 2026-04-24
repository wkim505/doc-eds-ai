# User Story: Saved List Block

## Summary
Implement a `saved-list` EDS block to replace the `DocMyFavourites` Vue component on the DOC NZ website, allowing visitors to save and manage a personal list of parks, tracks, and huts.

## User Story
**As a** DOC NZ website visitor,  
**I want to** save parks, tracks, and huts to a personal list that persists across browser sessions,  
**So that** I can curate my own collection of places to visit and access it quickly without needing to search again.

## Background
The `DocMyFavourites` component allows visitors to save DOC destinations to a personal "My Saved List" which previously relied on server-side sessions tied to the bookings platform. For the EDS migration, this feature will be re-implemented using browser `localStorage` (no server-side session required), with a save button on each destination page and a dedicated saved list page (`/parks-and-recreation/my-saved-list/`).

## Acceptance Criteria

### AC1 — Save button on destination pages
- **Given** the `saved-list` block is present on a track, hut, or park page,  
- **When** the page renders,  
- **Then** a "Save" button (heart/bookmark icon + label) is displayed, showing the current saved state (saved or unsaved).

### AC2 — Save/unsave toggle
- **Given** a visitor clicks the "Save" button on a destination page,  
- **When** the click fires,  
- **Then** the destination is added to `localStorage`, the button state updates to "Saved" (filled icon), and a brief toast notification confirms "Added to your saved list".

### AC3 — Unsave action
- **Given** a destination is already saved and the visitor clicks the "Save" button again,  
- **When** the click fires,  
- **Then** the destination is removed from `localStorage`, the button reverts to "Save" (empty icon), and a toast confirms "Removed from your saved list".

### AC4 — Saved list page
- **Given** a visitor navigates to `/parks-and-recreation/my-saved-list/`,  
- **When** the page loads,  
- **Then** the `saved-list` block renders all saved destinations as cards (using the standard `cards` block style) with thumbnail, name, type badge, and a "Remove" button on each card.

### AC5 — Empty saved list state
- **Given** the visitor has no saved items,  
- **When** the saved list page loads,  
- **Then** an empty state message is shown: "Your saved list is empty. Start exploring parks, tracks, and huts to save your favourites."

### AC6 — Persistence across sessions
- **Given** a visitor saves a destination and closes the browser,  
- **When** they return to the site in a new session,  
- **Then** their saved list is still intact (persisted in `localStorage`).

### AC7 — Clear all saved items
- **Given** the visitor has saved items,  
- **When** they click "Clear all" on the saved list page and confirm,  
- **Then** all saved items are removed from `localStorage` and the empty state is shown.

### AC8 — Accessible save button
- **Given** the save button is rendered,  
- **When** inspected with a screen reader,  
- **Then** the button has an `aria-label` describing its action and current state (e.g. "Save Milford Track to your list" or "Remove Milford Track from your saved list"), and state changes are announced via an `aria-live` region.

### AC9 — No login required
- **Given** an anonymous visitor (not logged into bookings.doc.govt.nz) uses the feature,  
- **When** they save a destination,  
- **Then** no login prompt is shown; the feature works entirely via `localStorage` without authentication.

## Live Reference

| Variant | Live URL | Notes |
|---|---|---|
| Save button on track page | https://www.doc.govt.nz/parks-and-recreation/things-to-do/walking-and-tramping/waikato-walks/hakarimata-summit-track/ | Heart/bookmark save button on track detail page |
| Save button on hut page | https://www.doc.govt.nz/parks-and-recreation/places-to-stay/stay-in-a-hut/kime-hut/ | Save button on hut detail page |
| Saved list page | https://www.doc.govt.nz/parks-and-recreation/my-saved-list/ | Dedicated saved list page (requires JS; empty if nothing saved) |

> **Note:** The saved list feature requires JavaScript and uses client-side session state. Open in a browser, save a destination, then navigate to `/parks-and-recreation/my-saved-list/` to see the full list view.

## Variants

| Variant | Block Name | Description |
|---|---|---|
| Save button (unsaved state) | `saved-list (button)` | Heart/bookmark icon + "Save" label; shown on destination pages |
| Save button (saved state) | `saved-list (button)` | Filled icon + "Saved" label; shown after saving |
| Toast notification | `saved-list` | Transient confirmation message on save/unsave action |
| Saved list page | `saved-list` | Full card grid of saved items on `/parks-and-recreation/my-saved-list/` |
| Empty state | `saved-list` | Prompt message when no items are saved |
| With remove button | `saved-list` | Each card on the list page includes a "Remove" action |
| Clear all | `saved-list` | "Clear all" button with confirmation step |

## Technical Notes
- Replaces: `DocMyFavourites`
- Storage: `localStorage` key `doc-saved-list` — value: JSON array of `{ id, name, type, url, thumbnailUrl }`
- Save button added to `trail-detail`, `accommodation-detail` blocks (or as a standalone `saved-list (button)` variant)
- Toast notification: lightweight CSS-only or minimal JS toast, auto-dismisses after 3s
- No server-side session or authentication required for V1

## Definition of Done
- [ ] Block renders correctly in EDS preview and live
- [ ] All 9 acceptance criteria pass
- [ ] localStorage persistence verified across browser restart
- [ ] Save button state survives page refresh
- [ ] Screen reader announces save/unsave state changes
- [ ] Mobile tap target verified (≥ 44px)
- [ ] Authored and verified in SharePoint/Google Drive document
- [ ] Code reviewed and merged
- [ ] Documented with authoring guide
