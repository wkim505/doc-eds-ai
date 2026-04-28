# Related Content — EDS Block Specification

> **Block ID:** DOCEDS-031  
> **Block Folder:** `blocks/related-content/`  
> **Priority:** Medium  
> **Complexity:** S  
> **Source Components:** doc-related-section, doc-related-searches

---

## User Story

**As a** site visitor reading a content page, **I want to** see links to related pages and topics **so that** I can continue exploring relevant content without searching again.

## Description

The Related Content block renders a curated or auto-generated list of related page links below the main content area. It serves as a cross-linking mechanism to help visitors discover other relevant content — such as related tracks when viewing a specific track page, or related conservation topics when reading an article.

On the Vue site, `doc-related-section` renders a titled section with a list of links to related pages, and `doc-related-searches` provides related search term links (e.g., "People also searched for: tramping in Wellington, best day hikes NZ"). These appear in the `.doc-main-layout__related` area of the page layout, typically between the main content and the footer.

In EDS, this is a straightforward block that renders a heading and a list of links. Content authors curate the related links manually in Google Docs, or the block can optionally fetch related content from an API based on the current page's metadata/tags. The block should support two display variants: a simple link list and a card-style display with thumbnails.

## Acceptance Criteria

1. Block renders a heading (e.g., "Related" or "You might also like") and a list of links.
2. Each link shows the page title and optionally a brief description or thumbnail.
3. Links are rendered as a simple vertical list or a horizontal card row (configurable).
4. Block supports both manually authored links and API-driven related content.
5. If no related content is available, the block renders nothing.
6. Links within the same site use relative paths; external links are marked with an external icon.
7. On mobile, horizontal card layout collapses to a single-column stack.
8. Block is accessible: links are in a `<nav>` or `<aside>` landmark with `aria-label`.

## Technical Notes for EDS

### DOM Structure
```html
<!-- Simple link list variant -->
<aside class="related-content-block" aria-label="Related content">
  <h2 class="related-content-title">Related</h2>
  <ul class="related-content-list" role="list">
    <li><a href="/parks-and-recreation/places-to-go/tongariro/">Tongariro National Park</a></li>
    <li><a href="/parks-and-recreation/things-to-do/walking-and-tramping/">Walking and tramping</a></li>
    <li><a href="/nature/native-animals/birds/">Native birds</a></li>
  </ul>
</aside>

<!-- Card variant with thumbnails -->
<aside class="related-content-block related-content-cards" aria-label="Related content">
  <h2 class="related-content-title">You might also like</h2>
  <ul class="related-content-list" role="list">
    <li class="related-content-card">
      <a href="/parks-and-recreation/places-to-go/tongariro/">
        <img src="/media/tongariro-thumb.jpg" alt="" loading="lazy" />
        <span class="related-content-card-title">Tongariro National Park</span>
      </a>
    </li>
    <li class="related-content-card">
      <a href="/parks-and-recreation/things-to-do/walking-and-tramping/">
        <img src="/media/walking-thumb.jpg" alt="" loading="lazy" />
        <span class="related-content-card-title">Walking and tramping</span>
      </a>
    </li>
  </ul>
</aside>
```

### CSS Requirements
```css
/* Block */
.related-content-block {
  margin: 48px 0 24px; padding-top: 24px;
  border-top: 1px solid var(--color-border-light);
}
.related-content-title { font-size: 1.25rem; margin-bottom: 16px; }

/* Simple list */
.related-content-list { list-style: none; padding: 0; }
.related-content-list li { margin-bottom: 8px; }
.related-content-list a {
  color: var(--color-link); text-decoration: none;
  padding: 4px 0; display: inline-block;
}
.related-content-list a:hover { text-decoration: underline; }

/* Card variant */
.related-content-cards .related-content-list {
  display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 16px;
}
.related-content-card a {
  display: block; text-decoration: none; color: inherit;
  border-radius: 8px; overflow: hidden;
  border: 1px solid var(--color-border-light);
  transition: box-shadow 0.2s;
}
.related-content-card a:hover { box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
.related-content-card img { width: 100%; aspect-ratio: 16/9; object-fit: cover; }
.related-content-card-title {
  display: block; padding: 10px 12px; font-weight: 600; font-size: 0.9rem;
}

/* Responsive */
@media (max-width: 768px) {
  .related-content-cards .related-content-list { grid-template-columns: 1fr 1fr; }
}
@media (max-width: 480px) {
  .related-content-cards .related-content-list { grid-template-columns: 1fr; }
}
```

### JS Requirements
- Minimal JavaScript needed for the authored variant — pure HTML/CSS.
- If using API-driven related content: fetch from endpoint based on page metadata (tags, category), render results.
- Optional: if a `data-endpoint` attribute is present, fetch related items from the API on block load.

### Document Authoring (Google Docs)

Authors create a **Related Content** table in Google Docs:

| Related Content |                                                         |
|-----------------|---------------------------------------------------------|
| title           | Related                                                 |
| style           | list                                                    |
| Tongariro National Park | /parks-and-recreation/places-to-go/tongariro/ |
| Walking and tramping | /parks-and-recreation/things-to-do/walking-and-tramping/ |
| Native birds    | /nature/native-animals/birds/                           |

- **Row 1:** Block name "Related Content".
- **title:** Heading text for the section.
- **style:** `list` for simple links, `cards` for thumbnail cards.
- **Subsequent rows:** Column 1 = link text, Column 2 = link URL.
- For the card variant, link thumbnails are automatically fetched from the linked page's metadata.

## AI Implementation Instructions

### Mandatory Skills
- Adobe Experience Modernization
- EDS Block Development

### Validation Loop
Use Chrome MCP iteratively to verify DOM output against the original site's functional requirements at https://www.doc.govt.nz/ before marking the task complete.

### Reference
- Live URL: Content detail pages across the site
- Vue source: doc-related-section, doc-related-searches
- CSS classes: doc-main-layout__related, related-section, related-searches
