<template>
  <div class="space-y-8">
    <TradeScatterPlot :chart-data="chartData" />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { ChartData } from "../../types/chart.types";
import TradeScatterPlot from "./TradeScatterPlot.vue";

const props = defineProps<{
  chartData: ChartData;
}>();

const trades = computed(() => props.chartData.trades);
</script>
