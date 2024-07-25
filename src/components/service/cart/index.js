import cartService from "@/services/cart";
import shippingService from "@/services/shipping";
import { toast } from "react-toastify";
import cookieService from "@/services/cookie";
import {
  setLocalStorage,
  removeLocalStorage,
  getLocalStorage,
} from "@/services/local-storage";
import { retryCall } from "../retry";

const cartCookieKey = process.env.NEXT_PUBLIC_CART_COOKIE;
const cartDataStorage = process.env.NEXT_PUBLIC_CART_STORAGE;
const toastTimer = parseInt(process.env.NEXT_PUBLIC_TOAST_TIMER);

export const checkTokenExists = (cartData) => {
  return localStorage.getItem('token') && localStorage.getItem('userId');
};

export const updateCartData = (cartData) => {
  setLocalStorage(cartDataStorage, cartData);
};

export const getCartKey = () => {
  let cartKey;
  try {
    const cartData = JSON.parse(localStorage.getItem('cartDataStorage'));

    if (cartData && cartData.extensions && cartData.extensions.delivery && cartData.extensions.delivery.length > 0) {
      cartKey = cartData.extensions.delivery[0].cart_key;
    }
  } catch (error) {
    console.log(error)
  }
  if (cartKey) {
    removeLocalStorage('temp_cart_key');
  } else {
    cartKey = localStorage.getItem('temp_cart_key');
  }

  return cartKey;
}

const storeTempState = () => {
  const cartKey = getCartKey();
  if (cartKey) {
    localStorage.setItem('temp_cart_key', cartKey);
  }
}

export const getCartData = async () => {
  try {
    const errorMessage =
      "There was an issue in fetching cart data. Please try again.";
    const cartData = await retryCall(cartService.getCartData, [], errorMessage);
    updateCartData(cartData);
    return cartData;
  } catch (error) {
    throw error;
  }
};

export const addToCart = async (
  productId,
  quantity = "1",
  subscription_scheme = ""
) => {
  try {
    const errorMessage =
      "There was an issue adding the product to your cart. Please try again.";
    const productAddedToCart = await retryCall(
      cartService.addProductToCart,
      [productId, quantity, subscription_scheme],
      errorMessage
    );
    toast.success("Product has been successfully added to your cart.", {
      autoClose: toastTimer,
    });
    updateCartData(productAddedToCart);
    return productAddedToCart;
  } catch (error) {
    throw error;
  }
};

export const updateCartQuantity = async (itemKey, quantity) => {
  try {
    const errorMessage =
      "There was an issue in updating quantity. Please try again.";
    const data = await retryCall(
      cartService.updateCartQuantity,
      [itemKey, quantity],
      errorMessage
    );
    updateCartData(data);
    return data;
  } catch (error) {
    throw error;
  }
};

export const removeCartItem = async (itemKey) => {
  const errorMessage =
    "There was an issue removing the product from your cart. Please try again.";
  const data = await retryCall(
    cartService.removeItemFromCart,
    [itemKey],
    errorMessage
  );
  updateCartData(data);
  return data;
};

export const addCouponCart = async (coupon_code) => {
  const errorMessage =
    "There was an issue in applying coupon on cart item. Please try again.";
  const data = await retryCall(
    cartService.addCouponCart,
    [coupon_code],
    errorMessage
  );
  updateCartData(data);
  return data;
};

export const removeCouponCart = async (coupon_code) => {
  const errorMessage =
    "There was an issue in applying coupon on cart item. Please try again.";
  const data = await retryCall(
    cartService.removeCouponCart,
    [coupon_code],
    errorMessage
  );
  updateCartData(data);
  return data;
};

export const addShippingCart = async (shipping_method) => {
  const cartKey = cookieService.getCookie(cartCookieKey);
  const errorMessage =
    "There was an issue in applying coupon on cart item. Please try again.";
  await retryCall(
    cartService.addShipping,
    [cartKey, shipping_method],
    errorMessage
  );
  return await getCartData();
};

export const createNewOrder = async (orderData) => {
  const errorMessage =
    "There was an issue in applying coupon on cart item. Please try again.";
  const data = await retryCall(
    cartService.createNewOrder,
    [orderData],
    errorMessage
  );
  storeTempState();
  removeLocalStorage(cartDataStorage);
  toast.success("Your order is in process.", { autoClose: toastTimer });
  return data;
};

export const updateCartSubscriptionFrequency = async (
  cart_item_key,
  subscription_scheme
) => {
  const errorMessage =
    "There was an issue in updating cart subscription frequency. Please try again.";
  await retryCall(
    cartService.updateCartSubscriptionFrequency,
    [cart_item_key, subscription_scheme],
    errorMessage
  );
  return getCartData();
};

export const setCustomerDetails = async (customerInfo, stopRedirectToLogin) => {
  stopRedirectToLogin = stopRedirectToLogin || "";
  const errorMessage =
    "There was an issue in saving customer detail. Please try again.";
  const data = await retryCall(
    cartService.setCustomerDetails,
    [customerInfo, stopRedirectToLogin],
    errorMessage
  );
  updateCartData(data);
  return data;
};

export const getSubscriptionOptions = async (product_id) => {
  const errorMessage =
    "There was an issue in fetching subscription detail. Please try again.";
  return await retryCall(
    cartService.getSubscriptionOptions,
    [product_id],
    errorMessage
  );
};

export const recoverUserCart = async (order_id, cart_key) => {
  const errorMessage =
    "There was an issue in fetching recover user cart. Please try again.";
  await retryCall(
    cartService.recoverUserCart,
    [order_id, cart_key],
    errorMessage
  );
  return await getCartData();
};

export const getUserAddresses = async () => {
  try {
    const token = localStorage.getItem("token");
    if (token) {
      return await cartService.getUserAddresses(token);
    }
    return [];
  } catch (error) {
    toast.error(
      "There was an issue in fetching recover user cart. Please try again.",
      { autoClose: toastTimer }
    );
  }
};

export const setUserAddressesAsync = async (index) => {
  try {
    const token = localStorage.getItem("token");
    if (token) {
      return await cartService.setUserAddresses(token, index);
    }
    return [];
  } catch (error) {
    toast.error(
      "There was an issue in fetching recover user cart. Please try again.",
      { autoClose: toastTimer }
    );
  }
};

export const saveUserAddresses = async (userAdds) => {
  try {
    const token = localStorage.getItem("token");
    if (token) {
      return await cartService.saveUserAddresses(token, userAdds);
    }
    return [];
  } catch (error) {
    toast.error(
      "There was an issue in fetching recover user cart. Please try again.",
      { autoClose: toastTimer }
    );
    throw error;
  }
};
