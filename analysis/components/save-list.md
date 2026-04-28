# Save to List — EDS Block Specification

> **Block ID:** DOCEDS-030  
> **Block Folder:** `blocks/save-list/`  
> **Priority:** Medium  
> **Complexity:** M  
> **Source Components:** doc-save-to-list, doc-my-favourites

---

## User Story

**As a** site visitor, **I want to** save parks, tracks, and activities to a personal list **so that** I can easily find them later when planning my trip.

## Description

The Save to List feature provides a heart/bookmark icon on cards and detail pages that allows visitors to save items to a personal favourites list. The saved list persists across sessions via `localStorage` (for anonymous users) or a user account API (for logged-in users). The "My DOC" page displays all saved items as a collection of cards with the ability to remove items and share the list via a unique URL.

On the Vue site, `doc-save-to-list` handles the save/unsave toggle on individual items, managing the localStorage or API call. `doc-my-favourites` renders the full saved items page with options to clear, share, and manage the list. The share functionality generates a URL containing encoded item IDs so the list can be reconstructed when opened by someone else.

In EDS, this block has two manifestations: (1) a save button component integrated into card and detail page blocks, and (2) a standalone "My Favourites" page block that lists all saved items. The localStorage approach is recommended for the initial EDS implementation, with API integration as a future enhancement.

## Acceptance Criteria

1. A heart/bookmark icon appears on saveable items (cards, detail page headers).
2. Clicking the icon toggles the saved state with a visual change (outline → filled heart).
3. Saved state persists across page loads via `localStorage`.
4. The "My DOC" / "My Favourites" page lists all saved items as cards.
5. Each saved item card has a remove button to unsave the item.
6. A "Clear all" button removes all saved items (with confirmation dialog).
7. Share button generates a URL containing the saved item IDs.
8. Opening a shared list URL loads and displays those items (fetched by ID).
9. A counter badge on the "My DOC" nav link shows the number of saved items.
10. The save button is accessible: `aria-pressed` state, screen reader announcement on toggle.
11. On mobile, the save icon remains tappable with adequate touch target size (44×44px minimum).

## Technical Notes for EDS

### DOM Structure
```html
<!-- Save button (used within card or detail page blocks) -->
<button class="save-to-list-btn" aria-pressed="false" aria-label="Save Tongariro Alpine Crossing to my list"
        data-item-id="tongariro-alpine-crossing"
        data-item-title="Tongariro Alpine Crossing"
        data-item-url="/parks-and-recreation/places-to-go/tongariro/"
        data-item-image="/media/tongariro-thumb.jpg">
  <span class="icon icon-heart-outline save-icon-default"></span>
  <span class="icon icon-heart-filled save-icon-active" hidden></span>
</button>

<!-- My Favourites page block -->
<div class="favourites-block">
  <div class="favourites-header">
    <h1 class="favourites-title">My DOC</h1>
    <p class="favourites-count"><span class="favourites-count-number">5</span> saved items</p>
    <div class="favourites-actions">
      <button class="favourites-share-btn">
        <span class="icon icon-share" aria-hidden="true"></span> Share list
      </button>
      <button class="favourites-clear-btn">Clear all</button>
    </div>
  </div>

  <ul class="favourites-list" role="list">
    <li class="favourites-item">
      <a href="/parks-and-recreation/places-to-go/tongariro/" class="favourites-card">
        <img src="/media/tongariro-thumb.jpg" alt="" loading="lazy" />
        <div class="favourites-card-body">
          <h3>Tongariro Alpine Crossing</h3>
        </div>
      </a>
      <button class="favourites-remove" aria-label="Remove Tongariro Alpine Crossing from list">
        <span class="icon icon-close"></span>
      </button>
    </li>
    <!-- More saved items -->
  </ul>

  <div class="favourites-empty" hidden>
    <p>You haven't saved any items yet.</p>
    <a href="/parks-and-recreation/" class="favourites-explore-link">Explore parks and recreation</a>
  </div>
</div>
```

