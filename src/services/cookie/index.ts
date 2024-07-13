import Cookies from 'js-cookie';

const setCookie = (name: string, value: string, expires: number) => {
    Cookies.set(name, value, { expires: expires, path: '/' });
};

const getCookie = (name: string): string | undefined => {
    return Cookies.get(name);
};

const removeCookie = (name: string) => {
    Cookies.remove(name, { path: '/' });
};

const cookieService = {
    setCookie,
    getCookie,
    removeCookie
};

export default cookieService;
