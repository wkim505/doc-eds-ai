# Hero Video — EDS Block Specification

> **Block ID:** DOCEDS-035  
> **Block Folder:** `blocks/hero-video/`  
> **Priority:** Low  
> **Complexity:** M  
> **Source Components:** abn-hero-video-container

---

## User Story

**As a** site visitor landing on a campaign page, **I want to** see an immersive full-width video background with an overlay title **so that** I am immediately engaged with the campaign content.

## Description

The Hero Video block renders a full-width auto-playing, muted, looping video as a background behind a title overlay. It is used on campaign and promotional pages to create a visually impactful first impression. The video plays silently in the background while a semi-transparent overlay ensures text readability. A poster image provides the fallback for mobile devices, slow connections, and browsers with autoplay restrictions.

On the Vue site, `abn-hero-video-container` manages the video element, poster fallback logic, and responsive behaviour. On mobile viewports, the video is typically replaced with the poster image to reduce data usage and improve performance. The component listens for the `canplay` event to swap from poster to video seamlessly.

In EDS, the block should use the native HTML5 `<video>` element with `autoplay`, `muted`, `loop`, and `playsinline` attributes. A `<picture>` or `<img>` element provides the poster fallback. The overlay text is positioned absolutely over the video. The block should detect mobile viewports and skip video loading entirely, showing only the poster image.

## Acceptance Criteria

1. Video auto-plays on desktop viewports (muted, looping).
2. Video has `playsinline` attribute for iOS compatibility.
3. Poster image displays immediately while video loads.
4. On mobile (viewport ≤ 768px), only the poster image is shown — video source is not loaded.
5. Title text overlay is readable against the video/image background (semi-transparent overlay).
6. Video fills the full container width and maintains aspect ratio (cropped if necessary via `object-fit: cover`).
7. Block has a maximum height constraint to prevent excessively tall heroes.
8. `prefers-reduced-motion` media query pauses/hides the video and shows the poster.
9. Block is accessible: video has `aria-hidden="true"` (decorative), title is in a heading element.
10. Video file format supports modern browsers: MP4 (H.264) primary, WebM optional.

## Technical Notes for EDS

### DOM Structure
```html
<div class="hero-video-block">
  <div class="hero-video-media">
    <video class="hero-video" autoplay muted loop playsinline aria-hidden="true"
           poster="/media/campaign-poster.jpg">
      <source src="/media/campaign-video.mp4" type="video/mp4" />
      <source src="/media/campaign-video.webm" type="video/webm" />
    </video>
    <img class="hero-video-poster" src="/media/campaign-poster.jpg" alt=""
         loading="eager" />
  </div>
  <div class="hero-video-overlay">
    <div class="hero-video-content">
      <h1 class="hero-video-title">Protect Our Wild Places</h1>
      <p class="hero-video-subtitle">Join us in conserving New Zealand's natural heritage</p>
      <a href="/get-involved/" class="hero-video-cta">Get involved</a>
    </div>
  </div>
</div>
```

### CSS Requirements
```css
/* Block container */
.hero-video-block {
  position: relative; width: 100%; max-height: 80vh;
  overflow: hidden; background: #000;
}

/* Video and poster */
.hero-video-media { width: 100%; height: 100%; }
.hero-video {
  width: 100%; height: 100%; object-fit: cover;
  display: block; min-height: 400px; max-height: 80vh;
}
.hero-video-poster {
  position: absolute; top: 0; left: 0;
  width: 100%; height: 100%; object-fit: cover;
  transition: opacity 0.5s ease;
}
.hero-video-poster.is-hidden { opacity: 0; pointer-events: none; }

/* Overlay */
.hero-video-overlay {
  position: absolute; top: 0; left: 0; right: 0; bottom: 0;
  background: linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.6) 100%);
  display: flex; align-items: center; justify-content: center;
}
.hero-video-content { text-align: center; color: #fff; padding: 24px; max-width: 700px; }
.hero-video-title { font-size: 3rem; font-weight: 700; margin: 0 0 12px; text-shadow: 0 2px 8px rgba(0,0,0,0.3); }
.hero-video-subtitle { font-size: 1.25rem; margin: 0 0 24px; opacity: 0.9; }
.hero-video-cta {
  display: inline-block; padding: 14px 32px;
  background: var(--color-primary); color: #fff;
  border-radius: 4px; text-decoration: none; font-weight: 600;
  transition: background 0.15s;
}
.hero-video-cta:hover { background: var(--color-primary-dark); }

/* Mobile: poster only */
@media (max-width: 768px) {
  .hero-video { display: none; }
  .hero-video-poster { position: relative; min-height: 300px; }
  .hero-video-title { font-size: 2rem; }
  .hero-video-subtitle { font-size: 1rem; }
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  .hero-video { display: none; }
  .hero-video-poster { position: relative; }
}
```

### JS Requirements
- On desktop: when the `<video>` fires `canplay` event, add `.is-hidden` to the poster image to fade it out.
- On mobile (check `matchMedia('(max-width: 768px)')`): remove `<source>` elements from `<video>` to prevent loading, ensure poster is visible.
- Listen for `prefers-reduced-motion` change: pause video and show poster if motion is reduced.
- Lazy-load video: only start loading when the block is near the viewport (use `IntersectionObserver` with a rootMargin). Since this is a hero block, it will typically be at the top and load immediately.
- If video fails to load (error event), ensure poster remains visible and no broken UI appears.

### Document Authoring (Google Docs)

Authors create a **Hero Video** table in Google Docs:

| Hero Video   |                                               |
|--------------|-----------------------------------------------|
| video        | /media/campaign-video.mp4                     |
| poster       | /media/campaign-poster.jpg                    |
| title        | Protect Our Wild Places                       |
| subtitle     | Join us in conserving New Zealand's natural heritage |
| cta-text     | Get involved                                  |
| cta-link     | /get-involved/                                |

- **Row 1:** Block name "Hero Video".
- **video:** URL to the MP4 video file.
- **poster:** URL to the poster/fallback image.
- **title:** Main heading overlay text.
- **subtitle:** Optional subheading text.
- **cta-text/cta-link:** Optional call-to-action button.

## AI Implementation Instructions

### Mandatory Skills
- Adobe Experience Modernization
- EDS Block Development

### Validation Loop
Use Chrome MCP iteratively to verify DOM output against the original site's functional requirements at https://www.doc.govt.nz/ before marking the task complete.

### Reference
- Live URL: Campaign pages on https://www.doc.govt.nz/
- Vue source: abn-hero-video-container
- CSS classes: hero-video-container, hero-video__media, hero-video__overlay, hero-video__content
