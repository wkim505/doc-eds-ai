/* eslint-disable */
var CustomImportScript = (() => {
  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // tools/importer/import-homepage.js
  var import_homepage_exports = {};
  __export(import_homepage_exports, {
    default: () => import_homepage_default
  });

  // tools/importer/parsers/cards-doc.js
  function parse(element, { document }) {
    let cardEls = Array.from(element.querySelectorAll(":scope .widget__content > div.card"));
    if (cardEls.length === 0) {
      cardEls = Array.from(element.querySelectorAll("div.card"));
    }
    if (cardEls.length === 0) {
      element.replaceWith(...element.childNodes);
      return;
    }
    const cells = [];
    cardEls.forEach((card) => {
      const img = card.querySelector("img");
      const imageCell = document.createDocumentFragment();
      if (img) {
        imageCell.appendChild(document.createComment(" field:image "));
        imageCell.appendChild(img);
      }
      const textCell = document.createDocumentFragment();
      textCell.appendChild(document.createComment(" field:text "));
      const heading = card.querySelector("h3.card_header, .card_header, h3, h2");
      if (heading) textCell.appendChild(heading);
      const desc = card.querySelector(".card_header ~ div p, p");
      if (desc) textCell.appendChild(desc);
      cells.push([imageCell, textCell]);
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "cards-doc", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/hero-doc.js
  function parse2(element, { document }) {
    const picture = element.querySelector("picture");
    const img = element.querySelector("img.hero__image, picture img, img");
    const heading = element.querySelector('h1, h2, .doc-h1, [class*="heading"] h1');
    const linkContainer = element.querySelector('.hero__bottom-left-slot > div:last-child, [class*="flex-wrap"]');
    let quickLinks = [];
    if (linkContainer) {
      quickLinks = Array.from(linkContainer.querySelectorAll(":scope > div > a, :scope > a"));
    }
    if (quickLinks.length === 0) {
      quickLinks = Array.from(element.querySelectorAll(".hero__bottom-left a"));
    }
    if (!heading && !img && quickLinks.length === 0) {
      element.replaceWith(...element.childNodes);
      return;
    }
    const cells = [];
    const imageContent = picture || img;
    if (imageContent) {
      const imageCell = document.createDocumentFragment();
      imageCell.appendChild(document.createComment(" field:image "));
      imageCell.appendChild(imageContent);
      cells.push([imageCell]);
    } else {
      cells.push([""]);
    }
    const textCell = document.createDocumentFragment();
    textCell.appendChild(document.createComment(" field:text "));
    if (heading) textCell.appendChild(heading);
    quickLinks.forEach((a) => {
      const p = document.createElement("p");
      p.appendChild(a);
      textCell.appendChild(p);
    });
    cells.push([textCell]);
    const block = WebImporter.Blocks.createBlock(document, { name: "hero-doc", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/teaser-doc.js
  function parse3(element, { document }) {
    const isWidget = element.classList.contains("widget");
    const img = element.querySelector("img");
    const titleEl = isWidget ? element.querySelector(".widget__content .card_header, .widget__content h3, .widget__content h2") : element.querySelector(".card_header, h2, h3");
    const titleText = titleEl ? (titleEl.textContent || "").trim() : "";
    const bodyNodes = [];
    const dateSpan = element.querySelector(".widget__content span, .card > div > span, span");
    if (dateSpan && (dateSpan.textContent || "").trim() && !dateSpan.classList.contains("sr-only")) {
      const dateP = document.createElement("p");
      dateP.textContent = dateSpan.textContent.trim();
      bodyNodes.push(dateP);
    }
    const paragraphs = Array.from(element.querySelectorAll("p")).filter((p) => (p.textContent || "").trim());
    paragraphs.forEach((p) => bodyNodes.push(p));
    let ctaLink = null;
    let ctaText = "";
    if (isWidget) {
      const moreLink = element.querySelector(".widget__footer a");
      if (moreLink) {
        ctaLink = moreLink.getAttribute("href");
        const clone = moreLink.cloneNode(true);
        clone.querySelectorAll(".sr-only").forEach((n) => n.remove());
        ctaText = (clone.textContent || "").trim();
      }
    } else {
      const cardLink = element.querySelector("a.card_link, a[href]");
      if (cardLink) {
        ctaLink = cardLink.getAttribute("href");
        ctaText = titleText || (cardLink.textContent || "").trim();
      }
    }
    if (!img && !titleText && bodyNodes.length === 0 && !ctaLink) {
      element.replaceWith(...element.childNodes);
      return;
    }
    const cells = [];
    if (img) {
      const imageCell = document.createDocumentFragment();
      imageCell.appendChild(document.createComment(" field:image "));
      imageCell.appendChild(img);
      cells.push([imageCell]);
    } else {
      cells.push([""]);
    }
    if (titleText) {
      const titleCell = document.createDocumentFragment();
      titleCell.appendChild(document.createComment(" field:title "));
      const h = document.createElement("h3");
      h.textContent = titleText;
      titleCell.appendChild(h);
      cells.push([titleCell]);
    } else {
      cells.push([""]);
    }
    if (bodyNodes.length) {
      const bodyCell = document.createDocumentFragment();
      bodyCell.appendChild(document.createComment(" field:body "));
      bodyNodes.forEach((n) => bodyCell.appendChild(n));
      cells.push([bodyCell]);
    } else {
      cells.push([""]);
    }
    if (ctaLink) {
      const ctaCell = document.createDocumentFragment();
      ctaCell.appendChild(document.createComment(" field:link "));
      const a = document.createElement("a");
      a.setAttribute("href", ctaLink);
      a.textContent = ctaText || ctaLink;
      ctaCell.appendChild(a);
      cells.push([ctaCell]);
    } else {
      cells.push([""]);
    }
    const block = WebImporter.Blocks.createBlock(document, { name: "teaser-doc", cells });
    element.replaceWith(block);
  }

  // tools/importer/transformers/doc-cleanup.js
  var TransformHook = {
    beforeTransform: "beforeTransform",
    afterTransform: "afterTransform"
  };
  function transform(hookName, element, payload) {
    if (hookName === TransformHook.beforeTransform) {
      WebImporter.DOMUtils.remove(element, [
        ".grecaptcha-badge",
        ".grecaptcha-logo",
        ".grecaptcha-error",
        ".g-recaptcha-response"
      ]);
    }
    if (hookName === TransformHook.afterTransform) {
      WebImporter.DOMUtils.remove(element, [
        "header",
        "nav",
        ".doc-main-layout__breadcrumb",
        "#skip-to-content",
        "footer"
      ]);
      WebImporter.DOMUtils.remove(element, [
        "script",
        "noscript",
        "iframe",
        "link",
        "style",
        "textarea",
        'img[src^="data:image/svg+xml"]'
      ]);
    }
  }

  // tools/importer/transformers/doc-sections.js
  var TransformHook2 = {
    beforeTransform: "beforeTransform",
    afterTransform: "afterTransform"
  };
  function transform2(hookName, element, payload) {
    if (hookName === TransformHook2.afterTransform) {
      const sections = payload && payload.template && payload.template.sections;
      if (!Array.isArray(sections) || sections.length < 2) {
        return;
      }
      const doc = element.ownerDocument;
      const resolved = sections.map((section) => ({
        section,
        el: section.selector ? element.querySelector(section.selector) : null
      }));
      for (let i = resolved.length - 1; i >= 0; i -= 1) {
        const { section, el } = resolved[i];
        if (!el) {
          continue;
        }
        if (section.style) {
          const metadataBlock = WebImporter.Blocks.createBlock(doc, {
            name: "Section Metadata",
            cells: { style: section.style }
          });
          el.after(metadataBlock);
        }
        if (i > 0) {
          const hr = doc.createElement("hr");
          el.before(hr);
        }
      }
    }
  }

  // tools/importer/import-homepage.js
  var PAGE_TEMPLATE = {
    name: "homepage",
    description: "DOC NZ homepage with hero, featured highlight, blog teaser, featured cards, and media release cards",
    urls: [
      "https://www.doc.govt.nz/"
    ],
    blocks: [
      {
        name: "hero-doc",
        instances: [".doc-main-layout__hero"]
      },
      {
        name: "teaser-doc",
        instances: [
          ".doc-homepage-layout__content_top > div.card",
          ".doc-homepage-layout__content_top > div.widget"
        ]
      },
      {
        name: "cards-doc",
        instances: [
          ".doc-homepage-layout__content_bottom > div.widget:nth-of-type(1)",
          ".doc-homepage-layout__content_bottom > div.widget:nth-of-type(2)"
        ]
      }
    ],
    sections: [
      {
        id: "rc3",
        name: "hero",
        selector: ".doc-main-layout__hero",
        style: null,
        blocks: ["hero-doc"],
        defaultContent: []
      },
      {
        id: "rc4",
        name: "content_top",
        selector: ".doc-homepage-layout__content_top",
        style: "columns",
        blocks: ["teaser-doc"],
        defaultContent: []
      },
      {
        id: "rc5",
        name: "content_bottom",
        selector: ".doc-homepage-layout__content_bottom",
        style: "columns",
        blocks: ["cards-doc"],
        defaultContent: []
      }
    ]
  };
  var parsers = {
    "hero-doc": parse2,
    "teaser-doc": parse3,
    "cards-doc": parse
  };
  var transformers = [
    transform,
    ...PAGE_TEMPLATE.sections && PAGE_TEMPLATE.sections.length > 1 ? [transform2] : []
  ];
  function executeTransformers(hookName, element, payload) {
    const enhancedPayload = __spreadProps(__spreadValues({}, payload), {
      template: PAGE_TEMPLATE
    });
    transformers.forEach((transformerFn) => {
      try {
        transformerFn.call(null, hookName, element, enhancedPayload);
      } catch (e) {
        console.error(`Transformer failed at ${hookName}:`, e);
      }
    });
  }
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
            section: blockDef.section || null
          });
        });
      });
    });
    console.log(`Found ${pageBlocks.length} block instances on page`);
    return pageBlocks;
  }
  var import_homepage_default = {
    transform: (payload) => {
      const {
        document,
        url,
        html,
        params
      } = payload;
      const main = document.body;
      executeTransformers("beforeTransform", main, payload);
      const pageBlocks = findBlocksOnPage(document, PAGE_TEMPLATE);
      pageBlocks.forEach((block) => {
        if (!block.element.parentNode) return;
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
      executeTransformers("afterTransform", main, payload);
      const hr = document.createElement("hr");
      main.appendChild(hr);
      WebImporter.rules.createMetadata(main, document);
      WebImporter.rules.transformBackgroundImages(main, document);
      WebImporter.rules.adjustImageUrls(main, url, params.originalURL);
      const pathname = new URL(params.originalURL).pathname.replace(/\/$/, "").replace(/\.html$/, "");
      const path = WebImporter.FileUtils.sanitizePath(pathname || "/index");
      return [{
        element: main,
        path,
        report: {
          title: document.title,
          template: PAGE_TEMPLATE.name,
          blocks: pageBlocks.map((b) => b.name)
        }
      }];
    }
  };
  return __toCommonJS(import_homepage_exports);
})();
