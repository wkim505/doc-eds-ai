/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: DOC NZ (doc.govt.nz) site-wide cleanup.
 *
 * Source is a Vue/SPA-rendered site (DOC front-end) mounted under `#doc-app`
 * with heavy Tailwind utility classes. Non-authorable site chrome
 * (header/nav, breadcrumb, footer, skip link, overlay/portal, reCAPTCHA,
 * scripts/iframes) is stripped so the import contains only the page-level
 * authorable content that lives under `section.doc-main-layout__hero`,
 * `.doc-homepage-layout__content_top`, and `.doc-homepage-layout__content_bottom`.
 *
 * Navigation and footer are migrated separately, so they are removed here.
 *
 * All selectors are validated against migration-work/cleaned.html.
 */

const TransformHook = {
  beforeTransform: 'beforeTransform',
  afterTransform: 'afterTransform',
};

export default function transform(hookName, element, payload) {
  if (hookName === TransformHook.beforeTransform) {
    // Overlay/portal + third-party widgets rendered at the end of <body>
    // (sibling of #doc-app). Removed before parsing so they can't interfere
    // with block matching.
    // Found in cleaned.html: <div class="grecaptcha-badge"> / <div class="grecaptcha-logo">
    // reCAPTCHA badge, error node, and bare/portal iframes.
    WebImporter.DOMUtils.remove(element, [
      '.grecaptcha-badge',
      '.grecaptcha-logo',
      '.grecaptcha-error',
      '.g-recaptcha-response',
    ]);
  }

  if (hookName === TransformHook.afterTransform) {
    // Non-authorable global chrome. Selectors verified in cleaned.html:
    //   <header> (line 10), <nav ...> (line 22)
    //   <div class="doc-main-layout__breadcrumb"> (line 405)
    //   <a id="skip-to-content" ...> (line 6)
    //   <footer> (line 743)
    // Nav/header and footer are migrated separately.
    WebImporter.DOMUtils.remove(element, [
      'header',
      'nav',
      '.doc-main-layout__breadcrumb',
      '#skip-to-content',
      'footer',
    ]);

    // Safe element removals: scripts, tracking, embeds, prefetch/preload links,
    // noscript, and inline base64 SVG icon <img> tags used as UI glyphs.
    WebImporter.DOMUtils.remove(element, [
      'script',
      'noscript',
      'iframe',
      'link',
      'style',
      'textarea',
      'img[src^="data:image/svg+xml"]',
    ]);
  }
}
