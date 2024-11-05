<template>
  <v-dialog v-model="localVisible" max-width="500">
    <template v-slot:default>
      <v-card :title="props.title">
        <v-card-text>
          {{ props.message }}
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="$emit('cancel')">Cancel</v-btn>
          <v-btn text color="error" @click="$emit('confirm')">Confirm</v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<script setup>
import { defineProps, ref, watch } from 'vue';

const props = defineProps({
  visible: {
    type: Boolean,
    required: true,
  },
  title: {
    type: String,
    default: 'Confirm Deletion',
  },
  message: {
    type: String,
    default: 'Are you sure you want to proceed?',
  },
});

const localVisible = ref(props.visible);

watch(
  () => props.visible,
  (newValue) => {
    localVisible.value = newValue;
  },
);
</script>
