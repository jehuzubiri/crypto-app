import React from "react";
import { Box, Tab, Tabs, TextField } from "@mui/material";
import { List, ListMobile } from "./components";

import useMainCryptosHook from "./useMainCryptosHook";
import useStyles from "./useMainCryptosStyles";

const MainCryptos: React.FC = () => {
  const styles = useStyles();
  const {
    loading,
    settings,
    cryptoList,
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
          id="search-field"
          size="small"
          label="Search"
          value={settings.searchKey}
          onChange={handleSearchChange}
        />
      </Box>
      {styles.isUpTabletScreen ? (
        <List
          loading={loading}
          activeTab={settings.activeTab}
          searchActive={settings.searchKey !== ""}
          cryptoList={cryptoList}
          columnHeaderIsSelected={columnHeaderIsSelected}
          handleColumnHeaderClick={handleColumnHeaderClick}
        />
      ) : (
        <ListMobile
          loading={loading}
          activeTab={settings.activeTab}
          searchActive={settings.searchKey !== ""}
          cryptoList={cryptoList}
        />
      )}

      <Box>{/* <p>Load More</p> */}</Box>
    </Box>
  );
};

export default React.memo(MainCryptos);
