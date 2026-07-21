import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

/**
 * Teaser 2 — a vertically stacked promotional card.
 *
 * The block table rows map, in order, to the authored field groups:
 *   0: heading — an optional eyebrow followed by the required title
 *   1: body    — required rich text
 *   2: image   — optional picture (+ alt)
 *   3: cta     — required link + label
 *
 * The eyebrow renders (when present) before the heading in reading order.
 * Optional content that is authored empty is dropped entirely so no empty
 * wrapper ships to the accessibility tree.
 */
export default function decorate(block) {
  const [headingRow, bodyRow, imageRow, ctaRow] = [...block.children];
  const cellOf = (row) => row && (row.firstElementChild || row);

  block.textContent = '';

  // Heading cell holds the optional eyebrow (first) then the required title.
  const headingCell = cellOf(headingRow);
  const headingParts = headingCell
    ? [...headingCell.children].filter((el) => el.textContent.trim())
    : [];
  // When only text nodes are present (no wrapping elements), treat the whole
  // cell as the title so the block still renders a heading.
  if (!headingParts.length && headingCell && headingCell.textContent.trim()) {
    headingParts.push(headingCell);
  }
  const titleEl = headingParts[headingParts.length - 1];
  const eyebrowEl = headingParts.length > 1 ? headingParts[0] : null;

  if (eyebrowEl) {
    const eyebrow = document.createElement('p');
    eyebrow.className = 'teaser2-eyebrow';
    eyebrow.textContent = eyebrowEl.textContent.trim();
    block.append(eyebrow);
  }

  if (titleEl && titleEl.textContent.trim()) {
    const heading = document.createElement('h2');
    heading.className = 'teaser2-title';
    if (headingRow) moveInstrumentation(headingRow, heading);
    heading.textContent = titleEl.textContent.trim();
    block.append(heading);
  }

  // Body (required) — preserve authored markup (paragraphs, line breaks).
  const bodyCell = cellOf(bodyRow);
  if (bodyCell && bodyCell.textContent.trim()) {
    const body = document.createElement('div');
    body.className = 'teaser2-text';
    moveInstrumentation(bodyRow, body);
    while (bodyCell.firstChild) body.append(bodyCell.firstChild);
    block.append(body);
  }

  // Image (optional) — only emit an <img> when a picture was authored.
  const imageCell = cellOf(imageRow);
  const picture = imageCell ? imageCell.querySelector('picture') : null;
  if (picture) {
    const img = picture.querySelector('img');
    const alt = (img && img.getAttribute('alt')) || imageCell.textContent.trim();
    const figure = document.createElement('div');
    figure.className = 'teaser2-image';
    moveInstrumentation(imageRow, figure);
    if (img) {
      const optimized = createOptimizedPicture(img.src, alt, false, [{ width: '750' }]);
      const optimizedImg = optimized.querySelector('img');
      optimizedImg.setAttribute('loading', 'lazy');
      moveInstrumentation(img, optimizedImg);
      figure.append(optimized);
    } else {
      figure.append(picture);
    }
    block.append(figure);
  }

  // CTA (required) — an anchor whose accessible name includes the label.
  const ctaCell = cellOf(ctaRow);
  const link = ctaCell ? ctaCell.querySelector('a') : null;
  if (link && link.getAttribute('href')) {
    const cta = document.createElement('p');
    cta.className = 'teaser2-cta';
    moveInstrumentation(ctaRow, cta);
    cta.append(link);
    block.append(cta);
  }
}
