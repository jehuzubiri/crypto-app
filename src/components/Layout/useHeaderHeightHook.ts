import { useEffect, useRef, RefObject } from "react";

const useHeaderHeightHook = (headerRef: RefObject<HTMLDivElement>): null => {
  const lastHeight = useRef<number | null>(null);

  useEffect(() => {
    const updateHeight = () => {
      if (headerRef.current) {
        const height = headerRef.current.offsetHeight - 0.5;

        if (lastHeight.current !== height) {
          localStorage.setItem("app-header-height", height.toString());
          lastHeight.current = height;
        }
      }
    };

    updateHeight();

    const resizeObserver = new ResizeObserver(() => {
      updateHeight();
    });

    if (headerRef.current) resizeObserver.observe(headerRef.current);

    return () => {
      if (headerRef.current) resizeObserver.unobserve(headerRef.current);
    };
  }, [headerRef]);

  return null;
};

export default useHeaderHeightHook;
