"use client";

import { TheAnyConst } from "@/models/General.model";
import { AppConfig } from "@/constant/App.const";
import HomePage from "@/pages/Home";

async function getServerSide(): Promise<TheAnyConst> {
  //@DESC: SSR apis here...
  return {};
}

export default function Page() {
  const {} = getServerSide();

  return (
    <HomePage
      data={`market_code: ${AppConfig.appName} & HOME PAGE current value is:`}
    />
  );
}
