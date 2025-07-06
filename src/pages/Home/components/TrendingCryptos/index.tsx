import React from "react";
import Image from "next/image";
import { Box, Skeleton, Typography } from "@mui/material";
import { useSelector } from "react-redux";

import { RootState } from "@/redux/store";
import { AppAssetImages } from "@/constant/App.const";
import { TypesTableData } from "@/models/Redux.model";

import useStyles from "./useTrendingCryptosStyles";
import { fiatAmountDisplayFormatter } from "@/utils/General.helpers";

const TrendingCryotos: React.FC = () => {
  const styles = useStyles();
  const { trending, fiatKeys } = useSelector((state: RootState) => state.app);
  const { logos, list }: TypesTableData = trending;
  const { selected } = fiatKeys;

  const isLoading = !list?.length;
  const loadingItems = Array.from({ length: 5 }, (_, i) => i + 1);

  return (
    <Box sx={styles.root}>
      <Typography>Trending Cryptos</Typography>
      <Box className={isLoading ? "loading" : "list"}>
        {isLoading
          ? loadingItems.map((_, index) => (
              <Box key={`key${index}`}>
                <Skeleton
                  animation="wave"
                  variant="circular"
                  width={35}
                  height={35}
                />
                <Box>
                  <Skeleton animation="wave" height={17.5} width="60%" />
                  <Skeleton animation="wave" height={13.5} width="80%" />
                </Box>
              </Box>
            ))
          : list.map((data, index) => {
              const logo = logos[data?.id] || null;
              const fiatCurrency = fiatKeys?.menu?.[selected] || { sign: "$" };
              const cryptoSymbol = data?.symbol || "";
              const quoteChange = data?.quote.USD.percent_change_24h;
              const isNegative = quoteChange <= 0;
              const quoteChangePrefix = isNegative ? "-" : "+";

              const cryptoTotalSupply = fiatAmountDisplayFormatter(
                data?.total_supply || 0
              );
              const quotePrice = fiatAmountDisplayFormatter(
                data?.quote?.USD?.price || 0
              );

              const valueA = `${cryptoTotalSupply} ${cryptoSymbol}`;

              const valueB = `${
                fiatCurrency?.sign || ""
              }${quotePrice} (${selected})`;

              const valueC = `${quoteChangePrefix}${fiatAmountDisplayFormatter(
                (data?.quote?.USD?.price || 0) * (quoteChange / 100)
              )} (${fiatAmountDisplayFormatter(quoteChange)}%)`;

              return (
                <Box key={`key${index}`} className="list-item">
                  <Box>
                    <Image
                      src={logo.src || AppAssetImages.logo}
                      alt={logo.alt || "CoinMarketCap Crypto Logo"}
                      width={32}
                      height={32}
                    />
                    <Box>
                      <Typography>{data?.name}</Typography>
                      <Typography>{valueA}</Typography>
                    </Box>
                  </Box>
                  <Box>
                    <Typography>{valueB}</Typography>
                    <Typography className={isNegative ? "error" : ""}>
                      {valueC}
                    </Typography>
                  </Box>
                </Box>
              );
            })}
      </Box>
    </Box>
  );
};

export default TrendingCryotos;
