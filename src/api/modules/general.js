import api from '../api.js'

export default {
    async getStats(params) {
        try {
            const response = await api.get(`/general/stats`, {params});
            return response.data;
        } catch (error) {
            throw error.response?.data?.error || error;
        }
    },
}