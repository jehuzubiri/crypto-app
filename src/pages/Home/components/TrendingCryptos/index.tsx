import React from "react";
import Image from "next/image";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";

import { RootState } from "@/redux/store";
import { AppAssetImages } from "@/constant/App.const";
import { CryproParsedListItem } from "@/models/General.model";

import { fiatAmountDisplayFormatter } from "@/utils/General.helpers";
import useStyles from "./useTrendingCryptosStyles";
import LoaderMobile from "../Custom/LoaderMobile";

const TrendingCryotos: React.FC = () => {
  const { trending, fiatKeys } = useSelector((state: RootState) => state.app);
  const { logos, list, loading } = trending;
  const { selected } = fiatKeys;

  const styles = useStyles();
  const isLoading = !list?.length || loading;

  return (
    <Box sx={styles.root}>
      <p>Trending Stocks (1h ago)</p>
      <Box className="list">
        {isLoading ? (
          <LoaderMobile />
        ) : (
          list.map((crypto: CryproParsedListItem, index) => {
            const fiatCurrency = fiatKeys?.menu?.[selected] || { sign: "$" };
            const cryptoSymbol = crypto?.symbol || "";
            const quoteChange = crypto?.quote[selected]?.percent_change_1h || 0;
            const isNegative = quoteChange < 0;
            const quoteChangePrefix = isNegative ? "" : "+";
            const quoteChangeRatio =
              (crypto?.quote[selected]?.price || 0) * (quoteChange / 100);

            const cryptoTotalSupply = fiatAmountDisplayFormatter(
              crypto?.total_supply || 0
            );
            const quotePrice = fiatAmountDisplayFormatter(
              crypto?.quote[selected]?.price || 0,
              quoteChangeRatio < 0.01 && quoteChangeRatio > 0 ? 4 : 2
            );

            const logo = logos[crypto?.id] || {
              src: AppAssetImages.coin,
              alt: "CoinMarketCap Crypto Logo",
            };

            const valueA = `${cryptoTotalSupply} ${cryptoSymbol}`;
            const valueB = `${
              fiatCurrency?.sign || ""
            }${quotePrice} (${selected})`;
            const valueC = `${quoteChangePrefix}${fiatAmountDisplayFormatter(
              quoteChangeRatio,
              quoteChangeRatio < 0.01 && quoteChangeRatio > 0 ? 6 : 2
            )} (${fiatAmountDisplayFormatter(quoteChange)}%)`;

            return (
              <Box
                key={`key${index}`}
                onClick={() => console.log({ ID: crypto })}
                className="list-item"
              >
                <Box>
                  <Image
                    src={logo?.src || AppAssetImages.coin}
                    alt={logo?.alt || "CoinMarketCap Crypto Logo"}
                    width={32}
                    height={32}
                  />
                  <Box>
                    <p>{crypto?.name}</p>
                    <p>{valueA}</p>
                  </Box>
                </Box>
                <Box>
                  <p>{valueB}</p>
                  <p className={isNegative ? "error" : ""}>{valueC}</p>
                </Box>
              </Box>
            );
          })
        )}
      </Box>
    </Box>
  );
};

export default React.memo(TrendingCryotos);
