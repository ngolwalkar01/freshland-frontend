import { toast } from 'react-toastify';
import cookieService from '@/services/cookie';
import { removeLocalStorage } from '@/services/local-storage';

const toastTimer = parseInt(process.env.NEXT_PUBLIC_TOAST_TIMER);

export const retryCall = async (method, parameters, errorMessage = "", count = 0) => {
    try {
        const token = localStorage.getItem("token");
        parameters = [token, ...parameters];
        const result = await method(...parameters);
        return result;
    } catch (error) {
        if (error?.response?.status === 403 && count < 1) {
            removeLocalStorage("userId", false);
            removeLocalStorage("token", false);
            cookieService.removeCookie("userId");
            cookieService.removeCookie("token");

            return retryCall(method, parameters, count + 1);
        } else {
            toast.error(errorMessage ? errorMessage : "Something went wrong", { autoClose: toastTimer });
        }
    }
};