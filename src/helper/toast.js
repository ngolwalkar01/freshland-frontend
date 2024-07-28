import { toast } from 'react-toastify';
const toastTimer = parseInt(process.env.NEXT_PUBLIC_TOAST_TIMER);

const success = (msg) => {
    toast.success(msg, { autoClose: toastTimer });
}

const error = (msg) => {
    toast.success(msg, { autoClose: toastTimer });
}

const toastNotifications = {
    success,
    error,
};

export default toastNotifications;