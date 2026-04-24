# User Story: Species Detail Block

## Summary
Implement a `species-detail` EDS block to display structured scientific and conservation information for native New Zealand species on individual species profile pages.

## User Story
**As a** DOC NZ website visitor,  
**I want to** see key biological and conservation facts about a native species (e.g. kiwi, kākāpō, tuatara) displayed in a structured, accessible format,  
**So that** I can learn about New Zealand's unique biodiversity, understand conservation status, and know how to help protect the species.

## Background
DOC NZ maintains hundreds of species profile pages for native animals, plants, and fungi. Each profile contains structured data: scientific name, conservation status (under the New Zealand Threat Classification System), size/weight, distribution, diet, threats, and recovery programme links. This information must be authored in a consistent document-based format and rendered with appropriate scientific and accessibility standards.

## Acceptance Criteria

### AC1 — Species summary panel
- **Given** a page document contains a `species-detail` block with rows for common name, scientific name, conservation status, and key stats,  
- **When** the page renders,  
- **Then** a structured summary panel displays all fields in a clearly labelled format with appropriate typography (scientific name in italics).

### AC2 — Conservation status badge
- **Given** the block includes a New Zealand Threat Classification System (NZTCS) status value (e.g. "Nationally Critical", "Nationally Endangered", "Nationally Vulnerable", "At Risk", "Not Threatened"),  
- **When** rendered,  
- **Then** the status is displayed as a colour-coded badge (red = Nationally Critical/Endangered/Vulnerable, amber = At Risk, green = Not Threatened) with a link to the conservation status methodology page.

### AC3 — Scientific name formatting
- **Given** the block includes a scientific name (e.g. *Strigops habroptilus*),  
- **When** rendered in HTML,  
- **Then** the scientific name is wrapped in `<em>` (italic) tags with `lang` attribute set appropriately.

### AC4 — Key facts list
- **Given** the block includes rows for size, weight, lifespan, diet, and distribution,  
- **When** rendered,  
- **Then** each fact is displayed as an icon + label + value pair in a structured list.

### AC5 — Distribution map
- **Given** the block includes a distribution/range map image or ArcGIS URL,  
- **When** rendered,  
- **Then** the distribution map is displayed with a caption and alt text describing the species' NZ distribution range.

### AC6 — Recovery programme link
- **Given** the species has an active DOC recovery programme,  
- **When** the block is rendered,  
- **Then** a "Learn about the [Species] Recovery Programme" link appears, pointing to the relevant Our Work page.

### AC7 — Photo gallery integration
- **Given** the species page includes a `carousel` block alongside the species-detail block,  
- **When** rendered,  
- **Then** the carousel integrates visually with the species-detail panel without layout conflict.

### AC8 — Bilingual naming (Te Reo Māori)
- **Given** a species has a Māori name (e.g. kākāpō, tūī, pāteke),  
- **When** the block renders,  
- **Then** the Māori name is displayed prominently alongside the English common name, wrapped in `<span lang="mi">` with correct macron rendering.

### AC9 — Schema.org structured data
- **Given** a species-detail block renders,  
- **When** the page source is inspected,  
- **Then** `Schema.org/Taxon` JSON-LD structured data is included with `taxonRank`, `scientificName`, and `vernacularName` fields populated.

### AC10 — Accessible layout
- **Given** a species-detail block is rendered,  
- **When** inspected with a screen reader,  
- **Then** all fields have descriptive labels, the conservation status badge communicates its meaning as text (not only via colour), and the distribution map has a non-empty `alt` attribute.

## Live Reference

| Variant | Live URL | Notes |
|---|---|---|
| Bird species | https://www.doc.govt.nz/nature/native-animals/birds/birds-a-z/kiwi/ | Kiwi profile with conservation status, biology, distribution |
| Reptile/amphibian | https://www.doc.govt.nz/nature/native-animals/reptiles-and-frogs/ | Tuatara and gecko profiles |
| Native plant | https://www.doc.govt.nz/nature/native-plants/ | Plant species profiles |
| Threatened species | https://www.doc.govt.nz/nature/conservation-status/ | NZTCS status listings |

> **Note:** Individual species pages are rendered via Vue.js. Open in a browser and use DevTools to inspect the structured species data fields.

## Variants

| Variant | Block Name | Description |
|---|---|---|
| Standard species | `species-detail` | Full profile: name, status, stats, distribution, recovery link |
| Nationally Critical | `species-detail` | Red badge; recovery programme link prominent |
| Not Threatened | `species-detail` | Green badge; no recovery programme link |
| Plant species | `species-detail (plant)` | Replaces animal-specific fields (diet, lifespan) with plant equivalents (habitat, growth form) |
| Without distribution map | `species-detail` | Stats panel only; no map image available |
| With Māori name | `species-detail` | Displays Māori name in `<span lang="mi">` above English name |

## Technical Notes
- Replaces: Optimizely `SpeciesPage` content type structured fields
- NZTCS status colour coding: Nationally Critical/Endangered/Vulnerable = `#F44336`, At Risk = `#FF9800`, Not Threatened = `#4CAF50`
- Māori name: `<span lang="mi">` with font supporting Unicode macrons (Zilla Slab supports Latin Extended)
- Schema.org type: `Taxon` (under `biodiversity` vocabulary)
- Scientific name: `<em lang="la">`

## Definition of Done
- [ ] Block renders correctly in EDS preview and live
- [ ] All 10 acceptance criteria pass
- [ ] Māori name macrons render correctly in Zilla Slab font
- [ ] Schema.org JSON-LD validated
- [ ] Colour-blind-safe status badges verified (colour + text label)
- [ ] Screen reader tested
- [ ] Authored and verified in SharePoint/Google Drive document
- [ ] Code reviewed and merged
- [ ] Documented with authoring guide and data migration mapping
