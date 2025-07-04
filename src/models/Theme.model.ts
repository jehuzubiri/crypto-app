import { ThemeOptions } from "@mui/material";

type FlexBoxType = {
  display: string;
  flexDirection: string;
  alignItems?: string;
  justifyContent?: string;
};

type FontStyleType = {
  fontSize: string;
  fontWeight: string;
  lineHeight?: string;
  letterSpacing?: string;
  color?: string;
};

export type BreakpointsKeyType = "up" | "down" | "between" | "only";

export type CustomImageType = {
  priority: boolean;
  height: number;
  width: number;
  style: {
    objectFit: string;
    width: string;
    height: string;
    objectPosition?: string;
  };
};
export interface CustomThemeOptions {
  cxTypography: {
    caption: FontStyleType;
    header: FontStyleType;
    subHeader: FontStyleType;
    paragraph: FontStyleType;
    tag: FontStyleType;
  };
  cxImage: {
    cover: CustomImageType;
    fill: CustomImageType;
  };
  cxFlexBox: {
    row: FlexBoxType;
    col: FlexBoxType;
    rowCenter: FlexBoxType;
    colCenter: FlexBoxType;
    rowCenterCenter: FlexBoxType;
    colCenterCenter: FlexBoxType;
    rowCenterBetween: FlexBoxType;
    colCenterBetween: FlexBoxType;
  };
}

export interface MergedThemeOptions extends ThemeOptions, CustomThemeOptions {}
