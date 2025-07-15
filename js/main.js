// Portfolio Website JavaScript
// Author: Computer Engineer
// Description: Handles navigation, smooth scrolling, form submission, and interactive features

document.addEventListener('DOMContentLoaded', function () {
    // Force dark mode on page load
    // document.body.classList.add('dark');

    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        const icon = themeToggle.querySelector('i');
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');

        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark');
            icon.classList.toggle('fa-moon');
            icon.classList.toggle('fa-sun');
        });
    }

    // Initialize after loading screen delay
    setTimeout(() => {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) loadingScreen.classList.add('hidden');

        initializeNavigation();
        initializeSmoothScrolling();
        initializeLogoNavigation();
        initializeFormHandling();
        initializeAnimations();
        initializeMobileMenu();
        initializeScrollEffects();

        console.log('Portfolio website initialized successfully');
    }, 1000);
});




// Navigation Management
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const pages = document.querySelectorAll('.page');
    
    // Handle navigation clicks
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetPage = this.getAttribute('data-page');
            
            // Update active nav link
            navLinks.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
            
            // Show target page
            showPage(targetPage);
            
            // Close mobile menu if open
            closeMobileMenu();
            
            // Update URL without page reload
            history.pushState({ page: targetPage }, '', `#${targetPage}`);
        });
    });
    
    // Handle browser back/forward buttons
    window.addEventListener('popstate', function(e) {
        const page = e.state?.page || getPageFromURL();
        showPage(page);
        updateActiveNavLink(page);
    });
    
    // Initialize page based on URL
    const initialPage = getPageFromURL();
    showPage(initialPage);
    updateActiveNavLink(initialPage);
}

// Page Display Management
function showPage(targetPage) {
    const pages = document.querySelectorAll('.page');
    
    // Hide all pages
    pages.forEach(page => {
        page.classList.remove('active');
    });
    
    // Show target page with animation
    const targetPageElement = document.getElementById(targetPage);
    if (targetPageElement) {
        setTimeout(() => {
            targetPageElement.classList.add('active');
        }, 100);
    }
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Utility Functions
function getPageFromURL() {
    const hash = window.location.hash.substring(1);
    return hash || 'home';
}

function updateActiveNavLink(page) {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-page') === page) {
            link.classList.add('active');
        }
    });
}

// Mobile Menu Management
function initializeMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            closeMobileMenu();
        }
    });
}

function closeMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}

// Smooth Scrolling for Internal Links
function initializeSmoothScrolling() {
    // Scroll indicators that navigate to next page
    const scrollIndicators = document.querySelectorAll('.next-scroll');
    scrollIndicators.forEach(el => {
        el.addEventListener('click', function () {
            const targetPage = this.getAttribute('data-next');
            if (targetPage) {
                showPage(targetPage);
                updateActiveNavLink(targetPage);
                history.pushState({ page: targetPage }, '', `#${targetPage}`);
            }
        });
    });

    // Footer links
    const footerLinks = document.querySelectorAll('.footer-links a');
    footerLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetPage = this.getAttribute('data-page');
            showPage(targetPage);
            updateActiveNavLink(targetPage);
            history.pushState({ page: targetPage }, '', `#${targetPage}`);
        });
    });
}

function initializeLogoNavigation() {
    const logo = document.getElementById('nav-home');
    if (logo) {
        logo.style.cursor = 'pointer';
        logo.addEventListener('click', () => {
            showPage('home');
            updateActiveNavLink('home');
            history.pushState({ page: 'home' }, '', '#home');
        });
    }
}


// Form Handling
function initializeFormHandling() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = {
                name: formData.get('name'),
                email: formData.get('email'),
                subject: formData.get('subject'),
                message: formData.get('message')
            };
            
            // Validate form
            if (validateForm(data)) {
                // Show loading state
                showFormLoading();
                
                // Simulate form submission (replace with actual API call)
                setTimeout(() => {
                    showFormSuccess();
                    contactForm.reset();
                }, 2000);
            }
        });
    }
}

function validateForm(data) {
    const errors = [];
    
    // Name validation
    if (!data.name || data.name.trim().length < 2) {
        errors.push('Please enter a valid name');
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email || !emailRegex.test(data.email)) {
        errors.push('Please enter a valid email address');
    }
    
    // Subject validation
    if (!data.subject || data.subject.trim().length < 5) {
        errors.push('Please enter a subject (minimum 5 characters)');
    }
    
    // Message validation
    if (!data.message || data.message.trim().length < 10) {
        errors.push('Please enter a message (minimum 10 characters)');
    }
    
    if (errors.length > 0) {
        showFormErrors(errors);
        return false;
    }
    
    return true;
}

