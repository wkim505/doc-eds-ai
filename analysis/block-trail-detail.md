# User Story: Trail Detail Block

## Summary
Implement a `trail-detail` EDS block to display structured track and walk information on individual trail pages, replacing structured data fields from Optimizely track content types.

## User Story
**As a** DOC NZ website visitor,  
**I want to** see all key details about a track or walk (distance, duration, difficulty, grade, facilities, access) in a clear structured layout,  
**So that** I can assess whether the track is suitable for me before visiting.

## Background
DOC NZ manages hundreds of tracks and walks, each with rich structured metadata: distance, estimated duration, difficulty grade (New Zealand Tramping Grade), facilities (toilets, shelters, huts along route), access information, and seasonal availability. This data currently lives in Optimizely as a structured content type. On migration to EDS, this data must be authored in a standardised document table and rendered consistently across all trail pages.

## Acceptance Criteria

### AC1 — Key stats panel rendering
- **Given** a page document contains a `trail-detail` block with rows for distance, duration, difficulty, and grade,  
- **When** the page renders,  
- **Then** a clearly styled "at a glance" stats panel displays each attribute with an icon and value (e.g. 🏃 Distance: 11.2 km | ⏱ Duration: 3–4 hours | 🟡 Difficulty: Moderate).

### AC2 — New Zealand Tramping Grade display
- **Given** a trail-detail block includes a tramping grade value (Easy, Easy-Moderate, Moderate, Advanced, Expert),  
- **When** rendered,  
- **Then** the grade is displayed with the correct DOC grade label and a colour-coded badge (green = Easy, yellow = Moderate, red = Advanced/Expert).

### AC3 — Facilities list
- **Given** the trail-detail block includes a facilities row (e.g. "Toilets, Shelter, Huts"),  
- **When** rendered,  
- **Then** each facility is shown as an icon + label (using DOC's icon set) in a horizontal list.

### AC4 — Seasonal availability
- **Given** a trail-detail block includes a best season or access season value,  
- **When** rendered,  
- **Then** the recommended seasons are displayed, and if the current month falls outside the recommended season, a caution note is shown.

### AC5 — Booking CTA
- **Given** a track requires booking (e.g. Great Walks),  
- **When** rendered,  
- **Then** a prominent "Book now" CTA button links to the relevant booking page at `bookings.doc.govt.nz`.

### AC6 — Track status alert integration
- **Given** the page also contains an `alert` block indicating a closure or warning,  
- **When** the page renders,  
- **Then** the alert appears above the trail-detail block, and the trail status in the stats panel reflects the current status (e.g. "⚠ Currently closed").

### AC7 — Map integration
- **Given** the trail-detail block includes a map URL or coordinates,  
- **When** rendered,  
- **Then** a `map` block is automatically rendered below the stats panel showing the track route.

### AC8 — Mobile layout
- **Given** the trail-detail block is viewed on mobile,  
- **When** rendered,  
- **Then** the stats panel stacks vertically (one stat per row) with adequate spacing and no truncation.

### AC9 — Structured data (Schema.org)
- **Given** a trail-detail block is rendered,  
- **When** the page source is inspected,  
- **Then** the page includes `Schema.org/TouristAttraction` or `Schema.org/Place` JSON-LD structured data with name, description, geo coordinates, and relevant attributes populated.

## Live Reference

| Variant | Live URL | Notes |
|---|---|---|
| Standard walk/track | https://www.doc.govt.nz/parks-and-recreation/things-to-do/walking-and-tramping/waikato-walks/hakarimata-summit-track/ | Day walk with distance, duration, difficulty |
| Wellington walk | https://www.doc.govt.nz/parks-and-recreation/things-to-do/walking-and-tramping/wellington-kapiti-walks/mount-victoria-loop-track/ | City walk with grade and facilities info |
| Great Walk | https://www.doc.govt.nz/parks-and-recreation/things-to-do/walking-and-tramping/great-walks/ | Great Walk overview with booking CTA |

> **Note:** Individual trail pages are rendered via Vue.js. Open in a browser and use Chrome DevTools → Elements to inspect the `trail-detail` data fields.

## Variants

| Variant | Block Name | Description |
|---|---|---|
| Day walk | `trail-detail` | Short, non-bookable walk; no hut details; facilities limited |
| Multi-day / Great Walk | `trail-detail (great-walk)` | Bookable; multiple huts along route; full grade and season info |
| Standard backcountry tramp | `trail-detail` | Multi-day; hut pass required; advanced grade |
| Closed / restricted | `trail-detail` | Displays a danger alert badge when track status is "Closed" |
| Without map | `trail-detail` | Renders stats panel only when no GPS coordinates are available |
| With booking CTA | `trail-detail` | "Book now" button shown for Great Walks and bookable tracks |

## Technical Notes
- Replaces: Optimizely `TrackPage` content type structured fields
- NZ Tramping Grade colour coding: Easy = `#4CAF50`, Easy-Moderate = `#8BC34A`, Moderate = `#FFC107`, Advanced = `#FF5722`, Expert = `#F44336`
- Facilities icon set: DOC's existing SVG icon library
- Booking link pattern: `https://bookings.doc.govt.nz/web/...`
- Schema.org type: `TouristAttraction` with `geo` and `additionalProperty` fields

## Definition of Done
- [ ] Block renders correctly in EDS preview and live
- [ ] All 9 acceptance criteria pass
- [ ] Grade colour coding verified against DOC brand guidelines
- [ ] Schema.org JSON-LD validated via Google Rich Results Test
- [ ] Mobile layout verified at 375px
- [ ] Authored and verified in SharePoint/Google Drive document
- [ ] Code reviewed and merged
- [ ] Documented with authoring guide and data migration mapping
