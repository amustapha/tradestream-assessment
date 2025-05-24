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

  const startTimestamp = computed(() => {
    return props.realTrades[0].timestamp;
  });

  const endTimestamp = computed(() => {
    return props.realTrades.at(-1)?.timestamp;
  });

  const rollingCummulativeReturn = (trades: Trade[]) => {
    // Sort trades by timestamp... :😜 just in case
    const sortedTrades = [...trades].sort((a, b) => a.timestamp - b.timestamp);

    // Calculate cumulative returns
    let cumulativeProfit = 0;
    return sortedTrades.map((trade) => {
      cumulativeProfit += trade.pnl_usd;
      return {
        x: trade.timestamp,
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

  const isOptimalBetter = computed(() => {
    const actualFinal = actualReturns.value.at(-1)?.y || 0;
    const optimalFinal = optimalReturns.value.at(-1)?.y || 0;
    return optimalFinal > actualFinal;
  });

  const optimalSeriesColor = computed(() => {
    return isOptimalBetter.value ? "#7AE2B7" : "#E25C75";
  });

  const chartOptions = computed(() => {
    return {
      chart: {
        type: "spline",
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
        type: 'datetime',
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
          format: '{value:%Y-%m-%d %H:%M}'
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
          formatter: function() {
            return new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            }).format(this.value);
          }
        },
        gridLineColor: "#333",
      },
      tooltip: {
        xDateFormat: '%Y-%m-%d %H:%M',
        valueDecimals: 2,
        valuePrefix: '$',
        style: {
          color: "white",
        }
      },
      series: [
        { 
          data: actualReturns.value, 
          name: "Actual",
          color: "#5F93F5",
        },
        { 
          data: optimalReturns.value, 
          name: "Optimal",
          color: optimalSeriesColor.value,
        },
      ],
      credits: {
        enabled: false
      }
    };
  });
</script>
