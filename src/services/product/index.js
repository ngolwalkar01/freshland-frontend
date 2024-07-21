import axios from '@/utils/axios';

// const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const PRODUCT_API_BASE_URL = `/wp-json/wc/v1`;
const ACCOUNT_API_BASE_URL = `/wp-json/fl-cart/v1/cart`;

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

const getRelatedProducts = async (productId) => {
    try {
        const response = await axios.get(`${PRODUCT_API_BASE_URL}/products-orderby?order_by=menu_order&per_page=4`);
        return response.data;
    } catch (error) {
        console.error('Error fetching seasonal products:', error);
        throw error;
    }
};

const getProductDetail = async (productId) => {
    try {
        const response = await axios.get(`${PRODUCT_API_BASE_URL}/product/${productId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching seasonal products:', error);
        throw error;
    }
};

const getCategories = async () => {
    try {
        const response = await axios.get(`${ACCOUNT_API_BASE_URL}/get-product-categories`);
        return response.data;
    } catch (error) {
        console.error('Error fetching categories:', error);
        throw error;
    }
};

const getSearchedProducts = async (searchTxt) => {
    try {
        const response = await axios.get(`${ACCOUNT_API_BASE_URL}/search-products?search=${searchTxt}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching products by search:', error);
        throw error;
    }
};

const getProductsByCategory = async (category) => {
    try {
        const response = await axios.get(`${ACCOUNT_API_BASE_URL}/products-by-category?category=${category}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching products by search:', error);
        throw error;
    }
};

const getFavoritesProducts = async () => {
    try {
        const response = await axios.get(`${ACCOUNT_API_BASE_URL}/favorites`);
        return response.data;
    } catch (error) {
        console.error('Error fetching products by search:', error);
        throw error;
    }
};

const setProductFavorite = async (product_id) => {
    try {
        const response = await axios.post(`${ACCOUNT_API_BASE_URL}/favorite-product`, {
            product_id
        });
        return response.data;
    } catch (error) {
        console.error('Error setting favorite product:', error);
        throw error;
    }
};

const ProductAPI = {
    getProducts,
    getSessionalProducts,
    getProductDetail,
    getRelatedProducts,
    getCategories,
    getSearchedProducts,
    getProductsByCategory,
    getFavoritesProducts,
    setProductFavorite
};

export default ProductAPI;