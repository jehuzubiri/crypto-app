import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// import { getCryptoLogos } from "@/services/apis";
import { AppAssetImages } from "@/constant/App.const";
import { ServicesApiResponse, TheAnyConst } from "@/models/General.model";
import { getCryptoTableDataFromRaw } from "@/utils/General.helpers";
import { setCryptos, setTrendingCryptos } from "@/redux/slices/App.slice";
import { RootState } from "@/redux/store";
import {
  dummyApiCryptoListLOGOs,
  dummyApiCryptoTrendingLOGOs,
} from "@/constant/Dummy.const";

const useHomeHooks = (
  cryptoList: ServicesApiResponse,
  cryptoTrending: ServicesApiResponse
) => {
  const dispatch = useDispatch();
  const { fiatKeys } = useSelector((state: RootState) => state.app);
  const { selected } = fiatKeys;

  const getInitialCryptoLogos = useCallback(
    async (signal?: AbortSignal) => {
      try {
        if (signal?.aborted) return;
        if (!cryptoList?.ok || !cryptoList?.data?.length) return;
        //@TODO: filter cryptoList removed all exists on portfolio
        dispatch(
          setCryptos({
            list: getCryptoTableDataFromRaw(cryptoList?.data, selected),
          })
        );

        // const ids = cryptoList?.data?.map((item: TheAnyConst) => item.id);
        // const resLogos = await getCryptoLogos(ids, signal);
        const resLogos = dummyApiCryptoListLOGOs;
        const logos = {};

        if (resLogos?.ok && resLogos?.data) {
          const listData = Object.values(resLogos?.data || {}) || [];
          listData.forEach((item) => {
            logos[item?.id] = {
              src: item?.logo || AppAssetImages.coin,
              alt: `CoinMarketCap Crypto Logo (${item?.symbol})`,
              id: item?.id,
            };
          });
        }
        dispatch(setCryptos({ logos }));
      } catch (error) {
        console.error({ ERROR_PAGE_HOME_GET_CRYPTO_LOGOS: error });
      }
    },
    [cryptoList]
  );

  const getInitialTrendingLogos = useCallback(
    async (signal?: AbortSignal) => {
      try {
        if (signal?.aborted) return;
        if (!cryptoTrending?.ok || !cryptoTrending?.data?.length) return;
        dispatch(
          setTrendingCryptos({
            list: getCryptoTableDataFromRaw(cryptoTrending?.data, selected),
          })
        );

        // const ids = cryptoTrending?.data?.map((item: TheAnyConst) => item.id);
        // const resLogos = await getCryptoLogos(ids, signal);
        const resLogos = dummyApiCryptoTrendingLOGOs;
        const logos = {};

        if (resLogos?.ok && resLogos?.data) {
          const listData = Object.values(resLogos?.data || {}) || [];
          listData.forEach((item) => {
            logos[item?.id] = {
              src: item?.logo || AppAssetImages.coin,
              alt: `CoinMarketCap Crypto Logo (${item?.symbol})`,
              id: item?.id,
            };
          });
        }
        dispatch(setTrendingCryptos({ logos }));
      } catch (error) {
        console.error({ ERROR_PAGE_HOME_GET_CRYPTO_LOGOS: error });
      }
    },
    [cryptoTrending]
  );

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

  return {};
};

export default useHomeHooks;
