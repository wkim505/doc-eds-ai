# Faceted Filter — EDS Block Specification

> **Block ID:** DOCEDS-024  
> **Block Folder:** `blocks/filter/`  
> **Priority:** Medium  
> **Complexity:** C  
> **Source Components:** doc-parks-rec-filter, doc-parks-rec-search, doc-custom-data-filter, doc-filter-result-list, abn-filter-result-list

---

## User Story

**As a** site visitor, **I want to** filter parks, tracks, and activities by region, activity type, difficulty, and facilities **so that** I can find places that match my interests and ability level.

## Description

The Faceted Filter block provides a multi-select dropdown filter interface used extensively on the DOC NZ site's "Things to Do" and "Places to Go" listing pages. Visitors can select one or more values from filter categories such as Region, Activity, Difficulty, Facilities, and Duration. Results update dynamically without a full page reload, and active filters appear as removable pills/chips above the results.

On the Vue site, this is one of the most complex interactive components. `doc-parks-rec-filter` manages the filter UI using the Vue Multiselect library (generating `multiselect__*` class names), while `doc-filter-result-list` and `abn-filter-result-list` handle rendering the filtered results as cards. `doc-custom-data-filter` provides a generic data-attribute-based filtering mechanism. The filter state is synchronised with URL query parameters so filtered views are shareable and bookmarkable.

In EDS, the filter block will use vanilla JavaScript to replicate the multi-select dropdown behaviour, query parameter synchronisation, and dynamic result updates. The block fetches result data from a JSON endpoint or uses pre-rendered content filtered client-side. A "Clear all" action resets filters and updates the URL.

## Acceptance Criteria

1. Filter dropdowns render for each configured category (e.g., Region, Activity, Difficulty, Facilities).
2. Each dropdown supports multi-select — users can select multiple values.
3. Selected filters appear as removable pills/chips above the results area.
4. Results update dynamically (no page reload) when filters change.
5. URL query parameters update to reflect active filters (e.g., `?region=wellington,canterbury&activity=walking`).
6. Page load with query parameters pre-selects the corresponding filters and shows filtered results.
7. "Clear all filters" button removes all selections and resets the URL.
8. Result count updates: "Showing X results" or "No results match your filters".
9. Filter dropdowns close when clicking outside or pressing Escape.
10. Mobile: filters collapse into an expandable panel or modal to save vertical space.
11. Keyboard accessible: Tab to navigate filters, Enter/Space to toggle, arrow keys within dropdowns.

## Technical Notes for EDS

### DOM Structure
```html
<div class="filter-block">
  <div class="filter-controls">
    <div class="filter-group" data-filter="region">
      <button class="filter-trigger" aria-expanded="false" aria-haspopup="listbox">
        Region <span class="filter-count">(2)</span>
        <span class="icon icon-chevron-down"></span>
      </button>
      <div class="filter-dropdown" role="listbox" aria-multiselectable="true" hidden>
        <label class="filter-option">
          <input type="checkbox" name="region" value="wellington" checked />
          <span>Wellington</span>
        </label>
        <label class="filter-option">
          <input type="checkbox" name="region" value="canterbury" checked />
          <span>Canterbury</span>
        </label>
        <label class="filter-option">
          <input type="checkbox" name="region" value="otago" />
          <span>Otago</span>
        </label>
        <!-- More options -->
      </div>
    </div>
    <div class="filter-group" data-filter="activity">
      <button class="filter-trigger" aria-expanded="false" aria-haspopup="listbox">
        Activity <span class="filter-count"></span>
        <span class="icon icon-chevron-down"></span>
      </button>
      <div class="filter-dropdown" role="listbox" aria-multiselectable="true" hidden>
        <!-- Options -->
      </div>
    </div>
    <!-- More filter groups -->
    <button class="filter-clear-all" hidden>Clear all filters</button>
  </div>

  <div class="filter-active-pills" aria-live="polite">
    <span class="filter-pill" data-filter="region" data-value="wellington">
      Wellington <button aria-label="Remove Wellington filter">&times;</button>
    </span>
    <span class="filter-pill" data-filter="region" data-value="canterbury">
      Canterbury <button aria-label="Remove Canterbury filter">&times;</button>
    </span>
  </div>

  <div class="filter-meta">
    <p class="filter-result-count">Showing 42 results</p>
  </div>

  <div class="filter-results">
    <ul class="filter-result-list" role="list">
      <li class="filter-result-item">
        <a href="/place-url/" class="card">
          <img src="/media/image.jpg" alt="" loading="lazy" />
          <div class="card-body">
            <h3 class="card-title">Tongariro Alpine Crossing</h3>
            <p class="card-meta">Wellington Region · Walking · Advanced</p>
          </div>
        </a>
      </li>
      <!-- More result items -->
    </ul>
  </div>

  <nav class="pagination" aria-label="Filter results pages">
    <!-- Pagination links -->
  </nav>
</div>
```

