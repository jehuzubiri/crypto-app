"use client";

import { createTheme } from "@mui/material";
import { MergedThemeOptions } from "@/models/Theme.model";
import { customTheme } from "./Custom";

const getTheme = (mode: "light" | "dark") => {
  const themeOptions: MergedThemeOptions = {
    palette: {
      mode,
      background: {
        default: mode === "light" ? "#ffffff" : "#0a0a0a",
      },
      text: {
        primary: mode === "light" ? "#171717" : "#ededed",
      },
    },
    breakpoints: {
      values: {
        xs: 360,
        sm: 600,
        md: 800,
        lg: 1025,
        xl: 1280,
      },
    },
    ...customTheme,
  };

  return createTheme(themeOptions);
};

export default getTheme;
