//DESC: generic interfaces and types
export type NotificationType = "success" | "info" | "warning" | "error";
export type TheAnyConst = any;
export type TheAnyToDo = any;
export type TheAnyTheme = any;

export interface ServicesApiResponse {
  ok: boolean;
  message: string;
  data?: TheAnyConst;
  error?: TheAnyConst;
  config?: TheAnyConst;
}
