const axios = require('axios');

const { KLARNA_API_URL, KLARNA_USER_ID, KLARNA_PASSWORD } = process.env;

async function klarnaSession(req, res) {
    if (req.method === 'POST') {
        const { totalAmount, currency, locale } = req.body;

        try {
            const token = `Basic ${Buffer.from(`${KLARNA_USER_ID}:${KLARNA_PASSWORD}`).toString('base64')}`;
            console.log("token : ", token);
            const response = await axios.post(`${KLARNA_API_URL}/payments/v1/sessions`, req.body, {
                headers: {
                    'Authorization': token,
                    'Content-Type': 'application/json'
                }
            });

            res.status(200).json({
                client_token: response.data.client_token,
                session_id: response.data.session_id
            });
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const serverError = error;
                if (serverError && serverError.response) {
                    res.status(500).json({ error: serverError.response.data });
                } else {
                    res.status(500).json({ error: 'Axios error without response', KLARNA_API_URL, KLARNA_USER_ID, KLARNA_PASSWORD, token });
                }
            } else {
                res.status(500).json({ error: 'Non-Axios error' });
            }
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

export default klarnaSession;
