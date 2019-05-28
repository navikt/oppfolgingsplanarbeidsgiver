export const finnUnikeElementer = (liste) => {
    return new Set(Array.from(new Set(liste.map(JSON.stringify))).map(JSON.parse));
};

export const forsoektHentetSykmeldte = (sykmeldte) => {
    return sykmeldte.hentet || sykmeldte.hentingFeilet;
};

export const forsoektHentetOppfolgingsdialoger = (oppfolgingsdialoger) => {
    return oppfolgingsdialoger.hentet || oppfolgingsdialoger.hentingFeilet;
};

export const henterEllerHarHentetSykmeldinger = (sykmeldinger) => {
    return sykmeldinger.henter || sykmeldinger.hentet;
};

export const sykmeldtHarBlittSlettet = (sykmeldte, nesteSykmeldte) => {
    return sykmeldte.sletter && nesteSykmeldte.slettet;
};

export const oppfolgingsdialogHarBlittAvbrutt = (avbrytdialog, nesteAvbrytdialog) => {
    return avbrytdialog.sender && nesteAvbrytdialog.sendt;
};

export const oppfolgingsdialogHarBlittOpprettet = (oppfolgingsdialoger, nesteOppfolgingsdialoger) => {
    return oppfolgingsdialoger.oppretter && nesteOppfolgingsdialoger.opprettet;
};

export const henterEllerHarHentetOppfolgingsdialoger = (oppfolgingsdialoger) => {
    return oppfolgingsdialoger.henter || oppfolgingsdialoger.hentet || oppfolgingsdialoger.hentingFeilet;
};

export const henterEllerHarHentetToggles = (toggles) => {
    return toggles.henter || toggles.hentet || toggles.hentingFeilet;
};

export const henterEllerHarHentetVirksomhet = (virksomhetsnummer, virksomhet) => {
    return virksomhet.henter.filter((henter) => {
        return henter === virksomhetsnummer;
    }).length > 0 || virksomhet.hentet.filter((hentet) => {
        return hentet === virksomhetsnummer;
    }).length > 0;
};

export const henterEllerHarHentetForrigeNaermesteLeder = (fnr, virksomhetsnummer, forrigenaermesteleder) => {
    return forrigenaermesteleder.henter.filter((henter) => {
        return henter.virksomhetsnummer === virksomhetsnummer && henter.fnr === fnr;
    }).length > 0 || forrigenaermesteleder.hentet.filter((hentet) => {
        return hentet.virksomhetsnummer === virksomhetsnummer && hentet.fnr === fnr;
    }).length > 0;
};

export const henterEllerHarHentetPerson = (fnr, person) => {
    return person.henter.filter((henter) => {
        return henter === fnr;
    }).length > 0 || person.hentet.filter((hentet) => {
        return hentet === fnr;
    }).length > 0;
};

export const henterEllerHarHentetKontaktinfo = (fnr, kontaktinfo) => {
    return kontaktinfo.henter.filter((henter) => {
        return henter === fnr;
    }).length > 0;
};

export const henterEllerHarHentetSykeforlopsPerioder = (fnr, virksomhetsnummer, sykeforlopsperioder) => {
    return sykeforlopsperioder.henter.filter((henter) => {
        return henter.fnr === fnr && henter.virksomhetsnummer === virksomhetsnummer;
    }).length > 0;
};

export const henterEllerHarHentetNaermesteLeder = (fnr, virksomhetsnummer, naermesteleder) => {
    return naermesteleder.henter.filter((henter) => {
        return henter.virksomhetsnummer === virksomhetsnummer && henter.fnr === fnr;
    }).length > 0 || naermesteleder.hentet.filter((hentet) => {
        return hentet.virksomhetsnummer === virksomhetsnummer && hentet.fnr === fnr;
    }).length > 0;
};

export const henterEllerHarHentetArbeidsforhold = (fnr, virksomhetsnummer, arbeidsforhold) => {
    return arbeidsforhold.henter.filter((henter) => {
        return henter.virksomhetsnummer === virksomhetsnummer && henter.fnr === fnr;
    }).length > 0 || arbeidsforhold.hentet.filter((hentet) => {
        return hentet.virksomhetsnummer === virksomhetsnummer && hentet.fnr === fnr;
    }).length > 0;
};

