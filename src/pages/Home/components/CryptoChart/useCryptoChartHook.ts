import { useCallback, useEffect, useState } from "react";
import { useThemeContext } from "@/theme/ThemeContext";

import { AppRandomColors } from "@/constant/App.const";
import { CryproParsedListItem, TheAnyConst } from "@/models/General.model";
import { fiatAmountDisplayFormatter } from "@/utils/General.helpers";

interface Size {
  width: number;
  height: number;
}

const labels = ["1h", "24h", "7d", "30d", "60d", "90d"];

const useCryptoChartHook = (chartSize: Size, data: TheAnyConst) => {
  const { cryptos, portfolio } = data;

  const { mode } = useThemeContext();
  const isLightMode = mode === "light";

  const [series, setSeries] = useState([]);
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
      labels: {
        formatter: (val: number) => `${val}%`,
        style: {
          colors: "#001e3c",
          fontSize: "12px",
        },
      },
    },
    tooltip: {
      y: {
        formatter: (val: number) => `${fiatAmountDisplayFormatter(val)}%`,
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

  const transformCryptoData = (cryptocurrencies: CryproParsedListItem[]) => {
    return cryptocurrencies.map((item: CryproParsedListItem) => {
      const quote = item.quote?.USD || {};
      const data = labels.map((label) => {
        const key = `percent_change_${label.toLowerCase()}`;
        return typeof quote[key] === "number" ? Number(quote[key]) : 0;
      });

      return {
        name: item.name,
        data,
      };
    });
  };

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
      tooltip: {
        ...prev.tooltip,
        theme: mode,
        y: {
          formatter: (val: number) => `${fiatAmountDisplayFormatter(val)}%`,
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

  const updateSeriesValue = useCallback(() => {
    const cryptoList = cryptos?.list || [];
    let newSeriesData: TheAnyConst = [];

    if (!cryptoList?.length) return;

    if (portfolio?.length) {
      newSeriesData = transformCryptoData(portfolio);
    } else {
      newSeriesData = transformCryptoData(cryptoList.slice(0, 5));
    }

    setSeries(newSeriesData);
  }, [cryptos?.list, portfolio]);

  useEffect(() => {
    updateOptionValues();
  }, [chartSize, isLightMode, series.length]);

  useEffect(() => {
    updateSeriesValue();
  }, [cryptos?.list, portfolio]);

  return {
    options,
    series,
  };
};

export default useCryptoChartHook;
