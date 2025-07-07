import React from "react";
import { Box, Skeleton, useTheme } from "@mui/material";
import { MergedThemeOptions } from "@/models/Theme.model";

const useStyles = () => {
  const theme: MergedThemeOptions = useTheme();
  return {
    row: {
      ...theme?.cxFlexBox?.rowStartBetween,
      padding: "0.5rem 1rem",
      gap: "0.75rem",
      "& > span": {
        minWidth: "35px",
      },
      "& > div": {
        width: "100%",
      },
    },
  };
};

const LoaderMobile: React.FC<{ items?: number }> = ({ items = 5 }) => {
  const styles = useStyles();
  const loadingItems = Array.from({ length: items }, (_, i) => i + 1);

  return loadingItems.map((_, index) => (
    <Box key={`key${index}`} sx={styles.row}>
      <Skeleton animation="wave" variant="circular" width={35} height={35} />
      <Box>
        <Skeleton animation="wave" height={17.5} width="60%" />
        <Skeleton animation="wave" height={13.5} width="95%" />
      </Box>
    </Box>
  ));
};

export default React.memo(LoaderMobile);
