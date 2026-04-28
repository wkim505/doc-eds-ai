# Tabs — EDS Block Specification

> **Block ID:** DOCEDS-007  
> **Block Folder:** `blocks/tabs/`  
> **Priority:** High  
> **Complexity:** M  
> **Source Components:** doc-tabs, doc-tab, doc-things-tab-content

---

## User Story

**As a** site visitor, **I want to** switch between categorised panels of content using tab controls **so that** I can quickly access different types of information on a single page without scrolling through everything.

## Description

The Tabs component on the DOC NZ website provides a horizontal tab bar where each tab label corresponds to a content panel displayed below. Only one panel is visible at a time; clicking a different tab switches the visible panel instantly. This pattern is commonly used on place detail pages to separate content like "Overview", "Things to do", "Plan & prepare", and "Alerts" into tabbed sections.

On the live site, `doc-tabs` is the wrapper Vue component that manages the tab list and active state. Each individual tab is rendered by `doc-tab`, and `doc-things-tab-content` manages the specific content rendering for place-related tabs. The tab bar uses the `ui-tabs` and `map-list-tabs` CSS classes for styling. The active tab is highlighted with a bottom border or background colour change.

In EDS, the tabs block is authored as a table in Google Docs where each row after the header defines a tab label and its content. The `blocks/tabs/tabs.js` decorator constructs the ARIA-compliant tablist/tab/tabpanel DOM structure, manages keyboard navigation, and handles tab switching.

## Acceptance Criteria

1. A horizontal tab bar displays all tab labels on a single row.
2. Clicking a tab label shows its corresponding content panel and hides others.
3. The active tab is visually highlighted (bottom border, background, or text weight).
4. Only one tab panel is visible at any time.
5. ARIA roles are correctly applied: `role="tablist"` on the tab container, `role="tab"` on each tab, `role="tabpanel"` on each panel.
6. `aria-selected="true"` is set on the active tab; `aria-hidden="true"` on inactive panels.
7. Keyboard navigation: Left/Right arrows move between tabs, Enter/Space activates, Home/End jump to first/last tab.
8. Tab content supports rich text: paragraphs, lists, images, links, and nested blocks.
9. On mobile (< 768px), tabs either scroll horizontally or convert to an accordion pattern.
10. The first tab is active by default on page load.

## Technical Notes for EDS

### DOM Structure

```html
<div class="tabs ui-tabs">
  <!-- Tab bar -->
  <div class="tabs__list map-list-tabs" role="tablist" aria-label="Content sections">
    <button class="tabs__tab" role="tab" id="tab-overview" aria-controls="panel-overview" aria-selected="true" tabindex="0">
      Overview
    </button>
    <button class="tabs__tab" role="tab" id="tab-things-to-do" aria-controls="panel-things-to-do" aria-selected="false" tabindex="-1">
      Things to do
    </button>
    <button class="tabs__tab" role="tab" id="tab-plan" aria-controls="panel-plan" aria-selected="false" tabindex="-1">
      Plan &amp; prepare
    </button>
    <button class="tabs__tab" role="tab" id="tab-alerts" aria-controls="panel-alerts" aria-selected="false" tabindex="-1">
      Alerts
    </button>
  </div>

  <!-- Tab panels -->
  <div class="tabs__panel" role="tabpanel" id="panel-overview" aria-labelledby="tab-overview" tabindex="0">
    <p>Abel Tasman National Park is known for its golden beaches, sculptured granite cliffs, and world-famous Abel Tasman Coast Track.</p>
  </div>
  <div class="tabs__panel" role="tabpanel" id="panel-things-to-do" aria-labelledby="tab-things-to-do" tabindex="0" hidden>
    <p>Walking, kayaking, swimming, and camping are all popular activities in the park.</p>
  </div>
  <div class="tabs__panel" role="tabpanel" id="panel-plan" aria-labelledby="tab-plan" tabindex="0" hidden>
    <p>Book huts and campsites in advance during peak season (October–April).</p>
  </div>
  <div class="tabs__panel" role="tabpanel" id="panel-alerts" aria-labelledby="tab-alerts" tabindex="0" hidden>
    <p>No current alerts for this area.</p>
  </div>
</div>
```