export const finnFodselsnumreKnyttetTilDialog = (oppfolgingsdialog) => {
    const fnrSet = new Set();
    fnrSet.add(oppfolgingsdialog.arbeidstaker.fnr);
    fnrSet.add(oppfolgingsdialog.sistEndretAv.fnr);
    oppfolgingsdialog.godkjenninger.forEach((godkjenning) => {
        fnrSet.add(godkjenning.godkjentAv.fnr);
    });
    oppfolgingsdialog.tiltakListe.forEach((tiltak) => {
        fnrSet.add(tiltak.opprettetAv.fnr);
        fnrSet.add(tiltak.sistEndretAv.fnr);
    });
    oppfolgingsdialog.arbeidsoppgaveListe.forEach((arbeidsoppgave) => {
        fnrSet.add(arbeidsoppgave.opprettetAv.fnr);
        fnrSet.add(arbeidsoppgave.sistEndretAv.fnr);
    });
    if (oppfolgingsdialog.arbeidsgiver.forrigeNaermesteLeder && oppfolgingsdialog.arbeidsgiver.forrigeNaermesteLeder.fnr) {
        fnrSet.add(oppfolgingsdialog.arbeidsgiver.forrigeNaermesteLeder.fnr);
    }
    return fnrSet;
};

export const finnOgHentVirksomheterSomMangler = (oppfolgingsdialoger, virksomhet, hentVirksomhet) => {
    const virksomhetsnummerSet = new Set();
    oppfolgingsdialoger.forEach((oppfolgingsdialog) => {
        if (oppfolgingsdialog.virksomhet) {
            virksomhetsnummerSet.add(oppfolgingsdialog.virksomhet.virksomhetsnummer);
        }
    });

    virksomhetsnummerSet.forEach((virksomhetsnummer) => {
        if (!henterEllerHarHentetVirksomhet(virksomhetsnummer, virksomhet)) {
            hentVirksomhet(virksomhetsnummer);
        }
    });
};

export const finnOgHentPersonerSomMangler = (oppfolgingsdialoger, person, hentPerson) => {
    const fnrSet = new Set();
    oppfolgingsdialoger.forEach((oppfolgingsdialog) => {
        finnFodselsnumreKnyttetTilDialog(oppfolgingsdialog).forEach((fnr) => {
            fnrSet.add(fnr);
        });
    });
    fnrSet.forEach((fnr) => {
        if (!henterEllerHarHentetPerson(fnr, person)) {
            hentPerson(fnr);
        }
    });
};

export const finnOgHentKontaktinfoSomMangler = (oppfolgingsdialoger, kontaktinfo, hentKontaktinfo) => {
    const kontaktinfoSet = new Set();
    oppfolgingsdialoger.forEach((oppfolgingsdialog) => {
        kontaktinfoSet.add(oppfolgingsdialog.arbeidstaker.fnr);
    });

    kontaktinfoSet.forEach((fnr) => {
        if (!henterEllerHarHentetKontaktinfo(fnr, kontaktinfo)) {
            hentKontaktinfo(fnr);
        }
    });
};

export const finnOgHentSykeforlopsPerioderSomMangler = (oppfolgingsdialoger, sykeforlopsPerioder, hentSykeforlopsPerioder) => {
    const sykeforlopsPerioderListe = [];
    oppfolgingsdialoger.forEach((oppfolgingsdialog) => {
        sykeforlopsPerioderListe.push({
            fnr: oppfolgingsdialog.arbeidstaker.fnr,
            virksomhetsnummer: oppfolgingsdialog.virksomhet.virksomhetsnummer,
        });
    });
    const unikeSykeforlopsPerioder = finnUnikeElementer(sykeforlopsPerioderListe);
    unikeSykeforlopsPerioder.forEach((sykeforlopsPeriode) => {
        if (!henterEllerHarHentetSykeforlopsPerioder(sykeforlopsPeriode.fnr, sykeforlopsPeriode.virksomhetsnummer, sykeforlopsPerioder)) {
            hentSykeforlopsPerioder(sykeforlopsPeriode.fnr, sykeforlopsPeriode.virksomhetsnummer);
        }
    });
};

