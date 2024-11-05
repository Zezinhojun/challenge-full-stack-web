<template>
  <div>
    <StudentListHeader
      :students-count="students.length"
      v-model:search="search"
      @new-student="newStudent"
    />
    <v-data-table
      v-if="students.length > 0"
      v-model:sort-by="sortBy"
      :headers="headers"
      :items="students"
      :search="search"
      class="custom-table"
    >
      <template #[`item.action`]="{ item }">
        <div class="d-flex justify-start ga-2">
          <v-tooltip text="Edit">
            <template #activator="{ props }">
              <v-btn
                v-bind="props"
                size="x-small"
                color="primary"
                class="d-flex justify-center align-center"
                @click="editItem(item.id)"
              >
                <v-icon icon="mdi-pencil" class="" />
              </v-btn>
            </template>
          </v-tooltip>

          <v-tooltip text="Remove">
            <template #activator="{ props }">
              <v-btn
                v-bind="props"
                size="x-small"
                color="error"
                class="d-flex justify-center align-center"
                @click="confirmDelete(item.id)"
              >
                <v-icon icon="mdi-delete" />
              </v-btn>
            </template>
          </v-tooltip>
        </div>
      </template>
    </v-data-table>
    <Snackbar
      :message="snackbar.message"
      :type="snackbar.type"
      v-model:show="snackbar.show"
    />
    <ConfirmationDialog
      v-model:visible="dialogVisible"
      title="Confirm Deletion"
      message="Are you sure you want to delete this student?"
      @confirm="deleteItem(selectedStudentId)"
      @cancel="dialogVisible = false"
    />
  </div>
</template>
<script setup>
import ConfirmationDialog from '@/components/ConfirmationDialog.vue';
import Snackbar from '@/components/Snackbar.vue';
import StudentListHeader from '@/components/StudentList/StudentListHeader.vue';
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

const router = useRouter();
const store = useStore();
const search = ref('');
const sortBy = ref([{ key: 'ra', order: 'asc' }]);
const dialogVisible = ref(false);
const selectedStudentId = ref(null);
const snackbar = ref({
  show: false,
  message: '',
  type: 'success',
});

const headers = [
  { title: 'Registro Academico', key: 'ra' },
  { title: 'Nome', key: 'name' },
  { title: 'CPF', key: 'cpf' },
  { title: 'Ações', key: 'action' },
];
const students = computed(() => store.getters.getStudents || []);

const showSnackbar = (message, type = 'success') => {
  snackbar.value.message = message;
  snackbar.value.type = type;
  snackbar.value.show = true;
};

const confirmDelete = (studentId) => {
  selectedStudentId.value = studentId;
  dialogVisible.value = true;
};

const deleteItem = async (studentId) => {
  try {
    await store.dispatch('removeStudent', studentId);
    showSnackbar('Student removed successfully!', 'success');
  } catch (error) {
    console.error('Error removing student:', error);
    showSnackbar('Failed to remove student. Please try again.', 'error');
  } finally {
    dialogVisible.value = false;
  }
};
const editItem = (studentId) => {
  router.push(`/studentForm/${studentId}`);
};

const newStudent = () => {
  router.push('/studentForm');
};
</script>

<style>
.custom-table {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  height: auto;
  max-height: 70vh;
}
.custom-table th {
  background-color: #424242;
}

.custom-table tr:nth-child(even) {
  background-color: #42424260;
}
</style>
