import { TheAnyConst } from "./General.model";

export interface ServicesApiResponse {
  ok: boolean;
  message: string;
  data?: TheAnyConst;
  config?: TheAnyConst;
}
