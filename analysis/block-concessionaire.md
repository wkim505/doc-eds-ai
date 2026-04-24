# User Story: Concessionaire Block

## Summary
Implement a `concessionaire` EDS block to replace the `DocConcessionaireList` and `DocConcessionaireFormBlock` Vue components on the DOC NZ website.

## User Story
**As a** DOC NZ website visitor,  
**I want to** browse a list of licensed concessionaires (tourism operators, guides, charter companies) operating in a specific park or region,  
**So that** I can find and contact authorised operators for guided experiences on conservation land.

## Background
DOC NZ grants concessions to commercial operators (tourism, guiding, filming, grazing). The `DocConcessionaireList` component renders a dynamically filtered list of operators from an API backend, grouped by park or activity type. The `DocConcessionaireFormBlock` allows operators to submit or update their listing. Both components rely on `api.doc.govt.nz` for data.

## Acceptance Criteria

### AC1 — Concessionaire listing rendering
- **Given** the `concessionaire` block is on a page,  
- **When** the page loads,  
- **Then** the block fetches and renders a list of concessionaire entries from the DOC API, each showing: operator name, activity types, contact details, and website link.

### AC2 — Filter by activity type
- **Given** the concessionaire list is rendered,  
- **When** a user selects an activity type filter (e.g. "Guided walks", "Boat tours", "Accommodation"),  
- **Then** the list filters to show only operators offering that activity type.

### AC3 — Filter by park/region
- **Given** the concessionaire block is on a regional park page,  
- **When** the block loads,  
- **Then** results are automatically pre-filtered to concessionaires operating in that park/region (determined by page metadata).

### AC4 — Operator detail card
- **Given** a concessionaire entry renders,  
- **When** displayed,  
- **Then** each card shows: operator name (as heading), activity types (as badges), phone, email, website URL, and a brief description.

### AC5 — External website link
- **Given** an operator entry includes a website URL,  
- **When** the link renders,  
- **Then** it opens in a new tab with `rel="noopener noreferrer"` and an external link icon.

### AC6 — Empty state
- **Given** no concessionaires match the current filters or park,  
- **When** rendered,  
- **Then** a helpful message is shown: "No licensed operators found for this area. Try broadening your filter or contact your local DOC office."

### AC7 — Loading state
- **Given** the block is fetching data from the API,  
- **When** the fetch is in progress,  
- **Then** a skeleton loading placeholder is shown to prevent layout shift.

### AC8 — API error handling
- **Given** the DOC API is unavailable or returns an error,  
- **When** the block attempts to load,  
- **Then** a graceful error message is displayed: "Unable to load operator listings at this time. Please try again later." No unhandled JavaScript errors occur.

### AC9 — Accessible list markup
- **Given** the concessionaire list renders,  
- **When** inspected with a screen reader,  
- **Then** the list is a proper `<ul>` with `<li>` items, each operator heading is a `<h3>`, and contact links have descriptive aria-labels.

## Live Reference

| Variant | Live URL | Notes |
|---|---|---|
| Concessionaire listing — regional | https://www.doc.govt.nz/parks-and-recreation/places-to-go/northland/ | Tourism operators for Northland conservation areas |
| Concessionaire listing — activity | https://www.doc.govt.nz/parks-and-recreation/things-to-do/ | Guided tour operators by activity type |

> **Note:** The concessionaire list is rendered via Vue.js from `api.doc.govt.nz`. Open in a browser and navigate to a regional park page to see the live component in context.

## Variants

| Variant | Block Name | Description |
|---|---|---|
| Standard listing | `concessionaire` | Unfiltered list of all operators for the current park/region |
| Filtered by activity | `concessionaire` | Pre-filtered to a specific activity type via block metadata |
| With region pre-filter | `concessionaire` | Automatically scoped to current page's park/region via metadata |
| Loading skeleton | `concessionaire` | CSS skeleton shown while API request is in progress |
| Empty state | `concessionaire` | Message shown when no operators are found for the filters applied |
| Error state | `concessionaire` | Graceful error message when API is unavailable |

## Technical Notes
- Replaces: `DocConcessionaireList`, `DocConcessionaireFormBlock`
- Data source: `api.doc.govt.nz` concessionaire endpoint (API contract to be confirmed with DOC API team)
- Pre-filtering: `getMetadata('park-id')` or `getMetadata('region-id')` used as default filter
- Loading skeleton: CSS-only animated placeholder matching card dimensions
- Form submission (update operator listing): migrated to a separate external form solution (out of scope for V1 of this block)

## Definition of Done
- [ ] Block renders correctly in EDS preview and live
- [ ] All 9 acceptance criteria pass
- [ ] API integration tested with DOC API (staging environment)
- [ ] Error and loading states verified
- [ ] Screen reader tested
- [ ] Authored and verified in SharePoint/Google Drive document
- [ ] Code reviewed and merged
- [ ] API contract and rate limits documented
