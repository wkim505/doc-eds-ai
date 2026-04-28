# Site Search — EDS Block Specification

> **Block ID:** DOCEDS-023  
> **Block Folder:** `blocks/search/`  
> **Priority:** High  
> **Complexity:** C  
> **Source Components:** doc-site-search, doc-cms-search, abn-cms-search

---

## User Story

**As a** site visitor, **I want to** search across the entire DOC website and see relevant results **so that** I can quickly find tracks, huts, parks, and content related to my query.

## Description

The Site Search block provides a full-text search experience for the DOC NZ website. It includes a prominent search input field, real-time or submit-based querying, and a results page displaying matching content as cards with titles, descriptions, URLs, and highlighted search terms. The search is a core navigation pattern — accessible from the global header via a search icon and also rendered as a dedicated search results page.

On the Vue site, `doc-site-search` handles the search input in the header, while `doc-cms-search` and `abn-cms-search` power the results page with pagination, result counts, and term highlighting. The search integrates with the DOC search API (or potentially Algolia) to return ranked results. Results are displayed as cards with the matched terms bolded in excerpts.

In EDS, the search block will be implemented in two parts: (1) a header search input component integrated into the global header/nav block, and (2) a full search results block for the `/search/` page. The results block handles query parameter parsing, API calls, result rendering with highlighted terms, and pagination. The search API endpoint must be configurable to support both development and production environments.

## Acceptance Criteria

1. Search input accepts text and submits on Enter or button click.
2. Navigating to `/search/?q={term}` renders results for that term.
3. Results display: page title (linked), URL breadcrumb, description excerpt with highlighted terms.
4. Result count is shown: "Showing X–Y of Z results for '{term}'".
5. Pagination renders below results with prev/next and page numbers.
6. Empty query shows an instructional message, not an error.
7. No results found shows a friendly message with suggestions.
8. Search input in header triggers navigation to `/search/?q={term}`.
9. Search is accessible: input has `role="search"`, results are in a `<main>` landmark, pagination has `aria-label`.
10. Loading state shows a spinner or skeleton while API call is in progress.
11. Mobile layout stacks results in a single column with appropriate touch targets.

## Technical Notes for EDS

### DOM Structure
```html
<!-- Search Results Page Block -->
<div class="search-results-block">
  <form class="search-form" role="search" action="/search/">
    <label for="search-input" class="sr-only">Search DOC website</label>
    <input type="search" id="search-input" name="q" class="search-input"
           placeholder="Search tracks, huts, parks..." autocomplete="off" />
    <button type="submit" class="search-submit" aria-label="Search">
      <span class="icon icon-search"></span>
    </button>
  </form>

  <div class="search-meta">
    <p class="search-result-count">Showing 1–10 of 243 results for "<strong>Tongariro</strong>"</p>
  </div>

  <ul class="search-results" role="list">
    <li class="search-result-item">
      <h3 class="search-result-title">
        <a href="/parks-and-recreation/places-to-go/tongariro/">
          <mark>Tongariro</mark> Alpine Crossing
        </a>
      </h3>
      <cite class="search-result-url">doc.govt.nz › parks-and-recreation › places-to-go › tongariro</cite>
      <p class="search-result-excerpt">
        The <mark>Tongariro</mark> Alpine Crossing is one of New Zealand's most popular day hikes...
      </p>
    </li>
    <!-- More result items -->
  </ul>

  <nav class="pagination" aria-label="Search results pages">
    <a href="?q=Tongariro&page=1" class="pagination-prev" aria-label="Previous page">&laquo; Previous</a>
    <a href="?q=Tongariro&page=1" class="pagination-page" aria-current="page">1</a>
    <a href="?q=Tongariro&page=2" class="pagination-page">2</a>
    <a href="?q=Tongariro&page=3" class="pagination-page">3</a>
    <span class="pagination-ellipsis">&hellip;</span>
    <a href="?q=Tongariro&page=25" class="pagination-page">25</a>
    <a href="?q=Tongariro&page=2" class="pagination-next" aria-label="Next page">Next &raquo;</a>
  </nav>
</div>
```

### CSS Requirements
```css
/* Search form */
.search-form { display: flex; gap: 8px; margin-bottom: 24px; max-width: 640px; }
.search-input {
  flex: 1; padding: 12px 16px; font-size: 16px;
  border: 2px solid var(--color-border); border-radius: 4px;
}
.search-input:focus { border-color: var(--color-primary); outline: none; box-shadow: 0 0 0 3px rgba(0,100,0,0.2); }
.search-submit {
  padding: 12px 20px; background: var(--color-primary); color: #fff;
  border: none; border-radius: 4px; cursor: pointer;
}

/* Results */
.search-results { list-style: none; padding: 0; }
.search-result-item { margin-bottom: 24px; padding-bottom: 24px; border-bottom: 1px solid var(--color-border-light); }
.search-result-title a { color: var(--color-link); font-size: 1.25rem; text-decoration: none; }
.search-result-title a:hover { text-decoration: underline; }
.search-result-url { display: block; color: var(--color-text-muted); font-size: 0.85rem; font-style: normal; margin: 4px 0; }
.search-result-excerpt { color: var(--color-text); line-height: 1.5; }
.search-result-excerpt mark, .search-result-title mark {
  background: #fff3cd; padding: 0 2px; border-radius: 2px;
}

/* Loading */
.search-loading { text-align: center; padding: 48px 0; }

/* Responsive */
@media (max-width: 768px) {
  .search-form { flex-direction: column; }
  .search-submit { width: 100%; }
}
```

### JS Requirements
- On page load, read `q` and `page` from URL query parameters.
- If `q` is present, call search API: `GET /api/search?q={term}&page={page}&pageSize=10`.
- Render results with `<mark>` tags around matching terms in title and excerpt.
- Update pagination links with current query parameter preserved.
- Handle loading state (show spinner), error state (show retry message), and empty state.
- On form submit, navigate to `/search/?q={encodeURIComponent(term)}`.
- Debounce is not needed for submit-based search (no typeahead in v1).
- API endpoint should be configurable via `window.searchConfig` or a metadata element.

### Document Authoring (Google Docs)

Authors create a **Search** block on the search results page:

| Search     |                          |
|------------|--------------------------|
| endpoint   | /api/search              |
| page-size  | 10                       |
| placeholder| Search tracks, huts, parks... |

- **Row 1:** Block name "Search".
- **endpoint:** API URL for search queries.
- **page-size:** Number of results per page.
- **placeholder:** Placeholder text for the input field.
- The search block in the **header** is configured separately via the header/nav block's metadata.

## AI Implementation Instructions

### Mandatory Skills
- Adobe Experience Modernization
- EDS Block Development

### Validation Loop
Use Chrome MCP iteratively to verify DOM output against the original site's functional requirements at https://www.doc.govt.nz/ before marking the task complete.

### Reference
- Live URL: https://www.doc.govt.nz/search/
- Vue source: doc-site-search, doc-cms-search, abn-cms-search
- CSS classes: doc-search, search__input, search__results, search__result-item, search__pagination
