import { useEffect, useState, ChangeEvent } from "react";
import { useThemeContext } from "@/theme/ThemeContext";

type TypesHeaderPosition = "sticky" | "fixed";
interface TypesHeaderSettings {
  positionType: TypesHeaderPosition;
  test: boolean;
}

const useHeaderHooks = () => {
  const { setThemeMode, mode } = useThemeContext();

  const [fiatMenuOpen, setFiatMenuOpen] = useState<boolean>(false);
  const [headerSettings, setHeaderSettings] = useState<TypesHeaderSettings>({
    test: false,
    positionType: "sticky",
  });

  const handleThemeSwitch = (event: ChangeEvent<HTMLInputElement>) => {
    setThemeMode(event.target.checked ? "dark" : "light");
  };

  useEffect(() => {
    setHeaderSettings((prev) => ({ ...prev, positionType: "fixed" }));
  }, []);

  return {
    positionType: headerSettings.positionType,
    fiatMenuOpen,
    isChecked: mode === "dark",
    handleThemeSwitch,
    setFiatMenuOpen,
  };
};

export default useHeaderHooks;
