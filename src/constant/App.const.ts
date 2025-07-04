const siteUrl: string = process.env.NEXT_PUBLIC_SITE_URL || "";
const siteName: string | undefined = process.env.NEXT_PUBLIC_SITE_NAME;
const appName: string = process.env.NEXT_PUBLIC_APP_NAME || "crypto-app";

export const IsServerSide = typeof window === "undefined";

export const AppConfig = {
  host: siteUrl?.replace(/https:\/\//, ""),
  appName,
  siteUrl,
  siteName,
  metaAlt: siteName,
  metaTitle: siteName,
  metaDescription: `${siteName} is the lorem ipsum dolor amet sample description here.`,
};
