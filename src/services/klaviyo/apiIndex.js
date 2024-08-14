import axios from '@/utils/axios';
const Klaviyo_API_BASE_URL = `/wp-json/klaviyo/v1`;

const createProfile = async (obj) => {
    try {
        const url = `${Klaviyo_API_BASE_URL}/profile-create`;
        const response = await axios.post(url, obj);
        return response.data;
    } catch (error) {
        console.error('Error in creating profile :', error);
        throw error;
    }
};

const linkProfileToList = async (obj) => {
    try {
        const url = `${Klaviyo_API_BASE_URL}/profile`;
        const response = await axios.post(url, obj);
        return response.data;
    } catch (error) {
        console.error('Error in linking profile with list :', error);
        throw error;
    }
};

const klaviyoTrackAPI = async (route, payload) => {
    try {
        const url = `${Klaviyo_API_BASE_URL}/${route}`;
        const response = await axios.post(url, payload);
        return response.data;
    } catch (error) {
        console.error('Error in creating profile :', error);
        throw error;
    }
}

const KlaviyoAPI = {
    linkProfileToList,
    createProfile,
    klaviyoTrackAPI
};

export default KlaviyoAPI;