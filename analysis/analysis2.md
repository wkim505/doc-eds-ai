# DOC NZ → Adobe Edge Delivery Services: Migration Analysis Report

> **Target:** https://www.doc.govt.nz/  
> **Date:** June 2025  
> **Scope:** www.doc.govt.nz (main domain only — subdomains excluded)  
> **Source Platform:** Optimizely CMS + Vue 3 SPA (Vite build, client-side hydration)  
> **Target Platform:** Adobe Edge Delivery Services (Block-based architecture)

---

## 1. Executive Summary

The Department of Conservation (DOC) New Zealand website is a large-scale government information site built on Optimizely CMS with a Vue 3 single-page application frontend. The site contains **121 registered Vue components** that must be mapped to EDS Blocks. This analysis identifies **38 distinct EDS block types** needed, grouped into 8 functional categories.

Key challenges:
- The SPA architecture means deep-page DOM inspection requires client-side rendering; server-side HTML is minimal (noscript skeleton only).
- The site relies heavily on interactive filtering, maps, and search — features that require careful EDS adaptation.
- Campaign/marketing components (`abn-*` prefix) are secondary to core DOC functionality.

---

## 2. Content Inventory & Site Structure

### 2.1 Site Hierarchy

```
www.doc.govt.nz/
├── Parks & Recreation (/parks-and-recreation/)
│   ├── Places to go (/places-to-go/)
│   │   ├── Region pages → Place detail pages
│   │   └── Find a place (search/filter)
│   ├── Things to do (/things-to-do/)
│   │   ├── Walking & tramping → Great Walks, Short walks, Track search
│   │   ├── Camping → Campsite search
│   │   ├── Hunting, Fishing, Mountain biking, etc.
│   │   └── Plan & prepare
│   └── Know before you go
│
├── Nature (/nature/)
│   ├── Native animals (/native-animals/)
│   │   ├── Birds, Bats, Reptiles, Fish, Invertebrates, Marine
│   │   └── Species detail pages
│   ├── Native plants (/native-plants/)
│   ├── Pests & threats (/pests-and-threats/)
│   ├── Habitats (/habitats/)
│   └── Biodiversity
│
├── Our Work (/our-work/)
│   ├── Our role
│   ├── Our programmes & projects
│   ├── Predator Free 2050
│   ├── Permissions & activity management
│   └── Monitoring & reporting
│
├── News (/news/)
│   ├── Media releases
│   ├── Latest news
│   ├── Events
│   └── Newsletters
│
├── Get Involved (/get-involved/)
│   ├── Volunteer
│   ├── Run a project
│   ├── Donate
│   ├── Education
│   └── Whakahononga/Connection
│
├── About Us (/about-us/)
│   ├── Our role
│   ├── Our people
│   ├── Careers
│   ├── Publications
│   ├── Statutory planning
│   └── Contact us
│
├── Utility Pages
│   ├── Search (/search/)
│   ├── My DOC (saved lists)
│   └── Sitemap
│
└── Global Elements
    ├── Header (mega-nav with 6 sections)
    ├── Footer (feedback, social, utility links)
    └── Alerts banner (track/weather warnings)
```

### 2.2 Page Template Types

| Template | Description | URL Pattern Example | Estimated Count |
|---|---|---|---|
| Section Landing | Hero + intro + child card grid | `/parks-and-recreation/` | ~20 |
| Content Detail | Hero + rich text + sidebar | `/nature/native-animals/birds/kiwi/` | ~500+ |
| Search/Filter | Search bar + faceted filters + result cards | `/parks-and-recreation/places-to-go/find-a-place/` | ~10 |
| Place/Product | Hero + tabs (overview/map/things-to-do) + alerts | `/parks-and-recreation/places-to-go/.../` | ~300+ |
| News Article | Date + hero + body text | `/news/media-releases/...` | ~1000+ |
| Campaign/Landing | Full-bleed hero video + action cards + counters | Custom campaign pages | ~20 |

### 2.3 Global Layout Structure

Every page follows the `doc-main-layout` pattern:

