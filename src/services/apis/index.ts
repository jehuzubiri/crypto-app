import { AppDefaultFiatValue } from "@/constant/App.const";
import API_MAIN from "@/services";

//CSR ===== start =====
export const getAllCurrencies = async (
  params: Object | null = {},
  signal?: AbortSignal
) => {
  //@DESC: params for trending
  // {
  //   sort: 'percent_change_24h',
  //   sort_dir: 'desc',
  //   limit: 10,
  //   convert: 'USD'
  // }

  return await API_MAIN.postProxy(
    "cryptocurrency/listings/latest",
    {
      start: 1,
      limit: 50,
      convert: "USD",
      sort: "market_cap",
      sort_dir: "desc",
      cryptocurrency_type: "coins",
    },
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
    limit: 50, // 50 items per page
    convert: AppDefaultFiatValue, // currency: default is USD
    sort: "market_cap", // 'price' | 'volume_24h'
    sort_dir: "desc", // descending
    cryptocurrency_type: "coins", // 'all' | 'coins' | 'tokens'
  });
};
