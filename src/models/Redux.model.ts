import { TheAnyConst } from "./General.model";

export interface TypesSelectedCrypto {
  data: null | Object;
  loading: boolean;
  open: boolean;
}

export interface TypesTableData {
  list: TheAnyConst[];
  loading: boolean;
  sortBy: "amount" | "market_cap";
  searchQuery: string;
}

export interface TypesAppSliceState {
  portfolio: TypesTableData;
  cryptos: TypesTableData;
  selectedCrypto: TypesSelectedCrypto;
}
