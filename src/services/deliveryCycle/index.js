import axios from '@/utils/axios';

const DELIVERY_CYCLE_API_BASE_URL = `/wp-json/wc/v1`;

const getcuttoffday = async () => {
    try {
        const response = await axios.get(`${DELIVERY_CYCLE_API_BASE_URL}/getcuttoffday`);
        return response.data;
    } catch (error) {
        console.error('Error fetching products:');
        throw error;
    }
};

const DeliveryCycleAPI = {
    getcuttoffday
};

export default DeliveryCycleAPI;