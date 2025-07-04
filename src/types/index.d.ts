import { TheAnyConst } from "@/utils/models/General.model";

declare module "*.jpg";
declare module "*.png";
declare module "*.svg" {
  const content: TheAnyConst;
  export default content;
}
