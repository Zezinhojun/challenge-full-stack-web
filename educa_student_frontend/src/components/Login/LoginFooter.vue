<template>
  <div>
    <p class="text-caption">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi, molestiae
      eligendi
    </p>
  </div>
  <div>
    <p class="text-caption">
      Create a new account?
      <strong @click="toggledMode" class="text-primary cursor-pointer">
        Click here
      </strong>
    </p>
  </div>
</template>

<script setup>
const emit = defineEmits(['toggle']);

const toggledMode = () => {
  emit('toggle');
};
</script>
