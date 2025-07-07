import { useTheme } from "@mui/material";
import { MergedThemeOptions } from "@/models/Theme.model";
import { TheAnyTheme } from "@/models/General.model";
import mediaQuery from "@/theme/MediaQuery";

const useStyles = (): TheAnyTheme => {
  const theme: MergedThemeOptions = useTheme();
  const isLightMode = theme.palette?.mode === "light";
  const { LAPTOP } = mediaQuery("up");

  return {
    root: {
      ...theme?.cxFlexBox?.col,
      "& > p": {
        ...theme.cxTypography.paragraph,
        fontWeight: 800,
        color: isLightMode ? theme.palette?.grey?.[100] : theme.palette?.text,
        backgroundColor: theme.palette?.grey?.[isLightMode ? 500 : 400],
        padding: "0.75rem 1rem 0.5rem 1rem",
      },
      "& > div.chart": {
        ...theme?.cxFlexBox?.col,
        borderRadius: "0 0 0.75rem 0.75rem",
        padding: "0.5rem",
        height: "20rem",
        [LAPTOP]: {
          height: "100%",
          maxHeight: "18rem",
          minHeight: "18rem",
        },
      },
    },
  };
};

export default useStyles;
