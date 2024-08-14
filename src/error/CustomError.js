

export class CustomError extends Error {
  
  constructor() {
    super("CustomError message")
    this.status = 500
    this.code = "CustomError's code"
    Object.setPrototypeOf(this, CustomError.prototype)
  }

  serialize() {
    return {
      message: this.message,
      code: this.code,
      status: this.status,
    }
  }

  getStatus() {
    return this.status
  }

}