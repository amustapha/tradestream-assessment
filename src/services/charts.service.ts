import { ApiResponseWrapper } from "../types/api.types";
import { ChartData } from "../types/chart.types";
import BaseApiService from "./api.service";

export class ChartDataApiService extends BaseApiService<any> {
  constructor(authHeaders: Record<string, string>) {
    super(
      "https://us-central1-tradestream-cloud.cloudfunctions.net",
      authHeaders
    );
  }

  getChartData(): Promise<ApiResponseWrapper<ChartData>> {
    return this.get<string>("stoploss-optimizooor").then((r) => {
      return JSON.parse(
        r.replace("NaN", "null")
      ) as ApiResponseWrapper<ChartData>;
    });
  }
}
