import axios from '@/utils/axios';

const PRODUCT_API_BASE_URL = `/wp-json/wc/v1/categories-products`;
const ACCOUNT_API_BASE_URL = `/wp-json/fl-cart/v1/cart`;

const getCategoriesWithProducts = async () => {
    try {
        const response = await axios.get(PRODUCT_API_BASE_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching products:');
        throw error;
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