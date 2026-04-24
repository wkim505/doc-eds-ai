# User Story: Video Block

## Summary
Implement a `video` EDS block to replace the `DocVideoIframeContainer` Vue component on the DOC NZ website.

## User Story
**As a** DOC content author,  
**I want to** embed YouTube videos on a page using a document link,  
**So that** I can share conservation stories, nature documentaries, and visitor guides (such as the kākāpō nest cam) without needing developer involvement.

## Background
DOC NZ uses YouTube-hosted videos across the site — campaign content (Always Be Naturing), species footage, visitor guides, and live streams (e.g. kākāpō nest cam on Whenua Hou). The existing `DocVideoIframeContainer` wraps YouTube iframes. EDS handles YouTube embeds natively via its `embed` block, but a DOC-specific `video` block is needed for consistent caption styling, privacy-enhanced embeds, and lazy loading.

## Acceptance Criteria

### AC1 — YouTube embed rendering
- **Given** a page document contains a `video` block with a YouTube URL,  
- **When** the page loads,  
- **Then** the video renders in a 16:9 responsive iframe with the YouTube player.

### AC2 — Lazy loading / facade pattern
- **Given** a video block is on the page,  
- **When** the page initially loads,  
- **Then** the video does not load the full YouTube iframe until the user clicks a play button (poster image + play icon facade), reducing initial page weight and improving CLS/LCP scores.

### AC3 — Poster image
- **Given** a video block has a YouTube URL,  
- **When** the facade renders,  
- **Then** the YouTube video thumbnail is used as the poster image (fetched from `img.youtube.com`), or an authored override image is used if provided.

### AC4 — Optional caption
- **Given** a video block includes a caption row,  
- **When** the video renders,  
- **Then** the caption appears below the video player with appropriate font styling (smaller than body text, colour matching section theme).

### AC5 — Privacy-enhanced embed
- **Given** a YouTube URL is authored,  
- **When** the iframe src is constructed,  
- **Then** the URL uses `youtube-nocookie.com` to comply with DOC's privacy obligations.

### AC6 — Accessible play button
- **Given** the video facade is displayed,  
- **When** inspected with a screen reader or keyboard,  
- **Then** the play button is focusable, has `aria-label` describing the video (e.g. "Play: Kākāpō nest cam live"), and can be activated with `Enter` or `Space`.

### AC7 — Responsive on mobile
- **Given** the video block is viewed on a mobile device,  
- **When** the page loads,  
- **Then** the video maintains 16:9 aspect ratio, is full-width within the content column, and does not overflow.

### AC8 — Live stream support
- **Given** a YouTube live stream URL is provided,  
- **When** the block renders,  
- **Then** it embeds correctly, showing the live player (no thumbnail facade needed for live streams).

## Live Reference

| Variant | Live URL | Notes |
|---|---|---|
| YouTube embed — NZSL | https://www.doc.govt.nz/parks-and-recreation/know-before-you-go/land-safety-code/ | NZSL sign language video with caption |
| YouTube embed — species | https://www.doc.govt.nz/nature/native-animals/birds/birds-a-z/kiwi/ | Kiwi species documentary video |
| YouTube embed — campaign | https://www.doc.govt.nz/get-involved/conservation-activities/ | ABN campaign storytelling video |
| Live stream embed | https://www.doc.govt.nz/ | Kākāpō nest cam (Whenua Hou; seasonal) |

> **Note:** The site is a Vue.js SPA — full rendering requires a JavaScript-enabled browser.

## Variants

| Variant | Block Name | Description |
|---|---|---|
| Standard YouTube | `video` | YouTube embed with facade poster image and play button |
| With caption | `video` | Caption and attribution displayed below the video player |
| Without caption | `video` | Video only; no text below |
| Live stream | `video (live)` | YouTube live stream URL; loads iframe directly (no facade) |
| Privacy-enhanced | `video` | Always uses `youtube-nocookie.com` domain (default for all variants) |

## Technical Notes
- Replaces: `DocVideoIframeContainer`
- YouTube embed domain: `https://www.youtube-nocookie.com/embed/{videoId}`
- Facade poster: `https://img.youtube.com/vi/{videoId}/maxresdefault.jpg`
- Aspect ratio maintained via `aspect-ratio: 16/9` CSS property
- Live stream detection: URL contains `/live/` or `?v=` with live parameter

## Definition of Done
- [ ] Block renders correctly in EDS preview and live
- [ ] All 8 acceptance criteria pass
- [ ] Facade pattern verified: no YouTube network request until play is clicked
- [ ] Privacy-enhanced URL verified in browser devtools
- [ ] Keyboard and screen reader access verified
- [ ] Authored and verified in SharePoint/Google Drive document
- [ ] Code reviewed and merged
- [ ] Documented with authoring guide
