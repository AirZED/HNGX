export interface AppErrorTypes {
  errorMessage: string;
  status: "failed" | "error";
  isOperational: boolean;
  statusCode: number;
  message: string;
  path: string | null;
  value: string | number | null;
  ermsg: string | null;
  errors: object;
  name: string | null;
  code: number | null;
}

class AppError extends Error {
  protected status: "failed" | "error";
  protected statusCode: number;
  protected isOperational: boolean;
  protected errorMessage: string;

  constructor(message: string, statusCode: number) {
    super(message);
    this.errorMessage = message;
    this.status = `${statusCode}`.startsWith("4") ? "failed" : "error";
    this.statusCode = statusCode;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;
