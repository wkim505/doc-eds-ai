# Concessionaires — EDS Block Specification

> **Block ID:** DOCEDS-028  
> **Block Folder:** `blocks/concessionaires/`  
> **Priority:** Low  
> **Complexity:** M  
> **Source Components:** doc-concessionaire-form-block, doc-concessionaire-list, doc-commercial-operator-item

---

## User Story

**As a** site visitor, **I want to** find commercial operators offering guided tours, transport, and accommodation near a DOC location **so that** I can book services for my trip.

## Description

The Concessionaires block displays a searchable directory of commercial operators (concessionaires) that hold permits to operate within DOC-managed conservation areas. Each operator is displayed as a card with their business name, services offered, contact details, and a link to their website. The block typically appears on place detail pages within or below the "Things to Do" section.

On the Vue site, `doc-concessionaire-form-block` provides a search/filter form to narrow operators by name or service type, `doc-concessionaire-list` renders the list of matching operators, and `doc-commercial-operator-item` is the individual operator card component. Operator data is fetched from the DOC API based on the current place context.

In EDS, the block will fetch operator data from a JSON API endpoint and render cards with an optional search input for filtering by name. The block should handle zero results gracefully and include proper linking to external operator websites (with `rel="noopener noreferrer"` for external links).

## Acceptance Criteria

1. Block renders a list of concessionaire cards for the current place.
2. Each card shows: operator name, service type(s), phone number, and website link.
3. An optional search input filters the list by operator name or service type (client-side).
4. External website links open in a new tab with `target="_blank" rel="noopener noreferrer"`.
5. If no operators exist for the place, the block renders a "No commercial operators" message or is hidden.
6. Cards are displayed in a responsive grid: 2–3 columns on desktop, single column on mobile.
7. Phone numbers are linked with `tel:` href for mobile tap-to-call.
8. Block is accessible: cards are in a `<ul>`, external link indicators are present.

## Technical Notes for EDS

### DOM Structure
```html
<div class="concessionaires-block">
  <h3 class="concessionaires-title">Commercial operators</h3>

  <div class="concessionaires-search">
    <label for="conc-search" class="sr-only">Search operators</label>
    <input type="search" id="conc-search" class="concessionaires-search-input"
           placeholder="Search operators..." />
  </div>

  <ul class="concessionaires-list" role="list">
    <li class="concessionaire-card">
      <h4 class="concessionaire-name">Alpine Adventures NZ</h4>
      <p class="concessionaire-services">Guided tramping, Helicopter access</p>
      <div class="concessionaire-contact">
        <a href="tel:+6434567890" class="concessionaire-phone">+64 3 456 7890</a>
        <a href="https://www.alpineadventures.co.nz" target="_blank" rel="noopener noreferrer"
           class="concessionaire-website">
          Visit website <span class="icon icon-external" aria-hidden="true"></span>
          <span class="sr-only">(opens in new tab)</span>
        </a>
      </div>
    </li>
    <li class="concessionaire-card">
      <h4 class="concessionaire-name">Mountain Transport Ltd</h4>
      <p class="concessionaire-services">Shuttle service, Equipment hire</p>
      <div class="concessionaire-contact">
        <a href="tel:+6437654321" class="concessionaire-phone">+64 3 765 4321</a>
        <a href="https://www.mountaintransport.co.nz" target="_blank" rel="noopener noreferrer"
           class="concessionaire-website">
          Visit website <span class="icon icon-external" aria-hidden="true"></span>
          <span class="sr-only">(opens in new tab)</span>
        </a>
      </div>
    </li>
  </ul>
</div>
```

### CSS Requirements
```css
/* Block layout */
.concessionaires-block { margin: 32px 0; }
.concessionaires-title { font-size: 1.25rem; margin-bottom: 16px; }

/* Search */
.concessionaires-search { margin-bottom: 16px; }
.concessionaires-search-input {
  width: 100%; max-width: 400px; padding: 10px 14px;
  border: 1px solid var(--color-border); border-radius: 4px; font-size: 14px;
}

/* Card grid */
.concessionaires-list {
  display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 16px; list-style: none; padding: 0;
}
.concessionaire-card {
  padding: 16px; border: 1px solid var(--color-border-light);
  border-radius: 8px; background: #fff;
}
.concessionaire-name { margin: 0 0 6px; font-size: 1rem; }
.concessionaire-services { font-size: 0.85rem; color: var(--color-text-muted); margin: 0 0 12px; }
.concessionaire-contact { display: flex; flex-direction: column; gap: 4px; }
.concessionaire-phone { color: var(--color-text); }
.concessionaire-website { color: var(--color-primary); font-weight: 600; }

/* Responsive */
@media (max-width: 768px) {
  .concessionaires-list { grid-template-columns: 1fr; }
}
```

### JS Requirements
- Fetch operator data from API: `GET /api/concessionaires?place={placeId}`.
- Render operator cards from the response data.
- Search input filters cards client-side by matching operator name or service text (case-insensitive).
- Debounce search input (300ms) to avoid excessive re-rendering.
- If no results match the search, show "No operators match your search".
- If the API returns an empty list, hide the block or show "No commercial operators at this location".

### Document Authoring (Google Docs)

Authors create a **Concessionaires** table in Google Docs:

| Concessionaires |                              |
|-----------------|------------------------------|
| place-id        | tongariro-national-park      |
| endpoint        | /api/concessionaires         |
| show-search     | true                         |

- **Row 1:** Block name "Concessionaires".
- **place-id:** Identifier for the DOC place to load operators for.
- **endpoint:** API URL for concessionaire data.
- **show-search:** Whether to show the search/filter input.
- For manually authored operator lists (no API), use additional rows:

| Concessionaires |                              |
|-----------------|------------------------------|
| Alpine Adventures NZ | Guided tramping, Helicopter access |
|                 | +64 3 456 7890               |
|                 | https://www.alpineadventures.co.nz |

## AI Implementation Instructions

### Mandatory Skills
- Adobe Experience Modernization
- EDS Block Development

### Validation Loop
Use Chrome MCP iteratively to verify DOM output against the original site's functional requirements at https://www.doc.govt.nz/ before marking the task complete.

### Reference
- Live URL: Place detail pages (concessionaires section)
- Vue source: doc-concessionaire-form-block, doc-concessionaire-list, doc-commercial-operator-item
- CSS classes: concessionaire-form, concessionaire-list, commercial-operator-item
