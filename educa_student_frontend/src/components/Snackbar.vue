<template>
  <v-snackbar
    location="right top"
    v-model="visible"
    :timeout="timeout"
    top
    :color="snackbarColor"
  >
    {{ props.message }}
  </v-snackbar>
</template>

<script setup>
import { computed, ref, watch } from 'vue';

const props = defineProps({
  message: {
    type: String,
    default: '',
  },
  type: {
    type: String,
    default: 'success',
  },
  timeout: {
    type: Number,
    default: 3000,
  },
  show: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['update:show']);

const visible = ref(props.show);

watch(
  () => props.show,
  (newValue) => (visible.value = newValue),
);

const snackbarColor = computed(() =>
  props.type === 'error' ? 'error' : 'success',
);

watch(visible, (newValue) => {
  if (!newValue) emit('update:show', false);
});
</script>
