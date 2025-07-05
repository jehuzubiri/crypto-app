import React from "react";
import { Box, Typography } from "@mui/material";
import useStyle from "../../useLayoutStyles";

const LayoutFooter: React.FC = () => {
  const style = useStyle({});

  return (
    <Box component="footer" sx={style.footer}>
      <Typography>
        Simple cryptocurrency tracker built with Next.js, Redux, and Axios,
        using data from the CoinMarketCap API. / Jehu Zubiri (July 2025)
      </Typography>
    </Box>
  );
};

export default LayoutFooter;
