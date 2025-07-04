"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
  ReactNode,
} from "react";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import getTheme from "@/theme";

type ThemeModes = "light" | "dark";
interface ThemeContextProps {
  mode: ThemeModes;
  toggleTheme: () => void;
  setThemeMode: (mode: ThemeModes) => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useThemeContext must be used within ThemeProvider");
  }
  return context;
};

const getInitialMode = (): ThemeModes => {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("theme-mode") as
      | "light"
      | "dark"
      | null;
    if (stored) return stored;

    const prefersLight = window.matchMedia(
      "(prefers-color-scheme: light)"
    ).matches;
    return prefersLight ? "dark" : "light";
  }
  return "light"; // default fallback (SSR)
};

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [mode, setMode] = useState<ThemeModes>(getInitialMode);

  // for global usage
  const toggleTheme = () => {
    const newMode = mode === "light" ? "dark" : "light";
    setMode(newMode);
    localStorage.setItem("theme-mode", newMode);
  };

  const setThemeMode = (newMode: ThemeModes) => {
    setMode(newMode);
    localStorage.setItem("theme-mode", newMode);
  };

  const theme = useMemo(() => getTheme(mode), [mode]);

  // Update <body> class for global CSS syncing
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.body.classList.remove("light-mode", "dark-mode");
      document.body.classList.add(`${mode}-mode`);
    }
  }, [mode]);

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme, setThemeMode }}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};
