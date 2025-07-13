import ConflictError from "../definitions/conflict-error";

export default class BrandAlreadyExistsError extends ConflictError {
  constructor(name: string) {
    super(`Brand ${name} already exists`);
  }
}
