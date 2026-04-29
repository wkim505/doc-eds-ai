# Master User Story Ledger — DOC.govt.nz → AEM Edge Delivery Services

**Project:** Department of Conservation website migration to Adobe EDS  
**Target:** https://www.doc.govt.nz/  
**Format:** Atlassian Rovo/Jira compatible  
**Date:** 2026-04-29

---

## Epic: DOCEDS-GLOBAL — Global Components & Layout

### DOCEDS-001: Header Block
**As a** site visitor, **I want to** see a consistent header with DOC branding, mega navigation, search, and authentication **so that** I can navigate to any section of the site efficiently.

**Acceptance Criteria:**
- Gold accent bar at top, green header background
- DOC logo (white variant) links to homepage
- 4 main nav items (Parks & Recreation, Nature, Get Involved, Our Work) with section-colored dropdowns
- Each dropdown contains sub-links and "Popular" quick links panel
- Global search with autocomplete in header
- Authentication indicator (login/sign out/My favourites)
- "Always Be Naturing" CTA badge
- Responsive: collapses to hamburger menu on mobile (< 768px)
- Print mode shows text-only "Department of Conservation | Te Papa Atawhai"
- **Component spec:** [header.md](components/header.md)

---

### DOCEDS-002: Footer Block
**As a** site visitor, **I want to** see a consistent footer with social links, secondary navigation, and government branding **so that** I can access auxiliary information and social channels.

**Acceptance Criteria:**
- Social media links: Facebook, Blog, Instagram, YouTube, Other
- Secondary links: Careers, News & events, About us, Contact
- Required links: Copyright, About this site, Privacy & security, OIA requests
- NZ Government logo (white variant)
- **Component spec:** [footer.md](components/footer.md)

---

### DOCEDS-003: Breadcrumb Block
**As a** site visitor, **I want to** see a breadcrumb trail showing my current location in the site hierarchy **so that** I can navigate back to parent sections.

**Acceptance Criteria:**
- Displays hierarchical path: Home → Section → Sub-section → Current page
- "Home" always first, current page always last (non-linked)
- Wrapped in `<nav aria-label="Breadcrumb">` for accessibility
- Hidden on homepage
- **Component spec:** [breadcrumb.md](components/breadcrumb.md)

---

### DOCEDS-004: Hero Block
**As a** site visitor, **I want to** see a visually impactful hero image with page title and optional quick links **so that** I understand the page context immediately.

**Acceptance Criteria:**
- Full-width responsive image using `<picture>` element
- Desktop (≥768px): full hero image; Mobile (≤480px): heromini variant
- Page title (h1) overlaid on bottom-left of image
- Optional image caption with photographer credit and copyright
- Optional "Fridge Magnet" quick-link pills (homepage variant)
- Eager loading with fetchpriority="high" for LCP
- **Variants:** with-fridge-magnets, standard, no-image
- **Component spec:** [hero.md](components/hero.md)

---

### DOCEDS-005: Site Search Block
**As a** site visitor, **I want to** search for content across the entire DOC website **so that** I can quickly find specific information.

**Acceptance Criteria:**
- Search input with placeholder "Search..."
- Autocomplete suggestions from `/search/autocomplete` endpoint
- Results redirect to `/search-results/?query=`
- Available in header (compact) and as standalone block
- **Component spec:** [site-search.md](components/site-search.md)

---

## Epic: DOCEDS-CARDS — Card & Content Components

### DOCEDS-006: Standard Product Card Block
**As a** content author, **I want to** display content items as cards with image, title, description, and link **so that** visitors can browse and discover content.

**Acceptance Criteria:**
- Thumbnail image (lazy loaded)
- Title as link to target page
- Description text (truncated)
- Supports types: `default`, `blog` (with date), media release
- Used in widgets (Blog, Featured, Media Releases) and listing pages
- Responsive: card grid on desktop, stacked on mobile
- Summary horizontal list variant (`summary-h-list` class) for category pages
- **Component spec:** [standard-product-card.md](components/standard-product-card.md)

---

