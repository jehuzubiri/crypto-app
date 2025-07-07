import React from "react";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";

import { RootState } from "@/redux/store";
import { List, ListMobile } from "./components";

import { getCryptoTableDataFromRaw } from "@/utils/General.helpers";
import { dummyApiCryptoList } from "@/constant/Dummy.const";
import useStyles from "./useMainCryptosStyles";

const MainCryptos: React.FC = () => {
  const styles = useStyles();
  const { fiatKeys, cryptos } = useSelector((state: RootState) => state.app);
  const { selected } = fiatKeys;
  const { loading } = cryptos;

  return (
    <Box sx={styles.root}>
      <p>ALL CRYPTOS</p>
      {/* <Box sx={styles.actionBar}>
        <Box>Tab Menu</Box>
        <Box>Other Settings</Box>
      </Box> */}
      {styles.isUpTabletScreen ? (
        <List
          cryptoList={getCryptoTableDataFromRaw(
            dummyApiCryptoList?.data,
            selected
          )}
        />
      ) : (
        <ListMobile
          cryptoList={getCryptoTableDataFromRaw(
            dummyApiCryptoList?.data,
            selected
          )}
        />
      )}

      <Box>{/* <p>Load More</p> */}</Box>
    </Box>
  );
};

export default React.memo(MainCryptos);
