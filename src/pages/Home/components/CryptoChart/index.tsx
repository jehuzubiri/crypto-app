import React from "react";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";

import { ApexCharts } from "@/components/General";
import { RootState } from "@/redux/store";

import useStyles from "./useCryptoChartStyles";
import useContainerSizeHook from "./useContainerSizeHook";
import useCryptoChartHook from "./useCryptoChartHook";

const CryptoChart: React.FC = () => {
  const styles = useStyles();
  const { cryptos, portfolio } = useSelector((state: RootState) => state.app);
  const data = { cryptos, portfolio };

  const { containerRef, containerSize } = useContainerSizeHook(-24, -20);
  const { options, series } = useCryptoChartHook(containerSize, data);

  return (
    <Box sx={styles.root}>
      <p>Market Cap</p>
      <Box ref={containerRef} className="chart">
        <ApexCharts
          className="apexchart"
          type="area"
          // @ts-ignore
          options={options}
          series={series}
          width={containerSize.width}
          height={containerSize.height}
        />
      </Box>
    </Box>
  );
};

export default React.memo(CryptoChart);
