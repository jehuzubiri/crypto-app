import { useCallback, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";

import { getCryptoTableDataFromRaw } from "@/utils/General.helpers";
import { CryproParsedListItem } from "@/models/General.model";
import { RootState } from "@/redux/store";

type TableColumnTypes = "name" | "price" | "change" | "supply";
interface SettingsFormData {
  loading: boolean;
  searchedList: CryproParsedListItem[];
  searchKey: string;
  activeTab: "all" | "portfolio";
}

const useMainCryptosHook = () => {
  const { fiatKeys, cryptos, portfolio } = useSelector(
    (state: RootState) => state.app
  );

  const { selected } = fiatKeys;
  const [sortSettings, setSortSettings] = useState<{
    active: "" | TableColumnTypes;
    isDesc: boolean;
  }>({
    active: "",
    isDesc: true,
  });

  const [settings, setSettings] = useState<SettingsFormData>({
    loading: false,
    searchedList: [],
    searchKey: "",
    activeTab: "all",
  });

  const mainList = useMemo(
    () =>
      getCryptoTableDataFromRaw(
        settings?.activeTab === "all" ? cryptos?.list : portfolio,
        selected
      ),
    [cryptos?.list, portfolio, settings?.activeTab, selected]
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
    setSortSettings({
      active: "",
      isDesc: true,
    });
    setSettings((prev) => ({
      ...prev,
      activeTab, // here
      searchKey: "",
      searchedList: [],
    }));
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSettings((prev) => ({ ...prev, searchKey: event.target.value }));
  };

  useEffect(() => {
    setSettings((prev) => ({ ...prev, loading: true }));
    if (settings?.searchKey !== "" && mainList?.length) {
      setTimeout(() => {
        setSettings((prev) => ({ ...prev, loading: false }));
      }, 500);
    } else
      setSettings((prev) => ({ ...prev, searchedList: [], loading: false }));
  }, [mainList, settings?.searchKey]);

  return {
    fiatKeySelected: selected,
    handleColumnHeaderClick,
    columnHeaderIsSelected,
    handleSearchChange,
    handleTabChange,
    sortSettings,
    settings,
    loading: settings.loading,
    cryptoList: settings?.searchKey !== "" ? settings?.searchedList : mainList,
  };
};

export default useMainCryptosHook;
