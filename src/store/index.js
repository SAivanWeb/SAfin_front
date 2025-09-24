import { createStore } from 'vuex';
import user from './modules/user.js'
import userApi from "@/api/modules/user.js";
import categoryApi from "@/api/modules/category.js";
import goalsApi from "@/api/modules/goals.js"
import transactionsApi from "@/api/modules/transactions.js"
import accountsApi from "@/api/modules/account.js"

export default createStore({
    state: {
        message: {
            text: '',
            type: ''
        },
        categories: null,
        goals: null,
        accounts: null,
        preloader: false,
        resetTransaction: false
    },
    getters: {
        GET_MESSAGE: (state) => state.message,
        GET_CATEGORIES: (state) => state.categories,
        GET_GOALS: (state) => state.goals,
        GET_ACCOUNTS: (state) => state.accounts,
        GET_PRELOADER: (state) => state.preloader,
        GET_RESET_TRANSACTIONS: (state) => state.resetTransaction,
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
        },
        SET_ACCOUNTS: (state, accounts) => {
            state.accounts = accounts;
        },
        SET_PRELOADER: (state, preloader) => {
            state.preloader = preloader;
        },
        SET_RESET_TRANSACTIONS: (state, status) => {
            state.resetTransaction = status;
        }
    },
    actions: {
        async initAuth({ commit, dispatch }) {
            commit('user/SET_ERROR', null);
            commit('SET_PRELOADER', true);
            let token = localStorage.getItem('access_token');
            if (token) {
                const response = await userApi.getProfile();
                if(response.success) {
                    commit('user/SET_CURRENT_USER', {name: response.data.name, email: response.data.email});
                    commit('user/SET_USER_ID', response.data.id);
                    commit('user/INIT_AUTH');
                    await dispatch('getCategories');
                }
            }
            commit('SET_PRELOADER', false);
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
        },
        async getTransactions({ commit }, config) {
            const res = await transactionsApi.getTransactions(config);
            if (res.success) {
                return res;
            }
        },
        async getAccounts({ commit }) {
            const res = await accountsApi.getAccounts();
            if (res.success) {
                if (res.data.length === 0) return [];
                let accounts = res.data;
                const totalBalance = accounts.reduce((sum, acc) => sum + acc.balance, 0);
                accounts = [
                    {
                        id: "total",
                        title: "Общий баланс",
                        description: "",
                        balance: totalBalance,
                    },
                    ...accounts,
                ];
                commit('SET_ACCOUNTS', accounts);
            }
        }
    },
    modules: {
        user
    }
});
