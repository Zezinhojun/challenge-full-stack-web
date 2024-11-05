import axios from 'axios';
import { createStore } from 'vuex';

export default createStore({
  state: {
    isLogged: false,
    token: '',
    user: null,
  },
  getters: {
    isAuthenticated: (state) => state.isLogged,
    getUser: (state) => state.user,
    getToken: (state) => state.token,
  },
  mutations: {
    SET_AUTH_DATA(state, { token, user }) {
      state.token = token;
      state.user = user;
      state.isLogged = true;

      localStorage.setItem('token', token);
    },

    CLEAR_AUTH_DATA(state) {
      state.token = '';
      state.user = null;
      state.isLogged = false;

      localStorage.removeItem('token');
    },

    INIT_AUTH(state) {
      const token = localStorage.getItem('token');
      if (token) {
        state.token = token;
        state.isLogged = true;
      }
    },
  },
  actions: {
    async loginUser({ commit }, loginData) {
      try {
        const response = await axios.post('/users/login', loginData);
        const data = response.data;

        if (!data.token || !data.user) {
          throw new Error('Dados de resposta inválidos');
        }

        commit('SET_AUTH_DATA', {
          token: data.token,
          user: {
            email: data.user.email,
            id: data.user.id,
          },
        });

        return {
          success: true,
          user: data.user,
        };
      } catch (error) {
        console.error('Erro no login:', error.response?.data || error.message);
        return {
          success: false,
          error: error.response?.data?.message || 'Erro no login',
        };
      }
    },
    logout({ commit }) {
      commit('CLEAR_AUTH_DATA');
    },
    checkAuth({ commit, state }) {
      commit('INIT_AUTH');

      if (state.token) {
        try {
          const tokenPayload = JSON.parse(atob(state.token.split('.')[1]));
          if (tokenPayload.exp * 1000 < Date.now()) {
            commit('CLEAR_AUTH_DATA');
            return false;
          }
          return true;
        } catch (error) {
          commit('CLEAR_AUTH_DATA');
          return false;
        }
      }
      return false;
    },
  },
  modules: {},
});
