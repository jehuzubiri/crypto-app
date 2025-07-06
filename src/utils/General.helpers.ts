export const groupDataBySameKeyVal = (arr = [], key: string): Object => {
  const _ = require("lodash");
  let finalData = {};
  try {
    _.mapValues((finalData = _.groupBy(arr, key)), (listArr = []) =>
      listArr.map((categ) => _.omit(categ, key))
    );
  } catch (error) {}
  return finalData;
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

    // Show with "+" if not cleanly divisible by 100,000 (e.g. 1.234M)
    const hasExtra = n % 100_000 !== 0;

    // If in billions, show raw M value (e.g. 1,000M)
    if (absValue >= 1_000_000_000) {
      return `${Math.round(millions).toLocaleString()}M`;
    }

    return `${millions.toFixed(1)}M${hasExtra ? "+" : ""}`;
  }

  if (decimal === 0) {
    return Math.round(n).toLocaleString();
  }

  return Number(n)
    .toFixed(decimal)
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
