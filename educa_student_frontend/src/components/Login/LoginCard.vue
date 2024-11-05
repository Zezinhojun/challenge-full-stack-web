<template>
  <v-card
    class="border pa-7"
    elevation="8"
    rounded="lg"
    width="300px"
    :height="props.isLoginMode ? '400px' : '470px'"
  >
    <slot name="title"></slot>
    <slot name="form"></slot>
    <slot name="footer"></slot>
  </v-card>
</template>

<script setup>
const props = defineProps({
  isLoginMode: {
    type: Boolean,
    required: true,
  },
});
</script>
