# DOC.govt.nz → Adobe Edge Delivery Services: Structural Analysis & Migration Report

**Target:** https://www.doc.govt.nz/  
**Date:** 2026-04-29  
**Scope:** www.doc.govt.nz only (sub-domains excluded)

---

## 1. Executive Summary

The Department of Conservation (DOC) website is a **Vue.js 3 Single Page Application** served by an **EPiServer/Optimizely CMS** (v11.21.2.0) backend. The site contains approximately 40+ custom Vue components, uses Tailwind CSS with a custom DOC design system, and renders content client-side (requiring JavaScript). Migration to AEM Edge Delivery Services (EDS) will transition the architecture from a client-side SPA to a server-rendered, block-based document model—yielding significant performance, SEO, and authoring improvements.

---

## 2. Current Technology Stack

| Layer | Technology | Details |
|---|---|---|
| **CMS** | EPiServer/Optimizely | v11.21.2.0, .NET backend |
| **Frontend Framework** | Vue.js 3 | Client-side SPA, requires JS to render |
| **CSS** | Tailwind CSS | Custom config with DOC design tokens |
| **Fonts** | Google Fonts | Zilla Slab (300, 400, 500, 500i, 700) |
| **Analytics** | Google Tag Manager | GTM-KGVHZH9 |
| **Accessibility Monitoring** | Monsido | Token: CE4t9v7suHiWHKN3JWuXlQ |
| **Forms** | EPiServer Forms | With reCAPTCHA v3 integration |
| **Maps** | ArcGIS Online | services.arcgisonline.co.nz |
| **Search** | EPiServer Find | dl.episerver.net |
| **Image Serving** | EPiServer Thumbnailer | /thumbs/hero/, /thumbs/large/, /thumbs/heromini/ |

---

## 3. Content Inventory & Site Hierarchy

### 3.1 Primary Navigation (6 Sections)

Each section has a distinct color theme used throughout the UI:

| Section | URL Path | Color Token | EPiServer Page Type |
|---|---|---|---|
| **Parks & Recreation** | `/parks-and-recreation/` | `ranginui` | PlacesToGoPage |
| **Nature** | `/nature/` | `paptuanuku` | SummaryPage |
| **Get Involved** | `/get-involved/` | `atawhenua` | SummaryPage |
| **Our Work** | `/our-work/` | `weta` | SummaryPage |
| **News & Events** | `/news/` | — | SummaryPage |
| **About Us** | `/about-us/` | — | SummaryPage |

### 3.2 Sub-Navigation Structure

#### Parks & Recreation (ranginui)
- Places to go → Regional breakdown (Northland, Central North Island, Taranaki, etc.)
- Things to do → Walking & tramping, Mountain biking, Hunting, Fishing, etc.
- Places to stay → Huts, Campsites, Lodges/Cabins/Cottages
- Know before you go → Land Safety Code, Dog access, etc.
- DOC maps → External map application
- My saved list → User favourites (authenticated)
- Online bookings → External booking system (bookings.doc.govt.nz)

#### Nature (paptuanuku)
- Native animals → Birds A-Z, Reptiles, Insects, Marine, Freshwater
- Native plants → Trees, Ferns, etc.
- Pests & threats → Methods of control, 1080, Predator Free 2050, Diseases
- Habitats
- Biodiversity
- Conservation status
- Identify a species

#### Get Involved (atawhenua)
- Volunteer
- Have your say
- Donate to nature
- Permissions/Permits
- Conservation activities
- Teaching resources
- Training / Online courses
- Funding

#### Our Work (weta)
- Heritage → Māori sites, Icon heritage sites
- Jobs for Nature
- Managing threats to nature
- Maps and data
- Marine ecosystems research
- Marine reserves
- Monitoring
- Places with projects
- Research and development
- Species programmes (Kākāpō Recovery, Takahē Recovery)

#### News & Events
- Media releases (by year)
- Podcasts
- Newsletters
- Social media

#### About Us
- Science publications
- Careers
- Contact

