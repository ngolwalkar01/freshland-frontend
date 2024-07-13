import axios from 'axios';
import Router from 'next/router';
import cookieService from '@/services/cookie';

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL
});

axiosInstance.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = token;
    }
    return config;
}, error => {
    return Promise.reject(createAxiosErrorResponse(error));
});

axiosInstance.interceptors.response.use(response => {
    return response;
}, error => {
    if (error.response) {
        handleErrorResponse(error.response);
    }
    return Promise.reject(createAxiosErrorResponse(error));
});

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
