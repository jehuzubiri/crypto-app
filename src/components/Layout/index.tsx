"use client";

import { useDispatch } from "react-redux";
import { Box } from "@mui/material";
import { StrictMode, FC, ReactNode, useEffect, useState } from "react";

import { LayoutFooter, LayoutHeader } from "./components";
import { TheAnyConst } from "@/models/General.model";
import { setFiatKeys } from "@/redux/slices/App.slice";
import useStyle from "./useLayoutStyles";

const MainLayout: FC<{ children: ReactNode; fiatKeys: TheAnyConst }> = ({
  children,
  fiatKeys,
}) => {
  const dispatch = useDispatch();
  const [headerHeight, setHeaderHeight] = useState<number>(0);
  const style = useStyle({ headerHeight });

  useEffect(() => {
    if (fiatKeys?.ok && fiatKeys?.data?.length) {
      const menu = {};
      fiatKeys.data.forEach((item: TheAnyConst) => {
        menu[item.symbol] = {
          label: `${item.name} (${item.symbol})`,
          symbol: item.symbol,
          name: item.name,
        };
      });
      dispatch(setFiatKeys({ menu }));
    }
  }, [fiatKeys]);

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
