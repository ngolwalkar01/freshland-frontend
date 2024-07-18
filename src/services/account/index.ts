import { CustomerData } from "@/interfaces/customerDataPass";
import axios from "axios";
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const ACCOUNT_API_BASE_URL = `${API_BASE_URL}/wp-json/fl-cart/v1/cart`;

const getOrders = async (token: string) => {
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

const getOrdersById = async (id: string, token: string) => {
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

const getCheckoutOrderById = async (id: string, token: string) => {
    try {
        const config = {
            headers: {
                Authorization: token
            }
        };
        const response = await axios.get(`${ACCOUNT_API_BASE_URL}/order-confirmation/${id}`, config);
        return response.data;
    } catch (error) {
        console.error('Error fetching order:');
        throw error;
    }
};

const getCustomerAddresses = async (token: string) => {
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

const getCustomerProfile = async (token: string) => {
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

const saveUpdateCustomerAddress = async (token: string, customerData: CustomerData) => {
    const config = {
        headers: {
            Authorization: token
        },
        withCredentials: true
    };

    const url = `${ACCOUNT_API_BASE_URL}/customer-profile`;
    const response = await axios.post(url, customerData, config);

    return response.data;
}

const downloadInvoiceByOrderId = async (orderId: string, token: string) => {
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
    downloadInvoiceByOrderId
};

export default AccountAPI;
