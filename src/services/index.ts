import axios, { AxiosInstance } from "axios";
import { TheAnyConst } from "@/models/General.model";
import { ServicesApiResponse } from "@/models/General.model";

class API_MAIN {
  private rqx: AxiosInstance;

  constructor() {
    this.rqx = axios.create({
      baseURL: "/api/coinmarketcap",
      timeout: 60000,
      headers: { "Content-Type": "application/json" },
    });
  }

  async postProxy(
    path: string,
    params: Record<string, TheAnyConst> = {},
    signal?: AbortSignal
  ): Promise<ServicesApiResponse> {
    try {
      const res = await this.rqx.post("/", { path, params }, { signal });
      return res?.data;
    } catch (error: TheAnyConst) {
      return this.handleError(error);
    }
  }

  async postProxySSR(
    path: string,
    params: Record<string, TheAnyConst> = {}
  ): Promise<ServicesApiResponse> {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_SITE_URL}api/coinmarketcap`,
        { path, params },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      return res?.data;
    } catch (error: TheAnyConst) {
      return this.handleError(error);
    }
  }

  private handleError(error: TheAnyConst): ServicesApiResponse {
    const errorResData = error?.response?.data;
    const apiIsCanceled = error?.code === "ERR_CANCELED";
    const message =
      errorResData?.message || "Something went wrong, server error.";

    if (!apiIsCanceled) {
      console.error({ ERROR_APP_SERVICES: error });
    }

    return {
      ok: errorResData?.ok || false,
      message: apiIsCanceled ? "Request was canceled." : message,
      error: errorResData?.error,
    };
  }
}

export default new API_MAIN();
