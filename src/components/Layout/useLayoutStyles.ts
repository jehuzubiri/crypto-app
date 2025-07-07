import { useTheme } from "@mui/material";
import { MergedThemeOptions } from "@/models/Theme.model";
import { TheAnyTheme } from "@/models/General.model";
import mediaQuery from "@/theme/MediaQuery";

type StyleProps = {
  headerHeight?: number;
  position?: string;
};

const useStyle = ({ headerHeight, position }: StyleProps): TheAnyTheme => {
  const theme: MergedThemeOptions = useTheme();
  const isLightMode = theme.palette?.mode === "light";
  const { TABLET, MOBILE } = mediaQuery("up");

  return {
    root: {
      ...theme?.cxFlexBox?.colCenter,
      backgroundColor: theme.palette?.grey?.[100],
      marginTop: `${headerHeight}px`,
      minHeight: "35rem",
      padding: "0.75rem 1rem",
      [TABLET]: {
        padding: "1rem 1.5rem",
      },
    },
    header: {
      zIndex: 999,
      ...theme?.cxFlexBox?.rowCenterBetween,
      borderBottom: `1px solid ${theme.palette?.grey?.[300]}`,
      backgroundColor: theme.palette?.background?.default,
      position,
      padding: "0.75rem 1rem",
      width: "100%",
      left: 0,
      [TABLET]: {
        padding: "1rem 1.5rem",
      },
      // Logo and Title
      "& > div:nth-of-type(1)": {
        ...theme?.cxFlexBox?.rowCenter,
        gap: "0.5rem",
        "& > div": {
          display: "none",
          [MOBILE]: {
            ...theme?.cxFlexBox?.col,
          },
          "& > p:nth-of-type(1)": {
            ...theme.cxTypography.subHeader,
            fontWeight: 900,
            color: theme.palette?.text,
          },
          "& > p:nth-of-type(2)": {
            ...theme.cxTypography.tag,
            color: isLightMode
              ? theme.palette?.grey?.[500]
              : theme.palette?.text,
          },
        },
      },
      // User Settings
      "& > div:nth-of-type(2)": {
        ...theme?.cxFlexBox?.rowCenter,
        gap: "0.75rem",
        "& > .switch": {
          marginRight: "-7px",
        },
        "& > .fiat-dropdown > div > div": {
          ...theme?.cxFlexBox?.rowCenter,
          gap: "0.25rem",
          "& > p": {
            ...theme.cxTypography.paragraph,
            color: theme.palette?.text,
          },
          "& > svg": {
            height: "0.875rem",
            width: "0.875rem",
            color: theme.palette?.text,
          },
        },
      },
    },
    headerFiatMenu: {
      ...theme?.cxFlexBox?.col,
      width: "16rem",
      "& > p": {
        ...theme.cxTypography.tag,
        color: theme.palette?.text,
        paddingBottom: "0.5rem",
        borderBottom: `1px solid ${theme.palette?.grey?.[200]}`,
        whiteSpace: "nowrap",
      },
      "& > div": {
        ...theme?.cxFlexBox?.col,
        width: "100%",
        overflowY: "auto",
        maxHeight: "10rem",
        padding: "0.25rem 0",
        "& > p": {
          ...theme.cxTypography.paragraph,
          color: theme.palette?.text,
          padding: "0.35rem 0.325rem",
          cursor: "pointer",
          "&:hover": {
            backgroundColor: theme.palette?.grey?.[100],
          },
          "&.selected": {
            backgroundColor: theme.palette?.grey?.[300],
            borderRadius: "0.125rem",
            fontWeight: 600,
          },
        },
      },
    },
    footer: {
      ...theme?.cxFlexBox?.colCenter,
      borderTop: `1px solid ${theme.palette?.grey?.[300]}`,
      backgroundColor: theme.palette?.background?.default,
      padding: "1.5rem",
      [TABLET]: {
        padding: "1rem",
      },
      "& > p": {
        ...theme.cxTypography.tag,
        color: theme.palette?.text,
        textAlign: "center",
        fontWeight: 300,
      },
    },
  };
};

export default useStyle;
