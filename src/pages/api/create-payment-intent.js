const Stripe = require("stripe");

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
const stripe = new Stripe(STRIPE_SECRET_KEY, {
    apiVersion: "2024-04-10",
});

async function handlePost(req, res) {
    if (req.method === 'POST') {
        if (!req.body.data || !req.body.data.amount) {
            return res.status(400).json({ error: 'Amount is required' });
        }

        const { data } = req.body;

        try {
            const amount = Number(data.amount);
            if (isNaN(amount)) {
                return res.status(400).json({ error: 'Invalid amount' });
            }

            const paymentIntent = await stripe.paymentIntents.create({
                amount: amount * 100, // Convert to cents
                currency: "USD",
            });

            return res.status(200).json({ clientSecret: paymentIntent.client_secret });
        } catch (error) {
            console.error('Failed to create payment intent:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

export default handlePost;