### CSS Requirements
```css
/* Save button */
.save-to-list-btn {
  background: none; border: none; cursor: pointer;
  padding: 8px; border-radius: 50%;
  transition: transform 0.15s;
  min-width: 44px; min-height: 44px;
  display: inline-flex; align-items: center; justify-content: center;
}
.save-to-list-btn:hover { transform: scale(1.15); }
.save-to-list-btn[aria-pressed="true"] .save-icon-default { display: none; }
.save-to-list-btn[aria-pressed="true"] .save-icon-active { display: inline; }
.save-to-list-btn[aria-pressed="false"] .save-icon-active { display: none; }
.save-icon-active { color: var(--color-danger, #d32f2f); }

/* Favourites page */
.favourites-header { display: flex; flex-wrap: wrap; align-items: center; gap: 16px; margin-bottom: 24px; }
.favourites-title { margin: 0; }
.favourites-count { color: var(--color-text-muted); margin: 0; }
.favourites-actions { margin-left: auto; display: flex; gap: 12px; }
.favourites-share-btn, .favourites-clear-btn {
  padding: 8px 16px; border: 1px solid var(--color-border);
  border-radius: 4px; background: #fff; cursor: pointer; font-size: 13px;
}

/* Favourites list */
.favourites-list {
  display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 16px; list-style: none; padding: 0;
}
.favourites-item { position: relative; }
.favourites-card {
  display: flex; gap: 12px; padding: 12px;
  border: 1px solid var(--color-border-light); border-radius: 8px;
  text-decoration: none; color: inherit;
}
.favourites-card img { width: 100px; height: 75px; object-fit: cover; border-radius: 4px; }
.favourites-remove {
  position: absolute; top: 8px; right: 8px;
  background: #fff; border: 1px solid var(--color-border);
  border-radius: 50%; width: 28px; height: 28px;
  cursor: pointer; display: flex; align-items: center; justify-content: center;
}

/* Empty state */
.favourites-empty { text-align: center; padding: 48px 16px; }
.favourites-explore-link { color: var(--color-primary); font-weight: 600; }

/* Responsive */
@media (max-width: 768px) {
  .favourites-header { flex-direction: column; align-items: flex-start; }
  .favourites-actions { margin-left: 0; }
  .favourites-list { grid-template-columns: 1fr; }
}
```

### JS Requirements
- **Save button (integrated in other blocks):**
  - On click: toggle `aria-pressed`, add/remove item from `localStorage` (`doc-saved-items` key).
  - Store items as JSON array: `[{ id, title, url, image, savedAt }]`.
  - On page load: check `localStorage` and set correct `aria-pressed` state for all save buttons on the page.
  - Dispatch a custom event `doc:save-list-changed` for cross-block communication (e.g., updating nav counter).

- **My Favourites page block:**
  - On load: read `localStorage`, render saved items as cards.
  - If URL has a `?list=` parameter, decode it to load a shared list.
  - Remove button: remove item from localStorage, animate card out, update count.
  - Clear all: confirm dialog, then clear all items and show empty state.
  - Share button: encode saved item IDs into a URL-safe string, copy to clipboard, show "Link copied!" toast.
  - Listen for `doc:save-list-changed` to update in real-time if on the same page.

### Document Authoring (Google Docs)

The save button is **not a standalone authored block** — it is integrated into card and detail page blocks automatically.

For the My Favourites page, authors create a **Save List** table:

| Save List   |                              |
|-------------|------------------------------|
| title       | My DOC                       |
| empty-text  | You haven't saved any items yet. |
| empty-link  | /parks-and-recreation/       |
| empty-label | Explore parks and recreation |

- **Row 1:** Block name "Save List".
- **title:** Page heading.
- **empty-text/link/label:** Content for the empty state when no items are saved.

## AI Implementation Instructions

### Mandatory Skills
- Adobe Experience Modernization
- EDS Block Development

### Validation Loop
Use Chrome MCP iteratively to verify DOM output against the original site's functional requirements at https://www.doc.govt.nz/ before marking the task complete.

### Reference
- Live URL: Cards with save icons across the site, My DOC page
- Vue source: doc-save-to-list, doc-my-favourites
- CSS classes: save-to-list, save-icon, my-favourites, favourites-list
