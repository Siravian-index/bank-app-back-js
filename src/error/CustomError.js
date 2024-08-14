

export class CustomError extends Error {
  
  constructor() {
    super("CustomError message")
    this.status = 500
    Object.setPrototypeOf(this, CustomError.prototype)
  }

  serialize() {
    return {
      message: this.message,
      status: this.status,
    }
  }

  getStatus() {
    return this.status
  }

}