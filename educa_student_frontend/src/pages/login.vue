<template>
  <div>
    <v-container
      class="d-flex justify-center flex-column align-center h-screen"
    >
      <LoginCard :is-login-mode="isLoginMode">
        <template #title>
          <v-card-title class="text-center text-h5">
            {{ isLoginMode ? 'Sign in' : 'Sign Up' }}
          </v-card-title>
        </template>

        <template #form>
          <LoginForm :is-login-mode="isLoginMode" @submit="submit" />
        </template>
        <template #footer>
          <LoginFooter @toggle="toggledMode" />
        </template>
      </LoginCard>
      <Snackbar
        :message="snackbar.message"
        :type="snackbar.type"
        v-model:show="snackbar.show"
      />
    </v-container>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import Snackbar from '@/components/Snackbar.vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import LoginCard from '@/components/Login/LoginCard.vue';
import LoginFooter from '@/components/Login/LoginFooter.vue';
import LoginForm from '@/components/Login/LoginForm.vue';

//reactive state
const isLoginMode = ref(true);
const router = useRouter();
const store = useStore();
const snackbar = ref({
  show: false,
  message: '',
  type: 'success',
});

const showSnackbar = (message, type = 'success') => {
  snackbar.value.message = message;
  snackbar.value.type = type;
  snackbar.value.show = true;
};

const submit = (values) => {
  isLoginMode.value ? signIn(values) : signUp(values);
};

const toggledMode = () => {
  isLoginMode.value = !isLoginMode.value;
};

const signIn = async (values) => {
  try {
    const response = await axios.post('users/login', {
      email: values.email,
      password: values.password,
    });

    store.commit('SET_AUTH_DATA', {
      token: response.data.token,
      user: {
        email: response.data.user.email,
        id: response.data.user.id,
      },
    });
    showSnackbar('Login successful!', 'success');
    setTimeout(() => {
      router.push('/studentlist');
    }, 1000);
  } catch (error) {
    console.error('Login error:', error.response?.data || error.message);
    showSnackbar('Login error. Please check your credentials.', 'error');
  }
};

const signUp = async (values) => {
  try {
    await axios.post('users/register', {
      name: values.name,
      email: values.email,
      password: values.password,
    });
    isLoginMode.value = !isLoginMode.value;
    showSnackbar('Account created successfully!', 'success');
  } catch (error) {
    console.error('Registration error', error.response?.data || error.message);
    showSnackbar('Error creating account. Please try again.', 'error');
  }
};
</script>
