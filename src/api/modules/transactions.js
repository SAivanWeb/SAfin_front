import api from '../api.js'

export default {
    async getTransactions() {
        try {
            const response = await api.get(`/transactions`);
            return response.data;
        } catch (error) {
            throw error.response?.data?.error || error;
        }
    },

    async createTransaction(payload) {
        try {
            const response = await api.post(`/transactions`, payload);
            return response.data;
        } catch (error) {
            throw error.response?.data?.error || error;
        }
    },

    async updateTransaction(id, payload) {
        try {
            const response = await api.put(`/transactions/${id}`, {payload});
            return response.data;
        } catch (error) {
            throw error.response?.data?.error || error;
        }
    },

    async deleteTransaction(id) {
        try {
            const response = await api.delete(`/transactions/${id}`);
            return response.data;
        } catch (error) {
            throw error.response?.data?.error || error;
        }
    },
}