"use client";

import { Box } from "@mui/material";
import { StrictMode, FC, ReactNode, useEffect, useState } from "react";

import { LayoutFooter, LayoutHeader } from "./components";
import useStyle from "./useLayoutStyles";

const MainLayout: FC<{ children: ReactNode }> = ({ children }) => {
  const [headerHeight, setHeaderHeight] = useState<number>(0);
  const style = useStyle({ headerHeight });

  useEffect(() => {
    const updateHeight = () => {
      if (typeof window !== "undefined") {
        const storedHeight = localStorage.getItem("app-header-height");
        if (storedHeight) {
          const parsedHeight = parseFloat(storedHeight);
          if (!isNaN(parsedHeight)) {
            setHeaderHeight(parsedHeight);
          }
        }
      }
    };

    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  return (
    <StrictMode>
      <LayoutHeader />
      <Box component="main" sx={style.root}>
        {children}
      </Box>
      <LayoutFooter />
    </StrictMode>
  );
};

export default MainLayout;
