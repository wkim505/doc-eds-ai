# Tabs Block — Component Specification

## User Story
**DOCEDS-022**
**As a** content author, **I want to** organize content into tabbed panels **so that** visitors can switch between related content sections.

## Description
Tabbed content panels for organizing related information into switchable views. Commonly used for multi-faceted content.

## Source Vue Components
- `DocTabs`

## Acceptance Criteria
1. Tab bar with clickable tab labels
2. Panel content switches on tab selection
3. Accessible: `role="tablist"`, `role="tab"`, `role="tabpanel"`
4. `aria-selected="true"` on active tab
5. `aria-controls` linking tab to panel
6. Keyboard: arrow keys to navigate tabs, Tab to enter panel
7. Responsive: may stack or convert to accordion on mobile
8. Rich text content within tab panels
9. Must be authorable via Universal Editor

## Technical Notes for EDS
### CSS Requirements
- Tab bar with active indicator (border-bottom or background)
- Panel container with consistent height or auto-height
- Active tab styling vs inactive

### JS Requirements
- Tab click handler
- Panel show/hide logic
- Keyboard navigation (left/right arrows)
- ARIA attribute management

### Block Structure
```
tabs (block)
├── tab-list (role="tablist")
│   └── tab[] (role="tab")
└── tab-panel[] (role="tabpanel")
    └── content (rich text)
```

## AI Implementation Instructions
### Mandatory Skills
- `building-blocks` — EDS block JS/CSS structure and decoration

### Validation Loop
Use Chrome MCP to verify:
1. Tabs switch panels correctly
2. ARIA roles are correct
3. Keyboard navigation works

## Live References
| Variation | URL |
|-----------|-----|
| Content pages with tabs | https://www.doc.govt.nz/parks-and-recreation/know-before-you-go/ |
