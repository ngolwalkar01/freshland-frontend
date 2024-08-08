import paymentService from '@/services/payment'
import { toast } from 'react-toastify';
import { serviceTranslation } from '@/locales';
const lang = process.env.NEXT_PUBLIC_LANG || 'se';
const toastTimer = parseInt(process.env.NEXT_PUBLIC_TOAST_TIMER);
const service = serviceTranslation[lang];

export const getpaymentMethods = async () => {
    try {
        const paymentData = await paymentService.getPaymentGateways();
        return paymentData;
    } catch (error) {
        toast.error(service.fetchPaymentMethodsIssue, { autoClose: toastTimer });
    }
};