<template>
  <div>
    <v-container
      class="d-flex justify-center flex-column align-center h-screen"
    >
      <v-card
        class="border pa-7"
        elevation="8"
        rounded="lg"
        width="300px"
        :height="isLoginMode ? '400px' : '470px'"
      >
        <v-card-title class="text-center text-h5">
          {{ isLoginMode ? 'Sign in' : 'Sign Up' }}
        </v-card-title>

        <VeeForm @submit="submit">
          <v-text-field
            v-show="!isLoginMode"
            v-model="name.value.value"
            :error-messages="name.errorMessage.value"
            label="Name"
            maxlength="255"
          />
          <v-text-field
            v-model="email.value.value"
            :error-messages="email.errorMessage.value"
            label="E-mail"
          />
          <v-text-field
            v-model="password.value.value"
            :error-messages="password.errorMessage.value"
            type="password"
            label="Password"
            maxlength="255"
          />
          <v-btn
            type="submit"
            class="mb-4"
            color="blue"
            size="large"
            variant="tonal"
            block
            @click="submit"
          >
            {{ isLoginMode ? 'Sign in' : 'Sign up' }}
          </v-btn>
        </VeeForm>

        <div>
          <p class="text-caption">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi,
            molestiae eligendi
          </p>
        </div>
        <div>
          <p class="text-caption">
            Create a new account?
            <strong @click="toggledMode" class="text-primary cursor-pointer">
              Click here
            </strong>
          </p>
        </div>
      </v-card>
      <Snackbar
        :message="snackbar.message"
        :type="snackbar.type"
        v-model:show="snackbar.show"
      />
    </v-container>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue';
import { useField, useForm } from 'vee-validate';
import * as yup from 'yup';
import axios from 'axios';
import Snackbar from '@/components/Snackbar.vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

//reactive state
const isLoginMode = ref(true);
const router = useRouter();
const store = useStore();
const snackbar = ref({
  show: false,
  message: '',
  type: 'success',
});

//validation schema
const validationSchema = computed(() => ({
  ...(isLoginMode.value
    ? {}
    : {
        name: yup
          .string()
          .required('Name is required')
          .min(2, 'Name needs to be at least 2 characters.')
          .max(255, 'Name cannot exceed 255 characters.'),
      }),
  email: yup
    .string()
    .required('Email is required')
    .max(255, 'Email cannot exceed 255 characters.')
    .email('Must be a valid e-mail.'),
  password: yup
    .string()
    .required('Password is required')
    .min(2, 'Password needs to be at least 2 characters.'),
}));

//form handling
const { handleSubmit } = useForm({
  validationSchema,
});
const name = useField('name', undefined, { initialValue: '' });
const email = useField('email', undefined, { initialValue: '' });
const password = useField('password', undefined, { initialValue: '' });

//snackbar handling
const showSnackbar = (message, type = 'success') => {
  snackbar.value.message = message;
  snackbar.value.type = type;
  snackbar.value.show = true;
};

//form submission
const submit = handleSubmit((values) => {
  if (isLoginMode.value) {
    signIn(values);
  } else {
    signUp(values);
  }
});

const toggledMode = () => {
  isLoginMode.value = !isLoginMode.value;
};

watch(isLoginMode, (newValue) => {
  if (newValue) {
    name.value.value = '';
  }
});

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
    showSnackbar('Account created successfully!', 'success');
  } catch (error) {
    console.error('Registration error', error.response?.data || error.message);
    showSnackbar('Error creating account. Please try again.', 'error');
  }
};
</script>