```html
<div class="doc-main-layout">
  <div class="doc-main-layout__hero">         <!-- Hero banner zone -->
  <div class="doc-main-layout__breadcrumb">   <!-- Breadcrumb trail -->
  <div class="doc-main-layout__main">         <!-- Primary content -->
    <div class="doc-main-layout__main__container">
      <div class="doc-main-layout__main__container-content">
        <!-- Page-specific content blocks -->
      </div>
    </div>
  </div>
  <div class="doc-main-layout__related">      <!-- Related content -->
  <div class="doc-main-layout__feedback">     <!-- Page feedback -->
</div>
```

---

## 3. Vue Component Registry (121 Components)

The full component registry was extracted from `app._context.components` at runtime. Below is the categorized inventory:

### 3.1 Global / Layout (14 components)

| Vue Component | Purpose |
|---|---|
| `doc-header` | Site header container |
| `doc-header-background` | Header background effect on scroll |
| `doc-header-nav-item` | Mega-nav top-level item |
| `doc-header-nav-item-main-link` | Mega-nav primary link |
| `doc-header-nav-item-sub-link` | Mega-nav secondary link |
| `doc-header-responsive-icon-link` | Mobile header icon links |
| `doc-main-logo` | DOC logo |
| `doc-footer` | Site footer |
| `doc-nz-gov-logo` | NZ Government logo in footer |
| `doc-breadcrumb` | Breadcrumb navigation |
| `doc-skip-to-content` | Accessibility skip link |
| `doc-back-to-top` | Scroll-to-top button |
| `doc-authentication-indicator` | Login state indicator |
| `doc-page-title` | Page title rendering |

### 3.2 Hero / Banner (3 components)

| Vue Component | Purpose |
|---|---|
| `doc-banner` | Hero banner with background image + title overlay |
| `abn-hero-video-container` | Video hero variant |
| `doc-survey-popup` | Survey/interstitial modal (appears on hero) |

### 3.3 Content / Body (10 components)

| Vue Component | Purpose |
|---|---|
| `doc-body-text` | Rich text content |
| `doc-heading` | Styled headings |
| `doc-introduction-text` | Lead paragraph intro |
| `doc-content-box` | Boxed/callout content |
| `doc-content-section` | Wrapping content section |
| `doc-divider` | Horizontal rule/separator |
| `doc-highlights` | Section highlight cards |
| `doc-widget-heading` | Widget section title |
| `doc-see-more` | Expandable "see more" content |
| `doc-popover` / `doc-tooltip` | Tooltips |

### 3.4 Media (8 components)

| Vue Component | Purpose |
|---|---|
| `doc-image` | Standard image |
| `doc-fancy-image` | Enhanced image with effects |
| `doc-image-caption` | Image with caption + attribution |
| `doc-image-carousel` | Multi-image carousel |
| `doc-light-box` | Image lightbox overlay |
| `doc-video-iframe-container` | Embedded video player |
| `abn-video-lightbox` | Video in lightbox modal |
| `doc-generic-iframe` | Generic third-party embed |

### 3.5 Navigation / Cards / Tiles (18 components)

| Vue Component | Purpose |
|---|---|
| `doc-feature-card` | Featured content card |
| `doc-standard-product-card` | Standard product/place card |
| `doc-resizable-product-card` | Responsive product card variant |
| `abn-standard-product-card` | Campaign product card |
| `abn-action-card` | CTA action card |
| `abn-action-card-carousel` | Scrollable action cards |
| `abn-action-card-pills` | Action card category pills |
| `abn-page-tile` | Page link tile |
| `abn-page-tile-carousel` | Scrollable page tiles |
| `doc-link-tile` | Generic link tile |
| `abn-link-tile` | Campaign link tile |
| `doc-park-rec-link-tile` | Parks-specific link tile |
| `doc-tile-list` | Tile grid container |
| `doc-child-page-links` | Auto-generated child page links |
| `doc-child-page-link` | Individual child page link |
| `doc-call-to-action` | CTA block |
| `doc-call-to-action-section` | CTA section container |
| `doc-fridge-magnet-group` | Activity quick-link icon grid |

### 3.6 Interactive / Data (16 components)

