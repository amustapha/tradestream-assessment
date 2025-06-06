<template>
  <div class="space-y-8 flex flex-col xl:flex-row xl:flex-row-reverse gap-8">
    <div
      class="gap-2 mt-8 xl:w-96 bg-gray-900 rounded-lg p-4 flex flex-col justify-between flex-shrink-0"
    >
      <p>
        Test out what stoploss would be ideal in order to minimize the losses
        and maximize wins.
      </p>
      <div class="flex flex-col md:flex-row justify-between xl:flex-col">
        <div class="flex-grow">
          <p class="text-lg font-bold">Current stats:</p>
          <div class="grid grid-cols-2 gap-2">
            <StatDisplay label="Value per trade">
              {{ formatMoney(expectedValuePerTrade(props.chartData.trades)) }}
            </StatDisplay>
            <StatDisplay label="Win rate">
              {{ formatPercentage(winRate(props.chartData.trades)) }}
            </StatDisplay>
            <StatDisplay label="Number of trades">
              {{ props.chartData.trades.length }}
            </StatDisplay>
            <StatDisplay label="Total profit">
              {{ formatMoney(totalProfit(props.chartData.trades)) }}
            </StatDisplay>
          </div>
        </div>

        <hr class="my-8" />
        <div
          class="flex-grow md:border-l border-gray-700 pl-0 md:pl-8 lg:pl-16 xl:pl-0 xl:border-l-0"
        >
          <p class="text-lg font-bold">Estimated improvements:</p>
          <div class="grid grid-cols-2 gap-2">
            <StatDisplay label="Value per trade">
              {{ formatMoney(expectedValuePerTrade(tradesWithStoploss)) }}
              <Delta
                :base="expectedValuePerTrade(props.chartData.trades)"
                :optimized="expectedValuePerTrade(tradesWithStoploss)"
              />
            </StatDisplay>
            <StatDisplay label="Win rate">
              {{ formatPercentage(winRate(tradesWithStoploss)) }}
              <Delta
                :base="winRate(props.chartData.trades)"
                :optimized="winRate(tradesWithStoploss)"
              />
            </StatDisplay>
            <StatDisplay label="Number of trades">
              {{ tradesWithStoploss.length }}
              <Delta
                :base="props.chartData.trades.length"
                :optimized="tradesWithStoploss.length"
              />
            </StatDisplay>
            <StatDisplay label="Total profit">
              {{ formatMoney(totalProfit(tradesWithStoploss)) }}
              <Delta
                :base="totalProfit(props.chartData.trades)"
                :optimized="totalProfit(tradesWithStoploss)"
              />
            </StatDisplay>
          </div>
        </div>
      </div>
      <div class="flex flex-col gap-2 my">
        <p class="text-sm">Stoploss Value:</p>
        <div class="relative">
          <input
            v-model="stoplossValue"
            :min="minRange"
            :max="maxRange"
            type="number"
            class="bg-gray-800 w-full rounded-sm ring-0 focus:ring-0 focus:ring-offset-0 focus:border-primary-500 p-2 appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none border-0 outline-none pr-8"
          />
          <span class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            >&percnt;</span
          >
        </div>
      </div>
    </div>
    <div class="flex-grow">
      <TradeScatterPlot
        v-model:treshold="stoplossValue"
        :chart-data="chartData"
        :min-range="minRange"
        :max-range="maxRange"
      />
    </div>
  </div>
  <div class="grid lg:grid-cols-2 my-8 gap-8">
    <ProfitLineChart
      :real-trades="props.chartData.trades"
      :simulated-trades="tradesWithStoploss"
    />

    <EvXMae
      :mae-levels="props.chartData.mae_levels"
      :ev-values="props.chartData.ev_by_mae"
    />
  </div>
</template>

<script setup lang="ts">
  import TradeScatterPlot from "./TradeScatterPlot.vue";
  import Delta from "../display/Delta.vue";
  import ProfitLineChart from "./ProfitLineChart.vue";
  import EvXMae from "./EvXMae.vue";

  import { computed, onMounted, ref, watch } from "vue";
  import { ChartData, Trade } from "../../types/chart.types";
  import StatDisplay from "../display/StatDisplay.vue";
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

  const tradesWithStoploss = computed(() => {
    return props.chartData.trades.map((trade) => {
      if (trade.mae_percent <= stoplossValue.value / 100) {
        return trade;
      } else {
        const pnl_without_fees = trade.pnl_usd - trade.fees;
        const new_pnl =
          Math.abs(pnl_without_fees * (stoplossValue.value / 100 / trade.mae_percent)) +
          trade.fees;

        return {
          ...trade,
          pnl_usd: new_pnl,
        };
      }
    });
  });

  const winRate = (trades: Trade[]): number => {
    return (
      (trades.filter((trade) => trade.pnl_usd > 0).length / trades.length) * 100
    );
  };

  const expectedValuePerTrade = (trades: Trade[]): number => {
    return (
      trades.reduce((acc, trade) => acc + trade.pnl_usd, 0) / trades.length
    );
  };

  const totalProfit = (trades: Trade[]): number => {
    return trades.reduce((acc, trade) => acc + trade.pnl_usd, 0);
  };

  watch(stoplossValue, (value) => {
    if (value > maxRange.value) {
      console.error("Stoploss value is greater than max range");
    } else if (value < minRange.value) {
      console.error("Stoploss value is less than min range");
    }
  });

  const getBestStoploss = (): number => {
    let best_stop_loss_percentage = 0;
    let profit_at_best_stop_loss = 0;
    for (const level of props.chartData.mae_levels) {
      const trades_with_stoploss_at_level = props.chartData.trades.filter(
        (trade) => trade.mae_percent <= level
      );
      const profit = totalProfit(trades_with_stoploss_at_level);
      if (profit > profit_at_best_stop_loss) {
        best_stop_loss_percentage = level;
        profit_at_best_stop_loss = profit;
      }
    }
    return best_stop_loss_percentage * 100;
  };

  onMounted(() => {
    stoplossValue.value = getBestStoploss();
  });
</script>
