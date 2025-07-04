"use client";

import { createTheme } from "@mui/material";
import { MergedThemeOptions } from "@/models/Theme.model";
import { customTheme } from "./Custom";

const getTheme = (mode: "light" | "dark") => {
  const themeOptions: MergedThemeOptions = {
    palette: {
      mode,
      background: {
        default: mode === "light" ? "#ffffff" : "#0E0F18",
      },
      text: {
        primary: mode === "light" ? "#171717" : "#ededed",
      },
      info: {
        main: "#0057FF",
      },
      warning: {
        main: "#FFD101",
      },
      success: {
        main: mode === "light" ? "#2BAF21" : "#32CC86",
      },
      error: {
        main: mode === "light" ? "#F2383A" : "#FC3044",
      },
      grey: {
        100: "#f1f5f9",
        200: "#e2e8f0",
        300: "#cbd5e1",
        400: "#94a3b8",
        500: "#64748b",
        600: "#475569",
        700: "#334155",
        800: "#1e293b",
        900: "#0f172a",
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
