import api from '../api.js'

export default {
    async register(payload) {
        try {
            const response = await api.post('/auth/register', payload);
            return response.data;
        } catch (error) {
            throw error.response?.data?.error || error;
        }
    },

    async login(payload) {
        try {
            const response = await api.post('/auth/login', payload);
            return response.data;
        } catch (error) {
            throw error.response?.data?.error || error;
        }
    },

    async logout(payload) {
        try {
            const response = await api.post('/auth/logout', payload);
            return response.data;
        } catch (error) {
            throw error.response?.data?.error || error;
        }
    },

    async getProfile() {
        try {
            const response = await api.get('/auth/me');
            return response.data;
        } catch (error) {
            throw error.response?.data?.error || error;
        }
    },

    async updateProfile(payload) {
        try {
            const response = await api.put('/auth/me', payload);
            return response.data;
        } catch (error) {
            throw error.response?.data?.error || error;
        }
    }
}