# User Story: Site Search Block

## Summary
Implement a `site-search` EDS block to replace the `DocSiteSearch` and `DocCmsSearch` Vue components, providing full-text search across all DOC NZ website content.

## User Story
**As a** DOC NZ website visitor,  
**I want to** search across the entire DOC website from a global search bar,  
**So that** I can quickly find any page, species, park, policy document, or news article without knowing the site's navigation structure.

## Background
The global site search (`DocSiteSearch`) is accessible from the main header and delivers a full-text search experience over all DOC NZ content — editorial pages, species profiles, tracks, huts, media releases, and policy documents. The existing search is powered by Optimizely's search engine. On migration to EDS, this must be re-platformed to an external search service (Algolia, Coveo, or Franklin's built-in search index).

## Acceptance Criteria

### AC1 — Search input in header
- **Given** the site-search block is embedded in the EDS header,  
- **When** a user clicks the search icon or focuses the search input,  
- **Then** a search input field expands/appears with a placeholder (e.g. "Search DOC...").

### AC2 — Instant search suggestions
- **Given** a user begins typing in the search input,  
- **When** at least 2 characters are entered,  
- **Then** a dropdown of up to 5 suggested results appears below the input (debounced ≥ 300ms), showing page title and content type.

### AC3 — Full results page
- **Given** a user submits a search query (Enter key or search button),  
- **When** submitted,  
- **Then** the user is taken to a `/search` results page displaying paginated full results with title, content type, excerpt, and link.

### AC4 — Content type filtering on results page
- **Given** the user is on the search results page,  
- **When** they select a content type filter (e.g. "Parks & Recreation", "Nature", "News"),  
- **Then** results are filtered to the selected content type.

### AC5 — Highlighted search terms
- **Given** search results are displayed,  
- **When** rendered,  
- **Then** the matching query terms are highlighted in bold within the result excerpt.

### AC6 — No results state
- **Given** a search query returns no results,  
- **When** displayed,  
- **Then** a "No results found for [query]" message is shown with suggestions (e.g. check spelling, try different keywords) and links to popular pages.

### AC7 — Keyboard accessibility
- **Given** the search suggestion dropdown is open,  
- **When** a user uses arrow keys,  
- **Then** focus moves through suggestions; `Enter` navigates to the selected suggestion; `Escape` closes the dropdown and returns focus to the input.

### AC8 — ARIA live region for suggestions
- **Given** search suggestions update as the user types,  
- **When** new suggestions appear,  
- **Then** a screen reader announces the number of suggestions available (e.g. "5 results available").

### AC9 — Mobile search UX
- **Given** the search is triggered on mobile,  
- **When** the search input opens,  
- **Then** the input expands full-width, the keyboard is auto-focused, and suggestions display in a mobile-friendly dropdown.

### AC10 — Search index freshness
- **Given** a new page is published on the EDS site,  
- **When** the search index is next updated (within 24 hours),  
- **Then** the new page appears in search results for relevant queries.

## Live Reference

| Variant | Live URL | Notes |
|---|---|---|
| Global site search | https://www.doc.govt.nz/ | Search icon in main site header (all pages) |
| Search results page | https://www.doc.govt.nz/search/?q=kiwi | Example search results page (requires JS) |
| Header search (mobile) | https://www.doc.govt.nz/ | Tap search icon in mobile header to expand input |

> **Note:** The search is rendered client-side. Click the magnifying glass icon in the site header on any page to see the live component.

## Variants

| Variant | Block Name | Description |
|---|---|---|
| Header search input | `site-search` | Compact search input in the global header |
| Search suggestions dropdown | `site-search` | Instant suggestions overlay appearing beneath the input |
| Full results page | `site-search (results)` | Paginated results page at `/search?q=...` |
| Results with type filter | `site-search (results)` | Content type filter tabs on the results page |

## Technical Notes
- Replaces: `DocSiteSearch`, `DocCmsSearch`, `AbnCmsSearch`
- Search service: Algolia (preferred), Coveo, or Franklin search index (`/query-index.json`)
- Suggestion dropdown: max 5 results, triggered at ≥ 2 characters with 300ms debounce
- Results page: `/search?q={query}&type={content-type}`
- Pagination: 10 results per page on results page

## Definition of Done
- [ ] Search index populated with all EDS site content
- [ ] Block renders correctly in EDS header (desktop and mobile)
- [ ] All 10 acceptance criteria pass
- [ ] Screen reader and keyboard navigation verified
- [ ] Index update pipeline documented and automated
- [ ] Search response time < 200ms (p95) for suggestions
- [ ] Code reviewed and merged
- [ ] Documented with authoring guide
