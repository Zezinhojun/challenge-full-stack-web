<template>
  <v-layout>
    <Navbar :logged="logged" :toggleDrawer="toggleDrawer" />
    <Sidebar :items="items" v-model="drawer" />
    <v-main>
      <div class="pa-1">
        <v-sheet class="px-2 py-2 px-md-8 py-md-10" rounded="lg" width="100%">
          <v-app-bar v-if="$vuetify.display.mdAndUp">
            <v-app-bar-title flat density="compact" class="text-center">
              {{ pageTitle }}
            </v-app-bar-title>
          </v-app-bar>
          <router-view />
        </v-sheet>
      </div>
    </v-main>
  </v-layout>
</template>

<script setup>
import Navbar from '@/components/Navbar.vue';
import Sidebar from '@/components/SideBar.vue';
import { ref, watchEffect } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const pageTitle = ref('');

watchEffect(() => {
  pageTitle.value = route.meta.title || 'Default title';
});
const drawer = ref(true);
const logged = false;
const items = ref([
  {
    title: 'Dashboard',
    route: '/studentList',
    prependIcon: 'mdi-view-dashboard-outline',
  },
  {
    title: 'Registration',
    route: '/studentForm',
    prependIcon: 'mdi-account-group',
  },
]);

const toggleDrawer = () => {
  drawer.value = !drawer.value;
};
</script>

<style>
.v-main .v-sheet {
  height: 85.9vh;
}

@media (max-width: 795px) {
  .v-main .v-sheet {
    height: 87vh;
  }
}
</style>
