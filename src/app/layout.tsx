import type { Metadata } from "next";
import { AppConfig } from "@/constant/App.const";
import Providers from "@/components/Provider";
import MainLayout from "@/components/Layout";

// @DESC: init app font
import localFont from "next/font/local";
import "@/styles/global.css";

const geistSans = localFont({
  src: "../../public/fonts/inter/Inter-Italic-VariableFont_opsz_wght.ttf",
  variable: "--font-inter-italic",
  weight: "100 900",
  style: "italic",
  display: "swap",
});

const geistMono = localFont({
  src: "../../public/fonts/inter/Inter-VariableFont_opsz_wght.ttf",
  variable: "--font-inter-variable",
  weight: "100 900",
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

async function gerServerSide(): Promise<void> {
  //@TODO: LOAD ON LAYOUT SSR MODE
  // > 1. get settings
  // > 2. check if settings return res.data.system.is_maintenance
  // > 3. return Maintenance Component
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  gerServerSide();

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Providers>
          <MainLayout>{children}</MainLayout>
        </Providers>
      </body>
    </html>
  );
}
