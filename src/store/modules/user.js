import userApi from '@/api/modules/user.js';

const state = {
    currentUser: null,
    isAuth: true,
    userID: null,
    error: null,
    access_token: null,
};
const getters = {
    GET_CURRENT_USER(state){
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
    SET_AUTH(state, isAuth) {
        state.isAuth = isAuth;
    },
    SET_USER_ID(state, userId) {
        state.userId = userId;
    },
    SET_TOKENS(state, tokens) {
        state.access_token = tokens.access_token;
        localStorage.setItem('access_token', tokens.access_token);
        localStorage.setItem('refresh_token', tokens.refresh_token);
    },
    SET_ERROR(state, error) {
        state.error = error;
    },
    CLEAR_AUTH(state) {
        state.currentUser = null;
        state.isAuth = false;
        state.userId = null;
        state.error = null;
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
    }
};
const actions = {
    async register({commit}, payload) {
        try {
            commit('SET_ERROR', null);
            const response = await userApi.register(payload);
            if(response.success){
                commit('SET_CURRENT_USER', {name: response.name, email: response.email});
                commit('SET_USER_ID', response.id);
                commit('SET_TOKENS', response.token);
                commit('SET_AUTH', true);
            }
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
                commit('SET_CURRENT_USER', {name: response.name, email: response.email});
                commit('SET_USER_ID', response.id);
                commit('SET_TOKENS', response.token);
                commit('SET_AUTH', true);
            }
        } catch (error) {
            commit('SET_ERROR', error.message || 'Login failed');
            throw error;
        }
    },

    async logout({ commit }) {
        commit('CLEAR_AUTH');
        window.location.href = '/'
    },

    async initializeAuth({ commit }) {
        const token = localStorage.getItem('token');
        if (token) {
            const response = await userApi.getProfile();
            if (response) {
                commit('SET_CURRENT_USER', response.user);
                commit('SET_AUTH', true);
                commit('SET_TOKENS', {token: token});
            }
        }
    }
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
};