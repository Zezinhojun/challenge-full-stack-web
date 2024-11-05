<template>
  <v-form @submit="submit" class="mt-10 d-flex flex-column justify-center">
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
      :disabled="studentData !== null"
    ></v-text-field>

    <v-text-field
      v-model="cpf.value.value"
      :counter="11"
      :error-messages="cpf.errorMessage.value"
      label="CPF"
      maxlength="11"
      :disabled="studentData !== null"
    >
    </v-text-field>
    <div class="d-flex justify-center justify-md-end align-center w-75">
      <StudentFormButtons @reset="handleReset" />
    </div>
  </v-form>
</template>

<script setup>
import { useField, useForm } from 'vee-validate';
import { inject, watch } from 'vue';
import * as yup from 'yup';
import StudentFormButtons from './StudentFormButtons.vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

const showSnackbar = inject('showSnackbar');
const store = useStore();
const router = useRouter();

const props = defineProps({
  isEdit: Boolean,
  studentData: Object,
});

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

watch(
  () => props.studentData,
  (newValue) => {
    if (newValue) {
      name.value.value = newValue.name ?? '';
      email.value.value = newValue.email ?? '';
      ra.value.value = newValue.ra ?? '';
      cpf.value.value = newValue.cpf ?? '';
    }
  },
);

const handleReset = () => {
  resetForm();
};

const submit = handleSubmit(async (values) => {
  const studentUpdateData = {
    name: values.name,
    email: values.email,
  };

  try {
    if (props.studentData) {
      await store.dispatch('updateStudent', {
        studentId: props.studentData.id,
        updatedData: studentUpdateData,
      });
      showSnackbar('Student updated successfully!', 'success');
    } else {
      await store.dispatch('createStudent', values);
      showSnackbar('Student created successfully!', 'success');
    }
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || 'Failed, Please try again.';
    showSnackbar(errorMessage, 'error');
  } finally {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    router.push('/studentList');
  }
});
</script>
