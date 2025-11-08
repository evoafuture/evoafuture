// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle mobile menu
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
});

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

// Event Sign-up Modal Functionality
const modal = document.getElementById('signup-modal');
const signupBtns = document.querySelectorAll('.signup-btn');
const closeBtn = document.querySelector('.close');
const signupForm = document.getElementById('signup-form');

let currentEventName = '';

// Open modal when signup button is clicked
signupBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        const eventType = this.getAttribute('data-event');
        currentEventName = getEventName(eventType);
        
        // Update modal title
        const modalTitle = modal.querySelector('h2');
        modalTitle.textContent = `Sign Up for ${currentEventName}`;
        
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    });
});

// Close modal
closeBtn.addEventListener('click', function() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
    resetForm(signupForm);
});

// Close modal when clicking outside
window.addEventListener('click', function(e) {
    if (e.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        resetForm(signupForm);
    }
});

// Get event name from data attribute
function getEventName(eventType) {
    const eventNames = {
        'stem-workshop': 'STEM Youth Workshop: AI & Robotics',
        'women-entrepreneurs': 'Women Entrepreneurs Networking Event',
        'mental-health-forum': 'Mental Health & Wellness Community Forum'
    };
    return eventNames[eventType] || 'Event';
}

// Handle event sign-up form submission
signupForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    if (validateSignupForm()) {
        const formData = new FormData(this);
        const signupData = {
            event: currentEventName,
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            attendees: formData.get('attendees'),
            comments: formData.get('comments'),
            timestamp: new Date().toISOString()
        };
        
        // Simulate form submission (in a real app, this would send to a server)
        console.log('Event Registration:', signupData);
        
        // Show success message
        showNotification('Registration successful! We will contact you soon with event details.', 'success');
        
        // Close modal and reset form
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        resetForm(this);
    }
});

// Validate signup form
function validateSignupForm() {
    const name = document.getElementById('signup-name').value.trim();
    const email = document.getElementById('signup-email').value.trim();
    
    if (!name) {
        showNotification('Please enter your full name.', 'error');
        return false;
    }
    
    if (!email || !isValidEmail(email)) {
        showNotification('Please enter a valid email address.', 'error');
        return false;
    }
    
    return true;
}

// Contact Form Functionality
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    if (validateContactForm()) {
        const formData = new FormData(this);
        const contactData = {
            name: formData.get('name'),
            email: formData.get('email'),
            subject: formData.get('subject'),
            message: formData.get('message'),
            timestamp: new Date().toISOString()
        };
        
        // Simulate form submission (in a real app, this would send to a server)
        console.log('Contact Form Submission:', contactData);
        
        // Show success message
        showNotification('Message sent successfully! We will get back to you within 24 hours.', 'success');
        
        // Reset form
        resetForm(this);
    }
});

