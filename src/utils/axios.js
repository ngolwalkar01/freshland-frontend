import axios from 'axios';
import Router from 'next/router';
import cookieService from '@/services/cookie';

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL
});

axiosInstance.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    const cartToken = localStorage.getItem('cart-token');
    const nonce = localStorage.getItem('nonce');

    if (token) {
        config.headers.Authorization = token;
    }
    if (cartToken) {
        config.headers['Cart-Token'] = cartToken;
    }
    if (nonce) {
        config.headers['Nonce'] = nonce;
    }

    return config;
}, error => {
    return Promise.reject(createAxiosErrorResponse(error));
});

axiosInstance.interceptors.response.use(response => {
    setCartTokenNonce(response);
    return response;
}, error => {
    if (error.response) {
        handleErrorResponse(error.response);
    }
    return Promise.reject(createAxiosErrorResponse(error));
});

function setCartTokenNonce(response) {
    if (response.headers['cart-token'] && !localStorage.getItem('cart-token')) {
        localStorage.setItem('cart-token', response.headers['cart-token']);
    }
    if (response.headers['nonce'] && !localStorage.getItem('nonce')) {
        localStorage.setItem('nonce', response.headers['nonce']);
    }
}

function handleErrorResponse(response) {
    if (response.status === 401 || response.status === 403) {
        clearAuthData();
        // Router.push('/login');
        window.location.href = "/login";
    }
}

function clearAuthData() {
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    cookieService.removeCookie("userId");
    cookieService.removeCookie("token");
}

function createAxiosErrorResponse(error) {
    return {
        message: error.message,
        status: error.response ? error.response.status : null,
        data: error.response ? error.response.data : null
    };
}

export default axiosInstance;
