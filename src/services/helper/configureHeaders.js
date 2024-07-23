const getHeaders = (token, preventAuthRedirect = "") => {
    let config = {
        preventAuthRedirect
        // withCredentials: true
    }

    if (token) {
        config = {
            preventAuthRedirect,
            headers: {
                Authorization: token
            }
            // withCredentials: true
        };
    }

    return config;
}

export default getHeaders;