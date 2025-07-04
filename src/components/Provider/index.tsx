"use client";

import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { Provider as ReduxProvider } from "react-redux";
import { ThemeProvider } from "@/theme/ThemeContext";
import store from "@/redux/store";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AppRouterCacheProvider>
      <ReduxProvider store={store}>
        <ThemeProvider>{children}</ThemeProvider>
      </ReduxProvider>
    </AppRouterCacheProvider>
  );
}
