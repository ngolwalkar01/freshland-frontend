import axios from 'axios';
import Router from 'next/router';
import cookieService from '@/services/cookie';
import { getCartKey } from '@/components/service/cart';
import { signOut } from 'next-auth/react';

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL
});

axiosInstance.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    const cartToken = localStorage.getItem('cart-token');
    const cartKey = getCartKey();
    const nonce = localStorage.getItem('nonce');

    if (token) {
        config.headers.Authorization = token;
    }
    if (cartToken) {
        config.headers['Cart-Token'] = cartToken;
    }
    if (cartKey) {
        config.headers['Cart-key'] = cartKey;
    }
    if (nonce) {
        config.headers['Nonce'] = nonce;
    }

    return config;
}, error => {
    return Promise.reject(createAxiosErrorResponse(error));
});

axiosInstance.interceptors.response.use(response => {
    signOut({ redirect: false }).then(() => {
        // After signing out, redirect to login page or show a message
        window.location.href = "/login";
    });
    setCartTokenNonce(response);
    return response;
}, error => {
    signOut({ redirect: false }).then(() => {
        // After signing out, redirect to login page or show a message
        window.location.href = "/login";
    });
    if (error.response) {
        handleErrorResponse(error.response, error?.config?.preventAuthRedirect);
    }
    return Promise.reject(createAxiosErrorResponse(error));
});

function setCartTokenNonce(response) {
    if (response.headers['cart-token']) {
        localStorage.setItem('cart-token', response.headers['cart-token']);
    }
    if (response.headers['nonce']) {
        localStorage.setItem('nonce', response.headers['nonce']);
    }
}

function handleErrorResponse(response, preventAuthRedirect) {
    if (!preventAuthRedirect && (response.status === 401 || response.status === 403)) {
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
