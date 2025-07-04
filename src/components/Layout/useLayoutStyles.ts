import { useMediaQuery, useTheme } from "@mui/material";
import { MergedThemeOptions } from "@/models/Theme.model";
import { TheAnyTheme } from "@/models/General.model";

import mediaQuery from "@/theme/MediaQuery";
import useHeaderScrollHook from "./hooks/HeaderScroll.hook";

type StyleProps = {
  headerHeight?: number;
  position?: string;
};

const useStyle = ({ headerHeight, position }: StyleProps): TheAnyTheme => {
  const { scrolled } = useHeaderScrollHook();
  const theme: MergedThemeOptions = useTheme();

  const { TABLET: TABLET_above } = mediaQuery("up");
  const { MOBILE: MOBILE_below } = mediaQuery("down");
  const hideMenus = useMediaQuery(MOBILE_below);

  return {
    hideMenus,
    root: {
      border: `1px solid green`,
      marginTop: `${headerHeight}px`,
    },
    header: {
      ...theme?.cxFlexBox?.rowCenterBetween,
      borderBottom: `1px solid ${theme.palette?.grey?.[scrolled ? 600 : 300]}`,
      backgroundColor: theme.palette?.background,
      position,
      padding: "0.75rem 1rem",
      width: "100%",
      left: 0,
      [TABLET_above]: {
        padding: "1rem 1.5rem",
      },
    },
    footer: {
      border: `1px solid ${theme.palette?.grey?.[300]}`,
      padding: "0.75rem 1rem",
      [TABLET_above]: {
        padding: "1rem 1.5rem",
      },
      "& > p": {
        ...theme.cxTypography.paragraph,
        color: theme.palette?.text,
      },
    },
  };
};

export default useStyle;
