import {
  useEffect,
  useRef,
  useState,
  MutableRefObject,
  useCallback,
} from "react";

interface Size {
  width: number;
  height: number;
}

const useContainerSizeHook = (
  addHeight = 0,
  addWidth = 0
): {
  containerSize: Size;
  containerRef: MutableRefObject<HTMLDivElement | null>;
} => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [containerSize, setContainerSize] = useState<Size>({
    width: 1,
    height: 1,
  });

  const updateSize = useCallback(() => {
    if (containerRef.current) {
      setContainerSize({
        height: containerRef.current.offsetHeight + addHeight,
        width: containerRef.current.offsetWidth + addWidth,
      });
    }
  }, []);

  useEffect(() => {
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => {
      window.removeEventListener("resize", updateSize);
    };
  }, []);

  return { containerSize, containerRef };
};

export default useContainerSizeHook;