function showFormLoading() {
    const submitButton = document.querySelector('.contact-form button[type="submit"]');
    if (submitButton) {
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitButton.disabled = true;
    }
}

function showFormSuccess() {
    const submitButton = document.querySelector('.contact-form button[type="submit"]');
    if (submitButton) {
        submitButton.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
        submitButton.style.background = 'var(--accent-color)';
        
        setTimeout(() => {
            submitButton.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
            submitButton.disabled = false;
            submitButton.style.background = 'var(--primary-color)';
        }, 3000);
    }
    
    // Show success message
    showNotification('Message sent successfully! Thank you for your interest.', 'success');
}

function showFormErrors(errors) {
    const errorMessage = errors.join(', ');
    showNotification(errorMessage, 'error');
}

function showNotification(message, type) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add notification styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? 'var(--accent-color)' : '#dc3545'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: var(--border-radius);
        box-shadow: var(--shadow-medium);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 400px;
    `;
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after delay
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 5000);
}

// Scroll Effects
function initializeScrollEffects() {
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', function() {
        // Navbar scroll effect
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Animations and Interactive Effects
function initializeAnimations() {
    // Animate skill tags on hover
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.05)';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Project card animations
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const img = this.querySelector('.project-image img');
            if (img) {
                img.style.transform = 'scale(1.1)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const img = this.querySelector('.project-image img');
            if (img) {
                img.style.transform = 'scale(1)';
            }
        });
    });
    
    // Typing effect for hero title (optional enhancement)
    initializeTypingEffect();
}

function initializeTypingEffect() {
    const nameElement = document.querySelector('.hero-title .name');
    if (nameElement) {
        const originalText = nameElement.textContent;
        const titles = ['Computer Engineer', 'Software Developer', 'Full Stack Developer', 'Problem Solver','Sachin Ajeetkumar Singh', 'Data Engineer', 'Programmer', 'Web Developer'];
        let titleIndex = 0;
        
        function typeTitle() {
            const currentTitle = titles[titleIndex];
            nameElement.textContent = '';
            
            let charIndex = 0;
            const typeInterval = setInterval(() => {
                nameElement.textContent += currentTitle[charIndex];
                charIndex++;
                
                if (charIndex === currentTitle.length) {
                    clearInterval(typeInterval);
                    setTimeout(() => {
                        titleIndex = (titleIndex + 1) % titles.length;
                        setTimeout(typeTitle, 500);
                    }, 2000);
                }
            }, 100);
        }
        
        // Start typing effect after initial load
        setTimeout(typeTitle, 2000);
    }
}

// Keyboard Navigation
document.addEventListener('keydown', function(e) {
    // Handle escape key to close mobile menu
    if (e.key === 'Escape') {
        closeMobileMenu();
    }
    
    // Handle arrow keys for page navigation
    if (e.altKey) {
        const pages = ['home', 'about', 'projects', 'contact'];
        const currentPage = getPageFromURL();
        const currentIndex = pages.indexOf(currentPage);
        
        if (e.key === 'ArrowLeft' && currentIndex > 0) {
            const prevPage = pages[currentIndex - 1];
            showPage(prevPage);
            updateActiveNavLink(prevPage);
            history.pushState({ page: prevPage }, '', `#${prevPage}`);
        } else if (e.key === 'ArrowRight' && currentIndex < pages.length - 1) {
            const nextPage = pages[currentIndex + 1];
            showPage(nextPage);
            updateActiveNavLink(nextPage);
            history.pushState({ page: nextPage }, '', `#${nextPage}`);
        }
    }
});

// Utility Functions for Performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Performance Optimizations
const debouncedResize = debounce(function() {
    // Handle window resize events
    closeMobileMenu();
}, 250);

const throttledScroll = throttle(function() {
    // Handle scroll events
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}, 100);

window.addEventListener('resize', debouncedResize);
window.addEventListener('scroll', throttledScroll);

// Error Handling
window.addEventListener('error', function(e) {
    console.error('Portfolio website error:', e.error);
    // You can add error reporting here
});

// Service Worker Registration (for PWA capabilities)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // Uncomment the next line if you want to add a service worker
        // navigator.serviceWorker.register('/sw.js');
    });
}

// Analytics and Tracking (placeholder for actual implementation)
function trackPageView(page) {
    // Add your analytics tracking code here
    console.log(`Page view: ${page}`);
}

// Track initial page load
trackPageView(getPageFromURL());

