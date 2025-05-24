<template>
  <div class="mt-8 relative bg-gray-900 rounded-lg p-4">
    <highcharts :options="chartOptions" />
    <div class="w-full pl-16">
      <input
        type="range"
        v-model="treshold"
        :min="minRange"
        :max="maxRange"
        class="w-full"
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

  const treshold = computed({
    get: () => props.treshold,
    set: (value) => emit("update:treshold", value),
  });

  const calculatePointSize = (pnl: number) => {
    const absPnl = Math.abs(pnl * 100);
    return Math.max(3, Math.min(10, 3 + absPnl / 2));
  };

  const chartOptions = computed(() => ({
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
          states: {
            hover: {
              enabled: true,
              lineColor: "rgb(100,100,100)",
            },
          },
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
          pointFormat: "MAE: {point.x:.2f}%<br>PNL: {point.y:.2f}%<br>Size: {point.marker.radius}",
        },
      },
    },
    series: [
      {
        name: "Profitable Trades",
        color: "#7AE2B7",
        data: props.chartData.trades
          .filter((trade) => trade.pnl_percent > 0)
          .map((trade) => ({
            x: trade.mae_percent * 100,
            y: trade.pnl_percent * 100,
            marker: {
              radius: calculatePointSize(trade.pnl_percent)
            }
          })),
      },
      {
        name: "Losing Trades",
        color: "#E25C75",
        data: props.chartData.trades
          .filter((trade) => trade.pnl_percent <= 0)
          .map((trade) => ({
            x: trade.mae_percent * 100,
            y: trade.pnl_percent * 100,
            marker: {
              radius: calculatePointSize(trade.pnl_percent)
            }
          })),
      },
    ],
  }));
</script>
