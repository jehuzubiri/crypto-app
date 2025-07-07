import React from "react";
import { Box, Tab, Tabs, TextField } from "@mui/material";

import { getCryptoTableDataFromRaw } from "@/utils/General.helpers";
import { dummyApiCryptoList } from "@/constant/Dummy.const";
import { List, ListMobile } from "./components";

import useMainCryptosHook from "./useMainCryptosHook";
import useStyles from "./useMainCryptosStyles";

const MainCryptos: React.FC = () => {
  const styles = useStyles();
  const {
    fiatKeySelected,
    loading,
    settings,
    handleTabChange,
    handleSearchChange,
    handleColumnHeaderClick,
    columnHeaderIsSelected,
  } = useMainCryptosHook();

  return (
    <Box sx={styles.root}>
      <p>CRYPTOS</p>
      <Box sx={styles.actionBar}>
        <Tabs onChange={handleTabChange} value={settings.activeTab}>
          <Tab label="All" value="all" />
          <Tab label="Portfolio" value="portfolio" />
        </Tabs>
        <TextField
          // disabled
          value={settings.searchKey}
          onChange={handleSearchChange}
          id="search-field"
          size="small"
          label="Search cryptocurrency"
        />
      </Box>
      {styles.isUpTabletScreen ? (
        <List
          handleColumnHeaderClick={handleColumnHeaderClick}
          columnHeaderIsSelected={columnHeaderIsSelected}
          searchActive={settings.searchKey !== ""}
          cryptoList={getCryptoTableDataFromRaw(
            dummyApiCryptoList?.data,
            fiatKeySelected
          )}
        />
      ) : (
        <ListMobile
          searchActive={settings.searchKey !== ""}
          cryptoList={getCryptoTableDataFromRaw(
            dummyApiCryptoList?.data,
            fiatKeySelected
          )}
        />
      )}

      <Box>{/* <p>Load More</p> */}</Box>
    </Box>
  );
};

export default React.memo(MainCryptos);
