# Breadcrumb — EDS Block Specification

> **Block ID:** DOCEDS-004  
> **Block Folder:** `blocks/breadcrumb/`  
> **Priority:** High  
> **Complexity:** S  
> **Source Components:** doc-breadcrumb

---

## User Story

**As a** site visitor, **I want to** see a breadcrumb trail showing my current location in the site hierarchy **so that** I can easily navigate back to parent sections and understand the content structure.

## Description

The Breadcrumb component on the DOC NZ website displays a horizontal trail of links representing the visitor's position within the site's information architecture. It appears directly below the global header and above the hero or main content area. Each segment is a clickable link to an ancestor page, with the current page displayed as plain text (not linked) at the end of the trail. Segments are separated by a chevron or right-arrow delimiter.

On the live site, the `doc-breadcrumb` Vue component auto-generates the trail from the URL hierarchy. It includes `schema.org` BreadcrumbList structured data (JSON-LD) for SEO, which helps search engines understand the site structure and display rich breadcrumb snippets in results.

In EDS, the breadcrumb can be auto-generated from the page's URL path segments, mapping each segment to a readable label via the site's content hierarchy. The block decorator in `blocks/breadcrumb/breadcrumb.js` constructs the trail and injects the JSON-LD structured data into the page `<head>`.

## Acceptance Criteria

1. The breadcrumb trail displays `Home > Section > Subsection > Current Page`.
2. All segments except the current page are clickable links.
3. The current page segment is rendered as plain text (no link), using `aria-current="page"`.
4. A `>` or chevron icon separates each breadcrumb segment.
5. The breadcrumb includes `schema.org/BreadcrumbList` JSON-LD structured data in the page head.
6. On mobile (< 768px), the breadcrumb wraps gracefully or truncates to show only the parent and current page.
7. The breadcrumb is wrapped in a `<nav aria-label="Breadcrumb">` element for accessibility.

## Technical Notes for EDS

### DOM Structure

```html
<nav class="breadcrumb doc-main-layout__breadcrumb" aria-label="Breadcrumb">
  <ol class="breadcrumb__list">
    <li class="breadcrumb__item">
      <a href="/">Home</a>
      <span class="breadcrumb__separator" aria-hidden="true">›</span>
    </li>
    <li class="breadcrumb__item">
      <a href="/parks-and-recreation/">Parks &amp; recreation</a>
      <span class="breadcrumb__separator" aria-hidden="true">›</span>
    </li>
    <li class="breadcrumb__item">
      <span aria-current="page">Places to go</span>
    </li>
  </ol>
</nav>

<!-- JSON-LD in <head> -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.doc.govt.nz/" },
    { "@type": "ListItem", "position": 2, "name": "Parks & recreation", "item": "https://www.doc.govt.nz/parks-and-recreation/" },
    { "@type": "ListItem", "position": 3, "name": "Places to go" }
  ]
}
</script>
```

### CSS Requirements

```css
.breadcrumb {
  padding: 12px 24px;
  background-color: var(--color-white, #fff);
  font-size: 0.875rem;
}

.doc-main-layout__breadcrumb {
  max-width: 1200px;
  margin: 0 auto;
}

.breadcrumb__list {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: 4px;
}

.breadcrumb__item a {
  color: var(--link-color, #0053A3);
  text-decoration: none;
}

.breadcrumb__item a:hover {
  text-decoration: underline;
}

.breadcrumb__separator {
  margin: 0 4px;
  color: var(--text-color-muted, #666);
}

.breadcrumb__item [aria-current="page"] {
  color: var(--text-color, #333);
  font-weight: 400;
}

@media (max-width: 768px) {
  .breadcrumb {
    padding: 8px 16px;
    font-size: 0.8125rem;
  }
}
```

### JS Requirements

- `breadcrumb.js` decorator auto-generates breadcrumb segments from `window.location.pathname`.
- Split the path by `/`, convert slug segments to title case (e.g., `parks-and-recreation` → `Parks & recreation`). Optionally look up display names from a metadata sheet.
- Inject the `schema.org/BreadcrumbList` JSON-LD `<script>` tag into the document `<head>`.
- Mark the last item with `aria-current="page"` and render it as a `<span>` instead of an `<a>`.

### Document Authoring (Google Docs)

The breadcrumb is **auto-generated** and does **not** require manual authoring in Google Docs. It derives its content from the page's URL path and the site's content hierarchy.

If manual override is needed, authors can add a breadcrumb table:

| **Breadcrumb**                                          |
|---------------------------------------------------------|
| Home \| Parks & recreation \| Places to go              |

- **Row 1 (header):** The word `Breadcrumb` — identifies the block type.
- **Row 2:** Pipe-separated list of breadcrumb labels. Each label should be a link in the Google Doc (highlight text → Insert Link → paste URL). The last item has no link (current page).

## AI Implementation Instructions

### Mandatory Skills
- Adobe Experience Modernization
- EDS Block Development

### Validation Loop
Use Chrome MCP iteratively to verify DOM output against the original site's functional requirements at https://www.doc.govt.nz/ before marking the task complete. Confirm:
- Breadcrumb trail matches the URL hierarchy.
- All ancestor links are functional.
- JSON-LD structured data is present and valid.
- Current page is not linked and has `aria-current="page"`.

### Reference
- Live URL: https://www.doc.govt.nz/parks-and-recreation/places-to-go/
- Vue source: `doc-breadcrumb`
- CSS classes: `doc-main-layout__breadcrumb`
