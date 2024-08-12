import { AddToCartRequest } from "@/interfaces/addToCartRequest";
import { CustomerInfo } from "@/interfaces/customer";
import { OrderData } from "@/interfaces/orderData";
import { UserAddress } from "@/interfaces/userAddress";
import { AxiosRequestConfig } from "axios";
import axios from '@/utils/axios';
import getHeaders from "../helper/configureHeaders";

const CART_API_BASE_URL = `/wp-json/wc/store/v1/cart`;
const INTERNAL_API_BASE_URL = `/wp-json/fl-cart/v1/cart`;
const COUPON_CART_API_BASE_URL = `/wp-json/cocart/v3/cart`;
const CHECKOUT_API_BASE_URL = `/wp-json/wc/store/v1`;

const addProductToCart = async (token, id, quantity, subscription_scheme = "") => {
    try {
        const config = getHeaders(token);
        let obj = {
            id,
            quantity
        };

        if (subscription_scheme)
            obj = { ...obj, subscription_scheme }

        const url = `${CART_API_BASE_URL}/add-item`;
        const response = await axios.post(url, obj, config);
        return response.data;
    } catch (error) {
        console.error('Error in product add to cart :', error);
        throw error;
    }
};

const getCartItems = async (isExistCartKey = "") => {
    try {
        const url = `${CART_API_BASE_URL}/items${isExistCartKey ? `?cart_key=${isExistCartKey}` : ''}`;
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error('Error in fetching cart items :', error);
        throw error;
    }
};

