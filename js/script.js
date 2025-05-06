
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
   
    
        