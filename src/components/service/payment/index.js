import paymentService from '@/services/payment'
import { toast } from 'react-toastify';

const toastTimer = parseInt(process.env.NEXT_PUBLIC_TOAST_TIMER);

export const getpaymentMethods = async () => {
    try {
        const paymentData = await paymentService.getPaymentGateways();
        return paymentData;
    } catch (error) {
        toast.error("There was an issue in fetching payment methods. Please try again.", { autoClose: toastTimer });
    }
};