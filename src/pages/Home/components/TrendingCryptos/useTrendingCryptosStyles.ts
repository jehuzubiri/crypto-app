import { useTheme } from "@mui/material";
import { MergedThemeOptions } from "@/models/Theme.model";
import { TheAnyTheme } from "@/models/General.model";

const useStyles = (): TheAnyTheme => {
  const theme: MergedThemeOptions = useTheme();
  const isLightMode = theme.palette?.mode === "light";

  return {
    root: {
      "& > p": {
        ...theme.cxTypography.paragraph,
        fontWeight: 800,
        color: isLightMode ? theme.palette?.grey?.[100] : theme.palette?.text,
        backgroundColor: theme.palette?.grey?.[isLightMode ? 500 : 400],
        padding: "0.75rem 1rem 0.5rem 1rem",
      },
      "& > div.list": {
        ...theme?.cxFlexBox?.col,
        padding: "0.5rem 0 1rem 0",
        // ITEM
        "& > div.list-item": {
          ...theme?.cxFlexBox?.rowStartBetween,
          padding: "0.5rem 1rem",
          cursor: "pointer",
          "&:hover": {
            backgroundColor: theme.palette?.grey?.[100],
          },
          // ITEM -left
          "& > div:nth-of-type(1)": {
            ...theme?.cxFlexBox?.rowStartBetween,
            gap: "0.75rem",
            "& > img": {
              minWidth: "35px",
              minHeight: "35px",
              border: `3px solid ${theme.palette?.grey?.[300]}`,
              borderRadius: "100%",
              overflow: "hidden",
              objectFit: "cover",
            },
            "& > div": {
              ...theme?.cxFlexBox?.col,
              gap: "0.125rem",
              // ITEM -left texts
              "& > p": {
                ...theme.cxTypography.paragraph,
                fontWeight: 700,
                color: theme.palette?.text,
                whiteSpace: "nowrap",
              },
              "& > p:nth-of-type(2)": {
                ...theme.cxTypography.tag,
                color: theme.palette?.grey?.[isLightMode ? 400 : 900],
              },
            },
          },
          // ITEM -right
          "& > div:nth-of-type(2)": {
            ...theme?.cxFlexBox?.col,
            gap: "0.125rem",
            // ITEM -right texts
            "& > p": {
              ...theme.cxTypography.paragraph,
              fontWeight: 700,
              color: theme.palette?.text,
              whiteSpace: "nowrap",
              textAlign: "right",
            },
            "& > p:nth-of-type(2)": {
              ...theme.cxTypography.tag,
              // @ts-ignore
              color: theme.palette?.success?.main,
              "&.error": {
                // @ts-ignore
                color: theme.palette?.error?.main,
              },
            },
          },
        },
      },
    },
  };
};

export default useStyles;
