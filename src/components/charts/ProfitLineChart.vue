<template>
  <highcharts :options="chartOptions" />
</template>

<script setup lang="ts">
  import { computed } from "vue";
  import type { Trade } from "../../types/chart.types";

  const props = defineProps<{
    realTrades: Trade[];
    optimalTrades: Trade[];
  }>();

  const rollingCummulativeReturn = (trades: Trade[]) => {
    // Sort trades by timestamp
    const referenceTimestamps = [...props.realTrades]
      .map((trade) => trade.timestamp)
      .sort((a, b) => a - b);

    // Calculate cumulative returns
    let cumulativeProfit = 0;
    return referenceTimestamps.map((timestamp) => {
      const trade = trades.find((trade) => trade.timestamp === timestamp);
      if (trade) {
        cumulativeProfit += trade.pnl_usd;
      }
      return {
        x: timestamp,
        y: cumulativeProfit,
      };
    });
  };

  const actualReturns = computed(() => {
    return rollingCummulativeReturn(props.realTrades);
  });

  const optimalReturns = computed(() => {
    return rollingCummulativeReturn(props.optimalTrades);
  });

  const areaRangeData = computed(() => {
    return actualReturns.value.map((point, index) => {
      const optimalPoint = optimalReturns.value[index];
      return {
        x: point.x,
        low: Math.min(point.y, optimalPoint.y),
        high: Math.max(point.y, optimalPoint.y),
      };
    });
  });

  const chartOptions = computed(() => {
    return {
      chart: {
        type: "arearange",
        backgroundColor: "#262627",
        borderRadius: 10,
        height: "40%",
      },
      title: {
        text: "Cummulative Return",
        style: {
          color: "white",
        },
      },
      xAxis: {
        type: "datetime",
        title: {
          text: "Time",
          style: {
            color: "white",
          },
        },
        labels: {
          style: {
            color: "white",
          },
          format: "{value:%Y-%m-%d %H:%M}",
        },
        gridLineColor: "#333",
      },
      yAxis: {
        title: {
          text: "Cummulative Return ($)",
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
        gridLineColor: "#333",
      },
      tooltip: {
        xDateFormat: "%Y-%m-%d %H:%M",
        valueDecimals: 2,
        valuePrefix: "$",
        style: {
          color: "white",
        },
      },
      plotOptions: {
        arearange: {
          fillColor: {
            linearGradient: {
              x1: 0,
              y1: 0,
              x2: 0,
              y2: 1,
            },
            stops: [
              [0, "#7AE2B7"],
              [1, "rgba(122, 226, 183, 0.1)"],
            ],
          },
          lineWidth: 1,
          lineColor: "#7AE2B7",
          states: {
            hover: {
              lineWidth: 2,
            },
          },
        },
      },
      series: [
        {
          name: "Profit Range",
          data: areaRangeData.value,
          color: "#7AE2B7",
        },
      ],
      credits: {
        enabled: false,
      },
    };
  });
</script>