### 3.3 Footer Structure
- **Secondary links:** Careers, News & events, About us, Contact
- **Required links:** Copyright, About this site, Privacy & security, OIA requests
- **Social media:** Facebook, Conservation Blog, Instagram, YouTube, Other channels
- **NZ Government logo** (mandatory NZ govt branding)

---

## 4. Identified EPiServer Page Types

| Page Type (idio:_TypeShortName) | Usage |
|---|---|
| `StartPage` | Homepage |
| `PlacesToGoPage` | Parks & Recreation landing |
| `SummaryPage` | Section landings, category pages, species pages |
| `StandardPage` | Content articles (inferred) |

---

## 5. UI Pattern Library → EDS Block Mapping

### 5.1 Global Components

| Current Component | Description | EDS Block Equivalent | Priority |
|---|---|---|---|
| `DocHeader` | Mega navigation with section-colored dropdowns, popular links, search, auth | **Header Block** (Global) | P0 |
| `DocHamburgerNav` + `DocHamburgerNavItem` | Mobile slide-out navigation | **Header Block** (mobile variant) | P0 |
| `DocPopoverNav` + `DocPopoverNavItem` | Desktop dropdown menus | **Header Block** (desktop variant) | P0 |
| `DocFooter` | Social links, secondary nav, NZ govt logo, required links | **Footer Block** (Global) | P0 |
| `DocBreadcrumb` | Hierarchical breadcrumb navigation | **Breadcrumb Block** | P0 |
| `DocSiteSearch` | Global search with autocomplete | **Search Block** | P1 |
| `DocAuthenticationIndicator` | Login/logout, My favourites link | **Auth Indicator Block** | P2 |
| `DocSkipToContent` | Accessibility skip link | Default content (a11y) | P0 |
| `DocMainLogo` / `DocNZGovLogo` | Branding logos | Fragment/asset | P0 |

### 5.2 Hero & Banner Components

| Current Component | Description | EDS Block Equivalent | Priority |
|---|---|---|---|
| Hero (`.hero`) | Full-width hero with responsive `<picture>`, caption, title, optional fridge magnets | **Hero Block** | P0 |
| `DocFridgeMagnetGroup` | Quick-link pill buttons overlaid on hero | **Hero Block** (fridge-magnet variant) | P1 |
| `DocBanner` | Promotional/alert banner | **Banner Block** | P1 |
| `DocImageCaption` | Image attribution overlay | **Hero Block** sub-component | P0 |

### 5.3 Card & Content Components

| Current Component | Description | EDS Block Equivalent | Priority |
|---|---|---|---|
| `DocFeatureCard` | Large featured card (image + title + text + link) | **Feature Card Block** | P0 |
| `DocStandardProductCard` | Versatile card (blog, media release, species, default types) | **Cards Block** | P0 |
| `AbnStandardProductCard` | "Always Be Naturing" branded card variant | **Cards Block** (ABN variant) | P1 |
| `AbnActionCard` | Call-to-action card with icon | **CTA Card Block** | P1 |
| `AbnCounterCard` | Statistics/counter display card | **Counter Card Block** | P2 |
| `AbnPageTileCarousel` | Horizontal scrolling page tile carousel | **Carousel Block** | P1 |
| `DocProductSet` | Grid/collection of product cards | **Card Collection Block** | P1 |

### 5.4 Navigation & Link Components

| Current Component | Description | EDS Block Equivalent | Priority |
|---|---|---|---|
| `DocChildPageLinks` | Child page navigation list | **Child Pages Block** | P0 |
| `DocPopularLinks` | "Popular" quick links in nav dropdowns | **Quick Links Block** | P1 |
| `DocCallToAction` | CTA button/link section | **CTA Block** | P1 |
| `DocRelatedSection` | Related content links at page bottom | **Related Content Block** | P1 |
| `DocStandardButton` | Styled button with "More" text + sr-only label | Default content (button) | P0 |

### 5.5 Search & Filter Components

