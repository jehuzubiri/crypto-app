import { useSelector } from "react-redux";
import { useEffect, useState, ChangeEvent } from "react";
import { useThemeContext } from "@/theme/ThemeContext";
import { RootState } from "@/redux/store";

type TypesHeaderPosition = "sticky" | "fixed";
interface TypesHeaderSettings {
  positionType: TypesHeaderPosition;
  test: boolean;
}

const useHeaderHooks = () => {
  const { fiatKeys } = useSelector((state: RootState) => state.app);
  // const { selected, menu } = fiatKeys;

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
    selectedFiat: fiatKeys.selected,
    handleThemeSwitch,
    setFiatMenuOpen,
  };
};

export default useHeaderHooks;
