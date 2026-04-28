# Iframe Embed — EDS Block Specification

> **Block ID:** DOCEDS-014  
> **Block Folder:** `blocks/embed/`  
> **Priority:** Low  
> **Complexity:** S  
> **Source Components:** doc-generic-iframe

---

## User Story

**As a** content author, **I want to** embed third-party interactive content via iframes **so that** visitors can access external tools, maps, or widgets without leaving the DOC website.

## Description

The Iframe Embed block renders a generic third-party iframe within page content, supporting configurable width, height, and aspect ratio. On the live DOC NZ site, the `doc-generic-iframe` Vue component is used across `/our-work/` pages and various content sections to embed external dashboards, interactive maps, survey forms, and data visualisations from third-party services.

In EDS, this block provides a simple, secure wrapper around an `<iframe>` element with sensible defaults. The iframe is rendered inside a responsive container that maintains the specified aspect ratio or fixed dimensions. A `sandbox` attribute is applied by default for security, with specific permissions configurable. The block also supports a loading placeholder that displays until the iframe content has loaded.

Content authors specify the embed URL and optional dimensions in the Google Docs authoring table. The block validates the URL against an allowlist of permitted domains to prevent embedding of untrusted content.

## Acceptance Criteria

1. Iframe renders with the specified `src` URL.
2. Default aspect ratio of 16:9 is applied when no explicit dimensions are given.
3. Custom width and height values override the default aspect ratio.
4. Iframe includes `sandbox` attribute with appropriate permissions.
5. A `title` attribute is present on the iframe for accessibility.
6. Loading placeholder displays while iframe content loads.
7. Iframe is responsive and scales within its container on all viewports.
8. Only URLs from permitted domains are rendered; others show a fallback message.
9. Block gracefully handles missing or empty URL values.

## Technical Notes for EDS

### DOM Structure
```html
<div class="embed">
  <div class="embed-container" style="aspect-ratio: 16 / 9;">
    <iframe
      src="https://app.example.com/widget/12345"
      title="Interactive conservation data dashboard"
      sandbox="allow-scripts allow-same-origin allow-popups"
      loading="lazy"
      allowfullscreen
    ></iframe>
  </div>
  <p class="embed-caption">Source: Department of Conservation open data portal.</p>
</div>
```

With custom dimensions:
```html
<div class="embed">
  <div class="embed-container" style="width: 100%; height: 600px;">
    <iframe
      src="https://maps.example.com/embed?id=abc"
      title="Interactive map of conservation areas"
      sandbox="allow-scripts allow-same-origin allow-popups"
      loading="lazy"
    ></iframe>
  </div>
</div>
```

### CSS Requirements
```css
.embed {
  margin: var(--spacing-m) 0;
}

.embed-container {
  position: relative;
  width: 100%;
  overflow: hidden;
  border-radius: var(--border-radius-s, 4px);
  background: var(--color-background-secondary, #f5f5f5);
}

.embed-container iframe {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  border: none;
}

.embed-caption {
  font-size: var(--font-size-s, 0.875rem);
  color: var(--color-text-secondary, #555);
  padding: var(--spacing-xs) 0;
}

/* Fixed-height variant: switch from aspect-ratio to explicit height */
.embed-container[style*="height"] iframe {
  position: relative;
}

@media (max-width: 768px) {
  .embed-container {
    border-radius: 0;
  }
}
```

### JS Requirements
```
- On block load: read the iframe src from the block table data.
- Validate src against an allowlist of permitted domains (configurable in a constants file).
- If URL is not permitted, replace iframe with a fallback message and link.
- Optional: listen for iframe load event to remove loading placeholder.
- Set sandbox permissions based on a default set; override if specified in block data.
```

### Document Authoring (Google Docs)
Authors create an **Embed** block using a single-column table:

| Embed                                              |
|----------------------------------------------------|
| https://app.example.com/widget/12345               |
| Title: Interactive conservation data dashboard      |
| Height: 600                                        |
| Caption: Source: DOC open data portal. (optional)  |

- **Row 1:** The full embed URL.
- **Row 2:** `Title:` followed by the accessible title for the iframe.
- **Row 3:** `Height:` followed by a pixel value (optional; defaults to 16:9 aspect ratio).
- **Row 4:** `Caption:` followed by caption text (optional).

Rows 2–4 are optional and can appear in any order. The block parses key-value pairs by the prefix.

## AI Implementation Instructions

### Mandatory Skills
- Adobe Experience Modernization
- EDS Block Development

### Validation Loop
Use Chrome MCP iteratively to verify DOM output against the original site's functional requirements at https://www.doc.govt.nz/ before marking the task complete.

### Reference
- Live URL: https://www.doc.govt.nz/our-work/ (pages with embedded third-party widgets)
- Vue source: doc-generic-iframe
- CSS classes: `generic-iframe`, `iframe-container`
