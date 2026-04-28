# Page Feedback — EDS Block Specification

> **Block ID:** DOCEDS-029  
> **Block Folder:** `blocks/feedback/`  
> **Priority:** Medium  
> **Complexity:** M  
> **Source Components:** doc-page-feedback

---

## User Story

**As a** site visitor, **I want to** provide feedback on whether a page was helpful and optionally leave a comment **so that** DOC can improve their website content.

## Description

The Page Feedback block renders a "Was this page helpful?" prompt near the footer of every content page. Users click "Yes" or "No", and upon selection, a follow-up textarea appears inviting additional comments. The form submission is protected by reCAPTCHA to prevent spam. After submission, a thank-you message replaces the form.

On the Vue site, `doc-page-feedback` handles the entire interaction flow: initial yes/no buttons, conditional comment form reveal, reCAPTCHA validation, and API submission. The component tracks the current page URL and title as part of the feedback payload. It uses CSS classes including `doc-feedback`, `feedbackContainer`, and `formcontainerblockwithcustomdefaultvalues`.

In EDS, the block should replicate this flow with vanilla JavaScript. The reCAPTCHA integration can use Google's reCAPTCHA v3 (invisible) or v2 (checkbox) depending on the DOC configuration. The feedback API endpoint should be configurable. The block should degrade gracefully if JavaScript is unavailable by hiding the feedback section entirely (since it requires JS to function).

## Acceptance Criteria

1. Block displays "Was this page helpful?" with "Yes" and "No" buttons.
2. Clicking "Yes" submits positive feedback and shows a thank-you message.
3. Clicking "No" reveals a comment textarea and submit button.
4. Comment form validates that text is not empty before allowing submission.
5. reCAPTCHA token is obtained and included in the feedback API payload.
6. After submission, the form is replaced with "Thank you for your feedback" message.
7. Feedback payload includes: page URL, page title, helpful (boolean), comment (optional), reCAPTCHA token.
8. Block appears consistently in the footer area of content pages.
9. Form is accessible: buttons have clear labels, textarea has a `<label>`, error messages use `aria-live`.
10. If the API call fails, show a user-friendly error with retry option.
11. On mobile, the layout stacks vertically and buttons/textarea are full-width.

## Technical Notes for EDS

### DOM Structure
```html
<div class="feedback-block" data-endpoint="/api/feedback">
  <!-- Initial state -->
  <div class="feedback-prompt">
    <p class="feedback-question">Was this page helpful?</p>
    <div class="feedback-buttons">
      <button class="feedback-btn feedback-btn-yes" data-helpful="true">
        <span class="icon icon-thumbs-up" aria-hidden="true"></span> Yes
      </button>
      <button class="feedback-btn feedback-btn-no" data-helpful="false">
        <span class="icon icon-thumbs-down" aria-hidden="true"></span> No
      </button>
    </div>
  </div>

  <!-- Comment state (hidden initially) -->
  <div class="feedback-comment-form" hidden>
    <label for="feedback-comment" class="feedback-comment-label">
      How can we improve this page?
    </label>
    <textarea id="feedback-comment" class="feedback-comment-input"
              rows="4" maxlength="1000"
              placeholder="Tell us what could be better..."></textarea>
    <p class="feedback-char-count"><span>0</span>/1000</p>
    <div class="feedback-comment-actions">
      <button class="feedback-submit" type="button">Submit feedback</button>
      <button class="feedback-skip" type="button">Skip</button>
    </div>
    <p class="feedback-error" aria-live="polite" hidden></p>
  </div>

  <!-- Thank you state (hidden initially) -->
  <div class="feedback-thanks" hidden>
    <p class="feedback-thanks-message">
      <span class="icon icon-check" aria-hidden="true"></span>
      Thank you for your feedback!
    </p>
  </div>
</div>
```

