"use client";

import { useRouter } from "next/navigation";

export const useRouterPush = () => {
  const router = useRouter();

  const routerPush = (
    pathname: string,
    query: Record<string, string | string[]> = {}
  ) => {
    const searchParams = new URLSearchParams();

    Object.entries(query).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((v) => searchParams.append(key, v));
      } else {
        searchParams.append(key, value);
      }
    });

    const queryString = searchParams.toString();
    const fullPath = queryString ? `${pathname}?${queryString}` : pathname;

    router.push(fullPath);
  };

  return routerPush;
};
