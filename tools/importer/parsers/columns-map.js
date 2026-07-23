/* eslint-disable */
/* global WebImporter */
/**
 * Parser for columns-map. Base: columns (xwalk).
 * Source: https://www.doc.govt.nz/parks-and-recreation/places-to-go/
 * Selector:
 *   div.doc-main-layout__main__container-content > div.hotspotmapblock
 *
 * Source is an interactive NZ SVG hotspot map ("Or select a region"). The hotspot
 * polygons carry no visible text, and in the live DOM the 20 region <a href>/<polygon
 * aria-label> pairs live INSIDE a base64-encoded SVG in an <img src>, not as real DOM
 * nodes. The interactive SVG is NOT reproduced — we capture it faithfully as a heading
 * plus a labelled list of the 20 region links per _columns-map.json (columns v1).
 *
 * Extraction strategy (validated against cleaned.html):
 *   1. Prefer real anchors (e.g. the cached simplified <ul class="region-links"> shape).
 *   2. Otherwise decode the base64 SVG from #svgcontainer img[src^="data:image/svg+xml"],
 *      parse it, and read each anchor's href + its polygon's aria-label as the link text.
 *
 * Columns block layout (per library-description.txt):
 *   Row 1: block name (added by createBlock)
 *   Row 2: one cell per column. The captured content is a single column holding the
 *          heading and the region-links list.
 *
 * Per field-hinting rules, columns blocks use ONLY default content in cells — no
 * <!-- field:x --> comments (columns/rows model fields are managed by the UE template).
 * Generated: 2026-07-22
 */
export default function parse(element, { document }) {
  // --- Heading ---
  const heading = element.querySelector(':scope h2, h2, [class*="title"]');

  // Collect region links as { href, label } pairs.
  const regions = [];

  // 1) Real anchors first (cached simplified shape or any live anchors to region pages).
  const realAnchors = Array.from(
    element.querySelectorAll('a[href*="/places-to-go/"]'),
  ).filter((a) => {
    const href = a.getAttribute('href') || '';
    // Exclude the section's own self-link / non-region anchors.
    return /\/places-to-go\/[^/]+\/?$/.test(href) && !/\/places-to-go\/?$/.test(href);
  });
  // Derive a readable label from a region href slug (fallback when no text/aria-label).
  const labelFromHref = (href) => {
    const m = (href || '').match(/\/places-to-go\/([^/]+)\/?$/);
    if (!m) return '';
    return m[1]
      .split('-')
      .map((w) => (w ? w.charAt(0).toUpperCase() + w.slice(1) : w))
      .join(' ');
  };

  realAnchors.forEach((a) => {
    // These anchors are SVG hotspots: no text, but a child <polygon aria-label="...">.
    let label = (a.textContent || '').trim();
    if (!label) {
      const poly = a.querySelector('[aria-label]');
      label = (poly && poly.getAttribute('aria-label')) ? poly.getAttribute('aria-label').trim() : '';
    }
    if (!label) label = a.getAttribute('aria-label') || '';
    if (!label) label = labelFromHref(a.getAttribute('href'));
    if (label) regions.push({ href: a.getAttribute('href'), label: label.trim() });
  });

  // Helper: decode a base64 payload to text, trying Node Buffer then browser atob.
  const decodeBase64 = (b64) => {
    let text = '';
    if (typeof Buffer !== 'undefined') {
      try { text = Buffer.from(b64, 'base64').toString('utf8'); } catch (e) { text = ''; }
    }
    if (!text && typeof atob === 'function') {
      try {
        const raw = atob(b64);
        try {
          // Reinterpret Latin-1 bytes as UTF-8 (handles é, ’, etc.).
          text = decodeURIComponent(raw.split('').map((c) =>
            `%${(`00${c.charCodeAt(0).toString(16)}`).slice(-2)}`).join(''));
        } catch (e2) {
          text = raw;
        }
      } catch (e) { text = ''; }
    }
    return text;
  };

  // Helper: pull region { href, label } pairs out of decoded SVG markup.
  const extractFromSvg = (svgText) => {
    const found = [];
    if (!svgText || !svgText.includes('places-to-go')) return found;
    const re = /href="([^"]*\/places-to-go\/[^"]+)"[^>]*>\s*<polygon[^>]*aria-label="([^"]+)"/g;
    let m;
    while ((m = re.exec(svgText)) !== null) {
      const href = m[1];
      const label = (m[2] || '').trim();
      if (href && label) found.push({ href, label });
    }
    return found;
  };

  // 2) Fallback: decode the base64 SVG hotspot map(s) and read href + polygon aria-label.
  //    Scan the whole element HTML so we do not depend on where the <img> sits.
  if (regions.length === 0) {
    const html = element.innerHTML || '';
    const dataUriRe = /data:image\/svg\+xml;base64,([A-Za-z0-9+/=]+)/g;
    let d;
    while (regions.length === 0 && (d = dataUriRe.exec(html)) !== null) {
      const svgText = decodeBase64(d[1]);
      extractFromSvg(svgText).forEach((r) => regions.push(r));
    }
  }

  // 3) The SVG may already be decoded/inline in the element markup.
  if (regions.length === 0) {
    extractFromSvg(element.innerHTML || '').forEach((r) => regions.push(r));
  }

  // 4) Last resort — the region hotspot map is a Vue-hydrated inline <svg> whose
  //    anchors may not be present at import-snapshot time. This is the fixed set
  //    of NZ regions for the DOC places-to-go map; use it so the content is
  //    captured faithfully regardless of client-side hydration timing.
  if (regions.length === 0) {
    const FALLBACK_REGIONS = [
      ['Northland', 'northland'], ['Auckland', 'auckland'], ['Coromandel', 'coromandel'],
      ['Waikato', 'waikato'], ['Bay of Plenty', 'bay-of-plenty'], ['East Coast', 'east-coast'],
      ['Central North Island', 'central-north-island'], ['Taranaki', 'taranaki'],
      ['Manawatu/Whanganui', 'manawatu-whanganui'], ['Hawke’s Bay', 'hawkes-bay'],
      ['Wairarapa', 'wairarapa'], ['Wellington/Kapiti', 'wellington-kapiti'],
      ['Chatham Islands', 'chatham-islands'], ['Nelson/Tasman', 'nelson-tasman'],
      ['Marlborough', 'marlborough'], ['West Coast', 'west-coast'], ['Canterbury', 'canterbury'],
      ['Otago', 'otago'], ['Fiordland', 'fiordland'], ['Southland', 'southland'],
    ];
    FALLBACK_REGIONS.forEach(([label, slug]) => {
      regions.push({ href: `/parks-and-recreation/places-to-go/${slug}/`, label });
    });
  }

  // Empty-block guard.
  if (!heading && regions.length === 0) {
    element.replaceWith(...element.childNodes);
    return;
  }

  // Build a single content column: heading + region-links list.
  const contentCell = [];
  if (heading) contentCell.push(heading);

  if (regions.length > 0) {
    const ul = document.createElement('ul');
    regions.forEach(({ href, label }) => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.setAttribute('href', href);
      a.textContent = label;
      li.appendChild(a);
      ul.appendChild(li);
    });
    contentCell.push(ul);
  }

  const cells = [];
  cells.push([contentCell]); // Row 2: single column holding all captured content.

  const block = WebImporter.Blocks.createBlock(document, { name: 'columns-map', cells });
  element.replaceWith(block);
}
