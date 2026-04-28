# Global Footer — EDS Block Specification

> **Block ID:** DOCEDS-003  
> **Block Folder:** `blocks/footer/`  
> **Priority:** Critical  
> **Complexity:** M  
> **Source Components:** doc-footer, doc-nz-gov-logo, doc-social-media-links-block

---

## User Story

**As a** site visitor, **I want to** find supplementary links, social media channels, and government branding in the footer **so that** I can access secondary navigation, connect with DOC on social platforms, and verify the site's authenticity as a New Zealand government agency.

## Description

The Global Footer appears on every page of the DOC NZ website and contains four main zones: a feedback/contact widget prompting visitors for page-level feedback, a social media links row with icons for Facebook, Twitter/X, Instagram, YouTube, and other platforms, a set of utility links (Privacy, Terms of use, Copyright, Accessibility, Contact us), and the official NZ Government logo.

On the live site, `doc-footer` is the root Vue component that orchestrates the footer layout. `doc-social-media-links-block` renders a row of social media icon links, and `doc-nz-gov-logo` displays the all-of-government logo as required by NZ government web standards. The footer uses a dark background (#333 or similar) with white/light text.

In EDS, the footer is auto-generated from the `footer` sheet in the header/footer spreadsheet. The `blocks/footer/footer.js` decorator reads this data and constructs the DOM. The feedback widget may require a lightweight form or link to a feedback page.

## Acceptance Criteria

1. The footer renders on every page below the main content area.
2. A feedback section is present with a prompt like "Was this page useful?" and Yes/No buttons or a link to a feedback form.
3. Social media icons link to DOC's official profiles and open in new tabs (`target="_blank"` with `rel="noopener"`).
4. Utility links (Privacy, Terms of use, Copyright, Accessibility, Contact us) are displayed and functional.
5. The NZ Government logo is displayed with appropriate alt text and links to govt.nz.
6. The footer is responsive: links stack vertically on mobile (< 768px).
7. All links meet WCAG 2.1 AA colour contrast requirements against the dark background.
8. Social media icon links have accessible `aria-label` attributes.

## Technical Notes for EDS

### DOM Structure

```html
<footer class="doc-footer">
  <!-- Feedback widget -->
  <div class="doc-footer__feedback">
    <div class="doc-footer__feedback-inner">
      <p>Was this page useful?</p>
      <a href="/feedback/" class="doc-footer__feedback-link">Give us your feedback</a>
    </div>
  </div>

  <!-- Social media links -->
  <div class="doc-footer__social">
    <ul class="doc-footer__social-list">
      <li><a href="https://www.facebook.com/departmentofconservation" target="_blank" rel="noopener" aria-label="DOC on Facebook"><span class="icon icon-facebook"></span></a></li>
      <li><a href="https://twitter.com/docabortnz" target="_blank" rel="noopener" aria-label="DOC on Twitter"><span class="icon icon-twitter"></span></a></li>
      <li><a href="https://www.instagram.com/departmentofconservation" target="_blank" rel="noopener" aria-label="DOC on Instagram"><span class="icon icon-instagram"></span></a></li>
      <li><a href="https://www.youtube.com/user/nabortnzdoc" target="_blank" rel="noopener" aria-label="DOC on YouTube"><span class="icon icon-youtube"></span></a></li>
    </ul>
  </div>

  <!-- Utility links -->
  <div class="doc-footer__utility">
    <ul class="doc-footer__utility-list">
      <li><a href="/footer-links/privacy/">Privacy</a></li>
      <li><a href="/footer-links/terms-of-use/">Terms of use</a></li>
      <li><a href="/footer-links/copyright/">Copyright</a></li>
      <li><a href="/footer-links/accessibility/">Accessibility</a></li>
      <li><a href="/footer-links/contact-us/">Contact us</a></li>
    </ul>
  </div>

  <!-- NZ Government logo -->
  <div class="doc-footer__govt-logo">
    <a href="https://www.govt.nz" target="_blank" rel="noopener" aria-label="New Zealand Government">
      <img src="/icons/nz-govt-logo.svg" alt="New Zealand Government" width="200" height="60" />
    </a>
  </div>
</footer>
```

### CSS Requirements

```css
.doc-footer {
  background-color: var(--doc-footer-bg, #333);
  color: #fff;
  padding: 0;
}

.doc-footer__feedback {
  background-color: var(--doc-green-100, #47665E);
  padding: 24px;
  text-align: center;
}

.doc-footer__feedback p {
  margin: 0 0 8px 0;
  font-size: 1.125rem;
  font-weight: 600;
}

.doc-footer__feedback-link {
  color: #fff;
  text-decoration: underline;
}

.doc-footer__social {
  padding: 24px;
  text-align: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

.doc-footer__social-list {
  display: flex;
  justify-content: center;
  gap: 24px;
  list-style: none;
  margin: 0;
  padding: 0;
}

.doc-footer__social-list a {
  color: #fff;
  font-size: 1.5rem;
  transition: opacity 0.2s;
}

.doc-footer__social-list a:hover {
  opacity: 0.8;
}

.doc-footer__utility {
  padding: 24px;
  text-align: center;
}

.doc-footer__utility-list {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 16px 32px;
  list-style: none;
  margin: 0;
  padding: 0;
}

.doc-footer__utility-list a {
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  font-size: 0.875rem;
}

.doc-footer__utility-list a:hover {
  color: #fff;
  text-decoration: underline;
}

.doc-footer__govt-logo {
  padding: 24px;
  text-align: center;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
}

@media (max-width: 768px) {
  .doc-footer__utility-list {
    flex-direction: column;
    align-items: center;
    gap: 12px;
  }
}
```

### JS Requirements

- `footer.js` decorator reads the footer sheet data and builds the DOM structure.
- Feedback widget: If implementing inline Yes/No buttons, attach click handlers that POST to a feedback API endpoint or redirect to a feedback form page.
- Social media links and utility links are static and require no JavaScript beyond the initial DOM construction.
- Ensure all external links have `target="_blank"` and `rel="noopener"`.

### Document Authoring (Google Docs)

The global footer is **not authored in page-level Google Docs**. It is configured via the **header/footer spreadsheet** linked in `fstab.yaml`:

| Sheet Tab: `footer`    |                                          |
|------------------------|------------------------------------------|
| **Section**            | **Content**                              |
| Feedback               | Was this page useful? \| /feedback/      |
| Social                 | facebook \| twitter \| instagram \| youtube |
| Utility Links          | Privacy \| Terms of use \| Copyright \| Accessibility \| Contact us |
| Government Logo        | *(NZ Government logo image)*             |

Each row represents a footer section. Social media platforms are identified by name and mapped to their respective DOC profile URLs and icons. Utility link labels are paired with their destination paths.

## AI Implementation Instructions

### Mandatory Skills
- Adobe Experience Modernization
- EDS Block Development

### Validation Loop
Use Chrome MCP iteratively to verify DOM output against the original site's functional requirements at https://www.doc.govt.nz/ before marking the task complete. Confirm:
- All four footer zones render (feedback, social, utility, govt logo).
- Social media icons link correctly and open in new tabs.
- Utility links resolve to the correct DOC pages.
- NZ Government logo is displayed and links to govt.nz.
- Footer is responsive and stacks correctly on mobile.

### Reference
- Live URL: https://www.doc.govt.nz/ (footer)
- Vue source: `doc-footer`, `doc-nz-gov-logo`, `doc-social-media-links-block`
- CSS classes: `doc-footer` classes
