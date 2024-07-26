import { toast } from 'react-toastify';
import AccountAPI from '@/services/account';

const toastTimer = parseInt(process.env.NEXT_PUBLIC_TOAST_TIMER);

export const getOrderDates = async (orderid) => {
    try {
        const token = localStorage.getItem("token");
        const orderDetail = await AccountAPI.getOrderDates(orderid, token);
        return orderDetail;
    } catch (error) {
        toast.error("There was an issue in fetching order date detail data. Please try again.", { autoClose: toastTimer });
    }
}

export const getOrderDetailById = async (orderid) => {
    try {
        const token = localStorage.getItem("token");
        const orderDetail = await AccountAPI.getOrderDetailById(orderid, token);
        return orderDetail;
    } catch (error) {
        toast.error("There was an issue in fetching order detail data. Please try again.", { autoClose: toastTimer });
    }
};

export const getCheckoutOrderById = async (orderid) => {
    try {
        const token = localStorage.getItem("token");
        const orderDetail = await AccountAPI.getCheckoutOrderById(orderid, token);
        return orderDetail;
    } catch (error) {
        toast.error("There was an issue in fetching order detail data. Please try again.", { autoClose: toastTimer });
    }
};