/**
 * Atolluxe Website Main JavaScript
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functions when DOM is fully loaded
    initIntersectionObserver();
    initHeaderScroll();
    initPageTransitions();
    
    // Initialize page-specific functions if needed elements exist
    if (document.querySelector('.map-tab')) initMapTabs();
    if (document.querySelector('.filter-btn')) initProjectFilter();
    if (document.querySelector('.wishlist-btn')) initWishlistButtons();
    if (document.querySelector('.layout-tab')) initLayoutTabs();
    if (document.querySelector('.gallery-item')) initGallery();
    if (document.querySelector('.chat-modal')) initChatModal();
    if (document.querySelector('form.contact-form')) initContactForm();
    if (document.querySelector('.play-btn')) initVideoPlayButtons();
});

/**
 * Initialize Intersection Observer for animations
 */
function initIntersectionObserver() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Common elements to animate across pages
    const commonSelectors = [
        '.hero-content', 
        '.niche-content', 
        '.niche-image',
        '.projects-heading', 
        '.locations-heading',
        '.contact-form-container',
        '.contact-info-container',
        '.map-heading',
        '.map-container',
        '.map-info',
        '.offices-heading',
        '.features-heading',
        '.why-invest-content',
        '.why-invest-image',
        '.featured-project',
        '.investment-guide',
        '.ai-agent-heading',
        '.agent-avatar',
        '.agent-cta',
        '.downloads-heading',
        '.showcase-heading',
        '.story-content',
        '.story-video',
        '.team-heading',
        '.partners-heading',
        '.newsletter-content',
        '.view-all',
        '.section-heading',
        '.amenities-heading',
        '.payment-plan',
        '.layouts-heading',
        '.gallery-heading',
        '.location-heading',
        '.location-map'
    ];

    // Find all elements matching selectors
    let elementsToAnimate = [];
    commonSelectors.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => elementsToAnimate.push(el));
    });

    // Add card elements with special selectors that appear on multiple pages
    const cardSelectors = [
        '.project-card', 
        '.location-card', 
        '.feature-card',
        '.download-card',
        '.showcase-card',
        '.podcast-card',
        '.news-card',
        '.blog-card',
        '.office-card',
        '.team-member',
        '.partner',
        '.amenity-card',
        '.stat-card',
        '.gallery-item'
    ];

    cardSelectors.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => elementsToAnimate.push(el));
    });

    // Start observing all found elements
    elementsToAnimate.forEach(element => {
        if (element) observer.observe(element);
    });
}

/**
 * Header scroll effect
 */
function initHeaderScroll() {
    const header = document.querySelector('header');
    if (!header) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

/**
 * Page transitions
 */
function initPageTransitions() {
    const pageTransition = document.querySelector('.page-transition');
    if (!pageTransition) return;

    const links = document.querySelectorAll('a:not([target="_blank"]):not([href^="#"])');

    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip transition for links on same page or undefined hrefs
            if (!href || href === window.location.href) {
                return;
            }
            
            e.preventDefault();
            
            // Start transition animation
            pageTransition.classList.add('active');
            
            setTimeout(() => {
                window.location.href = href;
            }, 700);
        });
    });

    // Page load animation
    window.addEventListener('load', () => {
        pageTransition.classList.add('exit');
        
        setTimeout(() => {
            pageTransition.classList.remove('active');
            pageTransition.classList.remove('exit');
        }, 700);
    });
}

/**
 * Map tabs functionality (for Locations page)
 */
function initMapTabs() {
    const mapTabs = document.querySelectorAll('.map-tab');
    const mapContents = document.querySelectorAll('.map-content');
    const mapHotspots = document.querySelectorAll('.map-hotspot');

    function activateTab(tabId) {
        // Remove active class from all tabs and contents
        mapTabs.forEach(tab => tab.classList.remove('active'));
        mapContents.forEach(content => content.classList.remove('active'));
        
        // Add active class to clicked tab and corresponding content
        document.querySelector(`.map-tab[data-tab="${tabId}"]`).classList.add('active');
        document.getElementById(`${tabId}-content`).classList.add('active');
    }

    mapTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            activateTab(tabId);
        });
    });

    if (mapHotspots) {
        mapHotspots.forEach(hotspot => {
            hotspot.addEventListener('click', function() {
                const tabId = this.getAttribute('data-atoll');
                activateTab(tabId);
            });
            
            // Add tooltip effect
            hotspot.addEventListener('mouseenter', function() {
                const tabId = this.getAttribute('data-atoll');
                const tabText = document.querySelector(`.map-tab[data-tab="${tabId}"]`).textContent;
                
                const tooltip = document.createElement('div');
                tooltip.className = 'hotspot-tooltip';
                tooltip.textContent = tabText;
                tooltip.style.position = 'absolute';
                tooltip.style.top = '-30px';
                tooltip.style.left = '50%';
                tooltip.style.transform = 'translateX(-50%)';
                tooltip.style.backgroundColor = 'var(--olive-dark)';
                tooltip.style.color = 'var(--white)';
                tooltip.style.padding = '5px 10px';
                tooltip.style.borderRadius = '3px';
                tooltip.style.fontSize = '0.8rem';
                tooltip.style.whiteSpace = 'nowrap';
                tooltip.style.zIndex = '10';
                
                this.appendChild(tooltip);
            });
            
            hotspot.addEventListener('mouseleave', function() {
                const tooltip = this.querySelector('.hotspot-tooltip');
                if (tooltip) {
                    tooltip.remove();
                }
            });
        });
    }
}

