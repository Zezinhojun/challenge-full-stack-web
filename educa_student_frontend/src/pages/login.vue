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
    </v-container>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue';
import { useField, useForm } from 'vee-validate';
import * as yup from 'yup';

const isLoginMode = ref(false);
const name = useField('name', undefined, { initialValue: '' });
const email = useField('email', undefined, { initialValue: '' });
const password = useField('password', undefined, { initialValue: '' });

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

const { handleSubmit } = useForm({
  validationSchema,
});

const submit = handleSubmit((values) => {
  const payloadLogin = {
    email: values.email,
    password: values.password,
  };
  if (!isLoginMode.value) {
    return console.log(values);
  }
  console.log(payloadLogin);
});

const toggledMode = () => {
  isLoginMode.value = !isLoginMode.value;
};

watch(isLoginMode, (newValue) => {
  if (newValue) {
    name.value.value = '';
  }
});
</script>
