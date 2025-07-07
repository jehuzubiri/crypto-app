import React from "react";
import Image from "next/image";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";

import { RootState } from "@/redux/store";
import { AppAssetImages } from "@/constant/App.const";
import { CryproParsedListItem } from "@/models/General.model";
import { fiatAmountDisplayFormatter } from "@/utils/General.helpers";

import LoaderMobile from "../../../Custom/LoaderMobile";
import useStyles from "../../useMainCryptosStyles";

const ListMobile: React.FC<{
  cryptoList: CryproParsedListItem[];
}> = ({ cryptoList = [] }) => {
  const styles = useStyles();

  const { cryptos, fiatKeys } = useSelector((state: RootState) => state.app);
  const { logos } = cryptos;
  const { selected } = fiatKeys;

  return (
    <Box sx={styles.listMobile}>
      {!cryptoList?.length ? (
        <LoaderMobile items={10} />
      ) : (
        cryptoList.map((crypto: CryproParsedListItem) => {
          const cryptoSymbol = crypto?.symbol || "";
          const quoteChange = crypto?.percent_24h || 0;
          const fiatCurrency = fiatKeys?.menu?.[selected] || { sign: "$" };
          const isNegative = quoteChange < 0;
          const quoteChangePrefix = isNegative ? "" : "+";

          const priceFormatted = fiatAmountDisplayFormatter(
            crypto?.price,
            crypto?.price < 0.01 && crypto?.price > 0 ? 4 : 2
          );

          const logo = logos[crypto?.id] || {
            src: crypto?.logo || AppAssetImages.coin,
            alt: "CoinMarketCap Crypto Logo",
          };

          return (
            <Box key={`${crypto?.id}`} className="list-item">
              <Box>
                <Image
                  src={logo?.src || AppAssetImages.coin}
                  alt={logo?.alt || "CoinMarketCap Crypto Logo"}
                  width={32}
                  height={32}
                />
                <Box>
                  <p>{crypto?.name}</p>
                  <p>
                    {`${fiatAmountDisplayFormatter(
                      crypto?.totalSupply
                    )} ${cryptoSymbol}`}
                  </p>
                </Box>
              </Box>
              <Box>
                <p>{`${fiatCurrency?.sign || ""}${priceFormatted}`}</p>
                <p className={isNegative ? "error" : ""}>
                  {`${quoteChangePrefix}${fiatAmountDisplayFormatter(
                    quoteChange
                  )}%`}
                </p>
              </Box>
            </Box>
          );
        })
      )}
    </Box>
  );
};

export default React.memo(ListMobile);
