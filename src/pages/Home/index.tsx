"use client";

import { memo, useCallback, useEffect } from "react";
import { TheAnyConst } from "@/models/General.model";
import { getAllCurrencies, getCryptoLogos } from "@/services/apis";
import { Box, Typography } from "@mui/material";

const HomePage: React.FC<{ crptoList: TheAnyConst }> = ({ crptoList }) => {
  const testGet = useCallback(
    async (signal?: AbortSignal) => {
      try {
        if (signal?.aborted) return;
        if (!crptoList?.ok || !crptoList?.data?.length) return;

        const ids = crptoList?.data?.map((item: TheAnyConst) => item.id);
        const logos = await getCryptoLogos(ids, signal);
        // const sample = await getAllCurrencies({}, signal);
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
    testGet(signal);

    return () => {
      abortController.abort();
    };
  }, [crptoList]);

  return (
    <Box component="section" style={{ minHeight: "0" }}>
      <Typography>Home Page</Typography>
    </Box>
  );
};

export default memo(HomePage);