| Current Component | Description | EDS Block Equivalent | Priority |
|---|---|---|---|
| `DocParksRecSearch` | Complex search: regions + activities + text | **Parks Search Block** | P1 |
| `DocCmsSearch` / `AbnCmsSearch` | CMS content search | **Content Search Block** | P1 |
| `DocCustomDataFilter` | Custom data filtering interface | **Data Filter Block** | P2 |
| `DocMultiCategory` / `DocSingleCategory` | Category-based content filtering | **Category Filter Block** | P2 |
| `DocMultiSelect` / `AbnMultiSelect` | Multi-select dropdown filters | **Filter Select Block** | P2 |
| `DocRegionSelectorPanel` | Region map/list selector | **Region Selector Block** | P2 |

### 5.6 Content & Rich Media Components

| Current Component | Description | EDS Block Equivalent | Priority |
|---|---|---|---|
| `DocAccordion` | Expandable accordion sections | **Accordion Block** | P0 |
| `DocTabs` | Tabbed content interface | **Tabs Block** | P1 |
| `DocShowHide` | Toggle visibility sections | **Accordion Block** (variant) | P1 |
| `DocImageCarousel` | Image gallery carousel | **Carousel Block** | P1 |
| `DocLightBox` | Image lightbox overlay | **Lightbox Block** | P1 |
| `DocVideoIframeContainer` | YouTube/video embed wrapper | **Video Block** | P1 |
| `DocMap` / `DocHotSpotMap` | Interactive ArcGIS maps | **Map Block** | P2 |
| `DocGenericIframe` | Generic iframe embed | **Embed Block** | P2 |

### 5.7 Forms & Interactive Components

| Current Component | Description | EDS Block Equivalent | Priority |
|---|---|---|---|
| `DocPageFeedback` | Page-level feedback form (EPiServer Forms + reCAPTCHA) | **Feedback Form Block** | P1 |
| `DocGenericContactsPanel` | Contact information display | **Contact Block** | P1 |
| `DocConcessionaireFormBlock` | Concessionaire application form | **Form Block** | P2 |
| `DocConcessionaireList` | Concessionaire business directory | **Directory Block** | P2 |
| `DocMyFavourites` / `DocSaveToList` | Save-to-favourites functionality | **Favourites Block** | P2 |

### 5.8 Layout & Widget Components

| Current Component | Description | EDS Block Equivalent | Priority |
|---|---|---|---|
| Widget (`.widget`) | Content widget container (Blog, Featured, Media Releases) | **Widget Block** | P0 |
| `DocWidgetHeading` | Widget section heading | Default content (h2) | P0 |
| `DocBadge` | Status/category badge | **Badge Block** | P1 |
| `DocAlerts` | Alert/notification banner | **Alert Block** | P1 |
| `DocPopover` | Popover tooltip/info panel | **Popover Block** | P2 |
| `DocThingsToDo` | Activity listing/filter component | **Activities Block** | P1 |
| `DocIntroductionText` | Styled intro paragraph | Default content (lead paragraph) | P0 |
| `DocContentBox` | Content wrapper/container | Section metadata | P0 |

---

## 6. Metadata & Taxonomy Analysis

### 6.1 Standard Meta Tags
```html
<meta name="Title" content="...">
<meta name="Description" content="...">
<meta name="ROBOTS" content="all">
```

### 6.2 Open Graph Tags (Facebook/Twitter)
```html
<meta property="og:url" content="..." />
<meta property="og:title" content="..." />
<meta property="og:description" content="..." />
<meta property="og:image" content="..." />
<meta property="og:type" content="" />
```
**Note:** `og:type` is consistently empty — should be set to "website" or "article" in EDS.

### 6.3 Idio Analytics Tags (Custom Taxonomy)
```html
<meta property="idio:_TypeShortName" content="SummaryPage">
<meta property="idio:Changed$$date" content="...">
<meta property="idio:IntroductionThumbnailSmall" content="...">
<meta property="idio:Location" content="">
<meta property="idio:StandardPageContentType" content="Species">
```

**Migration Note:** These Idio tags provide content classification. In EDS, this taxonomy should be mapped to:
- Sheet metadata (page properties in spreadsheets)
- AEM taxonomy tags
- Content type classification for filtering/search

