<template>
  <v-container class="d-none d-md-flex justify-center align-center bg-grey-darken-3">
    <p class="text-h7 text-center">Modulo academico</p>
  </v-container>
  <v-list
  class="d-flex ga-5 flex-column pt-5">
    <v-list-item
    v-for="(option, index ) in options"
    :key="index"
    :class="['sidebar-options', {active: isActive(option)}]"
    @click="navigateTo(option)"
    class="sidebar-options d-flex flex-column rounded-s-lg">
    <v-list-item-content class="sidebar-option d-flex align-center px-3 py-4 cursor-pointer ga-4 ">
      <v-icon icon="$vuetify"></v-icon> <p class="text-caption d-md-block d-none">
        {{ option.title }}
      </p>
    </v-list-item-content>
  </v-list-item>
</v-list>
</template>

<script>
export default{
  data(){
    return{
      options: [
        { title: 'Alunos' , route: '/studentList'},
        { title: 'Cadastro de alunos', route:'/studentForm' },
      ],
      activeOption: null,
    }
  },

  methods:{
    navigateTo(option){
      this.$router.push(option.route)
      this.setActive(option)
    },
    setActive(option){
      this.activeOption = option;
    },
    isActive(option){
      return this.activeOption === option
}
  }
}
</script>
