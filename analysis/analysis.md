# DOC NZ → Adobe EDS Migration Analysis

**Site:** https://www.doc.govt.nz/  
**Prepared by:** EDS Solution Architect  
**Date:** 2026-04-23

---

## 1. Current Platform Assessment

| Attribute | Detail |
|---|---|
| **CMS** | Optimizely (Episerver) — evidenced by `idio:_TypeShortName`, `EPiServerForms`, `EPiServer.Forms` JS vars |
| **Frontend** | Vue.js 3 SPA (custom web components, `vue-hidden`, `v-if` SSR templates) |
| **Deployment** | Server-rendered HTML shell + client-side Vue hydration |
| **Analytics** | Google Tag Manager (`GTM-KGVHZH9`), Google Analytics, Monsido (accessibility QA) |
| **Maps** | ArcGIS Online (`services.arcgisonline.co.nz`, `api.doc.govt.nz`) |
| **External Blog** | WordPress (`docnz.files.wordpress.com`) |
| **Bookings** | Separate system at `bookings.doc.govt.nz` |
| **Search** | Custom Optimizely search (`DocSiteSearch`, `DocParksRecSearch`) |
| **Forms** | Optimizely Forms (`EPiServerForms`) |
| **Typography** | Google Fonts — Zilla Slab (300–700) |

---

## 2. Site Architecture & Information Architecture

**6 Primary Sections** (each with distinct brand colour tokens):

| Section | Colour Token | Key Sub-sections |
|---|---|---|
| Parks & Recreation | `ranginui` (blue) | Places to go, Things to do, Places to stay, Know before you go, Maps, My Saved List |
| Nature | `paptuanuku` (green) | Native animals, Plants, Pests & threats, Habitats, Biodiversity, Conservation status |
| Get Involved | `atawhenua` (earth) | Volunteer, Have your say, Donate, Permissions, Education, Training, Funding |
| Our Work | `weta` (brown) | Heritage, Species programmes, Research, Monitoring, Maps & data |
| About Us | — | Governance, Policy, Leadership, International work |
| News | — | Media releases, RSS |

**Content depth** is significant — thousands of pages covering individual tracks, huts, campsites, species, permits, and park pages, each with structured data (GPS coords, facilities, booking info, safety status).

---

## 3. Current Component Inventory → EDS Block Mapping

### Directly mappable to EDS blocks

| Current Vue Component | EDS Block (proposed) | Complexity |
|---|---|---|
| `DocBanner` | `hero` | Low |
| `DocCallToAction` | `cta` | Low |
| `DocAccordion` | `accordion` | Low |
| `DocTabs` | `tabs` | Medium |
| `DocImageCarousel` | `carousel` | Medium |
| `DocImageCaption` | `image` (with caption variant) | Low |
| `DocRelatedSection` | `cards` | Low |
| `DocChildPageLinks` | `cards` / `link-list` | Low |
| `DocPopularLinks` | `link-list` | Low |
| `DocShowHide` | `accordion` (collapsed variant) | Low |
| `DocAlerts` | `alert` | Low |
| `DocVideoIframeContainer` | `video` (embed) | Low |
| `DocBadge` | inline styling / metadata | Low |
| `DocGenericIframe` | `embed` | Medium |
| `DocProductSet` | `cards` | Low |

### Requires custom EDS blocks

| Current Component | Proposed Custom Block | Complexity | Notes |
|---|---|---|---|
| `DocMap` / `DocHotSpotMap` | `map` | **High** | ArcGIS integration; requires JS API load, lazy hydration. Consider iframe embed for V1. |
| `DocParksRecSearch` | `search` | **High** | Faceted search with region/activity filters; needs API (`api.doc.govt.nz`) integration |
| `DocCmsSearch` / `AbnCmsSearch` | `site-search` | High | Full-text across Optimizely content store — needs re-platform to Algolia/Coveo/Franklin search |
| `DocMyFavourites` | `saved-list` | High | Requires auth + localStorage/user profile persistence |
| `DocConcessionaireList` / `DocConcessionaireFormBlock` | `concessionaire` | High | Dynamic listing + form submission; needs API backend |
| `DocRegionSelectorPanel` | `region-selector` | Medium | Interactive NZ map region picker |
| `DocGenericContactsPanel` | `contacts` | Medium | Structured contact data rendering |
| `DocFridgeMagnetGroup` | `fridge-magnets` | Medium | Campaign-specific activity card group (Always Be Naturing) |
| `DocThingsToDo` | `things-to-do` | Medium | Activity listing with filters |
| `DocMultiCategory` / `DocSingleCategory` | `category-filter` | Medium | Taxonomy-driven content filtering |
| `DocCustomDataFilter` | `data-filter` | High | Dynamic data-driven faceted filtering |
| `AbnActionCard` / `AbnCounterCard` / `AbnPageTileCarousel` / `AbnStandardProductCard` | `campaign-cards` | Medium | ABN campaign-specific card variants |
| `DocAuthenticationIndicator` | `auth-status` | High | Login state indicator tied to `bookings.doc.govt.nz` |
| `DocPopoverNav` | `mega-nav` | Medium | Custom sub-nav popover behaviour |
| `DocLightBox` | `lightbox` | Medium | Image gallery overlay |

