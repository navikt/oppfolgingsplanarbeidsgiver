const path = require('path');
const fs = require('fs');
const request = require('request');
const express = require('express');

const mockOppfolgingsplan = require('./oppfolgingsplan/mockOppfolgingsplan');
const dateUtil = require('./util/dateUtil');

const uuid = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

const mockData = {};

const lastFilTilMinne = (filnavn) => {
  fs.readFile(path.join(__dirname, `/data/${filnavn}.json`), (err, data) => {
    if (err) {
      console.log('feil i ' + filnavn);
      throw err;
    }
    mockData[filnavn] = JSON.parse(data.toString());
  });
};

const ARBEIDSFORHOLD = 'arbeidsforhold';
const BERIK = 'berik';
const KONTAKTINFO = 'kontaktinfo';
const NAERMESTELEDER = 'naermesteleder';
const PERSON = 'person';
const PERSON_SEVERUS = 'personSeverus';
const SYKMELDINGER = 'sykmeldinger';
const SYKMELDTE = 'sykmeldte';
const TILGANG = 'tilgang';
const VIRKSOMHET = 'virksomhet';

lastFilTilMinne(ARBEIDSFORHOLD);
lastFilTilMinne(SYKMELDTE);
lastFilTilMinne(SYKMELDINGER);
lastFilTilMinne(BERIK);
lastFilTilMinne(PERSON);
lastFilTilMinne(PERSON_SEVERUS);
lastFilTilMinne(BERIK);
lastFilTilMinne(KONTAKTINFO);
lastFilTilMinne(NAERMESTELEDER);
lastFilTilMinne(TILGANG);
lastFilTilMinne(VIRKSOMHET);

const SYKMELDING_TYPE = {
  SYKMELDING_INAKTIV: {
    fomUke: -20,
    tomUke: -18,
  },
  SYKMELDING_AKTIV: {
    fomUke: -16,
    tomUke: 2,
  },
};

const getSykmeldinger = (type, koblingId) => {
  const today = new Date();
  const sykmeldinger = mockData[SYKMELDINGER][koblingId] || [];
  if (sykmeldinger.length === 0) {
    return [];
  }
  const sykmelding = sykmeldinger[0];
  return [
    {
      ...sykmelding,
      mulighetForArbeid: {
        ...sykmelding.mulighetForArbeid,
        perioder: [
          {
            ...sykmelding.mulighetForArbeid.perioder[0],
            fom: dateUtil.leggTilDagerPaDato(today, type.fomUke * 7).toJSON(),
            tom: dateUtil.leggTilDagerPaDato(today, type.tomUke * 7).toJSON(),
          },
        ],
      },
    },
  ];
};

function mockOpprettetIdResultat(res) {
  mockOpprettetIdResultat.rollingCounter += 1;
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(mockOpprettetIdResultat.rollingCounter));
}
mockOpprettetIdResultat.rollingCounter = 100;

function mockForOpplaeringsmiljo(server) {
  server.use(express.json());
  server.use(express.urlencoded());

  server.get('/syforest/arbeidsgiver/sykmeldte', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(mockData[SYKMELDTE]));
  });

  server.get('/syforest/arbeidsgiver/sykmeldte/berik', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(mockData[BERIK]));
  });

  server.get('/syforest/arbeidsgiver/sykmeldinger', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    const koblingId = req.query.koblingId;
    res.send(getSykmeldinger(SYKMELDING_TYPE.SYKMELDING_AKTIV, koblingId));
  });

  server.get('/syfooppfolgingsplanservice/api/arbeidsgiver/oppfolgingsplaner', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(mockOppfolgingsplan.getOppfolgingsplaner(mockOppfolgingsplan.TYPE_DEFAULT));
  });

  server.get('/syfooppfolgingsplanservice/api/tilgang', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(mockData[TILGANG]));
  });

  server.get('/syfooprest/api/arbeidsforhold', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(mockData[ARBEIDSFORHOLD]));
  });

  server.get('/syfooprest/api/virksomhet/*', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(mockData[VIRKSOMHET]));
  });

  server.get('/syfooprest/api/person/01010112345', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(mockData[PERSON_SEVERUS]));
  });

  server.get('/syfooprest/api/person/*', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(mockData[PERSON]));
  });

  server.get('/syfooprest/api/naermesteleder/*', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(mockData[NAERMESTELEDER]));
  });

  server.get('/syfooprest/api/kontaktinfo/*', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(mockData[KONTAKTINFO]));
  });

  server.post('/setHeader/api/logging', (req, res) => {
    console.log('Logger i syfooprest');
    res.send(200);
  });

  server.get('/esso/logout', (req, res) => {
    res.send(
      '<p>Du har blitt sendt til utlogging.</p><p><a href="/oppfolgingsplanarbeidsgiver/28790/">Gå til Dine Sykmeldtes Oppfølgingplaner</a></p>'
    );
  });

  server.get('/dittnav', (req, res) => {
    res.send(
      '<p>Ditt Nav er ikke tilgjengelig - dette er en testside som kun viser Ditt sykefravær.</p><p><a href="/oppfolgingsplanarbeidsgiver/28790">Gå til Dine Sykmeldtes Oppfølgingplaner</a></p>'
    );
  });
}

function mockForLokaltMiljo(server) {
  server.use(express.json());
  server.use(express.urlencoded());

  server.post('/syforest/arbeidsgiver/:fnr/:orgnr/actions/avkreft', (req, res) => {
    res.send();
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