### 6.4 Breadcrumb Logic
- Server-rendered as a JSON array in `doc-breadcrumb` component
- Structure: `[{Heading, Link, CssClasses}]`
- Always starts with "Home" → current section → current page
- Current page has `CssClasses: "current"` and `Link: null`

### 6.5 Section Color Theme System
| Token | Hex (approx) | Section |
|---|---|---|
| `ranginui` | Blue | Parks & Recreation |
| `paptuanuku` | Green/Brown | Nature |
| `atawhenua` | Teal/Green | Get Involved |
| `weta` | Orange/Amber | Our Work |
| `doc-green-500` | — | Header background |
| `doc-gold-500` | — | Top accent bar |
| `bg-tara-iti` | — | Page background |
| `tuatua` | — | Border color |

---

## 7. Image Serving Strategy

Current EPiServer thumbnailer creates responsive variants:
- `/thumbs/hero/` — Full-width hero (1920px)
- `/thumbs/heromini/` — Mobile hero (480px breakpoint)
- `/thumbs/large/` — Card/listing thumbnails
- `/thumbs/gallery/` — Gallery images

**EDS Migration:** Replace with AEM Dynamic Media or Edge Delivery image optimization with `<picture>` element and responsive `srcset`.

---

## 8. Key Architectural Considerations for EDS Migration

### 8.1 Client-Side Rendering → Server-Side
The current site is a Vue.js SPA that requires JavaScript to render ANY content (`<noscript>` fallback shows only "Please enable JavaScript"). EDS will provide server-rendered HTML, dramatically improving:
- First Contentful Paint (FCP)
- SEO crawlability
- Accessibility
- Core Web Vitals

### 8.2 Complex Interactive Components
Several components require careful EDS translation:
- **DocParksRecSearch**: Multi-faceted search with 20+ activities and regional filters — requires custom JS block
- **DocMap / DocHotSpotMap**: ArcGIS integration — likely needs iframe/embed block
- **DocMyFavourites**: Client-side localStorage-based favourites — needs custom JS block
- **DocAuthenticationIndicator**: External auth integration — SSO/Edge worker consideration

### 8.3 External Service Dependencies
- `bookings.doc.govt.nz` — Booking system (external link, no migration needed)
- `blog.doc.govt.nz` — WordPress blog (external, content pulled via cards)
- `api.doc.govt.nz` — API for search/data
- `services.arcgisonline.co.nz` — ArcGIS maps
- `dl.episerver.net` — EPiServer Find search

### 8.4 Forms Migration
EPiServer Forms with reCAPTCHA v3 → AEM Forms or custom EDS form blocks with server-side validation.

---

## 9. Page Template Types for EDS

Based on analysis, the following page templates are needed:

1. **Homepage Template** — Hero + fridge magnets, feature card, blog widget, featured cards widget, media releases widget
2. **Section Landing Template** — Hero + intro text + child page links + search/filter panel + product card grid
3. **Summary/Category Page Template** — Hero + intro + section highlights (product card list) + content box
4. **Content/Article Page Template** — Hero + breadcrumb + rich text + accordions + images + related content + feedback form
5. **Species/Detail Page Template** — Hero + breadcrumb + intro + tabbed content + image gallery + child links
6. **Search Results Page Template** — Search input + filtered results
7. **News Listing Page Template** — Hero + year-based listing + CMS search
8. **Track/Place Detail Page Template** — Hero + tabs (Description, Getting there, Know before you go, Fees) + map + alerts + concessionaires

---

## 10. Recommended Migration Priority

### Phase 1 (P0) — Foundation
- Header, Footer, Breadcrumb, Hero
- Standard page template (article content)
- Cards block, Feature card, Widget containers
- Section landing template
- Typography, colors, design tokens

### Phase 2 (P1) — Core Content
- Accordion, Tabs, Carousel
- Video embed, Image gallery, Lightbox
- Search blocks (site search, parks search)
- CTA, Related content, Alert/Banner
- Feedback form
- Badge, Activities listing

### Phase 3 (P2) — Advanced Features
- Interactive maps (ArcGIS embed)
- Favourites/saved list
- Region selector
- Concessionaire forms & directory
- Custom data filters
- Auth indicator
- Popover/tooltip components
