# Video Embed — EDS Block Specification

> **Block ID:** DOCEDS-013  
> **Block Folder:** `blocks/video/`  
> **Priority:** Medium  
> **Complexity:** M  
> **Source Components:** doc-video-iframe-container, abn-video-lightbox

---

## User Story

**As a** visitor, **I want to** watch embedded videos directly on the page **so that** I can learn about conservation topics through rich media without leaving the site.

## Description

The Video Embed block renders responsive YouTube or Vimeo embeds within page content. On the live DOC NZ site, the `doc-video-iframe-container` component handles inline responsive embeds using a 16:9 aspect ratio wrapper, while `abn-video-lightbox` opens the video in a modal overlay triggered by a play button on a thumbnail image. Both variants are used across various content pages for conservation stories, instructional content, and promotional campaigns.

In EDS, the block implements a facade (lite embed) pattern for performance: instead of loading the heavy YouTube/Vimeo iframe on page load, it renders a static thumbnail with a play button overlay. The actual iframe loads only when the user clicks play. This approach dramatically improves LCP and reduces third-party JavaScript until interaction. The lightbox variant uses a simple modal overlay with a close button and focus trapping for accessibility.

The block must handle both YouTube and Vimeo URLs, extracting the video ID to construct the appropriate embed URL and thumbnail. An optional caption or title can appear below the video.

## Acceptance Criteria

1. YouTube URLs render a facade thumbnail with a play button overlay.
2. Vimeo URLs render a facade thumbnail with a play button overlay.
3. Clicking the play button replaces the thumbnail with the responsive iframe embed.
4. Iframe uses `16:9` aspect ratio maintained at all viewport widths.
5. Lightbox variant opens a modal overlay with the video centred.
6. Lightbox modal has a close button, closes on Escape key, and traps focus.
7. No third-party iframe or scripts load until user interaction (facade pattern).
8. Optional caption text renders below the inline video embed.
9. Video embed is keyboard-accessible (play button focusable, Enter/Space activates).
10. Block handles malformed or missing video URLs gracefully with a fallback message.

## Technical Notes for EDS

### DOM Structure
```html
<!-- Inline variant (facade) -->
<div class="video">
  <div class="video-facade" data-video-url="https://www.youtube.com/watch?v=VIDEO_ID" data-video-type="youtube">
    <img class="video-thumbnail" src="https://img.youtube.com/vi/VIDEO_ID/maxresdefault.jpg" alt="Video: Title of the video" loading="lazy" width="1280" height="720">
    <button class="video-play-btn" aria-label="Play video: Title of the video">
      <svg class="video-play-icon" viewBox="0 0 68 48" aria-hidden="true">
        <path d="M66.52 7.74c-.78-2.93-2.49-5.41-5.42-6.19C55.79.13 34 0 34 0S12.21.13 6.9 1.55c-2.93.78-4.64 3.26-5.42 6.19C.06 13.05 0 24 0 24s.06 10.95 1.48 16.26c.78 2.93 2.49 5.41 5.42 6.19C12.21 47.87 34 48 34 48s21.79-.13 27.1-1.55c2.93-.78 4.64-3.26 5.42-6.19C67.94 34.95 68 24 68 24s-.06-10.95-1.48-16.26z" fill="red"/>
        <path d="M45 24L27 14v20" fill="white"/>
      </svg>
    </button>
  </div>
  <p class="video-caption">Learn about kiwi conservation in Northland.</p>
</div>

<!-- Lightbox variant -->
<div class="video lightbox">
  <div class="video-facade" data-video-url="https://www.youtube.com/watch?v=VIDEO_ID" data-video-type="youtube" data-lightbox="true">
    <img class="video-thumbnail" src="https://img.youtube.com/vi/VIDEO_ID/maxresdefault.jpg" alt="Video: Title of the video" loading="lazy" width="1280" height="720">
    <button class="video-play-btn" aria-label="Play video in lightbox: Title of the video">
      <svg class="video-play-icon" viewBox="0 0 68 48" aria-hidden="true">
        <path d="M66.52 7.74c-.78-2.93-2.49-5.41-5.42-6.19C55.79.13 34 0 34 0S12.21.13 6.9 1.55c-2.93.78-4.64 3.26-5.42 6.19C.06 13.05 0 24 0 24s.06 10.95 1.48 16.26c.78 2.93 2.49 5.41 5.42 6.19C12.21 47.87 34 48 34 48s21.79-.13 27.1-1.55c2.93-.78 4.64-3.26 5.42-6.19C67.94 34.95 68 24 68 24s-.06-10.95-1.48-16.26z" fill="red"/>
        <path d="M45 24L27 14v20" fill="white"/>
      </svg>
    </button>
  </div>
</div>

<!-- Modal (injected by JS on lightbox play) -->
<div class="video-modal" role="dialog" aria-modal="true" aria-label="Video player">
  <div class="video-modal-backdrop"></div>
  <div class="video-modal-content">
    <button class="video-modal-close" aria-label="Close video">&times;</button>
    <div class="video-responsive">
      <iframe src="https://www.youtube.com/embed/VIDEO_ID?autoplay=1" allow="autoplay; encrypted-media" allowfullscreen title="Video title"></iframe>
    </div>
  </div>
</div>
```

