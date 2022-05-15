import { ValidationError } from "class-validator";
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

  public serializeValidationErrors() {
    const errors: ValidationError[] = this.errors;
    
    this.errors = errors.map(err => {
        return { 
            field: err.property,
            reasons: err.constraints
        }
    });
    
    return this;
  }
}

export class SuccessResponse<T> extends IBaseSuccessResponse<T> {
  constructor(init: Partial<IBaseSuccessResponse<T>>) {
    super();
    Object.assign(this, init);
  }

  send(res: Response) {
    return res
      .status(this.statusCode < 0 ? 400 : this.statusCode)
      .json(this)
  }
}
