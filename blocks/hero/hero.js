import { getMetadata } from '../../scripts/aem.js';

/**
 * Applies the section theme to the hero block.
 * Theme is read from page metadata (`section-theme`) and set as a data attribute
 * on the block so CSS can apply brand colour variations.
 * @param {Element} block the hero block element
 */
function applyTheme(block) {
  const theme = getMetadata('section-theme');
  if (theme) block.dataset.theme = theme.toLowerCase().trim();
}

/**
 * Promotes the hero image as the LCP candidate by setting fetchpriority="high"
 * and removing the default lazy-loading attribute added by the platform.
 * @param {HTMLPictureElement} picture the hero picture element
 */
function optimiseForLcp(picture) {
  const img = picture.querySelector('img');
  if (!img) return;
  img.setAttribute('fetchpriority', 'high');
  img.removeAttribute('loading');
}

/**
 * Builds the hero content overlay from heading, body paragraphs, and CTA links.
 * @param {Element} contentCell the authored content cell (second column)
 * @returns {HTMLElement} the structured content div
 */
function buildContent(contentCell) {
  const content = document.createElement('div');
  content.className = 'hero-content';

  if (!contentCell) return content;

  const heading = contentCell.querySelector('h1, h2, h3');
  if (heading) content.append(heading);

  const paras = [...contentCell.querySelectorAll('p')];
  const ctaParas = paras.filter((p) => p.querySelector('a'));
  const bodyParas = paras.filter((p) => !p.querySelector('a'));

  if (bodyParas.length) {
    const body = document.createElement('div');
    body.className = 'hero-body';
    body.append(...bodyParas);
    content.append(body);
  }

  if (ctaParas.length) {
    const actions = document.createElement('div');
    actions.className = 'hero-actions';
    ctaParas.forEach((p, i) => {
      const a = p.querySelector('a');
      if (!a) return;
      a.className = i === 0 ? 'button primary' : 'button secondary';
      if (a.hostname && a.hostname !== window.location.hostname) {
        a.setAttribute('target', '_blank');
        a.setAttribute('rel', 'noopener noreferrer');
      }
      actions.append(a);
    });
    content.append(actions);
  }

  return content;
}

/**
 * Decorates the hero block.
 *
 * Authored content model (Google Doc table):
 * | hero        |                          |
 * |-------------|--------------------------|
 * | [image]     | Heading text             |
 * |             | Optional body text       |
 * |             | [Optional CTA link text] |
 *
 * Variants (via block classes): no-image, with-subtitle, with-cta, section-themed
 * Section themes (via page metadata `section-theme`): ranginui | paptuanuku | atawhenua | weta
 *
 * @param {Element} block the hero block element
 */
export default function decorate(block) {
  const row = block.querySelector(':scope > div');
  if (!row) return;

  const [pictureCell, contentCell] = [...row.children];

  const picture = pictureCell?.querySelector('picture');
  const hasImage = !!picture;

  if (hasImage) {
    optimiseForLcp(picture);
  } else {
    block.classList.add('no-image');
  }

  // Fall back to pictureCell for content if block is single-column
  const content = buildContent(contentCell ?? pictureCell);

  applyTheme(block);

  if (hasImage) {
    block.replaceChildren(picture, content);
  } else {
    block.replaceChildren(content);
  }
}
