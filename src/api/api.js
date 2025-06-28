import axios from 'axios';
import store from '@/store';
import router from '@/router';
import response from "@/api/response.js";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    },
});

// Request interceptor
api.interceptors.request.use(config => {
    const token = localStorage.getItem('access_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

api.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config;
        if (error.response?.status === 401 && !originalRequest._retry) {
            try{
                originalRequest._retry = true;
                let refreshToken = localStorage.getItem('refresh_token');
                if (refreshToken) {
                    const res = await api.post('/user/refresh', refreshToken);
                    localStorage.removeItem('access_token');
                    localStorage.removeItem('refresh_token');
                    localStorage.setItem('access_token', res.data.access_token);
                    localStorage.setItem('refresh_token', res.data.refresh_token);
                    return api(originalRequest);
                }

            } catch (refreshError) {
                window.location.href = '/auth/';
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }

);

export default api;