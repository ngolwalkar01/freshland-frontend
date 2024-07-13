const axios = require('axios');

// const { KLARNA_API_URL, KLARNA_USER_ID, KLARNA_PASSWORD } = process.env;
const kLARNA_API_URL = 'https://api.playground.klarna.com',
    kLARNA_USER_ID = '138f1881-aa59-4e34-bf7d-b715699712ff',
    kLARNA_PASSWORD = 'klarna_test_api_TE5mbSovZm1RPzlFQSFBNXg4MTI0N1BmTC96aiFBMkosMTM4ZjE4ODEtYWE1OS00ZTM0LWJmN2QtYjcxNTY5OTcxMmZmLDEsMU1KbGRub0p0R1JKWDN2RTlVZm9iQUZjY0NMTFMwdlNzSEQ5QUJkc0hTST0';


async function klarnaSession(req, res) {
    console.log(KLARNA_API_URL, "", KLARNA_USER_ID, "", KLARNA_PASSWORD);
    debugger;
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
            debugger;
            // console.log(error);
            if (axios.isAxiosError(error)) {
                const serverError = error;
                if (serverError && serverError.response) {
                    res.status(500).json({ error: serverError.response.data });
                } else {
                    res.status(500).json({ error: 'Axios error without response' });
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