// Validate contact form
function validateContactForm() {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    
    if (!name) {
        showNotification('Please enter your full name.', 'error');
        return false;
    }
    
    if (!email || !isValidEmail(email)) {
        showNotification('Please enter a valid email address.', 'error');
        return false;
    }
    
    if (!message) {
        showNotification('Please enter your message.', 'error');
        return false;
    }
    
    if (message.length < 10) {
        showNotification('Message must be at least 10 characters long.', 'error');
        return false;
    }
    
    return true;
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Reset form function
function resetForm(form) {
    form.reset();
    // Remove any error states
    const inputs = form.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        input.classList.remove('error');
    });
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">
                ${type === 'success' ? '✓' : type === 'error' ? '✕' : 'ℹ'}
            </span>
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles for notification
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        z-index: 3000;
        max-width: 400px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 16px;
        border-radius: 8px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        transform: translateX(100%);
        transition: transform 0.3s ease;
        font-family: 'Inter', sans-serif;
    `;
    
    // Add notification to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        removeNotification(notification);
    });
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        removeNotification(notification);
    }, 5000);
}

function removeNotification(notification) {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 300);
}

// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 30px rgba(0, 0, 0, 0.15)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
});

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
    const animateElements = document.querySelectorAll('.program-card, .event-card, .past-event-card');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Counter animation for statistics
function animateCounters() {
    const counters = document.querySelectorAll('.stat strong');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent.replace(/[^\d]/g, ''));
        let current = 0;
        const increment = target / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            
            // Format the number
            let displayValue = Math.floor(current);
            if (target >= 1000) {
                if (displayValue >= 10000) {
                    displayValue = (displayValue / 1000).toFixed(0) + 'k';
                } else if (displayValue >= 1000) {
                    displayValue = (displayValue / 1000).toFixed(1) + 'k';
                }
                displayValue += '+';
            } else {
                displayValue += target >= 100 ? '+' : '';
            }
            
            counter.textContent = displayValue;
        }, 20);
    });
}

// Trigger counter animation when statistics section is visible
const statsSection = document.querySelector('.programs');
if (statsSection) {
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statsObserver.observe(statsSection);
}

// Add loading spinner for form submissions
function showLoadingSpinner(button) {
    const originalText = button.textContent;
    button.textContent = 'Processing...';
    button.disabled = true;
    button.style.opacity = '0.7';
    
    return function() {
        button.textContent = originalText;
        button.disabled = false;
        button.style.opacity = '1';
    };
}

// Enhanced form submission with loading state
document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', function(e) {
        const submitBtn = this.querySelector('button[type="submit"]');
        if (submitBtn && !e.defaultPrevented) {
            const resetLoading = showLoadingSpinner(submitBtn);
            
            // Reset loading state after a short delay (simulating server response)
            setTimeout(resetLoading, 1000);
        }
    });
});

// Keyboard navigation for accessibility
document.addEventListener('keydown', function(e) {
    // Close modal with Escape key
    if (e.key === 'Escape' && modal.style.display === 'block') {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        resetForm(signupForm);
    }
});

// Add focus management for modal
modal.addEventListener('click', function(e) {
    if (e.target === modal) {
        // Focus management when clicking outside modal
        const firstInput = modal.querySelector('input, textarea, button');
        if (firstInput) {
            firstInput.focus();
        }
    }
});

// Print functionality (bonus feature)
function printPage() {
    window.print();
}

// Add print styles dynamically
const printStyles = `
    @media print {
        .header, .footer, .modal, .notification { display: none !important; }
        .hero { height: auto; padding: 40px 0; }
        .section { page-break-inside: avoid; }
        .program-card, .event-card, .past-event-card { 
            page-break-inside: avoid; 
            box-shadow: none;
            border: 1px solid #ddd;
        }
    }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = printStyles;
document.head.appendChild(styleSheet);

// Donation System with Square Integration
let selectedAmount = 0;
let donationFrequency = 'one-time';
let squareProcessor = null;

// Initialize Square Payment Form
async function initializeSquarePayment() {
    if (window.SquareDonationProcessor) {
        squareProcessor = new SquareDonationProcessor();
        await squareProcessor.initialize();
    } else {
        console.error('Square donation processor not available');
        showAlternativePaymentMethods();
    }
}

// Show alternative payment methods if Square fails to load
function showAlternativePaymentMethods() {
    if (squareProcessor) {
        squareProcessor.showFallbackPayment();
    }
}

// Donation amount selection
document.addEventListener('DOMContentLoaded', function() {
    const amountButtons = document.querySelectorAll('.amount-btn');
    const customAmountInput = document.querySelector('.custom-amount-input');
    const customDonationInput = document.getElementById('custom-donation');
    const displayAmount = document.getElementById('display-amount');
    const donateButton = document.getElementById('donate-button');
    const donateBtnText = document.getElementById('donate-btn-text');

    // Handle amount button clicks
    amountButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            amountButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const amount = this.getAttribute('data-amount');
            
            if (amount === 'custom') {
                customAmountInput.style.display = 'block';
                selectedAmount = 0;
                displayAmount.textContent = '$0';
                updateDonateButton();
            } else {
                customAmountInput.style.display = 'none';
                selectedAmount = parseInt(amount);
                displayAmount.textContent = `$${selectedAmount}`;
                updateDonateButton();
            }
        });
    });

    // Handle custom amount input
    customDonationInput.addEventListener('input', function() {
        const customAmount = parseFloat(this.value);
        if (customAmount && customAmount >= 5) {
            selectedAmount = customAmount;
            displayAmount.textContent = `$${selectedAmount}`;
        } else {
            selectedAmount = 0;
            displayAmount.textContent = '$0';
        }
        updateDonateButton();
    });

    // Handle donation frequency selection
    const frequencyOptions = document.querySelectorAll('input[name="frequency"]');
    frequencyOptions.forEach(option => {
        option.addEventListener('change', function() {
            donationFrequency = this.value;
            updateDonateButton();
        });
    });

    // Update donate button text based on selection
    function updateDonateButton() {
        if (selectedAmount > 0) {
            let buttonText = `Donate $${selectedAmount}`;
            if (donationFrequency === 'monthly') {
                buttonText += '/month';
            } else if (donationFrequency === 'yearly') {
                buttonText += '/year';
            }
            donateBtnText.textContent = buttonText;
            donateButton.disabled = false;
        } else {
            donateBtnText.textContent = 'Select Amount';
            donateButton.disabled = true;
        }
    }

    // Initialize Square payment form
    initializeSquarePayment();
});

