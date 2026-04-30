import { getMetadata } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';
import { loadFragment } from '../fragment/fragment.js';

const SECTION_COLOURS = ['ranginui', 'paptuanuku', 'atawhenua', 'weta'];

// Brand constants — not authored in UE (no linked-image field in the image
// component). Update these if the logo asset or home URL ever changes.
const BRAND_HREF = '/';
const BRAND_LOGO_SRC = '/icons/doc-logo-white.svg';
const BRAND_LOGO_ALT = 'Department of Conservation | Te Papa Atawhai';
const BRAND_LOGO_WIDTH = 160;
const BRAND_LOGO_HEIGHT = 44;

// Tool URL constants — also not authored in UE.
const SEARCH_ACTION = '/search-results/';
const AUTH_HREF = '/footer-links/online-service-accounts/';
const FAVOURITES_HREF = '/parks-and-recreation/my-saved-list/';

const isMobile = window.matchMedia('(max-width: 767.98px)');

/**
 * Close all open mega-menu items.
 * @param {Element} navSections
 */
function closeAllSections(navSections) {
  navSections.querySelectorAll('.nav-drop[aria-expanded="true"]').forEach((li) => {
    li.setAttribute('aria-expanded', 'false');
  });
}

/**
 * Toggle mobile hamburger menu open/closed.
 * @param {Element} nav
 * @param {boolean|null} forceExpanded if non-null, force to this state
 */
function toggleMobileMenu(nav, forceExpanded = null) {
  const expanded = forceExpanded !== null
    ? forceExpanded
    : nav.getAttribute('aria-expanded') !== 'true';
  nav.setAttribute('aria-expanded', expanded ? 'true' : 'false');
  document.body.style.overflowY = (expanded && isMobile.matches) ? 'hidden' : '';
  const button = nav.querySelector('.nav-hamburger button');
  if (button) {
    button.setAttribute('aria-label', expanded ? 'Close navigation' : 'Open navigation');
    button.setAttribute('aria-expanded', expanded ? 'true' : 'false');
  }
  if (!expanded) closeAllSections(nav.querySelector('.nav-sections'));
}

function buildSkipLink() {
  const a = document.createElement('a');
  a.className = 'skip-to-content';
  a.href = '#main-heading';
  a.textContent = 'Skip to content';
  return a;
}

function buildGoldBar() {
  const div = document.createElement('div');
  div.className = 'header-gold-bar';
  div.setAttribute('aria-hidden', 'true');
  return div;
}

function buildPrintHeader() {
  const div = document.createElement('div');
  div.className = 'header-print';
  div.innerHTML = '<span>Department of Conservation | Te Papa Atawhai</span>';
  const url = document.createElement('span');
  url.className = 'header-print-url';
  url.textContent = window.location.href;
  div.append(url);
  return div;
}

/**
 * Resolve which section colour class is on a `Nav Section` block element.
 * @param {Element} blockEl
 * @returns {string|null}
 */
function findSectionColour(blockEl) {
  return SECTION_COLOURS.find((c) => blockEl.classList.contains(c)) || null;
}

/**
 * Convert a `Nav Section` UE block into a decorated <li> with sub-link list and
 * an optional Popular panel.
 *
 * Each row of the block is one `Nav Item` with two cells:
 *   cell 0: <a href>linkText</a>  (collapsed link + linkText)
 *   cell 1: "true" | "false"      (the boolean `popular` field)
 *
 * The section heading + section href are read from the heading element that
 * immediately precedes the block in the source fragment.
 *
 * @param {Element} blockEl       the `.nav-section` block element
 * @param {Element|null} headingEl the heading (e.g. <h3>) preceding the block
 */
