<template>
  <v-form
    @submit.prevent="submit"
    class="mt-10 d-flex flex-column justify-center"
  >
    <v-text-field
      v-model="name.value.value"
      :error-messages="name.errorMessage.value"
      label="Name"
      maxlength="255"
    ></v-text-field>

    <v-text-field
      v-model="email.value.value"
      :error-messages="email.errorMessage.value"
      label="E-mail"
      maxlength="255"
    ></v-text-field>

    <v-text-field
      v-model="ra.value.value"
      :error-messages="ra.errorMessage.value"
      label="RA"
      maxlength="20"
      :disabled="userData !== null"
    ></v-text-field>

    <v-text-field
      v-model="cpf.value.value"
      :counter="11"
      :error-messages="cpf.errorMessage.value"
      label="CPF"
      maxlength="11"
      :disabled="userData !== null"
    >
    </v-text-field>
    <div class="d-flex justify-center justify-md-end align-center w-75">
      <v-btn color="success" class="me-4" type="submit"> Save </v-btn>
      <v-btn color="error" @click="handleReset"> Cancel </v-btn>
    </div>
  </v-form>
</template>
<script setup>
import { useField, useForm } from 'vee-validate';
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import * as yup from 'yup';

const router = useRouter();
const userData = ref(null);

const validationSchema = yup.object({
  name: yup
    .string()
    .required('Name is required')
    .min(2, 'Name needs to be at least 2 characters.')
    .max(255, 'Name cannot exceed 255 characters.'),
  email: yup
    .string()
    .required('Email is required')
    .max(255, 'Email cannot exceed 255 characters.')
    .email('Must be a valid e-mail.'),
  ra: yup
    .string()
    .required('RA is required')
    .matches(/^[0-9-]{6,20}$/, 'RA must contain at least 6 digits.'),
  cpf: yup
    .string()
    .required('CPF is required')
    .matches(/^\d{11}$/, 'CPF must contain exactly 11 numeric digits.'),
});

const { handleSubmit, handleReset: resetForm } = useForm({
  validationSchema,
});

const name = useField('name');
const email = useField('email');
const ra = useField('ra');
const cpf = useField('cpf');

const submit = handleSubmit((values) => {
  const userUpdateData = {
    name: values.name,
    email: values.email,
  };

  if (userData.value) {
    console.log('Updating user: ', userUpdateData);
  } else {
    console.log('Creating user:', values);
  }
});

watch(userData, (newValue) => {
  if (newValue) {
    name.value.value = newValue.name ?? '';
    email.value.value = newValue.email ?? '';
    ra.value.value = newValue.ra ?? '';
    cpf.value.value = newValue.cpf ?? '';
  }
});

const handleReset = () => {
  resetForm();
  router.push('/');
};

// userData.value = {
//   name: 'John Doe',
//   email: 'john@example.com',
//   ra: '123456',
//   cpf: '12345678901',
// };
</script>

<style>
.v-form {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.v-form .v-text-field {
  width: 90%;
}
</style>
