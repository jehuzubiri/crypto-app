//DESC: generic interfaces and types
export type NotificationType = "success" | "info" | "warning" | "error";
export type TheAnyConst = any;
export type TheAnyToDo = any;
export type TheAnyTheme = any;

export interface ServicesApiResponse {
  ok: boolean;
  message: string;
  data?: TheAnyConst;
  error?: TheAnyConst;
  config?: TheAnyConst;
}

export interface ServicesGetParams {
  start: number;
  limit?: number;
  convert?: "USD" | string;
  sort?: "market_cap" | "price" | "volume_24h";
  sort_dir?: "desc" | "asc";
  cryptocurrency_type?: "all" | "coins" | "token";
}

export interface CryproParsedListItem {
  id: number | string;
  slug: string;
  name: string;
  symbol: string;
  price: number;
  marketCap: number;
  volume24h: number;
  percent_24h: number;
  cmc_rank: number;
  total_supply: number;
  circulating_supply: number;
  logo?: TheAnyConst;
  quote?: TheAnyConst;
}