### DOCEDS-007: Feature Card Block
**As a** content author, **I want to** highlight a key piece of content with a large featured card **so that** it receives prominent visibility on the page.

**Acceptance Criteria:**
- Large image with constrained layout
- Title as heading link
- Rich text description
- Used on homepage for primary feature ("Always Be Naturing")
- **Component spec:** [feature-card.md](components/feature-card.md)

---

### DOCEDS-008: Widget Container Block
**As a** content author, **I want to** group related content cards under a heading with a "More" link **so that** visitors can see curated content sections.

**Acceptance Criteria:**
- Widget heading (h2)
- Contains 1-4 standard product cards
- "More" button linking to full listing
- Screen-reader text on "More" button for context (e.g., "More media releases")
- Used on homepage for Blog, Featured, Media Releases sections
- **Component spec:** [widget-container.md](components/widget-container.md)

---

### DOCEDS-009: Action Card Block (ABN)
**As a** content author, **I want to** display "Always Be Naturing" themed action cards **so that** visitors are encouraged to participate in conservation activities.

**Acceptance Criteria:**
- Icon-based card with action title and link
- ABN branding and styling
- **Component spec:** [action-card.md](components/action-card.md)

---

### DOCEDS-010: Counter Card Block
**As a** content author, **I want to** display key statistics as counter cards **so that** visitors can see impact metrics at a glance.

**Acceptance Criteria:**
- Numeric counter with label
- Optional animation/increment effect
- **Component spec:** [counter-card.md](components/counter-card.md)

---

### DOCEDS-011: Page Tile Carousel Block
**As a** content author, **I want to** display a horizontal scrolling carousel of page tiles **so that** visitors can browse multiple items in limited space.

**Acceptance Criteria:**
- Horizontal scroll with touch/swipe support
- Page tile cards with image + title
- Navigation arrows on desktop
- **Component spec:** [page-tile-carousel.md](components/page-tile-carousel.md)

---

## Epic: DOCEDS-NAV — Navigation & Link Components

### DOCEDS-012: Child Page Links Block
**As a** site visitor, **I want to** see links to all child pages of the current section **so that** I can navigate deeper into the site hierarchy.

**Acceptance Criteria:**
- Renders as a list of links from JSON array
- Supports external links (target attribute)
- Used on section landing pages
- **Component spec:** [child-page-links.md](components/child-page-links.md)

---

### DOCEDS-013: Fridge Magnet Group Block
**As a** site visitor, **I want to** see quick-access pill buttons on the homepage hero **so that** I can jump to popular destinations.

**Acceptance Criteria:**
- Horizontal pill/tag-style buttons
- Links to: Online bookings, Walking, Know before you go, Huts, Camping, Hunting, Fishing, Predator Free 2050, Permissions, Heritage, Publications, Maps, Royal Cam
- Overlaid on hero bottom-left area
- Responsive wrap on smaller screens
- **Component spec:** [fridge-magnet-group.md](components/fridge-magnet-group.md)

---

### DOCEDS-014: Call to Action Block
**As a** content author, **I want to** add prominent CTA sections **so that** visitors are guided toward key actions.

**Acceptance Criteria:**
- CTA heading + description + button/link
- Styled prominently within content flow
- **Component spec:** [call-to-action.md](components/call-to-action.md)

---

### DOCEDS-015: Related Section Block
**As a** content author, **I want to** show related content at the bottom of pages **so that** visitors can discover more relevant information.

**Acceptance Criteria:**
- "Related" section heading
- List of related content links with optional thumbnails
- **Component spec:** [related-section.md](components/related-section.md)

---

### DOCEDS-016: Popular Links Block
**As a** content author, **I want to** display popular/trending links within navigation dropdowns **so that** visitors can quickly access high-traffic pages.

**Acceptance Criteria:**
- Renders in header dropdown additional-content slot
- Label heading + list of links
- **Component spec:** [popular-links.md](components/popular-links.md)

---

## Epic: DOCEDS-SEARCH — Search & Filter Components

### DOCEDS-017: Parks & Recreation Search Block
**As a** site visitor, **I want to** search for parks, tracks, and activities by region and activity type **so that** I can plan my outdoor recreation.

