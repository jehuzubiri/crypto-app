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
      const { searchKey } = settings;
      const searchedList = [...mainList].filter((currency) =>
        currency?.name.toLowerCase().includes(searchKey.toLocaleLowerCase())
      );

      setTimeout(() => {
        setSettings((prev) => ({ ...prev, searchedList, loading: false }));
      }, 500);
    } else
      setSettings((prev) => ({ ...prev, searchedList: [], loading: false }));
  }, [mainList, settings?.searchKey]);

  const cryptoList = useMemo(() => {
    const { searchKey, searchedList } = settings;
    const { active, isDesc } = sortSettings;
    let initList = searchKey !== "" ? searchedList : mainList;

    if (!initList?.length || active === "") return initList;
    initList = initList.sort(
      (a: CryproParsedListItem, b: CryproParsedListItem) => {
        switch (active) {
          case "name":
            return isDesc
              ? b.name.localeCompare(a.name)
              : a.name.localeCompare(b.name);
          case "price":
          case "change":
            const keys = {
              price: "price",
              change: "percent_24h",
            };
            return isDesc
              ? b[keys[active]] - a[keys[active]]
              : a[keys[active]] - b[keys[active]];
          default:
            return 0;
        }
      }
    );

    return initList;
  }, [settings?.searchKey, settings?.searchedList, mainList, sortSettings]);

  return {
    fiatKeySelected: selected,
    handleColumnHeaderClick,
    columnHeaderIsSelected,
    handleSearchChange,
    handleTabChange,
    sortSettings,
    settings,
    loading: settings.loading,
    cryptoList,
  };
};

export default useMainCryptosHook;