---

## 4. Page Type Inventory

| Page Type | Description | EDS Approach |
|---|---|---|
| **Home** | Hero + campaign promos + news feed | Composable blocks; dynamic news via fragment |
| **Section landing** | Hero + child page cards + intro | `hero` + `cards` + `text` |
| **Track/Walk** | Structured: difficulty, duration, distance, facilities, map, gallery | Custom `trail-detail` block + `map` embed |
| **Hut/Campsite** | Booking CTA, facilities, map, seasonal info | Custom `accommodation-detail` + booking link |
| **Park/Place** | Region overview, linked assets, maps | `hero` + `map` + `cards` |
| **Species page** | Scientific data, conservation status, images | `species-detail` block with structured metadata |
| **Article/Media release** | Standard editorial | Standard EDS `text` + `image` + `table` |
| **Permit/Permissions** | Conditional guidance flows, forms | `accordion` + EPiServer Forms → EDS `form` |
| **Contact / Visitor centre** | Structured contact data + map | `contacts` + `map` |
| **Campaign (ABN)** | Rich interactive campaign experience | Custom `campaign` block set |

---

## 5. Third-Party & Integration Dependencies

| Integration | Current | EDS Strategy |
|---|---|---|
| **Bookings** | `bookings.doc.govt.nz` (external) | Deep-link CTA only — stays external |
| **ArcGIS Maps** | `DocMap` with `api.doc.govt.nz` | Lazy-load ArcGIS JS SDK in custom block; iframe fallback for V1 |
| **Google Tag Manager** | `GTM-KGVHZH9` | Add to EDS `head.html` — straightforward |
| **Monsido** | Accessibility QA script | Add to `head.html` |
| **YouTube embeds** | `DocVideoIframeContainer` | Standard EDS `video` block |
| **WordPress blog** | `docnz.files.wordpress.com` | Pull via RSS/API into `news` block or redirect |
| **Google Fonts (Zilla Slab)** | `<link>` preload | Host via EDS `fonts/` folder for performance or keep CDN link |
| **Episerver Forms** | Permit applications, Have your say | Migrate to AEM Forms, Netlify Forms, or embedded 3rd-party (e.g. Typeform) |
| **RSS feed** | Media releases | EDS `news` fragment with JSON feed |
| **iNaturalist NZ** | Species ID tool link | External deep-link |

---

## 6. Key Migration Challenges & Risks

### 🔴 High Risk

1. **Search** — The Parks & Recreation search is the most-used feature on the site. Faceted filtering across thousands of tracks, huts, and places by region/activity/difficulty is deeply coupled to the Optimizely content store. This must be re-platformed to a dedicated search service (Algolia, Coveo, or AEM Search) before migration.

2. **Interactive Maps (ArcGIS)** — The `DOC maps: Discover the outdoors` feature at `/map/index.html` is a full ArcGIS web app. This is not suitable for an EDS page — it should remain a standalone app hosted separately, deep-linked from EDS.

3. **Booking & Authentication** — `DocMyFavourites` and `DocAuthenticationIndicator` rely on user sessions tied to the bookings platform. EDS has no auth layer by default. Recommend keeping bookings fully external and implementing saved lists via localStorage only (no server-side session).

4. **Volume of structured content** — Thousands of tracks, huts, campsites, and species pages have structured data (coordinates, facilities, booking IDs). A content migration tool (importer) must be built to map Optimizely structured content → SharePoint/Google Drive documents for EDS authoring.

5. **Optimizely Forms** — Permit applications (concessions, dog access, drone permits) are complex multi-step forms with conditional logic. These require a dedicated forms platform.

### 🟡 Medium Risk

6. **Bi-lingual content (Te Reo Māori)** — Inline Māori language throughout all content (page titles, nav labels, body text). EDS must support `lang="mi"` attributes and correct font rendering for macrons.

