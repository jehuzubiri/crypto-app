"use client";

import React from "react";
import Image from "next/image";
import { Box } from "@mui/material";
import { useRouter } from "next/navigation";
import { IoArrowBackOutline } from "react-icons/io5";

import { AppAssetImages } from "@/constant/App.const";
import { TheAnyConst } from "@/models/General.model";
import useCryptoDetailsHook from "./useCryptoDetailsHook";
import useStyles from "./useCryptoDetailsStyles";

const CryptoDetails: React.FC<{ slug: string }> = ({ slug = "" }) => {
  const styles = useStyles();
  const router = useRouter();
  const data: TheAnyConst = useCryptoDetailsHook(slug);

  return (
    <Box sx={styles.root}>
      <Box className="action">
        <IoArrowBackOutline onClick={() => router.push("/")} />
        <p>{data?.name}</p>
      </Box>
      <Box className="header">
        <Image
          src={data?.logo || AppAssetImages.coin}
          alt={"CoinMarketCap Crypto Logo"}
          width={45}
          height={45}
        />
        <Box>
          <p>{data?.valueA}</p>
          <p className={data?.isNegative ? "error" : ""}>${data?.valueB}</p>
        </Box>
      </Box>
      <Box className="mini-table">
        <Box>
          <Box>
            <p>Market Cap</p>
            <p>{data?.marketCap}</p>
          </Box>
          <Box>
            <p>Volumn (1Hr)</p>
            <p>{data?.volumeHr}</p>
          </Box>
        </Box>
        <Box>
          <Box>
            <p>Maximum Supply</p>
            <p>{data?.maximumSupply}</p>
          </Box>
          <Box>
            <p>Total Supply</p>
            <p>{data?.totalSupply}</p>
          </Box>
        </Box>
      </Box>
      <Box className="desc">
        <p>{data?.desc}</p>
      </Box>
    </Box>
  );
};

export default React.memo(CryptoDetails);
