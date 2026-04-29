# Standard Product Card Block — Component Specification

## User Story
**DOCEDS-006**
**As a** content author, **I want to** display content items as cards with image, title, description, and link **so that** visitors can browse and discover content.

## Description
The standard product card is the most frequently used card component across the site. It renders content items as visual cards with thumbnail, title, description, and link. Used in widget containers (Blog, Featured, Media Releases), listing pages, and search results.

## Source Vue Components
- `DocStandardProductCard` — standard DOC card
- `AbnStandardProductCard` — "Always Be Naturing" themed variant

## Variants
1. **Default**: Thumbnail + title + description + link
2. **Blog**: Includes publication date, sourced from WordPress blog
3. **Media Release**: Date-stamped news items
4. **Summary horizontal list** (`summary-h-list` class): Horizontal card layout for category pages
5. **ABN variant**: "Always Be Naturing" themed styling

## Acceptance Criteria
1. Thumbnail image (lazy loaded) from EPiServer thumbnailer
2. Title rendered as heading link to target page
3. Description text (truncated to ~2 lines)
4. Blog variant includes formatted date
5. Responsive: card grid on desktop (2-4 columns), stacked on mobile
6. Summary horizontal list variant for category pages
7. Images use `/thumbs/large/` path for thumbnails
8. Must be authorable via Universal Editor

## Technical Notes for EDS
### CSS Requirements
- Card container with image, title, description layout
- Grid: 1 col mobile, 2-3 col tablet, 3-4 col desktop
- Truncated description with line-clamp
- Hover state: subtle shadow or border change

### JS Requirements
- Lazy loading for card images
- Optional date formatting for blog/media release variants

### Block Structure
```
cards (block)
├── card[]
│   ├── image (thumbnail)
│   ├── title (linked heading)
│   ├── description (truncated)
│   └── date (optional, blog/media variant)
```

## AI Implementation Instructions
### Mandatory Skills
- `building-blocks` — EDS block JS/CSS structure and decoration
- `content-driven-development` — For authoring model

### Validation Loop
Use Chrome MCP iteratively to verify:
1. Cards render in grid layout
2. Images lazy load correctly
3. Titles link to correct target pages
4. Blog variant shows date
5. Responsive layout works across breakpoints

## Live References
| Variation | URL |
|-----------|-----|
| Blog cards (homepage) | https://www.doc.govt.nz/ |
| Featured cards (homepage) | https://www.doc.govt.nz/ |
| Media release cards (homepage) | https://www.doc.govt.nz/ |
| Category listing | https://www.doc.govt.nz/nature/native-animals/ |
| Section highlights | https://www.doc.govt.nz/nature/ |
