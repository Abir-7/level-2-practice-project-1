class AppError extends Error {
  public statusCode: number;
  public erroData: any;
  constructor(statusCode: number, message: string, erroData: any, stack = '') {
    super(message);
    this.statusCode = statusCode;
    this.erroData = erroData;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default AppError;
