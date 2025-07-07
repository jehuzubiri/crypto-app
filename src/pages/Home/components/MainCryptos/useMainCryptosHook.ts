import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getCryptoTableDataFromRaw } from "@/utils/General.helpers";
import { setCryptos } from "@/redux/slices/App.slice";
import { getCryptoLogos, getCryptos } from "@/services/apis";

import {
  CryproParsedListItem,
  ServicesApiResponse,
  ServicesGetParams,
  TheAnyConst,
} from "@/models/General.model";
import { RootState } from "@/redux/store";
import { AppAssetImages } from "@/constant/App.const";

type TableColumnTypes = "name" | "price" | "change" | "supply";
interface SettingsFormData {
  loading: boolean;
  searchedList: CryproParsedListItem[];
  searchKey: string;
  activeTab: "all" | "portfolio";
}

const useMainCryptosHook = () => {
  const dispatch = useDispatch();
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

  const getLogosByCryptos = async (cryptoRes: ServicesApiResponse) => {
    let returnVal = {
      list: cryptoRes?.data || [],
      logos: {},
    };

    const ids = cryptoRes?.data?.map((item: TheAnyConst) => item.id);
    const resLogos = await getCryptoLogos(ids);
    const logos = {};

    // @ts-ignore
    if (resLogos?.ok && resLogos?.data) {
      // @ts-ignore
      const listData = Object.values(resLogos?.data || {}) || [];
      listData.forEach((item: TheAnyConst) => {
        logos[item?.id] = {
          src: item?.logo || AppAssetImages.coin,
          alt: `CoinMarketCap Crypto Logo (${item?.symbol})`,
          id: item?.id,
        };
      });
    }

    returnVal.logos = logos;

    return returnVal;
  };

  const handleColumnHeaderClick = useCallback(
    async (active: TableColumnTypes) => {
      if (cryptos?.loading) return;

      const controller = new AbortController();
      const signal = controller.signal;

      let sortedParams: ServicesGetParams = {
        start: 1,
        limit: 20,
        convert: selected,
        sort: "price",
        sort_dir: "desc",
        cryptocurrency_type: "all",
      };

      setSortSettings((prev) => {
        const isDesc =
          prev.active === active || prev.active === "" ? !prev.isDesc : true;
        sortedParams.sort_dir = isDesc ? "desc" : "asc";

        return {
          active,
          isDesc,
        };
      });

      try {
        if (["price", "change"].includes(active) && !signal?.aborted) {
          dispatch(setCryptos({ loading: true }));
          sortedParams.sort = active === "price" ? "price" : "volume_24h";
          const res = await getCryptos(sortedParams, signal);

          if (res?.ok && res?.data?.length) {
            const { list, logos } = await getLogosByCryptos(res);
            //@TODO: check portfolio ids and exclude / getCryptoTableDataFromRaw
            dispatch(
              setCryptos({
                logos,
                list: getCryptoTableDataFromRaw(list, selected),
              })
            );
          }

          dispatch(setCryptos({ loading: false }));
        }
      } catch (error) {
        console.error({ ERROR_GET_SORTED_CRYPTOS: error });
      }

      return () => {
        controller.abort();
      };
    },
    [sortSettings, selected, cryptos?.loading]
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

    if (
      !initList?.length ||
      active === "" ||
      (settings.activeTab === "all" && active !== "name")
    ) {
      return initList;
    }

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
  }, [
    settings?.searchedList,
    settings?.searchKey,
    settings.activeTab,
    sortSettings,
    mainList,
  ]);

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
    cryptoIsLoading: cryptos?.loading,
    displayLoadMore:
      settings.searchKey === "" &&
      cryptoList?.length &&
      settings.activeTab === "all" &&
      !cryptos?.loading,
  };
};

export default useMainCryptosHook;