### CSS Requirements
```css
/* Filter controls row */
.filter-controls {
  display: flex; flex-wrap: wrap; gap: 12px;
  padding: 16px 0; border-bottom: 1px solid var(--color-border-light);
  margin-bottom: 16px;
}
.filter-trigger {
  display: flex; align-items: center; gap: 6px;
  padding: 8px 16px; background: #fff; border: 1px solid var(--color-border);
  border-radius: 4px; cursor: pointer; font-size: 14px;
}
.filter-trigger[aria-expanded="true"] { border-color: var(--color-primary); }
.filter-count { font-size: 12px; color: var(--color-primary); }

/* Dropdown */
.filter-dropdown {
  position: absolute; z-index: 100; top: 100%; left: 0;
  background: #fff; border: 1px solid var(--color-border);
  border-radius: 4px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  max-height: 280px; overflow-y: auto; min-width: 220px; padding: 8px 0;
}
.filter-group { position: relative; }
.filter-option { display: flex; align-items: center; gap: 8px; padding: 8px 16px; cursor: pointer; }
.filter-option:hover { background: var(--color-bg-hover); }

/* Active pills */
.filter-active-pills { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 16px; }
.filter-pill {
  display: inline-flex; align-items: center; gap: 4px;
  padding: 4px 10px; background: var(--color-primary-light);
  border-radius: 16px; font-size: 13px;
}
.filter-pill button { background: none; border: none; cursor: pointer; font-size: 14px; }

/* Results grid */
.filter-result-list {
  display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px; list-style: none; padding: 0;
}

/* Responsive */
@media (max-width: 768px) {
  .filter-controls { flex-direction: column; }
  .filter-dropdown { position: fixed; bottom: 0; left: 0; right: 0; top: auto; max-height: 60vh; border-radius: 12px 12px 0 0; }
  .filter-result-list { grid-template-columns: 1fr; }
}
```

### JS Requirements
- Initialise filter groups from block configuration (categories + options from JSON endpoint or authored content).
- Toggle dropdown visibility on trigger click; close on outside click or Escape.
- On checkbox change: update URL params via `history.replaceState`, update active pills, fetch/filter results.
- Fetch results from JSON endpoint: `GET /api/filter-results?region=x&activity=y&page=1`.
- Alternatively, if results are pre-rendered on the page, filter client-side by matching `data-*` attributes.
- Render removable pills for each active filter; clicking `×` deselects the corresponding checkbox.
- "Clear all" button resets all checkboxes, clears pills, resets URL, and reloads all results.
- On page load, parse URL params to pre-select filters and display matching results.
- Integrate with pagination block (DOCEDS-033) for paginated result sets.

### Document Authoring (Google Docs)

Authors create a **Filter** table in Google Docs:

| Filter       |                                              |
|--------------|----------------------------------------------|
| endpoint     | /api/parks-and-recreation                    |
| Region       | Wellington, Canterbury, Otago, Waikato, ...  |
| Activity     | Walking, Tramping, Cycling, Kayaking, ...    |
| Difficulty   | Easy, Intermediate, Advanced, Expert         |
| Facilities   | Camping, Toilets, Parking, Water, ...        |
| page-size    | 24                                           |
| result-style | card                                         |

- **Row 1:** Block name "Filter".
- **endpoint:** JSON API providing filterable results.
- **Category rows:** Column 1 = filter category name, Column 2 = comma-separated list of options.
- **page-size:** Number of results per page.
- **result-style:** Display style for results (`card`, `list`, `compact`).

## AI Implementation Instructions

### Mandatory Skills
- Adobe Experience Modernization
- EDS Block Development

### Validation Loop
Use Chrome MCP iteratively to verify DOM output against the original site's functional requirements at https://www.doc.govt.nz/ before marking the task complete.

### Reference
- Live URL: https://www.doc.govt.nz/parks-and-recreation/things-to-do/
- Vue source: doc-parks-rec-filter, doc-parks-rec-search, doc-custom-data-filter, doc-filter-result-list, abn-filter-result-list
- CSS classes: multiselect__tags, multiselect__option, multiselect__select, filter-result-list, filter-active-tags
