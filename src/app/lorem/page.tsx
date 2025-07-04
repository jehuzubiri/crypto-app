"use client";

import { TheAnyConst } from "@/models/General.model";
import LoremPage from "@/pages/Lorem";

async function getServerSide(): Promise<TheAnyConst> {
  //@DESC: SSR apis here...
  return {};
}

export default function Page() {
  const {} = getServerSide();

  return <LoremPage />;
}
