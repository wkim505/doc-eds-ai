# Things To Do — EDS Block Specification

> **Block ID:** DOCEDS-027  
> **Block Folder:** `blocks/things-to-do/`  
> **Priority:** Medium  
> **Complexity:** C  
> **Source Components:** doc-things-to-do, doc-things-tab-content, doc-things-to-do-concessionaires

---

## User Story

**As a** site visitor viewing a park or place page, **I want to** see a categorised listing of activities and things to do at that location **so that** I can plan what to do during my visit.

## Description

The Things To Do block is a complex activity listing component that appears on place detail pages throughout the DOC NZ site. It presents activities available at a specific location — such as walking tracks, camping, swimming, fishing, and wildlife viewing — typically organised with filter tabs by activity category. Each activity is displayed as a card or list item with key details like difficulty, duration, and distance.

On the Vue site, `doc-things-to-do` is the parent container that fetches activity data for the current place and renders it via `doc-things-tab-content` (which manages tab-based category filtering) and `doc-things-to-do-concessionaires` (which lists commercial operators offering guided activities). The component integrates tightly with the place detail page context, pulling data from the DOC API based on the current place ID.

In EDS, this block will fetch activity data from a JSON endpoint parameterised by place ID. Activities are rendered as cards within tab panels, with each tab representing an activity category. The block should gracefully handle places with few or no activities, and the concessionaire sub-section can either be embedded or delegated to the separate Concessionaires block (DOCEDS-028).

## Acceptance Criteria

1. Block displays a tabbed interface with activity categories (e.g., Walking & Tramping, Camping, Water Activities).
2. Each tab panel shows a list of activity cards relevant to that category.
3. Activity cards show: name (linked), difficulty badge, duration, distance, and brief description.
4. Default tab is the first category with results, or "All" if available.
5. Tabs are keyboard navigable: arrow keys switch tabs, Tab key moves into the panel.
6. If only one category exists, tabs are hidden and activities render directly.
7. Activity count per category is shown on each tab label (e.g., "Walking (12)").
8. Empty category tabs are hidden or disabled.
9. On mobile, tabs become a horizontal scroll or a dropdown selector.
10. Concessionaire section (if present) appears after the activity listings.
11. Block renders nothing if no activities exist for the place.

## Technical Notes for EDS

### DOM Structure
```html
<div class="things-to-do-block">
  <h2 class="things-to-do-title">Things to do</h2>

  <div class="things-to-do-tabs" role="tablist" aria-label="Activity categories">
    <button role="tab" aria-selected="true" aria-controls="panel-walking" id="tab-walking"
            class="things-tab is-active">Walking &amp; Tramping (12)</button>
    <button role="tab" aria-selected="false" aria-controls="panel-camping" id="tab-camping"
            class="things-tab">Camping (5)</button>
    <button role="tab" aria-selected="false" aria-controls="panel-water" id="tab-water"
            class="things-tab">Water Activities (3)</button>
  </div>

  <div role="tabpanel" id="panel-walking" aria-labelledby="tab-walking" class="things-panel">
    <ul class="things-list" role="list">
      <li class="things-item">
        <a href="/tracks/tongariro-alpine-crossing/" class="things-card">
          <img src="/media/track-thumb.jpg" alt="" loading="lazy" class="things-card-image" />
          <div class="things-card-body">
            <h3 class="things-card-title">Tongariro Alpine Crossing</h3>
            <div class="things-card-meta">
              <span class="badge badge-warning">Advanced</span>
              <span class="things-card-duration">6–8 hours</span>
              <span class="things-card-distance">19.4 km one way</span>
            </div>
            <p class="things-card-description">One of New Zealand's most popular day hikes across volcanic terrain.</p>
          </div>
        </a>
      </li>
      <!-- More activity items -->
    </ul>
  </div>

  <div role="tabpanel" id="panel-camping" aria-labelledby="tab-camping" class="things-panel" hidden>
    <!-- Camping activities -->
  </div>

  <div role="tabpanel" id="panel-water" aria-labelledby="tab-water" class="things-panel" hidden>
    <!-- Water activities -->
  </div>
</div>
```

### CSS Requirements
```css
/* Tabs */
.things-to-do-tabs {
  display: flex; gap: 0; border-bottom: 2px solid var(--color-border-light);
  overflow-x: auto; -webkit-overflow-scrolling: touch;
}
.things-tab {
  padding: 12px 20px; background: none; border: none;
  border-bottom: 3px solid transparent; cursor: pointer;
  font-size: 14px; font-weight: 600; white-space: nowrap;
  color: var(--color-text-muted);
}
.things-tab.is-active,
.things-tab[aria-selected="true"] {
  color: var(--color-primary); border-bottom-color: var(--color-primary);
}

/* Activity list */
.things-list { list-style: none; padding: 0; display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 20px; margin-top: 20px; }
.things-card { display: flex; gap: 16px; text-decoration: none; color: inherit; padding: 12px; border: 1px solid var(--color-border-light); border-radius: 8px; transition: box-shadow 0.2s; }
.things-card:hover { box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
.things-card-image { width: 120px; height: 90px; object-fit: cover; border-radius: 4px; flex-shrink: 0; }
.things-card-title { margin: 0 0 6px; font-size: 1rem; }
.things-card-meta { display: flex; flex-wrap: wrap; gap: 8px; align-items: center; margin-bottom: 6px; font-size: 0.85rem; color: var(--color-text-muted); }
.things-card-description { margin: 0; font-size: 0.85rem; color: var(--color-text-muted); display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }

/* Responsive */
@media (max-width: 768px) {
  .things-card { flex-direction: column; }
  .things-card-image { width: 100%; height: 160px; }
  .things-list { grid-template-columns: 1fr; }
}
```

### JS Requirements
- Fetch activity data from a JSON endpoint: `GET /api/things-to-do?place={placeId}`.
- Group activities by category to build tab structure.
- Implement WAI-ARIA tabs pattern: arrow keys cycle tabs, Enter/Space activates, `aria-selected`, `aria-controls`, `role="tabpanel"`.
- Only one tab panel visible at a time (`hidden` attribute on inactive panels).
- If a single category, skip tab rendering and show activities directly.
- If data includes concessionaires, render them in a separate section or delegate to DOCEDS-028.
- Activity card links navigate to the detail page for that activity.

### Document Authoring (Google Docs)

Authors create a **Things To Do** table in Google Docs:

| Things To Do |                                  |
|--------------|----------------------------------|
| place-id     | tongariro-national-park          |
| endpoint     | /api/things-to-do                |
| show-tabs    | true                             |
| categories   | Walking, Camping, Water, Wildlife|

- **Row 1:** Block name "Things To Do".
- **place-id:** Identifier for the place (used to fetch activities from the API).
- **endpoint:** API URL for fetching activities.
- **show-tabs:** Whether to show category tabs (`true`/`false`).
- **categories:** Optional comma-separated list to control which categories appear and their order.
- Alternatively, if activities are authored manually rather than API-driven, use a multi-row table with activity details.

## AI Implementation Instructions

### Mandatory Skills
- Adobe Experience Modernization
- EDS Block Development

### Validation Loop
Use Chrome MCP iteratively to verify DOM output against the original site's functional requirements at https://www.doc.govt.nz/ before marking the task complete.

### Reference
- Live URL: Place detail pages (activities tab), e.g., any national park page
- Vue source: doc-things-to-do, doc-things-tab-content, doc-things-to-do-concessionaires
- CSS classes: things-to-do, things-tab-content, things-list, things-item
