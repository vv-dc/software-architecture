export class HttpError extends Error {
  public statusCode: number;
  public data: unknown | undefined;

  constructor(
    message = 'Internal Server Error',
    statusCode = 500,
    data?: unknown
  ) {
    super(message);
    this.statusCode = statusCode;
    this.data = data;
  }
}

export class HttpNotFound extends HttpError {
  constructor(message: string, data?: unknown) {
    super(message, 404, data);
  }
}

export class HttpConflict extends HttpError {
  constructor(message: string, data?: unknown) {
    super(message, 409, data);
  }
}
