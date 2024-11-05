<template>
  <StudentForm
    :isEdit="!!studentData"
    :studentData="studentData"
    @reset="handleReset"
  />
</template>
<script setup>
import StudentForm from '@/components/StudentForm/StudentForm.vue';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

const store = useStore();
const router = useRouter();
const studentData = ref(null);
const studentId = ref(null);

onMounted(async () => {
  studentId.value = router.currentRoute.value.params.id;
  if (studentId.value) {
    try {
      studentData.value = await store.dispatch(
        'fetchStudentById',
        studentId.value,
      );
    } catch (error) {
      console.error('Error fetching student data:', error);
    }
  }
});

const handleReset = () => {
  resetForm();
  router.push('/');
};
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
