import { Response } from "express";

export enum HttpStatus {
  Ok = 200,
  NOT_FOUND = 404,
  UNAUTHORIZED = 401,
  CREATED = 201,
  FORBIDDEN = 403,
  INTERNAL_SERVER_ERROR = 500,
  BAD_REQUEST = 400,
}

export class HttpResponse {
  OK(res: Response, data: any): Response {
    return res.status(HttpStatus.Ok).json({
      status: HttpStatus.Ok,
      statusMsg: "Success",
      data: data,
    });
  }
  NotFound(res: Response, data: any): Response {
    return res.status(HttpStatus.NOT_FOUND).json({
      status: HttpStatus.NOT_FOUND,
      statusMsg: "Not found",
      error: data,
    });
  }
  Unauthorized(res: Response, data: any): Response {
    return res.status(HttpStatus.UNAUTHORIZED).json({
      status: HttpStatus.UNAUTHORIZED,
      statusMsg: "Unauthorized",
      error: data,
    });
  }
  Created(res: Response, data: any): Response {
    return res.status(HttpStatus.CREATED).json({
      status: HttpStatus.CREATED,
      statusMsg: "Created",
      data: data,
    });
  }
  Forbidden(res: Response, data: any): Response {
    return res.status(HttpStatus.FORBIDDEN).json({
      status: HttpStatus.FORBIDDEN,
      statusMsg: "Forbidden",
      error: data,
    });
  }
  Error(res: Response, data: any): Response {
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      statusMsg: "Internal server error",
      error: data,
    });
  }

  BadRequest(res: Response, data: any): Response {
    return res.status(HttpStatus.BAD_REQUEST).json({
      status: HttpStatus.BAD_REQUEST,
      statusMsg: "Bad request",
      error: data,
    });
  }
}
