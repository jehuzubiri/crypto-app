import React from "react";
import Image from "next/image";
import { useSelector } from "react-redux";
import { Box, CircularProgress } from "@mui/material";
import { FaChevronDown } from "react-icons/fa";
import { RiAddLargeFill } from "react-icons/ri";
import { MdOpenInNew } from "react-icons/md";

import { RootState } from "@/redux/store";
import { AppAssetImages, MainCryptoTableColumns } from "@/constant/App.const";
import { CryproParsedListItem, TheAnyConst } from "@/models/General.model";
import { fiatAmountDisplayFormatter } from "@/utils/General.helpers";

import Empty from "../../../Custom/Empty";
import LoaderWeb from "../../../Custom/LoaderWeb";
import useStyles from "../../useMainCryptosStyles";

type TableColumnTypes = "name" | "price" | "change" | "supply";

const List: React.FC<{
  activeTab: "all" | "portfolio";
  loading: boolean;
  searchActive: boolean;
  cryptoList: CryproParsedListItem[];
  handleColumnHeaderClick: (props: TableColumnTypes) => void;
  columnHeaderIsSelected: (props: TableColumnTypes) => {
    isActive: boolean;
    isDesc: boolean;
  };
}> = ({
  loading = false,
  activeTab,
  cryptoList = [],
  searchActive = false,
  columnHeaderIsSelected,
  handleColumnHeaderClick,
}) => {
  const styles = useStyles();
  const { cryptos, fiatKeys } = useSelector((state: RootState) => state.app);
  const { logos, loading: cryptosIsLoading } = cryptos;
  const { selected } = fiatKeys;

  return (
    <Box sx={styles.list}>
      {/* TABLE HEAD */}
      <Box className="t-head">
        {MainCryptoTableColumns.map((column: TheAnyConst) => {
          const notSortable = column?.not_sortable || cryptosIsLoading || false;
          const { isActive, isDesc } = columnHeaderIsSelected(column.key);

          const handleClick = () =>
            notSortable ? null : handleColumnHeaderClick(column.key);

          return (
            <Box
              key={column.key}
              className={`t-cell ${column.key} ${
                isActive && !cryptosIsLoading ? "active" : ""
              } ${notSortable ? "" : "sortable"}`}
            >
              {notSortable ? null : (
                <FaChevronDown
                  onClick={handleClick}
                  className={isDesc && isActive ? "desc" : ""}
                />
              )}
              {cryptosIsLoading ? <CircularProgress size="16px" /> : null}
              <p onClick={handleClick}>{column.label}</p>
            </Box>
          );
        })}
      </Box>

      {/* TABLE ROWS */}
      {cryptoList?.length ? (
        cryptoList?.map((crypto: CryproParsedListItem) => {
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
                    crypto?.total_supply
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
      ) : (loading && searchActive) || cryptosIsLoading ? null : (
        <Empty searchActive={searchActive} activeTab={activeTab} />
      )}

      {/* TABLE LOADING */}
      {(loading && searchActive) || cryptosIsLoading ? <LoaderWeb /> : null}
    </Box>
  );
};

export default React.memo(List);