**Acceptance Criteria:**
- Region selector (show-regions=true, all NZ regions)
- Activity type multi-select (20+ options: Walking, Mountain biking, Hunting, Camping, etc.)
- Activities categorized: Popular (walking, biking, hunting) and All
- Free-text search
- Results link to filtered listing pages
- **Component spec:** [parks-rec-search.md](components/parks-rec-search.md)

---

### DOCEDS-018: CMS Search Block
**As a** content author, **I want to** add a content search interface to listing pages **so that** visitors can filter content.

**Acceptance Criteria:**
- Search input with category/type filters
- Results rendered inline
- **Component spec:** [cms-search.md](components/cms-search.md)

---

### DOCEDS-019: Data Filter Block
**As a** site visitor, **I want to** filter content by multiple criteria **so that** I can narrow down results to what's relevant.

**Acceptance Criteria:**
- Custom filtering interface with multi-select dropdowns
- Category and region filters
- Dynamic result updates
- **Component spec:** [data-filter.md](components/data-filter.md)

---

### DOCEDS-020: Region Selector Block
**As a** site visitor, **I want to** select a geographic region **so that** I can view content specific to that area.

**Acceptance Criteria:**
- Panel with region list/map
- Filters content to selected region
- **Component spec:** [region-selector.md](components/region-selector.md)

---

## Epic: DOCEDS-CONTENT — Content & Rich Media Components

### DOCEDS-021: Accordion Block
**As a** content author, **I want to** organize content into expandable/collapsible sections **so that** visitors can scan headings and expand details on demand.

**Acceptance Criteria:**
- Multiple accordion items with heading + hidden content
- Click to expand/collapse with animation
- Accessible: aria-expanded, aria-controls
- Optional "expand all / collapse all" controls
- **Component spec:** [accordion.md](components/accordion.md)

---

### DOCEDS-022: Tabs Block
**As a** content author, **I want to** organize content into tabbed panels **so that** visitors can switch between related content sections.

**Acceptance Criteria:**
- Tab bar with clickable tab labels
- Panel content switches on tab selection
- Accessible: role="tablist", role="tab", role="tabpanel"
- Responsive: may stack or scroll on mobile
- **Component spec:** [tabs.md](components/tabs.md)

---

### DOCEDS-023: Image Carousel Block
**As a** content author, **I want to** display a gallery of images as a carousel **so that** visitors can browse multiple photos.

**Acceptance Criteria:**
- Horizontal image carousel with navigation
- Touch/swipe support
- Optional captions
- Lightbox integration for full-size viewing
- **Component spec:** [image-carousel.md](components/image-carousel.md)

---

### DOCEDS-024: Video Block
**As a** content author, **I want to** embed video content (YouTube) **so that** visitors can watch media inline.

**Acceptance Criteria:**
- YouTube iframe embed with responsive container
- Lazy loading for performance
- Accessible title attribute on iframe
- **Component spec:** [video-embed.md](components/video-embed.md)

---

### DOCEDS-025: Lightbox Block
**As a** site visitor, **I want to** view images in a full-screen overlay **so that** I can see details without leaving the page.

**Acceptance Criteria:**
- Click image to open lightbox overlay
- Navigation between images
- Close on Escape or click outside
- Accessible focus trap
- **Component spec:** [lightbox.md](components/lightbox.md)

---

### DOCEDS-026: Map Block
**As a** site visitor, **I want to** view interactive maps showing locations of parks, tracks, and facilities **so that** I can plan my visit geographically.

**Acceptance Criteria:**
- ArcGIS map embed or custom map implementation
- Markers for points of interest
- HotSpot variant for clickable regions
- Responsive container
- **Component spec:** [map.md](components/map.md)

---

### DOCEDS-027: Show/Hide Block
**As a** content author, **I want to** show/hide content sections **so that** I can keep pages clean while providing optional detail.

**Acceptance Criteria:**
- Toggle button to show/hide content
- Smooth animation
- Accessible state management
- **Component spec:** [show-hide.md](components/show-hide.md)

