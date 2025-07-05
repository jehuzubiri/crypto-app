import API_MAIN from "@/services";

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
      start: 1, // Pagination start
      limit: 100, // Max 100 per call
      convert: "USD", // Currency
      sort: "market_cap", // or 'price', 'volume_24h'
      sort_dir: "desc", // descending
      cryptocurrency_type: "coins", // 'all' | 'coins' | 'tokens'
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

export const getSSRLatestCryptos = async () => {
  return await API_MAIN.postProxySSR("cryptocurrency/listings/latest", {
    start: 1, // Pagination start
    limit: 100, // Max 100 per call
    convert: "USD", // Currency
    sort: "market_cap", // or 'price', 'volume_24h'
    sort_dir: "desc", // descending
    cryptocurrency_type: "coins", // 'all' | 'coins' | 'tokens'
  });
};
