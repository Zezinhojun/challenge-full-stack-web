<template>
  <v-app-bar flat class="border-b">
    <v-app-bar-title class="pl-10">
      LOGO
    </v-app-bar-title>
    <v-spacer></v-spacer>
    <v-avatar
      class="mr-4 cursor-pointer"
      @click="showDialog = true"
    >
      <v-img
        alt="John"
        src="https://cdn.vuetifyjs.com/images/john.jpg"
      ></v-img>
    </v-avatar>
    <login-popup v-model="showDialog" />
  </v-app-bar>
</template>

<script>
import LoginPopup from './LoginPopup.vue'

export default {
  components: {
    LoginPopup
  },
  data: () => ({
    showDialog: false
  })
}
</script>
