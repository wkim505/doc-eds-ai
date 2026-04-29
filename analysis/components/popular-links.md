# Popular Links Block — Component Specification

## User Story
**DOCEDS-016**
**As a** content author, **I want to** display popular/trending links within navigation dropdowns **so that** visitors can quickly access high-traffic pages.

## Description
Renders in the header dropdown's additional-content slot. Shows curated popular links for each section with a label heading.

## Source Vue Components
- `DocPopularLinks` — receives `label` and `:links` props

## Source HTML
```html
<doc-popular-links label="Parks &amp; recreation" :links="[
  {\"Heading\":\"Walking & tramping\",\"Slug\":\"walking-tramping\",\"Link\":\"/parks-and-recreation/things-to-do/walking-and-tramping/\",\"SecondaryLinks\":[]},
  ...
]" />
```

## Data Format
```json
{
  "Heading": "Walking & tramping",
  "Slug": "walking-tramping",
  "Link": "/parks-and-recreation/things-to-do/walking-and-tramping/",
  "SecondaryLinks": []
}
```

## Acceptance Criteria
1. Renders in header dropdown additional-content slot
2. Label heading for section context (e.g., "Parks & recreation")
3. List of popular links with Heading and Link
4. Per-section curated content
5. Must be authorable via Universal Editor

## Technical Notes for EDS
### Block Structure
```
popular-links (sub-component of header)
├── label (section name)
└── links[]
    └── link (heading + href)
```

## AI Implementation Instructions
### Mandatory Skills
- `building-blocks` — EDS block JS/CSS structure and decoration

### Validation Loop
Use Chrome MCP to verify popular links render in header dropdowns.

## Live References
| Variation | URL |
|-----------|-----|
| Parks & Recreation dropdown | https://www.doc.govt.nz/ (header nav) |
| Nature dropdown | https://www.doc.govt.nz/ (header nav) |
