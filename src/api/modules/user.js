import api from '../api.js'

export default {
    async register(payload) {
        try {
            const response = await api.post('/user/register', payload);
            return response.data;
        } catch (error) {
            throw error.response?.data?.error || error;
        }
    },

    async login(payload) {
        try {
            const response = await api.post('/user/login', payload);
            return response.data;
        } catch (error) {
            throw error.response?.data?.error || error;
        }
    },

    async refresh() {
        try {
            const response = await api.post('/user/refresh');
            return response.data;
        } catch (error) {
            throw error.response?.data?.error || error;
        }
    },

    async logout() {
        try {
            const response = await api.post('/user/logout');
            return response.data;
        } catch (error) {
            throw error.response?.data?.error || error;
        }
    },

    async getProfile() {
        try {
            const response = await api.get('/user/profile');
            return response.data;
        } catch (error) {
            throw error.response?.data?.error || error;
        }
    }
}