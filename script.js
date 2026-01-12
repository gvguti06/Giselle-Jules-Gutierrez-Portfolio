// Skills Carousel 3D - Both Sides
const skillsCarousel = document.querySelector('.skills-carousel');
const carouselItems = document.querySelectorAll('.carousel-item');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const indicators = document.querySelectorAll('.indicator');

let currentIndex = 0;

function updateCarousel() {
    // Update each item's position
    carouselItems.forEach((item, index) => {
        const distance = (index - currentIndex + carouselItems.length) % carouselItems.length;
        const halfLength = Math.ceil(carouselItems.length / 2);
        
        // Calculate position relative to current (can go backwards or forwards)
        let relativePos = distance;
        if (relativePos > halfLength) {
            relativePos = relativePos - carouselItems.length;
        }
        
        if (relativePos === 0) {
            // Current item - front center
            item.setAttribute('data-position', 'center');
            item.style.pointerEvents = 'auto';
            item.style.transform = 'translateX(0) scale(1) rotateY(0deg)';
            item.style.opacity = '1';
            item.style.zIndex = '10';
            item.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
        } else if (relativePos === 1) {
            // Next item (right side)
            item.setAttribute('data-position', 'right-1');
            item.style.pointerEvents = 'none';
            item.style.transform = 'translateX(80px) scale(0.85) rotateY(-25deg)';
            item.style.opacity = '1';
            item.style.zIndex = '5';
            item.style.boxShadow = '-10px 10px 30px rgba(0, 0, 0, 0.2)';
        } else if (relativePos === 2) {
            // Next next item (right side)
            item.setAttribute('data-position', 'right-2');
            item.style.pointerEvents = 'none';
            item.style.transform = 'translateX(160px) scale(0.7) rotateY(-35deg)';
            item.style.opacity = '1';
            item.style.zIndex = '4';
        } else if (relativePos === -1) {
            // Previous item (left side)
            item.setAttribute('data-position', 'left-1');
            item.style.pointerEvents = 'none';
            item.style.transform = 'translateX(-80px) scale(0.85) rotateY(25deg)';
            item.style.opacity = '1';
            item.style.zIndex = '5';
            item.style.boxShadow = '10px 10px 30px rgba(0, 0, 0, 0.2)';
        } else if (relativePos === -2) {
            // Previous previous item (left side)
            item.setAttribute('data-position', 'left-2');
            item.style.pointerEvents = 'none';
            item.style.transform = 'translateX(-160px) scale(0.7) rotateY(35deg)';
            item.style.opacity = '1';
            item.style.zIndex = '4';
        } else {
            // Hidden items
            item.setAttribute('data-position', 'hidden');
            item.style.pointerEvents = 'none';
            item.style.transform = relativePos > 0 ? 
                'translateX(240px) scale(0.5) rotateY(-45deg)' : 
                'translateX(-240px) scale(0.5) rotateY(45deg)';
            item.style.opacity = '0';
            item.style.zIndex = '1';
        }
    });
    
    // Update indicators
    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentIndex);
    });
}

function goToSlide(index) {
    if (index < 0) {
        currentIndex = carouselItems.length - 1;
    } else if (index >= carouselItems.length) {
        currentIndex = 0;
    } else {
        currentIndex = index;
    }
    updateCarousel();
}

function nextSlide() {
    goToSlide(currentIndex + 1);
}

function prevSlide() {
    goToSlide(currentIndex - 1);
}

// Event listeners for buttons
nextBtn.addEventListener('click', nextSlide);
prevBtn.addEventListener('click', prevSlide);

// Event listeners for indicators
indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => goToSlide(index));
});

// Initialize carousel
updateCarousel();

// Scroll effect for section headings
const sectionHeadings = document.querySelectorAll('h2');

const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
        } else {
            entry.target.classList.remove('in-view');
        }
    });
}, observerOptions);

sectionHeadings.forEach(heading => {
    observer.observe(heading);
});

// Smooth scrolling for navigation links
const navLinks = document.querySelectorAll('.nav-menu a');

navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        // Only prevent default for internal anchor links (starting with #)
        if (href.startsWith('#')) {
            e.preventDefault();
            
            const targetId = href.substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        }
        // External links will work normally
    });
});

// Also add a handler for ALL links to ensure external links work
document.addEventListener('click', function(e) {
    // If it's an external link with target="_blank", let it work normally
    if (e.target.tagName === 'A' && e.target.getAttribute('target') === '_blank') {
        // Don't prevent default - let the link work
        return true;
    }
});

// CTA Button - scroll to experience
const ctaButton = document.getElementById('ctaButton');
if (ctaButton) {
    ctaButton.addEventListener('click', function() {
        const experienceSection = document.getElementById('experience');
        experienceSection.scrollIntoView({ behavior: 'smooth' });
    });
}

// Log page load
console.log('Portfolio website loaded successfully!');

// Parallax Effect on Scroll
window.addEventListener('scroll', function() {
    const scrollPosition = window.pageYOffset;
    
    // Parallax for hero section - moderate
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.backgroundPosition = `0 ${scrollPosition * 0.4}px`;
    }
    
// Parallax for project cards - stronger but controlled
    const projectCards = document.querySelectorAll('.experience-card');
    projectCards.forEach((card, index) => {
        const cardRect = card.getBoundingClientRect();
        const cardTop = cardRect.top;
        const cardHeight = cardRect.height;
        const windowHeight = window.innerHeight;
        
        // Calculate how far the card is from center (0 when centered)
        const cardCenter = cardTop + cardHeight / 2;
        const viewportCenter = windowHeight / 2;
        const distanceFromCenter = cardCenter - viewportCenter;
        
        // Normalize distance to get parallax offset
        const offset = distanceFromCenter * 0.2;
        
        // Alternate direction - left cards come from left, right cards from right
        if (index % 2 === 0) {
            card.style.transform = `translateX(${offset}px) translateY(${scrollPosition * 0.15}px)`;
        } else {
            card.style.transform = `translateX(${-offset}px) translateY(${scrollPosition * 0.15}px)`;
        }
        
        // Scroll-in animation for project cards
        if (cardTop < windowHeight * 0.85) {
            // Card is in view
            if (!card.classList.contains('slide-in-left') && !card.classList.contains('slide-in-right')) {
                // Alternate left and right slide-in
                if (index % 2 === 0) {
                    card.classList.add('slide-in-left');
                } else {
                    card.classList.add('slide-in-right');
                }
            }
        }
    });
    
    // Parallax for about section - noticeable floating effect
    const aboutImage = document.querySelector('.profile-img');
    if (aboutImage) {
        const offset = scrollPosition * 0.2;
        aboutImage.style.transform = `translateY(${offset}px)`;
    }
    
    // Smooth scale effect for skills carousel container on scroll
    const skillsSection = document.querySelector('.skills');
    if (skillsSection) {
        const skillsRect = skillsSection.getBoundingClientRect();
        const skillsTop = skillsRect.top;
        const windowHeight = window.innerHeight;
        
        // Calculate visibility (0 when below viewport, 1 when centered)
        const visibility = (windowHeight - skillsTop) / (windowHeight + skillsRect.height);
        
        // Clamp between 0.9 and 1
        const scale = Math.max(0.9, Math.min(1, visibility));
        
        const skillsCarouselContainer = document.querySelector('.skills-carousel-container');
        if (skillsCarouselContainer) {
            skillsCarouselContainer.style.transform = `scale(${scale})`;
            skillsCarouselContainer.style.opacity = Math.max(0.6, visibility);
        }
    }
});

