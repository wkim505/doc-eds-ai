# Widget Container — EDS Block Specification

> **Block ID:** DOCEDS-038  
> **Block Folder:** `blocks/widget/`  
> **Priority:** Medium  
> **Complexity:** M  
> **Source Components:** doc-widget-heading

---

## User Story

**As a** site visitor on the homepage, **I want to** see curated content widgets for blog posts, featured places, and media releases **so that** I can discover fresh and relevant DOC content at a glance.

## Description

The Widget Container block renders a titled content widget used on the DOC NZ homepage. Each widget consists of a heading row with a title and "View all" link, followed by a content area displaying 2–4 cards (blog posts, featured places, or media releases). The homepage features three main widgets arranged in a grid layout, creating a magazine-style content discovery experience.

On the Vue site, `doc-widget-heading` provides the title bar component with the widget title and "View all" link. The widget content area is populated by various child components depending on the widget type — typically card components displaying the latest content from each category. The widgets use CSS classes including `widget`, `widget__title`, and `widget__content`.

In EDS, each widget is a block that renders the heading and fetches its card content from a JSON feed or fragment. The block supports both API-driven content (fetching latest posts from an endpoint) and statically authored content. Three widgets can be placed in a columns layout on the homepage using EDS Columns block or Section Metadata.

## Acceptance Criteria

1. Widget renders a title heading and a "View all" link in a header row.
2. Content area displays 2–4 cards with thumbnail, title, date, and excerpt.
3. Cards link to the full content page.
4. Widget supports both API-driven (fetch from feed URL) and manually authored content.
5. "View all" link navigates to the full listing page for that content type.
6. Three widgets fit in a grid row on desktop (3 columns).
7. On tablet, widgets stack to 2 columns; on mobile, single column.
8. Loading state shows skeleton cards while API content loads.
9. If the API call fails, show the most recently cached content or a "Content unavailable" message.
10. Block is accessible: heading hierarchy is correct (h2 for widget title), cards are in a list.

## Technical Notes for EDS

### DOM Structure
```html
<div class="widget-block">
  <div class="widget-header">
    <h2 class="widget-title">Latest blog posts</h2>
    <a href="/news/doc-blog/" class="widget-view-all">
      View all <span class="icon icon-arrow-right" aria-hidden="true"></span>
    </a>
  </div>
  <ul class="widget-content" role="list">
    <li class="widget-card">
      <a href="/news/doc-blog/post-1/">
        <img src="/media/blog-thumb-1.jpg" alt="" loading="lazy" class="widget-card-image" />
        <div class="widget-card-body">
          <time class="widget-card-date" datetime="2024-01-15">15 January 2024</time>
          <h3 class="widget-card-title">Summer conservation volunteering</h3>
          <p class="widget-card-excerpt">Join hundreds of volunteers this summer to help restore native habitats...</p>
        </div>
      </a>
    </li>
    <li class="widget-card">
      <a href="/news/doc-blog/post-2/">
        <img src="/media/blog-thumb-2.jpg" alt="" loading="lazy" class="widget-card-image" />
        <div class="widget-card-body">
          <time class="widget-card-date" datetime="2024-01-10">10 January 2024</time>
          <h3 class="widget-card-title">New Great Walk announced</h3>
          <p class="widget-card-excerpt">DOC has announced a new addition to the Great Walks network...</p>
        </div>
      </a>
    </li>
    <li class="widget-card">
      <a href="/news/doc-blog/post-3/">
        <img src="/media/blog-thumb-3.jpg" alt="" loading="lazy" class="widget-card-image" />
        <div class="widget-card-body">
          <time class="widget-card-date" datetime="2024-01-05">5 January 2024</time>
          <h3 class="widget-card-title">Kiwi population milestone</h3>
          <p class="widget-card-excerpt">A record number of kiwi chicks have hatched this season...</p>
        </div>
      </a>
    </li>
  </ul>
</div>
```

