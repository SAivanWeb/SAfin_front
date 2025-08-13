import api from '../api.js'

export default {
    async getCategories() {
        try {
            const response = await api.get(`/transaction-categories`);
            return response.data;
        } catch (error) {
            throw error.response?.data?.error || error;
        }
    },

    async getCategory(payload) {
        try {
            const response = await api.get(`/transaction-categories/${payload}`);
            return response.data;
        } catch (error) {
            throw error.response?.data?.error || error;
        }
    },

    async createCategory(payload) {
        try {
            const response = await api.post('/transaction-categories', payload);
            return response.data;
        } catch (error) {
            throw error.response?.data?.error || error;
        }
    },

    async deleteCategory(payload) {
        try {
            const response = await api.delete(`/transaction-categories/${payload}`);
            return response.data;
        } catch (error) {
            throw error.response?.data?.error || error;
        }
    },

    async updateCategory(payload, id) {
        try {
            const response = await api.put(`api/transaction-categories/${id}`, payload);
            return response.data;
        } catch (error) {
            throw error.response?.data?.error || error;
        }
    }
}