<template>
  <div class="relative bg-gray-900 rounded-lg p-4">
    <highcharts :options="chartOptions" />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  maeLevels: number[];
  evValues: number[];
}>();

const chartOptions = computed(() => {
  return {
    chart: {
      type: "spline",
      backgroundColor: "#262627",
      borderRadius: 10,
      height: "75%",
    },
    title: {
      text: "Expected Value by MAE Level",
      style: {
        color: "white",
      },
      align: "left",
      margin: 32,
    },
    legend: {
      itemStyle: {
        color: 'white'
      },
      symbolWidth: 12,
      symbolHeight: 12,
      symbolRadius: 0
    },
    xAxis: {
      title: {
        text: "MAE Level",
        style: {
          color: "white",
        },
      },
      labels: {
        style: {
          color: "white",
        },
      },
      gridLineColor: "transparent",
    },
    yAxis: {
      title: {
        text: "Expected Value ($)",
        style: {
          color: "white",
        },
      },
      labels: {
        style: {
          color: "white",
        },
        formatter: function () {
          return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          }).format(this.value);
        },
      },
      gridLineColor: "transparent",
    },
    tooltip: {
      enabled: false,
    },
    plotOptions: {
      spline: {
        lineWidth: 3,
        lineColor: "#5F93F5",
        marker: {
          enabled: false
        },
        states: {
          hover: {
            enabled: false
          }
        }
      },
    },
    series: [
      {
        name: "Expected Value",
        data: props.maeLevels.map((mae, index) => [mae, props.evValues[index]]),
        color: "#5F93F5",
      },
    ],
    credits: {
      enabled: false,
    },
  };
});
</script>
