import axios from "axios";

export const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL ?? '/api',
    headers: {
        'Content-Type': 'application/json',
    },
});


// attaching the token to the request header
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('rl_token');
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
});

// for logout -> 401
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('rl_token');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);