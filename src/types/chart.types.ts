export interface Trade {
  entry_exit_delta: number;
  fees: number;
  mae_percent: number;
  pnl_percent: number;
  pnl_usd: number;
  size_usd: number;
  timestamp: number;
}
export interface ChartData {
  ev_by_mae: number[];
  mae_levels: number[];
  optimal_stop: {
    affected_trades_pct: number;
    current_ev: number;
    ev_improvement_pct: number;
    improved_ev: number;
    optimal_stoploss: number | null;
  };
  recovery_rate_by_mae: number[];
  trades: Trade[];
}
