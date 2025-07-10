# smart-cart
Shopping Smart Cart

# SSH
## Sta je SSH?
SSH predstavlja tvoje kredencijale za logovanje na GitHub. Sastoji se iz javnog (public) i tajnog (private) kljuca. Public key se sacuva na GitHub profilu, a Private key na lokalnoj masini. Kada zelis da se ulogujes na GitHub, treba da kazes SSH Agentu koji Private kljuc zelis da koristis, a on ce znati sa kim da ga upari. Pre toga je potrebno podesiti GitHub nalog, kao i Git nalog prilikom instalacije Git aplikacije.

## Kreiranje SSH kljuca
Komanda za kreiranje SSH kljuca:
ssh-keygen -t rsa -b 4096 -C "tvoj.email@example.com"

### Znacenje komande:
1. ssh-keygen (komanda za kreiranje SSH kljuca)
2. -t rsa (-t se zove flag i skracenica je za "type", gde je tip kljuca RSA)
3. -b 4096 (kljuc je biti duzine 4096 bits)
4. -C (comment, koji je cesto email radi lakseg prepoznavanja kljuca kada se otvori fajl)

### Koraci prilikom kreiranja kljuca:
1. Kada se ova komanda izvrsi, pitace te gde da sacuvas kljuceve kao i mesto gde ce ove kljuceve sacuvati po default-u. Ako zelis da kljuceve sacuvas u trenutnom direktorijumu, onda upisi ime fajla, recimo "ssh_token".
2. (Opciono) uneses frazu za fajl, to je kao PIN na telefonu. Licno, nikad ne korisim, samo udarim "Enter" i nastavim dalje
3. Potvrdis frazu (ili opet samo "Enter" ako je faraza prazna)
4. Sada su public i private kljucevi kreirani
5. Public kljuc se nalazi u fajlu koji zavrsava sa ".pub" i taj kljuc treba da se unese u GitHub profil
  1. Otvoris GitHub sajt
  2. Stisnes na profilnu ikonicu u gornjem desnom uglu
  3. [Settings]
  4. [SSH and GPG keys]
  5. [New SSH Key]
  6. Title (naziv kljuca kako bi znao lakse da manipulises sa njima)
  7. Key (ovde kopiras SSH public key)

## Logovanje koristeci SSH
Kada je SSH uspesno kreiran i sacuvan na GitHub profilu, logovanje se radi na sledeci nacin:
1. U Terminal (bash) kopiras komandu koja ce pokrenuti SSH Agenta
  ``eval `ssh-agent` ``
2. Zatim, kazes SSH Agentu koji SSH zelis da koristis (koristis privatan key)
  `ssh-add ./ssh_token`

Sada si uspesno ulogovan i mozes da koristis Git comande


## Git - Osnovne komande

Svaka Git komanda pocinje sa `git`

### Kloniranje projekta
Ako zelis da preuzmes ceo repozitorijum sa GitHub-a, tada koristis `git clone` komandu.
Ovu komandu mozes naci na pocetnoj stranici svog projekta
1. Otvoris projekat na GitHub-u koji zelis da kloniras
2. Stisnes zeleno dugme `Code`
3. Ispod naslova `Clone` imas opcije kloniranja preko `HTTPS`, `SSH`, i `GitHub CLI`
4. Odaberes SSH
5. Kopiras komandu u Terminal

### Cuvanje izmena
Kada si zadovoljan izmenama koji si napravio i zelis da ih sacuvas `remote`, koristis komande prateci redosled:
1. `git add .`
  - `add` znaci da dodajes odredjenje fajlova
  - Tacka znaci da dodales sve fajlove koji su izmenjeni
2. `git commit -m "Kratak opis sta je uradjeno u ovom commit-u"`
  - `commit` znaci da zelis dodate fajlova da dodas pod odredjenim nazivom
  - `-m` je skracenica od `-message` i predstavlja poruku koja je programeru govori sta je uradjeno u ovim izmenama. Obavezno se nalazi pod dvostrukim navodnicima
