<template>
  <div class="flex w-screen overflow-y-hidden max-h-screen">
    <TNavbar />
    <main class="grow flex-1 p-4 px-8 lg:px-16 overflow-y-auto">
      <TradeAnalysis v-if="chartData" :chart-data="chartData" />
    </main>
  </div>
  <FullPageLoader />
</template>

<script setup lang="ts">
  import { inject, onMounted, ref } from "vue";
  import FullPageLoader from "./components/FullPageLoader.vue";
  import TNavbar from "./components/TNavbar.vue";
  import TradeAnalysis from "./components/charts/TradeAnalysis.vue";

  import { ChartDataApiService } from "./services";
  import { ChartData } from "./types/chart.types";


  const chartDataApiService = inject(
    "chartDataApiService"
  ) as ChartDataApiService;

  const chartData = ref<ChartData | null>(null);

  const getChartData = async () => {
    chartData.value = (await chartDataApiService.getChartData()).data;
  };

  onMounted(async () => {
    await getChartData();
  });
</script>
