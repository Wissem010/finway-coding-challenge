import { ENUM_REQUEST_TYPE } from "../constants/request-type.enum";
import { ENUM_RESPONSE_STATUS } from "../constants/response-status.enum";
import { IOperation } from "./operation.interface";

export interface IResponse {
  message: string;
  status: ENUM_RESPONSE_STATUS;
  type: ENUM_REQUEST_TYPE;
  data?: number | IOperation[];
}
