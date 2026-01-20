export class CustomError extends Error {
  statusCode
  constructor(statusCode = 200, message) {
    super(message)
    this.statusCode = statusCode
    Error.captureStackTrace(this, this.constructor)
  }
}
