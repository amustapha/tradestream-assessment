import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import HighchartsVue from "highcharts-vue";
import { ChartDataApiService } from "./services";

const app = createApp(App);

app.use(HighchartsVue);
app.provide(
  "chartDataApiService",
  new ChartDataApiService({
    uid: "test_data",
    session_id: "session-1003",
  })
);
app.mount("#app");
