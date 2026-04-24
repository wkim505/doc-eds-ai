# User Story: Things To Do Block

## Summary
Implement a `things-to-do` EDS block to replace the `DocThingsToDo` Vue component on the DOC NZ website, providing a curated, filterable listing of activities available in a park or region.

## User Story
**As a** DOC NZ website visitor,  
**I want to** browse a filtered list of activities (walking, camping, hunting, cycling, kayaking) available in a specific park or region,  
**So that** I can discover all the things I can do during my visit to a conservation area.

## Background
The `DocThingsToDo` component renders on park and regional pages, presenting activities filtered to the specific location. Activities include walking & tramping, camping, hunting, fishing, cycling, horse riding, and more. The component aggregates content from DOC's activity API or CMS query and allows users to filter by activity type.

## Acceptance Criteria

### AC1 — Activity listing rendering
- **Given** a `things-to-do` block is on a park or regional page,  
- **When** the page loads,  
- **Then** a grid of activity cards renders, each showing: activity icon, activity name, and a short description or link count (e.g. "12 walks").

### AC2 — Activity type filter
- **Given** the things-to-do block renders multiple activity types,  
- **When** a user selects an activity type filter (e.g. "Camping"),  
- **Then** only activity cards matching the selected type are shown.

### AC3 — Region/park scoping
- **Given** the block is on a page with a `park-id` or `region-id` metadata value,  
- **When** the block loads,  
- **Then** only activities available in that park or region are shown (pre-filtered from the data source).

### AC4 — Activity card link
- **Given** an activity card is rendered,  
- **When** a user clicks the card,  
- **Then** they are navigated to the relevant activity sub-section page (e.g. `/parks-and-recreation/things-to-do/walking-and-tramping/`).

### AC5 — "All activities" overview
- **Given** no filter is active,  
- **When** the block renders,  
- **Then** all activity types available in the park/region are displayed.

### AC6 — Empty filter state
- **Given** an activity type filter is applied that has no matching activities for the park/region,  
- **When** rendered,  
- **Then** a message "No [activity type] activities available in this area" is shown.

### AC7 — Accessible activity cards
- **Given** activity cards are rendered,  
- **When** inspected with a screen reader,  
- **Then** each card is a focusable link with a descriptive label, icons have `aria-hidden="true"`, and the written label is the accessible name.

### AC8 — Mobile layout
- **Given** the block is viewed on mobile,  
- **When** rendered,  
- **Then** activity cards display in a 2-up grid that wraps cleanly with no overflow.

## Live Reference

| Variant | Live URL | Notes |
|---|---|---|
| Things to do — all activities | https://www.doc.govt.nz/parks-and-recreation/things-to-do/ | Full activity grid for all conservation areas |
| Regional things to do | https://www.doc.govt.nz/parks-and-recreation/places-to-go/northland/ | Activities scoped to Northland |
| Walks & tramping activities | https://www.doc.govt.nz/parks-and-recreation/things-to-do/walking-and-tramping/ | Walking activity sub-section |

> **Note:** The activity listing is rendered via Vue.js. Open in a JavaScript-enabled browser to interact with activity type filters.

## Variants

| Variant | Block Name | Description |
|---|---|---|
| Full activity grid | `things-to-do` | All activity types for the site or region (unfiltered) |
| Region-scoped | `things-to-do` | Pre-filtered to current page's park/region via metadata |
| Activity-filtered | `things-to-do` | Shows specific activity type only (e.g. walking, camping) |
| Compact widget | `things-to-do (compact)` | Condensed icon-list format for sidebar or intro panels |

## Technical Notes
- Replaces: `DocThingsToDo`
- Data source: DOC activity API (`api.doc.govt.nz/activities`) or EDS query index filtered by `type: activity`
- Park/region scoping: `getMetadata('park-id')` or `getMetadata('region-id')` used as API query param
- Activity types: Walking & tramping, Cycling, Camping, Hunting, Fishing, Horse riding, Kayaking, Swimming, Diving, Skiing
- Icon set: DOC's activity icon library (SVG)

## Definition of Done
- [ ] Block renders correctly in EDS preview and live
- [ ] All 8 acceptance criteria pass
- [ ] Activity filtering verified with multiple filter combinations
- [ ] Region scoping verified for multiple park pages
- [ ] Screen reader tested
- [ ] Mobile layout verified at 375px
- [ ] Authored and verified in SharePoint/Google Drive document
- [ ] Code reviewed and merged
- [ ] Documented with authoring guide
