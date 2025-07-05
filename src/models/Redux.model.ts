import { TheAnyConst } from "./General.model";

export interface TypesSelectedCrypto {
  data: null | Object;
  loading: boolean;
  open: boolean;
}

export interface TypesTableData {
  list: TheAnyConst[];
  logos: null | Object;
  loading: boolean;
  sortBy: "amount" | "market_cap";
  searchQuery: string;
  pagination: {
    page: number;
    total: number;
  };
}

export interface TypesFiatKeys {
  selected: string | "USD";
  list: string[];
}

export interface TypesAppSliceState {
  portfolio: TypesTableData;
  cryptos: TypesTableData;
  fiatKeys: TypesFiatKeys;
  selectedCrypto: TypesSelectedCrypto;
}
