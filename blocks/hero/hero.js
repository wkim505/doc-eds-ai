import { getMetadata } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

const SECTION_THEMES = ['ranginui', 'paptuanuku', 'atawhenua', 'weta'];

/**
 * Classify a row by its primary content type.
 * - image:   contains a <picture> and no heading/text/link
 * - cta:     contains only a single link (no headings, no other text)
 * - caption: a single paragraph wrapped in <em>/<i> (image credit convention)
 * - content: heading and/or paragraph text (default)
 * @param {Element} row
 * @returns {'image'|'cta'|'caption'|'content'}
 */
function classifyRow(row) {
  const cell = row.firstElementChild || row;
  const picture = cell.querySelector('picture');
  const heading = cell.querySelector('h1, h2, h3, h4, h5, h6');
  const links = cell.querySelectorAll('a');
  const text = (cell.textContent || '').trim();

  if (picture && !heading && !text) return 'image';
  if (!picture && !heading && links.length === 1 && links[0].textContent.trim() === text) return 'cta';

  // Caption: single paragraph that is fully italicised (em/i)
  const paragraphs = cell.querySelectorAll(':scope > p');
  if (!picture && !heading && paragraphs.length === 1) {
    const p = paragraphs[0];
    const onlyChild = p.children.length === 1 ? p.firstElementChild : null;
    if (onlyChild && (onlyChild.tagName === 'EM' || onlyChild.tagName === 'I')) {
      return 'caption';
    }
  }

  return 'content';
}

/**
 * Promote the first heading found to h1 if it is not already.
 * Preserves child nodes, instrumentation, and id attribute.
 */
function promoteHeadingToH1(container) {
  const heading = container.querySelector('h1, h2, h3, h4, h5, h6');
  if (!heading || heading.tagName === 'H1') return heading;
  const h1 = document.createElement('h1');
  moveInstrumentation(heading, h1);
  if (heading.id) h1.id = heading.id;
  while (heading.firstChild) h1.append(heading.firstChild);
  heading.replaceWith(h1);
  return h1;
}

/**
 * Inline SVG "i" icon for the image-credit button.
 */
function infoIcon() {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('aria-hidden', 'true');
  svg.setAttribute('focusable', 'false');
  svg.classList.add('hero-caption-icon');
  svg.innerHTML = '<path fill="currentColor" d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Zm0 4.5a1.25 1.25 0 1 1-1.25 1.25A1.25 1.25 0 0 1 12 6.5Zm1.5 11h-3a.75.75 0 0 1 0-1.5h.75v-4h-.5a.75.75 0 0 1 0-1.5h1.25a.75.75 0 0 1 .75.75V16h.75a.75.75 0 0 1 0 1.5Z"/>';
  return svg;
}

export default function decorate(block) {
  const rows = [...block.children];

  const imageContent = document.createDocumentFragment();
  const captionContent = document.createDocumentFragment();
  const bottomContent = document.createDocumentFragment();
  const ctaContent = document.createDocumentFragment();

  rows.forEach((row) => {
    const cell = row.firstElementChild || row;
    const kind = classifyRow(row);
    const target = {
      image: imageContent,
      caption: captionContent,
      cta: ctaContent,
      content: bottomContent,
    }[kind];

    while (cell.firstChild) target.append(cell.firstChild);
    moveInstrumentation(row, target.lastElementChild || target);
  });

  block.textContent = '';

  const hasImage = !!imageContent.querySelector('picture');
  block.classList.add('group');
  block.classList.toggle('has-image', hasImage);
  block.classList.toggle('no-image', !hasImage);

  // Apply section theme from page metadata (e.g. "ranginui", "paptuanuku")
  const theme = (getMetadata('section-theme') || '').trim().toLowerCase();
  if (SECTION_THEMES.includes(theme)) {
    block.classList.add(`theme-${theme}`);
  }

  // Promote the page heading and wrap it in the title box.
  // The title box sits inside a "title row" so it can be horizontally
  // centred (max-width / margin: auto) the same way as global sections,
  // keeping its left edge aligned with the content column below.
  const h1 = promoteHeadingToH1(bottomContent);
  const titleBox = document.createElement('div');
  titleBox.className = 'hero-title-box';
  if (h1) titleBox.append(h1);
  const titleRow = document.createElement('div');
  titleRow.className = 'hero-title-row';
  titleRow.append(titleBox);

  // Pull intro/CTA into a content panel that sits below the image
  const contentPanel = document.createElement('div');
  contentPanel.className = 'hero-content';
  // Anything left in bottomContent (intro paragraphs, etc.) goes into the panel
  contentPanel.append(bottomContent);
  if (ctaContent.childNodes.length) {
    const ctaWrap = document.createElement('div');
    ctaWrap.className = 'hero-cta';
    ctaWrap.append(ctaContent);
    contentPanel.append(ctaWrap);
  }

  // Image container (picture + title box overlay)
  const imageContainer = document.createElement('div');
  imageContainer.className = 'hero-image-container';

  if (hasImage) {
    const pictureWrap = document.createElement('div');
    pictureWrap.className = 'hero-picture';
    pictureWrap.append(imageContent);
    imageContainer.append(pictureWrap);

    // Caption (top-right "i" toggle) — only meaningful with an image
    if (captionContent.childNodes.length) {
      const top = document.createElement('div');
      top.className = 'hero-top';
      const captionToggle = document.createElement('button');
      captionToggle.className = 'hero-caption-toggle';
      captionToggle.type = 'button';
      captionToggle.setAttribute('aria-expanded', 'false');
      captionToggle.setAttribute('aria-label', 'Show image credit');
      captionToggle.append(infoIcon());

      const captionBody = document.createElement('div');
      captionBody.className = 'hero-caption-body';
      captionBody.hidden = true;
      captionBody.append(captionContent);

      captionToggle.addEventListener('click', () => {
        const expanded = captionToggle.getAttribute('aria-expanded') === 'true';
        captionToggle.setAttribute('aria-expanded', String(!expanded));
        captionToggle.setAttribute('aria-label', expanded ? 'Show image credit' : 'Hide image credit');
        captionBody.hidden = expanded;
      });

      top.append(captionToggle, captionBody);
      imageContainer.append(top);
    }

    // Optimise the hero image for LCP
    const img = imageContainer.querySelector('picture img');
    if (img) {
      img.setAttribute('loading', 'eager');
      img.setAttribute('fetchpriority', 'high');
    }
  }

  // Title row overlays the image (bottom-left). When there is no image,
  // it sits at the top of the content panel instead.
  if (hasImage) {
    imageContainer.append(titleRow);
    block.append(imageContainer);
  } else {
    contentPanel.prepend(titleRow);
  }

  if (contentPanel.childNodes.length) {
    block.append(contentPanel);
  }
}
