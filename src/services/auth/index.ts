import { UserCredentials } from "@/interfaces/userCredentials";
import axios from '@/utils/axios';
import getHeaders from "../helper/configureHeaders";

// const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
// const Auth_API_BASE_URL = `${API_BASE_URL}/wp-json/jwt-auth/v1`;
const Auth_API_BASE_URL = `/wp-json/fl-cart/v1/cart`;

const login = async (userCredentials: UserCredentials) => {
    try {
        const config = getHeaders();
        const response = await axios.post(`${Auth_API_BASE_URL}/fl-login`, userCredentials, config);
        return response.data;
    } catch (error) {
        console.error('Error fetching products:');
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
    logout
};

export default AuthAPI;