<template>
  <div>
    <pre>{{ chartData }}</pre>
  </div>
</template>

<script setup lang="ts">
  import { ChartData } from "../../types/chart.types";

  const props = defineProps<{
    chartData: ChartData;
  }>();
</script>