// Handle donation form submission
document.getElementById('payment-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    if (selectedAmount <= 0) {
        showNotification('Please select a donation amount.', 'error');
        return;
    }

    const donateButton = document.getElementById('donate-button');
    const originalText = donateButton.innerHTML;
    
    // Show loading state
    donateButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
    donateButton.disabled = true;

    try {
        // Get form data
        const donorName = document.getElementById('donor-name').value;
        const donorEmail = document.getElementById('donor-email').value;
        const isAnonymous = document.getElementById('anonymous-donation').checked;
        const subscribeNewsletter = document.getElementById('newsletter-signup').checked;

        // Process donation using Square
        if (squareProcessor && squareProcessor.isInitialized) {
            // Validate donation amount
            const validation = squareProcessor.validateAmount(selectedAmount);
            if (!validation.valid) {
                showNotification(validation.message, 'error');
                return;
            }

            // Prepare donation data
            const donationData = {
                amount: selectedAmount,
                frequency: donationFrequency,
                donor: donorName,
                email: donorEmail,
                anonymous: isAnonymous,
                newsletter: subscribeNewsletter
            };

            try {
                // Process payment through Square
                const result = await squareProcessor.processDonation(donationData);
                
                if (result.success) {
                    // Show success message
                    showDonationSuccess({
                        amount: selectedAmount,
                        frequency: donationFrequency,
                        donor: donorName,
                        anonymous: isAnonymous,
                        transactionId: result.transactionId
                    });
                    
                    // Reset form
                    resetDonationForm();
                } else {
                    throw new Error(result.error || 'Payment processing failed');
                }
                
            } catch (paymentError) {
                console.error('Square payment error:', paymentError);
                showNotification(paymentError.message || 'Payment failed. Please try again or use alternative payment methods.', 'error');
            }
            
        } else {
            // Fallback for when Square is not available
            showNotification('Payment processing unavailable. Please use alternative payment methods below.', 'error');
        }
        
    } catch (error) {
        console.error('Payment error:', error);
        showNotification('Payment failed. Please try again or use alternative payment methods.', 'error');
    } finally {
        // Reset button
        donateButton.innerHTML = originalText;
        donateButton.disabled = selectedAmount <= 0;
    }
});

// Show donation success message
function showDonationSuccess(donationData) {
    const { amount, frequency, donor, anonymous, transactionId } = donationData;
    
    let message = `Thank you for your generous ${frequency} donation of $${amount}!`;
    if (!anonymous) {
        message = `Thank you, ${donor}, for your generous ${frequency} donation of $${amount}!`;
    }
    message += ' You will receive a tax receipt via email shortly.';
    
    if (transactionId) {
        message += ` Transaction ID: ${transactionId}`;
    }
    
    showDonationNotification(message, 'success', 10000);
    
    // Track donation (for analytics)
    console.log('Donation completed:', donationData);
}

// Reset donation form
function resetDonationForm() {
    document.getElementById('payment-form').reset();
    document.querySelectorAll('.amount-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelector('.custom-amount-input').style.display = 'none';
    selectedAmount = 0;
    donationFrequency = 'one-time';
    document.getElementById('display-amount').textContent = '$0';
    document.getElementById('donate-btn-text').textContent = 'Select Amount';
    document.getElementById('donate-button').disabled = true;
}

// Enhanced notification system for donations
function showDonationNotification(message, type = 'info', duration = 8000) {
    const existingNotification = document.querySelector('.donation-notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = `donation-notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">
                ${type === 'success' ? '💚' : type === 'error' ? '❌' : 'ℹ️'}
            </span>
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        left: 20px;
        max-width: 600px;
        margin: 0 auto;
        z-index: 3000;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 20px;
        border-radius: 12px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        transform: translateY(-100%);
        transition: transform 0.3s ease;
        font-family: 'Inter', sans-serif;
        text-align: center;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateY(0)';
    }, 100);
    
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        removeNotification(notification);
    });
    
    setTimeout(() => {
        removeNotification(notification);
    }, duration);
}

