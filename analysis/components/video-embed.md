# Video Embed Block — Component Specification

## User Story
**DOCEDS-024**
**As a** content author, **I want to** embed video content (YouTube) **so that** visitors can watch media inline.

## Description
YouTube video embed with responsive container and lazy loading.

## Source Vue Components
- `DocVideoIframeContainer`

## Acceptance Criteria
1. YouTube iframe embed with responsive 16:9 container
2. Lazy loading for performance (load iframe on user interaction or viewport entry)
3. Accessible title attribute on iframe
4. Optional video title/description above embed
5. Must be authorable via Universal Editor

## Technical Notes for EDS
### CSS Requirements
- Responsive 16:9 aspect ratio container (`aspect-ratio: 16/9` or padding-top hack)
- Full-width within content column

### JS Requirements
- Lazy loading: facade pattern (thumbnail + play button, loads iframe on click)
- YouTube API integration (optional)

### Block Structure
```
video-embed (block)
├── title (optional)
├── video-container (16:9)
│   └── iframe (youtube embed)
└── description (optional)
```

## AI Implementation Instructions
### Mandatory Skills
- `building-blocks` — EDS block JS/CSS structure and decoration

### Validation Loop
Use Chrome MCP to verify video renders and plays correctly.

## Live References
| Variation | URL |
|-----------|-----|
| Content pages with video | https://www.doc.govt.nz/our-work/predator-free-2050/ |
