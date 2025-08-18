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

    async deleteGoal(id) {
        try {
            const response = await api.delete(`/goals/${id}`);
            return response.data;
        } catch (error) {
            throw error.response?.data?.error || error;
        }
    },

    async addToGoal(id, current_amount ) {
        try {
            const response = await api.put(`/goals/current/${id}`, {current_amount });
            return response.data;
        } catch (error) {
            throw error.response?.data?.error || error;
        }
    }
}