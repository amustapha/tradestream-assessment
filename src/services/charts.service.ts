import { ApiResponseWrapper } from "../types/api.types";
import { ChartData } from "../types/chart.types";
import BaseApiService from "./api.service";

export class ChartDataApiService extends BaseApiService<
  ApiResponseWrapper<ChartData>
> {
  constructor(authHeaders: Record<string, string>) {
    super(
      "https://us-central1-tradestream-cloud.cloudfunctions.net",
      authHeaders
    );
  }

  getChartData() {
    return this.get("stoploss-optimizooor");
  }
}
