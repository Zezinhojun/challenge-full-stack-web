import axios from 'axios';
import { createStore } from 'vuex';

export default createStore({
  state: {
    isLogged: false,
    token: '',
    user: null,
    students: [],
    loadingStudents: false,
  },
  getters: {
    isAuthenticated: (state) => state.isLogged,
    getUser: (state) => state.user,
    getToken: (state) => state.token,
    getStudents: (state) => state.students,
    isLoadingStudents: (state) => state.loadingStudents,
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

    SET_STUDENTS(state, data) {
      state.students = data;
    },
    SET_LOADING_STUDENTS(state, data) {
      state.isLoadingStudents = data;
    },

    REMOVE_STUDENT(state, data) {
      state.students = state.students.filter((student) => student.id !== data);
    },

    ADD_STUDENT(state, data) {
      state.students.push(data);
    },
    UPDATE_STUDENT(state, data) {
      const index = state.students.findIndex(
        (student) => student.id === data.id,
      );

      if (index !== -1) {
        state.students.splice(index, 1, data);
      }
    },
  },
  actions: {
    async loginUser({ commit }, loginData) {
      try {
        const response = await axios.post('/users/login', loginData);
        const data = response.data;

        if (!data.token || !data.user) {
          throw new Error('Invalid response data');
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
        console.error('Login error::', error.response?.data || error.message);
        return {
          success: false,
          error: error.response?.data?.message || 'Login error:',
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

    async loadStudents({ commit }) {
      commit('SET_LOADING_STUDENTS', true);
      try {
        const response = await axios.get('/students');
        commit('SET_STUDENTS', response.data);
      } catch (error) {
        console.error('Error loading students:', error);
      } finally {
        commit('SET_LOADING_STUDENTS', false);
      }
    },

    async removeStudent({ commit }, studentId) {
      try {
        await axios.delete(`/students/${studentId}`);
        commit('REMOVE_STUDENT', studentId);
      } catch (error) {
        console.error('Error removing student:', error);
        throw error;
      }
    },

    // eslint-disable-next-line no-unused-vars
    async fetchStudentById({ _commit }, studentId) {
      try {
        const response = await axios.get(`students/${studentId}`);
        return response.data;
      } catch (error) {
        console.error('Error fetching student by ID:', error);
        return null;
      }
    },

    async createStudent({ commit }, studentData) {
      try {
        const response = await axios.post('/students', studentData);
        commit('ADD_STUDENT', response.data);
        return response.data;
      } catch (error) {
        console.error('Error creating user:', error);
        return null;
      }
    },
    async updateStudent({ commit }, { studentId, updatedData }) {
      try {
        const response = await axios.put(`/students/${studentId}`, updatedData);
        commit('UPDATE_STUDENT', response.data);
        return response.data;
      } catch (error) {
        console.error('Error updating user:', error);
        return null;
      }
    },
  },
  modules: {},
});
