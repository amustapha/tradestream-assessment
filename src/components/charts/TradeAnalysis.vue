<template>
  <div class="space-y-8 flex gap-8">
    <div class="flex-grow">
      <TradeScatterPlot
        v-model:treshold="stoplossValue"
        :chart-data="chartData"
        :min-range="minRange"
        :max-range="maxRange"
      />
    </div>
    <div
      class="gap-2 w-80 bg-gray-900 rounded-lg p-4 flex flex-col justify-between"
    >
      <p>
        With this chart, you can test out what stoploss would be ideal in order
        to minimize the losses and maximize wins.
      </p>

      <div class="flex flex-col gap-2 my">
        <p>Current expected value per trade:</p>
        <h2 class="text-2xl font-bold text-primary-500">
          {{ expectedValuePerTrade(trades) }}
        </h2>
      </div>
      <div class="flex flex-col gap-2 my">
        <p>Expected value after implementing new stoploss:</p>
        <h2 class="text-2xl font-bold text-primary-500">
          {{ expectedValuePerTrade(trades) }}
        </h2>
      </div>
      <div class="flex flex-col gap-2 my">
        <p>Stoploss Value:</p>
        <input
          v-model="stoplossValue"
          :min="minRange"
          :max="maxRange"
          type="number"
          class="bg-gray-800 rounded-sm ring-0 focus:ring-0 focus:ring-offset-0 focus:border-primary-500 p-2 appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none border-0 outline-none"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed, ref, watch } from "vue";
  import { ChartData } from "../../types/chart.types";
  import TradeScatterPlot from "./TradeScatterPlot.vue";
  import { Trade } from "../../types/chart.types";

  const props = defineProps<{
    chartData: ChartData;
  }>();

  const stoplossValue = ref(0);

  const trades = computed(() => props.chartData.trades);
  const minRange = computed(
    () =>
      Math.min(...props.chartData.trades.map((trade) => trade.mae_percent)) *
      100
  );
  const maxRange = computed(
    () =>
      Math.max(...props.chartData.trades.map((trade) => trade.mae_percent)) *
      100
  );
  const expectedValuePerTrade = computed(() => {
    return (trades: Trade[]) => {
      return (
        trades.reduce((acc, trade) => acc + trade.pnl_usd, 0) / trades.length
      );
    };
  });

  watch(stoplossValue, (value) => {
    // TODO: Add a toast notification to the user
    if (value > maxRange.value) {
      console.error("Stoploss value is greater than max range");
    } else if (value < minRange.value) {
      console.error("Stoploss value is less than min range");
    }
  });


</script>
