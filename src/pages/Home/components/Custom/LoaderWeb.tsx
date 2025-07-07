import React from "react";
import { Box, Skeleton } from "@mui/material";

const LoaderWeb: React.FC = () => {
  const loadingItems = Array.from({ length: 5 }, (_, i) => i + 1);

  return loadingItems.map((_, index) => {
    const loadingColumns = Array.from({ length: 4 }, (_, i) => i + 1);
    return (
      <Box key={`key${index}`} className="t-row-loading">
        <Box className="name">
          <Skeleton
            animation="wave"
            variant="circular"
            width={35}
            height={35}
          />
          <Skeleton animation="wave" height={13.5} width="100%" />
        </Box>
        {loadingColumns?.map((_, childIndex) => (
          <Skeleton
            key={`key${childIndex}`}
            animation="wave"
            height={13.5}
            width="100%"
          />
        ))}
      </Box>
    );
  });
};

export default React.memo(LoaderWeb);
