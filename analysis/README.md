# EDS Block User Stories — Index

**Project:** DOC NZ → Adobe Edge Delivery Services Migration  
**Purpose:** User stories for each EDS block required for the migration. Each file is formatted for ingestion by Atlassian Rovo AI to generate Jira tickets.

---

## Block Inventory

| # | Block | File | Complexity | Replaces |
|---|---|---|---|---|
| 1 | Hero | [block-hero.md](block-hero.md) | Low | `DocBanner` |
| 2 | Cards | [block-cards.md](block-cards.md) | Low | `DocRelatedSection`, `DocChildPageLinks`, `DocProductSet` |
| 3 | Accordion | [block-accordion.md](block-accordion.md) | Low | `DocAccordion`, `DocShowHide` |
| 4 | Tabs | [block-tabs.md](block-tabs.md) | Medium | `DocTabs` |
| 5 | Carousel | [block-carousel.md](block-carousel.md) | Medium | `DocImageCarousel` |
| 6 | CTA | [block-cta.md](block-cta.md) | Low | `DocCallToAction` |
| 7 | Alert | [block-alert.md](block-alert.md) | Low | `DocAlerts` |
| 8 | Video | [block-video.md](block-video.md) | Low | `DocVideoIframeContainer` |
| 9 | Link List | [block-link-list.md](block-link-list.md) | Low | `DocPopularLinks`, `DocChildPageLinks` |
| 10 | Map | [block-map.md](block-map.md) | High | `DocMap`, `DocHotSpotMap` |
| 11 | Search | [block-search.md](block-search.md) | High | `DocParksRecSearch` |
| 12 | Site Search | [block-site-search.md](block-site-search.md) | High | `DocSiteSearch`, `DocCmsSearch` |
| 13 | Contacts | [block-contacts.md](block-contacts.md) | Medium | `DocGenericContactsPanel` |
| 14 | Region Selector | [block-region-selector.md](block-region-selector.md) | Medium | `DocRegionSelectorPanel` |
| 15 | Trail Detail | [block-trail-detail.md](block-trail-detail.md) | High | Optimizely `TrackPage` type |
| 16 | Accommodation Detail | [block-accommodation-detail.md](block-accommodation-detail.md) | High | Optimizely `HutPage`, `CampsitePage` types |
| 17 | Species Detail | [block-species-detail.md](block-species-detail.md) | High | Optimizely `SpeciesPage` type |
| 18 | Category Filter | [block-category-filter.md](block-category-filter.md) | Medium | `DocMultiCategory`, `DocSingleCategory` |
| 19 | Concessionaire | [block-concessionaire.md](block-concessionaire.md) | High | `DocConcessionaireList`, `DocConcessionaireFormBlock` |
| 20 | Campaign Cards | [block-campaign-cards.md](block-campaign-cards.md) | Medium | `AbnActionCard`, `AbnCounterCard`, `AbnPageTileCarousel`, `AbnStandardProductCard` |
| 21 | News Feed | [block-news-feed.md](block-news-feed.md) | Medium | Optimizely news listing |
| 22 | Form | [block-form.md](block-form.md) | Medium | `EPiServerForms` |
| 23 | Saved List | [block-saved-list.md](block-saved-list.md) | High | `DocMyFavourites` |
| 24 | Lightbox | [block-lightbox.md](block-lightbox.md) | Medium | `DocLightBox` |
| 25 | Mega Nav | [block-mega-nav.md](block-mega-nav.md) | Medium | `DocPopoverNav`, `DocHamburgerNav` |
| 26 | Fridge Magnets | [block-fridge-magnets.md](block-fridge-magnets.md) | Medium | `DocFridgeMagnetGroup` |
| 27 | Things To Do | [block-things-to-do.md](block-things-to-do.md) | Medium | `DocThingsToDo` |
| 28 | Data Filter | [block-data-filter.md](block-data-filter.md) | High | `DocCustomDataFilter` |
| 29 | Auth Status | [block-auth-status.md](block-auth-status.md) | High | `DocAuthenticationIndicator` |

---

## Complexity Summary

| Complexity | Count | Blocks |
|---|---|---|
| 🟢 Low | 6 | hero, cards, accordion, cta, alert, video, link-list |
| 🟡 Medium | 13 | tabs, carousel, contacts, region-selector, category-filter, campaign-cards, news-feed, form, lightbox, mega-nav, fridge-magnets, things-to-do |
| 🔴 High | 10 | map, search, site-search, trail-detail, accommodation-detail, species-detail, concessionaire, saved-list, data-filter, auth-status |

---

## Suggested Jira Epic Structure

```
Epic: EDS Block Library
  ├── Story: [Low complexity blocks]   — Sprint 1–2
  ├── Story: [Medium complexity blocks] — Sprint 3–5
  └── Story: [High complexity blocks]  — Sprint 5–8

Epic: Search Re-platform            — Critical path
Epic: Content Migration Tooling     — Parallel workstream
Epic: Integration & API Contracts   — Dependency on DOC API team
```

---

## File Format Notes for Rovo AI

Each block file follows this structure:
- **Summary** — one-line description for Jira ticket title
- **User Story** — standard As a / I want / So that format
- **Background** — context for the ticket description
- **Acceptance Criteria** — Given/When/Then format, numbered (AC1–ACn)
- **Technical Notes** — implementation guidance for story points estimation
- **Definition of Done** — checklist items for ticket completion
