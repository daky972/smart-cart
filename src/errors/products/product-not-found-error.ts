import NotFoundError from "../definitions/not-found-error";

export default class ProductNotFoundError extends NotFoundError {

  constructor(message?: string) {
    super(message || 'Product Not Found');
  }
}
