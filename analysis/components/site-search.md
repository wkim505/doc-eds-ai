# Site Search Block — Component Specification

## User Story
**DOCEDS-005**
**As a** site visitor, **I want to** search for content across the entire DOC website **so that** I can quickly find specific information.

## Description
Global search with autocomplete. Available in the header (compact) and as a standalone search block. Uses EPiServer Find (`dl.episerver.net`) for search indexing.

## Source Vue Components
- `DocSiteSearch` — search input with autocomplete
- Props: `id`, `:has-button`, `place-holder`, `query-url`, `auto-complete-url`, `class`

## Source HTML
```html
<doc-site-search id="global-search-from-header"
                 :has-button="false"
                 place-holder="Search..."
                 query-url="search-results/?query="
                 auto-complete-url="search/autocomplete"
                 class="justify-center h-5 md:h-4 md:min-w-[160px]" />
```

## Acceptance Criteria
1. Search input with placeholder "Search..."
2. Autocomplete suggestions from `/search/autocomplete` endpoint
3. Results redirect to `/search-results/?query=`
4. Header variant: compact, no button (`:has-button="false"`)
5. Standalone variant: with submit button
6. Accessible: `role="search"`, label, keyboard navigable suggestions
7. Must be authorable via Universal Editor

## Technical Notes for EDS
### CSS Requirements
- Header variant: `justify-center h-5 md:h-4 md:min-w-[160px]`
- Autocomplete dropdown styling

### JS Requirements
- Debounced fetch to `/search/autocomplete` on input
- Keyboard navigation of suggestions (up/down/enter)
- Form submission redirects to results page

### Block Structure
```
search (block)
├── input (search field)
├── autocomplete-dropdown
│   └── suggestion[]
└── submit-button (optional)
```

## AI Implementation Instructions
### Mandatory Skills
- `building-blocks` — EDS block JS/CSS structure and decoration

### Validation Loop
Use Chrome MCP to verify autocomplete fires and results redirect works.

## Live References
| Variation | URL |
|-----------|-----|
| Header search | https://www.doc.govt.nz/ (in header) |
| Search results | https://www.doc.govt.nz/search-results/?query=kiwi |
