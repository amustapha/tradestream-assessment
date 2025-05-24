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

  const isActualBetter = computed(() => {
   const lastActual = actualReturns.value.at(-1);
   const lastOptimal = optimalReturns.value.at(-1);
   if (lastActual && lastOptimal) {
    return lastActual.y > lastOptimal.y;
   }
   return true;
  });

  const areaRangeData = computed(() => {
    return actualReturns.value.map((point, index) => {
      return {
        x: point.x,
        y: point.y,
      };
    });
  });

  const chartOptions = computed(() => {
    return {
      chart: {
        type: "areaspline",
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
        enabled: false,
      },
      plotOptions: {
        areaspline: {
          fillColor: {
            linearGradient: {
              x1: 1,
              y1: 0,
              x2: 0,
              y2: 1,
            },
            stops: [
              [0, "rgba(122, 226, 183, 0.8)"],
              [1, "rgba(122, 226, 183, 0.1)"],
            ],
          },
          lineWidth: 2,
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
          name: "Actual Returns",
          data: areaRangeData.value,
          fillColor: {
            linearGradient: {
              x1: 1,
              y1: 0,
              x2: 0,
              y2: 1,
            },
            stops: [
              [0, "rgba(226, 92, 117)"],
              [1, "rgba(226, 92, 117"],
            ],
          },
          lineColor: "#E25C75",
          colorByPoint: true
        },
        {
          name: "Optimal Returns",
          data: optimalReturns.value,
          color: "#7AE2B7",
          fillColor: {
            linearGradient: {
              x1: 1,
              y1: 0,
              x2: 0,
              y2: 1,
            },
            stops: [
              [0, "rgba(122, 226, 183)"],
              [1, "rgba(122, 226, 183)"],
            ],
          },
          lineColor: "#7AE2B7",
        }
      ],
      credits: {
        enabled: false,
      },
    };
  });
</script>
