# User Story: News Feed Block

## Summary
Implement a `news-feed` EDS block to display a dynamic listing of media releases and news articles on the DOC NZ website.

## User Story
**As a** DOC NZ website visitor,  
**I want to** see the latest media releases and news from DOC displayed as a browsable list,  
**So that** I can stay informed about conservation announcements, wildlife updates, and DOC operational news.

## Background
DOC NZ publishes media releases at `/news/media-releases/` and surfaces recent news on the homepage. The current site provides an RSS feed and a CMS-driven list. On EDS migration, the news feed should be driven by the EDS query index or an external news API, with filtering by date and topic.

## Acceptance Criteria

### AC1 — News article list rendering
- **Given** the `news-feed` block is on a page,  
- **When** the page loads,  
- **Then** a list of the most recent news articles renders, each showing: headline, publication date, category/tag, and a short excerpt.

### AC2 — Configurable item count
- **Given** a `news-feed` block specifies a count (e.g. `news-feed (6)`),  
- **When** rendered,  
- **Then** only the specified number of articles are shown (default: 6 for homepage widgets, 12 for listing pages).

### AC3 — "Load more" pagination
- **Given** more articles exist beyond the initial count,  
- **When** the user clicks "Load more",  
- **Then** the next batch of articles is appended below the existing list without a full page reload.

### AC4 — Category/tag filter
- **Given** the news-feed block is on the full media releases listing page,  
- **When** a user selects a topic filter (e.g. "Wildlife", "Tracks & huts", "Pests", "Heritage"),  
- **Then** the feed filters to show only articles tagged with the selected topic.

### AC5 — Date display
- **Given** a news article has a publication date,  
- **When** rendered,  
- **Then** the date is displayed in NZ format (e.g. "23 April 2026") and marked up with a `<time datetime="...">` element.

### AC6 — RSS feed link
- **Given** the news-feed block renders on the media releases page,  
- **When** rendered,  
- **Then** an RSS subscription link is displayed (linking to the site's RSS feed URL) with an RSS icon.

### AC7 — Featured article highlight
- **Given** a news article is marked as `featured` in its metadata,  
- **When** rendered in the news feed,  
- **Then** it appears first in the list with a visually distinct "Featured" badge.

### AC8 — Empty state
- **Given** no news articles match the current filter,  
- **When** rendered,  
- **Then** a message "No news articles found for this topic" is displayed.

### AC9 — Accessible list markup
- **Given** the news feed renders,  
- **When** inspected with a screen reader,  
- **Then** articles are in a proper `<ul>` list, each headline is an `<h3>` link, and dates are in `<time>` elements with `datetime` attributes.

## Live Reference

| Variant | Live URL | Notes |
|---|---|---|
| Full media releases listing | https://www.doc.govt.nz/news/media-releases/ | Paginated list of all DOC media releases |
| Homepage news widget | https://www.doc.govt.nz/ | Latest 3–4 news items on homepage |
| News archive by year | https://www.doc.govt.nz/news/media-releases/2026/ | Annual archive listing |

> **Note:** The news feed is rendered client-side. Open in a JavaScript-enabled browser to see the full listing with pagination and filters.

## Variants

| Variant | Block Name | Description |
|---|---|---|
| Full listing page | `news-feed` | Paginated listing (12 per page) with category filters |
| Homepage widget | `news-feed (compact)` | Shows latest 3–6 items; no filters; "View all" link |
| With topic filter | `news-feed` | Filter pills for topic categories (Wildlife, Tracks, Pests, Heritage) |
| With featured article | `news-feed` | Featured item displayed first with a "Featured" badge |
| With RSS link | `news-feed` | RSS subscription icon and link shown on listing page |
| Empty state | `news-feed` | Message when no articles match the active topic filter |

## Technical Notes
- Replaces: Optimizely CMS news listing
- Data source: EDS query index (`/query-index.json`) filtered by `template: media-release` or equivalent, OR WordPress RSS feed parsed as JSON
- Pagination: 12 articles per page on listing, 6 on homepage widget
- Date format: `new Intl.DateTimeFormat('en-NZ', { dateStyle: 'long' }).format(date)`
- RSS link: `/footer-links/about-this-site/site-help/rss-feed/`

## Definition of Done
- [ ] Block renders correctly in EDS preview and live
- [ ] All 9 acceptance criteria pass
- [ ] Query index includes all media release pages
- [ ] Date formatting verified in NZ locale
- [ ] RSS link verified
- [ ] Screen reader tested
- [ ] Authored and verified in SharePoint/Google Drive document
- [ ] Code reviewed and merged
- [ ] Documented with authoring guide
