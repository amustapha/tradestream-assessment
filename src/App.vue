<script setup>
import TNavbar from "./components/TNavbar.vue";
import HighchartDemo from "./components/HighchartDemo.vue";
  
</script>

<template>
  <div class="flex w-screen overflow-y-hidden max-h-screen">
    <TNavbar />
    <main class="grow flex-1 p-4 px-8 lg:px-16 overflow-y-auto">
      <HighchartDemo />
    </main>
  </div>
</template>
