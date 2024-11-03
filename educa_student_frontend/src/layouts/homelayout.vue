<template>
  <v-layout>
    <Navbar :logged="logged" :toggleDrawer="toggleDrawer" />
    <Sidebar :items="items" v-model="drawer" />
    <v-main>
      <div class="pa-4">
        <v-sheet border="dashed md" height="500" rounded="lg" width="100%">
          <router-view />
        </v-sheet>
      </div>
    </v-main>
  </v-layout>
</template>

<script setup>
import Navbar from '@/components/Navbar.vue';
import Sidebar from '@/components/SideBar.vue';
import { ref } from 'vue';

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
