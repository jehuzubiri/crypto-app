import { useCallback, useEffect, useState } from "react";
import { useThemeContext } from "@/theme/ThemeContext";

import { AppRandomColors } from "@/constant/App.const";
import { TheAnyConst } from "@/models/General.model";

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
  // const { cryptos, portfolio } = data;
  const { mode } = useThemeContext();
  const isLightMode = mode === "light";

  const [options, setOptions] = useState({
    chart: {
      height: 300,
      width: 300,
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
      labels: {
        style: {
          colors: "#001e3c",
          fontSize: "12px",
        },
      },
    },
    yaxis: {
      // title: { text: "% Change" },
      labels: {
        formatter: (val: number) => `${val.toFixed(2)}%`,
        style: {
          colors: "#001e3c",
          fontSize: "12px",
        },
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

  const updateOptionValues = useCallback(() => {
    const colors = isLightMode ? "#001e3c" : "#D1D5DB";

    setOptions((prev) => ({
      ...prev,
      colors: AppRandomColors.slice(0, series.length),
      chart: {
        ...prev.chart,
        ...chartSize,
      },
      xaxis: {
        ...prev.xaxis,
        labels: {
          ...prev.xaxis.labels,
          style: {
            ...prev.xaxis.labels.style,
            colors,
          },
        },
      },
      yaxis: {
        ...prev.yaxis,
        labels: {
          ...prev.yaxis.labels,
          style: {
            ...prev.yaxis.labels.style,
            colors,
          },
        },
      },
      legend: {
        ...prev.legend,
        labels: {
          colors,
        },
      },
    }));
  }, [chartSize, isLightMode, series.length]);

  useEffect(() => {
    updateOptionValues();
  }, [chartSize, isLightMode, series.length]);

  return {
    options,
    series,
  };
};

export default useCryptoChartHook;
