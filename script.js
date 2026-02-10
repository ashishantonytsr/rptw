document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Scroll Reveal Animation (Observer API)
    // This makes elements slide up as the user scrolls down
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.1 // Trigger when 10% of the element is visible
    });

    revealElements.forEach(el => revealObserver.observe(el));


    // 2. Hero Mouse Parallax Effect
    // Moves the floating planets slightly when mouse moves
    const heroSection = document.querySelector('.hero');
    const planets = document.querySelectorAll('.planet');
    const floatingCard = document.querySelector('.floating-card');

    heroSection.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;

        planets.forEach((planet, index) => {
            const speed = (index + 1) * 20;
            planet.style.transform = `translate(-${x * speed}px, -${y * speed}px)`;
        });

        floatingCard.style.transform = `translate(${x * 30}px, ${y * 30}px)`;
    });

    
    // 3. Button Click "Squish" Sound Effect (Optional Placeholder)
    const buttons = document.querySelectorAll('.btn-mega, .btn-primary-small');
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            // In a real build, play audio here: new Audio('pop.mp3').play();
            console.log("Button clicked - add 'pop' sound here");
        });
    });

    // ===============================================
    // NEW JAVASCRIPT (Append inside the existing DOMContentLoaded)
    // ===============================================

    // 4. FAQ Accordion Logic
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Close other open items (optional - removing this line makes multiple open allowed)
            faqItems.forEach(otherItem => {
                if (otherItem !== item) otherItem.classList.remove('active');
            });

            // Toggle current
            item.classList.toggle('active');
        });
    });

    // ===============================================
    // VERSION 3 JS UPDATES
    // ===============================================

    // 5. Card Expansion Logic (Fixed)
    function toggleCard(element) {
        // We removed the window.innerWidth check.
        // Now, clicking works on Desktop (as a toggle) AND Mobile.
        
        // Toggle the class 'expanded' on the clicked card
        element.classList.toggle('expanded');

        // Optional: Close other cards to keep UI clean
        const allCards = document.querySelectorAll('.realm-card');
        allCards.forEach(card => {
            if (card !== element) {
                card.classList.remove('expanded');
            }
        });
    }

    // 6. Enhanced Parallax (Floating Loot)
    // We add the new icons to the existing mousemove listener
    document.addEventListener('mousemove', (e) => {
        const icons = document.querySelectorAll('.floating-icon');
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;

        icons.forEach((icon, index) => {
            // Different speeds for depth effect
            const speed = (index + 1) * 15;
            // Move in opposite direction to mouse for depth
            icon.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
        });
    });

    // ===============================================
    // VERSION 3.3 JS UPDATES (Number Counter)
    // ===============================================

    // 7. Animated Number Counter
    const statsSection = document.querySelector('#counter-section');
    const statNumbers = document.querySelectorAll('.stat-number');
    let started = false; // Flag to ensure animation runs only once

    // Function to animate counts
    function startCount(el) {
        const target = parseInt(el.getAttribute('data-target'));
        const duration = 2000; // Animation duration in ms
        const step = target / (duration / 16); // 60fps
        
        let current = 0;
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                el.innerText = target + "+"; // Add plus sign at end
                clearInterval(timer);
            } else {
                el.innerText = Math.ceil(current);
            }
        }, 16);
    }

    // Observer to trigger animation
    const statsObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !started) {
            statNumbers.forEach(num => startCount(num));
            started = true; // Stop it from running again
        }
    }, { threshold: 0.5 });

    if (statsSection) {
        statsObserver.observe(statsSection);
    }
});

// ===============================================
// VERSION 4.0 JS UPDATES (Mobile Menu)
// ===============================================

// Mobile Menu Logic (Re-verified)
const hamburger = document.getElementById('hamburger-btn');
const navMenu = document.getElementById('nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        // Toggle the active class which triggers the CSS max-height transition
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
}

// Close Menu when a link is clicked
function closeMenu() {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
    document.body.style.overflow = 'auto';
}

function toggleFaq(element) {
    // 1. Get the parent .faq-item
    const item = element.parentElement;
    
    // 2. Toggle the 'active' class
    item.classList.toggle('active');
    
    // 3. Optional: Close others (Accordion Style)
    // Uncomment lines below if you want only one open at a time
    /*
    document.querySelectorAll('.faq-item').forEach(otherItem => {
        if (otherItem !== item) {
            otherItem.classList.remove('active');
        }
    });
    */
}

/* --- FAQ Fix Snippet --- */
document.addEventListener('DOMContentLoaded', () => {
    const faqButtons = document.querySelectorAll('.faq-question');

    faqButtons.forEach(button => {
        button.addEventListener('click', () => {
            // 1. Toggle the active class on the parent item
            const faqItem = button.parentElement;
            faqItem.classList.toggle('active');
        });
    });
});


/* ========================================= */
/* SMART REVIEWS (Stop if < 4)               */
/* ========================================= */

document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.marquee-track');
    const cards = document.querySelectorAll('.trading-card');

    if (track && cards.length < 4) {
        // Less than 4 cards? Stop animation and center them.
        track.classList.add('static-mode');
    }
});

const scriptURL = 'https://script.google.com/macros/s/AKfycbzbbRH5U-nuIb_GoKlrfRG1j7_fEm4sSXXKs_krJGx-vEvMJuI6zg9D3ycQUo2yn25YIA/exec'; // PASTE YOUR URL HERE
const form = document.forms['contactForm'];

if (form) {
    form.addEventListener('submit', e => {
        e.preventDefault();
        
        // Change button text to indicate loading
        const btn = form.querySelector('button');
        const originalText = btn.innerHTML;
        btn.innerHTML = "Transmitting...";
        
        fetch(scriptURL, { method: 'POST', body: new FormData(form)})
            .then(response => {
                alert("Transmission Received! We will contact you shortly.");
                btn.innerHTML = originalText;
                form.reset();
            })
            .catch(error => {
                console.error('Error!', error.message);
                btn.innerHTML = "Error! Try again.";
            });
    });
}

/* ========================================= */
/* MOBILE MENU LOGIC                         */
/* ========================================= */

// 1. Opens and Closes the menu
function toggleMobileMenu() {
    const navMenu = document.querySelector('.nav-links');
    navMenu.classList.toggle('active');
}

// 2. Closes the menu when a link is clicked
function closeMenu() {
    const navMenu = document.querySelector('.nav-links');
    
    // Only remove the class if it exists
    if (navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
    }
}

/* ========================================= */
/* AUTO-CLOSE MENU ON CLICK                  */
/* ========================================= */

// 1. Select all links inside the mobile menu
const menuLinks = document.querySelectorAll('.nav-links a');

// 2. Add a click event to EACH link
menuLinks.forEach(link => {
    link.addEventListener('click', () => {
        // Remove the 'active' class to close the menu
        navMenu.classList.remove('active');
        hamburger.classList.remove('active'); // Resets the hamburger icon
    });
});