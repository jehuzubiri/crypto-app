"use client";

import Image from "next/image";
import { Box, Typography } from "@mui/material";
import React, { FC, useRef, useEffect, useState, memo } from "react";

import { ThemeSwitch } from "@/components/General";
import { AppAssetImages } from "@/constant/App.const";
import { useThemeContext } from "@/theme/ThemeContext";
import useHeaderHeightHook from "../../hooks/HeaderHeight.hook";
import useStyle from "../../useLayoutStyles";

const LayoutHeader: FC = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const [positionType, setPositionType] = useState<"sticky" | "fixed">(
    "sticky"
  );
  useHeaderHeightHook(headerRef);

  const { setThemeMode, mode } = useThemeContext();
  const style = useStyle({ position: positionType });

  const handleThemeSwitch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setThemeMode(event.target.checked ? "dark" : "light");
  };

  useEffect(() => {
    setPositionType("fixed");
  }, []);

  return (
    <Box component="header" ref={headerRef} sx={style.header}>
      <Box>
        <Image
          src={AppAssetImages.logo}
          width={40}
          height={40}
          alt="Test Alternative Text"
        />
        <Box>
          <Typography>Crypto Tracker</Typography>
          <Typography>NextJS/TypeScript with CoinMarketCap</Typography>
        </Box>
      </Box>
      <Box>
        <ThemeSwitch
          className="switch"
          checked={mode === "dark"}
          onChange={handleThemeSwitch}
        />
      </Box>
    </Box>
  );
};

export default memo(LayoutHeader);