// Add to Calendar Functionality
function addToCalendar(type) {
    const eventDetails = {
        title: 'Youth STEM Workshop - EvoAFuture Foundation',
        description: 'Interactive workshop introducing young minds to robotics, coding, and scientific discovery. Perfect for ages 8-16.',
        location: 'Campbell Community Center, 1 W. Campbell Ave, #C-31 Campbell, CA 95008',
        startDate: '2025-11-15',
        startTime: '14:00', // 2:00 PM in 24-hour format
        endTime: '17:00'    // 5:00 PM in 24-hour format
    };

    if (type === 'google') {
        // Google Calendar URL
        const startDateTime = `${eventDetails.startDate}T${eventDetails.startTime}:00`;
        const endDateTime = `${eventDetails.startDate}T${eventDetails.endTime}:00`;
        const googleUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(eventDetails.title)}&dates=${startDateTime.replace(/[-:]/g, '')}/${endDateTime.replace(/[-:]/g, '')}&details=${encodeURIComponent(eventDetails.description)}&location=${encodeURIComponent(eventDetails.location)}`;
        window.open(googleUrl, '_blank');
    } else if (type === 'ics') {
        // ICS file for Outlook, Apple Calendar, etc.
        const startDateTime = `${eventDetails.startDate}T${eventDetails.startTime}:00`;
        const endDateTime = `${eventDetails.startDate}T${eventDetails.endTime}:00`;
        
        const icsContent = [
            'BEGIN:VCALENDAR',
            'VERSION:2.0',
            'PRODID:-//EvoAFuture Foundation//Event//EN',
            'BEGIN:VEVENT',
            'UID:' + Date.now() + '@evoafuture.org',
            'DTSTAMP:' + new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z',
            'DTSTART:' + startDateTime.replace(/[-:]/g, ''),
            'DTEND:' + endDateTime.replace(/[-:]/g, ''),
            'SUMMARY:' + eventDetails.title,
            'DESCRIPTION:' + eventDetails.description,
            'LOCATION:' + eventDetails.location,
            'END:VEVENT',
            'END:VCALENDAR'
        ].join('\r\n');

        // Create and download the ICS file
        const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'youth-stem-workshop.ics';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        showNotification('Calendar event downloaded! Check your Downloads folder.', 'success');
    }
}

// Image Carousel Functionality
let currentSlideIndex = 0;
const slides = document.querySelectorAll('.carousel-slide');
const indicators = document.querySelectorAll('.indicator');
const totalSlides = slides.length;

function showSlide(n) {
    // Hide all slides
    slides.forEach(slide => slide.classList.remove('active'));
    indicators.forEach(indicator => indicator.classList.remove('active'));
    
    // Wrap around if necessary
    if (n >= totalSlides) currentSlideIndex = 0;
    if (n < 0) currentSlideIndex = totalSlides - 1;
    
    // Show current slide
    const track = document.querySelector('.carousel-track');
    track.style.transform = `translateX(-${currentSlideIndex * 100}%)`;
    
    // Update indicators
    if (slides[currentSlideIndex]) slides[currentSlideIndex].classList.add('active');
    if (indicators[currentSlideIndex]) indicators[currentSlideIndex].classList.add('active');
}

function moveCarousel(n) {
    currentSlideIndex += n;
    showSlide(currentSlideIndex);
}

function currentSlide(n) {
    currentSlideIndex = n - 1;
    showSlide(currentSlideIndex);
}

// Auto-play carousel (optional - uncomment to enable)
// setInterval(() => {
//     moveCarousel(1);
// }, 5000);

// Touch/swipe support for mobile
let startX, endX;

document.querySelector('.carousel-container')?.addEventListener('touchstart', e => {
    startX = e.touches[0].clientX;
});

document.querySelector('.carousel-container')?.addEventListener('touchend', e => {
    endX = e.changedTouches[0].clientX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = startX - endX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swipe left - next slide
            moveCarousel(1);
        } else {
            // Swipe right - previous slide
            moveCarousel(-1);
        }
    }
}

// Initialize carousel on page load
document.addEventListener('DOMContentLoaded', function() {
    if (slides.length > 0) {
        showSlide(0);
    }
});

console.log('EvoAFuture website with donation system loaded successfully!');