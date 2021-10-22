# Oppfolgingsplanarbeidsgiver

Frontend for arbeidsgivers digitalisering av sykefraværsoppfølging https://www.nav.no/oppfolgingsplanarbeidsgiver/

### TL;DR

React-app for den sykmeldtes nærmeste leder. Viser oppfølgingsplaner til lederens sykmeldte.

* For å kjøre koden lokalt:
    - `$ npm install`
    - `$ npm run dev`
    - I et annet vindu `$ npm run start-local`
    - Eventuelt kan komandoene kjøres fra `package.json` i intellij.
    - Sjekk at appen kjører på http://localhost:8289/oppfolgingsplanarbeidsgiver/123/oppfolgingsplaner
* Kjør tester med `npm test` eller `npm test:watch`
* Lint JS-kode med `npm run lint` eller `npm run lint:fix`

## Deploy mock app til Heroku

For å kunne deploye til Heroku må du først logge inn: 
* `$ heroku login`
* `$ heroku container:login`

Deploy til heroku ved å kjøre deployscript: `$ sh deploy-heroku.sh`.

## Logge på i Q1-miljø
Se denne siden for [testdata](https://confluence.adeo.no/pages/viewpage.action?pageId=228580060) (NAV-intern lenke).

