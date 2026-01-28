

const mobileToggle = document.getElementById('mobileToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle mobile menu
mobileToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Animate toggle button
    const spans = mobileToggle.querySelectorAll('span');
    if (navMenu.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translateY(10px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translateY(-10px)';
    } else {
        spans[0].style.transform = '';
        spans[1].style.opacity = '1';
        spans[2].style.transform = '';
    }
});

// Close menu when a link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const spans = mobileToggle.querySelectorAll('span');
        spans[0].style.transform = '';
        spans[1].style.opacity = '1';
        spans[2].style.transform = '';
    });
});



const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Add shadow on scroll
    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});



const sections = document.querySelectorAll('section');

function updateActiveLink() {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveLink);



navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});



const revealElements = document.querySelectorAll(
    '.project-card, .skill-category, .stat, .timeline-item'
);

const revealOnScroll = () => {
    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        
        // Check if element is in viewport
        if (elementTop < window.innerHeight && elementBottom > 0) {
            element.style.opacity = '1';
            element.style.animation = 'slide-up 0.6s ease-out forwards';
        }
    });
};

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);



const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Get form values
    const formData = {
        name: document.getElementById('name').value.trim(),
        email: document.getElementById('email').value.trim(),
        subject: document.getElementById('subject').value.trim(),
        message: document.getElementById('message').value.trim()
    };
    
    // Validate form
    if (!validateForm(formData)) {
        return;
    }
    
    // Show loading state
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    
    try {
        // Simulate form submission (replace with actual backend URL)
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Show success message
        showNotification('Message sent successfully!', 'success');
        
        // Reset form
        contactForm.reset();
        
        // Optional: Clear notification after 5 seconds
        setTimeout(() => {
            removeNotification();
        }, 5000);
        
    } catch (error) {
        showNotification('Failed to send message. Please try again.', 'error');
        console.error('Form submission error:', error);
    } finally {
        // Restore button state
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    }
});

// Form validation
function validateForm(data) {
    // Check if all fields are filled
    if (!data.name || !data.email || !data.subject || !data.message) {
        showNotification('Please fill in all fields.', 'error');
        return false;
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        showNotification('Please enter a valid email address.', 'error');
        return false;
    }
    
    // Validate message length
    if (data.message.length < 10) {
        showNotification('Message must be at least 10 characters long.', 'error');
        return false;
    }
    
    return true;
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notification
    removeNotification();
    
    // Create notification element
    const notification = document.createElement('div');
    notification.id = 'notification';
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add styles
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '1rem 1.5rem',
        borderRadius: '0.75rem',
        color: 'white',
        fontWeight: '600',
        fontSize: '0.875rem',
        zIndex: '10000',
        animation: 'slide-in-right 0.3s ease-out',
        maxWidth: '400px',
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
    });
    
    // Set background color based on type
    const colors = {
        success: '#10b981',
        error: '#ef4444',
        info: '#3b82f6',
        warning: '#f59e0b'
    };
    
    notification.style.background = colors[type] || colors.info;
    
    document.body.appendChild(notification);
}

function removeNotification() {
    const notification = document.getElementById('notification');
    if (notification) {
        notification.style.animation = 'slide-out-right 0.3s ease-in';
        setTimeout(() => notification.remove(), 300);
    }
}



// const projectLinks = document.querySelectorAll('.project-link');

// projectLinks.forEach(link => {
//     link.addEventListener('click', (e) => {
//         e.preventDefault();
//         // Add functionality for modal or project details page
//         showNotification('Project details feature coming soon!', 'info');
//         console.log('Project link clicked');
//     });
// });



const parallaxElements = document.querySelectorAll('.floating-card');

window.addEventListener('scroll', () => {
    const scrollPosition = window.pageYOffset;
    
    parallaxElements.forEach((element, index) => {
        const speed = 0.5 + (index * 0.1);
        element.style.transform = `translateY(${scrollPosition * speed}px)`;
    });
});



const skillCategories = document.querySelectorAll('.skill-category');

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

skillCategories.forEach(category => {
    category.style.opacity = '0';
    category.style.transform = 'translateY(20px)';
    observer.observe(category);
});



window.addEventListener('load', () => {
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.animation = 'fade-in 0.8s ease-out';
    }
});



document.addEventListener('keydown', (e) => {
    // Escape key to close mobile menu
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        const spans = mobileToggle.querySelectorAll('span');
        spans[0].style.transform = '';
        spans[1].style.opacity = '1';
        spans[2].style.transform = '';
    }
});


// Debounce function for scroll events
function debounce(func, delay) {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func(...args), delay);
    };
}

// Throttle function for smooth scroll
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Get all form fields
function getAllFormFields() {
    return {
        name: document.getElementById('name'),
        email: document.getElementById('email'),
        subject: document.getElementById('subject'),
        message: document.getElementById('message')
    };
}

// Clear all form fields
function clearFormFields() {
    const fields = getAllFormFields();
    Object.values(fields).forEach(field => {
        if (field) field.value = '';
    });
}



document.addEventListener('DOMContentLoaded', () => {
    const currentYear = new Date().getFullYear();
    const footerText = document.querySelector('.footer-content p');
    
    if (footerText) {
        footerText.textContent = `© ${currentYear} AI Engineer Portfolio. All rights reserved.`;
    }
});


function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
}

// Initialize theme on page load
initTheme();



const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');

formInputs.forEach(input => {
    const formGroup = input.closest('.form-group');
    
    input.addEventListener('focus', () => {
        formGroup.style.transform = 'scale(1.02)';
    });
    
    input.addEventListener('blur', () => {
        formGroup.style.transform = 'scale(1)';
    });
});



if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}



console.log(
    '%cWelcome to My Portfolio!',
    'font-size: 24px; font-weight: bold; color: #3b82f6;'
);
console.log(
    '%cFeel free to explore and get in touch!',
    'font-size: 14px; color: #8b5cf6;'
);



if (window.performance && window.performance.timing) {
    window.addEventListener('load', () => {
        const perfTiming = window.performance.timing;
        const pageLoadTime = perfTiming.loadEventEnd - perfTiming.navigationStart;
        console.log(`Page Load Time: ${pageLoadTime}ms`);
    });
}



function updateLiveTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString();
    return timeString;
}

// Update time every second
setInterval(updateLiveTime, 1000);


window.portfolioAPI = {
    closeMenu: () => {
        navMenu.classList.remove('active');
    },
    openMenu: () => {
        navMenu.classList.add('active');
    },
    scrollToSection: (sectionId) => {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    },
    submitForm: () => {
        contactForm.dispatchEvent(new Event('submit'));
    },
    clearForm: clearFormFields,
    validateForm: validateForm,
    showNotification: showNotification,
    removeNotification: removeNotification
};

// Log API availability
console.log('%cPortfolio API Available', 'color: #10b981; font-weight: bold;');
console.log('Use window.portfolioAPI to access public functions');
