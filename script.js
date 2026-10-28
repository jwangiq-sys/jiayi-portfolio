const header = document.querySelector('.site-header');
const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('#site-nav');
const navLinks = [...document.querySelectorAll('#site-nav a')];
const sections = [...document.querySelectorAll('main section[id]')];

function closeMenu() {
  menuButton.setAttribute('aria-expanded', 'false');
  nav.classList.remove('open');
  document.body.classList.remove('menu-open');
}

menuButton.addEventListener('click', () => {
  const willOpen = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(willOpen));
  nav.classList.toggle('open', willOpen);
  document.body.classList.toggle('menu-open', willOpen);
});

navLinks.forEach((link) => link.addEventListener('click', closeMenu));

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 12);
}, { passive: true });

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    navLinks.forEach((link) => {
      link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
    });
  });
}, { rootMargin: '-35% 0px -55% 0px', threshold: 0 });

sections.forEach((section) => observer.observe(section));