export const finnOgHentArbeidsforholdSomMangler = (oppfolgingsdialoger, arbeidsforhold, hentArbeidsforhold) => {
    const arbeidsforholdListe = [];
    oppfolgingsdialoger.forEach((oppfolgingsdialog) => {
        arbeidsforholdListe.push({
            fnr: oppfolgingsdialog.arbeidstaker.fnr,
            fom: oppfolgingsdialog.opprettetDato,
            virksomhetsnummer: oppfolgingsdialog.virksomhet.virksomhetsnummer,
        });
    });
    const unikeArbeidsforhold = finnUnikeElementer(arbeidsforholdListe);
    unikeArbeidsforhold.forEach((uniktArbeidsforhold) => {
        if (!henterEllerHarHentetArbeidsforhold(uniktArbeidsforhold.fnr, uniktArbeidsforhold.virksomhetsnummer, arbeidsforhold)) {
            hentArbeidsforhold(uniktArbeidsforhold.fnr, uniktArbeidsforhold.virksomhetsnummer, uniktArbeidsforhold.fom);
        }
    });
};

export const finnOgHentNaermesteLedereSomMangler = (oppfolgingsdialoger, naermesteleder, hentNaermesteLeder) => {
    const naermesteLedereForFnrHosVirksomhet = [];
    oppfolgingsdialoger.forEach((oppfolgingsdialog) => {
        naermesteLedereForFnrHosVirksomhet.push({
            fnr: oppfolgingsdialog.arbeidstaker.fnr,
            virksomhetsnummer: oppfolgingsdialog.virksomhet.virksomhetsnummer,
        });
    });
    const naermesteLedereForFnrHosVirksomhetSet = finnUnikeElementer(naermesteLedereForFnrHosVirksomhet);
    naermesteLedereForFnrHosVirksomhetSet.forEach((naermesteLederForFnrHosVirksomhet) => {
        if (!henterEllerHarHentetNaermesteLeder(naermesteLederForFnrHosVirksomhet.fnr, naermesteLederForFnrHosVirksomhet.virksomhetsnummer, naermesteleder)) {
            hentNaermesteLeder(naermesteLederForFnrHosVirksomhet.fnr, naermesteLederForFnrHosVirksomhet.virksomhetsnummer);
        }
    });
};

export const finnOgHentForrigeNaermesteLedereSomMangler = (oppfolgingsdialoger, forrigenaermesteleder, hentForrigeNaermesteLeder) => {
    const forrigeNaermesteLedereForFnrHosVirksomhet = [];
    oppfolgingsdialoger.forEach((oppfolgingsdialog) => {
        forrigeNaermesteLedereForFnrHosVirksomhet.push({
            fnr: oppfolgingsdialog.arbeidstaker.fnr,
            virksomhetsnummer: oppfolgingsdialog.virksomhet.virksomhetsnummer,
        });
    });
    const forrigeNaermesteLedereForFnrHosVirksomhetSet = finnUnikeElementer(forrigeNaermesteLedereForFnrHosVirksomhet);
    forrigeNaermesteLedereForFnrHosVirksomhetSet.forEach((forrigeNaermesteLederForFnrHosVirksomhet) => {
        // eslint-disable-next-line max-len
        if (!henterEllerHarHentetForrigeNaermesteLeder(forrigeNaermesteLederForFnrHosVirksomhet.fnr, forrigeNaermesteLederForFnrHosVirksomhet.virksomhetsnummer, forrigenaermesteleder)) {
            hentForrigeNaermesteLeder(forrigeNaermesteLederForFnrHosVirksomhet.fnr, forrigeNaermesteLederForFnrHosVirksomhet.virksomhetsnummer);
        }
    });
};
