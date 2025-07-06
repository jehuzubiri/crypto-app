import { AppRandomColors } from "@/constant/App.const";
import { TheAnyConst } from "@/models/General.model";
import { useState } from "react";

interface Size {
  width: number;
  height: number;
}

const series = [
  {
    name: "Bitcoin",
    data: [0.03, 0.05, 0.97, 3.42, 15.76, 31.33],
  },
  {
    name: "Ethereum Classic",
    data: [0.02, 3.07, 5.2, 7.1, 12.3, 28.5],
  },
  {
    name: "Ripple",
    data: [-0.1, -1.9, 0.4, 2.3, 6.8, 12.1],
  },
  {
    name: "Bitcoin Cash",
    data: [-0.2, -3.05, -1.1, 0.5, 2.8, 6.7],
  },
];

const labels = ["1h", "24h", "7d", "30d", "60d", "90d"];

const useCryptoChartHook = (chartSize: Size, data: TheAnyConst) => {
  const [options, setOptions] = useState({
    chart: {
      ...chartSize,
      type: "area",
      toolbar: { show: false },
    },
    stroke: {
      curve: "smooth",
      width: 2,
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: labels,
      // title: { text: "Timeframe" },
    },
    yaxis: {
      // title: { text: "% Change" },
      labels: {
        formatter: (val: number) => `${val.toFixed(2)}%`,
      },
    },
    tooltip: {
      y: {
        formatter: (val: number) => `${val.toFixed(2)}%`,
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        opacityFrom: 0.5,
        opacityTo: 0.1,
      },
    },
    colors: AppRandomColors.slice(0, series.length),
    legend: {
      position: "top",
      horizontalAlign: "left",
    },
  });

  return {
    options,
    series,
  };
};

export default useCryptoChartHook;
