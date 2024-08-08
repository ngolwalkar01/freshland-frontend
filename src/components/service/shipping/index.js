import shippingService from '@/services/shipping'
import { toast } from 'react-toastify';
import { getCartData } from '../cart'
import { serviceTranslation } from '@/locales';
const lang = process.env.NEXT_PUBLIC_LANG || 'se';
const toastTimer = parseInt(process.env.NEXT_PUBLIC_TOAST_TIMER);
const service = serviceTranslation[lang];
export const getShippingMethodsByAddress = async (country = "", state = "", postcode = "", city = "") => {
    try {
        const shippingData = await shippingService.getShippingMethodsByAddress(country, state, postcode, city);
        return shippingData;
    } catch (error) {
        toast.error(service.fetchShippingInfoIssue, { autoClose: toastTimer });
    }
};

export const setShippingMethod = async (shipping_method = "", package_id = "") => {
    try {
        const shippingData = await shippingService.setShippingMethod(shipping_method, package_id);
        return getCartData();
    } catch (error) {
        toast.error(service.setShippingMethodIssue, { autoClose: toastTimer });
    }
};