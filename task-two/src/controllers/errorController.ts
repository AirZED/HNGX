import { Request, Response, NextFunction } from "express";
import AppError, { AppErrorTypes } from "../utils/appError";

class ErrorController {
  constructor(protected env: string) {
    this.env = env;
  }

  handleErrorResponse = (
    err: AppErrorTypes,
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || "error";

    if (this.env === "development") {
      return this.handleDevError(err, res);
    }

    if (this.env === "production") {
      let error: any;

      if (err.name === "CastError") {
        error = this.handleCastErrorDB(err);
      } else if (err.code === 11000) {
        error = this.handleDuplicateFieldsDB(err);
      } else if (err.name === "ValidationError") {
        error = this.handleValidateErrorDB(err);
      } else if (err.name === "JsonWebTokenError") {
        error = this.hendleJWTError();
      } else if (err.name === "TokenExpiredError") {
        error = this.handleJWTExpireError();
      }

      return this.handleProdError(error || err, res);
    }
  };

  handleDevError = (err: AppErrorTypes, res: Response) => {
    res.status(err.statusCode).json({
      message: err.message,
      status: err.status,
      err: err,
    });
  };

  handleProdError = (err: AppErrorTypes, res: Response) => {
    if (err.isOperational) {
      res
        .status(err.statusCode)
        .json({ message: err.message, status: err.status });
    } else {
      res.status(500).json({
        message: "Something really bad went wrong",
        status: "failed",
      });
    }
  };

  handleJWTExpireError = () => {
    return new AppError("jwt has expired", 404);
  };

  handleCastErrorDB = (err: AppErrorTypes) => {
    return new AppError(`Invalid ${err.path}: ${err.value}`, 400);
  };

  handleDuplicateFieldsDB = (err: AppErrorTypes) => {
    const value = err.ermsg ? err.ermsg.match(/(["'])(\\?.)*?\1/)![0] : null;

    return new AppError(
      `Duplicate field value: ${value}. Please use another value!`,
      400
    );
  };

  handleValidateErrorDB = (err: AppErrorTypes) => {
    const errors: string[] = Object.values(err.errors).map(
      (el: any) => el.message
    );
    const message = `Invalid input data. ${errors.join(". ")}`;
    return new AppError(message, 400);
  };

  hendleJWTError = () => {
    return new AppError("Invalid Token, Please log in again", 401);
  };
}

const errorController = new ErrorController(process.env.NODE_ENV || "");

export default errorController;
