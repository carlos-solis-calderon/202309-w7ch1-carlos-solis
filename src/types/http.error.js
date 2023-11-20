export class HttpError extends Error {
  status;
  statusMessage;
  constructor(status, statusMessage, message, options) {
    super(message, options);
    this.status = status;
    this.statusMessage = statusMessage;
  }
}
