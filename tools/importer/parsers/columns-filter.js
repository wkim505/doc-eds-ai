/* eslint-disable */
/* global WebImporter */
/**
 * Parser for columns-filter. Base: columns (xwalk).
 * Source: https://www.doc.govt.nz/parks-and-recreation/places-to-go/
 * Selector:
 *   div.doc-main-layout__main__container-content > div.bg-white.pb-4.pl-3.pr-3.pt-2
 *
 * Source is an interactive Vue multiselect widget ("Find places to go and things to do":
 * Region / Place / Activity + Search). Live filtering is NOT reproduced — we capture it
 * faithfully as static content per _columns-filter.json (columns / core-franklin columns v1).
 *
 * Live DOM (validated against cleaned.html):
 *   - <h2> "Find places to go and things to do"
 *   - three .multiselect__wrapper blocks, each with
 *       .multiselect__label       -> category name (Region / Place / Activity)
 *       .multiselect__placeholder  -> default value ("Any")
 *   - <button id="search-button">Search</button> (no href in source; the migrated CTA
 *       links to the page itself per the migration spec).
 *
 * Columns block layout (per library-description.txt):
 *   Row 1: block name (added by createBlock)
 *   Row 2: one cell per column. The captured content is a single column holding the
 *          heading, the three filter categories, and the Search CTA.
 *
 * Per field-hinting rules, columns blocks use ONLY default content in cells — no
 * <!-- field:x --> comments (columns/rows model fields are managed by the UE template).
 * Generated: 2026-07-22
 */
export default function parse(element, { document }) {
  // --- Heading ---
  const heading = element.querySelector(':scope > h2, h2, [class*="title"]');

  // --- Filter categories: one per multiselect wrapper (Region / Place / Activity). ---
  // Fall back to the simplified cached shape (.filter-category) for non-live sources.
  const wrapperEls = Array.from(element.querySelectorAll('.multiselect__wrapper'));
  const simpleCatEls = Array.from(element.querySelectorAll('.filter-category'));

  // --- Search call-to-action. Source is a <button>; rebuild as a link per spec. ---
  const searchBtn = element.querySelector('#search-button, button[id*="search"]');
  const existingSearchLink = element.querySelector('a[href*="places-to-go"]');

  // Empty-block guard: bail gracefully if nothing meaningful was captured.
  if (!heading && wrapperEls.length === 0 && simpleCatEls.length === 0 && !searchBtn && !existingSearchLink) {
    element.replaceWith(...element.childNodes);
    return;
  }

  // Build a single content column that faithfully captures the static filter content.
  const contentCell = [];
  if (heading) contentCell.push(heading);

  if (wrapperEls.length > 0) {
    // Live DOM: derive "Label: Any" paragraphs from each multiselect wrapper.
    wrapperEls.forEach((wrapper) => {
      const label = wrapper.querySelector('.multiselect__label');
      const value = wrapper.querySelector('.multiselect__placeholder, .multiselect__single');
      const name = label ? (label.textContent || '').trim() : '';
      const val = value ? (value.textContent || '').trim() : '';
      if (!name) return;
      const p = document.createElement('p');
      const strong = document.createElement('strong');
      strong.textContent = name;
      p.appendChild(strong);
      if (val) p.appendChild(document.createTextNode(`: ${val}`));
      contentCell.push(p);
    });
  } else if (simpleCatEls.length > 0) {
    // Cached simplified shape: reuse the pre-built category blocks as-is.
    simpleCatEls.forEach((cat) => contentCell.push(cat));
  }

  // Search CTA.
  if (existingSearchLink) {
    const p = document.createElement('p');
    p.appendChild(existingSearchLink);
    contentCell.push(p);
  } else if (searchBtn) {
    const p = document.createElement('p');
    const a = document.createElement('a');
    a.setAttribute('href', '/parks-and-recreation/places-to-go/');
    a.textContent = (searchBtn.textContent || 'Search').trim() || 'Search';
    p.appendChild(a);
    contentCell.push(p);
  }

  const cells = [];
  cells.push([contentCell]); // Row 2: single column holding all captured content.

  const block = WebImporter.Blocks.createBlock(document, { name: 'columns-filter', cells });
  element.replaceWith(block);
}
