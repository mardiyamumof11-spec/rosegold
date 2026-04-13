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

const gallerySources = {
  family: ['rose gold/fam1.jpg', 'rose gold/fam2.jpg', 'rose gold/fam3.JPG', 'rose gold/family.JPG', 'rose gold/families.jpg'],
  studio: ['rose gold/studio1.jpg', 'rose gold/studio2.jpg', 'rose gold/studio3.jpg', 'rose gold/studio4.jpg', 'rose gold/studio5.jpg', 'rose gold/studio6.JPG', 'rose gold/studio7.JPG', 'rose gold/studio8.JPG', 'rose gold/studio9.JPG', 'rose gold/studio10.JPG', 'rose gold/studio11.JPG', 'rose gold/studio12.JPG', 'rose gold/studio13.JPG', 'rose gold/studio14.JPG', 'rose gold/studio15.jpg', 'rose gold/studio16.JPG', 'rose gold/studio17.JPG', 'rose gold/studio18.JPG', 'rose gold/studio19.JPG', 'rose gold/studio20.JPG', 'rose gold/studio21.JPG', 'rose gold/studio22.JPG', 'rose gold/studio23.jpg', 'rose gold/studio24.jpg', 'rose gold/studio25.jpg', 'rose gold/studio26.jpg', 'rose gold/studio27.jpg', 'rose gold/studio111.JPG'],
  zwanger: ['rose gold/zwanger1.jpg', 'rose gold/zwanger2.JPG', 'rose gold/zwanger3.jpg', 'rose gold/zwanger4.jpg', 'rose gold/zwanger5.jpg'],
  love: ['rose gold/love1.jpg', 'rose gold/love2.jpg', 'rose gold/love3.jpg', 'rose gold/love4.JPG', 'rose gold/hands.jpg', 'rose gold/hands1.jpg', 'rose gold/hands2.jpg', 'rose gold/hands3.jpg', 'rose gold/hands4.jpg', 'rose gold/hands5.jpg', 'rose gold/hands6.jpg'],
  hands: ['rose gold/hands.jpg', 'rose gold/hands1.jpg', 'rose gold/hands2.jpg', 'rose gold/hands3.jpg', 'rose gold/hands4.jpg', 'rose gold/hands5.jpg', 'rose gold/hands6.jpg'],
  wedding: ['rose gold/wedding1.jpg', 'rose gold/wedding2.JPG', 'rose gold/wedding3.JPG', 'rose gold/wedding4.JPG', 'rose gold/wedding5.JPG', 'rose gold/wedding6.png', 'rose gold/wedding7.png', 'rose gold/wedding8.png', 'rose gold/wedding9.png', 'rose gold/wedding10.JPG', 'rose gold/wedding11.JPG', 'rose gold/wedding13.jpg', 'rose gold/wedding14.PNG', 'rose gold/wedding15.JPG', 'rose gold/wedding16.JPG', 'rose gold/wedding18.JPG', 'rose gold/wedding19.JPG', 'rose gold/wedding20.jpg', 'rose gold/wedding21.jpg', 'rose gold/wedding111.jpg'],
  review: ['rose gold/review1.JPG', 'rose gold/review2.JPG', 'rose gold/review3.PNG', 'rose gold/review4.jpg', 'rose gold/review5.jpg', 'rose gold/review6.PNG', 'rose gold/review7.PNG', 'rose gold/review8.PNG', 'rose gold/review9.PNG', 'rose gold/review10.PNG'],
  me: ['rose gold/me1.jpg', 'rose gold/me2.jpg', 'rose gold/me3.jpg', 'rose gold/me4.JPG', 'rose gold/me5.JPG', 'rose gold/me6.HEIC', 'rose gold/me7.JPG', 'rose gold/rosegold.jpg'],
  athome: ['rose gold/athome.JPG', 'rose gold/athome1.JPG', 'rose gold/athome2.JPG', 'rose gold/athome3.jpg', 'rose gold/athome4.jpg', 'rose gold/athome5.jpg'],
};

const renderGallery = (galleryEl) => {
  const keyword = galleryEl?.dataset.galleryKeyword?.toLowerCase();

  if (!keyword || !gallerySources[keyword]?.length) {
    return;
  }

  const matchingFiles = gallerySources[keyword];
  galleryEl.innerHTML = '';

  matchingFiles.forEach((filePath, index) => {
    const figure = document.createElement('figure');
    figure.className = 'gallery-item';

    const image = document.createElement('img');
    image.src = filePath;
    image.alt = `${keyword} gallery image ${index + 1}`;
    image.loading = 'lazy';
    image.decoding = 'async';

    figure.appendChild(image);
    galleryEl.appendChild(figure);
  });
};

document.querySelectorAll('.gallery[data-gallery-keyword]:not([data-render="on-open"])').forEach(renderGallery);

const videoLightbox = document.querySelector('#video-lightbox');
const videoIframe = document.querySelector('#video-iframe');
const videoCards = document.querySelectorAll('.video-card[data-video-id]');

if (videoLightbox && videoIframe && videoCards.length > 0) {
  const closeVideo = () => {
    videoIframe.src = '';
    videoLightbox.hidden = true;
    document.body.style.overflow = '';
  };

  videoCards.forEach((card) => {
    card.addEventListener('click', () => {
      const videoId = card.dataset.videoId;
      if (!videoId) {
        return;
      }

      videoIframe.src = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`;
      videoLightbox.hidden = false;
      document.body.style.overflow = 'hidden';
    });
  });

  videoLightbox.querySelectorAll('[data-close-video]').forEach((control) => {
    control.addEventListener('click', closeVideo);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !videoLightbox.hidden) {
      closeVideo();
    }
  });
}
