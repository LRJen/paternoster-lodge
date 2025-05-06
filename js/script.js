// Initialize Supabase Client
const supabase = Supabase.createClient(
    'https://zrqkkupyzfkbxlzhpaac.supabase.co', // Your Supabase Project URL
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpycWtrdXB5emZrYnhsemhwYWFjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY1MjI0NDAsImV4cCI6MjA2MjA5ODQ0MH0.AdU-rmIzvXZ__pFHEvqwQji61VCkuUcWI_ckxIPiZGg' // Your Supabase anon key
);

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
    // Initialize AOS safely
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            once: true,
            offset: 100
        });
    } else {
        console.warn('AOS library not loaded. Animations disabled.');
    }

    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('nav');
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        nav.classList.toggle('active');
        nav.querySelector('ul').classList.toggle('active');
    });

    // Close mobile menu on link click
    nav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
            hamburger.classList.remove('active');
            nav.querySelector('ul').classList.remove('active');
        });
    });

    // Sticky header
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 50);
    });

    // Room category filter
    const tabButtons = document.querySelectorAll('.tab-btn');
    const roomCards = document.querySelectorAll('.room-card');
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.dataset.category;
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            roomCards.forEach(card => {
                const isVisible = category === 'all' || card.dataset.type === category;
                card.style.opacity = isVisible ? '1' : '0';
                card.style.transform = isVisible ? 'translateY(0)' : 'translateY(20px)';
                card.style.display = isVisible ? 'block' : 'none';
                if (isVisible) {
                    setTimeout(() => {
                        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                    }, 100);
                }
            });
        });
    });

    // Booking modal and Supabase integration
    const bookButtons = document.querySelectorAll('.book-btn, .book-room-btn');
    const bookingModal = document.querySelector('.booking-modal');
    const closeModal = document.querySelector('.close-modal');
    const bookingForm = document.querySelector('.modal-content form');

    async function checkAuth() {
        const { data: { session } } = await supabase.auth.getSession();
        return session;
    }

    function showModal() {
        bookingModal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }

    function hideModal() {
        bookingModal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }

    bookButtons.forEach(button => {
        button.addEventListener('click', async (e) => {
            e.preventDefault();
            const session = await checkAuth();
            if (!session) {
                alert('Please log in to book a room. (Note: Add login modal logic here)');
            } else {
                showModal();
            }
        });
    });

    closeModal.addEventListener('click', () => {
        hideModal();
    });

    bookingModal.addEventListener('click', (e) => {
        if (e.target === bookingModal) {
            hideModal();
        }
    });

    if (bookingForm) {
        bookingForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const checkIn = bookingForm.querySelector('#check-in').value;
            const checkOut = bookingForm.querySelector('#check-out').value;
            const roomType = bookingForm.querySelector('select').value;
            const nights = bookingForm.querySelector('#nights').value;

            if (!checkIn || !checkOut || !roomType || !nights) {
                alert('Please fill in all fields.');
                return;
            }

            const session = await checkAuth();
            if (!session) {
                alert('Please log in to book.');
                return;
            }

            const { error } = await supabase.from('bookings').insert({
                user_id: session.user.id,
                room_type: roomType,
                check_in_date: checkIn,
                check_out_date: checkOut,
                nights: nights
            });

            if (error) {
                alert('Booking failed: ' + error.message);
            } else {
                alert('Booking request submitted! We will confirm soon.');
                bookingForm.reset();
                hideModal();
            }
        });
    }

    // Update nights field based on check-in/check-out dates
    const checkInInput = document.getElementById('check-in');
    const checkOutInput = document.getElementById('check-out');
    const nightsInput = document.getElementById('nights');

    function updateNights() {
        const checkInDate = new Date(checkInInput.value);
        const checkOutDate = new Date(checkOutInput.value);
        if (checkInDate && checkOutDate && checkOutDate > checkInDate) {
            const diffTime = checkOutDate - checkInDate;
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            nightsInput.value = diffDays;
        } else {
            nightsInput.value = 1;
        }
    }

    checkInInput.addEventListener('change', updateNights);
    checkOutInput.addEventListener('change', updateNights);

    // Newsletter form validation
    const newsletterForm = document.querySelector('footer form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = newsletterForm.querySelector('input[type="email"]');
            if (!emailInput.value.trim() || !emailInput.value.includes('@')) {
                alert('Please enter a valid email address.');
                return;
            }
            alert('Thank you for subscribing to our newsletter!');
            emailInput.value = '';
        });
    }

    // Lazy loading images
    document.querySelectorAll('img').forEach(img => {
        img.setAttribute('loading', 'lazy');
    });

    // Smooth page transitions
    document.querySelectorAll('a:not([href^="#"])').forEach(link => {
        link.addEventListener('click', (e) => {
            if (!link.classList.contains('book-btn') && !link.classList.contains('book-room-btn')) {
                e.preventDefault();
                const href = link.getAttribute('href');
                document.body.style.opacity = '0';
                setTimeout(() => {
                    window.location.href = href;
                }, 300);
            }
        });
    });

    // Fade in on page load
    window.addEventListener('load', () => {
        document.body.style.transition = 'opacity 0.3s ease';
        document.body.style.opacity = '1';
    });
});