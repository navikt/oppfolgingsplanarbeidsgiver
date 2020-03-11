const finnNavn = (fnr, state) => {
    return state.person.data
        .filter((person) => {
            return person.fnr === fnr;
        })
        .map((person) => {
            return person.navn;
        })[0] || '';
};

const finnKontaktinfo = (fnr, state) => {
    return state.kontaktinfo.data
        .filter((kontaktinfo) => {
            return kontaktinfo.fnr === fnr;
        }).map((kontaktinfo) => {
            return kontaktinfo.kontaktinfo;
        })[0] || {};
};

const finnNaermesteLeder = (fnr, virksomhetsnummer, state) => {
    return state.naermesteleder.data
        .filter((naermesteleder) => {
            return naermesteleder.fnr === fnr && naermesteleder.virksomhetsnummer === virksomhetsnummer;
        }).map((naermesteleder) => {
            return naermesteleder.naermesteLeder;
        })[0] || null;
};

const finnVirksomhetsnavn = (virksomhetsnummer, state) => {
    return state.virksomhet.data
        .filter((virksomhet) => {
            return virksomhet.virksomhetsnummer === virksomhetsnummer;
        })
        .map((virksomhet) => {
            return virksomhet.navn;
        })[0] || '';
};

const finnArbeidsforhold = (fnr, virksomhetsnummer, opprettetDato, state) => {
    const arbeidsforhold = state.arbeidsforhold.data
        .filter((_arbeidsforhold) => {
            return _arbeidsforhold.virksomhetsnummer === virksomhetsnummer && _arbeidsforhold.fnr === fnr;
        })[0] || null;
    if (!arbeidsforhold) {
        return [];
    }
    return arbeidsforhold.stillinger
        .map((_stilling) => {
            const stilling = _stilling;
            stilling.fom = new Date(stilling.fom);
            stilling.tom = stilling.tom && new Date(stilling.tom);
            return stilling;
        })
        .filter((stilling) => {
            return stilling.fom < new Date(opprettetDato) && (!stilling.tom || stilling.tom < new Date(opprettetDato));
        });
};

const finnSykeforlopsPerioder = (fnr, virksomhetsnummer, state) => {
    const sykeforlopsPerioder = state.sykeforlopsPerioder.data
        .filter((_sykeforlopsPerioder) => {
            return _sykeforlopsPerioder.virksomhetsnummer === virksomhetsnummer && _sykeforlopsPerioder.fnr === fnr;
        })[0] || null;
    if (!sykeforlopsPerioder) {
        return [];
    }
    return sykeforlopsPerioder.periodeListe;
};

export const populerDialogFraState = (_oppfolgingsdialog, state) => {
    const oppfolgingsdialog = _oppfolgingsdialog;
    oppfolgingsdialog.arbeidstaker.navn = finnNavn(oppfolgingsdialog.arbeidstaker.fnr, state);
    const kontaktinfo = finnKontaktinfo(oppfolgingsdialog.arbeidstaker.fnr, state);
    oppfolgingsdialog.arbeidstaker.epost = kontaktinfo.epost;
    oppfolgingsdialog.arbeidstaker.tlf = kontaktinfo.tlf;
    oppfolgingsdialog.arbeidstaker.skalHaVarsel = kontaktinfo.skalHaVarsel;
    // eslint-disable-next-line max-len
    oppfolgingsdialog.arbeidstaker.stillinger = finnArbeidsforhold(oppfolgingsdialog.arbeidstaker.fnr, oppfolgingsdialog.virksomhet.virksomhetsnummer, oppfolgingsdialog.opprettetDato, state);
    oppfolgingsdialog.arbeidstaker.sykeforlopsPerioder = finnSykeforlopsPerioder(oppfolgingsdialog.arbeidstaker.fnr, oppfolgingsdialog.virksomhet.virksomhetsnummer, state);
    oppfolgingsdialog.virksomhet.navn = finnVirksomhetsnavn(oppfolgingsdialog.virksomhet.virksomhetsnummer, state);
    const naermesteleder = finnNaermesteLeder(oppfolgingsdialog.arbeidstaker.fnr, oppfolgingsdialog.virksomhet.virksomhetsnummer, state);
    oppfolgingsdialog.arbeidsgiver.naermesteLeder.virksomhetsnummer = naermesteleder && naermesteleder.virksomhetsnummer;
    oppfolgingsdialog.arbeidsgiver.naermesteLeder.epost = naermesteleder && naermesteleder.epost;
    oppfolgingsdialog.arbeidsgiver.naermesteLeder.navn = naermesteleder && naermesteleder.navn;
    oppfolgingsdialog.arbeidsgiver.naermesteLeder.fnr = naermesteleder && naermesteleder.fnr;
    oppfolgingsdialog.arbeidsgiver.naermesteLeder.tlf = naermesteleder && naermesteleder.tlf;
    oppfolgingsdialog.arbeidsgiver.naermesteLeder.erAktiv = naermesteleder && naermesteleder.erAktiv;
    oppfolgingsdialog.arbeidsgiver.naermesteLeder.aktivFom = naermesteleder && naermesteleder.aktivFom;
    oppfolgingsdialog.arbeidsgiver.naermesteLeder.aktivTom = naermesteleder && naermesteleder.aktivTom;
    oppfolgingsdialog.sistEndretAv.navn = finnNavn(oppfolgingsdialog.sistEndretAv.fnr, state);
    oppfolgingsdialog.arbeidsoppgaveListe.map((_arbeidsoppgave) => {
        const arbeidsoppgave = _arbeidsoppgave;
        arbeidsoppgave.opprettetAv.navn = finnNavn(arbeidsoppgave.opprettetAv.fnr, state);
        arbeidsoppgave.sistEndretAv.navn = finnNavn(arbeidsoppgave.sistEndretAv.fnr, state);
        return arbeidsoppgave;
    });
    oppfolgingsdialog.tiltakListe.map((_tiltak) => {
        const tiltak = _tiltak;
        tiltak.opprettetAv.navn = finnNavn(tiltak.opprettetAv.fnr, state);
        tiltak.sistEndretAv.navn = finnNavn(tiltak.sistEndretAv.fnr, state);
        tiltak.kommentarer.map((_kommentar) => {
            const kommentar = _kommentar;
            kommentar.opprettetAv.navn = finnNavn(kommentar.opprettetAv.fnr, state);
            kommentar.sistEndretAv.navn = finnNavn(kommentar.sistEndretAv.fnr, state);
            return kommentar;
        });
        return tiltak;
    });
    oppfolgingsdialog.godkjenninger.map((_godkjenning) => {
        const godkjenning = _godkjenning;
        godkjenning.godkjentAv.navn = finnNavn(godkjenning.godkjentAv.fnr, state);
        return godkjenning;
    });
    return oppfolgingsdialog;
};
