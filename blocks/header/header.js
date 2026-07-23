import { getMetadata } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';
import { loadFragment } from '../fragment/fragment.js';

const isMobile = window.matchMedia('(max-width: 767.98px)');

// DOC themes each top-level section's dropdown with a distinct colour, keyed by
// the section's landing-page path. Values map to --color-{name} tokens in styles.css.
const SECTION_COLOUR_BY_PATH = {
  '/parks-and-recreation/': 'ranginui',
  '/nature/': 'paptuanuku',
  '/get-involved/': 'atawhenua',
  '/our-work/': 'weta',
};

/**
 * Resolve a section colour name from a section landing-page href.
 * @param {string} href
 * @returns {string|null}
 */
function sectionColourFromHref(href) {
  if (!href) return null;
  try {
    const path = new URL(href, window.location.origin).pathname;
    return SECTION_COLOUR_BY_PATH[path] || null;
  } catch (e) {
    return SECTION_COLOUR_BY_PATH[href] || null;
  }
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
 * Build one top-level nav <li> with a dropdown, from a flat-semantic source:
 *   <h2><a href>Section</a></h2>   ← the top-level trigger (also a link)
 *   <ul> … main sub-links … </ul>
 *   <h3>Popular</h3>
 *   <ul> … popular links … </ul>
 *
 * @param {Element} headingEl   the <h2> heading element (section trigger)
 * @param {Element[]} followers the sibling elements after the heading, up to the
 *                              next <h2> (a mix of <ul> lists and a <h3>Popular label)
 */
function buildNavItem(headingEl, followers) {
  const li = document.createElement('li');
  moveInstrumentation(headingEl, li);

  const headingLink = headingEl.querySelector('a');
  const sectionHref = headingLink?.getAttribute('href') || '#';
  const sectionLabel = (headingLink?.textContent || headingEl.textContent || '').trim();

  const colour = sectionColourFromHref(sectionHref);
  if (colour) li.classList.add(`section-${colour}`);

  const mainLink = document.createElement('a');
  mainLink.href = sectionHref;
  mainLink.textContent = sectionLabel;
  if (headingLink) moveInstrumentation(headingLink, mainLink);
  li.append(mainLink);

  const subLinks = document.createElement('ul');
  const popularLinks = document.createElement('ul');

  // Walk followers: <ul> before a "Popular" <h3> → sub-links; after → popular.
  let inPopular = false;
  followers.forEach((el) => {
    if (/^H[1-6]$/.test(el.tagName)) {
      if (/popular/i.test(el.textContent || '')) inPopular = true;
      return;
    }
    if (el.tagName !== 'UL') return;
    el.querySelectorAll(':scope > li').forEach((srcLi) => {
      const a = srcLi.querySelector('a');
      if (!a) return;
      // EDS auto-decorates standalone <a> as `<a class="button">`; strip it.
      a.classList.remove('button');
      a.closest('.button-container')?.classList.remove('button-container');
      const item = document.createElement('li');
      const link = document.createElement('a');
      link.href = a.getAttribute('href') || '#';
      link.textContent = (a.textContent || '').trim();
      item.append(link);
      (inPopular ? popularLinks : subLinks).append(item);
    });
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
  // Delay closing so the cursor can traverse the gap between a trigger and its
  // panel (and between adjacent triggers) without the dropdown vanishing.
  const CLOSE_DELAY_MS = 200;

  const drops = navSections.querySelectorAll('.nav-drop');
  drops.forEach((drop) => {
    const mainLink = drop.querySelector(':scope > a');
    let closeTimer = null;

    const cancelClose = () => {
      if (closeTimer) {
        clearTimeout(closeTimer);
        closeTimer = null;
      }
    };

    const open = () => {
      if (isMobile.matches) return;
      cancelClose();
      closeAllSections(navSections);
      drop.setAttribute('aria-expanded', 'true');
    };
    const close = () => {
      if (isMobile.matches) return;
      cancelClose();
      closeTimer = setTimeout(() => {
        drop.setAttribute('aria-expanded', 'false');
      }, CLOSE_DELAY_MS);
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
 * Build the mega-nav <ul> from a flat-semantic source. The section container
 * holds a repeating sequence of: <h2> (top-level trigger), one or more <ul>
 * lists, and a <h3>Popular</h3> label separating main sub-links from popular
 * links. Each <h2> starts a new top-level item; everything up to the next <h2>
 * belongs to that item.
 * @param {Element} sectionsSrc
 */
function buildSections(sectionsSrc) {
  const navSections = document.createElement('div');
  navSections.className = 'nav-sections';
  if (!sectionsSrc) return navSections;

  const ul = document.createElement('ul');

  // Flatten: EDS may wrap default content in .default-content-wrapper. Collect
  // the meaningful children (headings + lists) in document order.
  const nodes = [];
  const collect = (root) => {
    Array.from(root.children).forEach((child) => {
      if (/^(H[1-6]|UL)$/.test(child.tagName)) {
        nodes.push(child);
      } else if (child.children.length > 0) {
        collect(child);
      }
    });
  };
  collect(sectionsSrc);

  // Group each H2 with its following siblings up to the next H2.
  for (let i = 0; i < nodes.length; i += 1) {
    if (nodes[i].tagName === 'H2') {
      const heading = nodes[i];
      const followers = [];
      let j = i + 1;
      while (j < nodes.length && nodes[j].tagName !== 'H2') {
        followers.push(nodes[j]);
        j += 1;
      }
      ul.append(buildNavItem(heading, followers));
      i = j - 1;
    }
  }

  navSections.append(ul);
  return navSections;
}

/**
 * Build the tools row from the tools-source container.
 * Default-content links (search/auth/favourites) are recognised by their href
 * pattern, since EDS auto-decoration strips authored CSS classes.
 * The ABN CTA is read from the `Nav CTA` block.
 * @param {Element} toolsSrc
 */
function buildTools(toolsSrc) {
  const tools = document.createElement('div');
  tools.className = 'nav-tools';
  if (!toolsSrc) return tools;

  const anchors = Array.from(toolsSrc.querySelectorAll('a'));
  const matchHref = (re) => anchors.find((a) => re.test(a.getAttribute('href') || ''));
  const search = matchHref(/search/i);
  const auth = matchHref(/online-service-accounts|signin|sign-in|login/i);
  const favourites = matchHref(/favourite|saved-list|wishlist/i);

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

  return tools;
}

/**
 * Build the ABN CTA from the tools source. The ABN link is the one whose href
 * contains "always-be-naturing"; it wraps a logo image (picture or img).
 * @param {Element|null} toolsSrc
 */
function buildAbnCta(toolsSrc) {
  if (!toolsSrc) return null;
  const link = Array.from(toolsSrc.querySelectorAll('a'))
    .find((a) => /always-be-naturing/i.test(a.getAttribute('href') || ''));
  if (!link) return null;
  const media = link.querySelector('picture') || link.querySelector('img');
  const a = document.createElement('a');
  a.href = link.getAttribute('href') || '#';
  a.className = 'nav-abn-cta';
  a.setAttribute('aria-label', (link.textContent || '').trim() || 'Always Be Naturing');
  if (media) {
    a.append(media);
  } else {
    a.textContent = (link.textContent || '').trim() || 'Always Be Naturing';
  }
  return a;
}

/**
 * Loads and decorates the DOC header.
 * @param {Element} block The header block element
 */
export default async function decorate(block) {
  const navMeta = getMetadata('nav');
  const navPath = navMeta ? new URL(navMeta, window.location).pathname : '/content/nav';
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
  //   1: sections (mega-nav)  — heading + .nav-section block, repeated
  //   2: tools (search / auth / favourites + Nav CTA block)
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
  hamburger.classList.add('nav-hamburger');
  hamburger.innerHTML = `<button type="button" aria-controls="nav" aria-label="Open navigation" aria-expanded="false">
    <span class="nav-hamburger-icon"></span>
  </button>`;
  hamburger.querySelector('button').addEventListener('click', () => toggleMobileMenu(nav));

  // Sections (mega-nav)
  const navSections = buildSections(sectionsSrc);
  wireNavSectionToggles(navSections);

  // Tools + ABN CTA
  const navTools = buildTools(toolsSrc);
  const abnCta = buildAbnCta(toolsSrc);

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
