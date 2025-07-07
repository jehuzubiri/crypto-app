import { TheAnyConst } from "@/models/General.model";

export const getCryptoTableDataFromRaw = (
  cryptocurrencies: [] | TheAnyConst,
  selectedFiat: string | "USD" = "USD"
) => {
  if (!cryptocurrencies || !cryptocurrencies?.length) return [];

  return cryptocurrencies.map((item: TheAnyConst) => {
    const quote = item.quote[selectedFiat] || {};

    return {
      id: item.id,
      logo: item?.logo || null,
      name: item.name,
      symbol: item.symbol,
      price: quote?.price || 0,
      marketCap: quote?.market_cap || 0,
      volume24h: quote?.volume_24h || 0,
      percent_24h: quote?.percent_change_24h || 0,
      totalSupply: item.total_supply || 0,
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
