import { CustomerData } from "@/interfaces/customerDataPass";
import axios from '@/utils/axios';

// const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const ACCOUNT_API_BASE_URL = `/wp-json/fl-cart/v1/cart`;
const ACCOUNT_API_BASE_URL_wOO = `/wp-json/wc/store/v1`;

const getOrders = async (token) => {
    try {
        const config = {
            headers: {
                Authorization: token
            }
        };
        const response = await axios.get(`${ACCOUNT_API_BASE_URL}/customer_orders`, config);
        console.log(JSON.stringify(response.data));
        return response.data;
    } catch (error) {
        console.error('Error fetching orders:');
        throw error;
    }
};

const getOrdersById = async (id, token) => {
    try {
        const config = {
            headers: {
                Authorization: token
            }
        };
        const response = await axios.get(`${ACCOUNT_API_BASE_URL}/order/${id}`, config);
        return response.data;
    } catch (error) {
        console.error('Error fetching order:');
        throw error;
    }
};

const getCheckoutOrderById = async (id, token) => {
    try {
        const config = {
            headers: {
                Authorization: token
            }
        };
        const response = await axios.get(`${ACCOUNT_API_BASE_URL_wOO}/order/${id}`, config);
        return response.data;
    } catch (error) {
        console.error('Error fetching order:');
        throw error;
    }
};

const getOrderDates = async (id, token) => {
    try {
        const config = {
            headers: {
                Authorization: token
            }
        };
        const response = await axios.get(`${ACCOUNT_API_BASE_URL}/get-order-dates/${id}`, config);
        return response.data;
    } catch (error) {
        console.error('Error fetching order:');
        throw error;
    }
};

const getCustomerAddresses = async (token) => {
    try {
        const config = {
            headers: {
                Authorization: token
            }
        };
        const response = await axios.get(`${ACCOUNT_API_BASE_URL}/customer-addresses`, config);
        return response.data;
    } catch (error) {
        console.error('Error fetching orders:');
        throw error;
    }
};

const getCustomerProfile = async (token) => {
    try {
        const config = {
            headers: {
                Authorization: token
            }
        };
        const response = await axios.get(`${ACCOUNT_API_BASE_URL}/customer-profile`, config);
        return response.data;
    } catch (error) {
        console.error('Error fetching orders:');
        throw error;
    }
};

const saveUpdateCustomerAddress = async (token, customerData) => {
    const config = {
        headers: {
            Authorization: token
        },
        // withCredentials: true
    };

    const url = `${ACCOUNT_API_BASE_URL}/customer-profile`;
    const response = await axios.post(url, customerData, config);

    return response.data;
}

const downloadInvoiceByOrderId = async (orderId, token) => {
    try {
        const config = {
            headers: {
                Authorization: token
            }
        };
        const response = await axios.get(`${ACCOUNT_API_BASE_URL}/download-invoice/${orderId}`, config);
        return response.data;
    } catch (error) {
        console.error('Error fetching invoice:');
        throw error;
    }
};

const AccountAPI = {
    getOrders,
    getOrdersById,
    getCustomerAddresses,
    getCustomerProfile,
    saveUpdateCustomerAddress,
    getCheckoutOrderById,
    downloadInvoiceByOrderId,
    getOrderDates
};

export default AccountAPI;
