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
      class="gap-2 w-96 bg-gray-900 rounded-lg p-4 flex flex-col justify-between"
    >
      <p>
        Test out what stoploss would be ideal in order to minimize the losses
        and maximize wins.
      </p>

      <div>
        <p class="text-lg font-bold">Current stats:</p>
w
        <div class="grid grid-cols-2 gap-2">
          <StatDisplay label="Value per trade">
            {{ expectedValuePerTrade(props.chartData.trades) }}
          </StatDisplay>
          <StatDisplay label="Win rate">
            {{ winRate(props.chartData.trades) }}
          </StatDisplay>
          <StatDisplay label="Number of trades">
            {{ props.chartData.trades.length }}
          </StatDisplay>
          <StatDisplay label="Total profit">
            {{ totalProfit(props.chartData.trades) }}
          </StatDisplay>
        </div>
      </div>

      <hr class="my-2" />
      <div>
        <p class="text-lg font-bold">Estimated improvements:</p>
        <div class="grid grid-cols-2 gap-2">
          <StatDisplay label="Value per trade">
            {{ expectedValuePerTrade(tradesWithStoploss) }}
          </StatDisplay>
          <StatDisplay label="Win rate">
            {{ winRate(tradesWithStoploss) }}
          </StatDisplay>
          <StatDisplay label="Number of trades">
            {{ tradesWithStoploss.length }}
          </StatDisplay>
          <StatDisplay label="Total profit">
            {{ totalProfit(tradesWithStoploss) }}
          </StatDisplay>
        </div>
      </div>
      <div class="flex flex-col gap-2 my">
        <p class="text-sm">Stoploss Value:</p>
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
  import StatDisplay from "./StatDisplay.vue";
  import { formatMoney, formatPercentage } from "../../utils/filters";

  const props = defineProps<{
    chartData: ChartData;
  }>();

  const stoplossValue = ref(5);

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
      return formatMoney(
        trades.reduce((acc, trade) => acc + trade.pnl_usd, 0) / trades.length
      );
    };
  });

  const winRate = computed(() => {
    return (trades: Trade[]) => {
      return formatPercentage(
        (trades.filter((trade) => trade.pnl_usd > 0).length / trades.length) *
          100
      );
    };
  });

  const totalProfit = computed(() => {
    return (trades: Trade[]) => {
      return formatMoney(trades.reduce((acc, trade) => acc + trade.pnl_usd, 0));
    };
  });

  const tradesWithStoploss = computed(() => {
    return props.chartData.trades.filter(
      (trade) => trade.mae_percent <= stoplossValue.value / 100
    );
  });

  watch(stoplossValue, (value) => {
    if (value > maxRange.value) {
      console.error("Stoploss value is greater than max range");
    } else if (value < minRange.value) {
      console.error("Stoploss value is less than min range");
    }
  });
</script>
