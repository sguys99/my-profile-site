/**
 * Profile Website JavaScript
 * - Language Toggle (EN/KO)
 * - Mobile Navigation
 * - Scroll Animations
 * - Smooth Scroll Navigation
 */

document.addEventListener('DOMContentLoaded', function() {
    // ===== Language Toggle =====
    const langToggle = document.getElementById('lang-toggle');
    const langText = document.getElementById('lang-text');
    let currentLang = localStorage.getItem('lang') || 'en';

    // Initialize language
    setLanguage(currentLang);

    langToggle.addEventListener('click', function() {
        currentLang = currentLang === 'en' ? 'ko' : 'en';
        setLanguage(currentLang);
        localStorage.setItem('lang', currentLang);
    });

    function setLanguage(lang) {
        // Update toggle button text
        langText.textContent = lang.toUpperCase();

        // Update all elements with data-en and data-ko attributes
        const elements = document.querySelectorAll('[data-en][data-ko]');
        elements.forEach(function(el) {
            const text = el.getAttribute('data-' + lang);
            if (text) {
                el.textContent = text;
            }
        });

        // Update html lang attribute
        document.documentElement.lang = lang;
    }

    // ===== Mobile Navigation =====
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');
    let isMenuOpen = false;

    mobileMenuBtn.addEventListener('click', function() {
        isMenuOpen = !isMenuOpen;

        if (isMenuOpen) {
            mobileMenu.classList.remove('hidden');
            mobileMenu.classList.add('open');
            // Change to X icon
            menuIcon.setAttribute('d', 'M6 18L18 6M6 6l12 12');
        } else {
            mobileMenu.classList.remove('open');
            setTimeout(function() {
                mobileMenu.classList.add('hidden');
            }, 300);
            // Change back to hamburger icon
            menuIcon.setAttribute('d', 'M4 6h16M4 12h16M4 18h16');
        }
    });

    // Close mobile menu when clicking a link
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    mobileNavLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            isMenuOpen = false;
            mobileMenu.classList.remove('open');
            setTimeout(function() {
                mobileMenu.classList.add('hidden');
            }, 300);
            menuIcon.setAttribute('d', 'M4 6h16M4 12h16M4 18h16');
        });
    });

    // ===== Scroll Animations =====
    const animateElements = document.querySelectorAll('.animate-on-scroll');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: unobserve after animation
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animateElements.forEach(function(el) {
        observer.observe(el);
    });

    // ===== Header Scroll Effect =====
    const header = document.getElementById('header');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', function() {
        const currentScrollY = window.scrollY;

        if (currentScrollY > 50) {
            header.classList.add('header-scrolled');
        } else {
            header.classList.remove('header-scrolled');
        }

        lastScrollY = currentScrollY;
    });

    // ===== Active Navigation Link =====
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');

    function updateActiveLink() {
        const scrollY = window.scrollY;

        sections.forEach(function(section) {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                // Update desktop nav
                navLinks.forEach(function(link) {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });

                // Update mobile nav
                mobileLinks.forEach(function(link) {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', updateActiveLink);
    updateActiveLink(); // Initial call

    // ===== Smooth Scroll for Anchor Links =====
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.scrollY - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===== Typing Effect for Hero (Optional Enhancement) =====
    // Uncomment if you want a typing effect for the role
    /*
    const roles = ['Machine Learning Engineer', 'Data Scientist', 'AI Researcher'];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingSpeed = 100;
    const deletingSpeed = 50;
    const pauseTime = 2000;

    function typeRole() {
        const roleElement = document.getElementById('typed-role');
        if (!roleElement) return;

        const currentRole = roles[roleIndex];

        if (isDeleting) {
            roleElement.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
        } else {
            roleElement.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
        }

        let timeout = isDeleting ? deletingSpeed : typingSpeed;

        if (!isDeleting && charIndex === currentRole.length) {
            timeout = pauseTime;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
        }

        setTimeout(typeRole, timeout);
    }

    typeRole();
    */

    // ===== Console Easter Egg =====
    console.log('%c Welcome! ', 'background: #2563eb; color: white; font-size: 20px; padding: 10px;');
    console.log('%c This site was built with HTML, Tailwind CSS, and vanilla JavaScript. ', 'color: #64748b; font-size: 12px;');
    console.log('%c Feel free to check out the code! ', 'color: #64748b; font-size: 12px;');
});
