# Pagination — EDS Block Specification

> **Block ID:** DOCEDS-033  
> **Block Folder:** `blocks/pagination/`  
> **Priority:** Medium  
> **Complexity:** M  
> **Source Components:** doc-pagination

---

## User Story

**As a** site visitor browsing search results or filtered listings, **I want to** navigate between pages of results **so that** I can view all available content without loading everything at once.

## Description

The Pagination block renders a standard page navigation control with numbered page links, previous/next buttons, and ellipsis indicators for large page ranges. It appears below search results, filtered listings, and any paginated content across the DOC NZ site. The current page is visually highlighted, and the first/last pages are always visible even when the range is collapsed with ellipsis.

On the Vue site, `doc-pagination` is a reusable component that accepts total items, page size, and current page as props. It calculates the page range, determines when to show ellipsis, and emits page-change events to parent components. The component preserves existing URL query parameters when generating page links.

In EDS, the pagination block works as both a standalone block and a shared utility used by other blocks (search, filter). It reads the current page from URL query parameters and generates appropriate links. The block should support both server-side pagination (full page navigation via links) and client-side pagination (emitting events consumed by parent blocks).

## Acceptance Criteria

1. Pagination renders page numbers with the current page highlighted.
2. Previous and Next links appear on either side of the page numbers.
3. Previous is disabled/hidden on page 1; Next is disabled/hidden on the last page.
4. Ellipsis appears when the page range is truncated (e.g., 1 ... 5 6 **7** 8 9 ... 25).
5. First and last page numbers are always visible.
6. Page links preserve existing query parameters (e.g., `?q=search&page=3`).
7. Current page link is not clickable and has `aria-current="page"`.
8. Pagination is keyboard accessible: Tab to navigate, Enter to select.
9. The block is wrapped in `<nav aria-label="Pagination">`.
10. Block hides itself when there is only one page of results.
11. Works with both URL-based navigation and JavaScript event-based pagination.

## Technical Notes for EDS

### DOM Structure
```html
<nav class="pagination-block" aria-label="Pagination">
  <ul class="pagination-list">
    <li>
      <a href="?q=tongariro&page=1" class="pagination-link pagination-prev" aria-label="Go to previous page">
        <span aria-hidden="true">&laquo;</span> Previous
      </a>
    </li>
    <li>
      <a href="?q=tongariro&page=1" class="pagination-link pagination-page">1</a>
    </li>
    <li class="pagination-ellipsis" aria-hidden="true">
      <span>&hellip;</span>
    </li>
    <li>
      <a href="?q=tongariro&page=5" class="pagination-link pagination-page">5</a>
    </li>
    <li>
      <a href="?q=tongariro&page=6" class="pagination-link pagination-page">6</a>
    </li>
    <li>
      <span class="pagination-link pagination-page pagination-current" aria-current="page">7</span>
    </li>
    <li>
      <a href="?q=tongariro&page=8" class="pagination-link pagination-page">8</a>
    </li>
    <li>
      <a href="?q=tongariro&page=9" class="pagination-link pagination-page">9</a>
    </li>
    <li class="pagination-ellipsis" aria-hidden="true">
      <span>&hellip;</span>
    </li>
    <li>
      <a href="?q=tongariro&page=25" class="pagination-link pagination-page">25</a>
    </li>
    <li>
      <a href="?q=tongariro&page=8" class="pagination-link pagination-next" aria-label="Go to next page">
        Next <span aria-hidden="true">&raquo;</span>
      </a>
    </li>
  </ul>
</nav>
```

### CSS Requirements
```css
/* Pagination layout */
.pagination-block { margin: 32px 0; }
.pagination-list {
  display: flex; flex-wrap: wrap; justify-content: center;
  align-items: center; gap: 4px;
  list-style: none; padding: 0; margin: 0;
}

/* Page links */
.pagination-link {
  display: inline-flex; align-items: center; justify-content: center;
  min-width: 40px; height: 40px; padding: 8px 12px;
  border: 1px solid var(--color-border); border-radius: 4px;
  text-decoration: none; color: var(--color-text);
  font-size: 14px; font-weight: 500; transition: all 0.15s;
}
.pagination-link:hover { background: var(--color-primary-light); border-color: var(--color-primary); }
.pagination-link:focus-visible { outline: 2px solid var(--color-focus); outline-offset: 2px; }

/* Current page */
.pagination-current {
  background: var(--color-primary); color: #fff;
  border-color: var(--color-primary); cursor: default;
}
.pagination-current:hover { background: var(--color-primary); }

/* Prev/Next */
.pagination-prev, .pagination-next { font-weight: 600; }
.pagination-prev[aria-disabled="true"],
.pagination-next[aria-disabled="true"] {
  opacity: 0.4; pointer-events: none; cursor: default;
}

/* Ellipsis */
.pagination-ellipsis span { padding: 8px 4px; color: var(--color-text-muted); }

/* Responsive */
@media (max-width: 480px) {
  .pagination-link { min-width: 36px; height: 36px; padding: 6px 8px; font-size: 13px; }
  .pagination-prev, .pagination-next { font-size: 0; }
  .pagination-prev span, .pagination-next span { font-size: 14px; }
}
```

### JS Requirements
- **URL-based mode (default):** Read `page` param from `window.location.search`. Generate pagination links preserving all existing query params. No event handling needed — links trigger full navigation.
- **Event-based mode (for SPA-style blocks):** Accept config from parent block. On page click, dispatch a `doc:page-change` custom event with `{ page: number }`. Parent block handles data fetching and re-rendering.
- **Pagination range algorithm:**
  - Always show first and last page.
  - Show 2 pages on either side of the current page.
  - Insert ellipsis when there are gaps.
  - Example for page 7 of 25: `1 ... 5 6 [7] 8 9 ... 25`.
- Hide the entire block if `totalPages <= 1`.
- Export a `renderPagination(container, { currentPage, totalPages, queryParams })` utility function for use by other blocks.

### Document Authoring (Google Docs)

Pagination is typically **not authored as a standalone block** — it is rendered automatically by parent blocks (Search, Filter) that include paginated results.

If authors need a standalone paginated content block:

| Pagination  |                       |
|-------------|-----------------------|
| page-size   | 10                    |
| param       | page                  |

- **page-size:** Items per page.
- **param:** URL query parameter name for the page number.

## AI Implementation Instructions

### Mandatory Skills
- Adobe Experience Modernization
- EDS Block Development

### Validation Loop
Use Chrome MCP iteratively to verify DOM output against the original site's functional requirements at https://www.doc.govt.nz/ before marking the task complete.

### Reference
- Live URL: https://www.doc.govt.nz/search/ (search results), filtered listing pages
- Vue source: doc-pagination
- CSS classes: doc-pagination, pagination__item, pagination__link, pagination__current
