import { createStore } from 'vuex';
import user from './modules/user.js'
import userApi from "@/api/modules/user.js";
import categoryApi from "@/api/modules/category.js";
import goalsApi from "@/api/modules/goals.js"
export default createStore({
    state: {
        message: {
            text: '',
            type: ''
        },
        categories: null,
        goals: null,
    },
    getters: {
        GET_MESSAGE: (state) => state.message,
        GET_CATEGORIES: (state) => state.categories,
        GET_GOALS: (state) => state.goals,
    },
    mutations: {
        SET_MESSAGE: (state, message) => {
            state.message = message;
        },
        SET_CATEGORIES: (state, categories) => {
            state.categories = categories;
        },
        SET_GOALS: (state, goals) => {
            state.goals = goals;
        }
    },
    actions: {
        async initAuth({ commit, dispatch }) {
            commit('user/SET_ERROR', null);
            let token = localStorage.getItem('access_token');
            if (token) {
                const response = await userApi.getProfile();
                if(response.success) {
                    commit('user/SET_CURRENT_USER', {name: response.data.name, email: response.data.email});
                    commit('user/SET_USER_ID', response.data.id);
                    commit('user/INIT_AUTH');
                    await dispatch('getCategories');
                    await dispatch('getGoals');
                }
            }
        },
        async getCategories({ commit }) {
            const res = await categoryApi.getCategories();
            if (res.success) {
                commit('SET_CATEGORIES', res.data);
            }
        },
        async getGoals({ commit }) {
            const res = await goalsApi.getGoals();
            if (res.success) {
                commit('SET_GOALS', res.data);
            }
        }
    },
    modules: {
        user
    }
});
