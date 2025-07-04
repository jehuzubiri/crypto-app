"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  ReactNode,
} from "react";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import getTheme from "@/theme";

interface ThemeContextProps {
  mode: "light" | "dark";
  toggleTheme: () => void;
  setThemeMode: (mode: "light" | "dark") => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useThemeContext must be used within ThemeProvider");
  }
  return context;
};

const getInitialMode = (): "light" | "dark" => {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("theme-mode") as
      | "light"
      | "dark"
      | null;
    if (stored) return stored;

    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: light)"
    ).matches;
    return prefersDark ? "dark" : "light";
  }
  return "light"; // default fallback (SSR)
};

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [mode, setMode] = useState<"light" | "dark">(getInitialMode);

  // for global usage
  const toggleTheme = () => {
    const newMode = mode === "light" ? "dark" : "light";
    setMode(newMode);
    localStorage.setItem("theme-mode", newMode);
  };

  const setThemeMode = (newMode: "light" | "dark") => {
    setMode(newMode);
    localStorage.setItem("theme-mode", newMode);
  };

  // Update <body> class for global CSS syncing
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.body.classList.remove("light-mode", "dark-mode");
      document.body.classList.add(`${mode}-mode`);
    }
  }, [mode]);

  const theme = useMemo(() => getTheme(mode), [mode]);

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme, setThemeMode }}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};
