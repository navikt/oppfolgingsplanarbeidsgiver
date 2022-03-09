const path = require('path');
const fs = require('fs');
const express = require('express');

const mockOppfolgingsplan = require('./oppfolgingsplan/mockOppfolgingsplan');
const { dineSykmeldteMedSykmeldinger } = require('./data/dineSykmeldteMedSykmeldinger');

const mockData = {};

const lastFilTilMinne = (filnavn) => {
  fs.readFile(path.join(__dirname, `/data/${filnavn}.json`), (err, data) => {
    if (err) {
      console.log(`feil i ${filnavn}`);
      throw err;
    }
    mockData[filnavn] = JSON.parse(data.toString());
  });
};

const ARBEIDSFORHOLD = 'arbeidsforhold';
const KONTAKTINFO = 'kontaktinfo';
const NAERMESTELEDER = 'naermesteleder';
const PERSON = 'person';
const PERSON_SEVERUS = 'personSeverus';
const SYKMELDT = 'sykmeldt';
const TILGANG = 'tilgang';
const VIRKSOMHET = 'virksomhet';

lastFilTilMinne(ARBEIDSFORHOLD);
lastFilTilMinne(SYKMELDT);
lastFilTilMinne(PERSON);
lastFilTilMinne(PERSON_SEVERUS);
lastFilTilMinne(KONTAKTINFO);
lastFilTilMinne(NAERMESTELEDER);
lastFilTilMinne(TILGANG);
lastFilTilMinne(VIRKSOMHET);

function mockOpprettetIdResultat(res) {
  mockOpprettetIdResultat.rollingCounter += 1;
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(mockOpprettetIdResultat.rollingCounter));
}
mockOpprettetIdResultat.rollingCounter = 100;

function mockForOpplaeringsmiljo(server) {
  server.use(express.json());
  server.use(express.urlencoded());

  server.get('/syk/oppfolgingsplanarbeidsgiver/api/dinesykmeldte/:narmestelederId', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(mockData[SYKMELDT]));
  });

  server.get('/syk/oppfolgingsplanarbeidsgiver/api/dinesykmeldte', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(dineSykmeldteMedSykmeldinger));
  });

  server.get('/syfooppfolgingsplanservice/api/arbeidsgiver/oppfolgingsplaner', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(mockOppfolgingsplan.getOppfolgingsplaner(mockOppfolgingsplan.TYPE_DEFAULT));
  });

  server.get('/syfooppfolgingsplanservice/api/tilgang', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(mockData[TILGANG]));
  });

  server.get('/syk/oppfolgingsplanarbeidsgiver/api/syfooprest/arbeidsforhold', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(mockData[ARBEIDSFORHOLD]));
  });

  server.get('/syk/oppfolgingsplanarbeidsgiver/api/syfooprest/virksomhet/*', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(mockData[VIRKSOMHET]));
  });

  server.get('/syk/oppfolgingsplanarbeidsgiver/api/syfooprest/person/01010112345', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(mockData[PERSON_SEVERUS]));
  });

  server.get('/syk/oppfolgingsplanarbeidsgiver/api/syfooprest/person/*', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(mockData[PERSON]));
  });

  server.get('/syk/oppfolgingsplanarbeidsgiver/api/syfooprest/naermesteleder/*', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(mockData[NAERMESTELEDER]));
  });

  server.get('/syk/oppfolgingsplanarbeidsgiver/api/syfooprest/kontaktinfo/*', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(mockData[KONTAKTINFO]));
  });

  server.post('/setHeader/api/logging', (req, res) => {
    console.log('Logger i syfooprest');
    res.send(200);
  });

  server.get('/esso/logout', (req, res) => {
    res.send(
      '<p>Du har blitt sendt til utlogging.</p><p><a href="/syk/oppfolgingsplanarbeidsgiver/123/">Gå til Dine Sykmeldtes Oppfølgingplaner</a></p>'
    );
  });

  server.get('/dittnav', (req, res) => {
    res.send(
      '<p>Ditt Nav er ikke tilgjengelig - dette er en testside som kun viser Ditt sykefravær.</p><p><a href="/syk/oppfolgingsplanarbeidsgiver/123">Gå til Dine Sykmeldtes Oppfølgingplaner</a></p>'
    );
  });
}

function mockForLokaltMiljo(server) {
  server.use(express.json());
  server.use(express.urlencoded());

  server.get('/syk/oppfolgingsplanarbeidsgiver/api/dinesykmeldte/*', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(mockData[SYKMELDT]));
  });

  server.post('/syfooppfolgingsplanservice/api/tiltak/actions/:response/lagreKommentar', (req, res) => {
    mockOpprettetIdResultat(res);
  });

  server.post('/syfooppfolgingsplanservice/api/kommentar/actions/:response/slett', (req, res) => {
    res.send();
  });

  server.post('/syfooppfolgingsplanservice/api/arbeidsoppgave/actions/:id/slett', (req, res) => {
    res.send();
  });

  server.post('/syfooppfolgingsplanservice/api/tiltak/actions/:id/slett', (req, res) => {
    res.send();
  });

  server.post('/syfooppfolgingsplanservice/api/oppfolgingsplan/actions/:id/lagreArbeidsoppgave', (req, res) => {
    mockOpprettetIdResultat(res);
  });

  server.post('/syfooppfolgingsplanservice/api/oppfolgingsplan/actions/:id/lagreTiltak', (req, res) => {
    mockOpprettetIdResultat(res);
  });

  server.post('/syfooppfolgingsplanservice/api/oppfolgingsplan/actions/:id/godkjenn', (req, res) => {
    res.send({
      fom: req.body.fom,
      tom: req.body.tom,
      evalueres: req.body.evalueres,
    });
  });

  server.post('/syfooppfolgingsplanservice/api/oppfolgingsplan/actions/:id/samtykk', (req, res) => {
    res.send();
  });

  server.post('/syfooppfolgingsplanservice/api/oppfolgingsplan/actions/:id/nullstillGodkjenning', (req, res) => {
    res.send();
  });

  server.post('/syfooppfolgingsplanservice/api/oppfolgingsplan/actions/:id/avvis', (req, res) => {
    res.send();
  });

  server.post('/syfooppfolgingsplanservice/api/arbeidsgiver/oppfolgingsplaner', (req, res) => {
    mockOpprettetIdResultat(res);
  });

  server.post('/syfooppfolgingsplanservice/api/oppfolgingsplan/actions/:id/sett', (req, res) => {
    res.send();
  });
}

module.exports = {
  mockForOpplaeringsmiljo,
  mockForLokaltMiljo,
};
