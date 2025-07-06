import React from "react";
import { Box, Typography } from "@mui/material";
import useStyle from "../../useLayoutStyles";

const LayoutFooter: React.FC = () => {
  const style = useStyle({});

  return (
    <Box component="footer" sx={style.footer}>
      <p>
        Simple cryptocurrency tracker by Jehu Zubiri / Built with Next.js,
        Redux, and Axios, using data from the CoinMarketCap API. [ July 2025 ]
      </p>
    </Box>
  );
};

export default LayoutFooter;
