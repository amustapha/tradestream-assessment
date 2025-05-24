<script setup lang="ts">
import { inject, onMounted } from "vue";
  
  import TNavbar from "./components/TNavbar.vue";
  import HighchartDemo from "./components/HighchartDemo.vue";
  import { ChartDataApiService } from "./services";

  const chartDataApiService = inject(
    "chartDataApiService"
  ) as ChartDataApiService;

  onMounted(async () => {
    const chartData = await chartDataApiService.getChartData();
    console.log(chartData);
  });
</script>

<template>
  <div class="flex w-screen overflow-y-hidden max-h-screen">
    <TNavbar />
    <main class="grow flex-1 p-4 px-8 lg:px-16 overflow-y-auto">
      <HighchartDemo />
    </main>
  </div>
</template>
