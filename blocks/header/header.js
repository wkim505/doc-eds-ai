import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

const SECTION_COLOURS = ['ranginui', 'paptuanuku', 'atawhenua', 'weta'];
const COLOUR_PATTERN = /\s*\{(ranginui|paptuanuku|atawhenua|weta)\}\s*$/i;

const isMobile = window.matchMedia('(max-width: 767.98px)');

/**
 * Extract a section colour token (e.g. "{ranginui}") from a link's text.
 * Returns the colour key (or null) and strips the token from the link.
 * @param {HTMLAnchorElement} link
 */
function extractSectionColour(link) {
  if (!link) return null;
  const match = link.textContent.match(COLOUR_PATTERN);
  if (!match) return null;
  const colour = match[1].toLowerCase();
  link.textContent = link.textContent.replace(COLOUR_PATTERN, '').trim();
  return SECTION_COLOURS.includes(colour) ? colour : null;
}

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

/**
 * Create a "Skip to content" link that targets #main-heading.
 */
function buildSkipLink() {
  const a = document.createElement('a');
  a.className = 'skip-to-content';
  a.href = '#main-heading';
  a.textContent = 'Skip to content';
  return a;
}

/**
 * Build the gold accent bar (10px high).
 */
function buildGoldBar() {
  const div = document.createElement('div');
  div.className = 'header-gold-bar';
  div.setAttribute('aria-hidden', 'true');
  return div;
}

/**
 * Build the print-only text variant of the header.
 */
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
 * Decorate a top-level mega-menu list item:
 * - reads the section colour token from its main link
 * - splits child <ul>s into "sub-links" and "popular links"
 *   (any <h4> inside the <li> separates the two)
 * @param {HTMLLIElement} li
 */
function decorateNavItem(li) {
  const mainLink = li.querySelector(':scope > a');
  if (!mainLink) return;
  const colour = extractSectionColour(mainLink);
  if (colour) li.classList.add(`section-${colour}`);

  const lists = li.querySelectorAll(':scope > ul');
  const popularHeading = li.querySelector(':scope > h4, :scope > h3');

  if (lists.length === 0) return;

  li.classList.add('nav-drop');
  li.setAttribute('aria-expanded', 'false');

  const dropdown = document.createElement('div');
  dropdown.className = 'nav-dropdown';

  const subLinks = document.createElement('div');
  subLinks.className = 'nav-sublinks';
  subLinks.append(lists[0]);
  dropdown.append(subLinks);

  if (lists.length > 1) {
    const popular = document.createElement('div');
    popular.className = 'nav-popular-links';
    const label = document.createElement('p');
    label.className = 'nav-popular-label';
    label.textContent = popularHeading ? popularHeading.textContent : 'Popular';
    popular.append(label);
    if (popularHeading) popularHeading.remove();
    Array.from(lists).slice(1).forEach((ul) => popular.append(ul));
    dropdown.append(popular);
  }

  li.append(dropdown);
}

/**
 * Wire up hover/click toggles for mega-menu on desktop, accordion on mobile.
 * @param {Element} navSections
 */
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
 * Build a tools section element (search/auth/favourites/abn) from anchors found
 * in the third nav fragment column. Anchors are recognised by their CSS classes
 * (e.g. nav-search, nav-auth, nav-favourites, nav-abn).
 * @param {Element} sourceContainer
 */
