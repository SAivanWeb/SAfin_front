import api from '../api.js'

export default {
    async getAccounts() {
        try {
            const response = await api.get(`/accounts`);
            return response.data;
        } catch (error) {
            throw error.response?.data?.error || error;
        }
    },

    async createAccount(payload) {
        try {
            const response = await api.post(`/accounts`, payload);
            return response.data;
        } catch (error) {
            throw error.response?.data?.error || error;
        }
    },

    async updateAccount(id, payload) {
        try {
            const response = await api.put(`/accounts/${id}`, {payload});
            return response.data;
        } catch (error) {
            throw error.response?.data?.error || error;
        }
    },

    async deleteAccount(id) {
        try {
            const response = await api.delete(`/accounts/${id}`);
            return response.data;
        } catch (error) {
            throw error.response?.data?.error || error;
        }
    },
}