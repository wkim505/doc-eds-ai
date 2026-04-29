# Breadcrumb Block — Component Specification

## User Story
**DOCEDS-003**
**As a** site visitor, **I want to** see a breadcrumb trail showing my current location in the site hierarchy **so that** I can navigate back to parent sections.

## Description
Breadcrumb navigation appears on all pages except the homepage. It shows the hierarchical path from Home to the current page. Data is passed as a JSON array with Heading, Link, and CssClasses properties.

## Source Vue Components
- `DocBreadcrumb` — renders breadcrumb links from `:breadcrumb-links` prop

## Source HTML Structure
```html
<div class="doc-main-layout__breadcrumb">
  <div class="doc-main-layout__breadcrumb__content">
    <div id="breadcrumbnav" class="breadcrumb">
      <nav aria-label="Breadcrumb">
        <doc-breadcrumb :breadcrumb-links="[...]" />
      </nav>
    </div>
  </div>
</div>
```

## Breadcrumb Data Format
```json
[
  {"Heading":"Home","Link":"/","CssClasses":"home"},
  {"Heading":"Nature","Link":"/nature/","CssClasses":null},
  {"Heading":"Native animals","Link":null,"CssClasses":"current"}
]
```
- First item always "Home" with CssClasses "home"
- Last item has `Link: null` and CssClasses "current" (non-linked)
- Intermediate items have active links

## Acceptance Criteria
1. Displays hierarchical path: Home → Section → Sub-section → Current page
2. "Home" always first item, linked to `/`
3. Current page always last, non-linked, CssClasses="current"
4. Wrapped in `<nav aria-label="Breadcrumb">` for accessibility
5. Hidden on homepage (StartPage)
6. Separator between items (CSS chevron or `>` character)
7. Auto-generated from page hierarchy (not manually authored)
8. Must handle deep nesting (e.g., 5+ levels for species detail pages)

## Technical Notes for EDS
### CSS Requirements
- Container: `.doc-main-layout__breadcrumb` with `.doc-main-layout__breadcrumb__content`
- Inner: `#breadcrumbnav.breadcrumb`
- Standard EDS auto-block or metadata-driven

### JS Requirements
- None (server-rendered from page hierarchy)
- In EDS: auto-generated from content tree path

### Block Structure
```
breadcrumb (auto block / metadata)
├── home-link
├── separator
├── parent-link(s)
├── separator
└── current-page (text only)
```

## AI Implementation Instructions
### Mandatory Skills
- `block-collection-and-party` — Auto-block pattern
- `building-blocks` — EDS block JS/CSS structure and decoration

### Validation Loop
Use Chrome MCP iteratively to verify:
1. Breadcrumb renders on section pages (not homepage)
2. Links are clickable and navigate correctly
3. Current page is non-linked
4. `<nav aria-label="Breadcrumb">` is present
5. Deep paths (5+ levels) render correctly

## Live References
| Variation | URL | Path |
|-----------|-----|------|
| 2 levels | https://www.doc.govt.nz/nature/native-animals/ | Home → Nature → Native animals |
| 3 levels | https://www.doc.govt.nz/nature/pests-and-threats/predator-free-2050/ | Home → Nature → Pests & threats → Predator Free 2050 |
| Section page | https://www.doc.govt.nz/get-involved/volunteer/ | Home → Get involved → Volunteer |
| Hidden (homepage) | https://www.doc.govt.nz/ | N/A |
