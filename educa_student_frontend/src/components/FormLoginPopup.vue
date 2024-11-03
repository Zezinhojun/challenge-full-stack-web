<template>
  <v-dialog
    :model-value="modelValue"
    @update:model-value="$emit('update:modelValue', $event)"
    max-width="600"
  >
    <v-sheet mx-auto class="d-flex flex-column">
      <v-form fast-fail @submit.prevent>
        <v-text-field v-model="firstName" label="Name" required />
        <v-text-field v-model="firstName" label="Email" required />
        <v-text-field v-model="firstName" label="Password" required />
        <v-btn
          class="mt-2"
          text="Submit"
          @click="$emit('update:modelValue', false)"
        >
        </v-btn>
      </v-form>
    </v-sheet>
  </v-dialog>
</template>

<script>
export default {
  props: {
    modelValue: {
      type: Boolean,
      required: true,
    },
  },
};
</script>
