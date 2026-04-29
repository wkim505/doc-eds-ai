# Favourites / Save to List Block — Component Specification

## User Story
**DOCEDS-031**
**As a** site visitor, **I want to** save places and activities to a personal list **so that** I can plan my visits.

## Description
Personal favourites system allowing visitors to save pages. Uses localStorage for anonymous users and account sync for authenticated users.

## Source Vue Components
- `DocMyFavourites` — favourites list page
- `DocSaveToList` — save toggle button on content pages

## Acceptance Criteria
1. Heart/star icon to save items on content pages
2. Client-side localStorage for anonymous users
3. Authenticated sync for logged-in users
4. Dedicated "My saved list" page at `/parks-and-recreation/my-saved-list/`
5. Toggle state visual feedback (filled vs outline icon)
6. Must be authorable via Universal Editor

## Technical Notes for EDS
### JS Requirements
- localStorage read/write for anonymous bookmarks
- API sync for authenticated users
- Toggle state management
- List page rendering from stored items

### Block Structure
```
save-to-list (inline component)
├── toggle-icon (heart/star, filled/outline)
└── label ("Save to list" / "Saved")

favourites-page (block)
├── heading ("My saved list")
└── saved-items[]
    ├── thumbnail
    ├── title (linked)
    └── remove-button
```

## AI Implementation Instructions
### Mandatory Skills
- `building-blocks` — EDS block JS/CSS structure and decoration

### Validation Loop
Use Chrome MCP to verify save/unsave toggle and list page.

## Live References
| Variation | URL |
|-----------|-----|
| Save toggle on content | https://www.doc.govt.nz/parks-and-recreation/ |
| My saved list page | https://www.doc.govt.nz/parks-and-recreation/my-saved-list/ |
