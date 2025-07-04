import axios, { AxiosInstance } from "axios";
import { TheAnyConst } from "@/models/General.model";
import { ServicesApiResponse } from "@/models/Services.model";

class API_MAIN {
  private rqx: AxiosInstance;

  constructor() {
    this.rqx = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_HOST,
      timeout: 60000, // 60s
      headers: {
        "Content-Type": "application/json",
        "Accept-Language": "en",
        "X-CMC_PRO_API_KEY": process.env.NEXT_PUBLIC_API_SECRET_KEY,
      },
    });
  }

  async get(
    service: string,
    params?: Record<string, TheAnyConst>,
    signal: AbortSignal | undefined = undefined
  ): Promise<TheAnyConst> {
    try {
      const res = await this.rqx.get(service, { params, signal });
      return this.handleSuccess(res);
    } catch (error: TheAnyConst) {
      return this.handleError(error);
    }
  }

  private handleSuccess(res: TheAnyConst): ServicesApiResponse {
    debugger;
    return res?.status === 200
      ? res.data
      : {
          ok: false,
          message: "Something went wrong. API error.",
        };
  }

  private handleError(error: TheAnyConst): ServicesApiResponse {
    debugger;
    if (error?.code !== "ERR_CANCELED") {
      console.error({ ERROR_MAIN_SERVICES_ERR_HANDLER: error });
    }

    if (error?.code === "ERR_NETWORK") {
      return {
        ok: false,
        message: "Oops! Failed server connection.",
      };
    }

    console.error({ error });
    debugger;

    return {
      ok: false,
      message: "Something went wrong. Server Error",
    };
  }
}

export default new API_MAIN();
