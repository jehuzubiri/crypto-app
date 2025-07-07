import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { handleReducersPayload } from "@/utils/Store.helpers";
import { AppDefaultFiatValue } from "@/constant/App.const";
import {
  TypesAppSliceState,
  TypesFiatKeys,
  TypesSelectedCrypto,
  TypesTableData,
} from "@/models/Redux.model";
import { CryproParsedListItem } from "@/models/General.model";

const initialListState: TypesTableData = {
  list: [],
  logos: {},
  loading: false,
  sort: "market_cap",
  page: 1,
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
    addToPortfolio: (
      state,
      action: PayloadAction<Partial<CryproParsedListItem>>
    ) => {
      state.cryptos.list = state.cryptos.list.filter(
        (crypto) => crypto.id != action.payload.id
      );
      state.portfolio.push(action.payload);
    },
    removeToPortfolio: (
      state,
      action: PayloadAction<Partial<CryproParsedListItem>>
    ) => {
      state.portfolio = state.portfolio.filter(
        (currency) => currency?.id != action.payload.id
      );
      state.cryptos.list.unshift(action.payload);
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
  addToPortfolio,
  removeToPortfolio,
  setCryptos,
  setFiatKeys,
  setSelectedCrypto,
  setTrendingCryptos,
} = actions;
export default reducer;
