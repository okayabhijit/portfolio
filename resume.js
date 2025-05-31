// resume.js - Interactivity for Abhijit Singh Resume

// --- Dark mode toggle (Tailwind-compatible, only on <html>) ---
const darkToggle = document.getElementById('darkmode-toggle');
const darkIconSun = document.getElementById('sun-icon');
const darkIconMoon = document.getElementById('moon-icon');

function setDarkMode(enabled) {
    document.documentElement.classList.toggle('dark', enabled);
    if (enabled) {
        darkIconSun.style.display = 'none';
        darkIconMoon.style.display = '';
    } else {
        darkIconSun.style.display = '';
        darkIconMoon.style.display = 'none';
    }
}
const themePref = localStorage.getItem('theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
setDarkMode(themePref === 'dark' || (themePref === null && prefersDark));

darkToggle.addEventListener('click', function() {
    const isDark = document.documentElement.classList.contains('dark');
    setDarkMode(!isDark);
    localStorage.setItem('theme', !isDark ? 'dark' : 'light');
});

// Fullscreen on double click
// ...existing code for fullscreen toggle...
document.body.addEventListener('dblclick', function() {
    if (!document.fullscreenElement) {
        if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen().catch(err => {
                console.warn(`Fullscreen request failed: ${err.message} (${err.name})`);
            });
        } else if (document.documentElement.mozRequestFullScreen) { /* Firefox */
            document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
            document.documentElement.webkitRequestFullscreen();
        } else if (document.documentElement.msRequestFullscreen) { /* IE/Edge */
            document.documentElement.msRequestFullscreen();
        }
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) { /* Firefox */
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) { /* Chrome, Safari & Opera */
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) { /* IE/Edge */
            document.msExitFullscreen();
        }
    }
});

// Scroll reveal animations
const scrollElements = document.querySelectorAll('.reveal-on-scroll');

const elementInView = (el, percentageScroll = 100) => {
    const elementTop = el.getBoundingClientRect().top;
    return (
        elementTop <= 
        ((window.innerHeight || document.documentElement.clientHeight) * (percentageScroll/100))
    );
};

const displayScrollElement = (element) => {
    element.classList.add('revealed');
};

const handleScrollAnimation = () => {
    scrollElements.forEach((el) => {
        if (elementInView(el, 90)) {
            displayScrollElement(el);
        }
    })
}

window.addEventListener('scroll', () => {
    handleScrollAnimation();
});
// Initial check in case elements are already in view on load
handleScrollAnimation();

// Set current year in footer
const yearEl = document.getElementById('currentYear');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Smooth scroll for nav links
const navLinks = document.querySelectorAll('nav a[href^="#"]');
navLinks.forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerOffset = document.getElementById('menu-bar').offsetHeight || 40;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        }
    });
});
