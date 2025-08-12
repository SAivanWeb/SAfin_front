import api from '../api.js'

export default {
    async getGoals() {
        try {
            const response = await api.get(`/goals`);
            return response.data;
        } catch (error) {
            throw error.response?.data?.error || error;
        }
    },

    async getGoal(payload) {
        try {
            const response = await api.get(`/goals/${payload}`);
            return response.data;
        } catch (error) {
            throw error.response?.data?.error || error;
        }
    },

    async createGoal(payload) {
        try {
            const response = await api.post('/goals', payload);
            return response.data;
        } catch (error) {
            throw error.response?.data?.error || error;
        }
    },

    async deleteGoal(payload) {
        try {
            const response = await api.delete(`/goals/${payload}`);
            return response.data;
        } catch (error) {
            throw error.response?.data?.error || error;
        }
    },

    async addToGoal(payload, id) {
        try {
            const response = await api.put(`api/goals/current/${id}`, payload);
            return response.data;
        } catch (error) {
            throw error.response?.data?.error || error;
        }
    }
}