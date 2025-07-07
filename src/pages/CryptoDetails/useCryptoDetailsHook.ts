import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

import { TheAnyConst } from "@/models/General.model";
import { RootState } from "@/redux/store";

import { fiatAmountDisplayFormatter } from "@/utils/General.helpers";
import { getCryptoDetails } from "@/services/apis";

const useCryptoDetailsHook = (slug: string) => {
  const router = useRouter();

  const { fiatKeys, portfolio } = useSelector((state: RootState) => state.app);
  const { selected } = fiatKeys;
  const fiatCurrency = fiatKeys?.menu?.[selected] || { sign: "$" };

  const [details, setDetails] = useState<{}>({
    name: "--",
    description: "--",
    valueA: `${fiatCurrency?.sign || ""} 0.00 (${selected})`,
    valueB: `0.00 (--)`,
    marketCap: `0.00 ---`,
    volumeHr: `${fiatCurrency?.sign || ""} 0.00`,
    maximumSupply: "0.00",
    totalSupply: "0.00",
    logo: null,
    onPortfolio: false,
    isNegative: false,
  });

  const getDetails = useCallback(
    async (signal: AbortSignal) => {
      try {
        const res = await getCryptoDetails(slug, signal);

        if (
          !res[0]?.ok &&
          (res[0]?.error?.statusCode == 404 ||
            res[0]?.error?.status?.error_code == 400)
        ) {
          router.push("/");
        }

        if (res[0]?.ok) {
          const resMeta: TheAnyConst = Object.values(res[0]?.data || {})[0];
          const resData: TheAnyConst = Object.values(res[1]?.data || {})[0];
          const findOnSaved = portfolio.find((c) => c?.id == resData?.id);

          const cryptoSymbol = resData?.symbol || "";
          const quoteChange = resData?.quote[selected]?.percent_change_1h || 0;
          const isNegative = quoteChange < 0;
          const quoteChangePrefix = isNegative ? "" : "+";

          const quoteChangeRatio =
            (resData?.quote[selected]?.price || 0) * (quoteChange / 100);

          const quotePrice = fiatAmountDisplayFormatter(
            resData?.quote[selected]?.price || 0,
            quoteChangeRatio < 0.01 && quoteChangeRatio > 0 ? 4 : 2
          );

          setDetails({
            name: `${resMeta?.name} (${cryptoSymbol})`,
            description: resMeta?.description,
            logo: resMeta?.logo,
            isNegative,
            valueA: `${fiatCurrency?.sign || ""}${quotePrice} (${selected})`,
            valueB: `${quoteChangePrefix}${fiatAmountDisplayFormatter(
              quoteChangeRatio,
              quoteChangeRatio < 0.01 && quoteChangeRatio > 0 ? 6 : 2
            )} (${fiatAmountDisplayFormatter(quoteChange)}%)`,
            marketCap: fiatAmountDisplayFormatter(resData?.market_cap),
            volumeHr: `${fiatCurrency?.sign || ""} ${fiatAmountDisplayFormatter(
              quoteChange
            )}`,
            maximumSupply: fiatAmountDisplayFormatter(resData?.max_supply || 0),
            totalSupply: fiatAmountDisplayFormatter(resData?.total_supply || 0),
            onPortfolio: !!findOnSaved,
          });
        }
      } catch (error) {
        console.error({ ERROR_GET_CRYPTO_DETAILS: error });
      }
    },
    [details, portfolio]
  );

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    getDetails(signal);

    return () => {
      abortController.abort();
    };
  }, [slug]);

  return {
    ...details,
    fiatCurrency: fiatKeys?.menu?.[selected] || { sign: "$" },
  };
};

export default useCryptoDetailsHook;
