<template>
  <div
    class="d-flex flex-column text-center flex-md-row justify-space-around mb-md-6 ga-3"
    :class="{ 'my-6': props.studentsCount === 0 }"
  >
    <v-text-field
      v-if="props.studentsCount > 0"
      v-model="searchValue"
      append-icon="mdi-magnify"
      label="Pesquisar"
      single-line
      hide-details
    >
    </v-text-field>
    <h1 class="text-h5" v-if="props.studentsCount === 0">
      There are no registered users
    </h1>
    <v-btn
      class="mb-4 mb-md-0"
      elevated
      color="grey-darken-2"
      :size="$vuetify.display.mdAndUp ? 'x-large' : 'small'"
      @click="emitNewStudent"
      >Student registration</v-btn
    >
  </div>
</template>
<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  studentsCount: Number,
  newStudent: Function,
  search: String,
});

const emit = defineEmits(['new-student', 'update:search']);
const searchValue = ref(props.search);

watch(searchValue, (newValue) => {
  emit('update:search', newValue);
});

const emitNewStudent = () => emit('new-student');
</script>
