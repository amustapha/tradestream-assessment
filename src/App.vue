<script setup>
  import HelloWorld from "./components/HelloWorld.vue";
  import TNavbar from "./components/TNavbar.vue";
</script>

<template>
  <div class="flex w-screen">
    <TNavbar />
    <main class=" grow flex-1 p-4">
      <HelloWorld msg="" />
    </main>
  </div>
</template>