### CSS Requirements
```css
.video {
  margin: var(--spacing-m) 0;
}

.video-facade {
  position: relative;
  cursor: pointer;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  border-radius: var(--border-radius-s, 4px);
  background: #000;
}

.video-thumbnail {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.video-play-btn {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: none;
  border: none;
  cursor: pointer;
  width: 68px;
  height: 48px;
  transition: opacity 0.2s;
}

.video-facade:hover .video-play-btn {
  opacity: 0.85;
}

.video-responsive {
  position: relative;
  aspect-ratio: 16 / 9;
  width: 100%;
}

.video-responsive iframe {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  border: none;
}

.video-caption {
  font-size: var(--font-size-s, 0.875rem);
  color: var(--color-text-secondary, #555);
  padding: var(--spacing-xs) 0;
}

/* Lightbox modal */
.video-modal {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
}

.video-modal-backdrop {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.85);
}

.video-modal-content {
  position: relative;
  width: 90vw;
  max-width: 960px;
  z-index: 1;
}

.video-modal-close {
  position: absolute;
  top: -40px;
  right: 0;
  color: white;
  background: none;
  border: none;
  font-size: 2rem;
  cursor: pointer;
}

@media (max-width: 768px) {
  .video-modal-content {
    width: 100vw;
  }
}
```

### JS Requirements
```
- Facade click handler: on play button click, replace the facade div with a responsive iframe.
  - Parse data-video-url to extract video ID and provider (youtube/vimeo).
  - YouTube embed: https://www.youtube.com/embed/{ID}?autoplay=1
  - Vimeo embed: https://player.vimeo.com/video/{ID}?autoplay=1
- Lightbox handler: if data-lightbox="true", open modal instead of inline replacement.
  - Create modal DOM, inject iframe, append to body.
  - Trap focus inside modal (close button and iframe).
  - Close on Escape key or backdrop click.
  - Restore focus to the play button on close.
- Thumbnail resolution: for YouTube, use maxresdefault.jpg with hqdefault.jpg fallback.
  For Vimeo, fetch thumbnail via oEmbed API if needed, or use author-provided image.
```

### Document Authoring (Google Docs)
Authors create a **Video** block using a single-column table:

| Video                                              |
|----------------------------------------------------|
| https://www.youtube.com/watch?v=VIDEO_ID           |
| Caption text describing the video (optional)       |

For lightbox variant:

| Video (lightbox)                                   |
|----------------------------------------------------|
| https://www.youtube.com/watch?v=VIDEO_ID           |
| ![Custom thumbnail](thumbnail-url) (optional)      |
| Caption text (optional)                            |

- **Row 1:** Full YouTube or Vimeo URL.
- **Row 2:** Optional caption text or custom thumbnail image.
- **Row 3:** Optional caption if Row 2 is a thumbnail.
- Block name variant `Video (lightbox)` triggers the modal variant.

## AI Implementation Instructions

### Mandatory Skills
- Adobe Experience Modernization
- EDS Block Development

### Validation Loop
Use Chrome MCP iteratively to verify DOM output against the original site's functional requirements at https://www.doc.govt.nz/ before marking the task complete.

### Reference
- Live URL: https://www.doc.govt.nz/ (various content pages with video embeds)
- Vue source: doc-video-iframe-container, abn-video-lightbox
- CSS classes: `video-iframe-container`, `video-lightbox`, `video-facade`, `video-responsive`
