import { Response } from "express";

export class IBaseErrorResponse {
  statusCode: number;
  message: string;
  errors: any[];
}
