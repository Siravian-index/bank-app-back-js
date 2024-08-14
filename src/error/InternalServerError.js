import { CustomError } from "./CustomError.js"

export class InternalServerError extends CustomError {
  constructor(message = "Something went wrong, oops!") {
      super()
      this.status = 500
      this.message = message
  }
}