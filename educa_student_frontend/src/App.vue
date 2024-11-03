<template>
  <v-app>
 <Navbar/>
  <v-navigation-drawer
    permanent class="d-flex flex-column border-e-md">
    <SideBar/>
  </v-navigation-drawer>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
</script>

<style>
.v-navigation-drawer{
  width: 12% !important;
}
.v-navigation-drawer .v-list{
  padding-left: 20%;
}
.sidebar-options.active{
  background-color: #E0E0E0 !important;
  border-color: tomato !important;
  color: #333 !important;
}

</style>