/**
 * Project filtering (for Projects page)
 */
function initProjectFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category').includes(filter)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

/**
 * Wishlist functionality (for Projects page)
 */
function initWishlistButtons() {
    const wishlistBtns = document.querySelectorAll('.wishlist-btn');

    wishlistBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            this.classList.toggle('active');
        });
    });
}

/**
 * Layout tabs (for Project detail page)
 */
function initLayoutTabs() {
    const layoutTabs = document.querySelectorAll('.layout-tab');
    const layoutContents = document.querySelectorAll('.layout-content');

    layoutTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs and contents
            layoutTabs.forEach(t => t.classList.remove('active'));
            layoutContents.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked tab
            tab.classList.add('active');
            
            // Show corresponding content
            const layoutId = tab.getAttribute('data-layout');
            document.getElementById(layoutId).classList.add('active');
        });
    });
}

/**
 * Gallery modal functionality (for Location and Project detail pages)
 */
function initGallery() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const galleryModal = document.querySelector('.gallery-modal');
    
    if (!galleryModal) return;
    
    const modalImage = document.querySelector('.modal-image');
    const modalClose = document.querySelector('.modal-close');
    const modalPrev = document.querySelector('.modal-prev');
    const modalNext = document.querySelector('.modal-next');
    
    let currentIndex = 0;
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const imgSrc = this.querySelector('img').getAttribute('src');
            const imgAlt = this.querySelector('img').getAttribute('alt');
            const index = parseInt(this.querySelector('img').dataset.index);
            
            modalImage.setAttribute('src', imgSrc);
            modalImage.setAttribute('alt', imgAlt);
            currentIndex = index;
            
            galleryModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });
    
    modalClose.addEventListener('click', () => {
        galleryModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
    
    if (modalPrev && modalNext) {
        modalPrev.addEventListener('click', () => {
            currentIndex = (currentIndex === 0) ? galleryItems.length - 1 : currentIndex - 1;
            const imgSrc = galleryItems[currentIndex].querySelector('img').getAttribute('src');
            const imgAlt = galleryItems[currentIndex].querySelector('img').getAttribute('alt');
            
            modalImage.setAttribute('src', imgSrc);
            modalImage.setAttribute('alt', imgAlt);
        });
        
        modalNext.addEventListener('click', () => {
            currentIndex = (currentIndex === galleryItems.length - 1) ? 0 : currentIndex + 1;
            const imgSrc = galleryItems[currentIndex].querySelector('img').getAttribute('src');
            const imgAlt = galleryItems[currentIndex].querySelector('img').getAttribute('alt');
            
            modalImage.setAttribute('src', imgSrc);
            modalImage.setAttribute('alt', imgAlt);
        });
    }
    
    // Close modal on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && galleryModal.classList.contains('active')) {
            galleryModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
}

/**
 * Chat modal functionality (for Sales page)
 */
function initChatModal() {
    const chatTrigger = document.querySelector('a[href="#chat-modal"]');
    const chatModal = document.getElementById('chat-modal');
    if (!chatTrigger || !chatModal) return;
    
    const chatClose = document.querySelector('.chat-close');
    const chatInput = document.querySelector('.chat-input input');
    const sendBtn = document.querySelector('.send-btn');
    const chatMessages = document.querySelector('.chat-messages');
    
    // Toggle chat modal
    chatTrigger.addEventListener('click', function(e) {
        e.preventDefault();
        chatModal.classList.add('active');
        if (chatInput) chatInput.focus();
    });
    
    // Close chat modal
    if (chatClose) {
        chatClose.addEventListener('click', () => {
            chatModal.classList.remove('active');
        });
    }
    
    // Send message on enter key
    if (chatInput) {
        chatInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && chatInput.value.trim() !== '') {
                sendMessage();
            }
        });
    }
    
    // Send message on button click
    if (sendBtn) {
        sendBtn.addEventListener('click', () => {
            if (chatInput.value.trim() !== '') {
                sendMessage();
            }
        });
    }
    
    // Function to send message
    function sendMessage() {
        const userMessage = chatInput.value.trim();
        
        // Add user message to chat
        const userMessageElement = document.createElement('div');
        userMessageElement.className = 'message user';
        userMessageElement.innerHTML = `<div class="message-content">${userMessage}</div>`;
        chatMessages.appendChild(userMessageElement);
        
        // Clear input
        chatInput.value = '';
        
        // Scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        // Simulate AI response after a short delay
        setTimeout(() => {
            // Sample responses based on keywords
            let response;
            
            if (userMessage.toLowerCase().includes('price') || userMessage.toLowerCase().includes('cost')) {
                response = "Our properties start from $395,000 for The Palms at Thoddoo. Would you like me to send you our detailed pricing sheet?";
            } else if (userMessage.toLowerCase().includes('location') || userMessage.toLowerCase().includes('where')) {
                response = "Our properties are located across four stunning atolls in the Maldives: Kaafu, Alif, Baa, and Vaavu. Each offers unique investment opportunities and natural beauty.";
            } else if (userMessage.toLowerCase().includes('return') || userMessage.toLowerCase().includes('roi')) {
                response = "Our properties typically generate 8-12% annual returns through rental income. The tourism growth in the Maldives has been consistently strong, with visitor numbers increasing by 15% year-over-year.";
            } else {
                response = "Thank you for your interest. Our sales team is available to answer any specific questions about our properties. Would you like me to arrange a call with one of our investment advisors?";
            }
            
            // Add AI response to chat
            const botMessageElement = document.createElement('div');
            botMessageElement.className = 'message bot';
            botMessageElement.innerHTML = `<div class="message-content">${response}</div>`;
            chatMessages.appendChild(botMessageElement);
            
            // Scroll to bottom
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }, 1000);
    }
}

