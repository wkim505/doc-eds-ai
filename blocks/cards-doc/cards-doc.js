import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // Optional leading title row: a single-cell row with a heading and no image.
  // Rendered as a full-width bar above the card grid (e.g. "Featured").
  let titleBar = null;
  const firstRow = block.firstElementChild;
  if (
    firstRow
    && firstRow.children.length === 1
    && !firstRow.querySelector('picture, img')
    && firstRow.querySelector('h2, h3')
  ) {
    const heading = firstRow.querySelector('h2, h3');
    titleBar = document.createElement('div');
    titleBar.className = 'cards-doc-title-bar';
    const h = document.createElement('h2');
    h.className = 'cards-doc-title';
    h.textContent = (heading.textContent || '').trim();
    titleBar.append(h);
    firstRow.remove();
  }

  /* change to ul, li */
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    moveInstrumentation(row, li);
    while (row.firstElementChild) li.append(row.firstElementChild);
    [...li.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector('picture')) div.className = 'cards-doc-card-image';
      else div.className = 'cards-doc-card-body';
    });
    ul.append(li);
  });
  ul.querySelectorAll('picture > img').forEach((img) => {
    // Only optimize same-origin/EDS-hosted assets. External absolute URLs (e.g.
    // www.doc.govt.nz/thumbs/...) aren't served by the local pipeline, so keep
    // the original picture to avoid broken images.
    let external = false;
    try {
      external = new URL(img.src, window.location.href).origin !== window.location.origin;
    } catch (e) {
      external = false;
    }
    if (external) return;
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
  block.textContent = '';
  if (titleBar) block.append(titleBar);
  block.append(ul);
}
