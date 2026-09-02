// ---------- Navbar scroll state ----------
const nav = document.querySelector('.nav');
const onScroll = () => {
  if (window.scrollY > 30) nav.classList.add('scrolled');
  else nav.classList.remove('scrolled');
};
window.addEventListener('scroll', onScroll);
onScroll();

// ---------- Mobile menu ----------
const burger = document.querySelector('.burger');
const mobilePanel = document.querySelector('.mobile-panel');
if (burger && mobilePanel) {
  burger.addEventListener('click', () => {
    burger.classList.toggle('open');
    mobilePanel.classList.toggle('open');
  });
  mobilePanel.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      burger.classList.remove('open');
      mobilePanel.classList.remove('open');
    });
  });
}

// ---------- Hero load-in sequence (single orchestrated moment) ----------
window.addEventListener('DOMContentLoaded', () => {
  const items = document.querySelectorAll('[data-reveal-order]');
  items.forEach(el => {
    const order = Number(el.dataset.revealOrder) || 0;
    el.style.animationDelay = (order * 0.12) + 's';
    el.classList.add('reveal');
  });
});

// ---------- Scroll reveal for sections (IntersectionObserver, runs once) ----------
const revealEls = document.querySelectorAll('.will-reveal');
if (revealEls.length) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach(el => io.observe(el));
}

// ---------- Card tilt + glow tracking (service & project cards) ----------
const tiltCards = document.querySelectorAll('.service-card, .project-card');
tiltCards.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotateX = ((y - cy) / cy) * -4;
    const rotateY = ((x - cx) / cx) * 4;
    card.style.transform = `perspective(700px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    card.style.setProperty('--mx', x + 'px');
    card.style.setProperty('--my', y + 'px');
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(700px) rotateX(0) rotateY(0) translateY(0)';
  });
});

// ---------- Cursor glow inside hero doc-stage ----------
const stage = document.querySelector('.doc-stage');
if (stage) {
  const glow = stage.querySelector('.cursor-glow');
  stage.addEventListener('mousemove', (e) => {
    const rect = stage.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    if (glow) {
      glow.style.setProperty('--x', x + '%');
      glow.style.setProperty('--y', y + '%');
    }
  });
}

// ---------- Lightbox for project media ----------
const lightbox = document.querySelector('.lightbox');
if (lightbox) {
  const lightboxInner = lightbox.querySelector('.lightbox-inner');
  const closeBtn = lightbox.querySelector('.lightbox-close');

  const openLightbox = (media) => {
    lightboxInner.innerHTML = media.innerHTML;
    lightbox.classList.add('open');
  };
  const closeLightbox = () => {
    lightbox.classList.remove('open');
  };

  document.querySelectorAll('.project-media').forEach(media => {
    media.addEventListener('click', () => openLightbox(media));
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      closeLightbox();
    });
  }

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });
}
