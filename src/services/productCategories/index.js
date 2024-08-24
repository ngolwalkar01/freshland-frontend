import axios from '@/utils/axios';

const PRODUCT_API_BASE_URL = `/wp-json/wc/v1/categories-products`;
const ACCOUNT_API_BASE_URL = `/wp-json/fl-cart/v1/cart`;

let cachedData = null;
let isFetching = false;

const getCategoriesWithProducts = async () => {
    // Return the cached data immediately
    if (cachedData) {
        return cachedData;
    }

    // Prevent multiple fetches if already fetching
    if (isFetching) return cachedData;

    isFetching = true;

    try {
        const response = await axios.get(PRODUCT_API_BASE_URL);
        const newData = response.data;

        // Compare the new data with the cached data
        if (JSON.stringify(newData) !== JSON.stringify(cachedData)) {
            cachedData = newData; // Update the cache if data has changed
        }

        return cachedData;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    } finally {
        isFetching = false;
    }
};

const getCategories = async () => {
    try {
        const response = await axios.get(`${ACCOUNT_API_BASE_URL}/get-product-categories-names`);
        return response.data;
    } catch (error) {
        console.error('Error fetching categories:');
        throw error;
    }
};

const ProductCategoriesAPI = {
    getCategoriesWithProducts,
    getCategories
};

export default ProductCategoriesAPI;