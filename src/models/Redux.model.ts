import { TheAnyConst } from "./General.model";

export interface TypesSelectedCrypto {
  data: null | Object;
  loading: boolean;
}

export interface TypesTableData {
  list: TheAnyConst[];
  logos: Object;
  loading: boolean;
  sortBy: "amount" | "market_cap";
  pagination: {
    page: number;
    total: number;
  };
}

export interface TypesFiatKeys {
  selected: string | "USD";
  menu:
    | Object
    | {
        USD: "United States Dollar (USD)";
      };
}

export interface TypesAppSliceState {
  portfolio: TheAnyConst[];
  searchQuery: string;
  cryptos: TypesTableData;
  trending: TypesTableData;
  fiatKeys: TypesFiatKeys;
  selectedCrypto: TypesSelectedCrypto;
}
