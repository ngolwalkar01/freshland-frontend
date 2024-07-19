import axios from '@/utils/axios';

const PAYMENT_API_BASE_URL = `/wp-json/fl-cart/v1/cart`;

const getPaymentGateways = async () => {
    try {
        const response = await axios.get(`${PAYMENT_API_BASE_URL}/payment-gateways`,
            {
                withCredentials: true
            }
        );
        return response.data;
    } catch (error) {
        console.error('Error fetching payment gateways:');
        throw error;
    }
};

const PaymentAPI = {
    getPaymentGateways
};

export default PaymentAPI;