import { AxiosRequestConfig } from "axios";

const getHeaders = (token: string = "") => {
    let config: AxiosRequestConfig = {
        // withCredentials: true
    }

    if (token) {
        config = {
            headers: {
                Authorization: token
            }
            // withCredentials: true
        };
    }

    return config;
}

export default getHeaders;