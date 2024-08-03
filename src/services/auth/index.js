import { UserCredentials } from "@/interfaces/userCredentials";
import axios from '@/utils/axios';
import axiosApi from "axios";
import getHeaders from "../helper/configureHeaders";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const Auth_API_BASE_URL_OAUTH = `${API_BASE_URL}/wp-json/fl-cart/v1/cart`;
const Auth_API_BASE_URL = `/wp-json/fl-cart/v1/cart`;

const login = async (userCredentials) => {
    try {
        const config = getHeaders();
        const response = await axiosApi.post(`${Auth_API_BASE_URL_OAUTH}/fl-login`, userCredentials);
        return response.data;
    } catch (error) {
        console.error('Error fetching products:');
        throw error;
    }
};

const loginWithGoogle = async (userData) => {
    try {
        const response = await axiosApi.post(`${Auth_API_BASE_URL_OAUTH}/sso-login`, userData);
        return response.data;
    } catch (error) {
        console.error('Error login with google:');
        throw error;
    }
};

const logout = async () => {
    const config = getHeaders();
    const url = `${Auth_API_BASE_URL}/fl-logout`;
    const response = await axios.post(url, {}, config);
    return response.data;
}

const AuthAPI = {
    login,
    logout,
    loginWithGoogle
};

export default AuthAPI;