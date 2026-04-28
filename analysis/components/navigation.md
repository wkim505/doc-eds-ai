# Global Navigation Header — EDS Block Specification

> **Block ID:** DOCEDS-002  
> **Block Folder:** `blocks/header/`  
> **Priority:** Critical  
> **Complexity:** C  
> **Source Components:** doc-header, doc-header-nav-item, doc-header-nav-item-main-link, doc-header-nav-item-sub-link, doc-header-responsive-icon-link, doc-header-background, doc-main-logo, doc-search

---

## User Story

**As a** site visitor, **I want to** access a clear, consistent global navigation with search **so that** I can quickly find any section of the DOC website regardless of where I currently am.

## Description

The Global Navigation Header is the topmost persistent element across all pages on the DOC NZ website. It features the DOC logo on the left, a horizontal mega-navigation bar with six primary sections (Parks & recreation, Things to do, Conservation, Getting involved, About us, News & visitors), a search icon/bar, and a mobile hamburger menu for smaller viewports.

On the live site, the header is composed of multiple Vue components working together. `doc-header` is the root container; `doc-header-nav-item` renders each primary navigation item which, on hover or click, opens a mega-dropdown panel with `doc-header-nav-item-main-link` and `doc-header-nav-item-sub-link` sub-items organised in columns. `doc-search` provides a slide-down or overlay search bar. `doc-header-responsive-icon-link` handles the mobile hamburger and close icons. The `doc-header-background` component manages the semi-transparent overlay that appears when a mega-menu is open.

In EDS, global navigation is auto-generated from the `nav` sheet in the site's header/footer spreadsheet configuration. The `blocks/header/header.js` decorator reads this structure and builds the mega-nav DOM. Custom JavaScript is required for hover/click expand behaviour, keyboard navigation, search overlay toggling, and responsive hamburger menu management.

## Acceptance Criteria

1. The DOC logo links to the homepage and is visible at all viewports.
2. Six primary navigation items are displayed horizontally on desktop (≥ 1024px).
3. Hovering over a primary nav item opens a mega-dropdown panel with grouped sub-links.
4. A search icon in the header toggles a search overlay/bar on click.
5. On mobile (< 1024px), navigation collapses into a hamburger icon that opens a slide-out or full-screen menu.
6. Keyboard navigation supports Tab, Enter, Escape, and arrow keys for all menu levels (WCAG 2.1 AA).
7. ARIA attributes are applied: `role="navigation"`, `aria-expanded`, `aria-haspopup`, `aria-label`.
8. Active mega-dropdown shows a semi-transparent background overlay behind the panel.
9. Clicking outside the mega-dropdown or pressing Escape closes it.
10. The header remains fixed/sticky at the top of the viewport on scroll.

## Technical Notes for EDS

### DOM Structure

```html
<header class="doc-header">
  <div class="doc-header__inner">
    <!-- Logo -->
    <a href="/" class="doc-header__logo" aria-label="Department of Conservation — Home">
      <img src="/icons/doc-logo.svg" alt="Department of Conservation" width="160" height="48" />
    </a>

    <!-- Desktop Navigation -->
    <nav class="doc-header__nav" aria-label="Main navigation">
      <ul class="doc-header__nav-list" role="menubar">
        <li class="doc-header__nav-item" role="none">
          <a href="/parks-and-recreation/" role="menuitem" aria-haspopup="true" aria-expanded="false">
            Parks &amp; recreation
          </a>
          <!-- Mega-dropdown panel -->
          <div class="doc-header__mega-panel" role="menu" aria-hidden="true">
            <div class="doc-header__mega-column">
              <a href="/parks-and-recreation/places-to-go/" class="doc-header__mega-main-link" role="menuitem">Places to go</a>
              <ul>
                <li><a href="/parks-and-recreation/places-to-go/national-parks/" class="doc-header__mega-sub-link" role="menuitem">National parks</a></li>
                <li><a href="/parks-and-recreation/places-to-go/beaches/" class="doc-header__mega-sub-link" role="menuitem">Beaches</a></li>
              </ul>
            </div>
            <!-- Additional columns -->
          </div>
        </li>
        <!-- Additional nav items -->
      </ul>
    </nav>

    <!-- Search -->
    <div class="doc-search">
      <button class="doc-search-button" aria-label="Search" aria-expanded="false">
        <span class="icon icon-search"></span>
      </button>
      <div class="doc-search__overlay" aria-hidden="true">
        <form action="/search/" method="get" role="search">
          <label for="search-input" class="sr-only">Search DOC website</label>
          <input type="search" id="search-input" name="q" placeholder="Search doc.govt.nz" autocomplete="off" />
          <button type="submit">Search</button>
        </form>
      </div>
    </div>

    <!-- Mobile hamburger -->
    <button class="doc-header__hamburger" aria-label="Open menu" aria-expanded="false">
      <span class="icon icon-menu"></span>
    </button>
  </div>

  <!-- Background overlay for mega-nav -->
  <div class="doc-header__background-overlay" aria-hidden="true"></div>
</header>
```

