import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

/**
 * Read the trimmed text of a block cell, or '' when the cell is empty.
 * @param {Element} [cell]
 * @returns {string}
 */
function cellText(cell) {
  return cell ? (cell.textContent || '').trim() : '';
}

/**
 * Decorate the Teaser block.
 *
 * The block is authored via explicit crosswalk fields, so the rows arrive in a
 * fixed order: image, imageAlt, title, body, link, linkText. Each is rendered
 * into a stacked promotional card. The image wrapper and the CTA wrapper are
 * omitted entirely when their content is absent so no empty markup ships.
 *
 * @param {Element} block
 */
export default function decorate(block) {
  const rows = [...block.children];
  const [imageRow, imageAltRow, titleRow, bodyRow, linkRow, linkTextRow] = rows;

  const picture = imageRow ? imageRow.querySelector('picture') : null;
  const imageAlt = cellText(imageAltRow);
  const title = cellText(titleRow);
  const bodyCell = bodyRow ? bodyRow.firstElementChild : null;
  const linkHref = linkRow ? (linkRow.querySelector('a')?.getAttribute('href') || cellText(linkRow)) : '';
  const linkText = cellText(linkTextRow);

  block.textContent = '';

  if (picture) {
    const imageWrap = document.createElement('div');
    imageWrap.className = 'teaser-image';

    const img = picture.querySelector('img');
    const src = img ? img.src : '';
    const alt = imageAlt || (img ? img.alt : '');
    const optimizedPic = createOptimizedPicture(src, alt, false, [{ width: '750' }]);
    if (img) moveInstrumentation(img, optimizedPic.querySelector('img'));
    imageWrap.append(optimizedPic);
    block.append(imageWrap);
  }

  const body = document.createElement('div');
  body.className = 'teaser-body';

  if (title) {
    const heading = document.createElement('h3');
    heading.className = 'teaser-title';
    heading.textContent = title;
    body.append(heading);
  }

  if (bodyCell && bodyCell.textContent.trim()) {
    const text = document.createElement('div');
    text.className = 'teaser-text';
    while (bodyCell.firstChild) text.append(bodyCell.firstChild);
    body.append(text);
  }

  if (linkHref && linkText) {
    const cta = document.createElement('p');
    cta.className = 'teaser-cta';
    const anchor = document.createElement('a');
    anchor.href = linkHref;
    anchor.textContent = linkText;
    cta.append(anchor);
    body.append(cta);
  }

  block.append(body);
}
