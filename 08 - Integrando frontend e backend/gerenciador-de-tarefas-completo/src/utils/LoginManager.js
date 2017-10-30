import jwtDecode from 'jwt-decode';
import Cookies from 'universal-cookie';

const cookies = new Cookies();
const TOKEN_COOKIE_NAME = 'x-access-token';

export const saveToken = (token) => {
    cookies.set(TOKEN_COOKIE_NAME, token);
}

export const getToken = () => {
    return cookies.get(TOKEN_COOKIE_NAME);
}

export const removeToken = () => {
    return cookies.remove(TOKEN_COOKIE_NAME);
}

export const isLoggedIn = () => {
    return !!getToken();
}

export const getUsuario = () => {
    return jwtDecode(getToken());
}