/**
 * Contact form submission (for Contact page)
 */
function initContactForm() {
    const contactForm = document.querySelector('form.contact-form');
    
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Here you would typically handle the form submission via AJAX
        alert('Thank you for your message! Our team will contact you shortly.');
        contactForm.reset();
    });
}

/**
 * Video play buttons (for About and Location pages)
 */
function initVideoPlayButtons() {
    const playButtons = document.querySelectorAll('.play-btn');
    
    playButtons.forEach(btn => {
        const videoContainer = btn.closest('.story-video, .project-video, .location-video');
        
        if (btn && videoContainer) {
            btn.addEventListener('click', function() {
                // Here you would typically insert the actual video player
                // For demo purposes, we'll just change the background
                videoContainer.innerHTML = '<div style="width:100%; height:100%; display:flex; align-items:center; justify-content:center; font-size:1.2rem; color:var(--olive-dark);">Video would play here</div>';
            });
        }
    });
}

/**
 * Smooth scroll for anchor links
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
} = 'message user';
        userMessageElement.innerHTML = `<div class="message-content">${userMessage}</div>`;
        chatMessages.appendChild(userMessageElement);
        
        // Clear input
        chatInput.value = '';
        
        // Scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        // Simulate AI response after a short delay
        setTimeout(() => {
            // Sample responses based on keywords
            let response;
            
            if (userMessage.toLowerCase().includes('price') || userMessage.toLowerCase().includes('cost')) {
                response = "Our properties start from $395,000 for The Palms at Thoddoo. Would you like me to send you our detailed pricing sheet?";
            } else if (userMessage.toLowerCase().includes('location') || userMessage.toLowerCase().includes('where')) {
                response = "Our properties are located across four stunning atolls in the Maldives: Kaafu, Alif, Baa, and Vaavu. Each offers unique investment opportunities and natural beauty.";
            } else if (userMessage.toLowerCase().includes('return') || userMessage.toLowerCase().includes('roi')) {
                response = "Our properties typically generate 8-12% annual returns through rental income. The tourism growth in the Maldives has been consistently strong, with visitor numbers increasing by 15% year-over-year.";
            } else {
                response = "Thank you for your interest. Our sales team is available to answer any specific questions about our properties. Would you like me to arrange a call with one of our investment advisors?";
            }
            
            // Add AI response to chat
            const botMessageElement = document.createElement('div');
