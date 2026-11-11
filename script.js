// Fade-in on scroll
const faders = document.querySelectorAll('.fade');

const appearOptions = {
  threshold: 0.2,
  rootMargin: "0px 0px -50px 0px"
};

const appearOnScroll = new IntersectionObserver(function(
  entries,
  observer
) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('show');
    observer.unobserve(entry.target);
  });
}, appearOptions);

faders.forEach(fader => {
  appearOnScroll.observe(fader);
});

const projectGrid = document.querySelector('.project-grid');
const projectGroup = projectGrid?.querySelector('.project-group');

function appendAccessibleMarqueeClone(track, group) {
  const duplicateGroup = group.cloneNode(true);
  duplicateGroup.setAttribute('aria-hidden', 'true');
  duplicateGroup.querySelectorAll('a').forEach(link => {
    link.setAttribute('tabindex', '-1');
  });
  track.append(duplicateGroup);
}

if (projectGrid && projectGroup) {
  appendAccessibleMarqueeClone(projectGrid, projectGroup);
}

const certificationGrid = document.querySelector('.cert-grid');

if (certificationGrid) {
  const certificationGroup = document.createElement('div');
  certificationGroup.className = 'cert-group';
  certificationGroup.append(...certificationGrid.children);
  certificationGrid.append(certificationGroup);
  appendAccessibleMarqueeClone(certificationGrid, certificationGroup);
}

const expertiseGrid = document.querySelector('.expertise-grid');
const expertiseGroup = expertiseGrid?.querySelector('.expertise-group');

if (expertiseGrid && expertiseGroup) {
  appendAccessibleMarqueeClone(expertiseGrid, expertiseGroup);
}

// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger && navLinks) {
  const closeMenu = () => {
    navLinks.classList.remove('show');
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.setAttribute('aria-label', 'Open navigation menu');
  };

  hamburger.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('show');
    hamburger.setAttribute('aria-expanded', String(isOpen));
    hamburger.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') closeMenu();
  });
}

const currentYear = document.querySelector('#current-year');

if (currentYear) {
  currentYear.textContent = String(new Date().getFullYear());
}
