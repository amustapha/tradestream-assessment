<template>
  <div class="relative bg-gray-900 rounded-lg p-4">
    <highcharts :options="chartOptions" />
  </div>
</template>

<script setup lang="ts">
  import { computed } from "vue";
  import type { Trade } from "../../types/chart.types";

  const props = defineProps<{
    realTrades: Trade[];
    simulatedTrades: Trade[];
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
    return rollingCummulativeReturn(props.simulatedTrades);
  });

  const isActualBetter = computed(() => {
    const lastActual = actualReturns.value.at(-1);
    const lastOptimal = optimalReturns.value.at(-1);
    if (lastActual && lastOptimal) {
      return lastActual.y > lastOptimal.y;
    }
    return true;
  });

  const actualAreaColor = computed(() => {
    return isActualBetter.value ? "#E25C75" : "#262627";
  });

  const optimalAreaColor = computed(() => {
    return isActualBetter.value ? "#262627" : "#7AE2B7";
  });

  const areaRangeData = computed(() => {
    return actualReturns.value.map((point, index) => {
      return {
        x: point.x,
        y: point.y,
      };
    });
  });

  const series = computed(() => {
    const actual = {
      name: "Actual Returns",
      color: "white",
      data: areaRangeData.value,
      fillColor: {
        linearGradient: {
          x1: 0,
          y1: 0,
          x2: 0,
          y2: 1,
        },
        stops: [
          [0, actualAreaColor.value],
          [1, actualAreaColor.value],
        ],
      },
      lineColor: "#5F93F5",
      lineWidth: 3,
      colorByPoint: true,
    };
    const optimal = {
      name: "Optimal Returns",
      data: optimalReturns.value,
      fillColor: {
        linearGradient: {
          x1: 0,
          y1: 0,
          x2: 0,
          y2: 1,
        },
        stops: [
          [0, optimalAreaColor.value],
          [1, optimalAreaColor.value],
        ],
      },
      lineColor: isActualBetter.value ? "#883746" : "#3D765F",
      lineWidth: 3,
    };
    return isActualBetter.value ? [actual, optimal] : [optimal, actual];
  });

  const chartOptions = computed(() => {
    return {
      chart: {
        type: "areaspline",
        backgroundColor: "#262627",
        borderRadius: 10,
        height: "75%",
      },
      title: {
        text: "Cummulative Return",
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
          format: "{value:%Y-%m-%d}",
        },
        gridLineColor: "transparent",
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
        gridLineColor: "transparent",
      },
      tooltip: {
        enabled: false,
      },
      plotOptions: {
        areaspline: {
          fillColor: {
            linearGradient: {
              x1: 0,
              y1: 0,
              x2: 0,
              y2: 1,
            },
            stops: [
              [0, actualAreaColor.value],
              [1, actualAreaColor.value],
            ],
          },
          lineWidth: 3,
          lineColor: "white",
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
      series: series.value,
      credits: {
        enabled: false,
      },
    };
  });
</script>
