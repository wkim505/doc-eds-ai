# User Story: Auth Status Block

## Summary
Implement an `auth-status` EDS block to replace the `DocAuthenticationIndicator` Vue component on the DOC NZ website, displaying the user's login state relative to the DOC bookings system.

## User Story
**As a** DOC NZ website visitor who is logged into the bookings system,  
**I want to** see a clear indicator in the site header that I am logged in,  
**So that** I can easily access my bookings and saved list without needing to log in again.

## Background
The `DocAuthenticationIndicator` component displays a logged-in/out state in the DOC header, reflecting whether the user has an active session on `bookings.doc.govt.nz`. When logged in, it shows the user's name and links to "My bookings" and "Log out". When logged out, it shows a "Log in" link. Since EDS has no native authentication layer, this block must detect session state from the bookings subdomain via a lightweight cross-origin check (cookie or API ping).

## Acceptance Criteria

### AC1 — Logged-out state rendering
- **Given** the user does not have an active session on `bookings.doc.govt.nz`,  
- **When** the page loads,  
- **Then** the auth-status block renders a "Log in" link in the header pointing to the bookings login page.

### AC2 — Logged-in state rendering
- **Given** the user has an active session on `bookings.doc.govt.nz`,  
- **When** the page loads and session detection resolves,  
- **Then** the auth-status block renders the user's first name (or email) with links to "My bookings" and "Log out".

### AC3 — Session detection mechanism
- **Given** the block loads,  
- **When** the page renders,  
- **Then** the block makes a lightweight API call to a DOC session check endpoint (e.g. `https://bookings.doc.govt.nz/api/session`) to determine login state, with a timeout of 2 seconds.

### AC4 — Detection timeout fallback
- **Given** the session check API call does not respond within 2 seconds,  
- **When** the timeout fires,  
- **Then** the block defaults to displaying the logged-out "Log in" state, with no layout shift or visible error.

### AC5 — Loading state
- **Given** the session check is in progress,  
- **When** the block renders,  
- **Then** a placeholder/skeleton is shown in the header that does not cause layout shift (reserved width/height matching the logged-in state).

### AC6 — Log out action
- **Given** the user is logged in and clicks "Log out",  
- **When** the click fires,  
- **Then** the user is directed to the bookings system's logout endpoint, which clears their session, and they are returned to the current DOC page.

### AC7 — "My bookings" link
- **Given** the user is logged in,  
- **When** they click "My bookings",  
- **Then** they are navigated to `https://bookings.doc.govt.nz/web/my-bookings` (or equivalent).

### AC8 — Mobile header integration
- **Given** the auth-status block is in the mobile hamburger nav,  
- **When** the nav drawer opens,  
- **Then** the login/user state is shown at the top of the mobile nav with appropriate styling.

### AC9 — Accessible user name display
- **Given** the logged-in user's name is displayed,  
- **When** inspected with a screen reader,  
- **Then** the element has an accessible label (e.g. "Logged in as [Name]. My bookings. Log out.") and the interactive links are individually focusable.

## Live Reference

| Variant | Live URL | Notes |
|---|---|---|
| Logged-out state (header) | https://www.doc.govt.nz/ | "Log in to DOC bookings" link in header nav |
| Logged-in state (header) | https://www.doc.govt.nz/ | Requires active session on `bookings.doc.govt.nz` — log in first at `https://bookings.doc.govt.nz/web/` then return to site |
| Mobile nav auth indicator | https://www.doc.govt.nz/ | Open hamburger menu on mobile to see auth status in nav drawer |

> **Note:** The logged-in state requires an active DOC bookings account. Log into `https://bookings.doc.govt.nz/web/` first, then open the DOC homepage to observe the authenticated state in the header.

## Variants

| Variant | Block Name | Description |
|---|---|---|
| Logged-out | `auth-status` | Displays "Log in" link pointing to bookings login page |
| Logged-in | `auth-status` | Displays user name + "My bookings" + "Log out" links |
| Loading / pending | `auth-status` | Skeleton placeholder while session check resolves |
| Session check timeout | `auth-status` | Falls back to logged-out state after 2s timeout |
| Mobile nav variant | `auth-status (mobile)` | Shown at top of hamburger menu drawer |

## Technical Notes
- Replaces: `DocAuthenticationIndicator`
- Session check: `fetch('https://bookings.doc.govt.nz/api/session', { credentials: 'include' })` — requires CORS configuration on bookings subdomain
- Timeout: `Promise.race([fetch(...), new Promise((_, reject) => setTimeout(reject, 2000))])`
- Fallback: show logged-out state on timeout or error
- Logout redirect: `https://bookings.doc.govt.nz/logout?returnUrl={currentPageUrl}`
- CORS configuration: **DOC bookings API team must allow `www.doc.govt.nz` origin** — this is a hard dependency

## Dependencies
- DOC bookings team must enable CORS on `bookings.doc.govt.nz` for the session check endpoint
- Session check API endpoint to be agreed with bookings team

## Definition of Done
- [ ] Block renders correctly in EDS preview and live (both logged-in and logged-out states)
- [ ] All 9 acceptance criteria pass
- [ ] CORS configuration confirmed with DOC bookings team
- [ ] Session detection timeout fallback verified (network tab — blocked request)
- [ ] No layout shift on session detection (CLS = 0)
- [ ] Mobile header integration verified
- [ ] Screen reader tested
- [ ] Code reviewed and merged
- [ ] Documented with authoring guide and CORS dependency note
