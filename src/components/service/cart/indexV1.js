import cartService from '@/services/cart'
import { toast } from 'react-toastify';
import cookieService from '@/services/cookie';
import { setLocalStorage, removeLocalStorage } from '@/services/local-storage';

const cartCookieKey = process.env.NEXT_PUBLIC_CART_COOKIE;
const cartDataStorage = process.env.NEXT_PUBLIC_CART_STORAGE;
const toastTimer = parseInt(process.env.NEXT_PUBLIC_TOAST_TIMER);

const updateCartData = (cartData) => {
    setLocalStorage(cartDataStorage, cartData);
}

export const getCartData = async () => {
    try {
        const cartKey = cookieService.getCookie(cartCookieKey);
        const cartData = await cartService.getCartData(cartKey);
        updateCartData(cartData);
        return cartData;
    } catch (error) {
        toast.error("There was an issue in fetching cart data. Please try again.", { autoClose: toastTimer });
    }
};

export const addToCart = async (productId, quantity = "1") => {
    try {
        const isExistCartKey = cookieService.getCookie(cartCookieKey);
        const productAddedToCart = await cartService.addProductToCart(productId, quantity, isExistCartKey);
        const { cart_key } = productAddedToCart;
        const expires = parseInt(process.env.NEXT_PUBLIC_CART_KEY_EXPIRY);
        cookieService.setCookie(cartCookieKey, cart_key, expires);
        toast.success("Product has been successfully added to your cart.", { autoClose: toastTimer });
        await getCartData(cart_key);
        return productAddedToCart;
    } catch (error) {
        toast.error("There was an issue adding the product to your cart. Please try again.", { autoClose: toastTimer });
    }
};

export const updateCartQuantity = async (itemKey, quantity) => {
    try {
        const cartKey = cookieService.getCookie(cartCookieKey);
        await cartService.updateCartQuantity(cartKey, itemKey, quantity);
        return await getCartData();
    } catch (error) {
        toast.error("There was an issue in updating quantity. Please try again.", { autoClose: toastTimer });
    }
};

export const removeCartItem = async (itemKey) => {
    try {
        const cartKey = cookieService.getCookie(cartCookieKey);
        await cartService.removeItemFromCart(cartKey, itemKey);
        return await getCartData(cartKey);
    } catch (error) {
        toast.error("There was an issue removing the product from your cart. Please try again.", { autoClose: toastTimer });
    }
};

export const addCouponCart = async (coupon_code) => {
    try {
        const cartKey = cookieService.getCookie(cartCookieKey);
        await cartService.addCouponCart(cartKey, coupon_code);
        return await getCartData(cartKey);
    } catch (error) {
        toast.error("There was an issue in applying coupon on cart item. Please try again.", { autoClose: toastTimer });
    }
};

export const removeCouponCart = async (coupon_code) => {
    try {
        const cartKey = cookieService.getCookie(cartCookieKey);
        await cartService.removeCouponCart(cartKey, coupon_code);
        return await getCartData(cartKey);
    } catch (error) {
        toast.error("There was an issue in applying coupon on cart item. Please try again.", { autoClose: toastTimer });
    }
};

export const addShippingCart = async (shipping_method) => {
    try {
        const cartKey = cookieService.getCookie(cartCookieKey);
        await cartService.addShipping(cartKey, shipping_method);
        return await getCartData(cartKey);
    } catch (error) {
        toast.error("There was an issue in applying coupon on cart item. Please try again.", { autoClose: toastTimer });
    }
};

export const createNewOrder = async (shipping_method) => {
    try {
        const cartKey = cookieService.getCookie(cartCookieKey);
        const orderData = {...shipping_method, cart_key: cartKey}
        await cartService.createNewOrder(orderData);
        removeLocalStorage(cartDataStorage);
        cookieService.removeCookie(cartCookieKey);
        toast.success("Your order has been placed.", { autoClose: toastTimer });
    } catch (error) {
        toast.error("There was an issue in applying coupon on cart item. Please try again.", { autoClose: toastTimer });
    }
};