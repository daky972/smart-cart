const path = require('node:path');
const express = require('express');

// Keriramo Express aplikaciju
const app = express();

/**
 * CORS se koristi kada drugi domen (aplikacija) zeli da komunicira sa nama
 * CORS cemo koristiti kada budemo koreirali React aplikaciju, jer ce ona imati svoj domain na drugom portu
 */
// const cors = require('cors');
// app.use(cors());


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
  response.sendFile(path.join(__dirname, "public", "index.html"));
});

/**
 * Kazemo da se nasa Express aplikacija nalazi portu 3000, a postoje pokrecemo lokalno, onda se aplikaciji
 * moze pristupiti na URL: localhost://3000
 * Funkcija `listen` kao parametre prima PORT i callback u kojem smo mi ispisali poruku "Application is running..."
 */
app.listen(3000, () => {
  console.log('Application is running...')
}
);