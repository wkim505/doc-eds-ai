/* eslint-disable */
/* global WebImporter */
/**
 * Parser for hero-doc. Base: hero (xwalk).
 * Source: https://www.doc.govt.nz/  (selector: .doc-main-layout__hero)
 * Structure (1 column, per library-description + _hero-doc.json model):
 *   Row 1: block name (added by createBlock)
 *   Row 2: image        -> field:image (imageAlt collapses into <img alt>)
 *   Row 3: text (richtext) -> field:text  (H1 title + wrapping row of quick-link buttons)
 * Generated: 2026-07-22
 */
export default function parse(element, { document }) {
  // --- Extraction (selectors validated against source.html) ---
  // Background/hero image
  const picture = element.querySelector('picture');
  const img = element.querySelector('img.hero__image, picture img, img');

  // Title heading
  const heading = element.querySelector('h1, h2, .doc-h1, [class*="heading"] h1');

  // Quick-link buttons (each wrapped in its own <div><a>...</a></div>)
  const linkContainer = element.querySelector('.hero__bottom-left-slot > div:last-child, [class*="flex-wrap"]');
  let quickLinks = [];
  if (linkContainer) {
    quickLinks = Array.from(linkContainer.querySelectorAll(':scope > div > a, :scope > a'));
  }
  if (quickLinks.length === 0) {
    // Fallback: any anchors inside the hero content that are not the image
    quickLinks = Array.from(element.querySelectorAll('.hero__bottom-left a'));
  }

  // Empty-block guard
  if (!heading && !img && quickLinks.length === 0) {
    element.replaceWith(...element.childNodes);
    return;
  }

  const cells = [];

  // Row 2: image (field:image). imageAlt collapses into the <img alt> attribute.
  const imageContent = picture || img;
  if (imageContent) {
    const imageCell = document.createDocumentFragment();
    imageCell.appendChild(document.createComment(' field:image '));
    imageCell.appendChild(imageContent);
    cells.push([imageCell]);
  } else {
    // Keep row so block structure is preserved even when image is absent.
    cells.push(['']);
  }

  // Row 3: text (richtext) — heading + quick-link buttons.
  const textCell = document.createDocumentFragment();
  textCell.appendChild(document.createComment(' field:text '));
  if (heading) textCell.appendChild(heading);
  quickLinks.forEach((a) => {
    // Wrap each link in a paragraph so the richtext keeps them as discrete CTAs.
    const p = document.createElement('p');
    p.appendChild(a);
    textCell.appendChild(p);
  });
  cells.push([textCell]);

  const block = WebImporter.Blocks.createBlock(document, { name: 'hero-doc', cells });
  element.replaceWith(block);
}
