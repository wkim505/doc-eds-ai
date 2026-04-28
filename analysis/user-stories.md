# DOC NZ → EDS Migration: Master User Story Ledger

> **Format:** Optimised for Atlassian Rovo ingestion into Jira  
> **Project:** DOC NZ EDS Migration  
> **Epic:** Content Migration — Block Development  
> **Component specs:** See `/analysis/components/{block-name}.md` for detailed technical specifications

---

## Legend

| Field | Description |
|---|---|
| **ID** | Unique story identifier (DOCEDS-###) |
| **Block** | EDS block name (folder under `/blocks/`) |
| **Priority** | Critical / High / Medium / Low |
| **Complexity** | S (Simple) / M (Medium) / C (Complex) |
| **Status** | Done / Ready / Backlog |
| **Spec** | Link to detailed component spec file |

---

## User Stories

### Global / Foundation

| ID | Title | Block | Priority | Complexity | Status | Spec |
|---|---|---|---|---|---|---|
| DOCEDS-001 | Hero Banner Block | `hero` | Critical | M | Done | [hero.md](components/hero.md) |
| DOCEDS-002 | Global Navigation Header | `navigation` | Critical | C | Ready | [navigation.md](components/navigation.md) |
| DOCEDS-003 | Global Footer | `footer` | Critical | M | Ready | [footer.md](components/footer.md) |
| DOCEDS-004 | Breadcrumb Navigation | `breadcrumb` | High | S | Ready | [breadcrumb.md](components/breadcrumb.md) |

### Content Blocks

| ID | Title | Block | Priority | Complexity | Status | Spec |
|---|---|---|---|---|---|---|
| DOCEDS-005 | Section Introduction | `section-intro` | High | S | Ready | [section-intro.md](components/section-intro.md) |
| DOCEDS-006 | Accordion | `accordion` | High | S | Ready | [accordion.md](components/accordion.md) |
| DOCEDS-007 | Tabs | `tabs` | High | M | Ready | [tabs.md](components/tabs.md) |
| DOCEDS-008 | Content Box | `content-box` | Medium | S | Ready | [content-box.md](components/content-box.md) |
| DOCEDS-009 | Section Highlights | `highlights` | Medium | M | Ready | [highlights.md](components/highlights.md) |
| DOCEDS-010 | Two Columns | `columns` | Medium | S | Ready | [columns.md](components/columns.md) |

### Media Blocks

| ID | Title | Block | Priority | Complexity | Status | Spec |
|---|---|---|---|---|---|---|
| DOCEDS-011 | Image with Caption | `image` | High | S | Ready | [image.md](components/image.md) |
| DOCEDS-012 | Image Carousel | `carousel` | Medium | M | Ready | [carousel.md](components/carousel.md) |
| DOCEDS-013 | Video Embed | `video` | Medium | M | Ready | [video.md](components/video.md) |
| DOCEDS-014 | Iframe Embed | `embed` | Low | S | Backlog | [embed.md](components/embed.md) |

### Navigation / Cards

| ID | Title | Block | Priority | Complexity | Status | Spec |
|---|---|---|---|---|---|---|
| DOCEDS-015 | Cards Grid | `cards` | High | M | Ready | [cards.md](components/cards.md) |
| DOCEDS-016 | Action Cards | `action-cards` | High | M | Ready | [action-cards.md](components/action-cards.md) |
| DOCEDS-017 | Link Tiles | `link-tiles` | High | M | Ready | [link-tiles.md](components/link-tiles.md) |
| DOCEDS-018 | Page Tiles | `page-tiles` | Medium | M | Ready | [page-tiles.md](components/page-tiles.md) |
| DOCEDS-019 | Fridge Magnets | `fridge-magnets` | Medium | M | Ready | [fridge-magnets.md](components/fridge-magnets.md) |
| DOCEDS-020 | Call to Action | `cta` | High | S | Ready | [cta.md](components/cta.md) |

### Alerts / Status

| ID | Title | Block | Priority | Complexity | Status | Spec |
|---|---|---|---|---|---|---|
| DOCEDS-021 | Alert Banner | `alerts` | High | M | Ready | [alerts.md](components/alerts.md) |
| DOCEDS-022 | Badge | `badge` | Low | S | Backlog | [badge.md](components/badge.md) |

### Search / Filter / Interactive

| ID | Title | Block | Priority | Complexity | Status | Spec |
|---|---|---|---|---|---|---|
| DOCEDS-023 | Site Search | `search` | High | C | Ready | [search.md](components/search.md) |
| DOCEDS-024 | Faceted Filter | `filter` | Medium | C | Ready | [filter.md](components/filter.md) |
| DOCEDS-025 | Interactive Map | `map` | Medium | C | Ready | [map.md](components/map.md) |
| DOCEDS-026 | Hotspot Region Map | `hotspot-map` | Medium | C | Ready | [hotspot-map.md](components/hotspot-map.md) |
| DOCEDS-027 | Things To Do | `things-to-do` | Medium | C | Ready | [things-to-do.md](components/things-to-do.md) |
| DOCEDS-028 | Concessionaires | `concessionaires` | Low | M | Backlog | [concessionaires.md](components/concessionaires.md) |

### Social / Utility

| ID | Title | Block | Priority | Complexity | Status | Spec |
|---|---|---|---|---|---|---|
| DOCEDS-029 | Page Feedback | `feedback` | Medium | M | Ready | [feedback.md](components/feedback.md) |
| DOCEDS-030 | Save to List | `save-list` | Medium | M | Ready | [save-list.md](components/save-list.md) |
| DOCEDS-031 | Related Content | `related-content` | Medium | S | Ready | [related-content.md](components/related-content.md) |
| DOCEDS-032 | Secondary Navigation | `secondary-nav` | Medium | S | Ready | [secondary-nav.md](components/secondary-nav.md) |
| DOCEDS-033 | Pagination | `pagination` | Medium | M | Ready | [pagination.md](components/pagination.md) |
| DOCEDS-034 | Back to Top | `back-to-top` | Low | S | Backlog | [back-to-top.md](components/back-to-top.md) |

### Campaign

| ID | Title | Block | Priority | Complexity | Status | Spec |
|---|---|---|---|---|---|---|
| DOCEDS-035 | Hero Video | `hero-video` | Low | M | Backlog | [hero-video.md](components/hero-video.md) |
| DOCEDS-036 | Counter/Stats | `counter` | Low | M | Backlog | [counter.md](components/counter.md) |
| DOCEDS-037 | Background Section | `background-section` | Low | S | Backlog | [background-section.md](components/background-section.md) |
| DOCEDS-038 | Widget Container | `widget` | Medium | M | Ready | [widget.md](components/widget.md) |

---

## Story Details

### DOCEDS-001: Hero Banner Block

**As a** content author, **I want to** create hero banners with background images and overlaid titles **so that** section landing pages have a strong visual introduction.

**Acceptance Criteria:**
- AC1: Full-width background image with responsive srcset
- AC2: Title in translucent white box (opacity 0.85) overlaid at bottom-left of image
- AC3: Subtitle bar below image spanning full width on white background
- AC4: No-image variant supported
- AC5: Mobile-responsive with stacked layout
- AC6: Image caption/attribution on hover

**Status:** ✅ Done — See `/blocks/hero/`

---

### DOCEDS-002: Global Navigation Header

**As a** site visitor, **I want to** navigate the site using a responsive mega-navigation header **so that** I can quickly find content across all sections.

**Acceptance Criteria:**
- AC1: Desktop: Full mega-nav with 6 primary sections, expandable sub-menus
- AC2: Mobile: Hamburger menu with slide-in panel
- AC3: Integrated search bar accessible from all pages
- AC4: DOC logo links to homepage
- AC5: Sticky/fixed header on scroll with reduced height
- AC6: Current section highlighted in nav
- AC7: Keyboard accessible (Tab, Enter, Escape)
- AC8: Skip-to-content link for screen readers

---

### DOCEDS-003: Global Footer

**As a** site visitor, **I want to** access utility links, social media, and government branding in the footer **so that** I can find secondary navigation and contact information.

**Acceptance Criteria:**
- AC1: Feedback widget ("Was this page helpful?" with yes/no + form)
- AC2: Social media links (Facebook, Instagram, YouTube, Blog)
- AC3: Utility links (Careers, News, About us, Contact, Copyright, Privacy, OIA)
- AC4: NZ Government logo with link
- AC5: Responsive stacking on mobile

---

### DOCEDS-004: Breadcrumb Navigation

**As a** site visitor, **I want to** see my current location in the site hierarchy **so that** I can navigate back to parent sections.

**Acceptance Criteria:**
- AC1: Auto-generated from page URL path
- AC2: Home > Section > Sub-section > Current Page
- AC3: Last item (current page) is plain text, not linked
- AC4: Truncation with ellipsis on mobile for deep paths
- AC5: Schema.org BreadcrumbList structured data

---

### DOCEDS-005: Section Introduction

**As a** content author, **I want to** display a lead paragraph below the hero banner **so that** visitors get an immediate overview of the section.

**Acceptance Criteria:**
- AC1: Full-width white bar below hero image
- AC2: Lead text in DOC green (`#47665E`) with larger font
- AC3: Max-width 961px centred
- AC4: Optional save-to-list button alongside
- AC5: Supports rich text (bold, links)

---

### DOCEDS-006: Accordion

**As a** content author, **I want to** organize lengthy content into collapsible sections **so that** users can scan topics and expand only what interests them.

**Acceptance Criteria:**
- AC1: Multiple panels with heading + expandable body
- AC2: Click header to toggle open/close
- AC3: Only one panel open at a time (optional: allow multiple)
- AC4: Chevron icon rotates on expand
- AC5: Accessible with ARIA attributes (aria-expanded, role)
- AC6: Print: all panels expanded

---

### DOCEDS-007: Tabs

**As a** content author, **I want to** display content in tabbed panels **so that** users can switch between related views (e.g., Map/List, Overview/Activities).

**Acceptance Criteria:**
- AC1: Horizontal tab bar with active tab highlight
- AC2: Click tab to show corresponding panel
- AC3: First tab active by default
- AC4: Keyboard navigation (Arrow keys, Tab, Enter)
- AC5: ARIA tablist/tab/tabpanel roles
- AC6: Responsive: tabs stack or become scrollable on mobile

---

### DOCEDS-008: Content Box

**As a** content author, **I want to** highlight important content in a bordered/shaded box **so that** key information stands out from body text.

**Acceptance Criteria:**
- AC1: Bordered box with optional background colour
- AC2: Supports rich text content (headings, paragraphs, lists, links)
- AC3: Variants: default (grey bg), info (blue border), warning (yellow border)
- AC4: Responsive padding

---

### DOCEDS-009: Section Highlights

**As a** content author, **I want to** showcase key content in a coloured highlight band **so that** important programs or initiatives are visually prominent.

**Acceptance Criteria:**
- AC1: Full-width background colour band
- AC2: Contains heading + card grid (2-4 cards)
- AC3: Cards link to detail pages
- AC4: Configurable background colour
- AC5: Responsive: cards stack on mobile

---

### DOCEDS-010: Two Columns

**As a** content author, **I want to** display content in a two-column layout **so that** related content can be shown side by side.

**Acceptance Criteria:**
- AC1: Two equal columns at desktop
- AC2: Stacks to single column on mobile
- AC3: Each column supports rich text, images, links
- AC4: Optional ratio variants (60/40, 70/30)

---

### DOCEDS-011: Image with Caption

**As a** content author, **I want to** insert images with captions and attribution **so that** photo credits are properly displayed.

**Acceptance Criteria:**
- AC1: Full-width or inline image
- AC2: Caption text below image
- AC3: Attribution/credit line (photographer, source)
- AC4: Responsive image with srcset
- AC5: Optional lightbox on click

---

### DOCEDS-012: Image Carousel

**As a** content author, **I want to** display multiple images in a scrollable carousel **so that** photo galleries are compact and browsable.

**Acceptance Criteria:**
- AC1: Horizontal carousel with prev/next arrows
- AC2: Dot indicators for current position
- AC3: Touch swipe support on mobile
- AC4: Image captions visible per slide
- AC5: Lazy loading for off-screen images
- AC6: Accessible: aria-label, keyboard navigation

---

### DOCEDS-013: Video Embed

**As a** content author, **I want to** embed YouTube/Vimeo videos **so that** multimedia content enriches the page.

**Acceptance Criteria:**
- AC1: Responsive 16:9 iframe embed
- AC2: YouTube and Vimeo URL support
- AC3: Optional poster/thumbnail image before play
- AC4: Optional lightbox mode (click to open fullscreen)
- AC5: Lazy loading (facade pattern for performance)

---

### DOCEDS-014: Iframe Embed

**As a** content author, **I want to** embed third-party content via iframe **so that** external tools/widgets can be integrated.

**Acceptance Criteria:**
- AC1: Configurable iframe src URL
- AC2: Configurable height/width
- AC3: Responsive container
- AC4: Title attribute for accessibility

---

### DOCEDS-015: Cards Grid

**As a** content author, **I want to** display content teasers in a card grid **so that** visitors can browse and select from multiple items.

**Acceptance Criteria:**
- AC1: Card with image, title, description, and link
- AC2: Grid layout: 3 columns desktop, 2 tablet, 1 mobile
- AC3: Equal height cards in each row
- AC4: Hover effect on card image
- AC5: Optional badge/tag on card
- AC6: Supports product cards (with activity/difficulty/duration metadata)

---

### DOCEDS-016: Action Cards

**As a** content author, **I want to** create visually impactful CTA cards with background images **so that** key campaigns and calls-to-action are prominent.

**Acceptance Criteria:**
- AC1: Full-bleed background image per card
- AC2: Overlay text (heading + short description)
- AC3: Text colour contrast on dark images (white text with shadow)
- AC4: Clickable entire card
- AC5: Carousel variant for multiple action cards
- AC6: Optional category pills/tags above heading

---

### DOCEDS-017: Link Tiles

**As a** content author, **I want to** create clickable navigation tiles **so that** users can quickly navigate to child pages.

**Acceptance Criteria:**
- AC1: Tile with icon/image + title + optional description
- AC2: Grid layout (2-4 columns)
- AC3: Hover effect (background colour change)
- AC4: Entire tile is clickable
- AC5: Parks variant with activity icons
- AC6: Auto-generated from child pages (optional)

---

### DOCEDS-018: Page Tiles

**As a** content author, **I want to** display page link tiles with images **so that** visually rich navigation panels guide users to content.

**Acceptance Criteria:**
- AC1: Tile with background image + title overlay
- AC2: Grid or carousel layout
- AC3: Responsive (2-3 columns desktop, 1-2 mobile)
- AC4: Touch swipe in carousel mode

---

### DOCEDS-019: Fridge Magnets

**As a** content author, **I want to** display a grid of icon-based quick-links **so that** users can quickly find activities by type.

**Acceptance Criteria:**
- AC1: Grid of square tiles with icon + label
- AC2: Icons represent activity types (walking, camping, cycling, etc.)
- AC3: 4-6 columns on desktop, 2-3 on mobile
- AC4: Click navigates to filtered results
- AC5: Hover effect with colour shift
- AC6: Configurable icon + label + URL per tile

---

### DOCEDS-020: Call to Action

**As a** content author, **I want to** create full-width CTA banners **so that** important actions are prominently highlighted.

**Acceptance Criteria:**
- AC1: Full-width coloured background band
- AC2: Heading + description + button
- AC3: Button links to target URL
- AC4: Configurable background colour (DOC green, DOC yellow, custom)
- AC5: Responsive: text and button stack on mobile
- AC6: Optional secondary button

---

### DOCEDS-021: Alert Banner

**As a** content manager, **I want to** display alert banners for track closures and warnings **so that** visitors are informed of safety issues.

**Acceptance Criteria:**
- AC1: Dismissible banner at top of page or within content
- AC2: Severity levels: warning (yellow), danger (red), info (blue)
- AC3: Icon + message text + optional link
- AC4: Multiple alerts stack vertically
- AC5: Collapse/expand functionality
- AC6: API-driven content (alerts may come from external system)

---

### DOCEDS-022: Badge

**As a** content author, **I want to** display status badges on cards **so that** items show metadata like "New", "Popular", or difficulty level.

**Acceptance Criteria:**
- AC1: Small coloured label/tag
- AC2: Variants: status (new, updated), difficulty (easy, moderate, hard)
- AC3: Positioned on card image or header

---

### DOCEDS-023: Site Search

**As a** site visitor, **I want to** search the entire site **so that** I can find specific content quickly.

**Acceptance Criteria:**
- AC1: Search input with submit button
- AC2: Results displayed as cards with title, description, URL
- AC3: Pagination for results
- AC4: Search term highlighting in results
- AC5: "No results" state with suggestions
- AC6: Integration with existing DOC search API or Algolia
- AC7: Auto-suggestions/typeahead (optional)

---

### DOCEDS-024: Faceted Filter

**As a** site visitor, **I want to** filter content by multiple criteria **so that** I can narrow down places, activities, or species.

**Acceptance Criteria:**
- AC1: Multiple filter dropdowns (multi-select)
- AC2: Filter categories: Region, Activity type, Difficulty, Facilities, etc.
- AC3: Results update on filter change (no page reload)
- AC4: Active filter pills shown with remove option
- AC5: Clear all filters button
- AC6: Result count displayed
- AC7: Results as card grid or list
- AC8: Mobile: filters in collapsible panel

---

### DOCEDS-025: Interactive Map

**As a** site visitor, **I want to** view locations on an interactive map **so that** I can find places geographically.

**Acceptance Criteria:**
- AC1: Leaflet.js map with NZ centred
- AC2: Location markers with popup info
- AC3: Marker clustering at zoom levels
- AC4: Click marker to view details
- AC5: Map/List view toggle
- AC6: Responsive map container
- AC7: Track/trail lines on map (optional)

---

### DOCEDS-026: Hotspot Region Map

**As a** site visitor, **I want to** select a region from a visual NZ map **so that** I can browse content by geographic area.

**Acceptance Criteria:**
- AC1: SVG map of NZ with clickable regions
- AC2: Hover highlight on region
- AC3: Click navigates to region page
- AC4: Region labels visible
- AC5: Accessible: keyboard focusable regions
- AC6: Mobile: list fallback or pinch-to-zoom

---

### DOCEDS-027: Things To Do

**As a** site visitor, **I want to** see activities available at a specific place **so that** I can plan my visit.

**Acceptance Criteria:**
- AC1: Activity listing with icon, name, brief description
- AC2: Filter tabs by activity type
- AC3: Concessionaires sub-section for commercial operators
- AC4: Link to activity detail pages
- AC5: Integrated with place detail page (tabs block)

---

### DOCEDS-028: Concessionaires

**As a** site visitor, **I want to** find commercial operators for DOC activities **so that** I can book guided tours or services.

**Acceptance Criteria:**
- AC1: Search/filter by activity and region
- AC2: Operator cards with name, contact, description
- AC3: Link to operator website
- AC4: Pagination for results

---

### DOCEDS-029: Page Feedback

**As a** site visitor, **I want to** provide feedback on page helpfulness **so that** DOC can improve content quality.

**Acceptance Criteria:**
- AC1: "Was this page helpful?" with Yes/No buttons
- AC2: On "No": expand textarea for comments
- AC3: Submit sends to feedback API
- AC4: Confirmation message after submit
- AC5: reCAPTCHA protection
- AC6: Positioned in footer area

---

### DOCEDS-030: Save to List

**As a** a registered/anonymous user, **I want to** save pages to a personal list **so that** I can plan my trip with favourite places and activities.

**Acceptance Criteria:**
- AC1: Heart/bookmark icon on cards and pages
- AC2: Click toggles save state
- AC3: Saved items persisted (localStorage or API)
- AC4: "My DOC" page to view all saved items
- AC5: Share saved list via URL

---

### DOCEDS-031: Related Content

**As a** content author, **I want to** display related links below content **so that** visitors discover more relevant pages.

**Acceptance Criteria:**
- AC1: Section with heading "Related" or "You may also like"
- AC2: List of 3-6 related page links with titles
- AC3: Auto-generated from taxonomy or manually curated
- AC4: Positioned after main content, before footer

---

### DOCEDS-032: Secondary Navigation

**As a** content author, **I want to** add secondary navigation links **so that** users can access popular or related sections from within a page.

**Acceptance Criteria:**
- AC1: Horizontal or vertical link list
- AC2: Configurable heading
- AC3: Active/current page highlighted
- AC4: Responsive stacking

---

### DOCEDS-033: Pagination

**As a** site visitor, **I want to** navigate through paginated results **so that** I can browse large content lists.

**Acceptance Criteria:**
- AC1: Page numbers with prev/next arrows
- AC2: Current page highlighted
- AC3: Ellipsis for large page ranges
- AC4: Accessible (aria-label on navigation)
- AC5: Works with search and filter blocks

---

### DOCEDS-034: Back to Top

**As a** site visitor, **I want to** quickly return to the top of the page **so that** I don't have to scroll long pages.

**Acceptance Criteria:**
- AC1: Floating button appears after scrolling past threshold
- AC2: Smooth scroll to top on click
- AC3: Fixed position bottom-right
- AC4: Accessible label

---

### DOCEDS-035: Hero Video

**As a** content author, **I want to** use video as the hero background **so that** campaign pages have dynamic visual impact.

**Acceptance Criteria:**
- AC1: Auto-playing muted video background
- AC2: Fallback poster image for slow connections
- AC3: Title overlay on video
- AC4: Pause/play control
- AC5: Mobile: show poster image instead of video

---

### DOCEDS-036: Counter/Stats

**As a** content author, **I want to** display animated statistics **so that** key numbers (hectares protected, species saved) are impactful.

**Acceptance Criteria:**
- AC1: Number animates from 0 to target on scroll-into-view
- AC2: Label text below number
- AC3: Grid of 2-4 counters
- AC4: Configurable prefix/suffix (e.g., "$", "%", "+")
- AC5: Intersection Observer for trigger

---

### DOCEDS-037: Background Section

**As a** content author, **I want to** wrap content in a full-width coloured section **so that** visual breaks separate content areas.

**Acceptance Criteria:**
- AC1: Full-width background colour or image
- AC2: Contained content area (max-width)
- AC3: Configurable colour
- AC4: Content within section uses standard blocks

---

### DOCEDS-038: Widget Container

**As a** content author, **I want to** display homepage widgets with titles and card content **so that** the homepage showcases blog posts, featured content, and media releases.

**Acceptance Criteria:**
- AC1: Section with heading + content area
- AC2: Content area contains card grid
- AC3: "View all" link to section landing page
- AC4: 3 widgets typically displayed on homepage
- AC5: Responsive: full-width stacking on mobile
