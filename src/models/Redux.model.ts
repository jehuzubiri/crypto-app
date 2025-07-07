import { TheAnyConst } from "./General.model";

export interface TypesSelectedCrypto {
  data: null | Object;
  loading: boolean;
}

export interface TypesTableData {
  list: TheAnyConst[];
  logos: Object;
  loading: boolean;
  sort: "price" | "volume_24h" | "market_cap";
  page: number;
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
