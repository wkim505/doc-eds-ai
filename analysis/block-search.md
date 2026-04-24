# User Story: Search Block (Parks & Recreation)

## Summary
Implement a `search` EDS block to replace the `DocParksRecSearch` Vue component, providing faceted search across DOC NZ parks, tracks, huts, campsites, and activities.

## User Story
**As a** DOC NZ website visitor,  
**I want to** search and filter parks, tracks, huts, and activities by region, activity type, difficulty, and facilities,  
**So that** I can quickly find the right conservation destination or activity for my trip.

## Background
The Parks & Recreation search is the highest-traffic feature on DOC NZ. The existing `DocParksRecSearch` component delivers a faceted search interface over thousands of structured records (tracks, huts, campsites, parks) sourced from `api.doc.govt.nz`. On migration to EDS, the content store must be re-indexed into a dedicated search service (Algolia or Coveo). This is identified as the critical path item for the migration project.

## Acceptance Criteria

### AC1 — Search input
- **Given** the `search` block is rendered on a Parks & Recreation page,  
- **When** a user types a query (e.g. "Milford Track"),  
- **Then** results matching the query by name, description, or tag appear below the input, updating in real time (debounced ≥ 300ms).

### AC2 — Region filter
- **Given** a user selects a region from the region filter dropdown,  
- **When** the filter is applied,  
- **Then** only results within the selected region are displayed; the result count updates accordingly.

### AC3 — Activity type filter
- **Given** a user selects an activity type (e.g. "Walking & tramping", "Camping", "Hunting"),  
- **When** the filter is applied,  
- **Then** results are filtered to items tagged with the selected activity type.

### AC4 — Difficulty filter
- **Given** a user selects a difficulty level (Easy, Moderate, Advanced),  
- **When** the filter is applied,  
- **Then** only tracks/activities matching the difficulty are shown.

### AC5 — Combined filters
- **Given** a user applies multiple filters simultaneously (e.g. Region: Wellington + Activity: Walking + Difficulty: Easy),  
- **When** filters are active,  
- **Then** results reflect the intersection of all applied filters.

### AC6 — Clear filters
- **Given** one or more filters are active,  
- **When** the user clicks "Clear filters",  
- **Then** all filters are reset and the full result set is restored.

### AC7 — Result cards
- **Given** search results are returned,  
- **When** displayed,  
- **Then** each result renders as a card with: thumbnail image, name, type badge (Track / Hut / Campsite / Park), region, and a link to the detail page.

### AC8 — No results state
- **Given** a search query or filter combination returns no results,  
- **When** displayed,  
- **Then** a helpful "No results found" message is shown with suggestions to broaden the search or clear filters.

### AC9 — Result count
- **Given** results are displayed,  
- **When** filters are applied or changed,  
- **Then** a result count label (e.g. "Showing 24 of 312 results") is visible and updates dynamically.

### AC10 — Pagination or infinite scroll
- **Given** more results exist than the initial page size (default: 12),  
- **When** the user scrolls to the bottom or clicks "Load more",  
- **Then** the next page of results is appended below the existing results.

### AC11 — Accessible filter controls
- **Given** filter controls are rendered,  
- **When** inspected with a screen reader,  
- **Then** all dropdowns have associated labels, selected filter state is announced, and the result list has a live region (`aria-live="polite"`) announcing result count changes.

### AC12 — URL state persistence
- **Given** a user applies filters or enters a search query,  
- **When** the URL updates,  
- **Then** the active filters are reflected in URL query parameters (e.g. `?region=wellington&activity=walking`), so the filtered view can be bookmarked and shared.

## Live Reference

| Variant | Live URL | Notes |
|---|---|---|
| Parks & Recreation search | https://www.doc.govt.nz/parks-and-recreation/ | Main faceted search for parks, tracks, huts (requires JS) |
| Tracks & walks search | https://www.doc.govt.nz/parks-and-recreation/things-to-do/ | Activity-specific search with filters |
| Places to stay search | https://www.doc.govt.nz/parks-and-recreation/places-to-stay/ | Hut and campsite search with filters |

> **Note:** The search interface is rendered entirely client-side via Vue.js. Must be viewed in a JavaScript-enabled browser at the above URLs to inspect the live component.

## Variants

| Variant | Block Name | Description |
|---|---|---|
| Full faceted search | `search` | Text input + region + activity type + difficulty filters |
| Region-scoped | `search (region)` | Pre-filtered to a specific region; used on regional landing pages |
| Activity-scoped | `search (activity)` | Pre-filtered to a specific activity type (e.g. huts only, tracks only) |
| Inline / compact | `search (compact)` | Smaller form factor for sidebar or secondary placements |

## Technical Notes
- Replaces: `DocParksRecSearch`
- Search service: Algolia (preferred) or Coveo — index populated from `api.doc.govt.nz`
- Index includes: tracks, huts, campsites, parks, activities
- Facets: region, activity-type, difficulty, facilities
- Debounce: 300ms on text input
- Page size: 12 results per page
- URL state: `URLSearchParams` for filter persistence

## Definition of Done
- [ ] Search index set up in chosen search service with full DOC NZ asset data
- [ ] Block renders correctly in EDS preview and live
- [ ] All 12 acceptance criteria pass
- [ ] Filter URL state verified (bookmarkable URLs)
- [ ] Screen reader and keyboard navigation verified for all filter controls
- [ ] Search response time < 300ms (p95)
- [ ] Authored and verified in SharePoint/Google Drive document
- [ ] Code reviewed and merged
- [ ] Documented with authoring guide and search index update runbook
