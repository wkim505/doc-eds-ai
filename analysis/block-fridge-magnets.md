# User Story: Fridge Magnets Block

## Summary
Implement a `fridge-magnets` EDS block to replace the `DocFridgeMagnetGroup` Vue component on the DOC NZ website, displaying a group of activity cards styled as "fridge magnet" tiles for the Always Be Naturing campaign.

## User Story
**As a** DOC campaign content author,  
**I want to** display a grid of conservation activity tiles in the "fridge magnet" campaign style,  
**So that** visitors are inspired to take specific conservation actions (e.g. "Plant a native", "Remove a weed", "Count birds") in a fun and visually engaging format.

## Background
The `DocFridgeMagnetGroup` component renders a distinctive grid of activity tiles for the Always Be Naturing (ABN) campaign. Each tile resembles a fridge magnet with a bold icon, short activity label, and optional link. They are used on the ABN campaign pages and the Get Involved section to communicate that conservation activities can be simple and fun.

## Acceptance Criteria

### AC1 — Fridge magnet grid rendering
- **Given** a page document contains a `fridge-magnets` block with multiple rows of icon, label, and optional link,  
- **When** the page renders,  
- **Then** tiles display in a responsive grid (5-up on desktop, 3-up on tablet, 2-up on mobile) with the fridge magnet visual style (rounded corners, slight rotation/skew, drop shadow).

### AC2 — Icon display
- **Given** a fridge magnet tile row includes an icon (image or SVG reference),  
- **When** rendered,  
- **Then** the icon is displayed centred within the tile at a consistent size.

### AC3 — Activity label
- **Given** a tile has a label,  
- **When** rendered,  
- **Then** the label text is displayed below the icon in a bold, short font, with text wrapping limited to 2 lines maximum.

### AC4 — Linked tiles
- **Given** a tile includes a link URL,  
- **When** the user clicks the tile,  
- **Then** the user is navigated to the linked page or activity detail.

### AC5 — Non-linked tiles
- **Given** a tile does not include a link URL,  
- **When** rendered,  
- **Then** the tile renders as a non-interactive visual element (no `<a>` tag, no hover underline).

### AC6 — Random subtle rotation
- **Given** fridge magnet tiles render,  
- **When** displayed,  
- **Then** each tile has a small CSS rotation (between -3° and +3°, pseudo-randomly assigned via `nth-child`) to simulate the fridge magnet aesthetic.

### AC7 — Reduced motion support
- **Given** a user has `prefers-reduced-motion: reduce` set,  
- **When** tiles render,  
- **Then** the rotation is removed and tiles display flat without any transform.

### AC8 — Accessible tile labels
- **Given** a fridge magnet tile renders,  
- **When** inspected with a screen reader,  
- **Then** linked tiles have descriptive `aria-label` values (activity label used as link text), and non-linked tiles have their label text accessible.

### AC9 — Mobile layout
- **Given** the block is viewed on mobile (< 768px),  
- **When** rendered,  
- **Then** tiles display in a 2-up grid with adequate spacing and no overflow.

## Live Reference

| Variant | Live URL | Notes |
|---|---|---|
| ABN activity magnets | https://www.doc.govt.nz/get-involved/conservation-activities/ | Full grid of fridge magnet activity tiles |
| Predator Free magnets | https://www.doc.govt.nz/nature/pests-and-threats/predator-free-2050/ | "Get involved" activity magnet section |

> **Note:** The fridge magnet component is part of the ABN campaign and rendered via Vue.js. Open the above URLs in a JavaScript-enabled browser to see the rotated tile grid in context.

## Variants

| Variant | Block Name | Description |
|---|---|---|
| Full grid | `fridge-magnets` | All available activity tiles in a responsive 5-up/3-up/2-up grid |
| Linked tiles | `fridge-magnets` | Tiles with URLs navigate to the activity detail page |
| Non-linked tiles | `fridge-magnets` | Decorative/informational only; no click behaviour |
| With rotation | `fridge-magnets` | Default: tiles have subtle CSS rotation for fridge magnet aesthetic |
| Flat (reduced motion) | `fridge-magnets` | No rotation applied; respects `prefers-reduced-motion` |

## Technical Notes
- Replaces: `DocFridgeMagnetGroup`
- Campaign context: ABN (Always Be Naturing)
- Rotation: CSS `transform: rotate(Xdeg)` using `nth-child(n)` selectors cycling through `[-3, 1, -1, 2, -2, 3]deg`
- `prefers-reduced-motion`: override all transforms to `none`
- Icon: inline SVG or `<img>` referencing `/icons/` directory

## Definition of Done
- [ ] Block renders correctly in EDS preview and live
- [ ] All 9 acceptance criteria pass
- [ ] Rotation aesthetic verified against original `DocFridgeMagnetGroup` design
- [ ] Reduced motion verified
- [ ] Mobile grid verified at 375px
- [ ] Authored and verified in SharePoint/Google Drive document
- [ ] Code reviewed and merged
- [ ] Documented with authoring guide