const getCartDataFromServer = async (cookies) => {
    try {
        const response = await axios.get(CART_API_BASE_URL, {
            headers: {
                cookie: cookies
            },
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        console.error('Error in fetching cart items:', error);
        throw error;
    }
};

const getCartData = async (token) => {
    let config = getHeaders(token);

    try {
        const response = await axios.get(CART_API_BASE_URL, config);
        return response.data;
    } catch (error) {
        console.error('Error in fetching cart items :', error);
        throw error;
    }
};

const updateCartQuantity = async (token, key, quantity) => {
    let config = getHeaders(token);

    if (!(key && quantity)) return null;
    try {
        const url = `${CART_API_BASE_URL}/update-item`;
        const response = await axios.post(url, {
            key,
            quantity
        }, config);
        return response.data;
    } catch (error) {
        console.error('Error in updating cart item quantiity :', error);
        throw error;
    }
};

const removeItemFromCart = async (token, key) => {
    let config = getHeaders(token);
    if (!key) return null;
    try {
        const url = `${CART_API_BASE_URL}/remove-item`;
        const response = await axios.post(url, {
            key
        }, config);
        return response.data;
    } catch (error) {
        console.error('Error in removing cart item :', error);
        throw error;
    }
};

const addCouponCart = async (token, code) => {
    try {
        let config = getHeaders(token);
        const url = `${CART_API_BASE_URL}/apply-coupon`;
        const response = await axios.post(url, { code }, config);

        return response.data;
    } catch (error) {
        console.error('Error in applying coupon on cart item :', error);
        throw error;
    }
};

const removeCouponCart = async (token, code) => {
    try {
        let config = getHeaders(token);
        const url = `${CART_API_BASE_URL}/remove-coupon`;
        const response = await axios.post(url, { code }, config);

        return response.data;
    } catch (error) {
        console.error('Error in applying coupon on cart item :', error);
        throw error;
    }
};

const addShipping = async (token, cart_key, shipping_method) => {
    let config = getHeaders(token);
    if (!(shipping_method && cart_key)) return null;
    try {
        const url = `${COUPON_CART_API_BASE_URL}/add-shipping`;
        const response = await axios.post(url, { shipping_method, cart_key }, config);

        return response.data;
    } catch (error) {
        console.error('Error in adding shipping method on cart :', error);
        throw error;
    }
};

const setCustomerDetails = async (token, customerInfo, preventAuthRedirect) => {
    preventAuthRedirect = preventAuthRedirect || "";
    try {
        let config = getHeaders(token, preventAuthRedirect);
        const url = `${CART_API_BASE_URL}/update-customer`;
        const response = await axios.post(url, customerInfo, config);

        return response.data;
    } catch (error) {
        console.error('Error in placing order :', error);
        throw error;
    }
};

const createNewOrder = async (token, orderData) => {
    try {
        let config = getHeaders(token);
        const url = `${CHECKOUT_API_BASE_URL}/checkout`;
        const response = await axios.post(url, orderData, config);

        return response.data;
    } catch (error) {
        console.error('Error in placing order :', error);
        throw error;
    }
};

const updateCartSubscriptionFrequency = async (token, cart_item_key, subscription_scheme) => {
    try {
        let config = getHeaders(token);
        const url = `${INTERNAL_API_BASE_URL}/update-item-frequency`;
        const response = await axios.post(url, {
            cart_item_key,
            subscription_scheme
        }, config);

        return response.data;
    } catch (error) {
        console.error('Error in placing order :', error);
        throw error;
    }
}

const createQueryParams = (postcode, lang, localPickUp = false) => {
    let params = [];

    if (postcode) params.push(`postcode=${postcode}`);
    if (lang) params.push(`lang=${lang}`);
    if (localPickUp) params.push(`localPickUp=${localPickUp}`);

    return params.length > 0 ? `?${params.join('&')}` : '';
}

const getDeliveryDates = async (postcode, lang, localPickUp = false) => {
    try {
        const params = createQueryParams(postcode, lang, localPickUp);
        const url = `${CART_API_BASE_URL}/get_delivery_days${params}`;
        const response = await axios.post(url, {
            postcode,
            lang,
            localPickUp
        }, {
            withCredentials: true
        });

        return response.data;
    } catch (error) {
        console.error('Error in getting delivery dates :', error);
        throw error;
    }
}

const getSubscriptionOptions = async (token, product_id) => {
    try {
        let config = getHeaders(token);
        const url = `${INTERNAL_API_BASE_URL}/products/${product_id}/subscription-options`;
        const response = await axios.get(url, config);

        return response.data;
    } catch (error) {
        console.error('Error in getting subscription options :', error);
        throw error;
    }
}

const recoverUserCart = async (token, order_id, cart_key) => {
    try {
        let config = getHeaders(token);
        const url = `${INTERNAL_API_BASE_URL}/restore-cart`;
        const response = await axios.post(url, {
            order_id,
            session_id: cart_key
        }, config);

        return response.data;
    } catch (error) {
        console.error('Error in getting recover user cart :', error);
        throw error;
    }
}

const getUserAddresses = async (token) => {
    try {
        const config = {
            headers: {
                Authorization: token
            },
            withCredentials: true
        };

        const url = `${INTERNAL_API_BASE_URL}/multi-addresses`;
        const response = await axios.get(url, config);

        return response.data;
    } catch (error) {
        console.error('Error in getting recover user cart :', error);
        throw error;
    }
}

const setUserAddresses = async (token, index) => {
    try {
        const config = {
            headers: {
                Authorization: token
            },
            withCredentials: true
        };

        const url = `${INTERNAL_API_BASE_URL}/multi-addresses/set-main/${index}`;
        const response = await axios.post(url, {}, config);

        return response.data;
    } catch (error) {
        console.error('Error in getting recover user cart :', error);
        throw error;
    }
}

const saveUserAddresses = async (token, userAddresses) => {
    try {
        const config = {
            headers: {
                Authorization: token
            },
            withCredentials: true
        };

        const url = `${INTERNAL_API_BASE_URL}/add-multi-addresses`;
        const response = await axios.post(url, {
            addresses: userAddresses
        }, config);

        return response.data;
    } catch (error) {
        console.error('Error in getting recover user cart :', error);
        throw error;
    }
}

const getVipPageDataById = async (id) => {
    try {
        const response = await axios.get(`${INTERNAL_API_BASE_URL}/vip-page/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error in getting vip page data :', error);
        throw error;
    }
}

const checkZipCode = async (postalcode) => {
    try {
        const response = await axios.post(`${INTERNAL_API_BASE_URL}/check-zip`, {
            postalcode
        });
        return response.data;
    } catch (error) {
        console.error('Error in checking zip code:', error);
        throw error;
    }
}

const CartAPI = {
    addProductToCart,
    getCartItems,
    getCartData,
    updateCartQuantity,
    removeItemFromCart,
    addCouponCart,
    removeCouponCart,
    addShipping,
    createNewOrder,
    getCartDataFromServer,
    setCustomerDetails,
    updateCartSubscriptionFrequency,
    getDeliveryDates,
    getSubscriptionOptions,
    recoverUserCart,
    getUserAddresses,
    setUserAddresses,
    saveUserAddresses,
    getVipPageDataById,
    checkZipCode
};

export default CartAPI;