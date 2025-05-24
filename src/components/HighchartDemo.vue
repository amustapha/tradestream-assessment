<template>
  <div>
    <highcharts :options="chartOptions" />
  </div>
</template>

<script setup lang="ts">
  import { ref } from "vue";

  const chartOptions = ref({
    chart: {
      type: "line",
      backgroundColor: "#262627",
      borderRadius: 10,
    },
    title: {
      text: "Demo Highcharts Line Chart",
      style: {
        color: "white",
      },
    },
    xAxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      labels: {
        style: {
          color: "white",
        },
      },
    },
    yAxis: {
      title: {
        text: "Value",
        style: {
          color: "white",
        },
      },
      labels: {
        style: {
          color: "#666",
        },
      },
    },
    series: [
      {
        type: "spline",
        name: "Demo Series",
        data: Array.from({ length: 12 }, (_, i) =>
          Math.floor(Math.random() * 25 + i ** 1.3)
        ),
        color: "#65C49D",
        marker: {
          enabled: false,
        },
        style: {
          color: "white",
        },
      },
    ],
  });
</script>
