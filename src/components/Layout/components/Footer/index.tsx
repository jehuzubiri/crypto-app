import React from "react";
import { Box, Typography } from "@mui/material";
import useStyle from "../../useLayoutStyles";

const LayoutFooter: React.FC = () => {
  const style = useStyle({});

  return (
    <Box component="footer" sx={style.footer}>
      <Typography>Simple React.js/Next.js Project by Jehu Zubiri</Typography>
    </Box>
  );
};

export default LayoutFooter;
