import React from "react";
import { Box } from "@mui/material";
import useStyle from "../../useLayoutStyles";

const LayoutFooter: React.FC = () => {
  const style = useStyle({});

  return (
    <Box component="footer" sx={style.footer}>
      <p>Main Layout Footer</p>
    </Box>
  );
};

export default LayoutFooter;
