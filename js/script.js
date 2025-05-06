
        // Mobile menu toggle
        const hamburger = document.querySelector('.hamburger');
        const nav = document.querySelector('nav');
        
        hamburger.addEventListener('click', () => {
            nav.classList.toggle('active');
            hamburger.classList.toggle('active');
        });

        // Sticky header on scroll
        const header = document.querySelector('header');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });

        // Testimonial slider
        const testimonialSlides = document.querySelectorAll('.testimonial-slide');
        const testimonialDots = document.querySelectorAll('.testimonial-dot');
        let currentSlide = 0;

        function showSlide(n) {
            testimonialSlides.forEach(slide => slide.classList.remove('active'));
            testimonialDots.forEach(dot => dot.classList.remove('active'));
            
            testimonialSlides[n].classList.add('active');
            testimonialDots[n].classList.add('active');
            currentSlide = n;
        }

        testimonialDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                showSlide(index);
            });
        });

        // Auto-advance testimonials
        setInterval(() => {
            let nextSlide = (currentSlide + 1) % testimonialSlides.length;
            showSlide(nextSlide);
        }, 6000);

        // Scroll reveal animation
        const fadeElements = document.querySelectorAll('.fade-in');
        
        function checkFade() {
            fadeElements.forEach(element => {
                const elementTop = element.getBoundingClientRect().top;
                const windowHeight = window.innerHeight;
                
                if (elementTop < windowHeight - 100) {
                    element.classList.add('appear');
                }
            });
        }

        // Run once on page load
        checkFade();
        
        // Run on scroll
        window.addEventListener('scroll', checkFade);

        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const target = document.querySelector(targetId);
                if (target) {
                    const headerHeight = document.querySelector('header').offsetHeight;
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });

                    // Close mobile menu if open
                    if (nav.classList.contains('active')) {
                        nav.classList.remove('active');
                        hamburger.classList.remove('active');
                    }
                }
            });
        });

        // Simple form validation
        const subscribeForm = document.querySelector('.footer-subscribe form');
        if (subscribeForm) {
            subscribeForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const emailInput = subscribeForm.querySelector('input[type="email"]');
                if (emailInput.value.trim() === '' || !emailInput.value.includes('@')) {
                    alert('Please enter a valid email address');
                    return;
                }
                
                // Simulating successful submission
                alert('Thank you for subscribing to our newsletter!');
                emailInput.value = '';
            });
        }

        // Image gallery popup (placeholder for implementation)
        document.querySelectorAll('.room-btn').forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                alert('Room details page would open here.');
            });
        });

        // Booking calendar functionality (placeholder)
        document.querySelector('.book-btn').addEventListener('click', function(e) {
            // This would typically connect to a booking system
            // For now, just scroll to contact section
            const contactSection = document.querySelector('#contact');
            if (contactSection) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = contactSection.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
        
// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
    // Initialize AOS safely
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            once: true,
        });
    } else {
        console.warn('AOS library not loaded. Animations disabled.');
    }

    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('nav ul');
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        nav.classList.toggle('active');
    });

    // Close mobile menu on link click
    document.querySelectorAll('nav ul li a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            nav.classList.remove('active');
        });
    });

    // Sticky header
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    });

    // Room category filter
    const tabButtons = document.querySelectorAll('.tab-btn');
    const roomCards = document.querySelectorAll('.room-card');
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            const category = button.getAttribute('data-category');
            roomCards.forEach(card => {
                const cardType = card.getAttribute('data-type');
                if (category === 'all' || category === cardType) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // Booking modal
    const bookButtons = document.querySelectorAll('.book-btn, .book-room-btn');
    const bookingModal = document.querySelector('.booking-modal');
    const closeModal = document.querySelector('.close-modal');
    bookButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            bookingModal.classList.add('active');
        });
    });
    closeModal.addEventListener('click', () => {
        bookingModal.classList.remove('active');
    });
    bookingModal.addEventListener('click', (e) => {
        if (e.target === bookingModal) {
            bookingModal.classList.remove('active');
        }
    });

    // Initialize LightGallery for gallery pages
    if (document.getElementById('lightgallery')) {
        if (typeof lightGallery !== 'undefined') {
            lightGallery(document.getElementById('lightgallery'), {
                speed: 500,
                plugins: [],
            });
        } else {
            console.warn('LightGallery not loaded.');
        }
    }

    // Smooth page transitions
    document.querySelectorAll('a[href^="./"]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            document.body.style.opacity = '0';
            setTimeout(() => {
                window.location.href = link.getAttribute('href');
            }, 300);
        });
    });

    // Fade in on page load
    window.addEventListener('load', () => {
        document.body.style.opacity = '1';
    });
});

        // Update nights field based on check-in/check-out dates
        document.addEventListener('DOMContentLoaded', () => {
            const checkInInput = document.getElementById('check-in');
            const checkOutInput = document.getElementById('check-out');
            const nightsInput = document.getElementById('nights');

            function updateNights() {
                const checkInDate = new Date(checkInInput.value);
                const checkOutDate = new Date(checkOutInput.value);
                if (checkInDate && checkOutDate) {
                    const diffTime = checkOutDate - checkInDate;
                    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                    nightsInput.value = diffDays > 0 ? diffDays : 1;
                }
            }

            checkInInput.addEventListener('change', updateNights);
            checkOutInput.addEventListener('change', updateNights);
        });
   
    
        
