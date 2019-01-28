const path = require('path');
const fs = require('fs');
const request = require('request');
const express = require('express');

const uuid = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = Math.random() * 16 | 0;
        v = c === 'x' ? r : (r & 0x3 | 0x8);
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

const BERIK = 'berik';
const KONTAKTINFO = 'kontaktinfo';
const NAERMESTELEDER = 'naermesteleder';
const OPPFOLGINGSDIALOGER = 'oppfolgingsdialoger';
const PERIODER = 'perioder';
const PERSON = 'person';
const PERSON_KARINA = 'personKarina';
const PERSON_KJERSTI = 'personKjersti';
const PERSON_KRISTINA = 'personKristina';
const PERSON_LILLI = 'personLilli';
const PERSON_MARIANN = 'personMariann';
const SYKMELDINGER = 'sykmeldinger';
const SYKMELDTE = 'sykmeldte';
const TILGANG = 'tilgang';
const TOGGLES = 'toggles';
const VIRKSOMHET = 'virksomhet';

lastFilTilMinne(SYKMELDTE);
lastFilTilMinne(TOGGLES);
lastFilTilMinne(SYKMELDINGER);
lastFilTilMinne(OPPFOLGINGSDIALOGER);
lastFilTilMinne(BERIK);
lastFilTilMinne(PERIODER);
lastFilTilMinne(PERSON);
lastFilTilMinne(PERSON_KARINA);
lastFilTilMinne(PERSON_KJERSTI);
lastFilTilMinne(PERSON_KRISTINA);
lastFilTilMinne(PERSON_LILLI);
lastFilTilMinne(PERSON_MARIANN);
lastFilTilMinne(BERIK);
lastFilTilMinne(KONTAKTINFO);
lastFilTilMinne(NAERMESTELEDER);
lastFilTilMinne(TILGANG);
lastFilTilMinne(VIRKSOMHET);

let teksterFraProd;

function hentTeksterFraProd() {
    const TEKSTER_URL = 'https://syfoapi.nav.no/syfotekster/api/tekster';
    request(TEKSTER_URL, (error, response, body) => {
        if (error) {
            console.log('Kunne ikke hente tekster fra prod', error);
        } else {
            teksterFraProd = JSON.parse(body);
            console.log('Tekster hentet fra prod');
        }
    });
}

function mockTekster(server) {
    const HVERT_FEMTE_MINUTT = 1000 * 60 * 5;
    hentTeksterFraProd();
    setInterval(hentTeksterFraProd, HVERT_FEMTE_MINUTT);

    server.get('/syfotekster/api/tekster', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(teksterFraProd || mockData[TEKSTER]));
    });
}

function mockOpprettetIdResultat(res) {
    mockOpprettetIdResultat.rollingCounter += 1;
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(mockOpprettetIdResultat.rollingCounter));
}
mockOpprettetIdResultat.rollingCounter = 100;

