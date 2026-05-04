const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');

const toggleNav = () => {
  const isOpen = navLinks.classList.toggle('active');
  hamburger.querySelector('i').classList.toggle('fa-times', isOpen);
  hamburger.setAttribute('aria-expanded', String(isOpen));
};

hamburger.addEventListener('click', toggleNav);

navLinks.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    if (navLinks.classList.contains('active')) {
      navLinks.classList.remove('active');
      hamburger.querySelector('i').classList.remove('fa-times');
      hamburger.setAttribute('aria-expanded', 'false');
    }
  });
});

window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && navLinks.classList.contains('active')) {
    navLinks.classList.remove('active');
    hamburger.querySelector('i').classList.remove('fa-times');
    hamburger.setAttribute('aria-expanded', 'false');
  }
});

// Gallery expand/hide
document.querySelectorAll('.explore-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    const card = btn.closest('.gallery-card');
    const expand = card.querySelector('.gallery-expand');
    btn.style.display = 'none';
    expand.classList.add('open');
    expand.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });
});

document.querySelectorAll('.hide-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    const card = btn.closest('.gallery-card');
    card.querySelector('.gallery-expand').classList.remove('open');
    card.querySelector('.explore-btn').style.display = '';
    card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });
});

// Lightbox
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxClose = document.getElementById('lightboxClose');

if (lightbox) {
  let allImages = [];
  let currentIndex = 0;

  document.querySelectorAll('.gallery-expand-grid img').forEach((img, idx) => {
    img.addEventListener('click', () => {
      allImages = Array.from(img.closest('.gallery-expand-grid').querySelectorAll('img'));
      currentIndex = allImages.indexOf(img);
      lightboxImg.src = allImages[currentIndex].src;
      lightbox.classList.add('open');
    });
  });

  const showImage = (index) => {
    currentIndex = (index + allImages.length) % allImages.length;
    lightboxImg.src = allImages[currentIndex].src;
  };

  document.getElementById('lightboxPrev').addEventListener('click', () => showImage(currentIndex - 1));
  document.getElementById('lightboxNext').addEventListener('click', () => showImage(currentIndex + 1));

  const closeLightbox = () => lightbox.classList.remove('open');
  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') showImage(currentIndex + 1);
    if (e.key === 'ArrowLeft') showImage(currentIndex - 1);
  });
}

const footerButtons = document.querySelectorAll('.footer-button');
if (footerButtons.length) {
  const currentYear = new Date().getFullYear();
  footerButtons.forEach((button) => {
    button.textContent = currentYear;
  });
}

const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const submitButton = contactForm.querySelector('button');
    submitButton.disabled = true;
    submitButton.innerHTML = '<i class="fas fa-paper-plane"></i> Sent';
    setTimeout(() => {
      contactForm.reset();
      submitButton.disabled = false;
      submitButton.innerHTML = 'Send Message <i class="fas fa-paper-plane"></i>';
      alert('Thanks! Your message has been prepared for sending.');
    }, 700);
  });
}
