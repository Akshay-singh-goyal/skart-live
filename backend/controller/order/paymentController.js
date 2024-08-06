// routes/payment.js
const express = require('express');
const router = express.Router();
const stripe = require('stripe')('your_stripe_secret_key');

router.post('/create-payment-intent', async (req, res) => {
    const { items, currency } = req.body;

    try {
        // Calculate the total amount (in cents if using Stripe with INR, multiply by 100)
        const amount = calculateTotalAmount(items);

        // Create a PaymentIntent in Stripe
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency,
        });

        // Respond with client secret to confirm payment on client side
        res.json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
        console.error('Error creating payment intent:', error);
        res.status(500).json({ error: 'Failed to create payment intent' });
    }
});

module.exports = router;
