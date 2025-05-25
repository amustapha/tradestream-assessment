<template>
  <div class="relative bg-gray-900 rounded-lg p-4">
    <highcharts :options="chartOptions" />
    <div class="absolute top-10 right-10">
      <button
        class="bg-gray-800 text-white px-4 py-2 rounded-l-lg hover:bg-gray-700"
        :class="{ 'bg-gray-600': pnlKey === 'pnl_percent' }"
        @click="togglePnlType('pnl_percent')"
      >
        PNL %
      </button>
      <button
        class="bg-gray-800 text-white px-4 py-2 rounded-r-lg hover:bg-gray-700"
        :class="{ 'bg-gray-600': pnlKey === 'pnl_usd' }"
        @click="togglePnlType('pnl_usd')"
      >
        PNL $
      </button>
    </div>
    <div class="w-full ml-2 pr-12 pl-16 absolute top-[calc(50%-3rem)]">
      <input
        type="range"
        v-model="treshold"
        :min="minRange"
        :max="maxRange"
        class="w-full rounded-lg bg-transparent appearance-none cursor-pointer custom-slider-thumb pr-1"
        step="0.1"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed, ref } from "vue";
  import { ChartData } from "../../types/chart.types";

  const props = defineProps<{
    chartData: ChartData;
    treshold: number;
    minRange: number;
    maxRange: number;
  }>();

  const emit = defineEmits<{
    (e: "update:treshold", value: number): void;
  }>();
  const pnlKey = ref<"pnl_percent" | "pnl_usd">("pnl_percent");

  const treshold = computed({
    get: () => props.treshold,
    set: (value) => emit("update:treshold", value),
  });

  const calculatePointSize = (pnl: number) => {
    if (pnlKey.value === "pnl_percent") {
      const absPnl = Math.abs(pnl * 100);
      return Math.max(3, Math.min(10, 3 + absPnl / 2));
    } else {
      // scale the pnl_usd to the same range as pnl_percent
      const maxPnl = Math.max(
        ...props.chartData.trades.map((trade) => trade.pnl_usd)
      );
      const minPnl = Math.min(
        ...props.chartData.trades.map((trade) => trade.pnl_usd)
      );

      if (maxPnl === minPnl) {
        return 6.5;
      }

      if (pnl <= minPnl) {
        return 3;
      }

      if (pnl >= maxPnl) {
        return 13;
      }

      const position = (pnl - minPnl) / (maxPnl - minPnl);

      return 3 + position * 10;
    }
  };

  const chartOptions = computed(() => ({
    credits: {
      enabled: false,
    },
    chart: {
      type: "scatter",
      backgroundColor: "#262627",
      borderRadius: 10,
      height: "60%",
    },
    title: {
      text: "Trade MAE vs PNL Analysis",
      style: {
        color: "white",
      },
      align: "left",
      margin: 32,
    },
    xAxis: {
      title: {
        text: "MAE (%)",
        style: {
          color: "white",
        },
      },
      labels: {
        style: {
          color: "white",
        },
      },
      gridLineColor: "#333",
      plotLines: [
        {
          value: Number(treshold.value),
          color: "#fff",
          width: 2,
          dashStyle: "solid",
          zIndex: 5,
          draggable: true,
          dragHandle: {
            className: "highcharts-drag-handle",
            color: "#fff",
            cursor: "ew-resize",
            lineWidth: 2,
            lineColor: "#666",
            symbol: "circle",
            radius: 6,
          },
          events: {
            drag: function (e: { newValue: number }) {
              treshold.value = e.newValue;
            },
          },
        },
      ],
    },
    yAxis: {
      title: {
        text: "PNL (%)",
        style: {
          color: "white",
        },
      },
      labels: {
        style: {
          color: "white",
        },
      },
      gridLineColor: "#333",
    },
    legend: {
      enabled: false,
    },
    plotOptions: {
      scatter: {
        marker: {
          symbol: "circle",
          lineWidth: 2,
          fillColor: "transparent",
        },
        states: {
          hover: {
            marker: {
              enabled: false,
            },
          },
        },
        tooltip: {
          headerFormat: "<b>{series.name}</b><br>",
          pointFormat:
            "MAE: {point.x:.2f}%<br>PNL: {point.y:.2f}%<br>Size: {point.marker.radius}",
        },
      },
    },
    series: [
      {
        name: "Profitable Trades",
        data: props.chartData.trades
          .filter((trade) => trade[pnlKey.value] > 0)
          .map((trade) => ({
            x: trade.mae_percent * 100,
            y: trade[pnlKey.value] * 100,
            marker: {
              radius: calculatePointSize(trade[pnlKey.value]),
              lineWidth: 3,
              lineColor: "#7AE2B7",
              fillColor: "transparent",
            },
          })),
      },
      {
        name: "Losing Trades",
        data: props.chartData.trades
          .filter((trade) => trade[pnlKey.value] <= 0)
          .map((trade) => ({
            x: trade.mae_percent * 100,
            y: trade[pnlKey.value] * 100,
            marker: {
              radius: calculatePointSize(trade[pnlKey.value]),
              lineWidth: 3,
              lineColor: "#E25C75",
              fillColor: "transparent",
            },
          })),
      },
    ],
  }));

  const togglePnlType = (key: "pnl_percent" | "pnl_usd") => {
    pnlKey.value = key;
  };
</script>
