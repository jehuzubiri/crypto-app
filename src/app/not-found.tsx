"use client";

import { useEffect } from "react";
import { useRouterPush } from "@/hooks/RouterPush.hook";

export default function Page() {
  const routerPush = useRouterPush();

  useEffect(() => {
    routerPush("/");
  }, []);

  return <></>;
}
