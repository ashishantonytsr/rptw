/* ========================================= */
/* CORE SITE LOGIC                           */
/* ========================================= */

document.addEventListener('DOMContentLoaded', () => {

    // 1. Scroll Reveal Animation
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });
    revealElements.forEach(el => revealObserver.observe(el));


    // 2. Hero & Floating Icon Parallax
    const heroSection = document.querySelector('.hero');
    const planets = document.querySelectorAll('.planet');
    const floatingCard = document.querySelector('.floating-card');
    const icons = document.querySelectorAll('.floating-icon');

    document.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth;
        const y = window.innerHeight ? e.clientY / window.innerHeight : 0;

        // Section-specific parallax (only if hero exists)
        if (heroSection && (e.target.closest('.hero') || heroSection.contains(e.target))) {
            planets.forEach((planet, index) => {
                const speed = (index + 1) * 20;
                planet.style.transform = `translate(-${x * speed}px, -${y * speed}px)`;
            });
            if (floatingCard) {
                floatingCard.style.transform = `translate(${x * 30}px, ${y * 30}px)`;
            }
        }

        // Global floaty icons
        icons.forEach((icon, index) => {
            const speed = (index + 1) * 15;
            icon.style.transform = `translate(-${x * speed}px, -${y * speed}px)`;
        });
    });


    // 3. Button Interaction Sound (Placeholder)
    const buttons = document.querySelectorAll('.btn-mega, .btn-primary-small');
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            console.log("Button clicked - trigger audio feedback here.");
        });
    });


    // 4. FAQ Accordion Logic
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (question) {
            question.addEventListener('click', () => {
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) otherItem.classList.remove('active');
                });
                item.classList.toggle('active');
            });
        }
    });


    // 5. Card Expansion Logic
    window.toggleCard = function (element) {
        element.classList.toggle('expanded');
        document.querySelectorAll('.realm-card').forEach(card => {
            if (card !== element) card.classList.remove('expanded');
        });
    };


    // 6. Mobile Menu Logic
    const hamburger = document.getElementById('hamburger-btn');
    const navMenu = document.getElementById('nav-menu');
    const menuLinks = document.querySelectorAll('.nav-links a');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : 'auto';
        });

        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        });
    }


    // 7. Form Submission (FormSubmit AJAX Method)
    const scriptURL = 'https://formsubmit.co/ajax/sales@rockpapertuition.com';
    const form = document.getElementById('contactForm');

    if (form) {
        form.addEventListener('submit', e => {
            e.preventDefault();

            const btn = form.querySelector('button[type="submit"]');
            btn.innerHTML = "Transmitting... ⚡";
            btn.disabled = true;

            fetch(scriptURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(Object.fromEntries(new FormData(form)))
            })
                .then(response => response.json())
                .then(data => {
                    btn.innerHTML = "Success! Redirecting...";
                    form.reset();
                    setTimeout(() => {
                        window.location.href = 'thank-you.html';
                    }, 800);
                })
                .catch(error => {
                    console.error('Error!', error);
                    btn.innerHTML = "Transmission Failed. Try again.";
                    btn.disabled = false;
                    alert("Submission failed. If this is your first time, check your email to confirm FormSubmit activation.");
                });
        });
    }


    // 8. Animated Number Counter
    const statsSection = document.querySelector('#counter-section');
    const statNumbers = document.querySelectorAll('.stat-number');
    let started = false;

    function startCount(el) {
        const target = parseInt(el.getAttribute('data-target'));
        if (isNaN(target)) return;
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                el.innerText = target + "+";
                clearInterval(timer);
            } else {
                el.innerText = Math.ceil(current);
            }
        }, 16);
    }

    const statsObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !started) {
            statNumbers.forEach(num => startCount(num));
            started = true;
        }
    }, { threshold: 0.5 });

    if (statsSection) {
        statsObserver.observe(statsSection);
    }


    // 9. Review Marquee Mode
    const reviewTrack = document.querySelector('.marquee-track');
    const reviewCards = document.querySelectorAll('.trading-card');
    if (reviewTrack && reviewCards.length < 4) {
        reviewTrack.classList.add('static-mode');
    }
});