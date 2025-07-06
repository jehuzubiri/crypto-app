"use client";

import { memo, useCallback, useEffect } from "react";
import { TheAnyConst } from "@/models/General.model";
import { getCryptoLogos } from "@/services/apis";
import { Box, Typography } from "@mui/material";
import useStyles from "./useHomeStyles";
import { useDispatch } from "react-redux";

import { CryptoChart, MainCryptos, TrendingCryptos } from "./components";

const HomePage: React.FC<{ crptoList: TheAnyConst }> = ({ crptoList }) => {
  const dispatch = useDispatch();
  const style = useStyles();

  const getCacheCryptoLogos = useCallback(
    async (signal?: AbortSignal) => {
      try {
        if (signal?.aborted) return;
        if (!crptoList?.ok || !crptoList?.data?.length) return;

        const ids = crptoList?.data?.map((item: TheAnyConst) => item.id);
        const logos = await getCryptoLogos(ids, signal);
        if (logos?.ok) {
          console.log({ cryptos: crptoList?.data });
          console.log({ cryptoLogos: logos });
        }
      } catch (error) {
        console.error({ ERROR_PAGE_HOME_GET_CRYPTO_LOGOS: error });
      }
    },
    [crptoList]
  );

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    getCacheCryptoLogos(signal);

    return () => {
      abortController.abort();
    };
  }, [crptoList]);

  return (
    <Box component="section" sx={style.root}>
      <Box>
        <CryptoChart />
        <TrendingCryptos />
      </Box>
      <MainCryptos />
    </Box>
  );
};

export default memo(HomePage);
