import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
    plugins: [createPersistedState({storage: window.sessionStorage})],
    state: {
        user: {},
        isSignIn: false
    },
    mutations: {
        setUser(state, user) {
            state.user = user; //firebaseが返したユーザー情報
        },
        setSignIn(state, isSignIn) {
            state.isSignIn = isSignIn; //ログインしてるかどうか true or false
        }
    },
    getters: {
        user(state) {
            return state.user;
        },
        isSignIn(state) {
            return state.isSignIn;
        }
    }
});