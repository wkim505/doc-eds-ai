/* eslint-disable */
/* global WebImporter */

// PARSER IMPORTS
import heroDocParser from './parsers/hero-doc.js';
import cardsDocParser from './parsers/cards-doc.js';
import columnsFilterParser from './parsers/columns-filter.js';
import columnsMapParser from './parsers/columns-map.js';

// TRANSFORMER IMPORTS
import cleanupTransformer from './transformers/doc-cleanup.js';
import sectionsTransformer from './transformers/doc-sections.js';

// PAGE TEMPLATE CONFIGURATION - Embedded from page-templates.json
const PAGE_TEMPLATE = {
  name: 'places-to-go',
  description: "Parks & recreation section landing page: breadcrumb, hero with title, intro/overview, 'In this section' links, a search filter, and a regional hotspot map",
  urls: [
    'https://www.doc.govt.nz/parks-and-recreation/places-to-go/',
  ],
  blocks: [
    {
      name: 'hero-doc',
      instances: ['.doc-main-layout__hero'],
    },
    {
      name: 'cards-doc',
      instances: ['div.doc-main-layout__main__container-content > div:nth-of-type(2)'],
    },
    {
      name: 'columns-filter',
      instances: ['div.doc-main-layout__main__container-content > div.bg-white.pb-4.pl-3.pr-3.pt-2'],
    },
    {
      name: 'columns-map',
      instances: ['div.doc-main-layout__main__container-content > div.hotspotmapblock'],
    },
  ],
  sections: [
    {
      id: 'rc3', name: 'hero', selector: '.doc-main-layout__hero', style: null, blocks: ['hero-doc'], defaultContent: [],
    },
    {
      id: 'rc4', name: 'overview', selector: '.doc-standard-overview', style: null, blocks: [], defaultContent: ['.doc-standard-overview__intro-text'],
    },
    {
      id: 'rc5', name: 'in-this-section', selector: 'div.doc-main-layout__main__container-content > div:nth-of-type(2)', style: null, blocks: ['cards-doc'], defaultContent: [],
    },
    {
      id: 'rc6', name: 'search-filter', selector: 'div.doc-main-layout__main__container-content > div.bg-white.pb-4.pl-3.pr-3.pt-2', style: null, blocks: ['columns-filter'], defaultContent: [],
    },
    {
      id: 'rc7', name: 'region-map', selector: 'div.doc-main-layout__main__container-content > div.hotspotmapblock', style: null, blocks: ['columns-map'], defaultContent: [],
    },
  ],
};

// PARSER REGISTRY
const parsers = {
  'hero-doc': heroDocParser,
  'cards-doc': cardsDocParser,
  'columns-filter': columnsFilterParser,
  'columns-map': columnsMapParser,
};

// TRANSFORMER REGISTRY - cleanup runs first, section transformer after
const transformers = [
  cleanupTransformer,
  ...(PAGE_TEMPLATE.sections && PAGE_TEMPLATE.sections.length > 1 ? [sectionsTransformer] : []),
];

/**
 * Execute all page transformers for a specific hook
 */
function executeTransformers(hookName, element, payload) {
  const enhancedPayload = {
    ...payload,
    template: PAGE_TEMPLATE,
  };

  transformers.forEach((transformerFn) => {
    try {
      transformerFn.call(null, hookName, element, enhancedPayload);
    } catch (e) {
      console.error(`Transformer failed at ${hookName}:`, e);
    }
  });
}

/**
 * Find all blocks on the page based on the embedded template configuration
 */
function findBlocksOnPage(document, template) {
  const pageBlocks = [];

  template.blocks.forEach((blockDef) => {
    blockDef.instances.forEach((selector) => {
      const elements = document.querySelectorAll(selector);
      if (elements.length === 0) {
        console.warn(`Block "${blockDef.name}" selector not found: ${selector}`);
      }
      elements.forEach((element) => {
        pageBlocks.push({
          name: blockDef.name,
          selector,
          element,
          section: blockDef.section || null,
        });
      });
    });
  });

  console.log(`Found ${pageBlocks.length} block instances on page`);
  return pageBlocks;
}

// EXPORT DEFAULT CONFIGURATION
export default {
  transform: (payload) => {
    const {
      document, url, html, params,
    } = payload;

    const main = document.body;

    // 1. beforeTransform (initial cleanup)
    executeTransformers('beforeTransform', main, payload);

    // 2. Find blocks on page
    const pageBlocks = findBlocksOnPage(document, PAGE_TEMPLATE);

    // 3. Parse each block using registered parsers
    pageBlocks.forEach((block) => {
      if (!block.element.parentNode) return; // Already replaced by earlier parser
      const parser = parsers[block.name];
      if (parser) {
        try {
          parser(block.element, { document, url, params });
        } catch (e) {
          console.error(`Failed to parse ${block.name} (${block.selector}):`, e);
        }
      } else {
        console.warn(`No parser found for block: ${block.name}`);
      }
    });

    // 4. afterTransform (final cleanup + section breaks/metadata)
    executeTransformers('afterTransform', main, payload);

    // 5. WebImporter built-in rules
    const hr = document.createElement('hr');
    main.appendChild(hr);
    WebImporter.rules.createMetadata(main, document);
    WebImporter.rules.transformBackgroundImages(main, document);
    WebImporter.rules.adjustImageUrls(main, url, params.originalURL);

    // 6. Generate sanitized path (root '/' maps to 'index')
    const pathname = new URL(params.originalURL).pathname
      .replace(/\/$/, '')
      .replace(/\.html$/, '');
    const path = WebImporter.FileUtils.sanitizePath(pathname || '/index');

    return [{
      element: main,
      path,
      report: {
        title: document.title,
        template: PAGE_TEMPLATE.name,
        blocks: pageBlocks.map((b) => b.name),
      },
    }];
  },
};
