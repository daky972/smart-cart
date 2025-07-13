import CustomError from "./custom-error";

export default abstract class ConflictError extends CustomError {
  constructor(message = 'Conflict') {
    super(409, message);
  }
}