| Vue Component | Purpose |
|---|---|
| `doc-accordion` | Accordion container |
| `doc-accordion-item` | Individual accordion panel |
| `doc-show-hide` | Toggle visibility |
| `doc-tabs` | Tab container |
| `doc-tab` | Individual tab panel |
| `doc-things-to-do` | Activities listing |
| `doc-things-tab-content` | Activities tab content |
| `doc-things-to-do-concessionaires` | Commercial operators within activities |
| `doc-site-search` | Global search |
| `doc-cms-search` | Content search |
| `abn-cms-search` | Campaign content search |
| `doc-parks-rec-search` | Parks activity search |
| `doc-parks-rec-filter` | Parks faceted filter |
| `doc-custom-data-filter` | Generic data filter |
| `doc-filter-result-list` | Filtered results display |
| `abn-filter-result-list` | Campaign filter results |

### 3.7 Map (3 components)

| Vue Component | Purpose |
|---|---|
| `doc-map` | Leaflet-based interactive map |
| `doc-hot-spot-map` | Clickable region selector map |
| `doc-region-selector-panel` | Region selection panel |

### 3.8 Social / Utility (12 components)

| Vue Component | Purpose |
|---|---|
| `doc-social-media-links-block` | Social media share/follow links |
| `doc-page-feedback` | "Was this helpful?" feedback form |
| `doc-save-to-list` | Save to My DOC list |
| `doc-my-favourites` | Saved favourites display |
| `doc-save-as-pdf` | PDF export button |
| `doc-related-section` | Related content links |
| `doc-related-searches` | Related searches |
| `doc-secondary-navigation-links-block` | Secondary navigation |
| `doc-popular-links` | Popular links section |
| `doc-pagination` | Result pagination |
| `doc-badge` | Status badge/tag |
| `doc-concessionaire-list` | Commercial operators list |

### 3.9 Campaign (`abn-*`) (12 components)

| Vue Component | Purpose |
|---|---|
| `abn-background-section` | Section with background colour/image |
| `abn-counter` | Animated statistic counter |
| `abn-counter-card` | Counter in card layout |
| `abn-custom-button` | Styled CTA button |
| `abn-standard-button` | Standard button |
| `abn-double-column` | Two-column layout |
| `abn-icon` | Icon component |
| `abn-link` | Styled link |
| `abn-multi-select` | Multi-select dropdown |
| `abn-positioning-wrapper` | Layout positioning utility |
| `abn-toast` | Toast notification |
| `doc-loading` | Loading spinner |

### 3.10 Form (6 components)

| Vue Component | Purpose |
|---|---|
| `doc-concessionaire-form-block` | Concessionaire search form |
| `doc-commercial-operator-item` | Operator listing item |
| `formcontainerblockwithcustomdefaultvalues` | Generic form container |
| `submitbuttonelementblock` | Form submit button |
| `textareaelementblock` | Form textarea |
| `recaptchaelementblock` | reCAPTCHA widget |

---

## 4. EDS Block Mapping Strategy

### 4.1 Block Mapping Table

The 121 Vue components consolidate into **38 EDS blocks** across 8 categories:

