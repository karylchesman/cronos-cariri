import axios from "axios";
// import { Cookies } from 'react-cookie';

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL
});

api.interceptors.request.use(function (config) {

    // const cookies = new Cookies();

    if (config.url !== '/session' && config.headers !== undefined) {

        // const token = cookies.get('https://sia.unileao.edu.br/session')
        const token = localStorage.getItem(String(process.env.REACT_APP_COOKIE_DOMAIN))

        config.headers['authorization'] = `Bearer ${token}`;

        return config;
    }
    return config;
}, function (error) {
    return Promise.reject(error);
});

api.interceptors.response.use(function (response) {
    // const cookies = new Cookies();

    if (response.headers['x-new-token'] && response.config.url !== '/login') {

        const newToken = JSON.parse(response.headers['x-new-token']);
        // cookies.set("https://sia.unileao.edu.br/session", newToken.access_token, {
        //     expires: new Date(newToken.expires_in),
        //     domain: process.env.REACT_APP_COOKIE_DOMAIN
        // })

        localStorage.setItem(String(process.env.REACT_APP_COOKIE_DOMAIN), newToken.access_token)
    }

    return response;
}, function (error) {
    // const cookies = new Cookies();

    if (error.response.status === 401) {
        // cookies.remove('https://sia.unileao.edu.br/session', {
        //     domain: process.env.REACT_APP_COOKIE_DOMAIN
        // });
        localStorage.removeItem(String(process.env.REACT_APP_COOKIE_DOMAIN))
        window.location.replace('/session-expired');
        alert("Sessão expirada, faça login novamente.");
    }

    return Promise.reject(error);
});

export { api };