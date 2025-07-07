import React from "react";
import Image from "next/image";
import { useSelector } from "react-redux";
import { Box, Skeleton } from "@mui/material";
import { FaChevronDown } from "react-icons/fa";
import { RiAddLargeFill } from "react-icons/ri";
import { MdOpenInNew } from "react-icons/md";

import { RootState } from "@/redux/store";
import { AppAssetImages } from "@/constant/App.const";
import { CryproParsedListItem, TheAnyConst } from "@/models/General.model";
import { fiatAmountDisplayFormatter } from "@/utils/General.helpers";
import useStyles from "../../useMainCryptosStyles";

const columns = [
  {
    key: "name",
    label: "Name",
  },
  {
    key: "price",
    label: "Price",
  },
  {
    key: "change",
    label: "24H",
  },
  {
    key: "supply",
    label: "Total Supply",
  },
  {
    key: "action",
    label: "Action",
    not_sortable: true,
  },
];

const List: React.FC<{
  cryptoList: CryproParsedListItem[];
}> = ({ cryptoList = [] }) => {
  const styles = useStyles();
  const loadingItems = Array.from({ length: 5 }, (_, i) => i + 1);

  const { cryptos, fiatKeys } = useSelector((state: RootState) => state.app);
  const { logos } = cryptos;
  const { selected } = fiatKeys;

  return (
    <Box sx={styles.list}>
      {/* TABLE HEAD */}
      <Box className="t-head">
        {columns.map((column: TheAnyConst) => (
          <Box
            key={column.key}
            className={`t-cell ${column.key} ${
              column?.active ? "active" : ""
            } ${column?.not_sortable ? "" : "sortable"}`}
          >
            {column?.not_sortable ? null : (
              <FaChevronDown
                className={column?.isDesc && column?.active ? "desc" : ""}
              />
            )}
            <p>{column.label}</p>
          </Box>
        ))}
      </Box>

      {/* TABLE ROWS */}
      {cryptoList?.length
        ? cryptoList?.map((crypto: CryproParsedListItem) => {
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
              <Box key={`${crypto?.id}`} className="t-row">
                <Box className="t-cell name">
                  <Image
                    src={logo?.src || AppAssetImages.coin}
                    alt={logo?.alt || "CoinMarketCap Crypto Logo"}
                    width={32}
                    height={32}
                  />
                  <p>{crypto?.name}</p>
                </Box>
                <Box className="t-cell price">
                  <p>{`${fiatCurrency?.sign || ""}${priceFormatted}`}</p>
                </Box>
                <Box className={`t-cell change ${isNegative ? "error" : ""}`}>
                  <p>
                    {`${quoteChangePrefix}${fiatAmountDisplayFormatter(
                      quoteChange
                    )}%`}
                  </p>
                </Box>
                <Box className="t-cell supply">
                  <p>
                    {`${fiatAmountDisplayFormatter(
                      crypto?.totalSupply
                    )} ${cryptoSymbol}`}
                  </p>
                </Box>
                <Box className="t-cell action">
                  <RiAddLargeFill />
                  <MdOpenInNew />
                </Box>
              </Box>
            );
          })
        : loadingItems.map((_, index) => {
            const loadingColumns = Array.from({ length: 4 }, (_, i) => i + 1);
            return (
              <Box key={`key${index}`} className="t-row-loading">
                <Box className="name">
                  <Skeleton
                    animation="wave"
                    variant="circular"
                    width={35}
                    height={35}
                  />
                  <Skeleton animation="wave" height={13.5} width="100%" />
                </Box>
                {loadingColumns?.map((_, childIndex) => (
                  <Skeleton
                    key={`key${childIndex}`}
                    animation="wave"
                    height={13.5}
                    width="100%"
                  />
                ))}
              </Box>
            );
          })}
    </Box>
  );
};

export default React.memo(List);
