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
  logos: {},
  loading: false,
  sortBy: "amount",
  pagination: {
    page: 1,
    total: 0,
  },
};

const initialState: TypesAppSliceState = {
  portfolio: [],
  searchQuery: "",
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
    addToProtfolio: (state, action: PayloadAction<Partial<Object>>) => {
      state.portfolio.push(action.payload);
    },
    removeToProtfolio: (
      state,
      action: PayloadAction<Partial<string | number>>
    ) => {
      state.portfolio.filter((currency) => currency?.id != action.payload);
    },
    setFiatKeys: (state, action: PayloadAction<Partial<TypesFiatKeys>>) => {
      state.fiatKeys = handleReducersPayload(
        "fiatKeys",
        state,
        action
      ) as TypesFiatKeys;
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
  addToProtfolio,
  removeToProtfolio,
  setCryptos,
  setFiatKeys,
  setSelectedCrypto,
  setTrendingCryptos,
} = actions;
export default reducer;
