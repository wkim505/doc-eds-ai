/* eslint-disable */
/* global WebImporter */
/**
 * Parser for cards-doc. Base: cards (container / xwalk).
 * Source: https://www.doc.govt.nz/
 * Selectors:
 *   .doc-homepage-layout__content_bottom > div.widget:nth-of-type(1)  ("Featured")
 *   .doc-homepage-layout__content_bottom > div.widget:nth-of-type(2)  ("Media releases")
 *
 * Container block, 2 columns. Per library-description + _cards-doc.json (model "card"):
 *   Row 1: block name (added by createBlock)
 *   Row N (one per card):
 *     Cell 1: image -> field:image  (imageAlt collapses into <img alt>)
 *     Cell 2: text  -> field:text   (richtext: heading link + description)
 *
 * The widget's section label (h2 "Featured"/"Media releases") and footer "More"
 * link are NOT part of the card model — the section header/footer are handled
 * outside this block, so they are intentionally excluded here.
 * Generated: 2026-07-22
 */
export default function parse(element, { document }) {
  // Each card lives under the widget content area.
  let cardEls = Array.from(element.querySelectorAll(':scope .widget__content > div.card'));
  if (cardEls.length === 0) {
    // Fallback for shapes without a widget wrapper.
    cardEls = Array.from(element.querySelectorAll('div.card'));
  }

  // Empty-block guard.
  if (cardEls.length === 0) {
    element.replaceWith(...element.childNodes);
    return;
  }

  const cells = [];

  cardEls.forEach((card) => {
    // --- Cell 1: image (field:image); imageAlt collapses into <img alt>. ---
    const img = card.querySelector('img');
    const imageCell = document.createDocumentFragment();
    if (img) {
      imageCell.appendChild(document.createComment(' field:image '));
      imageCell.appendChild(img);
    }

    // --- Cell 2: text (field:text) — heading link + description. ---
    const textCell = document.createDocumentFragment();
    textCell.appendChild(document.createComment(' field:text '));

    const heading = card.querySelector('h3.card_header, .card_header, h3, h2');
    if (heading) textCell.appendChild(heading);

    const desc = card.querySelector('.card_header ~ div p, p');
    if (desc) textCell.appendChild(desc);

    cells.push([imageCell, textCell]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-doc', cells });
  element.replaceWith(block);
}
