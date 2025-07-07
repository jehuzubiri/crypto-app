import { AppDefaultFiatValue } from "@/constant/App.const";
import { ServicesGetParams } from "@/models/General.model";
import API_MAIN from "@/services";

//CSR ===== start =====
export const getCryptos = async (
  params: ServicesGetParams,
  signal?: AbortSignal
) => {
  return await API_MAIN.postProxy(
    "cryptocurrency/listings/latest",
    params,
    signal
  );
};

export const getCryptoLogos = async (
  ids: Array<number | string>,
  signal?: AbortSignal
) => {
  if (!ids || !ids?.length) return { ok: false };
  return await API_MAIN.postProxy(
    "cryptocurrency/info",
    { id: ids.join(",") },
    signal
  );
};

export const getTrendingCryptos = async (
  fiatCurrency: "USD" | string,
  signal?: AbortSignal
) => {
  return await API_MAIN.postProxy(
    "cryptocurrency/listings/latest",
    {
      convert: fiatCurrency || AppDefaultFiatValue,
      sort: "percent_change_24h",
      sort_dir: "desc",
      limit: 5,
    },
    signal
  );
};

//SSR ===== start =====
export const getFiatCurrenciesSSR = async () => {
  return await API_MAIN.postProxySSR("fiat/map");
};

export const getTrendingCryptosSSR = async () => {
  return await API_MAIN.postProxySSR("cryptocurrency/listings/latest", {
    convert: AppDefaultFiatValue,
    sort: "percent_change_24h",
    sort_dir: "desc",
    limit: 5,
  });
};

export const getLatestCryptosSSR = async () => {
  return await API_MAIN.postProxySSR("cryptocurrency/listings/latest", {
    start: 1, // initial page
    limit: 20, // 20 items per page
    convert: AppDefaultFiatValue, // currency: default is USD
    sort: "market_cap", // 'price' | 'volume_24h'
    sort_dir: "desc", // descending
    cryptocurrency_type: "all", // 'all' | 'coins' | 'tokens'
  });
};
