import { NextApiRequest, NextApiResponse } from 'next';
import axios, { AxiosError } from 'axios';

const { kLARNA_API_URL, kLARNA_USER_ID, kLARNA_PASSWORD } = process.env;
async function KlanaSession(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { totalAmount, currency, locale } = req.body as { totalAmount: number; currency: string; locale: string };

        try {
            const token = `Basic ${Buffer.from(kLARNA_USER_ID + ':' + kLARNA_PASSWORD).toString('base64')}`;
            console.log("token : ", token);
            const response = await axios.post(`${kLARNA_API_URL}/payments/v1/sessions`, req.body, {
                headers: {
                    'Authorization': token,
                    'Content-Type': 'application/json'
                }
            });

            res.status(200).json({ client_token: response.data.client_token, session_id: response.data.session_id });
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const serverError = error as AxiosError;
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
};

export default KlanaSession;