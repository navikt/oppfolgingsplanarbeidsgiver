# Oppfolgingsplanarbeidsgiver

Frontend for arbeidsgiverssider for å lage og hente NAV-oppfølgingsplaner. Brukes
i kontekst av sykefraværsoppfølging på arbeidsplassen (SYFO) https://www.nav.no/syk/oppfolgingsplanarbeidsgiver/

## Utvikling lokalt

React-app for den sykmeldtes nærmeste leder. Viser oppfølgingsplaner til lederens sykmeldte.

- For å kjøre koden lokalt:
  - `$ npm install`
  - `$ npm start`
  - Sjekk at appen kjører på http://localhost:8080/syk/oppfolgingsplanarbeidsgiver/123/oppfolgingsplaner
- Kjør tester med `npm test` eller `npm test:watch`
- Lint JS-kode med `npm run lint` eller `npm run lint:fix`

## Test - Logge på i dev-miljø

Se eSYFO's dokumentasjon for testing under avsnittet `Nærmeste leder - inngang:` her: https://github.com/navikt/syfodok/tree/master/eSYFO/content/testing/komme-inn-i-testmilj%C3%B8