---

## Epic: DOCEDS-FORMS — Forms & Interactive Components

### DOCEDS-028: Feedback Form Block
**As a** site visitor, **I want to** provide feedback on page content **so that** DOC can improve information quality.

**Acceptance Criteria:**
- "How can we improve the information?" textarea
- reCAPTCHA v3 integration for spam prevention
- Submit button
- Success/error messaging
- Hidden fields: page name, page URL
- Present in footer area of all pages
- **Component spec:** [feedback-form.md](components/feedback-form.md)

---

### DOCEDS-029: Contact Panel Block
**As a** site visitor, **I want to** see contact information for relevant DOC offices **so that** I can reach out for assistance.

**Acceptance Criteria:**
- Contact details: phone, email, address
- Office hours
- Responsive layout
- **Component spec:** [contact-panel.md](components/contact-panel.md)

---

### DOCEDS-030: Concessionaire Form & List Block
**As a** commercial operator, **I want to** apply for concessions and find existing concessionaires **so that** I can operate on conservation land.

**Acceptance Criteria:**
- Application form with validation
- Directory listing of concessionaires
- Search/filter by area and type
- **Component spec:** [concessionaire.md](components/concessionaire.md)

---

### DOCEDS-031: Favourites/Save to List Block
**As a** site visitor, **I want to** save places and activities to a personal list **so that** I can plan my visits.

**Acceptance Criteria:**
- Heart/star icon to save items
- Client-side localStorage for anonymous users
- Authenticated sync for logged-in users
- Dedicated "My saved list" page at `/parks-and-recreation/my-saved-list/`
- **Component spec:** [favourites.md](components/favourites.md)

---

## Epic: DOCEDS-LAYOUT — Layout & Utility Components

### DOCEDS-032: Alert Block
**As a** content author, **I want to** display urgent alerts and notifications **so that** visitors are aware of closures, hazards, or important announcements.

**Acceptance Criteria:**
- Alert banner with type (warning, info, danger)
- Dismissible option
- Prominent placement above content
- **Component spec:** [alert.md](components/alert.md)

---

### DOCEDS-033: Badge Block
**As a** content author, **I want to** display status/category badges on content items **so that** visitors can quickly identify content types.

**Acceptance Criteria:**
- Small label/tag with background color
- Used on cards for content type indication
- **Component spec:** [badge.md](components/badge.md)

---

### DOCEDS-034: Introduction Text Block
**As a** content author, **I want to** add a styled introduction paragraph at the top of pages **so that** visitors get a quick summary.

**Acceptance Criteria:**
- Lead paragraph styling (larger font, lighter weight)
- Optional save-to-list toggle alongside
- **Component spec:** [introduction-text.md](components/introduction-text.md)

---

### DOCEDS-035: Embed Block
**As a** content author, **I want to** embed external content via iframe **so that** third-party tools and content can be displayed inline.

**Acceptance Criteria:**
- Generic iframe container
- Responsive sizing
- Title attribute for accessibility
- **Component spec:** [embed.md](components/embed.md)

---

### DOCEDS-036: Things To Do Block
**As a** site visitor, **I want to** browse available activities at a location **so that** I can plan what to do during my visit.

**Acceptance Criteria:**
- Activity listing with icons and categories
- Filterable by type
- Links to activity detail pages
- **Component spec:** [things-to-do.md](components/things-to-do.md)

---

### DOCEDS-037: Social Media Links Block
**As a** site visitor, **I want to** see links to DOC's social media channels **so that** I can follow and engage on social platforms.

**Acceptance Criteria:**
- Icons for each platform: Facebook, Blog, Instagram, YouTube
- External links open in new tab
- Present in footer
- **Component spec:** [social-media-links.md](components/social-media-links.md)

---

### DOCEDS-038: Save to List / Wishlist Toggle
**As a** site visitor, **I want to** save pages to my favourites **so that** I can return to them later.

**Acceptance Criteria:**
- Toggle icon on section landing pages
- Page-id based tracking
- Links to My saved list page
- **Component spec:** [save-to-list.md](components/save-to-list.md)
