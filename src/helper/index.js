export const decodeString = (txt) => {
    return txt ? decodeURIComponent(txt) : txt
}

export const getCorrectPrice = (number, currency_minor_unit) => {
    if (currency_minor_unit) {
        const value = parseFloat((number / 100).toFixed(currency_minor_unit));
        return Math.round(value);
    }
    return number;
};

export const generateRandomId = (length = 8) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

export const getEmail = () => {
    return localStorage.getItem("email") || localStorage.getItem("klaviyoEmail");
}

export const getBaseUrl = () => {
    if(!(window && window?.location)) return '';

    const protocol = window.location.protocol;
    const hostname = window.location.hostname;
    const port = window.location.port;

    const baseUrl = `${protocol}//${hostname}${port ? ':' + port : ''}`;
    return baseUrl;
}

export const getStrongPasswordRegex = () => {
    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=\[\]{};:'",.<>?/\\|`~])[A-Za-z\d!@#$%^&*()_\-+=\[\]{};:'",.<>?/\\|`~]{8,}$/;
    return strongPasswordRegex;
}