import { createStore } from 'vuex';
import user from './modules/user.js'

export default createStore({
    state: {
        message: {
            text: '',
            type: ''
        }
    },
    getters: {
        GET_MESSAGE: (state) => state.message
    },
    mutations: {
        SET_MESSAGE: (state, message) => {
            state.message = message;
        }
    },
    actions: {

    },
    modules: {
        user
    }
});
