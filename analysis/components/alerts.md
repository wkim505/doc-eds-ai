# Alert Banner — EDS Block Specification

> **Block ID:** DOCEDS-021  
> **Block Folder:** `blocks/alerts/`  
> **Priority:** High  
> **Complexity:** M  
> **Source Components:** doc-alert, doc-alert-body, doc-alert-header, doc-alert-panel, doc-alerts

---

## User Story

**As a** site visitor, **I want to** see prominent warning banners about track closures, weather warnings, and safety alerts **so that** I can make informed decisions before visiting a DOC location.

## Description

The Alert Banner block displays dismissible notification banners on place detail pages and section pages when active warnings or closures exist. On the DOC NZ site, alerts are fetched from the CMS and rendered at the top of relevant pages — typically above the main content area but below the hero or breadcrumb.

Each alert has a severity level that determines its visual treatment: **warning** (yellow/amber) for caution items like partial track closures, **danger** (red) for serious closures or hazards, and **info** (blue) for general advisory notices. Alerts contain a header with an icon and title, plus an expandable body with detailed description text and optional links to further information.

In EDS, the alert block should render a stack of alert panels with accessible expand/collapse behaviour. Authors can add alerts via a structured table in Google Docs. The block should support dismissal via a close button that persists the dismissal state in `sessionStorage` so the user is not shown the same alert repeatedly within a session.

## Acceptance Criteria

1. Alert renders with correct severity styling: warning (yellow), danger (red), info (blue).
2. Each alert has a header row with icon, severity label, and title text.
3. Alert body is collapsible — defaults to collapsed, expands on header click.
4. A close/dismiss button removes the alert from view and stores dismissal in `sessionStorage`.
5. Multiple alerts stack vertically with consistent spacing.
6. Alerts are accessible: `role="alert"`, `aria-expanded` on toggle, keyboard operable.
7. On mobile, alerts span full width with appropriately scaled typography.
8. If no alerts exist for a page, the block renders nothing (no empty wrapper).

## Technical Notes for EDS

### DOM Structure
```html
<div class="alerts-wrapper">
  <div class="alert alert-warning" role="alert" data-alert-id="alert-123">
    <div class="alert-header" aria-expanded="false" tabindex="0" role="button">
      <span class="icon icon-warning"></span>
      <span class="alert-severity">Warning</span>
      <span class="alert-title">Track partially closed due to storm damage</span>
      <button class="alert-dismiss" aria-label="Dismiss alert">&times;</button>
      <span class="alert-toggle-icon"></span>
    </div>
    <div class="alert-body" hidden>
      <p>The northern section of the Tongariro Alpine Crossing is closed until further notice due to recent storm damage. Alternative routes are available.</p>
      <a href="/link">More information</a>
    </div>
  </div>
  <div class="alert alert-danger" role="alert" data-alert-id="alert-456">
    <div class="alert-header" aria-expanded="false" tabindex="0" role="button">
      <span class="icon icon-danger"></span>
      <span class="alert-severity">Danger</span>
      <span class="alert-title">Volcanic alert level raised</span>
      <button class="alert-dismiss" aria-label="Dismiss alert">&times;</button>
      <span class="alert-toggle-icon"></span>
    </div>
    <div class="alert-body" hidden>
      <p>GeoNet has raised the volcanic alert level. Do not enter the exclusion zone.</p>
    </div>
  </div>
</div>
```

### CSS Requirements
```css
/* Severity colour tokens */
--alert-warning-bg: #fff3cd;
--alert-warning-border: #ffc107;
--alert-danger-bg: #f8d7da;
--alert-danger-border: #dc3545;
--alert-info-bg: #d1ecf1;
--alert-info-border: #17a2b8;

/* Layout */
.alerts-wrapper { display: flex; flex-direction: column; gap: 8px; margin-bottom: 24px; }
.alert { border-left: 4px solid; border-radius: 4px; padding: 12px 16px; }
.alert-header { display: flex; align-items: center; gap: 8px; cursor: pointer; }
.alert-title { flex: 1; font-weight: 600; }
.alert-body { padding: 8px 0 0 28px; }
.alert-dismiss { background: none; border: none; font-size: 1.25rem; cursor: pointer; margin-left: auto; }

/* Responsive — mobile full-width */
@media (max-width: 768px) {
  .alert { border-radius: 0; }
}
```

### JS Requirements
- Toggle `aria-expanded` and `hidden` attribute on `.alert-body` when header is clicked or Enter/Space pressed.
- Dismiss button removes the `.alert` element and stores `dismissed-{alert-id}` in `sessionStorage`.
- On block load, check `sessionStorage` and hide previously dismissed alerts.
- If all alerts are dismissed, remove the `.alerts-wrapper` entirely to avoid empty space.

### Document Authoring (Google Docs)

Authors create an **Alerts** table in Google Docs:

| Alerts     |                                                         |
|------------|---------------------------------------------------------|
| warning    | Track partially closed due to storm damage              |
|            | The northern section is closed until further notice...  |
|            | /link (optional link)                                   |
| danger     | Volcanic alert level raised                             |
|            | GeoNet has raised the volcanic alert level...           |

- **Row 1:** Header row with block name "Alerts".
- **Subsequent rows:** Column 1 = severity (`warning`, `danger`, `info`). Column 2 = title on first line, body text on second line, optional link on third line.
- Empty severity column continues the previous alert's body content.

## AI Implementation Instructions

### Mandatory Skills
- Adobe Experience Modernization
- EDS Block Development

### Validation Loop
Use Chrome MCP iteratively to verify DOM output against the original site's functional requirements at https://www.doc.govt.nz/ before marking the task complete.

### Reference
- Live URL: Place detail pages with active warnings (e.g., https://www.doc.govt.nz/parks-and-recreation/places-to-go/)
- Vue source: doc-alert, doc-alert-body, doc-alert-header, doc-alert-panel, doc-alerts
- CSS classes: doc-alert, alert--warning, alert--danger, alert--info, alert__header, alert__body
