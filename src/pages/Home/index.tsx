"use client";

import React from "react";
import { TheAnyConst } from "@/models/General.model";
import { Box } from "@mui/material";
import useStyles from "./useHomeStyles";

import { CryptoChart, MainCryptos, TrendingCryptos } from "./components";
import useHomeHooks from "./useHomeHooks";

const HomePage: React.FC<{
  cryptoList: TheAnyConst;
  cryptoTrending: TheAnyConst;
}> = ({ cryptoList, cryptoTrending }) => {
  const style = useStyles();

  const { loadMoreCryptos } = useHomeHooks(cryptoList, cryptoTrending);

  return (
    <Box component="section" sx={style.root}>
      <Box>
        <CryptoChart />
        <TrendingCryptos />
      </Box>
      <MainCryptos loadMoreCryptos={loadMoreCryptos} />
    </Box>
  );
};

export default React.memo(HomePage);
