# Call to Action — EDS Block Specification

> **Block ID:** DOCEDS-020  
> **Block Folder:** `blocks/cta/`  
> **Priority:** High  
> **Complexity:** S  
> **Source Components:** doc-call-to-action, doc-call-to-action-section

---

## User Story

**As a** content author, **I want to** add a prominent call-to-action banner with a coloured background **so that** visitors are drawn to key actions like donating, volunteering, or signing up for alerts.

## Description

The Call to Action block renders a full-width coloured banner containing a heading, optional description text, and a prominent CTA button. On the live DOC NZ site, the `doc-call-to-action` and `doc-call-to-action-section` Vue components appear on `/get-involved/` pages, donation pages, and throughout the site wherever a strong visual prompt is needed to drive user action. The component supports multiple colour variants — DOC green (primary brand colour), DOC yellow (alert/highlight), and custom background colours specified via content configuration.

In EDS, the block renders a full-width section with a solid coloured background, centred text content, and a contrasting CTA button. The block breaks out of the content column to span the full viewport width, creating a visual interruption that draws attention. The heading, description, and button are stacked vertically and centred. The button uses a contrasting colour (white on dark backgrounds, dark on light backgrounds) with hover and focus states.

The block supports three built-in colour variants (green, yellow, neutral) and a custom colour option. Authors select the variant through the block name or by specifying a hex colour in the authoring table.

## Acceptance Criteria

1. Banner spans full viewport width regardless of content column width.
2. Heading renders as an `<h2>` (or appropriate level) centred within the banner.
3. Description text renders as a paragraph below the heading.
4. CTA button renders as a prominent, centred link/button below the description.
5. DOC green variant: `#00524e` background, white text, white-bordered button.
6. DOC yellow variant: `#f5a623` background, dark text, dark-bordered button.
7. Neutral variant: `#f5f5f5` background, dark text, green button.
8. Custom colour variant: author-specified hex background with auto-contrasting text.
9. Button has visible hover state (background fill or colour shift).
10. Button has visible focus state (outline) for keyboard navigation.
11. Block is responsive: text and button stack vertically at all breakpoints.
12. Banner has consistent vertical padding (spacing-xl on desktop, spacing-l on mobile).

## Technical Notes for EDS

### DOM Structure
```html
<!-- DOC Green variant -->
<div class="cta cta-green">
  <div class="cta-container">
    <h2 class="cta-heading">Help protect New Zealand's natural heritage</h2>
    <p class="cta-description">Your support funds predator control, habitat restoration, and species recovery programmes across Aotearoa.</p>
    <a href="/get-involved/donate/" class="cta-button">Donate now</a>
  </div>
</div>

<!-- DOC Yellow variant -->
<div class="cta cta-yellow">
  <div class="cta-container">
    <h2 class="cta-heading">Sign up for conservation alerts</h2>
    <p class="cta-description">Get notified about volunteer opportunities, track openings, and conservation news in your region.</p>
    <a href="/get-involved/alerts/" class="cta-button">Sign up</a>
  </div>
</div>

<!-- Custom colour variant -->
<div class="cta" style="--cta-bg: #1a237e; --cta-text: #ffffff;">
  <div class="cta-container">
    <h2 class="cta-heading">Join the Great Kiwi Count</h2>
    <p class="cta-description">Become a citizen scientist and help monitor kiwi populations in your local area.</p>
    <a href="/get-involved/great-kiwi-count/" class="cta-button">Get involved</a>
  </div>
</div>
```

