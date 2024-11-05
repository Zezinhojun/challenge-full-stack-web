<template>
  <div class="d-flex justify-center justify-md-end align-center w-75">
    <v-btn color="success" aria-label="Save Student" class="me-4" type="submit">
      Save
    </v-btn>
    <v-btn color="error" aria-label="Cancel Action" @click="reset">
      Cancel
    </v-btn>
  </div>
</template>

<script setup>
const emit = defineEmits(['reset']);

const reset = () => {
  emit('reset');
};
</script>