function buildNavItem(blockEl, headingEl) {
  const li = document.createElement('li');
  moveInstrumentation(blockEl, li);

  const colour = findSectionColour(blockEl);
  if (colour) li.classList.add(`section-${colour}`);

  // Section heading link
  const headingLink = headingEl?.querySelector('a');
  const sectionHref = headingLink?.getAttribute('href') || '#';
  const sectionLabel = (headingLink?.textContent || headingEl?.textContent || '').trim();

  const mainLink = document.createElement('a');
  mainLink.href = sectionHref;
  mainLink.textContent = sectionLabel;
  if (headingLink) moveInstrumentation(headingLink, mainLink);
  li.append(mainLink);

  // Split rows into sub-links and popular-links by reading the boolean cell.
  const subLinks = document.createElement('ul');
  const popularLinks = document.createElement('ul');

  Array.from(blockEl.children).forEach((row) => {
    const [linkCell, popularCell] = row.children;
    const a = linkCell?.querySelector('a');
    if (!a) return;
    // EDS auto-decorates standalone <a> elements as `<a class="button">`. Strip
    // the styling classes so the link renders as a plain dropdown entry.
    a.classList.remove('button');
    a.closest('.button-container')?.classList.remove('button-container');
    const isPopular = (popularCell?.textContent || '').trim().toLowerCase() === 'true';
    const item = document.createElement('li');
    moveInstrumentation(row, item);
    item.append(a);
    (isPopular ? popularLinks : subLinks).append(item);
  });

  if (subLinks.children.length === 0 && popularLinks.children.length === 0) {
    return li;
  }

  li.classList.add('nav-drop');
  li.setAttribute('aria-expanded', 'false');

  const dropdown = document.createElement('div');
  dropdown.className = 'nav-dropdown';

  if (subLinks.children.length > 0) {
    const subWrap = document.createElement('div');
    subWrap.className = 'nav-sublinks';
    subWrap.append(subLinks);
    dropdown.append(subWrap);
  }

  if (popularLinks.children.length > 0) {
    const popularWrap = document.createElement('div');
    popularWrap.className = 'nav-popular-links';
    const label = document.createElement('p');
    label.className = 'nav-popular-label';
    label.textContent = 'Popular';
    popularWrap.append(label, popularLinks);
    dropdown.append(popularWrap);
  }

  li.append(dropdown);
  return li;
}

