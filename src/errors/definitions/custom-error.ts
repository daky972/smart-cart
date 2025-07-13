/**
 * Pravimo CustomError klasu koja prosiruje vec postojecu Error klasu
 * Zelimo da svaki Error bude unificiran na svim mestima
 * Zelimo da svaki Error ima svoj `statusCode` koji opisuje gresku, kao i `message` koji dodatno opisuje gresku
 * 
 * StatusCode ima svoje znacenje u programiranju, tako da:
 * - 5xx kod oznacava Server gresku (nesto se desilo na serveru sto nije ocekivano)
 * - 4xx korisnicku gresku (korisnik je uneo pogresne podatke)
 * - 3xx redirekcija (resurs nije trenutno dostupan)
 * - 2xx uspesna akcija
 * 
 * Klasa je namerno `abstract` jer zelimo da svaki error ima svoju klasu
 */
export default abstract class CustomError extends Error {
  
  constructor(statusCode: number, message: string) {
    super(message);
  }
}