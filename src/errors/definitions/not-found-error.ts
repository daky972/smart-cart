import CustomError from "./custom-error";

/**
 * Svaki model koji imamo moze da baci gresku 404 (NotFound). Zato ne zelimo da pravimo za svaki model `ProductNotFoundError`,
 * `UserNotFoundError`, ... vec zelimo da napravimo apstraktnu klasu koja opisuje sta se ocekuje kada neki model nije pronadjen,
 * kao i to da svaki NotFound error mora da baca `statusCode` 404
 * Posto ova klasa opsluzuje vise modela, postoje sanse da ce svaki model imati svoju specificnu poruku
 * Ako poruka nije prosledjena, koristi se `default` poruka `Not Found`
 */
export default abstract class NotFoundError extends CustomError {
  constructor(message = 'Not Found') {
    super(404, message);
  }
}
