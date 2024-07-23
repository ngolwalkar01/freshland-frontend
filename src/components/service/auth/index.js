import cookieService from '@/services/cookie';
const expires = parseInt(process.env.NEXT_PUBLIC_CART_KEY_EXPIRY);

export const setUserLoggedInData = (data) => {
    localStorage.setItem("token", `Bearer ${data.token}`);
    cookieService.setCookie("token", `Bearer ${data.token}`, expires);

    localStorage.setItem("userId", data.user_id);
    cookieService.setCookie("userId", data.user_id, expires);
}