import userApi from '@/api/modules/user.js';

const state = {
    currentUser: null,
    isAuth: false,
    userID: null,
    error: null,
    token: null,
};
const getters = {
    GET_CURRENT_USER(state){
        return state.currentUser;
    },
    GET_USERID(state) {
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
    SET_TOKEN(state, { token }) {
        state.token = token;
        localStorage.setItem('token', token);
    },
    SET_ERROR(state, error) {
        state.error = error;
    },
    CLEAR_AUTH(state) {
        state.currentUser = null;
        state.isAuth = false;
        state.token = null;
        state.userId = null;
        state.error = null;
        localStorage.removeItem('token');
    }
};
const actions = {
    async register({commit}, payload) {
        try {
            commit('SET_ERROR', null);
            const response = await userApi.register(payload);
            console.log(response);
        } catch (error) {
            commit('SET_ERROR', error.message || 'Register failed');
            throw error;
        }
    },
    async login({ commit }, payload) {
        try {
            commit('SET_ERROR', null);
            const response = await userApi.login(payload);
            commit('SET_CURRENT_USER', response.user);
            commit('SET_USER_ID', response.user.id);
            commit('SET_AUTH', true);
            commit('SET_TOKEN', {
                token: response.token
            });

            return response.user;
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
                commit('SET_TOKEN', {token: token});
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