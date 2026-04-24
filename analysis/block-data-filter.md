# User Story: Data Filter Block

## Summary
Implement a `data-filter` EDS block to replace the `DocCustomDataFilter` Vue component on the DOC NZ website, enabling dynamic filtering of data-driven content lists from external API sources.

## User Story
**As a** DOC NZ website visitor,  
**I want to** filter a dynamically loaded data list (e.g. permit types, consultation documents, species lists) using multiple filter criteria,  
**So that** I can quickly find the specific record or item I need from a large dataset without manually scanning the full list.

## Background
The `DocCustomDataFilter` component is a generic, configurable data-fetching and filtering component used where content is driven by API data rather than CMS pages. Use cases include: listing all permit/concession types with filters by activity and land type, species conservation status listings filtered by taxonomic group, and policy/document libraries filtered by category and date. The block must be flexible enough to connect to different DOC API endpoints with configurable filter fields.

## Acceptance Criteria

### AC1 — Data loading from API
- **Given** a `data-filter` block is configured with an API endpoint URL,  
- **When** the page loads,  
- **Then** data is fetched from the specified endpoint and rendered as a list or table, with a loading skeleton shown during the fetch.

### AC2 — Configurable filter fields
- **Given** the block document table includes filter field definitions (field name, label, type: dropdown/checkbox/text),  
- **When** the block renders,  
- **Then** each configured filter control renders above the data list with its defined label.

### AC3 — Filter application
- **Given** one or more filter controls have values selected or entered,  
- **When** the filter values change,  
- **Then** the data list updates to show only records matching all active filter criteria (AND logic across filter fields).

### AC4 — Text search filter
- **Given** a text search filter field is configured,  
- **When** a user types a search term,  
- **Then** the data list filters in real time (debounced ≥ 300ms) to records containing the search term in the configured searchable fields.

### AC5 — Result count
- **Given** filters are applied,  
- **When** the list updates,  
- **Then** a result count label ("Showing X of Y results") is visible and updates dynamically.

### AC6 — Clear all filters
- **Given** one or more filters are active,  
- **When** the user clicks "Clear all",  
- **Then** all filter controls reset to their default state and the full dataset is restored.

### AC7 — Configurable display template
- **Given** the block supports multiple display templates (table, card grid, simple list),  
- **When** the block is configured with a template variant (e.g. `data-filter (table)`),  
- **Then** data is rendered in the specified layout.

### AC8 — API error handling
- **Given** the configured API endpoint is unavailable,  
- **When** the block attempts to load data,  
- **Then** an error message is shown ("Unable to load data at this time") and no unhandled JS errors occur.

### AC9 — Accessible filter controls
- **Given** filter controls render,  
- **When** inspected with a screen reader,  
- **Then** each control has an associated `<label>`, the results list has `aria-live="polite"`, and result count changes are announced.

### AC10 — URL state for filters
- **Given** a user applies filter values,  
- **When** the URL updates,  
- **Then** active filter values are reflected in URL query parameters, enabling shareable filtered views.

## Live Reference

| Variant | Live URL | Notes |
|---|---|---|
| Permissions filter | https://www.doc.govt.nz/get-involved/apply-for-permits/all-permissions/ | Filter permits by activity type and organisation |
| Conservation status filter | https://www.doc.govt.nz/nature/conservation-status/ | Filter species by threat classification |
| Funding opportunities filter | https://www.doc.govt.nz/get-involved/funding/ | Filter funding by eligibility criteria |

> **Note:** The data filter component is rendered entirely client-side from `api.doc.govt.nz`. Use a JavaScript-enabled browser to interact with the live filter controls.

## Variants

| Variant | Block Name | Description |
|---|---|---|
| Table display | `data-filter (table)` | Results rendered in a sortable HTML table |
| Card grid display | `data-filter (cards)` | Results as card grid (2-up or 3-up) |
| List display | `data-filter (list)` | Results as a styled vertical list |
| With text search | `data-filter` | Includes a free-text search input alongside facet filters |
| With dropdown filters | `data-filter` | Filter controls rendered as `<select>` dropdowns |
| With checkbox filters | `data-filter` | Filter controls rendered as checkboxes (multi-select) |
| With URL state | `data-filter` | Active filters reflected in URL params |
| With pagination | `data-filter` | Results paginated; "Load more" or page numbers |

## Technical Notes
- Replaces: `DocCustomDataFilter`
- Configuration: block document table defines `endpoint`, `filters[]` (field, label, type, options), and `display` (table/cards/list)
- Debounce on text input: 300ms
- API: DOC public API (`api.doc.govt.nz`) — endpoint varies by use case
- URL state: `URLSearchParams` per filter field
- Display variants: `data-filter (table)`, `data-filter (cards)`, `data-filter (list)`

## Definition of Done
- [ ] Block renders correctly in EDS preview and live
- [ ] All 10 acceptance criteria pass
- [ ] Tested with at least two different DOC API endpoints
- [ ] Error and loading states verified
- [ ] URL state verified (shareable filtered URLs)
- [ ] Screen reader and keyboard navigation verified
- [ ] Mobile layout verified at 375px
- [ ] Authored and verified in SharePoint/Google Drive document
- [ ] Code reviewed and merged
- [ ] Documented with authoring guide and supported API endpoint list
