<template>
  <div>
    <span :class="delta.color" class="flex items-center gap-1 text-sm">
      <component :is="delta.icon" class="size-4" />
      {{ formatPercentage(change) }}
    </span>
  </div>
</template>

<script setup lang="ts">
  import { computed } from "vue";
  import { ArrowTrendingUpIcon, ArrowTrendingDownIcon } from "@heroicons/vue/24/outline";
  import { formatPercentage } from "../../utils/filters";
  const props = defineProps<{
    base: number;
    optimized: number;
  }>();

  const change = computed(() => {
    return ((props.optimized - props.base) / props.base) * 100;
  });

  const delta = computed(() => {
    if (change.value >= 0) {
      return { color: "text-heatmap-green-100", icon: ArrowTrendingUpIcon };
    }
    return { color: "text-heatmap-red-100", icon: ArrowTrendingDownIcon };
  });
</script>

<style scoped></style>
