/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: DOC NZ (doc.govt.nz) section breaks + section metadata.
 *
 * Runs in afterTransform only. Reads sections from payload.template.sections
 * (page-templates.json) and, for each section:
 *   - inserts a Section Metadata block (via WebImporter.Blocks.createBlock)
 *     after the section element when the section has a `style`
 *   - inserts an <hr> section break before the section element when it is not
 *     the first section
 *
 * Sections are processed in reverse order so that DOM insertions do not shift
 * elements that have not yet been handled.
 *
 * Section selectors come from page-templates.json and are validated against
 * migration-work/cleaned.html:
 *   .doc-main-layout__hero            (hero,          style: null)
 *   .doc-homepage-layout__content_top    (content_top,    style: columns)
 *   .doc-homepage-layout__content_bottom (content_bottom, style: columns)
 */

const TransformHook = {
  beforeTransform: 'beforeTransform',
  afterTransform: 'afterTransform',
};

export default function transform(hookName, element, payload) {
  if (hookName === TransformHook.afterTransform) {
    const sections = payload && payload.template && payload.template.sections;
    if (!Array.isArray(sections) || sections.length < 2) {
      return;
    }

    const doc = element.ownerDocument;

    // Resolve the DOM element for each section via its selector.
    const resolved = sections.map((section) => ({
      section,
      el: section.selector ? element.querySelector(section.selector) : null,
    }));

    // Process in reverse so DOM mutations don't shift not-yet-handled sections.
    for (let i = resolved.length - 1; i >= 0; i -= 1) {
      const { section, el } = resolved[i];
      if (!el) {
        continue;
      }

      // Section Metadata block (only when the section defines a style).
      if (section.style) {
        const metadataBlock = WebImporter.Blocks.createBlock(doc, {
          name: 'Section Metadata',
          cells: { style: section.style },
        });
        el.after(metadataBlock);
      }

      // Section break: <hr> before every section except the first.
      if (i > 0) {
        const hr = doc.createElement('hr');
        el.before(hr);
      }
    }
  }
}