function mockForOpplaeringsmiljo(server) {
    mockTekster(server);

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

    server.get('/syforest/informasjon/toggles', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(mockData[TOGGLES]));
    });

    server.get('/syforest/arbeidsgiver/sykmeldinger', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        const koblingId = req.query.koblingId;
        res.send(JSON.stringify(mockData[SYKMELDINGER][koblingId] || []));
    });

    server.get('/restoppfoelgingsdialog/api/arbeidsgiver/oppfoelgingsdialoger', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(mockData[OPPFOLGINGSDIALOGER]));
    });

    server.get('/syforest/sykeforloep/siste/perioder', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(mockData[PERIODER]));
    });

    server.get('/restoppfoelgingsdialog/api/tilgang', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(mockData[TILGANG]));
    });

    server.get('/restoppfoelgingsdialog/api/virksomhet/*', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(mockData[VIRKSOMHET]));
    });

    server.get('/restoppfoelgingsdialog/api/person/12121200100', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(mockData[PERSON_KARINA]));
    });

    server.get('/restoppfoelgingsdialog/api/person/02020212345', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(mockData[PERSON_KJERSTI]));
    });

    server.get('/restoppfoelgingsdialog/api/person/12121255555', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(mockData[PERSON_KRISTINA]));
    });

    server.get('/restoppfoelgingsdialog/api/person/03040512345', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(mockData[PERSON_LILLI]));
    });

    server.get('/restoppfoelgingsdialog/api/person/01010112345', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(mockData[PERSON_MARIANN]));
    });

    server.get('/restoppfoelgingsdialog/api/person/*', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(mockData[PERSON]));
    });

    server.get('/restoppfoelgingsdialog/api/naermesteleder/*', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(mockData[NAERMESTELEDER]));
    });

    server.get('/restoppfoelgingsdialog/api/kontaktinfo/*', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(mockData[KONTAKTINFO]));
    });

    server.post('/restoppfoelgingsdialog/api/logging', (req, res) => {
        console.log('Logger i restoppfoelgingsdialog');
        res.send(200);
    });

    server.get('/esso/logout', (req, res) => {
        res.send('<p>Du har blitt sendt til utlogging.</p><p><a href="/oppfolgingsplanarbeidsgiver/26890/">Gå til Dine Sykmeldtes Oppfølgingplaner</a></p>');
    });

    server.get('/dittnav', (req, res) => {
        res.send('<p>Ditt Nav er ikke tilgjengelig - dette er en testside som kun viser Ditt sykefravær.</p><p><a href="/oppfolgingsplanarbeidsgiver/26890">Gå til Dine Sykmeldtes Oppfølgingplaner</a></p>');
    });
}

function mockForLokaltMiljo(server) {
    server.use(express.json());
    server.use(express.urlencoded());

    server.post('/restoppfoelgingsdialog/api/tiltak/actions/:response/lagreKommentar', (req, res) => {
        mockOpprettetIdResultat(res);
    });

    server.post('/restoppfoelgingsdialog/api/kommentar/actions/:response/slett', (req, res) => {
        res.send();
    });

    server.post('/restoppfoelgingsdialog/api/arbeidsoppgave/actions/:id/slett', (req, res) => {
        res.send();
    });

    server.post('/restoppfoelgingsdialog/api/tiltak/actions/:id/slett', (req, res) => {
        res.send();
    });

    server.post('/restoppfoelgingsdialog/api/oppfoelgingsdialoger/actions/:id/lagreArbeidsoppgave', (req, res) => {
        mockOpprettetIdResultat(res);
    });

    server.post('/restoppfoelgingsdialog/api/oppfoelgingsdialoger/actions/:id/lagreTiltak', (req, res) => {
        mockOpprettetIdResultat(res);
    });

    server.post('/restoppfoelgingsdialog/api/oppfoelgingsdialoger/actions/:id/godkjenn', (req, res) => {
        res.send({
            fom: req.body.fom,
            tom: req.body.tom,
            evalueres: req.body.evalueres,
        });
    });

    server.post('/restoppfoelgingsdialog/api/oppfoelgingsdialoger/actions/:id/samtykke', (req, res) => {
        res.send();
    });

    server.post('/restoppfoelgingsdialog/api/oppfoelgingsdialoger/actions/:id/nullstillGodkjenning', (req, res) => {
        res.send();
    });

    server.post('/restoppfoelgingsdialog/api/oppfoelgingsdialoger/actions/:id/forespoerRevidering', (req, res) => {
        res.send();
    });

    server.post('/restoppfoelgingsdialog/api/arbeidsgiver/oppfoelgingsdialoger', (req, res) => {
        mockOpprettetIdResultat(res);
    });

    server.post('/restoppfoelgingsdialog/api/oppfoelgingsdialoger/actions/:id/sett', (req, res) => {
        res.send();
    });
}

module.exports = {
    mockForOpplaeringsmiljo,
    mockForLokaltMiljo,
};