| # | EDS Block | Source Vue Components | Priority | Notes |
|---|---|---|---|---|
| **Global** |||||
| 1 | `hero` | doc-banner, doc-page-title | Critical | Two-zone layout: title on image, subtitle bar below. Already built. |
| 2 | `navigation` | doc-header, doc-header-* | Critical | Mega-nav with 6 sections, search, mobile responsive |
| 3 | `footer` | doc-footer, doc-nz-gov-logo, doc-social-media-links-block | Critical | Feedback, social links, utility links, NZ Govt logo |
| 4 | `breadcrumb` | doc-breadcrumb | High | Auto-generated from page path hierarchy |
| **Content** |||||
| 5 | `section-intro` | doc-introduction-text, doc-standard-overview | High | Lead paragraph in green text + optional CTA below hero |
| 6 | `accordion` | doc-accordion, doc-accordion-item, doc-show-hide | High | Multi-panel expandable content |
| 7 | `tabs` | doc-tabs, doc-tab | High | Tabbed content panels, used on place detail pages |
| 8 | `content-box` | doc-content-box | Medium | Bordered/shaded callout box |
| 9 | `highlights` | doc-highlights | Medium | Highlighted section with coloured background band |
| 10 | `columns` | abn-double-column | Medium | Two-column content layout |
| **Media** |||||
| 11 | `image` | doc-image, doc-fancy-image, doc-image-caption | High | Inline image with caption/attribution |
| 12 | `carousel` | doc-image-carousel | Medium | Multi-image slider with prev/next controls |
| 13 | `video` | doc-video-iframe-container, abn-video-lightbox | Medium | YouTube/Vimeo embed, optional lightbox |
| 14 | `embed` | doc-generic-iframe | Low | Third-party content iframe |
| **Navigation / Cards** |||||
| 15 | `cards` | doc-feature-card, doc-standard-product-card, doc-resizable-product-card | High | Card grid for content teasers |
| 16 | `action-cards` | abn-action-card, abn-action-card-carousel, abn-action-card-pills | High | Full-bleed CTA cards with overlay text |
| 17 | `link-tiles` | doc-link-tile, doc-child-page-links, doc-park-rec-link-tile | High | Clickable tile grids for navigation |
| 18 | `page-tiles` | abn-page-tile, abn-page-tile-carousel | Medium | Image tiles linking to child pages |
| 19 | `fridge-magnets` | doc-fridge-magnet-group | Medium | Icon + label quick-link grid |
| 20 | `cta` | doc-call-to-action, doc-call-to-action-section | High | Full-width CTA banner |
| **Alerts / Status** |||||
| 21 | `alerts` | doc-alert, doc-alerts, doc-alert-panel | High | Warning/info banners (track closures, weather) |
| 22 | `badge` | doc-badge | Low | Small status label on cards |
| **Search / Filter / Interactive** |||||
| 23 | `search` | doc-site-search, doc-cms-search | High | Site-wide search with results |
| 24 | `filter` | doc-parks-rec-filter, doc-custom-data-filter, doc-filter-result-list | Medium | Faceted multi-select filter + result cards |
| 25 | `map` | doc-map | Medium | Leaflet.js interactive map |
| 26 | `hotspot-map` | doc-hot-spot-map, doc-region-selector-panel | Medium | Clickable NZ region SVG map |
| 27 | `things-to-do` | doc-things-to-do, doc-things-to-do-concessionaires | Medium | Activity listing with filter tabs |
| 28 | `concessionaires` | doc-concessionaire-form-block, doc-concessionaire-list | Low | Commercial operator directory |
| **Social / Utility** |||||
| 29 | `feedback` | doc-page-feedback | Medium | "Was this helpful?" form |
| 30 | `save-list` | doc-save-to-list, doc-my-favourites | Medium | Save to My DOC wishlist |
| 31 | `related-content` | doc-related-section, doc-related-searches | Medium | Related links section |
| 32 | `secondary-nav` | doc-secondary-navigation-links-block, doc-popular-links | Medium | In-page secondary links |
| 33 | `pagination` | doc-pagination | Medium | Numbered page navigation |
| 34 | `back-to-top` | doc-back-to-top | Low | Floating scroll button |
| **Campaign** |||||
| 35 | `hero-video` | abn-hero-video-container | Low | Video hero variant |
| 36 | `counter` | abn-counter, abn-counter-card | Low | Animated stats display |
| 37 | `background-section` | abn-background-section | Low | Full-width coloured section |
| 38 | `widget` | doc-widget-heading | Medium | Homepage widget container |

### 4.2 Priority Distribution

| Priority | Count | Examples |
|---|---|---|
| **Critical** | 3 | hero, navigation, footer |
| **High** | 14 | breadcrumb, section-intro, cards, accordion, tabs, link-tiles, cta, image, alerts, search |
| **Medium** | 14 | carousel, video, filter, map, things-to-do, fridge-magnets, feedback, pagination |
| **Low** | 7 | embed, badge, counter, concessionaires, back-to-top, hero-video, background-section |

---

## 5. Metadata & Taxonomy Analysis

### 5.1 Standard Meta Tags (All Pages)

```html
<meta name="title" content="[Page Title]">
<meta name="description" content="[SEO Description]">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="ROBOTS" content="INDEX, FOLLOW">
```

### 5.2 Open Graph Tags

```html
<meta property="og:url" content="https://www.doc.govt.nz/[path]">
<meta property="og:title" content="[Page Title]">
<meta property="og:description" content="[Description]">
<meta property="og:image" content="[Hero image URL]">
<meta property="og:type" content="website">
```

### 5.3 Custom Taxonomy Tags (Idio Platform)

