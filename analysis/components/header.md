# Header Block — Component Specification

## User Story
**DOCEDS-001**
**As a** site visitor, **I want to** see a consistent header with DOC branding, mega-navigation, search, and authentication **so that** I can navigate to any section of the site efficiently.

## Description
The header is the primary global navigation component across all pages of www.doc.govt.nz. It consists of a gold accent bar, a green header bar with the DOC logo, four section-based mega-navigation items with colored dropdowns, a global site search, authentication indicator, and an "Always Be Naturing" CTA badge. On mobile, it collapses into a hamburger navigation.

## Source Vue Components
- `DocHeader` — main header container
- `DocHamburgerNav` / `DocHamburgerNavItem` — mobile navigation
- `DocPopoverNav` / `DocPopoverNavItem` — desktop popover mega-menu
- `DocHeaderNavItemMainLink` / `DocHeaderNavItemSubLink` — nav link items
- `DocMainLogo` — DOC logo (white variant)
- `DocNZGovLogo` — NZ Government logo
- `DocAuthenticationIndicator` — login/logout/favourites
- `DocHeaderResponsiveIconLink` — responsive icon links
- `DocSiteSearch` — search in header
- `DocPopularLinks` — popular links panel in dropdown

## Acceptance Criteria
1. Gold accent bar (10px height, `bg-doc-gold-500`) spans full width at top
2. Green header bar (`bg-doc-green-500`) with standard padding, min-height 132px mobile / 88px desktop
3. White DOC logo links to homepage `/`
4. Four main navigation items with section-colored dropdowns:
   - Parks & Recreation → colour="ranginui" (blue) → link="/parks-and-recreation/"
   - Nature → colour="paptuanuku" (green/brown) → link="/nature/"
   - Get Involved → colour="atawhenua" (teal) → link="/get-involved/"
   - Our Work → colour="weta" (orange/amber) → link="/our-work/"
5. Each dropdown contains sub-links and a "Popular" quick-links panel (DocPopularLinks)
6. Popular links are JSON arrays with Heading, Slug, Link, SecondaryLinks properties
7. Global search input with autocomplete at `search/autocomplete`, results redirect to `search-results/?query=`
8. Authentication indicator shows login link (links to `/footer-links/online-service-accounts/?returnUrl=...`)
9. Wishlist links: "My favourites" → `/parks-and-recreation/my-saved-list/`, "Sign out" → `/account/signout?returnUrl=...`
10. ABN CTA badge: SVG image at `/globalassets/graphics/abn-logos/shape_e-logo-107-px---15-degrees---for-testing-only.svg`, links to `https://www.doc.govt.nz/always-be-naturing`
11. Print mode: shows text "Department of Conservation | Te Papa Atawhai" with URL
12. Responsive: collapses to hamburger menu below 768px (md breakpoint)
13. Skip-to-content link targets `#main-heading`
14. Must be authorable via Universal Editor for nav items, popular links, and CTA

## Technical Notes for EDS
### CSS Requirements
- Custom Tailwind tokens: `doc-green-500`, `doc-gold-500`, `bg-tara-iti`
- Section color system: `ranginui`, `paptuanuku`, `atawhenua`, `weta`
- Responsive breakpoints: mobile-first, md (768px), lg (1024px)
- Skeleton state: `v-if="skeleton"` placeholder with gold bar + green bar min-heights
- Font: Zilla Slab (preloaded from Google Fonts)

### JS Requirements
- Hover/click toggle for mega-menu dropdowns (useHoverToggle composable)
- Hamburger menu open/close with animation
- Sticky header behavior (optional enhancement)
- Search autocomplete with debounced API calls to `/search/autocomplete`
- Authentication state management (localStorage + session)

### Block Structure
```
header (auto block)
├── gold-accent-bar
├── header-bar
│   ├── logo
│   ├── nav-items[]
│   │   ├── main-link (heading, link, colour)
│   │   ├── sub-links[] (heading, link, colour)
│   │   └── popular-links (label, links[])
│   ├── auth-indicator
│   ├── abn-cta
│   └── site-search
└── hamburger-nav (mobile)
```

## AI Implementation Instructions
### Mandatory Skills
- `content-driven-development` - Orchestrates the entire workflow — never skip this
- `analyze-and-plan` - Defines acceptance criteria before writing code
- `content-modeling` - Designs the table structure authors work with
- `building-blocks` - The actual implementation guide
- `testing-blocks` - Browser validation is explicitly marked MANDATORY
- `code-review` - End-of-development quality gate
- `block-collection-and-party` - Any time you want reference implementations to start from — called during building-blocks
- `find-test-content` - Modifying an existing block — finds live pages already using it
- `doc-search` - When you hit an unfamiliar EDS feature and web search doesn't surface aem.live docs
- `block-inventory` - Useful when you need to know what blocks already exist before modeling new ones

### Validation Loop
Use Chrome MCP iteratively to verify:
1. Gold bar renders at correct height and color
2. All 4 nav sections open dropdowns with correct section colors
3. Popular links render in dropdown additional-content slot
4. Search autocomplete fires on keystrokes
5. Mobile hamburger menu opens/closes with correct animation
6. ABN CTA badge renders SVG correctly
7. Skip-to-content link works
8. Print stylesheet shows text-only header

## Live References
| Variation | URL |
|-----------|-----|
| Homepage header | https://www.doc.govt.nz/ |
| Section page header | https://www.doc.govt.nz/nature/native-animals/ |
| Standard page header | https://www.doc.govt.nz/our-work/predator-free-2050/ |
| Search page header | https://www.doc.govt.nz/parks-and-recreation/things-to-do/walking-and-tramping/ |
