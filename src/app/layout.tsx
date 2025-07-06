import type { Metadata } from "next";
import { AppConfig } from "@/constant/App.const";
import Providers from "@/components/Provider";
import MainLayout from "@/components/Layout";

// import { getFiatCurrenciesSSR } from "@/services/apis";
import { dummyApiFiat } from "@/constant/Dummy.const";

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
  // const fiatKeys = await getFiatCurrenciesSSR();

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Providers>
          <MainLayout fiatKeys={dummyApiFiat}>{children}</MainLayout>
        </Providers>
      </body>
    </html>
  );
}