### CSS Requirements
```css
.cta {
  width: 100vw;
  margin-left: calc(-50vw + 50%);
  padding: var(--spacing-xl, 64px) var(--spacing-m, 24px);
  text-align: center;
  background: var(--cta-bg, #f5f5f5);
  color: var(--cta-text, #333);
}

.cta-container {
  max-width: var(--content-width, 800px);
  margin: 0 auto;
}

.cta-heading {
  font-size: var(--font-size-xxl, 2rem);
  font-weight: var(--font-weight-bold, 700);
  margin: 0 0 var(--spacing-s) 0;
  line-height: 1.2;
}

.cta-description {
  font-size: var(--font-size-m, 1.125rem);
  margin: 0 0 var(--spacing-m) 0;
  line-height: 1.5;
  opacity: 0.9;
}

.cta-button {
  display: inline-block;
  padding: var(--spacing-s, 12px) var(--spacing-l, 32px);
  font-size: var(--font-size-m, 1.125rem);
  font-weight: var(--font-weight-semibold, 600);
  text-decoration: none;
  border-radius: var(--border-radius-m, 8px);
  border: 2px solid currentColor;
  color: inherit;
  background: transparent;
  transition: background-color 0.2s, color 0.2s, transform 0.1s;
  cursor: pointer;
}

.cta-button:hover {
  background: var(--cta-text, #333);
  color: var(--cta-bg, #f5f5f5);
  transform: translateY(-1px);
}

.cta-button:focus-visible {
  outline: 3px solid var(--color-focus, #ffdd00);
  outline-offset: 3px;
}

.cta-button:active {
  transform: translateY(0);
}

/* DOC Green variant */
.cta-green {
  --cta-bg: #00524e;
  --cta-text: #ffffff;
}

/* DOC Yellow variant */
.cta-yellow {
  --cta-bg: #f5a623;
  --cta-text: #1a1a1a;
}

/* Neutral variant */
.cta-neutral {
  --cta-bg: #f5f5f5;
  --cta-text: #333333;
}

.cta-neutral .cta-button {
  background: var(--color-primary, #00524e);
  color: white;
  border-color: var(--color-primary, #00524e);
}

.cta-neutral .cta-button:hover {
  background: var(--color-primary-dark, #003d3a);
  border-color: var(--color-primary-dark, #003d3a);
}

@media (max-width: 768px) {
  .cta {
    padding: var(--spacing-l, 40px) var(--spacing-s, 16px);
  }

  .cta-heading {
    font-size: var(--font-size-xl, 1.5rem);
  }

  .cta-description {
    font-size: var(--font-size-s, 0.875rem);
  }

  .cta-button {
    width: 100%;
    text-align: center;
  }
}
```

### JS Requirements
```
- Block decoration:
  1. Read the block table rows to extract heading, description, button text, and button URL.
  2. Determine the colour variant from the block name or an explicit colour row:
     - "CTA (green)" → apply .cta-green class
     - "CTA (yellow)" → apply .cta-yellow class
     - "CTA (neutral)" → apply .cta-neutral class
     - Colour: #hex → set --cta-bg and auto-calculate --cta-text for contrast
  3. Build the DOM structure with heading, description paragraph, and anchor button.
- Auto-contrast calculation for custom colours:
  - Parse hex to RGB, calculate relative luminance.
  - If luminance > 0.5, use dark text (#1a1a1a); otherwise use white (#ffffff).
  - Set both --cta-bg and --cta-text as inline CSS custom properties.
```

### Document Authoring (Google Docs)
Authors create a **CTA** block using a single-column table:

| CTA (green)                                                                  |
|------------------------------------------------------------------------------|
| Help protect New Zealand's natural heritage                                  |
| Your support funds predator control, habitat restoration, and species recovery programmes across Aotearoa. |
| [Donate now](/get-involved/donate/)                                          |

- **Block name** determines the colour variant: `CTA (green)`, `CTA (yellow)`, `CTA (neutral)`, or plain `CTA` for custom.
- **Row 1:** Heading text (rendered as `<h2>`).
- **Row 2:** Description text (rendered as `<p>`). Optional — omit for heading + button only.
- **Row 3:** A hyperlink with the button label text and destination URL.

For custom colour:

| CTA                                                                          |
|------------------------------------------------------------------------------|
| Join the Great Kiwi Count                                                    |
| Become a citizen scientist and help monitor kiwi populations.                |
| [Get involved](/get-involved/great-kiwi-count/)                              |
| Colour: #1a237e                                                             |

- **Row 4:** `Colour:` prefix followed by a hex colour value.

## AI Implementation Instructions

### Mandatory Skills
- Adobe Experience Modernization
- EDS Block Development

### Validation Loop
Use Chrome MCP iteratively to verify DOM output against the original site's functional requirements at https://www.doc.govt.nz/ before marking the task complete.

### Reference
- Live URL: https://www.doc.govt.nz/get-involved/ (CTA banners on get-involved pages)
- Vue source: doc-call-to-action, doc-call-to-action-section
- CSS classes: `call-to-action`, `call-to-action-section`, `cta__heading`, `cta__description`, `cta__button`
