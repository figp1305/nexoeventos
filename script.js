/* ============================================
   NEXOEVENTOS — Scripts 2026
   ============================================ */

// Año dinámico
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Menú móvil
const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('nav');

menuToggle?.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('is-open');
  menuToggle.classList.toggle('is-open', isOpen);
  menuToggle.setAttribute('aria-expanded', isOpen);
});

nav?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('is-open');
    menuToggle.classList.remove('is-open');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});

// Header shadow al hacer scroll
const header = document.getElementById('header');
let ticking = false;

window.addEventListener('scroll', () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      header.classList.toggle('is-scrolled', window.scrollY > 10);
      ticking = false;
    });
    ticking = true;
  }
}, { passive: true });

// Reveal on scroll con IntersectionObserver
const revealElements = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -60px 0px'
  });

  revealElements.forEach((el, i) => {
    const siblings = el.parentElement?.querySelectorAll('.reveal');
    const index = siblings ? Array.from(siblings).indexOf(el) : i;
    el.style.transitionDelay = `${Math.min(index * 60, 360)}ms`;
    observer.observe(el);
  });
} else {
  revealElements.forEach(el => el.classList.add('is-visible'));
}

// Smooth scroll con offset para el header
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const targetId = anchor.getAttribute('href');
    if (targetId === '#' || targetId.length < 2) return;
    const target = document.querySelector(targetId);
    if (!target) return;
    e.preventDefault();
    const headerHeight = 96;
    const y = target.getBoundingClientRect().top + window.scrollY - headerHeight;
    window.scrollTo({ top: y, behavior: 'smooth' });
  });
});