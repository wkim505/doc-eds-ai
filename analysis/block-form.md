# User Story: Form Block

## Summary
Implement a `form` EDS block to replace Optimizely Forms (`EPiServerForms`) on the DOC NZ website, enabling embedded forms for permit applications, consultations, and general enquiries.

## User Story
**As a** DOC content author,  
**I want to** embed a web form on any page using a document table referencing a form configuration,  
**So that** visitors can submit permit applications, consultation responses, volunteer sign-ups, and other enquiries without leaving the DOC website.

## Background
DOC NZ uses Optimizely Forms extensively for public-facing forms — permit/concession applications, "Have your say" consultation submissions, event registrations, and media enquiries. These forms range from simple contact forms to complex multi-step conditional forms (e.g. concession applications with different fields depending on activity type). On migration, forms must be re-platformed to a third-party form provider (AEM Forms, Microsoft Forms, or an equivalent) and embedded via the EDS `form` block.

## Acceptance Criteria

### AC1 — Form embed rendering
- **Given** a page document contains a `form` block with a form URL or embed ID,  
- **When** the page loads,  
- **Then** the form renders within the page content area in a responsive container.

### AC2 — Form provider support
- **Given** a form URL is from a supported provider (Microsoft Forms, Typeform, or AEM Forms),  
- **When** the block renders,  
- **Then** the correct embed method is used for the provider (iframe for Microsoft Forms/Typeform, native web component for AEM Forms).

### AC3 — Form heading and description
- **Given** the form block includes a heading and description row,  
- **When** rendered,  
- **Then** the heading and description appear above the form embed with consistent DOC typography.

### AC4 — Responsive height
- **Given** a form iframe is embedded,  
- **When** rendered at different viewport widths,  
- **Then** the iframe height adjusts to fit the form content (using `postMessage` resize listener or minimum safe height), with no scrollbars within the iframe.

### AC5 — Accessible iframe title
- **Given** the form renders in an iframe,  
- **When** inspected with a screen reader,  
- **Then** the iframe has a descriptive `title` attribute (e.g. "Drone permit application form").

### AC6 — Fallback when form unavailable
- **Given** the form provider is unavailable or the embed fails to load,  
- **When** the block attempts to render,  
- **Then** a fallback message displays with a direct link to the form URL and contact details for assistance.

### AC7 — Privacy notice
- **Given** a form block is rendered,  
- **When** displayed,  
- **Then** a privacy notice statement appears below the form (e.g. "Your information is collected under the Privacy Act 2020...") with a link to DOC's privacy policy.

### AC8 — Mobile usability
- **Given** the form is accessed on a mobile device,  
- **When** rendered,  
- **Then** the form is full-width within the content column, input fields are large enough to tap (≥ 44px height), and the form does not require horizontal scrolling.

## Live Reference

| Variant | Live URL | Notes |
|---|---|---|
| Consultation form | https://www.doc.govt.nz/get-involved/have-your-say/ | Public consultation submission forms |
| Permit application form | https://www.doc.govt.nz/get-involved/apply-for-permits/ | Concession and permit application forms |
| Contact / enquiry form | https://www.doc.govt.nz/footer-links/contact-us/ | General enquiry form |

> **Note:** Forms are embedded via Optimizely Forms iframes. Open in a JavaScript-enabled browser to view and interact with the live form embeds.

## Variants

| Variant | Block Name | Description |
|---|---|---|
| Microsoft Forms embed | `form` | iframe embed from `forms.office.com` |
| Typeform embed | `form` | iframe embed from `embed.typeform.com` |
| AEM Forms (native) | `form` | AEM Forms web component (preferred for complex multi-step forms) |
| With heading + description | `form` | DOC-styled heading and intro text above the form iframe |
| Without heading | `form` | Form only; no surrounding text |
| With privacy notice | `form` | Privacy Act 2020 notice shown below the embed (default) |
| Simple contact form | `form` | Short form: name, email, message |
| Complex multi-step | `form (multi-step)` | Conditional multi-step form (concession applications) — AEM Forms only |

## Technical Notes
- Replaces: Optimizely `EPiServerForms`
- Supported providers: Microsoft Forms (`forms.office.com`), Typeform (`embed.typeform.com`), AEM Forms
- Provider detection: from the embed URL domain
- iframe resize: `postMessage` listener or fixed safe height fallback (800px)
- Privacy notice: standard DOC text, stored as a fragment in the document repo
- Complex multi-step forms (concession applications): scoped separately — may require bespoke AEM Forms implementation

## Definition of Done
- [ ] Block renders correctly in EDS preview and live for each supported form provider
- [ ] All 8 acceptance criteria pass
- [ ] iframe `title` verified for accessibility
- [ ] Privacy notice text approved by DOC Legal team
- [ ] Mobile usability verified at 375px
- [ ] Fallback behaviour verified with network request blocked
- [ ] Authored and verified in SharePoint/Google Drive document
- [ ] Code reviewed and merged
- [ ] Documented with authoring guide listing supported providers