3. Koraci `1` i `2` se mogu izvrsavati vise puta i sve izmene se cuvaju lokalno
4. `git push` (ako si branch napravio iz terminala, dobices dodatne upute kako da branch kreiras i `remote`)
  - `push` znaci da sve izmene koje smo sacuvali lokalno sada zelimo da sacuvamo `remote`

### Preizumanje izmena
Kada zelis da preuzmes izmene sa `remote` repozitorijuma, koristis `pull` komandu
1. `git checkout main`
  - `checkout` znaci da odes na odredjeni `branch`, u ovom slucaju je to `main`
2. `git pull`
  - `pull` komanda kaze da zelis da sinhronizujes `remote` branch sa lokalnim tako sto ces povuci sve izmene kod sebe lokalno

### Dodatne komande
1. `git stash`
2. `git stash pop`
3. `git stash list`
4. `git stash pop stash@{<hash>}`
5. `git stash drop`
6. `git checkout -b`
7. `git commit --amend`
8. `git add ./file-name`
9. `git restore --staged <ime_fajla>`
10. `git merge`


# GitHub

### Imenovanje grana
1. `main`                       - glavna grana i ona sadrzi verziju koda koju krajnji korisnik vidi
2. `acceptance` i `integration` - koriste se kod velikih projekata gde postoji nekoliko nivoa testiranje aplikacije
3. `stage`                      - koristi se kod manjih projekata i koristi ga klijent ili menadzeri za testiranje
4. `develop`                    - na ovoj grani se nalazi kod koji je istestiran
5. `test`                       - grana na kojoj testeri (QA) testira aplikaciju
6. `feature/<naziv_grane>`      - grana koja se trenutno razvija, recimo ako pravimo Homepage, ova grana bi se mogla nazvati `feature/create_homepage`
7. `bug/<naziv_greske>`         - isto kao `feature` ali namenjeno za ispravljanje gresaka u aplikaciji

### Kreiranje grane (rucno)
1. Otvoris repozitorijum na kojem radis
2.  Ispod naziva projekta se nalaze tri kartice:
  1. main (glavna grana)
  2. Branch
  3. Tags
3. Stisnes `main` dugme i u inputu napises naziv nove grane
4. Pritisnes `Enter`

### Kreiranje Pull Request-a
Pull Request (PR) se kreira kada zelis da spojis dve grane, uglavnom. U praksi, `feature` i `bug` grane se spajaju na `test` i/ili `develop` granu. Kada je sve istestirano, `develop` se spaja sa sledecom granom.
Dve grane se mogu spojiti sa `git merge` komandu ili preko GitHub sajta, ali pravi razlog kreiranja PR je da kontribjutori ovog projekta prvo pregledaju izmene, ostave svoje utiske i zatim se sloze da li te izmene mogu da se spoje sa sledecom granom. Moguce je dodati odredjene kontribjutore da pogledaju izmene, ali izmene moze da pogleda bilo ko, ko ima dozvoljen pristup projektu.
Osoba koja gleda PR moze da ostavi komentar tako sto ce da pritisne broj na liniji koda koju zeli da prokomentarise, ili da oznaci vise linije. Takodje, osoba koja ostavlja komentar moze i da predlozi izmenu, a osoba koja je napravila PR moze da prihvati izmenu i kreira novi `commit` preko GitHub aplikacije, ili da obrazlozi svoj kod tako sto ce ostaviti komentar ili emotikon na pretkodnu poruku.
U podesavanju projekta, moguce se kreirati pravila vezana za PR, kao sto je na primer, zabranjeno spajanje dve grane sve dok odredjen broj ljudi ne odobri izmene.


# Projekat
Da bi pokrenuli projekat, u terminalu treba da pozovemo komandu `npm start` ili da otvorimo `package.json` fajl i da stisnemo na tekst `start` koji se nalazi unutar `scripts` objekta. Kada pritisnemo na `start`, otvorice nam se mali popup sa opcijom `Run Script`

## package.json

## package-lock.json

## node_modules

## TypeScript
