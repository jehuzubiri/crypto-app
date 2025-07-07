import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AppAssetImages } from "@/constant/App.const";
import {
  TheAnyConst,
  ServicesGetParams,
  ServicesApiResponse,
} from "@/models/General.model";
import {
  mergeByIdUnique,
  getCryptoTableDataFromRaw,
} from "@/utils/General.helpers";

import { getCryptoLogos, getCryptos } from "@/services/apis";
import { setCryptos, setTrendingCryptos } from "@/redux/slices/App.slice";
import { RootState } from "@/redux/store";

const useHomeHooks = (
  cryptoList: ServicesApiResponse,
  cryptoTrending: ServicesApiResponse
) => {
  const dispatch = useDispatch();
  const { fiatKeys, cryptos } = useSelector((state: RootState) => state.app);
  const { selected } = fiatKeys;

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

  const getInitialCryptoLogos = useCallback(
    async (signal?: AbortSignal) => {
      try {
        if (signal?.aborted) return;
        if (!cryptoList?.ok || !cryptoList?.data?.length) return;
        dispatch(setCryptos({ loading: true }));

        const { list, logos } = await getLogosByCryptos(cryptoList);

        //@TODO: check portfolio ids and exclude
        dispatch(
          setCryptos({
            logos,
            loading: false,
            list: getCryptoTableDataFromRaw(list, selected),
          })
        );
      } catch (error) {
        console.error({ ERROR_PAGE_HOME_GET_CRYPTO_LOGOS: error });
        dispatch(setCryptos({ loading: false }));
      }
    },
    [cryptoList]
  );

  const getInitialTrendingLogos = useCallback(
    async (signal?: AbortSignal) => {
      try {
        if (signal?.aborted) return;
        if (!cryptoTrending?.ok || !cryptoTrending?.data?.length) return;
        dispatch(setTrendingCryptos({ loading: true }));

        const { list, logos } = await getLogosByCryptos(cryptoTrending);
        dispatch(
          setTrendingCryptos({
            logos,
            loading: false,
            list: getCryptoTableDataFromRaw(list, selected),
          })
        );
      } catch (error) {
        dispatch(setTrendingCryptos({ loading: false }));
        console.error({ ERROR_PAGE_HOME_GET_CRYPTO_LOGOS: error });
      }
    },
    [cryptoTrending]
  );

  const loadMoreCryptos = useCallback(async () => {
    const controller = new AbortController();
    const signal = controller.signal;

    try {
      dispatch(setCryptos({ loading: true }));
      const currentPage = cryptos?.page || 0;
      let params: ServicesGetParams = {
        start: currentPage + 1,
        limit: 20,
        convert: selected,
        sort: cryptos?.sort,
        sort_dir: "desc",
        cryptocurrency_type: "all",
      };
      const res = await getCryptos(params, signal);

      if (res?.ok && res?.data?.length) {
        const { list, logos: newLogos } = await getLogosByCryptos(res);
        //@TODO: check portfolio ids and exclude / getCryptoTableDataFromRaw
        const isNextPage = cryptos.page < params.start;
        const newList = getCryptoTableDataFromRaw(list, selected);

        dispatch(
          setCryptos({
            page: params.start,
            sort: params.sort,
            list: isNextPage
              ? mergeByIdUnique(cryptos?.list, newList, "id")
              : newList,
            logos: isNextPage ? { ...cryptos?.logos, ...newLogos } : newLogos,
          })
        );
      }

      dispatch(setCryptos({ loading: false }));
    } catch (error) {
      dispatch(setCryptos({ loading: false }));
      console.error({ ERROR_LOAD_MORE_CRYPTOS: error });
    }

    return () => {
      controller.abort();
    };
  }, [selected, cryptos?.sort, cryptos?.page, cryptos?.list]);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    getInitialCryptoLogos(signal);

    return () => {
      abortController.abort();
    };
  }, [cryptoList]);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    getInitialTrendingLogos(signal);

    return () => {
      abortController.abort();
    };
  }, [cryptoTrending]);

  return {
    loadMoreCryptos,
  };
};

export default useHomeHooks;
