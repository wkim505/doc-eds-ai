import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

/**
 * teaser-doc — DOC NZ single promotional card variant.
 *
 * A stacked promo: optional image on top, a title (h3), a short body, and an
 * optional call-to-action link. The block table rows map, in field order, to:
 *   0: image (+ alt)
 *   1: title
 *   2: body (richtext)
 *   3: cta   — link + link text
 *
 * Optional content authored empty is dropped entirely so no empty wrapper
 * ships to the accessibility tree. The CTA renders only when both a link and
 * link text are present.
 */
export default function decorate(block) {
  const [imageRow, titleRow, bodyRow, ctaRow] = [...block.children];
  const cellOf = (row) => row && (row.firstElementChild || row);

  block.textContent = '';

  // Image (optional) — only emit a picture when one was authored.
  const imageCell = cellOf(imageRow);
  const picture = imageCell ? imageCell.querySelector('picture') : null;
  if (picture) {
    const img = picture.querySelector('img');
    const alt = (img && img.getAttribute('alt')) || (imageCell.textContent || '').trim();
    const figure = document.createElement('div');
    figure.className = 'teaser-doc-image';
    moveInstrumentation(imageRow, figure);
    if (img) {
      // Optimize only same-origin/EDS-hosted assets. External absolute URLs
      // (blog.doc.govt.nz, remote CDNs) can't be served through the media
      // pipeline, so keep the original picture to avoid broken images.
      let external = false;
      try {
        external = new URL(img.src, window.location.href).origin !== window.location.origin;
      } catch (e) {
        external = false;
      }
      if (external) {
        img.setAttribute('loading', 'lazy');
        figure.append(picture);
      } else {
        const optimized = createOptimizedPicture(img.src, alt, false, [{ width: '750' }]);
        const optimizedImg = optimized.querySelector('img');
        optimizedImg.setAttribute('loading', 'lazy');
        moveInstrumentation(img, optimizedImg);
        figure.append(optimized);
      }
    } else {
      figure.append(picture);
    }
    block.append(figure);
  }

  // Title (required) — rendered as an h3 inside a full-width maui-600 bar that
  // sits directly beneath the image, spanning the whole card edge-to-edge.
  const titleCell = cellOf(titleRow);
  if (titleCell && titleCell.textContent.trim()) {
    const titleBar = document.createElement('div');
    titleBar.className = 'teaser-doc-title-bar';
    const heading = document.createElement('h3');
    heading.className = 'teaser-doc-title';
    moveInstrumentation(titleRow, heading);
    heading.textContent = titleCell.textContent.trim();
    titleBar.append(heading);
    block.append(titleBar);
  }

  const body = document.createElement('div');
  body.className = 'teaser-doc-body';

  // Body (optional) — preserve authored markup (paragraphs, line breaks).
  const bodyCell = cellOf(bodyRow);
  if (bodyCell && bodyCell.textContent.trim()) {
    const text = document.createElement('div');
    text.className = 'teaser-doc-text';
    moveInstrumentation(bodyRow, text);
    while (bodyCell.firstChild) text.append(bodyCell.firstChild);
    body.append(text);
  }

  // CTA (optional) — rendered only when a link is present.
  const ctaCell = cellOf(ctaRow);
  const link = ctaCell ? ctaCell.querySelector('a') : null;
  if (link && link.getAttribute('href')) {
    const cta = document.createElement('p');
    cta.className = 'teaser-doc-cta';
    moveInstrumentation(ctaRow, cta);
    cta.append(link);
    body.append(cta);
  }

  block.append(body);
}
