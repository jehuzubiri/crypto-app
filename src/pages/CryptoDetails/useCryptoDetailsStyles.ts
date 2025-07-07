import { useTheme } from "@mui/material";
import { MergedThemeOptions } from "@/models/Theme.model";
import { TheAnyTheme } from "@/models/General.model";

const useStyles = (): TheAnyTheme => {
  const theme: MergedThemeOptions = useTheme();
  const isLightMode = theme.palette?.mode === "light";

  return {
    root: {
      ...theme?.cxFlexBox?.col,
      border: `1px solid ${theme.palette?.grey?.[200]}`,
      backgroundColor: theme.palette?.background?.default,
      padding: "2rem",
      borderRadius: "1rem",
      gap: "1rem",
      width: "100%",
      maxWidth: "30rem",
      "& > div.action": {
        ...theme?.cxFlexBox?.rowCenterBetween,
        gap: "1rem",
        "& > p": {
          ...theme.cxTypography.paragraph,
          fontWeight: 600,
          color: theme.palette?.grey?.[isLightMode ? 800 : 900],
          whiteSpace: "nowrap",
        },
        "& > svg": {
          color: theme.palette?.grey?.[isLightMode ? 800 : 900],
          height: "1.5rem",
          width: "1.5rem",
          cursor: "pointer",
        },
      },
      "& > div.header": {
        ...theme?.cxFlexBox?.rowCenter,
        gap: "1rem",
        "& > img": {
          minWidth: "45px",
          minHeight: "45px",
          border: `4px solid ${theme.palette?.grey?.[300]}`,
          borderRadius: "100%",
          overflow: "hidden",
          objectFit: "cover",
        },
        "& > div": {
          "& > p:nth-of-type(1)": {
            ...theme.cxTypography.header,
            fontWeight: 800,
            color: theme.palette?.text,
            whiteSpace: "nowrap",
          },
          "& > p:nth-of-type(2)": {
            ...theme.cxTypography.paragraph,
            fontWeight: 800,
            whiteSpace: "nowrap",
            // @ts-ignore
            color: theme.palette?.success?.main,
            "&.error": {
              // @ts-ignore
              color: theme.palette?.error?.main,
            },
          },
        },
      },
      "& > .mini-table": {
        ...theme?.cxFlexBox?.col,
        gap: "0.25rem",
        "& > div": {
          ...theme?.cxFlexBox?.rowCenterBetween,
          alignItems: "stretch",
          gap: "1rem",
          "& > div": {
            width: "100%",
            "& > p:nth-of-type(1)": {
              ...theme.cxTypography.tag,
              color: theme.palette?.grey?.[isLightMode ? 500 : 600],
              fontWeight: 600,
              whiteSpace: "nowrap",
            },
            "& > p:nth-of-type(2)": {
              ...theme.cxTypography.subHeader,
              color: theme.palette?.text,
              fontWeight: 800,
              whiteSpace: "nowrap",
            },
          },
        },
      },
      "& > div.desc": {
        ...theme?.cxFlexBox?.rowCenter,
        "& > p": {
          ...theme.cxTypography.paragraph,
          color: theme.palette?.text,
          fontWeight: 400,
        },
      },
    },
  };
};

export default useStyles;
