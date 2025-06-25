import userApi from '@/api/modules/user.js';

const state = {
    currentUser: null,
    isAuth: false,
    userID: null,
    error: null,
    token: null,
    accessToken: null,
    refreshToken: null
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
    GET_ACCESS_TOKEN(state) {
        return state.accessToken;
    }
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
    SET_TOKENS(state, { accessToken }) {
        state.accessToken = accessToken;
        localStorage.setItem('accessToken', accessToken);
    },
    SET_ERROR(state, error) {
        state.error = error;
    },
    CLEAR_AUTH(state) {
        state.currentUser = null;
        state.isAuth = false;
        state.accessToken = null;
        state.userId = null;
        state.error = null;
        localStorage.removeItem('accessToken');
    }
};
const actions = {
    async login({ commit }, credentials) {
        try {
            commit('SET_ERROR', null);
            const response = await userApi.login(credentials);
            commit('SET_CURRENT_USER', response.user);
            commit('SET_USER_ID', response.user.id);
            commit('SET_AUTH', true);
            commit('SET_TOKENS', {
                accessToken: response.meta.tokens.accessToken
            });

            return response.user;
        } catch (error) {
            commit('SET_ERROR', error.message || 'Login failed');
            throw error;
        }
    },

    async logout({ commit }) {
        try {
            await userApi.logout();
            commit('CLEAR_AUTH');
            window.location.href = '/'
        } catch (error) {
            commit('SET_ERROR', error.message || 'Logout failed');
            throw error;
        }
    },

    async initializeAuth({ commit }) {
        const token = localStorage.getItem('accessToken');
        if (token) {
            const userData = await userApi.getProfile();
            if (userData) {
                commit('SET_CURRENT_USER', userData.user);
                commit('SET_AUTH', true);
                commit('SET_TOKENS', {accessToken: token});
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