function wireNavSectionToggles(navSections) {
  const drops = navSections.querySelectorAll('.nav-drop');
  drops.forEach((drop) => {
    const mainLink = drop.querySelector(':scope > a');

    const open = () => {
      if (isMobile.matches) return;
      closeAllSections(navSections);
      drop.setAttribute('aria-expanded', 'true');
    };
    const close = () => {
      if (isMobile.matches) return;
      drop.setAttribute('aria-expanded', 'false');
    };

    drop.addEventListener('mouseenter', open);
    drop.addEventListener('mouseleave', close);
    drop.addEventListener('focusin', open);
    drop.addEventListener('focusout', (e) => {
      if (!drop.contains(e.relatedTarget)) close();
    });

    if (mainLink) {
      mainLink.addEventListener('click', (e) => {
        if (isMobile.matches) {
          e.preventDefault();
          const expanded = drop.getAttribute('aria-expanded') === 'true';
          drop.setAttribute('aria-expanded', expanded ? 'false' : 'true');
        }
      });
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeAllSections(navSections);
  });
}

/**
 * Build the mega-nav <ul> by walking the sections-source children, pairing
 * each heading element with the next sibling `.nav-section` block.
 * @param {Element} sectionsSrc
 */
function buildSections(sectionsSrc) {
  const navSections = document.createElement('div');
  navSections.className = 'nav-sections';
  if (!sectionsSrc) return navSections;

  const ul = document.createElement('ul');

  // EDS wraps default content into .default-content-wrapper and each block into
  // .{block-name}-wrapper. Walk the wrappers in order and pair each heading
  // (last heading we saw) with the next .nav-section block.
  let pendingHeading = null;

  const walk = (root) => {
    Array.from(root.children).forEach((child) => {
      if (/^H[1-6]$/.test(child.tagName)) {
        pendingHeading = child;
        return;
      }
      if (child.classList?.contains('nav-section')) {
        const li = buildNavItem(child, pendingHeading);
        ul.append(li);
        pendingHeading = null;
        return;
      }
      // Recurse into wrappers (default-content-wrapper, nav-section-wrapper).
      if (child.children.length > 0) walk(child);
    });
  };
  walk(sectionsSrc);

  navSections.append(ul);
  return navSections;
}

/**
 * Build the tools row (search form + auth link).
 * URLs are taken from the module-level constants — they are not authored in
 * the nav fragment because the UE image block has no link field.
 */
function buildTools() {
  const tools = document.createElement('div');
  tools.className = 'nav-tools';

  // Site search (compact form, autocomplete stub)
  const searchWrap = document.createElement('div');
  searchWrap.className = 'nav-search-wrap';
  const form = document.createElement('form');
  form.className = 'nav-search-form';
  form.setAttribute('role', 'search');
  form.action = SEARCH_ACTION;
  form.method = 'get';
  const label = document.createElement('label');
  label.className = 'sr-only';
  label.htmlFor = 'global-search-from-header';
  label.textContent = 'Search';
  const input = document.createElement('input');
  input.type = 'search';
  input.id = 'global-search-from-header';
  input.name = 'query';
  input.placeholder = 'Search...';
  input.setAttribute('autocomplete', 'off');
  input.setAttribute('aria-controls', 'nav-search-suggestions');
  const submit = document.createElement('button');
  submit.type = 'submit';
  submit.className = 'nav-search-submit';
  submit.setAttribute('aria-label', 'Search');
  submit.innerHTML = `<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
    <path fill="currentColor" d="M16.9,15.5c2.4-3.2,2.2-7.7-0.7-10.6c-3.1-3.1-8.1-3.1-11.3,0c-3.1,3.2-3.1,8.3,0,11.4c2.9,2.9,7.5,3.1,10.6,0.6c0,0.1,0,0.1,0,0.1l4.2,4.2c0.5,0.4,1.1,0.4,1.5,0c0.4-0.4,0.4-1,0-1.4L16.9,15.5L16.9,15.5z M14.8,6.3c2.3,2.3,2.3,6.1,0,8.5c-2.3,2.3-6.1,2.3-8.5,0C4,12.5,4,8.7,6.3,6.3C8.7,4,12.5,4,14.8,6.3z"/>
  </svg>`;
  const suggestions = document.createElement('ul');
  suggestions.id = 'nav-search-suggestions';
  suggestions.className = 'nav-search-suggestions';
  suggestions.setAttribute('role', 'listbox');
  suggestions.hidden = true;

  form.append(label, input, submit);
  searchWrap.append(form, suggestions);
  tools.append(searchWrap);

  let timer;
  input.addEventListener('input', () => {
    const q = input.value.trim();
    clearTimeout(timer);
    if (!q) {
      suggestions.hidden = true;
      suggestions.replaceChildren();
      return;
    }
    timer = setTimeout(async () => {
      try {
        const res = await fetch(`/search/autocomplete?query=${encodeURIComponent(q)}`);
        if (!res.ok) return;
        const data = await res.json();
        const items = Array.isArray(data) ? data : (data.suggestions || data.results || []);
        suggestions.replaceChildren(...items.slice(0, 8).map((item) => {
          const li = document.createElement('li');
          const text = typeof item === 'string' ? item : (item.title || item.text || item.value || '');
          const url = typeof item === 'string'
            ? `/search-results/?query=${encodeURIComponent(item)}`
            : (item.url || `/search-results/?query=${encodeURIComponent(text)}`);
          const a = document.createElement('a');
          a.href = url;
          a.textContent = text;
          li.append(a);
          return li;
        }));
        suggestions.hidden = suggestions.childElementCount === 0;
      } catch {
        // Autocomplete is best-effort; fail silently.
      }
    }, 200);
  });

  input.addEventListener('blur', () => {
    setTimeout(() => { suggestions.hidden = true; }, 150);
  });
  input.addEventListener('focus', () => {
    if (suggestions.childElementCount > 0) suggestions.hidden = false;
  });

  // Authentication indicator (login or signed-in menu)
  const authWrap = document.createElement('div');
  authWrap.className = 'nav-auth-wrap';
  const isSignedIn = (() => {
    try { return localStorage.getItem('doc-auth') === 'signed-in'; } catch { return false; }
  })();
  const returnUrl = encodeURIComponent(window.location.pathname);

  if (isSignedIn) {
    const fav = document.createElement('a');
    fav.className = 'nav-auth-link';
    fav.href = FAVOURITES_HREF;
    fav.textContent = 'My favourites';
    authWrap.append(fav);
    const signOut = document.createElement('a');
    signOut.className = 'nav-auth-link nav-signout';
    signOut.href = `/account/signout?returnUrl=${returnUrl}`;
    signOut.textContent = 'Sign out';
    authWrap.append(signOut);
  } else {
    const login = document.createElement('a');
    login.className = 'nav-auth-link';
    login.href = `${AUTH_HREF}?returnUrl=${returnUrl}`;
    login.textContent = 'Sign in';
    authWrap.append(login);
  }
  tools.append(authWrap);

  return tools;
}

/**
 * Build the ABN CTA from a `Nav CTA` block. The block's two rows are:
 *   row 0: <div><a href>label</a></div>
 *   row 1: <div><picture>...</picture></div>
 * @param {Element|null} ctaBlock
 */
function buildAbnCta(ctaBlock) {
  if (!ctaBlock) return null;
  const link = ctaBlock.querySelector('a');
  const picture = ctaBlock.querySelector('picture');
  if (!link) return null;
  const a = document.createElement('a');
  a.href = link.getAttribute('href') || '#';
  a.className = 'nav-abn-cta';
  if (!a.getAttribute('aria-label')) {
    a.setAttribute('aria-label', link.textContent.trim() || 'Always Be Naturing');
  }
  moveInstrumentation(ctaBlock, a);
  if (picture) {
    a.append(picture);
  } else {
    a.textContent = link.textContent.trim() || 'Always Be Naturing';
  }
  return a;
}

/**
 * Loads and decorates the DOC header.
 * @param {Element} block The header block element
 */
export default async function decorate(block) {
  const navMeta = getMetadata('nav');
  const navPath = navMeta ? new URL(navMeta, window.location).pathname : '/nav';
  const fragment = await loadFragment(navPath);

  block.textContent = '';
  block.append(buildSkipLink());
  block.append(buildPrintHeader());
  block.append(buildGoldBar());

  const nav = document.createElement('nav');
  nav.id = 'nav';
  nav.setAttribute('aria-label', 'Main navigation');
  nav.setAttribute('aria-expanded', 'false');

  if (!fragment) {
    block.append(nav);
    return;
  }

  // The nav fragment now has a SINGLE top-level section containing:
  //   • H3 + nav-section block pairs (mega-nav)
  //   • An optional nav-cta block (ABN CTA)
  // Brand and tool URLs are hardcoded as module-level constants so that
  // authors only need to manage nav structure in the single DA section.
  const [sectionsSrc] = fragment.querySelectorAll(':scope > div');

  // Brand (logo hardcoded — UE image block has no link field)
  const navBrand = document.createElement('div');
  navBrand.className = 'nav-brand';
  const brandLink = document.createElement('a');
  brandLink.href = BRAND_HREF;
  brandLink.setAttribute('aria-label', BRAND_LOGO_ALT);
  const brandImg = document.createElement('img');
  brandImg.src = BRAND_LOGO_SRC;
  brandImg.alt = BRAND_LOGO_ALT;
  brandImg.width = BRAND_LOGO_WIDTH;
  brandImg.height = BRAND_LOGO_HEIGHT;
  brandImg.loading = 'eager';
  brandLink.append(brandImg);
  navBrand.append(brandLink);

  // Hamburger (mobile)
  const hamburger = document.createElement('div');
  hamburger.classList.add('nav-hamburger');
  hamburger.innerHTML = `<button type="button" aria-controls="nav" aria-label="Open navigation" aria-expanded="false">
    <span class="nav-hamburger-icon"></span>
  </button>`;
  hamburger.querySelector('button').addEventListener('click', () => toggleMobileMenu(nav));

  // Sections (mega-nav)
  const navSections = buildSections(sectionsSrc);
  wireNavSectionToggles(navSections);

  // Tools (search form + auth — URLs are hardcoded constants)
  const navTools = buildTools();

  // ABN CTA (optional nav-cta block inside the single nav section)
  const abnBlock = sectionsSrc?.querySelector('.nav-cta');
  const abnCta = buildAbnCta(abnBlock);

  const navAbnSlot = document.createElement('div');
  navAbnSlot.className = 'nav-abn-slot';
  if (abnCta) navAbnSlot.append(abnCta);

  nav.append(hamburger, navBrand, navAbnSlot, navSections, navTools);

  const navWrapper = document.createElement('div');
  navWrapper.className = 'nav-wrapper';
  navWrapper.append(nav);
  block.append(navWrapper);

  isMobile.addEventListener('change', () => {
    nav.setAttribute('aria-expanded', 'false');
    document.body.style.overflowY = '';
    closeAllSections(navSections);
  });
}
