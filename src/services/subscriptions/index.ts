import axios from '@/utils/axios';

import { SubscriptionModification } from '@/interfaces/addProductToSubscription'

const SUBSCRIPTION_API_BASE_URL = `/wp-json/wc/v3`;

const SUBCRIPTION_DATE_API = `/wp-json/fl-cart/v1/cart`;

const getSubscriptions = async (userId: string, token: string) => {
    const config = {
        headers: {
            Authorization: token
        }
    };
    try {
        const response = await axios.get(`${SUBSCRIPTION_API_BASE_URL}/subscriptions?customer=${userId}`, config);
        return response.data;
    } catch (error) {
        console.error('Error fetching subscriptions:');
        throw error;
    }
};

const getSubscriptionById = async (id: string, token: string) => {
    const config = {
        headers: {
            Authorization: token
        }
    };
    try {
        const response = await axios.get(`${SUBSCRIPTION_API_BASE_URL}/subscriptions/${id}`, config);
        return response.data;
    } catch (error) {
        console.error('Error fetching subscription by id:');
        throw error;
    }
};

const getNextDeliveryDate = async (selected_date: string, token: string) => {
    const config = {
        headers: {
            Authorization: token
        }
    };
    const payload = {
        type: 'get_delivery_date',
        selected_date
    }
    try {
        const response = await axios.post(`${SUBCRIPTION_DATE_API}/update-subscription`, payload, config);
        return response.data;
    } catch (error) {
        console.error('Error fetching subscription by id:');
        throw error;
    }
}

const setDeliveryDate = async (sub_id: string, selected_date: string, delivery_date: string, token: string) => {
    const config = {
        headers: {
            Authorization: token
        }
    };
    const payload = {
        type: 'set_delivery_date',
        selected_date,
        delivery_date,
        sub_id
    }
    try {
        const response = await axios.post(`${SUBCRIPTION_DATE_API}/update-subscription`, payload, config);
        return response.data;
    } catch (error) {
        console.error('Error fetching subscription by id:');
        throw error;
    }
}

const skipNextDeliveryDate = async (sub_id: string, token: string) => {
    const config = {
        headers: {
            Authorization: token
        }
    };
    const payload = {
        type: 'set_to_on-hold',
        sub_id
    }
    try {
        const response = await axios.post(`${SUBCRIPTION_DATE_API}/update-subscription`, payload, config);
        return response.data;
    } catch (error) {
        console.error('Error fetching subscription by id:');
        throw error;
    }
}

const getOrdersBySubscriptionId = async (sub_id: string, token: string) => {
    const config = {
        headers: {
            Authorization: token
        }
    };
    try {
        const url = `${SUBSCRIPTION_API_BASE_URL}/subscriptions/${sub_id}/orders`;
        const response = await axios.get(url, config);
        return response.data;
    } catch (error) {
        console.error('Error fetching orders subscription id:');
        throw error;
    }
}

const getNewPRoductsBySubscription = async (id: string) => {
    try {
        const url = `${SUBCRIPTION_DATE_API}/similar-products?subscription_id=352`;
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error('Error fetching new products by subscription id:');
        throw error;
    }
}

const addPRoductTosubscription = async (model: SubscriptionModification, token: string) => {
    const config = {
        headers: {
            Authorization: token
        }
    };
    try {
        const url = `${SUBCRIPTION_DATE_API}/add-product-to-subscription`;
        const response = await axios.post(url, model, config);
        return response.data;
    } catch (error) {
        console.error('Error fetching new products by subscription id:');
        throw error;
    }
}

const SubscriptionAPI = {
    getSubscriptions,
    getSubscriptionById,
    getNextDeliveryDate,
    skipNextDeliveryDate,
    setDeliveryDate,
    getOrdersBySubscriptionId,
    getNewPRoductsBySubscription,
    addPRoductTosubscription
};

export default SubscriptionAPI;