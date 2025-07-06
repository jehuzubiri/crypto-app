import { TheAnyConst } from "@/models/General.model";

export const getCryptoTableDataFromRaw = (cryptocurrencies: TheAnyConst) => {
  return cryptocurrencies.map((item: TheAnyConst) => {
    const quote = item.quote?.USD || {};

    return {
      name: item.name,
      symbol: item.symbol,
      price: Number(quote.price?.toFixed(2)) || 0,
      percent_24h: Number(quote.percent_change_24h?.toFixed(2)) || 0,
      marketCap: Number(quote.market_cap?.toFixed(2)) || 0,
      volume24h: Number(quote.volume_24h?.toFixed(2)) || 0,
      volumeChange24h: Number(quote.volume_change_24h?.toFixed(2)) || 0,
      circulatingSupply: Number(item.circulating_supply?.toFixed(2)) || 0,
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

    // Show with "+" if not cleanly divisible by 100,000
    const hasExtra = n % 100_000 !== 0;

    // If in billions, show raw M value (e.g. 1,000M)
    if (absValue >= 1_000_000_000) {
      return `${Math.round(millions).toLocaleString()}M`;
    }

    return `${millions.toFixed(1)}M${hasExtra ? "+" : ""}`;
  }

  // If value is less than 1, return fixed decimal without comma formatting
  if (absValue < 1) {
    return Number(n).toFixed(decimal);
  }

  // Format values >= 1 with commas
  return Number(n)
    .toFixed(decimal)
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
