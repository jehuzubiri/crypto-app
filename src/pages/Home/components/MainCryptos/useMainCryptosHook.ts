import { useCallback, useMemo, useState } from "react";
import { useSelector } from "react-redux";

import { getCryptoTableDataFromRaw } from "@/utils/General.helpers";
import { CryproParsedListItem } from "@/models/General.model";
import { RootState } from "@/redux/store";

interface SettingsFormData {
  searchedList: CryproParsedListItem[];
  searchKey: string;
  activeTab: "all" | "portfolio";
}

type TableColumnTypes = "name" | "price" | "change" | "supply";

const useMainCryptosHook = () => {
  const { fiatKeys, cryptos, portfolio } = useSelector(
    (state: RootState) => state.app
  );
  const { selected } = fiatKeys;
  const { loading, list } = cryptos;

  const [sortSettings, setSortSettings] = useState<{
    active: "" | TableColumnTypes;
    isDesc: boolean;
  }>({
    active: "",
    isDesc: true,
  });

  const [settings, setSettings] = useState<SettingsFormData>({
    searchedList: [],
    searchKey: "",
    activeTab: "all",
  });

  const mainList = useMemo(
    () =>
      getCryptoTableDataFromRaw(
        settings?.activeTab === "all" ? list : portfolio,
        selected
      ),
    [list, portfolio, settings?.activeTab, selected]
  );

  const handleColumnHeaderClick = useCallback(
    (active: TableColumnTypes) => {
      setSortSettings((prev) => ({
        active,
        isDesc:
          prev.active === active || prev.active === "" ? !prev.isDesc : true,
      }));
    },
    [sortSettings]
  );

  const columnHeaderIsSelected = (key: TableColumnTypes) => {
    return {
      isActive: sortSettings.active === key,
      isDesc: sortSettings.isDesc,
    };
  };

  const handleTabChange = (
    _: React.SyntheticEvent,
    activeTab: "all" | "portfolio"
  ) => {
    setSettings((prev) => ({ ...prev, activeTab }));
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSettings((prev) => ({ ...prev, searchKey: event.target.value }));
  };

  return {
    fiatKeySelected: selected,
    handleColumnHeaderClick,
    columnHeaderIsSelected,
    handleSearchChange,
    handleTabChange,
    sortSettings,
    settings,
    loading,
  };
};

export default useMainCryptosHook;
