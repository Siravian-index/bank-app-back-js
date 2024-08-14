

export class GenericError extends CustomError {
  constructor(params) {
    super()
    this.code = params.code
    this.message = params.message
    this.status = params.status
  }
}