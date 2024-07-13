import { KlarnaSuccessApiResponse } from "@/interfaces/klarnaOrderDetail";
import axios from '@/utils/axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const CART_API_BASE_URL = `/wp-json/wc/store/v1/cart`;
const INTERNAL_API_BASE_URL = `/wp-json/fl-cart/v1/cart`;
const COUPON_CART_API_BASE_URL = `/wp-json/cocart/v3/cart`;
const CHECKOUT_API_BASE_URL = `/wp-json/wc/store/v1`;

const updateOrderKlarnaSession = async (order_id: string, session_id: string) => {
    try {
        const url = `${INTERNAL_API_BASE_URL}/klarna-update-order-session`;
        const response = await axios.post(url, {
            order_id,
            session_id
        }, {
            withCredentials: true
        });

        return response.data;
    } catch (error) {
        console.error('Error in getting updating order session :', error);
        throw error;
    }
}

const updateWooOrderSuccess = async (payload: KlarnaSuccessApiResponse) => {
    try {
        const url = `${INTERNAL_API_BASE_URL}/klarna-update-woo-order`;
        const response = await axios.post(url, payload);
        return response.data;
    } catch (error) {
        console.error('Error in getting updating order success :', error);
        throw error;
    }
}

const KlarnaAPI = {
    updateOrderKlarnaSession,
    updateWooOrderSuccess
};

export default KlarnaAPI;