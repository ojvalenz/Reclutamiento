import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    isLoggedIn: !!localStorage.getItem('user'),
    menu: localStorage.getItem('menu') ? JSON.parse(localStorage.getItem('menu')) : [],
    user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
    token: localStorage.getItem('token'),
    isLoading: false
  }
});
