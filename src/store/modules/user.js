import userApi from '@/api/modules/user.js';

const state = {
    currentUser: null,
    isAuth: false,
    userID: null,
    error: null,
    access_token: null,
};

const getters = {
    GET_CURRENT_USER(state) {
        return state.currentUser;
    },
    GET_USER_ID(state) {
        return state.userID;
    },
    GET_IS_AUTH(state) {
        return state.isAuth;
    },
    GET_ERROR(state) {
        return state.error;
    },
};

const mutations = {
    SET_CURRENT_USER(state, user) {
        state.currentUser = user;
    },
    SET_USER_ID(state, userId) {
        state.userId = userId;
    },
    SET_TOKENS(state, tokens) {
        state.access_token = tokens.access_token;
        state.isAuth = true; // Добавляем синхронизацию состояния
        localStorage.setItem('access_token', tokens.access_token);
        localStorage.setItem('refresh_token', tokens.refresh_token);
        localStorage.setItem('IS_AUTH', true);
    },
    SET_ERROR(state, error) {
        state.error = error;
    },
    CLEAR_AUTH(state) {
        state.currentUser = null;
        state.isAuth = false;
        state.userId = null;
        state.error = null;
        state.access_token = null;
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('IS_AUTH');
    },
    INIT_AUTH(state) {
        state.isAuth = !!localStorage.getItem('IS_AUTH');
        state.access_token = localStorage.getItem('access_token');
    }
};

const actions = {
    async register({commit}, payload) {
        try {
            commit('SET_ERROR', null);
            const response = await userApi.register(payload);
            if(response.success){
                commit('SET_CURRENT_USER', {name: response.data.name, email: response.data.email});
                commit('SET_USER_ID', response.data.id);
                commit('SET_TOKENS', response.data.token);
            }
            return response;
        } catch (error) {
            commit('SET_ERROR', error.message || 'Register failed');
            throw error;
        }
    },

    async login({ commit }, payload) {
        try {
            commit('SET_ERROR', null);
            const response = await userApi.login(payload);
            if(response.success){
                commit('SET_CURRENT_USER', {name: response.data.name, email: response.data.email});
                commit('SET_USER_ID', response.data.id);
                commit('SET_TOKENS', response.data.token);
            }
            return response;
        } catch (error) {
            commit('SET_ERROR', error.message || 'Login failed');
            throw error;
        }
    },

    async logout({ commit }) {
        commit('SET_ERROR', null);
        commit('CLEAR_AUTH');
        window.location.href = '/';
    },

};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
};