7. **Colour-coded design system** — Each section has a distinct colour token (`ranginui`, `paptuanuku`, `atawhenua`, `weta`). EDS CSS custom properties can handle this via section metadata, but it requires careful `styles/` architecture.

8. **Concessionaire listings** — `DocConcessionaireList` pulls dynamic data from an API. This needs a data strategy (static generation at build time vs. client-side fetch).

9. **Always Be Naturing (ABN) campaign** — Uses a distinct component set (`AbnActionCard`, `AbnCounterCard`, `AbnPageTileCarousel`). Treat as a separate campaign block library.

### 🟢 Low Risk

10. **Editorial/informational content** — Articles, media releases, policy pages, species descriptions are well-suited to EDS's document-based authoring model.

11. **Navigation** — The mega-nav with popular links is complex to author but technically achievable in EDS using a nav fragment driven by a spreadsheet/doc.

---

## 7. Proposed EDS Block Library

```
blocks/
├── hero/                    # Full-width hero with image, heading, intro
├── cards/                   # Card grid (3-up, 4-up variants)
├── carousel/                # Image carousel with lightbox
├── accordion/               # Expandable content sections
├── tabs/                    # Tabbed content
├── cta/                     # Call-to-action banner
├── alert/                   # Site-wide or page alert
├── video/                   # YouTube / iframe video embed
├── link-list/               # Popular links / child page links
├── map/                     # ArcGIS map embed (lazy-loaded)
├── search/                  # Parks & rec faceted search
├── site-search/             # Global site search
├── contacts/                # Contact panel with structured data
├── region-selector/         # NZ region map picker
├── trail-detail/            # Track/walk structured data block
├── accommodation-detail/    # Hut/campsite structured data block
├── species-detail/          # Native species data block
├── category-filter/         # Taxonomy-driven content filter
├── concessionaire/          # Concessionaire listing + form
├── campaign-cards/          # ABN campaign card variants
├── news-feed/               # Media releases / news listing
├── form/                    # General form embed
└── saved-list/              # My Saved List (localStorage)
```

---

## 8. Recommended Migration Approach

### Phase 1 — Foundation
- Stand up EDS project with DOC design tokens (colours, typography — Zilla Slab)
- Implement core blocks: `hero`, `cards`, `accordion`, `cta`, `alert`, `video`, `link-list`
- Migrate **About Us**, **News/Media Releases**, and **Nature** editorial content (lowest complexity, highest volume)
- Set up GTM, Monsido in `head.html`

### Phase 2 — Parks Content
- Build `trail-detail`, `accommodation-detail`, `map` blocks
- Build content migration importer: Optimizely export → SharePoint/Google Drive documents
- Migrate Parks & Recreation informational pages (tracks, huts, places — structured but static)
- Integrate bookings as external deep-links

### Phase 3 — Search & Filters
- Implement Algolia or Coveo index from DOC content API
- Build `search` and `category-filter` blocks
- Migrate **Parks & Recreation** section fully

### Phase 4 — Advanced Features
- `concessionaire` block + backend API contract
- `region-selector` interactive map
- `campaign-cards` (ABN)
- `saved-list` (localStorage)
- Forms migration to chosen platform

### Phase 5 — Cutover & Decommission
- Redirect mapping (thousands of URLs — needs automated mapping from Optimizely sitemap)
- SEO validation (structured data, Open Graph, hreflang for NZ English)
- Performance audit — EDS should achieve 95+ Lighthouse scores vs current site
- Optimizely decommission

---

## 9. Summary Scorecard

| Dimension | Assessment |
|---|---|
| **Content migration complexity** | 🔴 High — thousands of structured pages |
| **Block development effort** | 🟡 Medium–High — ~20 custom blocks needed |
| **Search re-platform** | 🔴 Critical path item |
| **Forms migration** | 🟡 Medium — complex permits need dedicated platform |
| **Maps** | 🟡 Medium — ArcGIS stays standalone; page-level maps via embed |
| **Auth/Bookings** | 🟢 Low — stays fully external |
| **Editorial content** | 🟢 Well-suited to EDS |
| **Performance uplift** | 🟢 High — EDS will dramatically improve Core Web Vitals |
| **Bilingual (Te Reo)** | 🟡 Must be validated carefully throughout |

**Overall verdict**: DOC NZ is a strong EDS candidate for its editorial and structured informational content, but the migration requires careful sequencing, a dedicated search platform, and a purpose-built content importer for the structured asset database. Recommend a phased delivery with editorial content first and complex interactive features in later phases.
