import type { Metadata } from "next";
import { AppConfig } from "@/constant/App.const";
// import { getFiatCurrencies } from "@/services/apis";
import Providers from "@/components/Provider";
import MainLayout from "@/components/Layout";

// @DESC: init app font
import localFont from "next/font/local";
import "@/styles/global.css";

const geistSans = localFont({
  src: "../../public/fonts/inter/Inter-Italic-VariableFont_opsz_wght.ttf",
  variable: "--font-inter-italic",
  weight: "100 200 300 400 500 600 700 800 900",
  style: "italic",
  display: "swap",
});

const geistMono = localFont({
  src: "../../public/fonts/inter/Inter-VariableFont_opsz_wght.ttf",
  variable: "--font-inter-variable",
  weight: "100 200 300 400 500 600 700 800 900",
  display: "swap",
});

// @DESC: init app SEO meta
export const metadata: Metadata = {
  title: AppConfig.metaTitle,
  description: AppConfig.metaDescription,
  icons: {
    icon: "/favico.ico",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const fiatKeys = await getFiatCurrencies();
  const fiatKeys = {
    ok: true,
    data: [
      {
        id: 2781,
        name: "United States Dollar",
        sign: "$",
        symbol: "USD",
      },
      {
        id: 2782,
        name: "Australian Dollar",
        sign: "$",
        symbol: "AUD",
      },
      {
        id: 2783,
        name: "Brazilian Real",
        sign: "R$",
        symbol: "BRL",
      },
    ],
  };
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Providers>
          <MainLayout fiatKeys={fiatKeys}>{children}</MainLayout>
        </Providers>
      </body>
    </html>
  );
}
