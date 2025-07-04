"use client";

import { Box } from "@mui/material";
import { FC, useRef, useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import { useRouterPush } from "@/hooks/RouterPush.hook";
import useHeaderHeightHook from "../../hooks/HeaderHeight.hook";
import useAuthListenerHook from "../../hooks/AuthListener.hook";
import useStyle from "../../useLayoutStyles";

const LayoutHeader: FC = () => {
  const routerPush = useRouterPush();
  const headerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  const [positionType, setPositionType] = useState<"sticky" | "fixed">(
    "sticky"
  );
  const style = useStyle({ position: positionType });

  useHeaderHeightHook(headerRef);
  useAuthListenerHook();

  useEffect(() => {
    setPositionType("fixed");
  }, []);

  const handleNavigate = () => {
    const isOnSamplePage = pathname === "/lorem";
    routerPush(
      isOnSamplePage ? "/" : "lorem",
      isOnSamplePage ? {} : { id: "12", name: "Jehu" }
    );
  };

  return (
    <Box component="header" ref={headerRef} sx={style.header}>
      <p>Main Layout Header</p>
      <button onClick={handleNavigate}>Toggle Page</button>
    </Box>
  );
};

export default LayoutHeader;
