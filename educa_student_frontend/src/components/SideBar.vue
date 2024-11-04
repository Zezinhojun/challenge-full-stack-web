<template>
  <v-navigation-drawer v-model="localDrawer">
    <v-container
      class="d-none d-md-flex justify-center align-center bg-grey-darken-3"
    >
      <p class="text-h7 text-center">Academic Module</p>
    </v-container>
    <v-list
      density="compact"
      nav
      class="d-flex flex-column justify-center ga-3"
    >
      <v-list-item
        class=""
        v-for="item in items"
        :key="item.title"
        :class="['sidebar-options', { active: isActive(item) }]"
        @click="navigateTo(item)"
        :prepend-icon="item.prependIcon"
        :title="item.title"
        link
      />
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
import { computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
const router = useRouter();
const route = useRoute();
const emit = defineEmits(['update:modelValue']);

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
  items: {
    type: Array,
    required: true,
  },
});

const localDrawer = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
});

const navigateTo = (item) => {
  router.push(item.route);
};

const isActive = (item) => {
  return route.path === item.route;
};
</script>

<style>
.sidebar-options.active {
  background-color: #e0e0e0 !important;
  border-color: tomato !important;
  color: #333 !important;
}
</style>
