/* Read more / read less */
const aboutText = document.querySelector('.about-text');
if (aboutText) {
    aboutText.addEventListener('click', (event) => {
        const target = event.target;
        if (!target.classList.contains('btn-read')) return;

        const readMore = aboutText.querySelector('.read-more-text');
        const isOpen = readMore.classList.toggle('read-more-text--show');
        target.textContent = isOpen ? 'Read Less...' : 'Read More...';
        target.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
}

/* Mobile menu */
const menuBtn = document.querySelector('#menu-icon');
const menuIconEl = menuBtn ? menuBtn.querySelector('i') : null;
const navbar = document.querySelector('.navbar');

if (menuBtn && navbar && menuIconEl) {
    menuBtn.addEventListener('click', () => {
        const open = navbar.classList.toggle('active');
        menuIconEl.classList.toggle('fa-bars', !open);
        menuIconEl.classList.toggle('fa-xmark', open);
        menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
}

/* Scroll: active nav + sticky header + close menu */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.navbar a[href^="#"]');
const headerEl = document.querySelector('.header');

function setActiveNav(id) {
    navLinks.forEach((link) => {
        const href = link.getAttribute('href');
        link.classList.toggle('active', href === `#${id}`);
    });
}

function closeMobileMenu() {
    if (!navbar || !menuBtn || !menuIconEl) return;
    navbar.classList.remove('active');
    menuIconEl.classList.add('fa-bars');
    menuIconEl.classList.remove('fa-xmark');
    menuBtn.setAttribute('aria-expanded', 'false');
}

navLinks.forEach((link) => {
    link.addEventListener('click', () => closeMobileMenu());
});

window.addEventListener('scroll', () => {
    if (headerEl) {
        headerEl.classList.toggle('sticky', window.scrollY > 40);
    }

    const y = window.scrollY + (headerEl ? headerEl.offsetHeight : 80);
    let currentId = 'home';
    sections.forEach((sec) => {
        const id = sec.getAttribute('id');
        if (id && y >= sec.offsetTop) {
            currentId = id;
        }
    });
    setActiveNav(currentId);
});

/* Footer year */
const yearEl = document.getElementById('year');
if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
}

/* Contact form */
const formEl = document.getElementById('form');
if (formEl) {
    formEl.addEventListener('submit', (event) => {
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const subject = document.getElementById('Esubject').value.trim();
        const message = document.getElementById('message').value.trim();

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phonePattern = /^[0-9]{10}$/;

        if (!name) {
            alert('Full Name is required.');
            event.preventDefault();
            return;
        }
        if (!emailPattern.test(email)) {
            alert('Please enter a valid Email Address.');
            event.preventDefault();
            return;
        }
        if (!phonePattern.test(phone)) {
            alert('Please enter a valid 10-digit Mobile Number.');
            event.preventDefault();
            return;
        }
        if (!subject) {
            alert('Email Subject is required.');
            event.preventDefault();
            return;
        }
        if (!message) {
            alert('Message is required.');
            event.preventDefault();
        }
    });
}

/* ScrollReveal */
if (typeof ScrollReveal !== 'undefined') {
    const sr = ScrollReveal({
        reset: false,
        distance: '48px',
        duration: 900,
        delay: 100,
        easing: 'cubic-bezier(0.5, 0, 0, 1)',
    });
    sr.reveal('.home-content, .section-heading', { origin: 'top' });
    sr.reveal('.home-img, .project-box, .skill-box', { origin: 'bottom' });
    sr.reveal('.about-img, .contact-img, .skills-column .title', { origin: 'left' });
    sr.reveal('.about-content, .contact-form-wrap', { origin: 'right' });
}

/* Typed.js */
if (typeof Typed !== 'undefined') {
    new Typed('.multiple-text', {
        strings: ['PHP Developer', 'Backend Developer'],
        typeSpeed: 80,
        backSpeed: 50,
        backDelay: 1600,
        loop: true,
    });
}

/* Skill bars: animate width when in view */
(function initSkillBars() {
    const bars = document.querySelectorAll('.bar-fill');
    if (!bars.length) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    bars.forEach((el) => {
        const pct = el.dataset.pct;
        if (!pct) return;

        if (reduceMotion) {
            el.style.width = `${pct}%`;
            return;
        }

        const target = el.closest('.skill-box') || el;
        const io = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;
                    el.style.width = `${pct}%`;
                    el.classList.add('is-filled');
                    observer.unobserve(entry.target);
                });
            },
            { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
        );
        io.observe(target);
    });
})();
