"use client";

import Image from "next/image";
import { Box } from "@mui/material";
import React, { useRef, memo } from "react";

import { ThemeSwitch } from "@/components/General";
import { AppAssetImages } from "@/constant/App.const";

import useHeaderHeightHook from "../../useHeaderHeightHook";
import useStyle from "../../useLayoutStyles";
import useHeaderHooks from "./useHeaderHooks";
import FiatSelect from "./components/FiatSelect";

const LayoutHeader: React.FC = () => {
  const headerRef = useRef<HTMLDivElement>(null);

  useHeaderHeightHook(headerRef);
  const {
    isChecked,
    fiatMenuOpen,
    positionType,
    handleThemeSwitch,
    setFiatMenuOpen,
  } = useHeaderHooks();
  const style = useStyle({ position: positionType });

  return (
    <Box component="header" ref={headerRef} sx={style.header}>
      <Box>
        <Image
          src={AppAssetImages.logo}
          width={40}
          height={40}
          alt="Lorem Ipsum Logo"
        />
        <Box>
          <p>Crypto Tracker</p>
          <p>NextJS/TypeScript CoinMarketCap</p>
        </Box>
      </Box>
      <Box>
        <FiatSelect
          fiatMenuOpen={fiatMenuOpen}
          setFiatMenuOpen={setFiatMenuOpen}
        />
        <ThemeSwitch
          className="switch"
          checked={isChecked}
          onChange={handleThemeSwitch}
        />
      </Box>
    </Box>
  );
};

export default memo(LayoutHeader);
