import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const SHIPPING_API_BASE_URL = `${API_BASE_URL}/wp-json/wc/v1`;

const getVipPages = async (per_page = 3) => {
    try {
        const response = await axios.get(`${SHIPPING_API_BASE_URL}/vip-pages?per_page=${per_page}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching products:');
        throw error;
    }
};

const VipPagesAPI = {
    getVipPages
};

export default VipPagesAPI;