// Export functions for potential external use
window.PortfolioWebsite = {
    showPage,
    updateActiveNavLink,
    closeMobileMenu,
    showNotification
};
// Certificates Data (Customize This)///////////////////////////////////////////////////////////////////////////////////////////////////////////////
const certificateData = [
        {
            title: "Power BI and Tableau for Data Visualization",
            image: "certificates/BI.jpg",
            link: "https://www.udemy.com/certificate/UC-a0c178a4-ddd8-40f0-bb56-47ea6df27fc8/",
            description: "Learned to create compelling dashboards using Power BI and Tableau for business intelligence."
        },
        {
            title: "Machine Learning - Fundamentals of Python Machine Learning",
            image: "certificates/ml.jpg",
            link: "https://www.udemy.com/certificate/UC-eb7f069b-838d-4555-bf6f-0bcb670c5467/",
            description: "Gained hands-on experience in machine learning with Python, covering key algorithms and models."
        },
        {
            title: "Docker Kubernetes MasterClass: DevOps from Scratch",
            image: "certificates/docker.jpg",
            link: "https://www.udemy.com/certificate/UC-aec002b7-1211-4ab8-99d1-c48e410ab615/",
            description: "Mastered containerization, Docker basics, and orchestration using Kubernetes for DevOps pipelines."
        },
        {
            title: "Python And Django Framework And HTML5 Stack Complete Course",
            image: "certificates/django.jpg",
            link: "https://www.udemy.com/certificate/UC-938e9819-c64f-4fec-b791-479683bb2420/",
            description: "Developed dynamic web apps using Django, Python, HTML5, and front-end technologies."
        },
        {
            title: "The Complete Full-Stack Web Development Bootcamp",
            image: "certificates/fullweb.jpg",
            link: "https://www.udemy.com/certificate/UC-accfd12c-05c1-49a5-8455-c4466eae1db6/",
            description: "Built full-stack applications using HTML, CSS, JavaScript, Node.js, MongoDB, and more."
        },
        {
            title: "React Crash Course: From Zero to Hero",
            image: "certificates/react.jpg",
            link: "https://www.udemy.com/certificate/UC-f84b7824-a0dd-4326-8b81-a3a7e19b1208/",
            description: "Built responsive single-page applications with React, JSX, and component-based architecture."
        },
        {
            title: "Java Programming Masterclass - Beginner to Master",
            image: "certificates/java.jpg",
            link: "https://www.udemy.com/certificate/UC-e06e68bb-3431-4b9e-8eb6-0e197ca682af/",
            description: "Learned Java fundamentals, OOP concepts, and applied them in practical coding projects."
        },
        {
            title: "Master ChatGPT: Transform Your Life with AI Chatbots",
            image: "certificates/gpt.jpg",
            link: "https://www.udemy.com/certificate/UC-a5585a7e-b898-4ef7-a0e6-a3d5a987bf9c/",
            description: "Explored ChatGPT capabilities and use cases to automate tasks and build intelligent bots."
        },
        {
            title: "Learn C++ Programming from Beginning to OOP",
            image: "certificates/c++.jpg",
            link: "https://www.udemy.com/certificate/UC-5c0c5ecd-2277-4a02-b266-0adbf5d4be92/",
            description: "Mastered C++ syntax, functions, and object-oriented programming from scratch."
        }

];

let visibleCerts = 0;
const certsPerBatch = 6;

function renderCertificates() {
    const grid = document.getElementById('certificate-grid');
    const count = document.getElementById('certificate-count');
    const button = document.getElementById('show-more-certificates');
    if (!grid || !count || !button) return;

    const toRender = certificateData.slice(visibleCerts, visibleCerts + certsPerBatch);
    toRender.forEach(cert => {
        const card = document.createElement('div');
        card.className = 'project-card';
        card.innerHTML = `
            <div class="project-image">
                <div class="project-bg">
                    <img src="${cert.image}" alt="${cert.title}" />
                </div>
                <div class="project-overlay">
                    <div class="project-links">
                        <a href="${cert.link}" class="project-link" title="Verify" target="_blank">
                            <i class="fas fa-external-link-alt"></i>
                        </a>
                    </div>
                </div>
            </div>
            <div class="project-content">
                <div class="project-header">
                    <h3 class="name project-title">${cert.title}</h3>
                </div>
                <p class="project-description">${cert.description}</p>
            </div>
        `;
        grid.appendChild(card);
    });

    visibleCerts += certsPerBatch;
    count.textContent = certificateData.length;

    if (visibleCerts >= certificateData.length) {
        button.style.display = 'none';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById('show-more-certificates');
    if (button) {
        button.addEventListener('click', renderCertificates);
        renderCertificates(); // initial load
    }
});
