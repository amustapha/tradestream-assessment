<script setup>
  import { ref } from "vue";

  defineProps({
    msg: String,
  });

  const count = ref(0);
</script>

<template>
  <h1 class="text-3xl font-bold text-sematic-red-500">Hello world!</h1>

  <p class="text-3xl font-bold bg-sematic-orange ">Sign in</p>
</template>
