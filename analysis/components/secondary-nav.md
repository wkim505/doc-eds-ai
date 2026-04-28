# Secondary Navigation — EDS Block Specification

> **Block ID:** DOCEDS-032  
> **Block Folder:** `blocks/secondary-nav/`  
> **Priority:** Medium  
> **Complexity:** S  
> **Source Components:** doc-secondary-navigation-links-block, doc-popular-links

---

## User Story

**As a** site visitor on a section landing page, **I want to** see a secondary navigation of key sub-pages and popular links **so that** I can quickly navigate to the most relevant content within this section.

## Description

The Secondary Navigation block renders an in-page list of links to key sub-pages within the current section. On the DOC NZ site, it appears on section landing pages (e.g., "Parks and Recreation") as a horizontal or vertical list of prominent links, often styled differently from body text links to draw attention. The `doc-popular-links` variant highlights the most-visited pages within a section.

On the Vue site, `doc-secondary-navigation-links-block` renders a structured link list, typically in a grid or flex layout. `doc-popular-links` renders a "Popular" section with styled link items. Both serve the same navigation purpose — helping visitors drill into the section hierarchy without relying on the main menu.

In EDS, this is a simple block that renders a heading and a list of styled links. It can be configured to display horizontally (as a row of link cards) or vertically (as a stacked list). The block is entirely content-authored — no API integration needed.

## Acceptance Criteria

1. Block renders a heading and a list of navigation links.
2. Links can be displayed horizontally (row) or vertically (stacked list).
3. Each link shows the page title and optionally a short description or icon.
4. The current page's link (if present) is visually highlighted with `aria-current="page"`.
5. Links are styled as interactive elements with hover/focus states.
6. On mobile, horizontal layout wraps or stacks to single column.
7. Block is in a `<nav>` element with an appropriate `aria-label`.

## Technical Notes for EDS

### DOM Structure
```html
<!-- Horizontal variant -->
<nav class="secondary-nav-block" aria-label="Section navigation">
  <h2 class="secondary-nav-title">Explore this section</h2>
  <ul class="secondary-nav-list secondary-nav-horizontal" role="list">
    <li>
      <a href="/parks-and-recreation/things-to-do/" class="secondary-nav-link">
        <span class="secondary-nav-link-text">Things to do</span>
      </a>
    </li>
    <li>
      <a href="/parks-and-recreation/places-to-go/" class="secondary-nav-link">
        <span class="secondary-nav-link-text">Places to go</span>
      </a>
    </li>
    <li>
      <a href="/parks-and-recreation/plan-and-prepare/" class="secondary-nav-link" aria-current="page">
        <span class="secondary-nav-link-text">Plan and prepare</span>
      </a>
    </li>
    <li>
      <a href="/parks-and-recreation/know-before-you-go/" class="secondary-nav-link">
        <span class="secondary-nav-link-text">Know before you go</span>
      </a>
    </li>
  </ul>
</nav>

<!-- Vertical variant -->
<nav class="secondary-nav-block" aria-label="Popular pages">
  <h2 class="secondary-nav-title">Popular</h2>
  <ul class="secondary-nav-list secondary-nav-vertical" role="list">
    <li>
      <a href="/parks-and-recreation/things-to-do/walking-and-tramping/" class="secondary-nav-link">
        Walking and tramping
      </a>
    </li>
    <li>
      <a href="/parks-and-recreation/things-to-do/camping/" class="secondary-nav-link">
        Camping
      </a>
    </li>
  </ul>
</nav>
```

### CSS Requirements
```css
/* Block */
.secondary-nav-block { margin: 24px 0; }
.secondary-nav-title { font-size: 1.1rem; margin-bottom: 12px; color: var(--color-text-muted); }
.secondary-nav-list { list-style: none; padding: 0; margin: 0; }

/* Horizontal variant */
.secondary-nav-horizontal { display: flex; flex-wrap: wrap; gap: 12px; }
.secondary-nav-horizontal .secondary-nav-link {
  display: block; padding: 12px 20px;
  border: 1px solid var(--color-border); border-radius: 4px;
  text-decoration: none; color: var(--color-text);
  font-weight: 600; transition: all 0.15s;
}
.secondary-nav-horizontal .secondary-nav-link:hover {
  background: var(--color-primary-light); border-color: var(--color-primary);
  color: var(--color-primary-dark);
}
.secondary-nav-horizontal .secondary-nav-link[aria-current="page"] {
  background: var(--color-primary); color: #fff; border-color: var(--color-primary);
}

/* Vertical variant */
.secondary-nav-vertical li { border-bottom: 1px solid var(--color-border-light); }
.secondary-nav-vertical li:last-child { border-bottom: none; }
.secondary-nav-vertical .secondary-nav-link {
  display: block; padding: 10px 0;
  text-decoration: none; color: var(--color-link); font-weight: 500;
}
.secondary-nav-vertical .secondary-nav-link:hover { color: var(--color-primary-dark); }

/* Responsive */
@media (max-width: 768px) {
  .secondary-nav-horizontal { flex-direction: column; }
  .secondary-nav-horizontal .secondary-nav-link { text-align: center; }
}
```

### JS Requirements
- Minimal JS required. On block load, check if any link's `href` matches `window.location.pathname` and add `aria-current="page"`.
- No API calls needed — all links are content-authored.

### Document Authoring (Google Docs)

Authors create a **Secondary Nav** table in Google Docs:

| Secondary Nav  |                                            |
|----------------|--------------------------------------------|
| title          | Explore this section                       |
| style          | horizontal                                 |
| Things to do   | /parks-and-recreation/things-to-do/        |
| Places to go   | /parks-and-recreation/places-to-go/        |
| Plan and prepare | /parks-and-recreation/plan-and-prepare/  |
| Know before you go | /parks-and-recreation/know-before-you-go/ |

- **Row 1:** Block name "Secondary Nav".
- **title:** Heading text.
- **style:** `horizontal` or `vertical` layout.
- **Subsequent rows:** Column 1 = link text, Column 2 = link URL.

## AI Implementation Instructions

### Mandatory Skills
- Adobe Experience Modernization
- EDS Block Development

### Validation Loop
Use Chrome MCP iteratively to verify DOM output against the original site's functional requirements at https://www.doc.govt.nz/ before marking the task complete.

### Reference
- Live URL: Section landing pages (e.g., https://www.doc.govt.nz/parks-and-recreation/)
- Vue source: doc-secondary-navigation-links-block, doc-popular-links
- CSS classes: secondary-navigation-links, popular-links
