"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
  ReactNode,
  useCallback,
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

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [mode, setMode] = useState<ThemeModes>("light");
  const [isMounted, setIsMounted] = useState(false);

  const theme = useMemo(() => getTheme(mode), [mode]);

  const setThemeMode = (newMode: ThemeModes) => {
    setMode(newMode);
    localStorage.setItem("theme-mode", newMode);
  };

  const toggleTheme = useCallback(() => {
    const newMode = mode === "light" ? "dark" : "light";
    setMode(newMode);
    localStorage.setItem("theme-mode", newMode);
  }, [mode]);

  useEffect(() => {
    const stored = localStorage.getItem("theme-mode") as ThemeModes | null;

    if (!stored) {
      const prefersLight = window.matchMedia(
        "(prefers-color-scheme: light)"
      ).matches;
      setMode(prefersLight ? "light" : "dark");
    } else setMode(stored);

    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.body.classList.remove("light-mode", "dark-mode");
      document.body.classList.add(`${mode}-mode`);
    }
  }, [mode]);

  if (!isMounted) return null;

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme, setThemeMode }}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};
