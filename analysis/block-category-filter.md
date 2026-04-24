# User Story: Category Filter Block

## Summary
Implement a `category-filter` EDS block to replace the `DocMultiCategory`, `DocSingleCategory`, and `DocMultiSelect` Vue components on the DOC NZ website.

## User Story
**As a** DOC NZ website visitor,  
**I want to** filter a list of content items by one or more category tags,  
**So that** I can narrow down a large list (e.g. bird species, volunteer opportunities, permit types) to the items most relevant to me.

## Background
Category filtering appears on listing pages across DOC NZ — species listing pages (filter by animal group: birds, fish, reptiles), volunteer listing pages (filter by region or activity type), funding opportunities (filter by eligibility), and permit types (filter by activity). The existing `DocMultiCategory` and `DocSingleCategory` components provide single-select and multi-select filter UIs over lists of content cards.

## Acceptance Criteria

### AC1 — Category filter pill rendering
- **Given** a page document contains a `category-filter` block with a list of category values,  
- **When** the page renders,  
- **Then** each category is displayed as a selectable pill/chip above the content list.

### AC2 — Single-select filtering
- **Given** a `category-filter (single)` variant is specified,  
- **When** a user clicks a category pill,  
- **Then** only items tagged with that category are displayed; the selected pill is visually highlighted; clicking it again (or "All") shows all items.

### AC3 — Multi-select filtering
- **Given** a `category-filter (multi)` variant is specified,  
- **When** a user selects multiple category pills,  
- **Then** items tagged with ANY of the selected categories are displayed (OR logic by default); all selected pills are visually highlighted.

### AC4 — "All" reset option
- **Given** one or more category filters are active,  
- **When** the user clicks the "All" pill,  
- **Then** all filters are cleared and the full content list is restored.

### AC5 — Filtered result count
- **Given** category filters are applied,  
- **When** the list updates,  
- **Then** a result count label (e.g. "Showing 12 results") appears and updates dynamically.

### AC6 — URL state
- **Given** a user selects category filters,  
- **When** the URL updates,  
- **Then** selected categories are reflected in URL query parameters (e.g. `?category=birds,reptiles`), enabling shareable filtered views.

### AC7 — Mobile layout
- **Given** the category filter is viewed on mobile,  
- **When** rendered,  
- **Then** filter pills wrap to multiple lines or scroll horizontally without breaking the layout. Pill tap targets are ≥ 44px height.

### AC8 — Accessible filter controls
- **Given** a category filter pill is rendered,  
- **When** inspected with a screen reader,  
- **Then** each pill has `role="checkbox"` (multi) or `role="radio"` (single) with `aria-checked` reflecting selection state, and the filter group has a descriptive `role="group"` label.

### AC9 — Animated list transition
- **Given** filters are applied or removed,  
- **When** the visible items change,  
- **Then** items that are removed fade out and items that appear fade in with a subtle CSS transition (respecting `prefers-reduced-motion`).

## Live Reference

| Variant | Live URL | Notes |
|---|---|---|
| Animal type filter | https://www.doc.govt.nz/nature/native-animals/ | Filter native animals by group (birds, reptiles, fish, etc.) |
| Permit type filter | https://www.doc.govt.nz/get-involved/apply-for-permits/all-permissions/ | Filter permissions by activity and organisation type |
| Conservation activities filter | https://www.doc.govt.nz/get-involved/conservation-activities/ | Filter ABN activities by category |

> **Note:** Category filter interactions are rendered client-side. Use a JavaScript-enabled browser to interact with the live filter UI.

## Variants

| Variant | Block Name | Description |
|---|---|---|
| Single-select | `category-filter (single)` | One active category at a time; clicking active category deselects it |
| Multi-select | `category-filter (multi)` | Multiple categories can be active simultaneously (OR logic) |
| Pills/chips | `category-filter` | Default UI: rounded pill buttons above the content list |
| Dropdown | `category-filter (dropdown)` | `<select>` dropdown; used when there are many categories (> 8) |
| With "All" reset | `category-filter` | Always-present "All" option to clear all filters |
| With result count | `category-filter` | Displays "Showing X results" label that updates on filter change |
| With URL state | `category-filter` | Active filters reflected in URL query params for shareability |

## Technical Notes
- Replaces: `DocMultiCategory`, `DocSingleCategory`, `DocMultiSelect`, `AbnMultiSelect`
- Variant: `category-filter (single)` vs `category-filter (multi)`
- Filter logic: OR across selected categories (items shown if they match any selected category)
- URL state: `URLSearchParams` — key `category`, value comma-separated slugs
- Items to filter: sibling content list (cards block or custom list below the filter block)
- `prefers-reduced-motion`: skip CSS transitions when enabled

## Definition of Done
- [ ] Block renders correctly in EDS preview and live
- [ ] All 9 acceptance criteria pass
- [ ] URL state verified (shareable filtered URLs)
- [ ] ARIA roles and states verified with screen reader
- [ ] Mobile pill layout verified at 375px
- [ ] Authored and verified in SharePoint/Google Drive document
- [ ] Code reviewed and merged
- [ ] Documented with authoring guide
