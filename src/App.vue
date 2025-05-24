<script setup>
  import HelloWorld from "./components/HelloWorld.vue";
  import TNavbar from "./components/TNavbar.vue";
</script>

<template>
  <div class="flex w-screen overflow-y-hidden max-h-screen">
    <TNavbar />
    <main class="grow flex-1 p-4 px-8 lg:px-16 overflow-y-auto">
      <HelloWorld id="title" title="Welcome to the app!" />
      <HelloWorld id="second-title" title="Another Section" />
      <HelloWorld id="third-title" title="Another Section With Long Title" />
      <HelloWorld id="fourth-title" title="This is another title" />
      <HelloWorld id="final-title" title="This is the final title" />
    </main>
  </div>
</template>
