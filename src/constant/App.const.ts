const siteUrl: string = process.env.NEXT_PUBLIC_SITE_URL || "";
const siteName: string | undefined = process.env.NEXT_PUBLIC_SITE_NAME;
const appName: string = process.env.NEXT_PUBLIC_APP_NAME || "crypto-app";

export const IsServerSide = typeof window === "undefined";
export const AppDefaultFiatValue = "USD";

export const AppConfig = {
  host: siteUrl?.replace(/https:\/\//, ""),
  appName,
  siteUrl,
  siteName,
  metaAlt: siteName,
  metaTitle: siteName,
  metaDescription: `${siteName} is the lorem ipsum dolor amet sample description here.`,
};

export const AppAssetImages = {
  logo: "/assets/coin-logo.svg",
  coin: "/assets/coin.svg",
  avatar: "/assets/avatar.svg",
};

export const AppRandomColors = [
  "#FF6B6B",
  "#6BCB77",
  "#4D96FF",
  "#FFD93D",
  "#845EC2",
  "#FF9671",
  "#00C9A7",
  "#F9F871",
  "#D65DB1",
  "#FF6F91",
  "#0081CF",
  "#FFC75F",
  "#C34A36",
  "#2C73D2",
  "#9D0191",
  "#FFB085",
  "#008F7A",
  "#F3C5FF",
  "#9ADE7B",
  "#FC5185",
  "#2D4059",
  "#FF8C42",
  "#6A0572",
  "#1FAB89",
  "#FFDA77",
  "#6F9CEB",
  "#9A1750",
  "#F8CB2E",
  "#1E6F5C",
  "#B83B5E",
];
