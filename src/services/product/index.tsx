import axios from '@/utils/axios';

// const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const PRODUCT_API_BASE_URL = `/wp-json/wc/v1`;

const getProducts = async () => {
    try {
        const response = await axios.get(`${PRODUCT_API_BASE_URL}/products-orderby`);
        return response.data;
    } catch (error) {
        console.error('Error fetching products:');
        throw error;
    }
};

const getSessionalProducts = async (orderBy = 'menu_order', perPage = 3) => {
    try {
        const response = await axios.get(`${PRODUCT_API_BASE_URL}/products-orderby?order_by=${orderBy}&per_page=${perPage}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching seasonal products:', error);
        throw error;
    }
};

const getRelatedProducts = async (productId: number) => {
    try {
        const response = await axios.get(`${PRODUCT_API_BASE_URL}/products-orderby?order_by=menu_order&per_page=4`);
        return response.data;
    } catch (error) {
        console.error('Error fetching seasonal products:', error);
        throw error;
    }
};

const getProductDetail = async (productId: number) => {
    try {
        const response = await axios.get(`${PRODUCT_API_BASE_URL}/product/${productId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching seasonal products:', error);
        throw error;
    }
};

const ProductAPI = {
    getProducts,
    getSessionalProducts,
    getProductDetail,
    getRelatedProducts
};

export default ProductAPI;