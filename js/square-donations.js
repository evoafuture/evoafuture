/**
 * Square Payment Integration for EvoAFuture Private Foundation
 * 
 * This file contains the Square Web Payments SDK integration for processing donations.
 * 
 * IMPORTANT SETUP NOTES:
 * 1. Replace 'sandbox-sq0idb-your-app-id-here' with your actual Square Application ID
 * 2. For production, change the Square SDK URL from sandbox to production
 * 3. Implement server-side payment processing endpoint
 * 4. Add proper error handling and logging
 * 5. Configure webhook endpoints for payment confirmations
 */

class SquareDonationProcessor {
    constructor() {
        this.applicationId = 'sandbox-sq0idb-your-app-id-here'; // Replace with your Square App ID
        this.payments = null;
        this.card = null;
        this.isInitialized = false;
    }

    /**
     * Initialize Square Payments SDK
     */
    async initialize() {
        if (!window.Square) {
            console.error('Square Web Payments SDK not loaded');
            this.showFallbackPayment();
            return false;
        }

        try {
            // Initialize Square Payments
            this.payments = window.Square.payments(this.applicationId, 'sandbox');
            
            // Create card payment method
            this.card = await this.payments.card({
                style: {
                    '.input-container': {
                        borderColor: '#e5e7eb',
                        borderRadius: '8px',
                    },
                    '.input-container.is-focus': {
                        borderColor: '#2563eb',
                    },
                    '.input-container.is-error': {
                        borderColor: '#ef4444',
                    },
                    '.message-text': {
                        color: '#6b7280',
                    },
                    '.message-icon': {
                        color: '#6b7280',
                    },
                    '.message-text.is-error': {
                        color: '#ef4444',
                    },
                    '.message-icon.is-error': {
                        color: '#ef4444',
                    }
                }
            });

            // Attach card to container
            await this.card.attach('#card-container');
            
            this.isInitialized = true;
            
            // Enable the donate button
            const donateButton = document.getElementById('donate-button');
            if (donateButton) {
                donateButton.disabled = false;
            }

            console.log('Square payment form initialized successfully');
            return true;

        } catch (error) {
            console.error('Failed to initialize Square payment form:', error);
            this.showFallbackPayment();
            return false;
        }
    }

    /**
     * Process donation payment
     */
    async processDonation(donationData) {
        if (!this.isInitialized || !this.card) {
            throw new Error('Square payment form not initialized');
        }

        try {
            // Tokenize the payment method
            const tokenResult = await this.card.tokenize();

            if (tokenResult.status === 'OK') {
                // Send token to your server for payment processing
                const paymentResult = await this.processPaymentOnServer({
                    token: tokenResult.token,
                    ...donationData
                });

                return paymentResult;
            } else {
                // Handle tokenization errors
                let errorMessage = 'Payment processing failed. ';
                
                if (tokenResult.errors) {
                    errorMessage += tokenResult.errors.map(error => error.detail).join(' ');
                }
                
                throw new Error(errorMessage);
            }

        } catch (error) {
            console.error('Payment processing error:', error);
            throw error;
        }
    }

    /**
     * Send payment data to server (mock implementation)
     * In production, implement actual server endpoint
     */
    async processPaymentOnServer(paymentData) {
        // Mock server call - replace with actual endpoint
        console.log('Processing payment on server:', paymentData);

        // Simulate server processing time
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Mock successful response
        // In production, your server should:
        // 1. Validate the token
        // 2. Create payment request to Square
        // 3. Handle payment response
        // 4. Store transaction in database
        // 5. Send confirmation email
        // 6. Return success/failure response

        return {
            success: true,
            transactionId: 'txn_' + Math.random().toString(36).substr(2, 9),
            amount: paymentData.amount,
            currency: 'USD',
            receipt: {
                email: paymentData.email,
                transactionId: 'txn_' + Math.random().toString(36).substr(2, 9)
            }
        };
    }

    /**
     * Show fallback payment methods when Square is unavailable
     */
    showFallbackPayment() {
        const paymentForm = document.getElementById('square-payment-form');
        if (paymentForm) {
            paymentForm.innerHTML = `
                <div class="payment-fallback">
                    <h4><i class="fas fa-exclamation-triangle"></i> Payment System Temporarily Unavailable</h4>
                    <p>Our online payment system is currently unavailable. Please use one of these alternative methods to make your donation:</p>
                    
                    <div class="fallback-options">
                        <div class="fallback-option">
                            <i class="fas fa-envelope"></i>
                            <div>
                                <strong>Mail a Check</strong>
                                <p>Make checks payable to "EvoAFuture Private Foundation"<br>
                                Mail to: 123 Community Street, Hope City, HC 12345</p>
                            </div>
                        </div>
                        
                        <div class="fallback-option">
                            <i class="fas fa-phone"></i>
                            <div>
                                <strong>Call to Donate</strong>
                                <p>Phone: (555) 123-4567<br>
                                Hours: Monday-Friday, 9:00 AM - 6:00 PM EST</p>
                            </div>
                        </div>
                        
                        <div class="fallback-option">
                            <i class="fas fa-university"></i>
                            <div>
                                <strong>Bank Transfer</strong>
                                <p>Contact us for wire transfer details<br>
                                Email: donations@evoafuture.org</p>
                            </div>
                        </div>
                    </div>
                    
                    <div class="fallback-note">
                        <p><i class="fas fa-info-circle"></i> All donations are tax-deductible. You will receive a receipt for your records.</p>
                    </div>
                </div>
            `;
        }
    }

    /**
     * Validate donation amount
     */
    validateAmount(amount) {
        const numAmount = parseFloat(amount);
        
        if (isNaN(numAmount) || numAmount <= 0) {
            return { valid: false, message: 'Please enter a valid donation amount.' };
        }
        
        if (numAmount < 5) {
            return { valid: false, message: 'Minimum donation amount is $5.' };
        }
        
        if (numAmount > 10000) {
            return { valid: false, message: 'For donations over $10,000, please contact us directly at (555) 123-4567.' };
        }
        
        return { valid: true };
    }

    /**
     * Format amount for display
     */
    formatAmount(amount) {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount);
    }
}

// Export for use in main script
window.SquareDonationProcessor = SquareDonationProcessor;

/**
 * PRODUCTION SETUP CHECKLIST:
 * 
 * □ Replace sandbox Application ID with production ID
 * □ Change Square SDK URL to production endpoint
 * □ Implement server-side payment processing
 * □ Set up webhook endpoints for payment notifications
 * □ Configure SSL certificate for secure payments
 * □ Add comprehensive error logging
 * □ Test with actual Square sandbox/production accounts
 * □ Implement proper user authentication if needed
 * □ Add fraud detection and prevention measures
 * □ Set up automated receipt generation
 * □ Configure database for transaction storage
 * □ Add donor management system integration
 * □ Implement recurring payment handling
 * □ Set up payment analytics and reporting
 * □ Add compliance with PCI DSS requirements
 * 
 * SECURITY NOTES:
 * - Never store card details on your servers
 * - Always validate payments on the server side
 * - Use HTTPS for all payment-related communications
 * - Implement proper access controls and logging
 * - Regular security audits and updates
 */