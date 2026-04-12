# Contact Form Delivery Setup (GitHub Pages)

The contact form on `contact.html` is wired to **FormSubmit** and sends to:

- `photographyrosegold@gmail.com`

## What is already connected

- Form action points to FormSubmit AJAX endpoint.
- JavaScript submits with `fetch` and shows:
  - success message when delivered
  - clear error message if delivery fails
- Front-end validation checks required fields and email format.

## One-time activation (required)

FormSubmit requires a first-time activation for each destination email:

1. Deploy the site (or run it and submit once).
2. Send a test message from the contact form.
3. Open `photographyrosegold@gmail.com` inbox.
4. Find the FormSubmit activation email.
5. Click the activation/confirm link.

After this one step, future submissions are delivered automatically.

## Recommended quick test

1. Open the live contact page.
2. Submit valid details.
3. Confirm green success message appears.
4. Confirm email is received at `photographyrosegold@gmail.com`.
5. Try submitting with missing required fields or invalid email and confirm error appears.

## Optional spam control

The form currently includes `_captcha=false` for a smoother experience.
If spam becomes an issue, remove that hidden input in `contact.html` to re-enable FormSubmit captcha.