### CSS Requirements

```css
.doc-header {
  position: sticky;
  top: 0;
  z-index: 1000;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.doc-header__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 16px;
  height: 72px;
}

.doc-header__nav-list {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: 0;
}

.doc-header__nav-item > a {
  display: block;
  padding: 24px 16px;
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--text-color, #333);
  text-decoration: none;
  border-bottom: 3px solid transparent;
  transition: border-color 0.2s;
}

.doc-header__nav-item > a:hover,
.doc-header__nav-item > a[aria-expanded="true"] {
  border-bottom-color: var(--doc-green-100, #47665E);
}

.doc-header__mega-panel {
  display: none;
  position: absolute;
  left: 0;
  right: 0;
  top: 72px;
  background: #fff;
  padding: 32px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 999;
}

.doc-header__mega-panel[aria-hidden="false"] {
  display: flex;
  gap: 48px;
}

.doc-header__background-overlay {
  display: none;
  position: fixed;
  inset: 0;
  top: 72px;
  background: rgba(0, 0, 0, 0.4);
  z-index: 998;
}

.doc-header__background-overlay[aria-hidden="false"] {
  display: block;
}

/* Search */
.doc-search__overlay {
  display: none;
  position: absolute;
  top: 72px;
  left: 0;
  right: 0;
  background: var(--doc-green-100, #47665E);
  padding: 24px;
  z-index: 1001;
}

.doc-search__overlay[aria-hidden="false"] {
  display: block;
}

/* Mobile hamburger */
.doc-header__hamburger {
  display: none;
}

@media (max-width: 1023px) {
  .doc-header__nav {
    display: none;
  }

  .doc-header__hamburger {
    display: flex;
    align-items: center;
    justify-content: center;
    background: none;
    border: none;
    cursor: pointer;
    padding: 8px;
  }

  .doc-header__nav[aria-hidden="false"] {
    display: block;
    position: fixed;
    inset: 0;
    top: 72px;
    background: #fff;
    overflow-y: auto;
    z-index: 999;
  }

  .doc-header__nav-list {
    flex-direction: column;
  }
}
```

### JS Requirements

- **Mega-nav toggle:** On desktop, hovering over a primary nav item opens the corresponding mega-panel and shows the background overlay. Clicking also toggles. On mouse-leave of the header area, close the panel after a short delay (~200ms).
- **Keyboard navigation:** Support `Tab` to move between primary items, `Enter`/`Space` to open mega-panel, `Escape` to close, arrow keys within the mega-panel to navigate sub-links.
- **Search toggle:** Click on `.doc-search-button` toggles `aria-hidden` and `aria-expanded` on the search overlay. Focus the input field when opened.
- **Mobile hamburger:** Click toggles the nav visibility. Trap focus within the mobile nav when open. Close on Escape.
- **ARIA state management:** Toggle `aria-expanded`, `aria-hidden`, and `aria-haspopup` attributes on open/close events.
- **Overlay dismiss:** Clicking `.doc-header__background-overlay` closes any open mega-panel.
- **Scroll lock:** When mobile nav is open, apply `overflow: hidden` to `<body>` to prevent background scroll.

### Document Authoring (Google Docs)

The global navigation is **not authored in page-level Google Docs**. Instead, it is configured via the **header/footer spreadsheet** linked in `fstab.yaml`:

| Sheet Tab: `nav`        |                                         |
|-------------------------|-----------------------------------------|
| **Primary Link**        | **Mega-panel Sub-links**                |
| Parks & recreation      | Places to go, Things to do, Plan & prepare |
| Things to do            | Walking & tramping, Cycling, Camping    |
| Conservation            | Threats & impacts, Our role, Projects   |
| Getting involved        | Volunteer, Donate, Jobs                 |
| About us                | Our organisation, Legislation, Contact  |
| News & visitors         | News, Alerts, Media releases            |

Each primary link row maps to a top-level nav item. Sub-links in subsequent columns generate mega-panel content. URLs are derived from the link hrefs in the spreadsheet cells.

## AI Implementation Instructions

### Mandatory Skills
- Adobe Experience Modernization
- EDS Block Development

### Validation Loop
Use Chrome MCP iteratively to verify DOM output against the original site's functional requirements at https://www.doc.govt.nz/ before marking the task complete. Confirm:
- Mega-nav opens on hover with correct sub-link structure.
- Search overlay toggles and is functional.
- Mobile hamburger menu opens/closes with correct focus management.
- All ARIA attributes are present and toggled correctly.
- Sticky header remains visible on scroll.

### Reference
- Live URL: https://www.doc.govt.nz/ (header)
- Vue source: `doc-header`, `doc-header-nav-item`, `doc-header-nav-item-main-link`, `doc-header-nav-item-sub-link`, `doc-header-responsive-icon-link`, `doc-header-background`, `doc-main-logo`, `doc-search`
- CSS classes: `doc-header`, `doc-search`, `doc-search-button`
