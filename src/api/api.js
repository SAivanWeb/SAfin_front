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
    withCredentials: true
});

// Request interceptor
api.interceptors.request.use(config => {
    const token = localStorage.getItem('accessToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

api.interceptors.response.use(
    response => response.data,
    async error => {
        const originalRequest = error.config;
        if (error.response?.status === 401 && !originalRequest._retry) {
            try{
                originalRequest._retry = true;
                const data = await api.post('/user/refresh');
                localStorage.removeItem('accessToken');
                localStorage.setItem('accessToken', data.meta.tokens.accessToken);
                return api(originalRequest);
            } catch (refreshError) {
                if (refreshError.response?.data?.error?.code === 'INVALID_REFRESH_TOKEN') {
                    await store.dispatch('user/logout');
                    window.location.href = '/login';
                }
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);

export default api;