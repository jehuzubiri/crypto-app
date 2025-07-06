import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { handleReducersPayload } from "@/utils/Store.helpers";
import { AppDefaultFiatValue } from "@/constant/App.const";
import {
  TypesAppSliceState,
  TypesFiatKeys,
  TypesSelectedCrypto,
  TypesTableData,
} from "@/models/Redux.model";

const initialListState: TypesTableData = {
  list: [],
  logos: null,
  loading: false,
  logoIsLoading: false,
  sortBy: "amount",
  pagination: {
    page: 1,
    total: 0,
  },
};

const initialState: TypesAppSliceState = {
  searchQuery: "",
  portfolio: initialListState,
  cryptos: initialListState,
  trending: initialListState,
  fiatKeys: {
    selected: AppDefaultFiatValue,
    menu: {
      [AppDefaultFiatValue]: "United States Dollar (USD)",
    },
  },
  selectedCrypto: {
    data: null,
    loading: false,
  },
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setFiatKeys: (state, action: PayloadAction<Partial<TypesFiatKeys>>) => {
      state.fiatKeys = handleReducersPayload(
        "fiatKeys",
        state,
        action
      ) as TypesFiatKeys;
    },
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
    setTrendingCryptos: (
      state,
      action: PayloadAction<Partial<TypesTableData>>
    ) => {
      state.trending = handleReducersPayload(
        "trending",
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
export const {
  setCryptos,
  setFiatKeys,
  setProtfolio,
  setSelectedCrypto,
  setTrendingCryptos,
} = actions;
export default reducer;
