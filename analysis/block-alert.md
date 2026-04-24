# User Story: Alert Block

## Summary
Implement an `alert` EDS block to replace the `DocAlerts` Vue component on the DOC NZ website.

## User Story
**As a** DOC content author,  
**I want to** display urgent safety or operational alerts on relevant pages using a document table,  
**So that** visitors are clearly informed of track closures, weather warnings, predator control operations, or other important notices before visiting a conservation area.

## Background
The `DocAlerts` component is a critical safety feature on DOC NZ. Alerts appear on park, track, and hut pages to warn visitors about closures (e.g. flood damage, pest control 1080 drops, fire restrictions). They can be site-wide banners or page-specific notices. Alert severity levels include informational, warning, and danger.

## Acceptance Criteria

### AC1 — Basic alert rendering
- **Given** a page document contains an `alert` block with a severity level, heading, and body text,  
- **When** the page loads,  
- **Then** the alert renders as a clearly visible, colour-coded banner with an appropriate icon and the authored content.

### AC2 — Severity variants
- **Given** an alert block specifies a variant of `info`, `warning`, or `danger`,  
- **When** the block renders,  
- **Then** the alert uses the correct colour scheme: blue (info), amber (warning), red (danger), each with a distinct icon.

### AC3 — Dismissible alerts
- **Given** an alert block specifies the `dismissible` variant,  
- **When** a user clicks the close/dismiss button,  
- **Then** the alert is hidden for that browser session (using sessionStorage), and the close button has an accessible label.

### AC4 — Non-dismissible alerts
- **Given** an alert block does not specify `dismissible`,  
- **When** the page loads,  
- **Then** no close button is shown and the alert cannot be dismissed.

### AC5 — Link within alert body
- **Given** an alert body contains a hyperlink (e.g. "Read the full closure notice"),  
- **When** rendered,  
- **Then** the link is clearly styled and inherits accessible focus styles.

### AC6 — Multiple alerts on one page
- **Given** a page has multiple `alert` blocks,  
- **When** the page renders,  
- **Then** all alerts stack vertically without layout issues, each visually distinct.

### AC7 — Accessible alert role
- **Given** an alert with `warning` or `danger` severity renders,  
- **When** inspected with a screen reader,  
- **Then** the alert element has `role="alert"` or `role="status"` so screen readers announce it immediately.

### AC8 — Mobile layout
- **Given** an alert renders on mobile (< 768px),  
- **When** the page loads,  
- **Then** the alert is full-width, text is legible, and the icon + heading do not overflow.

## Live Reference

| Variant | Live URL | Notes |
|---|---|---|
| Warning alert — safety | https://www.doc.govt.nz/parks-and-recreation/know-before-you-go/ | Safety warnings for conservation areas |
| Info alert — booking dates | https://www.doc.govt.nz/parks-and-recreation/things-to-do/walking-and-tramping/great-walks/ | Booking open dates notice |
| Track closure alert | https://www.doc.govt.nz/parks-and-recreation/places-to-stay/stay-in-a-hut/kime-hut/ | Seasonal closure or track status notice on hut page |
| Site-wide alert | https://www.doc.govt.nz/ | Homepage-level alerts (e.g. fire restrictions, COVID notices) |

> **Note:** Alert content is dynamic and depends on current operational status. Load pages in a browser to see live alert examples. Track closure alerts are most reliably found on hut and track detail pages.

## Variants

| Variant | Block Name | Description |
|---|---|---|
| Info | `alert (info)` | Blue — general information, notices, booking reminders |
| Warning | `alert (warning)` | Amber — caution required; conditions may affect safety or access |
| Danger | `alert (danger)` | Red — track/area closed; immediate safety risk |
| Dismissible | `alert (dismissible)` | Includes a close (×) button; dismissed state stored in `sessionStorage` |
| Non-dismissible (default) | `alert` | No close button; always visible when on page |
| With link | `alert` | Body contains a hyperlink to further information |

## Technical Notes
- Replaces: `DocAlerts`
- Severity variants: `alert (info)`, `alert (warning)`, `alert (danger)`
- Optional variant: `alert (dismissible)`
- Dismissal state stored in `sessionStorage` keyed by alert heading hash
- Icon set: use inline SVG or CSS icon font consistent with DOC design system

## Definition of Done
- [ ] Block renders correctly in EDS preview and live
- [ ] All 8 acceptance criteria pass
- [ ] All three severity variants visually verified
- [ ] Screen reader announcement verified (role="alert")
- [ ] Colour contrast ≥ 4.5:1 for all severity variants
- [ ] Authored and verified in SharePoint/Google Drive document
- [ ] Code reviewed and merged
- [ ] Documented with authoring guide
