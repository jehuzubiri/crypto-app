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
  searchQuery: string;
  portfolio: TypesTableData;
  cryptos: TypesTableData;
  fiatKeys: TypesFiatKeys;
  selectedCrypto: TypesSelectedCrypto;
}
