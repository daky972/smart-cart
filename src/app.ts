import path from 'node:path';
import express, { Request, Response } from 'express';
import productRoutes from './controllers/products-controller';

/**
 * Express GitHub
 * https://github.com/expressjs/express
 */

// Keriramo Express aplikaciju
const app = express();

/**
 * CORS se koristi kada drugi domen (aplikacija) zeli da komunicira sa nama
 * CORS cemo koristiti kada budemo kreirali React aplikaciju, jer ce ona imati svoj domain na drugom portu
 */
// const cors = require('cors');
// app.use(cors());

/**
 * app.use je middleware, odnosno svaki poslati zahtev poslat serveru ce proci kroz sve middlewares (od gore ka dole)
 * Middlewares se koristi za proveru zahteva, prosirenje zahteva, validaciju da li je korisnik ulogovan i slicno
 * 
 * express.static je Express funkcija koja za parametar prima putanju ka fajlu ili direktorijumu koji ce da servira kao
 * statican kontent. To znaci da svi fajlovi i dorektorijumi u `public` direktorijumu ce biti dostupni korisniku.
 * To znaci da fajlu public/index.html mozemo pristupiti preko http://localhost:3000/index.html
 */
app.use(express.static('public'));

/**
 * Custom middleware koji ce se pozivati pre svakog zahteva poslatom ka nasem serveru
 * Redosled middleware-a je jako bitan jer se izvrsava od gore ka dole. To znaci da jedan middleware moze da "spremi" request, a
 * da ga drugi middleware onda obradi
 * 
 * Svaki middleware ima tri parametra, `request`, `response`, i `next`
 * request - zahtev koji server dobija od korisnika
 * response - odgovor koji ce server poslati korisniku
 * next - obavezno treba pozvati funkciju `next()` kako bi Express pozvao sledeci middleware ili nas API handler. Ako funkciji
 * prosledimo `undefined` ili `null`, smatra se kao da smo je pozvali bez argumenta, ali ako funkciju pozovemo sa nekom drugom
 * vrednoscu (uglavnom objekat instance Error), onda se poziva poseban Error middleware, koji se uvek definise na kraj fajla
 */
app.use((request, response, next) => {
  console.log('Main controller');
  next();
});
/**
 * app.get predstavlja GET HTTP metod, gde prvi parametar predstavlja URL, u ovom slucaju to je "/" (URL root), dok drugi
 * parametar predstavlja callback, odnosno funkcija koja ce se izvrsiti kada se taj URL pogodi
 * Callback funkcija ima tri parametra, request, response i next (`request` sadrzi podatke koje aplikacija salje nasem serveru,
 * `response` je odgovor naseg servera, a `next` je funkcija koja se koristi za chain o cemo cemo pricati kasnije)
 * 
 * Funkcija path.join koja kreira putanju do fajla koristeci __dirname (putanja na kojoj se nalazi app.js sa public i index.html),
 * odnosno, kreira se putanja ./public.index.html
 * Na Linux masinama pitanja je smart-cart/public/index.html, dok na Windowsu je smart-cart\public\index.html
 * Da ne bi zavisili od Operativnog Sistema i njegovog delimitera, koristimo path.join i on vodi racuna o tome koji delimiter
 * treba da koristi
 * Promenljiva `__dirname` predstavlja putanju do fajla u kojem se ona nalazi. Posto smo u app.js a on je u `root` folderu, onda je
 * __dirname zapravo putanja do `root` projekta
 * 
 */
app.get("/", (request, response, next) => {
  response.sendFile(path.join(__dirname, '..', "public", "pages", "index.html"));
});

app.use('/products', productRoutes);

/**
 * Globalni Error handler koji kao prvi parameter prima Error (error-first pattern)
 */
app.use((error: Error, request: Request, response: Response, next: Function) => {
  console.error(error.stack)
  response.status(500).send('Internal Server Error!')
})

/**
 * Kazemo da se nasa Express aplikacija nalazi portu 3000, a postoje pokrecemo lokalno, onda se aplikaciji
 * moze pristupiti na URL: localhost://3000
 * Funkcija `listen` kao parametre prima PORT i callback u kojem smo mi ispisali poruku "Application is running..."
 */
app.listen(3000, () => {
  console.log('Application is running...')
});
