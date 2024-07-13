import shippingService from '@/services/shipping'
import { toast } from 'react-toastify';
import { getCartData } from '../cart'

const toastTimer = parseInt(process.env.NEXT_PUBLIC_TOAST_TIMER);

export const getShippingMethodsByAddress = async (country = "", state = "", postcode = "", city = "") => {
    try {
        const shippingData = await shippingService.getShippingMethodsByAddress(country, state, postcode, city);
        return shippingData;
    } catch (error) {
        toast.error("There was an issue in fetching Shipping information. Please try again.", { autoClose: toastTimer });
    }
};

export const setShippingMethod = async (shipping_method = "", package_id = "") => {
    try {
        const shippingData = await shippingService.setShippingMethod(shipping_method, package_id);
        return getCartData();
    } catch (error) {
        toast.error("There was an issue in setting Shipping method. Please try again.", { autoClose: toastTimer });
    }
};