### CSS Requirements

```css
.tabs {
  max-width: 1200px;
  margin: 0 auto;
}

.tabs__list {
  display: flex;
  border-bottom: 2px solid var(--color-border, #ddd);
  margin: 0;
  padding: 0;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}

.tabs__tab {
  padding: 12px 24px;
  border: none;
  background: none;
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-color-muted, #666);
  cursor: pointer;
  white-space: nowrap;
  border-bottom: 3px solid transparent;
  margin-bottom: -2px;
  transition: color 0.2s, border-color 0.2s;
}

.tabs__tab:hover {
  color: var(--text-color, #333);
}

.tabs__tab[aria-selected="true"] {
  color: var(--doc-green-100, #47665E);
  border-bottom-color: var(--doc-green-100, #47665E);
}

.tabs__tab:focus-visible {
  outline: 2px solid var(--doc-green-100, #47665E);
  outline-offset: -2px;
}

.tabs__panel {
  padding: 24px 0;
  font-size: 1rem;
  line-height: 1.6;
}

.tabs__panel[hidden] {
  display: none;
}

/* Mobile: horizontal scroll with fade hint */
@media (max-width: 768px) {
  .tabs__list {
    gap: 0;
    padding-bottom: 0;
  }

  .tabs__tab {
    padding: 10px 16px;
    font-size: 0.875rem;
  }

  .tabs__panel {
    padding: 16px 0;
  }
}
```

### JS Requirements

- **Tab switching:** Click handler on each `.tabs__tab` button sets `aria-selected="true"` on the clicked tab, `aria-selected="false"` on all others. Shows the corresponding `tabpanel` (remove `hidden`), hides all others (add `hidden`). Updates `tabindex` (active: `0`, inactive: `-1`).
- **Keyboard navigation:**
  - `ArrowRight`: Move focus to next tab (wrap to first at end).
  - `ArrowLeft`: Move focus to previous tab (wrap to last at start).
  - `Home`: Move focus to first tab.
  - `End`: Move focus to last tab.
  - `Enter`/`Space`: Activate the focused tab (show its panel).
- **ID generation:** Auto-generate unique `id` attributes for tabs and panels based on tab label text (slugified) to ensure `aria-controls` and `aria-labelledby` linkage.
- **First tab active:** On block initialisation, activate the first tab and show its panel.
- **Hash support (optional):** If the URL contains a hash matching a tab ID, activate that tab on load. Update the URL hash when a tab is clicked without reloading the page.

### Document Authoring (Google Docs)

Authors create a tabs block using a **multi-row table** in Google Docs:

| **Tabs**                                      |
|-----------------------------------------------|
| Overview                                      |
| Abel Tasman National Park is known for its golden beaches, sculptured granite cliffs, and world-famous Abel Tasman Coast Track. |
| Things to do                                  |
| Walking, kayaking, swimming, and camping are all popular activities in the park. |
| Plan & prepare                                |
| Book huts and campsites in advance during peak season (October–April). |
| Alerts                                        |
| No current alerts for this area.              |

- **Row 1 (header):** The word `Tabs` — identifies the block type.
- **Subsequent rows alternate:** Odd rows (2, 4, 6…) are tab labels. Even rows (3, 5, 7…) are the corresponding tab panel content. Panel content supports rich text formatting, embedded images, lists, and links.

## AI Implementation Instructions

### Mandatory Skills
- Adobe Experience Modernization
- EDS Block Development

### Validation Loop
Use Chrome MCP iteratively to verify DOM output against the original site's functional requirements at https://www.doc.govt.nz/ before marking the task complete. Confirm:
- Tab switching works and only one panel is visible at a time.
- Active tab is visually highlighted.
- ARIA roles and attributes are correct and toggled on switch.
- Keyboard navigation works (Left/Right arrows, Home, End, Enter/Space).
- Tab bar scrolls horizontally on mobile if tabs overflow.

### Reference
- Live URL: Place detail pages (e.g., Abel Tasman, Tongariro National Park)
- Vue source: `doc-tabs`, `doc-tab`, `doc-things-tab-content`
- CSS classes: `ui-tabs`, `map-list-tabs`
