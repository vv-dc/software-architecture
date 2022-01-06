export abstract class AbstractError extends Error {
  protected constructor(message: string) {
    super(message);
    this.name = new.target.name;
  }
}

export class EntityNotFound extends AbstractError {
  constructor(message: string) {
    super(message);
  }
}

export class EntityConflict extends AbstractError {
  constructor(message: string) {
    super(message);
  }
}
