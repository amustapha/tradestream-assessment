<template>
    <highcharts :options="chartOptions" />
    <div class="w-full pl-16">
      <input type="range" v-model="treshold" :min="minRange" :max="maxRange" class="w-full" />
      <span>{{ treshold }}</span>
    </div>
</template>

<script setup lang="ts">
  import { computed, ref } from "vue";
  import { ChartData } from "../../types/chart.types";

  const props = defineProps<{
    chartData: ChartData;
  }>();

  const treshold = ref(5);

  const minRange = computed(() => Math.min(...props.chartData.trades.map(trade => trade.mae_percent)) * 100);
  const maxRange = computed(() => Math.max(...props.chartData.trades.map(trade => trade.mae_percent)) * 100);


  const chartOptions = computed(() => ({
    chart: {
      type: "scatter",
      backgroundColor: "#262627",
      borderRadius: 10,
      height: "40%",
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
      plotLines: [{
        value: Number(treshold.value),
        color: '#fff',
        width: 2,
        dashStyle: 'solid',
        zIndex: 5,
        draggable: true,
        dragHandle: {
          className: 'highcharts-drag-handle',
          color: '#fff',
          cursor: 'ew-resize',
          lineWidth: 2,
          lineColor: '#666',
          symbol: 'circle',
          radius: 6
        },
        events: {
          drag: function(e: { newValue: number }) {
            treshold.value = e.newValue;
          }
        }
      }]
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
          radius: 5,
          symbol: 'circle',
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
          pointFormat: "MAE: {point.x:.2f}%<br>PNL: {point.y:.2f}%",
        },
      },
    },
    series: [
      {
        name: "Profitable Trades",
        color: "#7AE2B7",
        data: props.chartData.trades
          .filter((trade) => trade.pnl_percent > 0)
          .map((trade) => [trade.mae_percent * 100, trade.pnl_percent * 100]),
      },
      {
        name: "Losing Trades",
        color: "#E25C75",
        data: props.chartData.trades
          .filter((trade) => trade.pnl_percent <= 0)
          .map((trade) => [trade.mae_percent * 100, trade.pnl_percent * 100]),
      },
     
    ],
  }));
</script>
