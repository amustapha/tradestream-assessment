<script setup lang="ts">
  import { computed } from "vue";
  import { useLoaderStore } from "../stores/loader";

  const loaderStore = useLoaderStore();

  const isLoading = computed(() => loaderStore.isLoading);
  const currentLoader = computed(() => loaderStore.currentLoader);
</script>

<template>
  <div v-if="isLoading">
    <div
      class="flex flex-col gap-8 justify-center items-center h-screen w-screen absolute top-0 left-0 bg-black/50 backdrop-blur-sm z-50"
    >
      <div
        class="animate-spin rounded-full size-24 border-t-2 border-b-2 border-primary-500"
      ></div>
      <p class="text-2xl font-bold">{{ currentLoader }}</p>
    </div>
  </div>
</template>
