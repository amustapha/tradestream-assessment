import { createApp } from "vue";
import { createPinia } from "pinia";
import "./style.css";
import App from "./App.vue";
import HighchartsVue from "highcharts-vue";
import "highcharts/highcharts-more";

import { ChartDataApiService } from "./services";

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(HighchartsVue);
app.provide(
  "chartDataApiService",
  new ChartDataApiService({
    uid: "test_data",
    session_id: "session-1003",
  })
);
app.mount("#app");
