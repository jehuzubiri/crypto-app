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
        primary: mode === "light" ? "#001e3c" : "#D1D5DB",
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
        100: mode === "light" ? "#f1f5f9" : "#1A1B23",
        200: mode === "light" ? "#e2e8f0" : "#20212B",
        300: mode === "light" ? "#cbd5e1" : "#262833",
        400: mode === "light" ? "#94a3b8" : "#2D2F3B",
        500: mode === "light" ? "#64748b" : "#353848",
        600: mode === "light" ? "#475569" : "#3E4153",
        700: mode === "light" ? "#334155" : "#494C61",
        800: mode === "light" ? "#1e293b" : "#54566D",
        900: mode === "light" ? "#0f172a" : "#60637B",
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
