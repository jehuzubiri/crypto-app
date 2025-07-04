import { CustomImageType, CustomThemeOptions } from "@/models/Theme.model";

const handleImgType = (objectFit: "cover" | "fill"): CustomImageType => ({
  priority: true,
  height: 100,
  width: 100,
  style: {
    objectFit,
    width: "100%",
    height: "100%",
  },
});

export const customTheme: CustomThemeOptions = {
  //@DESC: <Image {...theme.cxImage.cover}
  cxImage: {
    cover: handleImgType("cover"),
    fill: handleImgType("fill"),
  },
  //@DESC: type-class-name {...theme.cxTypography.<key>}
  cxTypography: {
    caption: {
      color: "white",
      fontSize: "2.25em",
      fontWeight: "700",
      lineHeight: "1.6em",
      letterSpacing: "0.01em",
    },
    header: {
      color: "white",
      fontSize: "1.75em",
      fontWeight: "700",
      lineHeight: "1.8125em",
      letterSpacing: "0.01em",
    },
    subHeader: {
      color: "white",
      fontSize: "1.125em",
      fontWeight: "700",
      lineHeight: "1.36125rem",
      letterSpacing: "0.02em",
    },
    paragraph: {
      color: "white",
      fontSize: "0.875em",
      fontWeight: "400",
      lineHeight: "1.25em",
      letterSpacing: "0.02em",
    },
    tag: {
      fontSize: "0.75em",
      fontWeight: "400",
      lineHeight: "1.125em",
      letterSpacing: "0",
    },
  },
  //@DESC: type-class-name {...theme.cxFlexBox.<key>}
  cxFlexBox: {
    row: {
      display: "flex",
      flexDirection: "row",
    },
    col: {
      display: "flex",
      flexDirection: "column",
    },
    rowCenter: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
    },
    colCenter: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    rowCenterCenter: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
    },
    colCenterCenter: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    },
    rowCenterBetween: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    colCenterBetween: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "space-between",
    },
  },
};
