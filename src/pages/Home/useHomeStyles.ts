import { useTheme } from "@mui/material";
import { MergedThemeOptions } from "@/models/Theme.model";
import { TheAnyTheme } from "@/models/General.model";

import mediaQuery from "@/theme/MediaQuery";

const useStyles = (): TheAnyTheme => {
  const theme: MergedThemeOptions = useTheme();
  const { LAPTOP } = mediaQuery("up");

  return {
    root: {
      ...theme?.cxFlexBox?.col,
      gap: "1.25rem",
      width: "100%",
      maxWidth: "70rem",
      // section 1
      "& > div:nth-of-type(1)": {
        ...theme?.cxFlexBox?.col,
        [LAPTOP]: {
          ...theme?.cxFlexBox?.rowStartBetween,
          alignItems: "stretch",
          gap: "1.25rem",
        },
        "& > div": {
          borderRadius: "0.75rem",
          overflow: "hidden",
        },
        // section 1 - chart
        "& > div:nth-of-type(1)": {
          flex: 1.35,
          border: `1px solid ${theme.palette?.grey?.[200]}`,
          backgroundColor: theme.palette?.background?.default,
          padding: "1rem",
        },
        // section 1 - trending
        "& > div:nth-of-type(2)": {
          flex: 0.65,
          display: "none",
          border: `1px solid ${theme.palette?.grey?.[200]}`,
          backgroundColor: theme.palette?.background?.default,
          padding: "1rem",
          [LAPTOP]: {
            ...theme?.cxFlexBox?.col,
          },
        },
      },
      // section 2
      "& > div:nth-of-type(2)": {
        border: `1px solid ${theme.palette?.grey?.[200]}`,
        backgroundColor: theme.palette?.background?.default,
        padding: "1rem",
        borderRadius: "0.75rem",
        overflow: "hidden",
      },
    },
  };
};

export default useStyles;
