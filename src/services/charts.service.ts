import BaseApiService from "./api.service";

export class ChartDataApiService extends BaseApiService<any> {
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
