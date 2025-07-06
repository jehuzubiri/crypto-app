import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";

// import { getCryptoLogos } from "@/services/apis";
import { AppAssetImages } from "@/constant/App.const";
import { ServicesApiResponse, TheAnyConst } from "@/models/General.model";
import { setCryptos, setTrendingCryptos } from "@/redux/slices/App.slice";
import {
  dummyApiCryptoListLOGOs,
  dummyApiCryptoTrendingLOGOs,
} from "@/constant/Dummy.const";

const useHomeHooks = (
  cryptoList: ServicesApiResponse,
  cryptoTrending: ServicesApiResponse
) => {
  const dispatch = useDispatch();

  const getInitialCryptoLogos = useCallback(
    async (signal?: AbortSignal) => {
      try {
        dispatch(setCryptos({ logoIsLoading: false }));
        if (signal?.aborted) return;
        if (!cryptoList?.ok || !cryptoList?.data?.length) return;
        dispatch(setCryptos({ list: cryptoList?.data }));
        // const ids = cryptoList?.data?.map((item: TheAnyConst) => item.id);
        // const resLogos = await getCryptoLogos(ids, signal);
        const resLogos = dummyApiCryptoListLOGOs;
        const logos = {};

        if (resLogos?.ok && resLogos?.data) {
          const listData = Object.values(resLogos?.data || {}) || [];
          listData.forEach((item) => {
            logos[item?.id] = {
              src: item?.logo || AppAssetImages.logo,
              alt: `CoinMarketCap Crypto Logo (${item?.symbol})`,
              id: item?.id,
            };
          });
        }
        dispatch(setCryptos({ logoIsLoading: false, logos }));
      } catch (error) {
        console.error({ ERROR_PAGE_HOME_GET_CRYPTO_LOGOS: error });
        dispatch(setCryptos({ logoIsLoading: false }));
      }
    },
    [cryptoList]
  );

  const getInitialTrendingLogos = useCallback(
    async (signal?: AbortSignal) => {
      try {
        dispatch(setTrendingCryptos({ logoIsLoading: false }));
        if (signal?.aborted) return;
        if (!cryptoTrending?.ok || !cryptoTrending?.data?.length) return;
        dispatch(setTrendingCryptos({ list: cryptoTrending?.data }));

        // const ids = cryptoTrending?.data?.map((item: TheAnyConst) => item.id);
        // const resLogos = await getCryptoLogos(ids, signal);
        const resLogos = dummyApiCryptoTrendingLOGOs;
        const logos = {};

        if (resLogos?.ok && resLogos?.data) {
          const listData = Object.values(resLogos?.data || {}) || [];
          listData.forEach((item) => {
            logos[item?.id] = {
              src: item?.logo || AppAssetImages.logo,
              alt: `CoinMarketCap Crypto Logo (${item?.symbol})`,
              id: item?.id,
            };
          });
        }
        dispatch(setTrendingCryptos({ logoIsLoading: false, logos }));
      } catch (error) {
        console.error({ ERROR_PAGE_HOME_GET_CRYPTO_LOGOS: error });
        dispatch(setTrendingCryptos({ logoIsLoading: false }));
      }
    },
    [cryptoTrending]
  );

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    dispatch(setCryptos({ logoIsLoading: true }));
    getInitialCryptoLogos(signal);

    return () => {
      abortController.abort();
    };
  }, [cryptoList]);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    dispatch(setTrendingCryptos({ logoIsLoading: true }));
    getInitialTrendingLogos(signal);

    return () => {
      abortController.abort();
    };
  }, [cryptoTrending]);

  return {};
};

export default useHomeHooks;
