const axios = require('axios');

const { KLARNA_API_URL, KLARNA_USER_ID, KLARNA_PASSWORD } = process.env;

async function klarnaFinalizePurchase(req, res) {
    if (req.method === 'POST') {
        const { authorizationToken, orderDetails } = req.body;
        const basicAuth = `Basic ${Buffer.from(`${KLARNA_USER_ID}:${KLARNA_PASSWORD}`).toString('base64')}`;

        try {
            const response = await axios.post(`${KLARNA_API_URL}/payments/v1/authorizations/${authorizationToken}/order`, orderDetails, {
                headers: {
                    'Authorization': basicAuth,
                    'Content-Type': 'application/json'
                }
            });

            res.status(200).json({ success: true, order: response.data });
        } catch (error) {
            if (axios.isAxiosError(error)) {
                // Proper error handling for Axios errors
                console.error('Failed to capture payment:', error.message);
                res.status(500).json({ success: false, error: error.response?.data || 'Unknown Axios error occurred' });
            } else {
                // Non-axios error handling
                console.error('Non-Axios error:', error);
                res.status(500).json({ success: false, error: 'Non-Axios error occurred' });
            }
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end('Method Not Allowed');
    }
}

export default klarnaFinalizePurchase;