### CSS Requirements
```css
/* Widget block */
.widget-block { margin-bottom: 32px; }

/* Header row */
.widget-header {
  display: flex; align-items: baseline;
  justify-content: space-between;
  margin-bottom: 16px; padding-bottom: 8px;
  border-bottom: 2px solid var(--color-primary);
}
.widget-title { font-size: 1.25rem; margin: 0; color: var(--color-text); }
.widget-view-all {
  display: inline-flex; align-items: center; gap: 4px;
  color: var(--color-primary); text-decoration: none;
  font-size: 0.9rem; font-weight: 600; white-space: nowrap;
}
.widget-view-all:hover { text-decoration: underline; }

/* Content cards */
.widget-content { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 16px; }
.widget-card a {
  display: flex; gap: 12px; text-decoration: none; color: inherit;
  padding: 8px; border-radius: 4px; transition: background 0.15s;
}
.widget-card a:hover { background: var(--color-bg-hover, #f5f5f5); }
.widget-card-image {
  width: 100px; height: 75px; object-fit: cover; border-radius: 4px; flex-shrink: 0;
}
.widget-card-body { flex: 1; min-width: 0; }
.widget-card-date { display: block; font-size: 0.75rem; color: var(--color-text-muted); margin-bottom: 2px; }
.widget-card-title {
  margin: 0 0 4px; font-size: 0.95rem; font-weight: 600; line-height: 1.3;
  display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
}
.widget-card-excerpt {
  margin: 0; font-size: 0.8rem; color: var(--color-text-muted); line-height: 1.4;
  display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
}

/* Skeleton loading */
.widget-card.is-loading a { pointer-events: none; }
.widget-card.is-loading .widget-card-image,
.widget-card.is-loading .widget-card-title,
.widget-card.is-loading .widget-card-excerpt {
  background: linear-gradient(90deg, #eee 25%, #ddd 50%, #eee 75%);
  background-size: 200% 100%;
  animation: skeleton-shimmer 1.5s infinite;
  border-radius: 4px; color: transparent;
}
@keyframes skeleton-shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }

/* Homepage grid (applied at the page level, not within widget) */
/* Use EDS Columns block or Section Metadata for 3-column layout */

/* Responsive */
@media (max-width: 768px) {
  .widget-card-image { width: 80px; height: 60px; }
}
```

### JS Requirements
- If `data-feed` attribute is present on the block, fetch content from the JSON feed URL.
- Feed format: array of `{ title, url, image, date, excerpt }` objects.
- Render up to `data-count` cards (default: 3).
- Show skeleton loading state while fetching.
- On fetch error, attempt to show cached content from `sessionStorage` (`widget-cache-{feedUrl}`).
- If no cache available, show "Content temporarily unavailable".
- On successful fetch, cache the response in `sessionStorage` for the session.
- If no `data-feed` is present, the block renders from statically authored HTML (no JS needed).
- Format dates using `Intl.DateTimeFormat('en-NZ', { day: 'numeric', month: 'long', year: 'numeric' })`.

### Document Authoring (Google Docs)

Authors create a **Widget** table in Google Docs:

**API-driven widget:**

| Widget          |                          |
|-----------------|--------------------------|
| title           | Latest blog posts        |
| feed            | /api/blog-feed.json      |
| view-all        | /news/doc-blog/          |
| count           | 3                        |

**Manually authored widget:**

| Widget          |                                           |
|-----------------|-------------------------------------------|
| title           | Featured places                           |
| view-all        | /parks-and-recreation/places-to-go/       |
| image1.jpg      | Place Title One                           |
|                 | Brief description of the first place.     |
|                 | /parks-and-recreation/places-to-go/one/   |
| image2.jpg      | Place Title Two                           |
|                 | Brief description of the second place.    |
|                 | /parks-and-recreation/places-to-go/two/   |

- **Row 1:** Block name "Widget".
- **title:** Widget heading text.
- **feed:** Optional JSON feed URL for API-driven content.
- **view-all:** URL for the "View all" link.
- **count:** Number of items to show (API-driven mode).
- **Manual entries:** Image in column 1, title in column 2 on first row, description and link on subsequent rows.

For the homepage, three Widget blocks are placed inside an EDS Columns block to achieve the 3-column layout.

## AI Implementation Instructions

### Mandatory Skills
- Adobe Experience Modernization
- EDS Block Development

### Validation Loop
Use Chrome MCP iteratively to verify DOM output against the original site's functional requirements at https://www.doc.govt.nz/ before marking the task complete.

### Reference
- Live URL: https://www.doc.govt.nz/ (homepage — Blog, Featured, Media releases widgets)
- Vue source: doc-widget-heading
- CSS classes: widget, widget__title, widget__content, widget__view-all
