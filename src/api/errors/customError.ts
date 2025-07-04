export class CustomError extends Error {
  status: number | undefined

  constructor(message: string | undefined, status: number | undefined) {
    super(message)
    this.status = status
    if (typeof message === 'string') {
      this.message = message
    }
  }
}
