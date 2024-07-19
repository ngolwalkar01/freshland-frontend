import axios from '@/utils/axios';

const SHIPPING_API_BASE_URL = `/wp-json/wc/v1`;
const CART_API_BASE_URL = `/wp-json/fl-cart/v1/cart`;
const WOO_CART_API_BASE_URL = `/wp-json/wc/store/v1/cart`;

const getShippingMethods = async () => {
    try {
        const response = await axios.get(`${SHIPPING_API_BASE_URL}/shipping-methods?zone_id=1`);
        return response.data;
    } catch (error) {
        console.error('Error fetching products:');
        throw error;
    }
};

const createQueryParams = (country: string = "", state: string = "", postcode: string = "", city: string = "") => {
    let params = [];

    if (country) params.push(`country=${country}`);
    if (state) params.push(`state=${state}`);
    if (postcode) params.push(`postcode=${postcode}`);
    if (city) params.push(`city=${city}`);

    return params.length > 0 ? `?${params.join('&')}` : '';
}

const getShippingMethodsByAddress = async (country: string = "", state: string = "", postcode: string = "", city: string = "") => {
    try {
        const params = createQueryParams(country, state, postcode, city);
        const response = await axios.get(`${CART_API_BASE_URL}/shipping-methods${params}`,
            {
                withCredentials: true
            }
        );
        return response.data;
    } catch (error) {
        console.error('Error fetching products:');
        throw error;
    }
}

const setShippingMethod = async (rate_id: string = "", package_id: string = "") => {
    try {
        const response = await axios.post(`${WOO_CART_API_BASE_URL}/select-shipping-rate`,
            {
                rate_id,
                package_id
            },
            {
                withCredentials: true
            }
        );
        return response.data;
    } catch (error) {
        console.error('Error fetching products:');
        throw error;
    }
}

const ShippingAPI = {
    getShippingMethods,
    getShippingMethodsByAddress,
    setShippingMethod
};

export default ShippingAPI;