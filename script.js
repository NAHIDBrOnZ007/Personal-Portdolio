// Initialize Lucide Icons and AOS
document.addEventListener('DOMContentLoaded', function() {
    // Initialize icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false,
        offset: 100
    });

    // Mobile Menu Toggle
    const menuToggle = document.getElementById('menuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
            const icon = menuToggle.querySelector('i');
            if (mobileMenu.classList.contains('hidden')) {
                icon.setAttribute('data-lucide', 'menu');
            } else {
                icon.setAttribute('data-lucide', 'x');
            }
            lucide.createIcons();
        });

        // Close mobile menu when clicking on links
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                const icon = menuToggle.querySelector('i');
                icon.setAttribute('data-lucide', 'menu');
                lucide.createIcons();
            });
        });
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (mobileMenu && !mobileMenu.contains(event.target) && 
            menuToggle && !menuToggle.contains(event.target) && 
            !mobileMenu.classList.contains('hidden')) {
            mobileMenu.classList.add('hidden');
            const icon = menuToggle.querySelector('i');
            icon.setAttribute('data-lucide', 'menu');
            lucide.createIcons();
        }
    });

    // Typing Animation
    const typingElement = document.querySelector('.typing-text');
    if (typingElement) {
        const texts = [
            'WordPress Developer',
            'AI Automation Specialist', 
            'Creative Designer',
            'Digital Marketer'
        ];
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingDelay = 100;

        function type() {
            const currentText = texts[textIndex];
            
            if (isDeleting) {
                typingElement.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
                typingDelay = 50;
            } else {
                typingElement.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
                typingDelay = 100;
            }

            if (!isDeleting && charIndex === currentText.length) {
                isDeleting = true;
                typingDelay = 2000;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
                typingDelay = 500;
            }

            setTimeout(type, typingDelay);
        }

        type();
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar background on scroll
    window.addEventListener('scroll', function() {
        const nav = document.querySelector('nav');
        if (window.scrollY > 50) {
            nav.style.background = 'rgba(255, 255, 255, 0.15)';
            nav.style.backdropFilter = 'blur(20px) saturate(180%)';
        } else {
            nav.style.background = 'rgba(255, 255, 255, 0.1)';
            nav.style.backdropFilter = 'blur(20px) saturate(180%)';
        }
    });

    // Download CV button
    const downloadBtn = document.querySelector('.download-cv');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function() {
            const cvUrl = 'documents/mostak-ahmed-cv.pdf';
            const link = document.createElement('a');
            link.href = cvUrl;
            link.download = 'Mostak-Ahmed-CV.pdf';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });
    }

    // CTA button functionality
    document.querySelectorAll('.glass-btn.primary, .glass-btn.secondary').forEach(btn => {
        btn.addEventListener('click', function(e) {
            const text = this.textContent.toLowerCase();
            
            if (text.includes('work') || text.includes('view')) {
                e.preventDefault();
                document.querySelector('#projects').scrollIntoView({
                    behavior: 'smooth'
                });
            } else if (text.includes('touch') || text.includes('contact')) {
                e.preventDefault();
                document.querySelector('#contact').scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Form submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = this.querySelector('input[type="text"]').value || 'User';
            alert(`Thank you ${name}! Your message has been sent. I'll get back to you within 24 hours.`);
            this.reset();
        });
    }

    // Project Tab Functionality
    const tabButtons = document.querySelectorAll('.tab-btn');
    const projectContainers = document.querySelectorAll('.project-container');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.getAttribute('data-tab');
            
            // Update active tab
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Show active container
            projectContainers.forEach(container => {
                container.classList.remove('active');
            });
            document.getElementById(tabId).classList.add('active');
        });
    });

    // Video Play Functionality
    const videoItems = document.querySelectorAll('.video-item');
    videoItems.forEach(item => {
        const video = item.querySelector('video');
        const playButton = item.querySelector('.play-button');
        
        if (video && playButton) {
            // Play on hover
            item.addEventListener('mouseenter', () => {
                video.play().catch(e => console.log('Video play failed:', e));
            });
            
            // Pause on mouse leave
            item.addEventListener('mouseleave', () => {
                video.pause();
                video.currentTime = 0;
            });
            
            // Click to play/pause
            item.addEventListener('click', () => {
                if (video.paused) {
                    video.play().catch(e => console.log('Video play failed:', e));
                } else {
                    video.pause();
                }
            });
        }
    });

    // Initialize skill progress bars
    initializeSkillProgress();
});

// Project modal function
function openProjectModal(projectTitle) {
    alert(`Opening details for: ${projectTitle}`);
    // In a real implementation, this would open a modal with project details
}

// Skill Progress Animation
function initializeSkillProgress() {
    const progressBars = document.querySelectorAll('.progress-fill');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressFill = entry.target;
                const width = progressFill.getAttribute('data-width');
                progressFill.style.width = width + '%';
            }
        });
    }, { threshold: 0.5 });
    
    progressBars.forEach(bar => {
        observer.observe(bar);
    });
}

// Handle window resize for responsive adjustments
window.addEventListener('resize', function() {
    // Re-initialize any components that need adjustment on resize
    if (typeof AOS !== 'undefined') {
        AOS.refresh();
    }
});
