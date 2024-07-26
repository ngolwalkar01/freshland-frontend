import axios from '@/utils/axios';
const Klaviyo_API_BASE_URL = `/wp-json/klaviyo/v1/profile`;

const linkProfileToList = async (obj) => {
    try {
        const url = `${Klaviyo_API_BASE_URL}`;
        const response = await axios.post(url, obj);
        return response.data;
    } catch (error) {
        console.error('Error in linking profile with list :', error);
        throw error;
    }
};

const KlaviyoAPI = {
    linkProfileToList
};

export default KlaviyoAPI;