"use client";

import Image from "next/image";
import { Box, Typography } from "@mui/material";
import { FC, useRef, memo } from "react";

import { FaChevronDown } from "react-icons/fa";
import { Dropdown, ThemeSwitch } from "@/components/General";
import { AppAssetImages } from "@/constant/App.const";

import useHeaderHeightHook from "../../useHeaderHeightHook";
import useStyle from "../../useLayoutStyles";
import useHeaderHooks from "./useHeaderHooks";

const LayoutHeader: FC = () => {
  const headerRef = useRef<HTMLDivElement>(null);

  useHeaderHeightHook(headerRef);
  const {
    isChecked,
    selectedFiat,
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
          alt="Test Alternative Text"
        />
        <Box>
          <Typography>Crypto Tracker</Typography>
          <Typography>NextJS/TypeScript with CoinMarketCap</Typography>
        </Box>
      </Box>
      <Box>
        <Dropdown
          className="fiat-dropdown"
          open={fiatMenuOpen}
          setOpen={setFiatMenuOpen}
          content={<Box>Test</Box>}
        >
          <Box>
            <Typography>{selectedFiat}</Typography>
            <FaChevronDown />
          </Box>
        </Dropdown>
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
