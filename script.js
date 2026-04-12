const menuButton = document.querySelector('.menu-button');
const navWrap = document.querySelector('#site-nav');

if (menuButton && navWrap) {
  menuButton.addEventListener('click', () => {
    const isOpen = navWrap.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(isOpen));
  });
}

const contactForm = document.querySelector('#contact-form');

if (contactForm) {
  const statusEl = document.querySelector('#form-status');
  const submitButton = contactForm.querySelector('button[type="submit"]');
  const defaultButtonText = submitButton?.dataset.defaultText || 'Send Message';

  const setStatus = (message, type) => {
    if (!statusEl) {
      return;
    }

    statusEl.textContent = message;
    statusEl.className = `form-status ${type}`;
  };

  const setFieldError = (field, hasError) => {
    field.classList.toggle('field-error', hasError);
    field.setAttribute('aria-invalid', String(hasError));
  };

  const validateForm = () => {
    const requiredFields = Array.from(contactForm.querySelectorAll('[required]'));
    let isValid = true;

    requiredFields.forEach((field) => {
      const value = field.value.trim();
      const hasError = value.length === 0;
      setFieldError(field, hasError);

      if (hasError) {
        isValid = false;
      }
    });

    const emailField = contactForm.querySelector('#email');
    if (emailField && emailField.value.trim().length > 0) {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
      const hasEmailError = !emailPattern.test(emailField.value.trim());
      setFieldError(emailField, hasEmailError);

      if (hasEmailError) {
        isValid = false;
      }
    }

    return isValid;
  };

  contactForm.addEventListener('input', (event) => {
    const target = event.target;

    if (!(target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement)) {
      return;
    }

    const shouldValidateEmail = target.id === 'email' && target.value.trim().length > 0;
    if (shouldValidateEmail) {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
      setFieldError(target, !emailPattern.test(target.value.trim()));
    } else {
      setFieldError(target, target.required && target.value.trim().length === 0);
    }
  });

  contactForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const isValid = validateForm();
    if (!isValid) {
      setStatus('Please complete all required fields and enter a valid email address.', 'error');
      return;
    }

    const formData = new FormData(contactForm);

    try {
      if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';
      }

      setStatus('Sending your message...', 'sending');

      const response = await fetch(contactForm.action, {
        method: 'POST',
        body: formData,
        headers: {
          Accept: 'application/json',
        },
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        const errorMessage = data?.message || 'Something went wrong while sending your message. Please try again.';
        throw new Error(errorMessage);
      }

      contactForm.reset();
      contactForm.querySelectorAll('.field-error').forEach((field) => setFieldError(field, false));
      setStatus('Thank you. Your message was sent successfully. I will reply as soon as possible.', 'success');
    } catch (error) {
      setStatus(error.message || 'Unable to send your message right now. Please email photographyrosegold@gmail.com.', 'error');
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = defaultButtonText;
      }
    }
  });
}
