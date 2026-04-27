import { getMetadata } from '../../scripts/aem.js';

/**
 * Sets fetchpriority="high" and loading="eager" on the LCP image.
 * The EDS platform defaults to lazy loading; hero images should always be eager.
 * @param {HTMLPictureElement} picture
 */
function optimiseLcp(picture) {
  const img = picture.querySelector('img');
  if (!img) return;
  img.setAttribute('fetchpriority', 'high');
  img.setAttribute('loading', 'eager');
}

/**
 * Reads the section-theme metadata value and sets it as a data attribute
 * on the block so CSS can apply brand-colour variations without JS logic.
 * Accepted values: ranginui | paptuanuku | atawhenua | weta
 * @param {Element} block
 */
function applyTheme(block) {
  const theme = getMetadata('section-theme');
  if (theme) block.dataset.theme = theme.toLowerCase().trim();
}

/**
 * Separates CTA paragraphs (containing an <a>) from body-copy paragraphs.
 * @param {HTMLParagraphElement[]} paras
 * @returns {{ bodyParas: HTMLParagraphElement[], ctaParas: HTMLParagraphElement[] }}
 */
function splitParas(paras) {
  return {
    bodyParas: paras.filter((p) => !p.querySelector('a')),
    ctaParas: paras.filter((p) => p.querySelector('a')),
  };
}

/**
 * Builds the content overlay element from the heading, intro text, and CTAs.
 * @param {Element[]} contentCells - all non-picture cells across all rows
 * @returns {HTMLDivElement}
 */
function buildContent(contentCells) {
  const content = document.createElement('div');
  content.className = 'hero-content';

  if (!contentCells.length) return content;

  // Collect all content from every cell in document order
  const allChildren = contentCells.flatMap((cell) => [...cell.children]);

  const heading = allChildren.find((el) => /^H[1-3]$/.test(el.tagName));
  const paras = allChildren.filter((el) => el.tagName === 'P');
  const { bodyParas, ctaParas } = splitParas(paras);

  if (heading) {
    // Ensure the heading is h1 for correct semantic hierarchy
    if (heading.tagName !== 'H1') {
      const h1 = document.createElement('h1');
      h1.innerHTML = heading.innerHTML;
      heading.replaceWith(h1);
      content.append(h1);
    } else {
      content.append(heading);
    }
  }

  if (bodyParas.length) {
    const intro = document.createElement('div');
    intro.className = 'hero-intro';
    intro.append(...bodyParas);
    content.append(intro);
  }

  if (ctaParas.length) {
    const actions = document.createElement('div');
    actions.className = 'hero-actions';

    ctaParas.forEach((p, idx) => {
      const a = p.querySelector('a');
      if (!a) return;

      a.className = idx === 0 ? 'hero-cta hero-cta-primary' : 'hero-cta hero-cta-secondary';

      // Flag external links for safe target="_blank"
      if (a.hostname && a.hostname !== window.location.hostname) {
        a.setAttribute('target', '_blank');
        a.setAttribute('rel', 'noopener noreferrer');
      }

      actions.append(a);
    });

    if (actions.childElementCount) content.append(actions);
  }

  return content;
}

/**
 * Decorates the hero block.
 *
 * ## Authoring (Google Doc / SharePoint table)
 *
 * Two-row layout (image row + content row):
 * ┌──────────────────────────────┐
 * │ hero                         │
 * ├──────────────────────────────┤
 * │ [background image]           │
 * ├──────────────────────────────┤
 * │ Page heading (h1)            │
 * │ Optional intro paragraph     │
 * │ [Optional CTA link text]     │
 * └──────────────────────────────┘
 *
 * OR single-row layout (image | heading side-by-side):
 * ┌──────────────────┬───────────┐
 * │ hero             │           │
 * ├──────────────────┼───────────┤
 * │ [image]          │ Heading   │
 * │                  │ Intro     │
 * │                  │ [CTA]     │
 * └──────────────────┴───────────┘
 *
 * ## Page metadata
 * - `section-theme`: ranginui | paptuanuku | atawhenua | weta
 *
 * ## Variants (via block classes in doc table header)
 * - `hero`              — standard (image + heading)
 * - `hero with-intro`   — image + heading + intro paragraph
 * - `hero with-cta`     — image + heading + CTA button
 * - `hero no-image`     — section-colour background, no image (auto-set when no picture authored)
 * - `hero section-themed` — explicit theme class (alternative to metadata)
 *
 * @param {Element} block
 */
export default function decorate(block) {
  const rows = [...block.querySelectorAll(':scope > div')];
  if (!rows.length) return;

  // Find the hero background picture from any cell in any row
  const picture = block.querySelector('picture');
  const hasImage = !!picture;

  if (hasImage) {
    optimiseLcp(picture);
  } else {
    block.classList.add('no-image');
  }

  // Gather all cells that do not contain a picture as content cells
  const contentCells = rows.flatMap((row) => [...row.children].filter((cell) => !cell.querySelector('picture')));

  const content = buildContent(contentCells);
  applyTheme(block);

  // Rebuild block with clean structure
  if (hasImage) {
    block.replaceChildren(picture, content);
  } else {
    block.replaceChildren(content);
  }
}
