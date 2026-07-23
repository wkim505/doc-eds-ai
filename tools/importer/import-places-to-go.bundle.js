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

  // tools/importer/import-places-to-go.js
  var import_places_to_go_exports = {};
  __export(import_places_to_go_exports, {
    default: () => import_places_to_go_default
  });

  // tools/importer/parsers/hero-doc.js
  function parse(element, { document }) {
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

  // tools/importer/parsers/cards-doc.js
  function parse2(element, { document }) {
    let cardEls = Array.from(element.querySelectorAll(":scope .widget__content > div.card"));
    if (cardEls.length === 0) {
      cardEls = Array.from(element.querySelectorAll("div.card"));
    }
    if (cardEls.length === 0) {
      element.replaceWith(...element.childNodes);
      return;
    }
    const cells = [];
    const titleEl = element.querySelector(".widget__title h2, .widget__title h3");
    const titleText = titleEl ? (titleEl.textContent || "").trim() : "";
    if (titleText) {
      const titleCell = document.createDocumentFragment();
      const h2 = document.createElement("h2");
      h2.textContent = titleText;
      titleCell.appendChild(h2);
      cells.push([titleCell]);
    }
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

  // tools/importer/parsers/columns-filter.js
  function parse3(element, { document }) {
    const heading = element.querySelector(':scope > h2, h2, [class*="title"]');
    const wrapperEls = Array.from(element.querySelectorAll(".multiselect__wrapper"));
    const simpleCatEls = Array.from(element.querySelectorAll(".filter-category"));
    const searchBtn = element.querySelector('#search-button, button[id*="search"]');
    const existingSearchLink = element.querySelector('a[href*="places-to-go"]');
    if (!heading && wrapperEls.length === 0 && simpleCatEls.length === 0 && !searchBtn && !existingSearchLink) {
      element.replaceWith(...element.childNodes);
      return;
    }
    const contentCell = [];
    if (heading) contentCell.push(heading);
    if (wrapperEls.length > 0) {
      wrapperEls.forEach((wrapper) => {
        const label = wrapper.querySelector(".multiselect__label");
        const value = wrapper.querySelector(".multiselect__placeholder, .multiselect__single");
        const name = label ? (label.textContent || "").trim() : "";
        const val = value ? (value.textContent || "").trim() : "";
        if (!name) return;
        const p = document.createElement("p");
        const strong = document.createElement("strong");
        strong.textContent = name;
        p.appendChild(strong);
        if (val) p.appendChild(document.createTextNode(`: ${val}`));
        contentCell.push(p);
      });
    } else if (simpleCatEls.length > 0) {
      simpleCatEls.forEach((cat) => contentCell.push(cat));
    }
    if (existingSearchLink) {
      const p = document.createElement("p");
      p.appendChild(existingSearchLink);
      contentCell.push(p);
    } else if (searchBtn) {
      const p = document.createElement("p");
      const a = document.createElement("a");
      a.setAttribute("href", "/parks-and-recreation/places-to-go/");
      a.textContent = (searchBtn.textContent || "Search").trim() || "Search";
      p.appendChild(a);
      contentCell.push(p);
    }
    const cells = [];
    cells.push([contentCell]);
    const block = WebImporter.Blocks.createBlock(document, { name: "columns-filter", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/columns-map.js
  function parse4(element, { document }) {
    const heading = element.querySelector(':scope h2, h2, [class*="title"]');
    const regions = [];
    const realAnchors = Array.from(
      element.querySelectorAll('a[href*="/places-to-go/"]')
    ).filter((a) => {
      const href = a.getAttribute("href") || "";
      return /\/places-to-go\/[^/]+\/?$/.test(href) && !/\/places-to-go\/?$/.test(href);
    });
    const labelFromHref = (href) => {
      const m = (href || "").match(/\/places-to-go\/([^/]+)\/?$/);
      if (!m) return "";
      return m[1].split("-").map((w) => w ? w.charAt(0).toUpperCase() + w.slice(1) : w).join(" ");
    };
    realAnchors.forEach((a) => {
      let label = (a.textContent || "").trim();
      if (!label) {
        const poly = a.querySelector("[aria-label]");
        label = poly && poly.getAttribute("aria-label") ? poly.getAttribute("aria-label").trim() : "";
      }
      if (!label) label = a.getAttribute("aria-label") || "";
      if (!label) label = labelFromHref(a.getAttribute("href"));
      if (label) regions.push({ href: a.getAttribute("href"), label: label.trim() });
    });
    const decodeBase64 = (b64) => {
      let text = "";
      if (typeof Buffer !== "undefined") {
        try {
          text = Buffer.from(b64, "base64").toString("utf8");
        } catch (e) {
          text = "";
        }
      }
      if (!text && typeof atob === "function") {
        try {
          const raw = atob(b64);
          try {
            text = decodeURIComponent(raw.split("").map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`).join(""));
          } catch (e2) {
            text = raw;
          }
        } catch (e) {
          text = "";
        }
      }
      return text;
    };
    const extractFromSvg = (svgText) => {
      const found = [];
      if (!svgText || !svgText.includes("places-to-go")) return found;
      const re = /href="([^"]*\/places-to-go\/[^"]+)"[^>]*>\s*<polygon[^>]*aria-label="([^"]+)"/g;
      let m;
      while ((m = re.exec(svgText)) !== null) {
        const href = m[1];
        const label = (m[2] || "").trim();
        if (href && label) found.push({ href, label });
      }
      return found;
    };
    if (regions.length === 0) {
      const html = element.innerHTML || "";
      const dataUriRe = /data:image\/svg\+xml;base64,([A-Za-z0-9+/=]+)/g;
      let d;
      while (regions.length === 0 && (d = dataUriRe.exec(html)) !== null) {
        const svgText = decodeBase64(d[1]);
        extractFromSvg(svgText).forEach((r) => regions.push(r));
      }
    }
    if (regions.length === 0) {
      extractFromSvg(element.innerHTML || "").forEach((r) => regions.push(r));
    }
    if (regions.length === 0) {
      const FALLBACK_REGIONS = [
        ["Northland", "northland"],
        ["Auckland", "auckland"],
        ["Coromandel", "coromandel"],
        ["Waikato", "waikato"],
        ["Bay of Plenty", "bay-of-plenty"],
        ["East Coast", "east-coast"],
        ["Central North Island", "central-north-island"],
        ["Taranaki", "taranaki"],
        ["Manawatu/Whanganui", "manawatu-whanganui"],
        ["Hawke\u2019s Bay", "hawkes-bay"],
        ["Wairarapa", "wairarapa"],
        ["Wellington/Kapiti", "wellington-kapiti"],
        ["Chatham Islands", "chatham-islands"],
        ["Nelson/Tasman", "nelson-tasman"],
        ["Marlborough", "marlborough"],
        ["West Coast", "west-coast"],
        ["Canterbury", "canterbury"],
        ["Otago", "otago"],
        ["Fiordland", "fiordland"],
        ["Southland", "southland"]
      ];
      FALLBACK_REGIONS.forEach(([label, slug]) => {
        regions.push({ href: `/parks-and-recreation/places-to-go/${slug}/`, label });
      });
    }
    if (!heading && regions.length === 0) {
      element.replaceWith(...element.childNodes);
      return;
    }
    const contentCell = [];
    if (heading) contentCell.push(heading);
    if (regions.length > 0) {
      const ul = document.createElement("ul");
      regions.forEach(({ href, label }) => {
        const li = document.createElement("li");
        const a = document.createElement("a");
        a.setAttribute("href", href);
        a.textContent = label;
        li.appendChild(a);
        ul.appendChild(li);
      });
      contentCell.push(ul);
    }
    const cells = [];
    cells.push([contentCell]);
    const block = WebImporter.Blocks.createBlock(document, { name: "columns-map", cells });
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

  // tools/importer/import-places-to-go.js
  var PAGE_TEMPLATE = {
    name: "places-to-go",
    description: "Parks & recreation section landing page: breadcrumb, hero with title, intro/overview, 'In this section' links, a search filter, and a regional hotspot map",
    urls: [
      "https://www.doc.govt.nz/parks-and-recreation/places-to-go/"
    ],
    blocks: [
      {
        name: "hero-doc",
        instances: [".doc-main-layout__hero"]
      },
      {
        name: "cards-doc",
        instances: ["div.doc-main-layout__main__container-content > div:nth-of-type(2)"]
      },
      {
        name: "columns-filter",
        instances: ["div.doc-main-layout__main__container-content > div.bg-white.pb-4.pl-3.pr-3.pt-2"]
      },
      {
        name: "columns-map",
        instances: ["div.doc-main-layout__main__container-content > div.hotspotmapblock"]
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
        name: "overview",
        selector: ".doc-standard-overview",
        style: null,
        blocks: [],
        defaultContent: [".doc-standard-overview__intro-text"]
      },
      {
        id: "rc5",
        name: "in-this-section",
        selector: "div.doc-main-layout__main__container-content > div:nth-of-type(2)",
        style: null,
        blocks: ["cards-doc"],
        defaultContent: []
      },
      {
        id: "rc6",
        name: "search-filter",
        selector: "div.doc-main-layout__main__container-content > div.bg-white.pb-4.pl-3.pr-3.pt-2",
        style: null,
        blocks: ["columns-filter"],
        defaultContent: []
      },
      {
        id: "rc7",
        name: "region-map",
        selector: "div.doc-main-layout__main__container-content > div.hotspotmapblock",
        style: null,
        blocks: ["columns-map"],
        defaultContent: []
      }
    ]
  };
  var parsers = {
    "hero-doc": parse,
    "cards-doc": parse2,
    "columns-filter": parse3,
    "columns-map": parse4
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
  var import_places_to_go_default = {
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
  return __toCommonJS(import_places_to_go_exports);
})();
