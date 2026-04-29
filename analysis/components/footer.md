# Footer Block — Component Specification

## User Story
**DOCEDS-002**
**As a** site visitor, **I want to** see a consistent footer with social links, secondary navigation, and government branding **so that** I can access auxiliary information and social channels.

## Description
The footer appears on every page. It contains social media links, secondary navigation links, legal/compliance links, and the NZ Government logo. It also houses the page feedback form.

## Source Vue Components
- `DocFooter` — main footer container
- `DocPageFeedback` — feedback form with reCAPTCHA

## Acceptance Criteria
1. Social media links section: Facebook, Blog, Instagram, YouTube, Other
2. Secondary navigation: Careers, News & events, About us, Contact
3. Legal links row: Copyright, About this site, Privacy & security, OIA requests
4. NZ Government logo (white variant) linking to govt.nz
5. Background color: dark green/black
6. Text color: white
7. Links: underlined on hover
8. Must include page feedback form (DocPageFeedback) above or within footer area
9. Must be authorable via Universal Editor

## Technical Notes for EDS
### CSS Requirements
- Dark background theme (likely `bg-doc-green-900` or similar)
- White text, link hover underlines
- Grid layout: social + nav columns, legal row below

### JS Requirements
- Feedback form submission with reCAPTCHA v3 token
- Form hidden fields: page name, page URL

### Block Structure
```
footer (auto block)
├── social-links[]
├── secondary-nav[]
├── legal-links[]
├── nz-govt-logo
└── feedback-form
```

## AI Implementation Instructions
### Mandatory Skills
- `block-collection-and-party` — For footer auto-block patterns
- `building-blocks` — EDS block JS/CSS structure and decoration

### Validation Loop
Use Chrome MCP iteratively to verify:
1. All social links render with correct icons
2. Secondary navigation links work
3. Legal links row is present
4. NZ Government logo renders
5. Feedback form submits successfully

## Live References
| Variation | URL |
|-----------|-----|
| Footer (all pages) | https://www.doc.govt.nz/ |
| Footer with feedback | https://www.doc.govt.nz/nature/native-animals/ |
