import _ from "lodash";
import { CryproParsedListItem, TheAnyConst } from "@/models/General.model";

type WithId = { id: number | string; [key: string]: any };

export const mergeByIdUnique = <T extends WithId>(
  array1: T[],
  array2: T[],
  key: string
): T[] => _.unionBy(array1, array2, key);

export const getCryptoTableDataFromRaw = (
  cryptocurrencies: CryproParsedListItem[] | TheAnyConst = [],
  selectedFiat: string | "USD" = "USD",
  excludeIds: string[] | number[] | null = []
) => {
  if (!cryptocurrencies?.length) return [];

  return cryptocurrencies
    .filter(
      // @ts-ignore
      (crypto: CryproParsedListItem) => !excludeIds?.includes(crypto?.id)
    )
    .map((crypto: CryproParsedListItem) => {
      const quote = crypto.quote[selectedFiat] || {};

      return {
        logo: crypto?.logo || null,
        price: quote?.price || 0,
        marketCap: quote?.market_cap || 0,
        volume24h: quote?.volume_24h || 0,
        percent_24h: quote?.percent_change_24h || 0,
        // original properties
        id: crypto.id,
        slug: crypto.slug,
        name: crypto.name,
        symbol: crypto.symbol,
        quote: crypto.quote,
        circulating_supply: crypto.circulating_supply,
        cmc_rank: crypto.cmc_rank,
        total_supply: crypto.total_supply || 0,
      };
    });
};

export const fiatAmountDisplayFormatter = (
  n: number | null | undefined,
  decimal: number = 2
): string => {
  if (n === null || n === undefined || n === 0) {
    return Number(0).toFixed(decimal);
  }

  const absValue = Math.abs(n);

  if (absValue >= 1_000_000) {
    const millions = n / 1_000_000;

    // show with "+" if not cleanly divisible by 100,000
    const hasExtra = n % 100_000 !== 0;

    // if in billions, show raw M value (e.g. 1,000M)
    if (absValue >= 1_000_000_000) {
      return `${Math.round(millions).toLocaleString()}M`;
    }

    return `${millions.toFixed(1)}M${hasExtra ? "+" : ""}`;
  }

  // if value is less than 1, return fixed decimal without comma formatting
  if (absValue < 1) {
    return Number(n).toFixed(decimal);
  }

  // format values >= 1 with commas
  return Number(n)
    .toFixed(decimal)
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
