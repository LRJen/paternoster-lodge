
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
