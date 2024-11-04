<template>
  <v-app-bar class="ps-4 border-b" flat>
    <v-app-bar-nav-icon
      v-if="$vuetify.display.mdAndDown"
      @click="onToggleDrawer"
    />
    <div class="border cursor-pointer" style="width: 110px; cursor: pointer">
      <v-app-bar-title class="ml-7" @click="navigateToHome()"
        >LOGO</v-app-bar-title
      >
    </div>
    <template #append>
      <v-btn class="text-none me-2" height="48" icon slim>
        <v-avatar
          color="surface-light"
          image="https://cdn.vuetifyjs.com/images/john.png"
          size="32"
        />
        <v-menu activator="parent">
          <v-list density="compact" nav>
            <v-list-item
              :append-icon="logged ? 'mdi-logout' : 'mdi-login'"
              link
              :title="logged ? 'Logout' : 'Login'"
              @click="handleAuthAction"
            />
          </v-list>
        </v-menu>
      </v-btn>
    </template>
  </v-app-bar>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();
const navigateToHome = () => {
  router.push('/');
};
const props = defineProps({
  logged: {
    type: Boolean,
    required: true,
  },
  toggleDrawer: {
    type: Function,
    required: true,
  },
});

const onToggleDrawer = () => {
  props.toggleDrawer();
};

const handleAuthAction = () => {
  if (!props.logged) {
    router.push('/login');
  }
  console.log('User logged out!');
};
</script>
