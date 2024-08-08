import { toast } from 'react-toastify';
import AccountAPI from '@/services/account';
import { serviceTranslation } from '@/locales';
const lang = process.env.NEXT_PUBLIC_LANG || 'se';
const toastTimer = parseInt(process.env.NEXT_PUBLIC_TOAST_TIMER);
const service = serviceTranslation[lang];

export const getOrderDates = async (orderid) => {
    try {
        const token = localStorage.getItem("token");
        const orderDetail = await AccountAPI.getOrderDates(orderid, token);
        return orderDetail;
    } catch (error) {
        toast.error(service.fetchOrderDateIssue, { autoClose: toastTimer });
    }
}

export const getOrderDetailById = async (orderid) => {
    try {
        const token = localStorage.getItem("token");
        const orderDetail = await AccountAPI.getOrderDetailById(orderid, token);
        return orderDetail;
    } catch (error) {
        toast.error(service.fetchOrderDetailIssue, { autoClose: toastTimer });
    }
};

export const getCheckoutOrderById = async (orderid) => {
    try {
        const token = localStorage.getItem("token");
        const orderDetail = await AccountAPI.getCheckoutOrderById(orderid, token);
        return orderDetail;
    } catch (error) {
        toast.error(service.fetchOrderDetailIssue, { autoClose: toastTimer });
    }
};