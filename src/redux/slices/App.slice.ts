import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { handleReducersPayload } from "@/utils/Store.helpers";
import {
  TypesAppSliceState,
  TypesSelectedCrypto,
  TypesTableData,
} from "@/models/Redux.model";

const initialListState: TypesTableData = {
  list: [],
  logos: null,
  loading: false,
  sortBy: "amount",
  searchQuery: "",
  pagination: {
    page: 1,
    total: 0,
  },
};

const initialState: TypesAppSliceState = {
  portfolio: initialListState,
  cryptos: initialListState,
  selectedCrypto: {
    data: null,
    open: false,
    loading: false,
  },
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setProtfolio: (state, action: PayloadAction<Partial<TypesTableData>>) => {
      state.portfolio = handleReducersPayload(
        "portfolio",
        state,
        action
      ) as TypesTableData;
    },
    setCryptos: (state, action: PayloadAction<Partial<TypesTableData>>) => {
      state.cryptos = handleReducersPayload(
        "cryptos",
        state,
        action
      ) as TypesTableData;
    },
    setSelectedCrypto: (
      state,
      action: PayloadAction<Partial<TypesSelectedCrypto>>
    ) => {
      state.selectedCrypto = handleReducersPayload(
        "selectedCrypto",
        state,
        action
      ) as TypesSelectedCrypto;
    },
  },
});

const { reducer, actions } = appSlice;
export const { setProtfolio, setCryptos, setSelectedCrypto } = actions;
export default reducer;
