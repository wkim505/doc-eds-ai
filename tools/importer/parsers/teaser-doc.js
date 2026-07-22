/* eslint-disable */
/* global WebImporter */
/**
 * Parser for teaser-doc. Base: teaser (custom / xwalk).
 * Source: https://www.doc.govt.nz/
 * Selectors: .doc-homepage-layout__content_top > div.card  (instance 1 — featured highlight card)
 *            .doc-homepage-layout__content_top > div.widget (instance 2 — Blog widget)
 *
 * Simple block, 1 column. Rows follow the model field order in _teaser-doc.json
 * (and blocks/teaser-doc/teaser-doc.js decorate):
 *   Row 1: block name (added by createBlock)
 *   Row 2: image  -> field:image  (imageAlt collapses into <img alt>)
 *   Row 3: title  -> field:title  (plain text heading)
 *   Row 4: body   -> field:body   (richtext — date / description / excerpt)
 *   Row 5: cta    -> field:link + field:linkText (grouped in one cell)
 *
 * Handles two source shapes:
 *   - card:   img, title link (card_header h2), description paragraph.
 *   - widget: labeled Blog teaser with date span, heading link, thumbnail,
 *             excerpt paragraph, and a "More" footer CTA.
 * Generated: 2026-07-22
 */
export default function parse(element, { document }) {
  const isWidget = element.classList.contains('widget');

  // --- Image ---
  // Widget: the teaser thumbnail; Card: the top image.
  const img = element.querySelector('img');

  // --- Title ---
  // Card: card_header h2. Widget: the blog post heading (h3 > a inside the
  // teaser content). The widget's section label (.widget__title "Blog") is a
  // heading too, so scope the widget title to the content area to avoid it.
  const titleEl = isWidget
    ? element.querySelector('.widget__content .card_header, .widget__content h3, .widget__content h2')
    : element.querySelector('.card_header, h2, h3');
  const titleText = titleEl ? (titleEl.textContent || '').trim() : '';

  // --- Body (richtext): date + description/excerpt ---
  const bodyNodes = [];
  // Widget carries a publication date in a leading <span>.
  const dateSpan = element.querySelector('.widget__content span, .card > div > span, span');
  if (dateSpan && (dateSpan.textContent || '').trim() && !dateSpan.classList.contains('sr-only')) {
    const dateP = document.createElement('p');
    dateP.textContent = dateSpan.textContent.trim();
    bodyNodes.push(dateP);
  }
  // Description / excerpt paragraphs.
  const paragraphs = Array.from(element.querySelectorAll('p')).filter((p) => (p.textContent || '').trim());
  paragraphs.forEach((p) => bodyNodes.push(p));

  // --- CTA (link + linkText) ---
  // Widget: explicit "More" link in the footer.
  // Card: the card_link wrapping the title acts as the teaser's link.
  let ctaLink = null;
  let ctaText = '';
  if (isWidget) {
    const moreLink = element.querySelector('.widget__footer a');
    if (moreLink) {
      ctaLink = moreLink.getAttribute('href');
      // Strip visually-hidden helper text from the CTA label.
      const clone = moreLink.cloneNode(true);
      clone.querySelectorAll('.sr-only').forEach((n) => n.remove());
      ctaText = (clone.textContent || '').trim();
    }
  } else {
    const cardLink = element.querySelector('a.card_link, a[href]');
    if (cardLink) {
      ctaLink = cardLink.getAttribute('href');
      ctaText = titleText || (cardLink.textContent || '').trim();
    }
  }

  // Empty-block guard
  if (!img && !titleText && bodyNodes.length === 0 && !ctaLink) {
    element.replaceWith(...element.childNodes);
    return;
  }

  const cells = [];

  // Row: image (field:image); imageAlt collapses into <img alt>.
  if (img) {
    const imageCell = document.createDocumentFragment();
    imageCell.appendChild(document.createComment(' field:image '));
    imageCell.appendChild(img);
    cells.push([imageCell]);
  } else {
    cells.push(['']);
  }

  // Row: title (field:title) — plain text.
  if (titleText) {
    const titleCell = document.createDocumentFragment();
    titleCell.appendChild(document.createComment(' field:title '));
    const h = document.createElement('h3');
    h.textContent = titleText;
    titleCell.appendChild(h);
    cells.push([titleCell]);
  } else {
    cells.push(['']);
  }

  // Row: body (field:body) — richtext.
  if (bodyNodes.length) {
    const bodyCell = document.createDocumentFragment();
    bodyCell.appendChild(document.createComment(' field:body '));
    bodyNodes.forEach((n) => bodyCell.appendChild(n));
    cells.push([bodyCell]);
  } else {
    cells.push(['']);
  }

  // Row: cta (field:link). linkText is a collapsed field (ends in "Text") — it
  // becomes the anchor's text automatically, so it gets no separate comment/node.
  if (ctaLink) {
    const ctaCell = document.createDocumentFragment();
    ctaCell.appendChild(document.createComment(' field:link '));
    const a = document.createElement('a');
    a.setAttribute('href', ctaLink);
    a.textContent = ctaText || ctaLink;
    ctaCell.appendChild(a);
    cells.push([ctaCell]);
  } else {
    cells.push(['']);
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'teaser-doc', cells });
  element.replaceWith(block);
}
