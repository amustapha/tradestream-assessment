<template>
  <div class="flex flex-col gap-2 relative my-2">
    <p class="text-sm">{{ label }}</p>
    <h2 class="text-2xl -mt-4 font-bold text-primary-500">
      <slot />
    </h2>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  label: string;
}>();
</script> 