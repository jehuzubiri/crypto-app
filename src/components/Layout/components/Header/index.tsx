"use client";

import { Box } from "@mui/material";
import { FC, useRef, useEffect, useState, memo } from "react";

import { useThemeContext } from "@/theme/ThemeContext";
import useHeaderHeightHook from "../../hooks/HeaderHeight.hook";
import useAuthListenerHook from "../../hooks/AuthListener.hook";
import useStyle from "../../useLayoutStyles";

const LayoutHeader: FC = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const [positionType, setPositionType] = useState<"sticky" | "fixed">(
    "sticky"
  );

  const style = useStyle({ position: positionType });
  const { setThemeMode, mode } = useThemeContext();

  useHeaderHeightHook(headerRef);
  useAuthListenerHook();

  useEffect(() => {
    setPositionType("fixed");
  }, []);

  return (
    <Box component="header" ref={headerRef} sx={style.header}>
      <p>Main Layout Header</p>
      <button
        onClick={() => setThemeMode(mode === "light" ? "dark" : "light")}
      >{`Switch to ${mode === "light" ? "dark" : "light"} mode`}</button>
    </Box>
  );
};

export default memo(LayoutHeader);