### CSS Requirements
```css
/* Block layout */
.feedback-block {
  margin: 48px 0 24px; padding: 24px;
  background: var(--color-bg-muted, #f5f5f5);
  border-radius: 8px; text-align: center;
}
.feedback-question { font-size: 1.1rem; font-weight: 600; margin-bottom: 12px; }

/* Buttons */
.feedback-buttons { display: flex; justify-content: center; gap: 12px; }
.feedback-btn {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 10px 24px; border: 2px solid var(--color-border);
  border-radius: 4px; background: #fff; cursor: pointer;
  font-size: 14px; font-weight: 600; transition: all 0.15s;
}
.feedback-btn:hover { border-color: var(--color-primary); background: var(--color-primary-light); }
.feedback-btn:focus-visible { outline: 2px solid var(--color-focus); outline-offset: 2px; }

/* Comment form */
.feedback-comment-form { max-width: 500px; margin: 16px auto 0; text-align: left; }
.feedback-comment-label { display: block; font-weight: 600; margin-bottom: 8px; }
.feedback-comment-input {
  width: 100%; padding: 10px 12px; border: 1px solid var(--color-border);
  border-radius: 4px; font-family: inherit; font-size: 14px; resize: vertical;
}
.feedback-char-count { font-size: 12px; color: var(--color-text-muted); text-align: right; margin: 4px 0; }
.feedback-comment-actions { display: flex; gap: 12px; margin-top: 12px; }
.feedback-submit {
  padding: 10px 20px; background: var(--color-primary); color: #fff;
  border: none; border-radius: 4px; cursor: pointer; font-weight: 600;
}
.feedback-skip { padding: 10px 20px; background: none; border: 1px solid var(--color-border); border-radius: 4px; cursor: pointer; }
.feedback-error { color: var(--color-danger); font-size: 13px; margin-top: 8px; }

/* Thank you */
.feedback-thanks-message {
  display: flex; align-items: center; justify-content: center; gap: 8px;
  font-size: 1.1rem; color: var(--color-success, #2e7d32);
}

/* Responsive */
@media (max-width: 768px) {
  .feedback-buttons { flex-direction: column; align-items: stretch; }
  .feedback-btn { justify-content: center; }
  .feedback-comment-actions { flex-direction: column; }
}
```

### JS Requirements
- On "Yes" click: submit feedback with `helpful: true`, no comment, show thank-you state.
- On "No" click: hide prompt, show comment form.
- On "Submit feedback" click: validate comment is non-empty, obtain reCAPTCHA token, submit API call.
- On "Skip" click: submit feedback with `helpful: false`, no comment, show thank-you state.
- Character counter updates on textarea `input` event.
- API payload: `{ url: window.location.pathname, title: document.title, helpful: bool, comment: string, recaptchaToken: string }`.
- POST to endpoint from `data-endpoint` attribute.
- Load reCAPTCHA script dynamically: `https://www.google.com/recaptcha/api.js?render={siteKey}`.
- reCAPTCHA site key should be configurable via block metadata or global config.
- On successful submission, store a flag in `sessionStorage` to prevent duplicate feedback on the same page.
- On page load, if feedback was already submitted for this URL, show the thank-you state immediately.

### Document Authoring (Google Docs)

Authors create a **Feedback** table in Google Docs:

| Feedback       |                              |
|----------------|------------------------------|
| endpoint       | /api/feedback                |
| recaptcha-key  | 6Le...site-key               |
| question       | Was this page helpful?       |
| placeholder    | Tell us what could be better...|

- **Row 1:** Block name "Feedback".
- **endpoint:** API URL for submitting feedback.
- **recaptcha-key:** Google reCAPTCHA v3 site key.
- **question:** The prompt text (defaults to "Was this page helpful?" if omitted).
- **placeholder:** Textarea placeholder text.
- Typically added once in a page template/footer, not per-page.

## AI Implementation Instructions

### Mandatory Skills
- Adobe Experience Modernization
- EDS Block Development

### Validation Loop
Use Chrome MCP iteratively to verify DOM output against the original site's functional requirements at https://www.doc.govt.nz/ before marking the task complete.

### Reference
- Live URL: Every page footer area on https://www.doc.govt.nz/
- Vue source: doc-page-feedback
- CSS classes: doc-feedback, feedbackContainer, formcontainerblockwithcustomdefaultvalues
