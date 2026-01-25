// =========================
// TEXT ROTATOR (SIMPLIFIED)
// =========================
const textItems = [
    'Graphic Designer',
    'Web Developer',
    'IT Security Expert',
    'Creative Technologist'
];

let currentItem = 0;
let currentChar = 0;
let isDeleting = false;
let isEnd = false;
let typingSpeed = 100;
let deletingSpeed = 50;
let waitTime = 2000;

function typeText() {
    const dynamicText = document.querySelector('.dynamic-text');
    
    if (!dynamicText) return;
    
    const currentText = textItems[currentItem];
    
    if (isDeleting) {
        // Delete text
        dynamicText.textContent = currentText.substring(0, currentChar - 1);
        currentChar--;
        typingSpeed = deletingSpeed;
    } else {
        // Type text
        dynamicText.textContent = currentText.substring(0, currentChar + 1);
        currentChar++;
        typingSpeed = 100;
    }
    
    // Check if text is complete
    if (!isDeleting && currentChar === currentText.length) {
        isEnd = true;
        typingSpeed = waitTime;
        isDeleting = true;
    } else if (isDeleting && currentChar === 0) {
        isDeleting = false;
        isEnd = false;
        currentItem = (currentItem + 1) % textItems.length;
        typingSpeed = 500;
    }
    
    setTimeout(typeText, typingSpeed);
}

// =========================
// HAMBURGER MENU
// =========================
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
});

// Close menu when clicking on links
document.querySelectorAll('.navigate a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// =========================
// PORTFOLIO FILTER
// =========================
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        button.classList.add('active');
        
        // Get filter value
        const filterValue = button.getAttribute('data-filter');
        
        // Filter items
        portfolioItems.forEach(item => {
            if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 100);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    });
});

// =========================
// SMOOTH SCROLL
// =========================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// =========================
// SCROLL ACTIVE LINK
// =========================
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.navigate a');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// =========================
// SCROLL INDICATOR CLICK
// =========================
const scrollIndicator = document.querySelector('.scroll-indicator');
if (scrollIndicator) {
    scrollIndicator.addEventListener('click', () => {
        window.scrollTo({
            top: window.innerHeight,
            behavior: 'smooth'
        });
    });
}

// =========================
// FORM SUBMISSION
// =========================
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const submitBtn = this.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;
        
        // Show loading state
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        // Simulate form submission
        setTimeout(() => {
            // In production, this would be your actual form submission
            submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
            submitBtn.style.background = 'var(--success)';
            
            // Reset form
            setTimeout(() => {
                this.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                submitBtn.style.background = '';
            }, 2000);
        }, 1500);
    });
}

// =========================
// INITIALIZE EVERYTHING
// =========================
document.addEventListener('DOMContentLoaded', () => {
    // Start text rotation
    setTimeout(typeText, 1000);
    
    // Add scroll indicator click event
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.style.cursor = 'pointer';
        scrollIndicator.title = 'Click to scroll down';
    }
});
