import NotFoundError from "../definitions/not-found-error";

export default class BrandNotFoundError extends NotFoundError {
  constructor(id?: string) {
    super(`Brand ${id} not found`);
  }
}
