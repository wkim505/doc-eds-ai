# User Story: Contacts Block

## Summary
Implement a `contacts` EDS block to replace the `DocGenericContactsPanel` Vue component on the DOC NZ website.

## User Story
**As a** DOC content author,  
**I want to** display structured contact information (visitor centres, regional offices, emergency contacts) on a page using a document table,  
**So that** visitors can easily find the right contact details for a specific park, region, or enquiry type.

## Background
The `DocGenericContactsPanel` component renders structured contact panels on visitor centre pages, regional office pages, and park pages. Each contact entry includes name, phone number, email, address, and opening hours. This is critical content for public safety — visitors must be able to contact DOC before and during backcountry trips.

## Acceptance Criteria

### AC1 — Basic contacts rendering
- **Given** a page document contains a `contacts` block with rows for name, phone, email, and address,  
- **When** the page renders,  
- **Then** each contact entry displays as a structured card with labelled fields.

### AC2 — Clickable phone number
- **Given** a contact entry includes a phone number,  
- **When** rendered on any device,  
- **Then** the phone number is a `tel:` hyperlink that triggers a call on mobile devices.

### AC3 — Clickable email address
- **Given** a contact entry includes an email address,  
- **When** rendered,  
- **Then** the email is a `mailto:` hyperlink.

### AC4 — Opening hours
- **Given** a contact entry includes opening hours,  
- **When** rendered,  
- **Then** the opening hours are displayed in a readable format (e.g. Monday–Friday: 8am–4:30pm), with today's hours visually highlighted if determinable from the user's local time.

### AC5 — Multiple contacts
- **Given** a contacts block contains more than one contact entry,  
- **When** rendered,  
- **Then** all contacts are displayed in a responsive grid (2-up on desktop, 1-up on mobile) with clear visual separation.

### AC6 — Emergency contact highlight
- **Given** a contact is marked with type `emergency`,  
- **When** rendered,  
- **Then** it is visually distinguished (e.g. red border or badge) and positioned first in the list.

### AC7 — Map link integration
- **Given** a contact entry includes a physical address,  
- **When** rendered,  
- **Then** a "View on map" link appears below the address, opening Google Maps or the DOC Maps app with the address pre-filled.

### AC8 — Accessible markup
- **Given** a contacts block is rendered,  
- **When** inspected with a screen reader,  
- **Then** each contact's fields are properly labelled (phone label announces "Phone:", email label announces "Email:", etc.) and the contact name is a heading.

## Live Reference

| Variant | Live URL | Notes |
|---|---|---|
| Visitor centre contacts | https://www.doc.govt.nz/footer-links/contact-us/visitor-centres/ | Multiple visitor centre contact panels |
| Regional office contacts | https://www.doc.govt.nz/about-us/our-structure/office-locations/ | DOC regional office listing |
| Emergency contacts | https://www.doc.govt.nz/parks-and-recreation/know-before-you-go/ | Emergency and safety contact panel |

> **Note:** The site is a Vue.js SPA — full rendering requires a JavaScript-enabled browser.

## Variants

| Variant | Block Name | Description |
|---|---|---|
| Standard contact card | `contacts` | Name, phone, email, address, opening hours |
| Emergency contact | `contacts (emergency)` | Red-bordered card; positioned first; used for rescue/safety contacts |
| Multiple contacts grid | `contacts` | 2-up grid of contact cards (e.g. visitor centre + DOC office) |
| With map link | `contacts` | Physical address includes "View on map" link to Google Maps |
| With opening hours highlight | `contacts` | Today's hours are visually highlighted based on current day |

## Technical Notes
- Replaces: `DocGenericContactsPanel`
- Emergency marker: row value `emergency` in type column
- Map link: `https://www.google.com/maps/search/?api=1&query={encoded-address}`
- Opening hours today-highlight: compare `new Date().getDay()` to authored day ranges

## Definition of Done
- [ ] Block renders correctly in EDS preview and live
- [ ] All 8 acceptance criteria pass
- [ ] `tel:` and `mailto:` links verified on mobile
- [ ] Screen reader labels verified
- [ ] Authored and verified in SharePoint/Google Drive document
- [ ] Code reviewed and merged
- [ ] Documented with authoring guide