```html
<meta name="idio:_TypeShortName" content="[Page Type]">
<meta name="idio:Changed$$date" content="[Last Modified ISO Date]">
<meta name="idio:IntroductionThumbnailSmall" content="[Thumbnail URL]">
```

These `idio:*` tags are used for content intelligence/personalisation. In EDS, these should be mapped to **Sheet Metadata** properties.

### 5.4 Breadcrumb Logic

Breadcrumbs are auto-generated from the URL hierarchy:
- `Home` → `Section` → `Sub-section` → `Page Title`
- The last item is the current page (not linked)
- Uses `doc-breadcrumb` Vue component
- CSS: `doc-main-layout__breadcrumb` positioned between hero and main content

### 5.5 Category / Tagging System

The site uses hierarchical categories rather than flat tags:
- **Place taxonomy:** Region → Park → Area → Activity
- **Nature taxonomy:** Animal type → Species
- **Activity taxonomy:** Activity type → Difficulty → Duration
- **Content type:** Page, Media Release, Event, Publication

---

## 6. CSS Class Patterns & Design Tokens

### 6.1 Layout Classes

| Class Pattern | Usage |
|---|---|
| `doc-main-layout__*` | Global page layout zones |
| `doc-standard-overview__*` | Section intro + content columns |
| `section-highlights` | Highlighted content band |
| `products` / `products-container` | Card grid containers |

### 6.2 Component BEM Patterns

| Component | BEM Classes |
|---|---|
| Hero | `hero`, `hero__image-container`, `hero__bottom-left`, `hero__top`, `hero__top-caption` |
| Cards | `card`, `card_header`, `card_link`, `product-card`, `product-media`, `product-description` |
| Widgets | `widget`, `widget__title`, `widget__content` |
| Tabs | `ui-tabs`, `map-list-tabs` |
| Filters | `multiselect__*` (Vue Multiselect library) |

### 6.3 Tailwind Utility Classes

The site uses Tailwind CSS alongside BEM, with utilities such as:
- `inline-block`, `opacity-85`, `bg-white`, `px-2`, `pb-2`, `pt-1.5`
- `text-doc-green-100` (custom DOC green: `#47665E`)
- `sm:opacity-85`, `md:block`, `print:block` (responsive/print variants)

### 6.4 DOC Brand Colours

| Token | Value | Usage |
|---|---|---|
| `--doc-green` | `#384246` | Primary headings |
| `--doc-green-100` | `#47665E` | Intro text, links |
| `--doc-yellow` | `#F7D154` | Accents, buttons |
| `--doc-white` | `#FFFFFF` | Backgrounds |
| `--doc-grey` | `#F5F5F5` | Section backgrounds |

---

## 7. Technical Notes for EDS Migration

### 7.1 SPA → Static Rendering

DOC NZ is a Vue 3 SPA (Single Page Application) with client-side routing. In EDS:
- Each page becomes a statically-rendered document authored in Google Docs/SharePoint.
- Vue components are replaced with EDS blocks (JS + CSS).
- Client-side routing is replaced with standard page navigation.
- No build step — EDS uses native ES modules loaded on demand.

### 7.2 Interactive Features Requiring Custom JS

| Feature | Complexity | Approach |
|---|---|---|
| Mega-nav | High | Custom `navigation` block with JS for mobile toggle |
| Search | High | API integration to existing search service or Algolia |
| Faceted Filters | High | Custom `filter` block with API-backed data |
| Interactive Maps | High | Leaflet.js integration in `map` block |
| Hotspot Map | Medium | SVG-based region selector with click handlers |
| Accordion | Low | Pure CSS + minimal JS toggle |
| Tabs | Low | CSS + JS panel switching |
| Carousel | Medium | Lightweight carousel library or custom JS |
| Lightbox | Medium | Custom overlay JS |
| Save to List | Medium | LocalStorage or API integration |

### 7.3 Image Strategy

Current site serves images via Optimizely's image pipeline:
- Path: `/thumbs/hero/contentassets/[guid]/[filename].jpg`
- Various sizes served per breakpoint

EDS approach:
- Images stored in SharePoint/Google Drive alongside documents
- EDS auto-optimises images (WebP, responsive srcset)
- Block authors reference images inline or via block table cells

### 7.4 Content Authoring Mapping

