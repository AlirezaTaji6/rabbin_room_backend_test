import { StatusCodeEnum } from "../enums/status-code.enum";

export class IBaseSuccessResponse<T> {
  statusCode: number = StatusCodeEnum.OK;
  message: string = '';
  data?: T;
}
