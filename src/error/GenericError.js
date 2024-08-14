import { CustomError } from "./CustomError.js"


export class GenericError extends CustomError {
  constructor(params) {
    super()
    this.message = params.message
    this.status = params.status
  }
}