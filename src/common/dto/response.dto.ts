import { Response } from "express";
import { IBaseErrorResponse } from "../interfaces/base-error-response.interface";
import { IBaseSuccessResponse } from "../interfaces/base-success-response.interface";


export class ErrorResponse extends IBaseErrorResponse {
  constructor(init: Partial<IBaseErrorResponse>) {
    super();
    Object.assign(this, init);
  }

  send(res: Response) {
    return res
      .status(this.statusCode < 0 ? 400 : this.statusCode)
      .json(this)
  }
}

export class SuccessResponse<T> extends IBaseSuccessResponse<T> {
  constructor(init: IBaseSuccessResponse<T>) {
    super();
    Object.assign(this, init);
  }

  send(res: Response) {
    return res
      .status(this.statusCode < 0 ? 400 : this.statusCode)
      .json(this)
  }
}
