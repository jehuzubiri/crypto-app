import { useMediaQuery, useTheme } from "@mui/material";
import { MergedThemeOptions } from "@/models/Theme.model";
import { TheAnyTheme } from "@/models/General.model";
import mediaQuery from "@/theme/MediaQuery";

const useStyles = (): TheAnyTheme => {
  const theme: MergedThemeOptions = useTheme();
  const isLightMode = theme.palette?.mode === "light";
  const { MOBILE, TABLET } = mediaQuery("up");

  return {
    isUpTabletScreen: useMediaQuery(TABLET),
    root: {
      ...theme?.cxFlexBox?.col,
      "& > p": {
        ...theme.cxTypography.paragraph,
        fontWeight: 800,
        color: isLightMode ? theme.palette?.grey?.[800] : theme.palette?.text,
        backgroundColor: theme.palette?.grey?.[isLightMode ? 300 : 600],
        padding: "0.75rem 1rem 0.5rem 1rem",
      },
      "& > .load-more": {
        ...theme?.cxFlexBox?.colCenter,
        padding: "1rem 1rem 2rem 1rem",
        "& > p": {
          ...theme.cxTypography.paragraph,
          color: isLightMode ? theme.palette?.grey?.[800] : theme.palette?.text,
          border: `1px solid ${theme.palette?.grey?.[isLightMode ? 300 : 600]}`,
          cursor: "pointer",
          textAlign: "center",
          padding: "0.75rem",
          minWidth: "10rem",
          borderRadius: "0.25rem",
          transition: "all 0.3s",
          "&:active": {
            backgroundColor: theme.palette?.grey?.[isLightMode ? 300 : 600],
          },
        },
      },
    },
    actionBar: {
      ...theme?.cxFlexBox?.col,
      gap: "1rem",
      padding: "1rem 1rem 0.5rem 1rem",
      [MOBILE]: {
        ...theme?.cxFlexBox?.rowCenterBetween,
      },
      // SELECT
      "& > .MuiTabs-root": {
        width: "fit-content",
        padding: "0.125rem",
        border: `1px solid ${theme.palette?.grey?.[isLightMode ? 300 : 600]}`,
        minHeight: "2rem",
        borderRadius: "0.25rem",
        "& > div > div.MuiTabs-list": {
          borderRadius: "0.25rem",
          button: {
            minHeight: "2rem",
            minWidth: "5.625rem",
            borderRadius: "0.25rem",
            padding: "0.25rem 0.5rem",
            textTransform: "unset",
            // button text
            ...theme.cxTypography.paragraph,
            fontWeight: 600,
            color: isLightMode
              ? theme.palette?.grey?.[700]
              : theme.palette?.text?.primary,
            "&.Mui-selected": {
              backgroundColor: theme.palette?.grey?.[isLightMode ? 200 : 100],
            },
          },
        },
        "& .MuiTabs-indicator": {
          display: "none",
        },
      },
      // SEARCH - INPUT
      "& > .MuiTextField-root": {
        minWidth: "15rem",
        "& input, & label": {
          ...theme.cxTypography.paragraph,
          color: theme.palette?.text,
        },
      },
    },
    list: {
      ...theme?.cxFlexBox?.col,
      padding: "0.75rem 0 1rem 0",
      // TABLE - HEADER
      "& > .t-head": {
        ...theme?.cxFlexBox?.rowCenterBetween,
        gap: "1rem",
        padding: "0.25rem 1rem 0.5rem 1rem",
        borderBottom: `1px solid ${
          theme.palette?.grey?.[isLightMode ? 200 : 400]
        }`,
        "& > .t-cell": {
          ...theme?.cxFlexBox?.rowCenter,
          justifyContent: "flex-end",
          gap: "0.5rem",
          width: "100%",
          height: "100%",
          "&.name": {
            justifyContent: "flex-start",
          },
          "&.action": {
            maxWidth: "8rem",
          },
          "& > p": {
            ...theme.cxTypography.tag,
            fontWeight: 600,
            color: theme.palette?.grey?.[isLightMode ? 500 : 800],
            whiteSpace: "nowrap",
          },
          "& > svg": {
            color: theme.palette?.grey?.[isLightMode ? 500 : 800],
            height: "1rem",
            width: "1rem",
            "&.desc": {
              transform: "rotate(180deg)",
            },
          },
          "&.active": {
            "& > p, & > svg": {
              color: theme.palette?.text?.primary,
            },
          },
          "&.sortable > p, &.sortable > svg": {
            cursor: "pointer",
          },
        },
      },
      // TABLE - ROW With Data
      "& > .t-row": {
        ...theme?.cxFlexBox?.rowCenterBetween,
        gap: "1rem",
        padding: "0.5rem 1rem",
        "& > .t-cell": {
          ...theme?.cxFlexBox?.rowCenter,
          justifyContent: "flex-end",
          gap: "0.5rem",
          width: "100%",
          "& > p": {
            ...theme.cxTypography.tag,
            fontWeight: 600,
            color: theme.palette?.text,
            whiteSpace: "nowrap",
          },
          "&.name": {
            justifyContent: "flex-start",
            "& > img": {
              minWidth: "35px",
              minHeight: "35px",
              border: `3px solid ${theme.palette?.grey?.[300]}`,
              borderRadius: "100%",
              overflow: "hidden",
              objectFit: "cover",
            },
            "& > p": {
              ...theme.cxTypography.paragraph,
              color: theme.palette?.text,
              fontWeight: 700,
            },
          },
          "&.change": {
            "& > p": {
              // @ts-ignore
              color: theme.palette?.success?.main,
            },
            "&.error > p": {
              // @ts-ignore
              color: theme.palette?.error?.main,
            },
          },
          "&.action": {
            maxWidth: "8rem",
            gap: "1rem",
            "& > svg": {
              height: "1.125rem",
              width: "1.125rem",
              borderRadius: "0.125rem",
              cursor: "pointer",
              transition: "all 0.3s",
              "&:hover": {
                transform: "scale(1.1)",
              },
              "&:active": {
                transform: "scale(0.9)",
              },
            },
          },
        },
        "&:hover": {
          backgroundColor: theme.palette?.grey?.[100],
        },
      },
      // TABLE - ROW Loading
      "& > .t-row-loading": {
        ...theme?.cxFlexBox?.rowCenterBetween,
        gap: "1rem",
        padding: "0.5rem 1rem",
        "& > .name": {
          ...theme?.cxFlexBox?.rowCenter,
          width: "100%",
          gap: "0.5rem",
          "& > span": {
            minWidth: "35px",
          },
        },
        "& > span:nth-last-of-type(1)": {
          maxWidth: "8rem",
        },
      },
    },
    listMobile: {
      ...theme?.cxFlexBox?.col,
      padding: "0.75rem 0 1rem 0",
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
  };
};

export default useStyles;
