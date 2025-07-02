import api from '../api.js'

export default {
    async getGoals(payload) {
        try {
            const response = await api.get(`api/goals`);
            return response.data;
        } catch (error) {
            throw error.response?.data?.error || error;
        }
    },

    async getGoal(payload) {
        try {
            const response = await api.get(`api/goals/${payload}`);
            return response.data;
        } catch (error) {
            throw error.response?.data?.error || error;
        }
    },

    async createGoal(payload) {
        try {
            const response = await api.post('api/goals', payload);
            return response.data;
        } catch (error) {
            throw error.response?.data?.error || error;
        }
    },

    async deleteGoal(payload) {
        try {
            const response = await api.delete(`api/goals/${payload}`);
            return response.data;
        } catch (error) {
            throw error.response?.data?.error || error;
        }
    },
}