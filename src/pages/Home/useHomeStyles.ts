import { useTheme } from "@mui/material";
import { MergedThemeOptions } from "@/models/Theme.model";
import { TheAnyTheme } from "@/models/General.model";

import mediaQuery from "@/theme/MediaQuery";

const useStyle = (): TheAnyTheme => {
  const theme: MergedThemeOptions = useTheme();
  const { TABLET: TABLET_above } = mediaQuery("up");

  return {
    root: {
      border: `1px solid ${theme.palette?.grey?.[300]}`,
      padding: "0.75rem 1rem",
      [TABLET_above]: {
        border: `1px solid ${theme.palette?.grey?.[600]}`,
        padding: "1rem 1.5rem",
      },
    },
  };
};

export default useStyle;
