/**
 * Client-side interactivity for the static, pre-rendered page.
 * Progressive enhancement only: all content ships in the HTML; this just adds
 * the mobile menu toggle, scroll-to-top button, and nav scroll-spy.
 */

function toggleMenu() {
    const menu = document.getElementById('mobile-menu');
    const button = document.querySelector('.mobile-menu-button');
    if (!menu) return;
    const isOpen = menu.classList.toggle('active');
    if (button) {
        button.setAttribute('aria-expanded', String(isOpen));
    }
}

function initScrollHandler() {
    const sections = ['work', 'skills', 'about', 'contact'];

    window.addEventListener('scroll', function () {
        const scrolled = window.pageYOffset;

        const scrollBtn = document.getElementById('scrollTop');
        if (scrollBtn) {
            if (scrolled > 400) {
                scrollBtn.classList.remove('opacity-0', 'translate-y-4', 'pointer-events-none');
                scrollBtn.classList.add('opacity-100', 'translate-y-0');
            } else {
                scrollBtn.classList.add('opacity-0', 'translate-y-4', 'pointer-events-none');
                scrollBtn.classList.remove('opacity-100', 'translate-y-0');
            }
        }

        const navLinks = document.querySelectorAll('.nav-brutal a[href^="#"]');
        let current = '';
        sections.forEach(id => {
            const section = document.getElementById(id);
            if (section && section.getBoundingClientRect().top <= 150) {
                current = id;
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('text-teal-300');
            if (current && link.getAttribute('href') === '#' + current) {
                link.classList.add('text-teal-300');
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', initScrollHandler);