function buildTools(sourceContainer) {
  const tools = document.createElement('div');
  tools.className = 'nav-tools';

  if (!sourceContainer) return tools;

  // EDS auto-decorates <a class="button"> on standalone <p> links, stripping any
  // author-provided classes. We therefore identify each tool by its href
  // pattern (and the ABN CTA by its wrapped image).
  const anchors = Array.from(sourceContainer.querySelectorAll('a'));
  const matchHref = (re) => anchors.find((a) => re.test(a.getAttribute('href') || ''));
  const search = matchHref(/search/i);
  const auth = matchHref(/online-service-accounts|signin|sign-in|login/i);
  const favourites = matchHref(/favourite|saved-list|wishlist/i);
  const abn = anchors.find((a) => a.querySelector('img'))
    || matchHref(/always-be-naturing/i);

  // Strip the auto-applied "button" class so our header tools render plain.
  [search, auth, favourites].forEach((a) => {
    if (!a) return;
    a.classList.remove('button');
    a.closest('.button-container')?.classList.remove('button-container');
  });

  // Site search (compact form, autocomplete stub)
  const searchWrap = document.createElement('div');
  searchWrap.className = 'nav-search-wrap';
  const form = document.createElement('form');
  form.className = 'nav-search-form';
  form.setAttribute('role', 'search');
  form.action = search ? search.getAttribute('href') : '/search-results/';
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

  if (isSignedIn && favourites) {
    const fav = favourites.cloneNode(true);
    fav.classList.add('nav-auth-link');
    authWrap.append(fav);
    const signOut = document.createElement('a');
    signOut.className = 'nav-auth-link nav-signout';
    signOut.href = `/account/signout?returnUrl=${encodeURIComponent(window.location.pathname)}`;
    signOut.textContent = 'Sign out';
    authWrap.append(signOut);
  } else if (auth) {
    const login = auth.cloneNode(true);
    login.classList.add('nav-auth-link');
    const baseHref = login.getAttribute('href') || '/footer-links/online-service-accounts/';
    const sep = baseHref.includes('?') ? '&' : '?';
    login.setAttribute('href', `${baseHref}${sep}returnUrl=${encodeURIComponent(window.location.pathname)}`);
    if (!login.textContent.trim()) login.textContent = 'Sign in';
    authWrap.append(login);
  }
  tools.append(authWrap);

  // ABN ("Always Be Naturing") CTA badge
  if (abn) {
    abn.classList.add('nav-abn-cta');
    if (!abn.getAttribute('aria-label')) abn.setAttribute('aria-label', 'Always Be Naturing');
    tools.append(abn);
  }

  return tools;
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

  // The nav fragment provides three top-level sections, in order:
  //   0: brand (logo)
  //   1: sections (mega-nav)
  //   2: tools (search / auth / abn / favourites)
  const fragmentSections = fragment.querySelectorAll(':scope > div');
  const [brandSrc, sectionsSrc, toolsSrc] = fragmentSections;

  // Brand
  const navBrand = document.createElement('div');
  navBrand.className = 'nav-brand';
  if (brandSrc) {
    const link = brandSrc.querySelector('a');
    if (link) {
      navBrand.append(link);
    } else {
      while (brandSrc.firstChild) navBrand.append(brandSrc.firstChild);
    }
  }

  // Hamburger (mobile)
  const hamburger = document.createElement('div');
  hamburger.className = 'nav-hamburger';
  hamburger.innerHTML = `<button type="button" aria-controls="nav" aria-label="Open navigation" aria-expanded="false">
    <span class="nav-hamburger-icon"></span>
  </button>`;
  hamburger.querySelector('button').addEventListener('click', () => toggleMobileMenu(nav));

  // Sections (mega-nav)
  const navSections = document.createElement('div');
  navSections.className = 'nav-sections';
  if (sectionsSrc) {
    const topUl = sectionsSrc.querySelector(':scope > ul')
      || sectionsSrc.querySelector('ul');
    if (topUl) {
      navSections.append(topUl);
      topUl.querySelectorAll(':scope > li').forEach(decorateNavItem);
    }
  }
  wireNavSectionToggles(navSections);

  // Tools
  const navTools = buildTools(toolsSrc);

  // Split off the ABN CTA into a dedicated top-bar slot so it remains
  // visible on mobile (when the rest of the tools collapse into the drawer).
  const navAbnSlot = document.createElement('div');
  navAbnSlot.className = 'nav-abn-slot';
  const abnCta = navTools.querySelector('.nav-abn-cta');
  if (abnCta) navAbnSlot.append(abnCta);

  nav.append(hamburger, navBrand, navAbnSlot, navSections, navTools);

  const navWrapper = document.createElement('div');
  navWrapper.className = 'nav-wrapper';
  navWrapper.append(nav);
  block.append(navWrapper);

  // Sync mobile/desktop state on resize.
  isMobile.addEventListener('change', () => {
    nav.setAttribute('aria-expanded', 'false');
    document.body.style.overflowY = '';
    closeAllSections(navSections);
  });
}