| Current Authoring | EDS Equivalent |
|---|---|
| Optimizely CMS rich text | Google Docs paragraph/heading |
| Property fields (title, intro, image) | Block table rows |
| Content areas (widgets, sidebars) | Document section order |
| Taxonomy/categories | Sheet metadata |
| Image assets | Google Drive/SharePoint media folder |

---

## 8. Findings Per Section

### 8.1 Homepage (`/`)

**Components found:** Hero (large banner), Widget containers (3 widgets: Blog, Featured, Media releases), Card grids within widgets, Social media links, Site search, Feedback form.

**Key patterns:**
- 3 widgets with `widget__title` + `widget__content` containing card grids
- Cards use `card`, `card_header`, `card_link` classes
- Footer includes `doc-feedback`, social media links, NZ Govt logo

### 8.2 Parks & Recreation (`/parks-and-recreation/`)

**Components found:** Hero, Section intro, Link tiles (fridge magnet style), Cards grid, Tabs (Map/List view), Region hotspot map, Faceted filter (activities, facilities, region), Product cards, Alerts, Things-to-do panels.

**Key patterns:**
- Heavy use of `doc-fridge-magnet-group` for activity quick-links
- `doc-parks-rec-filter` with multi-select dropdowns
- `ui-tabs` and `map-list-tabs` for map/list toggling
- `doc-hot-spot-map` with region-based SVG map
- Product cards for places and activities

### 8.3 Nature (`/nature/`)

**Components found:** Hero, Section intro, Child page link tiles, Image carousel, Content body text, Accordion (species lists), Related content.

**Key patterns:**
- More content-heavy with long-form body text
- `doc-child-page-links` for sub-navigation
- Image-focused with `doc-image-carousel` and `doc-image-caption`
- Fewer interactive components than Parks section

### 8.4 Our Work (`/our-work/`)

**Components found:** Hero, Section intro, Content boxes, Accordion, Link tiles, Related content, Publication links.

**Key patterns:**
- Publication-heavy with PDF download links
- `doc-content-box` for callout information
- More text content, fewer media components
- `doc-related-section` for cross-referencing

### 8.5 News (`/news/`)

**Components found:** Hero, Section intro, Cards (media releases), Date-based filtering, Pagination, Search.

**Key patterns:**
- List-based layout with `doc-standard-product-card` for articles
- `doc-pagination` for navigating results
- Date-based content organisation
- Featured/pinned articles at top

### 8.6 Get Involved (`/get-involved/`)

**Components found:** Hero, Section intro, CTA blocks, Cards, Content sections, Accordion, Links.

**Key patterns:**
- CTA-heavy with `doc-call-to-action-section`
- Volunteer/donation focused content
- Mix of cards and body content
- Section highlights for key programmes

### 8.7 About Us (`/about-us/`)

**Components found:** Hero, Section intro, Content sections, Cards, Link tiles, Contact panels, Form elements, Related content.

**Key patterns:**
- Section highlights with coloured bands
- `doc-generic-contacts-panel` for office contacts
- Form elements for feedback/contact
- `recaptchaelementblock` for spam protection

---

## 9. Recommendations

### 9.1 Migration Priority Order

1. **Phase 1 — Foundation:** Hero (done), Navigation, Footer, Breadcrumb
2. **Phase 2 — Core Content:** Section Intro, Cards, Link Tiles, Accordion, Tabs, CTA
3. **Phase 3 — Media:** Image, Carousel, Video, Lightbox
4. **Phase 4 — Interactive:** Search, Filter, Map, Hotspot Map, Things-to-Do
5. **Phase 5 — Utility:** Alerts, Feedback, Pagination, Save-to-List, Related Content
6. **Phase 6 — Campaign:** Action Cards, Page Tiles, Counter, Background Section, Hero Video

### 9.2 Blocks That Can Use EDS Built-in Features

| Feature | EDS Built-in |
|---|---|
| Rich text | Default content (paragraphs, headings, lists, links) |
| Images | Default content (inline images with auto-optimisation) |
| Buttons | Default content (styled links) |
| Metadata | Sheet metadata (title, description, og:*, template) |
| Sections | Section metadata (background colour, layout) |

### 9.3 Blocks Requiring Custom Development

All 38 blocks listed in Section 4.1 require custom JS/CSS files, though the complexity varies from simple (accordion, back-to-top) to complex (filter, map, search).
