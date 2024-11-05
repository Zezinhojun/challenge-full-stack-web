<template>
  <form @submit="submit">
    <v-text-field
      v-show="!props.isLoginMode"
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
    >
      {{ props.isLoginMode ? 'Sign in' : 'Sign up' }}
    </v-btn>
  </form>
</template>
<script setup>
import { useField, useForm } from 'vee-validate';
import { computed, watch } from 'vue';
import * as yup from 'yup';

const emit = defineEmits(['submit', 'register-fields']);
const props = defineProps({
  isLoginMode: {
    type: Boolean,
    required: true,
  },
});

const validationSchema = computed(() => ({
  ...(props.isLoginMode
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
  emit('submit', values);
});
const name = useField('name', undefined, { initialValue: '' });
const email = useField('email', undefined, { initialValue: '' });
const password = useField('password', undefined, { initialValue: '' });

watch(
  () => props.isLoginMode,
  (newValue) => {
    if (newValue) {
      name.value = '';
    }
  },
);
</script>
