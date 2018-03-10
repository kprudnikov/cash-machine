export class NoteUnavailableException extends Error {
  constructor(message = 'No such note') {
    super(message);
    this.message = message;
    this.name = 'NoteUnavailableException';

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, NoteUnavailableException);
    } else {
      this.stack = (new Error()).stack;
    }
  }
}

export class InvalidArgumentException extends Error {
  constructor(message = 'Invalid argument') {
    super(message);
    this.message = message;
    this.name = 'InvalidArgumentException';

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, InvalidArgumentException);
    } else {
      this.stack = (new Error()).stack;
    }
  }
}