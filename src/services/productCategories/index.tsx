import axios from '@/utils/axios';

const PRODUCT_API_BASE_URL = `/wp-json/wc/v1/categories-products`;

const getCategoriesWithProducts = async () => {
    try {
        const response = await axios.get(PRODUCT_API_BASE_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching products:');
        throw error;
    }
};

const ProductCategoriesAPI = {
    getCategoriesWithProducts
};

export default ProductCategoriesAPI;