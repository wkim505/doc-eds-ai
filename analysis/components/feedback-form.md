# Feedback Form Block — Component Specification

## User Story
**DOCEDS-028**
**As a** site visitor, **I want to** provide feedback on page content **so that** DOC can improve information quality.

## Description
Page feedback form present in the footer area of all pages. Uses EPiServer Forms with reCAPTCHA v3 for spam prevention.

## Source Vue Components
- `DocPageFeedback`
- EPiServer Forms framework (jQuery-based)

## Acceptance Criteria
1. "How can we improve the information?" textarea
2. reCAPTCHA v3 integration (invisible, token-based)
3. Submit button
4. Success/error messaging after submission
5. Hidden fields: page name, page URL (auto-populated)
6. Present in footer area of all pages
7. Accessible: form labels, error messages linked to fields
8. Must be authorable via Universal Editor

## Technical Notes for EDS
### JS Requirements
- reCAPTCHA v3 script loading and token generation
- Form submission via fetch/XHR
- Success/error state management
- Hidden field population from page metadata

### Block Structure
```
feedback-form (block)
├── heading ("How can we improve the information?")
├── textarea (feedback input)
├── hidden-fields (page-name, page-url)
├── recaptcha-token
└── submit-button
```

## AI Implementation Instructions
### Mandatory Skills
- `building-blocks` — EDS block JS/CSS structure and decoration

### Validation Loop
Use Chrome MCP to verify form renders and submits with reCAPTCHA token.

## Live References
| Variation | URL |
|-----------|-----|
| All pages (footer area) | https://www.doc.govt.nz/ |
