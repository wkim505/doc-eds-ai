/*
 * hero-doc — DOC NZ homepage hero variant.
 *
 * Authored EDS table:
 *   row 1: image cell    (field:image)  -> <p><picture><img></picture></p>
 *   row 2: text cell     (field:text)   -> <h1> + one <p><a> per quick-link
 *
 * Decoration restructures this into an overlay hero:
 *   - image row becomes the full-bleed background media
 *   - text row H1 is wrapped in a white caption box
 *   - the quick-link paragraphs are collapsed into a single wrapping
 *     "pill" row; the first pill is styled as the gold primary CTA.
 */
export default function decorate(block) {
  const rows = [...block.children];
  const imageRow = rows[0];
  const textRow = rows[1];

  if (imageRow) imageRow.classList.add('hero-doc-image');

  if (textRow) {
    textRow.classList.add('hero-doc-content');
    const cell = textRow.querySelector(':scope > div') || textRow;

    // Caption box around the heading.
    const heading = cell.querySelector('h1, h2, h3');
    if (heading) {
      const caption = document.createElement('div');
      caption.className = 'hero-doc-caption';
      heading.replaceWith(caption);
      caption.append(heading);
    }

    // Collect the quick-link anchors (each authored as its own <p><a>).
    const linkParas = [...cell.querySelectorAll(':scope > p')].filter(
      (p) => p.querySelector('a') && p.textContent.trim(),
    );

    if (linkParas.length) {
      const links = document.createElement('div');
      links.className = 'hero-doc-links';
      linkParas.forEach((p, i) => {
        const a = p.querySelector('a');
        a.classList.add('hero-doc-pill');
        if (i === 0) a.classList.add('hero-doc-pill-primary');
        links.append(a);
        p.remove();
      });
      cell.append(links);
    }
  }
}
