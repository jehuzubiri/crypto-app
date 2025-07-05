import { useEffect, useState } from "react";

const useCheckScrollHook = (scrollVal: number = 30): boolean => {
  const [scrolled, setScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > scrollVal) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrollVal]);

  return scrolled;
};

export default useCheckScrollHook;
