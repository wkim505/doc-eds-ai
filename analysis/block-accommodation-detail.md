# User Story: Accommodation Detail Block

## Summary
Implement an `accommodation-detail` EDS block to display structured information for huts, campsites, lodges, and cabins on individual accommodation pages, replacing Optimizely's hut/campsite content types.

## User Story
**As a** DOC NZ website visitor,  
**I want to** see all relevant details about a hut or campsite (capacity, facilities, booking requirements, price, access) in a structured layout,  
**So that** I can plan and book my overnight stay in a conservation area with confidence.

## Background
DOC NZ manages over 950 huts and hundreds of campsites. Each has structured metadata: hut/campsite type, capacity (bunks/sites), facilities (gas cookers, heating, toilets, water), booking requirements (bookable vs. first-come-first-served), hut pass eligibility, seasonal access, and nearest town. This data is currently managed as a structured Optimizely content type and must be migrated to EDS document-based authoring.

## Acceptance Criteria

### AC1 — Key stats panel
- **Given** a page document contains an `accommodation-detail` block with rows for type, capacity, facilities, and booking requirement,  
- **When** the page renders,  
- **Then** a stats panel displays each attribute with an icon and label (e.g. 🛏 Bunks: 20 | 🚰 Water | 🔥 Heating | 📅 Bookable).

### AC2 — Accommodation type badge
- **Given** the block includes a type value (e.g. "Great Walk Hut", "Backcountry Hut", "Serviced Campsite", "Basic Campsite"),  
- **When** rendered,  
- **Then** the type is displayed as a styled badge with the appropriate category label.

### AC3 — Booking CTA
- **Given** the accommodation is bookable online,  
- **When** rendered,  
- **Then** a prominent "Book now" button links to the relevant booking page at `bookings.doc.govt.nz`. The button is disabled/replaced with "Walk-in only" text if the accommodation is not bookable.

### AC4 — Hut pass indicator
- **Given** the accommodation is eligible for a DOC Backcountry Hut Pass,  
- **When** rendered,  
- **Then** a "Hut Pass accepted" badge/icon is displayed with a link to purchase a hut pass.

### AC5 — Pricing display
- **Given** the block includes adult and child pricing rows,  
- **When** rendered,  
- **Then** pricing is clearly displayed with currency (NZD), and a note appears if pricing varies seasonally.

### AC6 — Facilities icons
- **Given** the block includes a facilities list,  
- **When** rendered,  
- **Then** each facility is displayed as a labelled icon (e.g. toilets, running water, gas cooker, heating, electricity) using DOC's icon set.

### AC7 — Map integration
- **Given** the block includes GPS coordinates,  
- **When** rendered,  
- **Then** a `map` block renders below the stats panel showing the hut/campsite location with a marker.

### AC8 — Seasonal access warning
- **Given** the accommodation has a defined access season and the current date is outside that season,  
- **When** rendered,  
- **Then** a warning notice displays (e.g. "This hut is closed in winter — access not recommended from June to September").

### AC9 — Mobile layout
- **Given** the block is viewed on mobile,  
- **When** rendered,  
- **Then** all stats stack vertically and facilities icons wrap without overflow.

### AC10 — Structured data (Schema.org)
- **Given** an accommodation-detail block is rendered,  
- **When** the page source is inspected,  
- **Then** `Schema.org/LodgingBusiness` or `Schema.org/Accommodation` JSON-LD structured data is included with name, geo, amenityFeature, and priceRange.

## Live Reference

| Variant | Live URL | Notes |
|---|---|---|
| Backcountry hut | https://www.doc.govt.nz/parks-and-recreation/places-to-stay/stay-in-a-hut/kime-hut/ | Standard hut with facilities and seasonal access |
| Hut near Wellington | https://www.doc.govt.nz/parks-and-recreation/places-to-stay/stay-in-a-hut/welcome-flat-hut/ | Hut with hot pools; bookable |
| Huts overview listing | https://www.doc.govt.nz/parks-and-recreation/places-to-stay/stay-in-a-hut/ | Landing page listing all hut types |
| Campsites overview | https://www.doc.govt.nz/parks-and-recreation/places-to-stay/stay-at-a-campsite/ | Campsite type overview |

> **Note:** Individual hut/campsite pages are rendered via Vue.js. Open in a browser and inspect the page DOM for the structured accommodation fields.

## Variants

| Variant | Block Name | Description |
|---|---|---|
| Great Walk Hut | `accommodation-detail (great-walk)` | Fully serviced, bookable, cook tops, heating, flush toilets |
| Serviced Hut | `accommodation-detail` | Gas cooking, heating; may be bookable or walk-in |
| Standard/Basic Hut | `accommodation-detail` | No cooking facilities; hut pass eligible; walk-in only |
| Bivvy | `accommodation-detail (bivvy)` | Emergency shelter only; no facilities; free |
| Serviced Campsite | `accommodation-detail (campsite)` | Flush toilets, water, BBQs; fee applies; may be bookable |
| Basic/Standard Campsite | `accommodation-detail (campsite)` | Basic facilities or self-contained; low/no fee |
| Lodge/Cottage | `accommodation-detail (lodge)` | Fully self-contained; fully bookable; premium pricing |
| Seasonal closure | `accommodation-detail` | Displays warning when access season has ended |

## Technical Notes
- Replaces: Optimizely `HutPage` and `CampsitePage` content types
- Accommodation types: Great Walk Hut, Serviced Hut, Standard Hut, Basic Hut, Bivvy, Serviced Campsite, Standard Campsite, Basic Campsite, Lodge
- Booking link: `https://bookings.doc.govt.nz/web/...`
- Hut pass link: `https://www.doc.govt.nz/parks-and-recreation/places-to-stay/stay-in-a-hut/backcountry-hut-pass/`
- Schema.org type: `LodgingBusiness` with `amenityFeature` array

## Definition of Done
- [ ] Block renders correctly in EDS preview and live
- [ ] All 10 acceptance criteria pass
- [ ] Schema.org JSON-LD validated
- [ ] Booking link verified for both bookable and walk-in scenarios
- [ ] Mobile layout verified at 375px
- [ ] Authored and verified in SharePoint/Google Drive document
- [ ] Code reviewed and merged
- [ ] Data migration mapping documented for all 950+ huts
