import axios from "axios";

const api = axios.create({
    baseURL: String(import.meta.env.VITE_API_URL)
});

api.interceptors.request.use(function (config) {
    if (config.url !== '/users/session' && config.headers !== undefined) {

        const token = localStorage.getItem(String(import.meta.env.VITE_SESSION_KEY))

        config.headers['authorization'] = `Bearer ${token}`;

        return config;
    }
    return config;
}, function (error) {
    return Promise.reject(error);
});

api.interceptors.response.use(function (response) {
    if (response.headers['x-new-token'] && response.config.url !== '/login') {

        const newToken = JSON.parse(response.headers['x-new-token']);

        localStorage.setItem(String(import.meta.env.VITE_SESSION_KEY), newToken.access_token)
    }

    return response;
}, function (error) {
    if (error.response.status === 401) {
        localStorage.removeItem(String(import.meta.env.VITE_SESSION_KEY))
        window.location.replace('/session-expired');
    }

    return Promise.reject(error);
});

export { api };