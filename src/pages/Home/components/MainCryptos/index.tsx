import React from "react";
import { Box, Tab, Tabs, TextField } from "@mui/material";
import { List, ListMobile } from "./components";

import useMainCryptosHook from "./useMainCryptosHook";
import useStyles from "./useMainCryptosStyles";

const MainCryptos: React.FC<{
  loadMoreCryptos: () => void;
}> = ({ loadMoreCryptos }) => {
  const styles = useStyles();
  const {
    displayLoadMore,
    loading,
    settings,
    cryptoList,
    cryptoIsLoading,
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
          <Tab disabled={cryptoIsLoading} label="All" value="all" />
          <Tab disabled={cryptoIsLoading} label="Portfolio" value="portfolio" />
        </Tabs>
        <TextField
          id="search-field"
          size="small"
          label="Search"
          disabled={cryptoIsLoading}
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
      {displayLoadMore ? (
        <Box className="load-more">
          <p onClick={loadMoreCryptos}>Load More</p>
        </Box>
      ) : null}
    </Box>
  );
};

export default React.memo(MainCryptos);
