import {
    MND_SIDEN_SYKMELDING_GRENSE_FOR_OPPFOELGING,
    STATUS,
} from '../konstanter';
import { erGyldigDatoIFortiden } from './datoUtils';

export const isEmpty = (array) => {
    return !array || array.length === 0;
};

export const erIkkeOppfolgingsdialogUtfylt = (oppfolgingsdialog) => {
    return oppfolgingsdialog.arbeidsoppgaveListe.length === 0 || oppfolgingsdialog.tiltakListe.length === 0;
};

export const inneholderGodkjenninger = (oppfolgingsplan) => {
    return oppfolgingsplan && oppfolgingsplan.godkjenninger.length > 0;
};

export const inneholderGodkjenningerAvArbeidsgiver = (oppfolgingsplan) => {
    return oppfolgingsplan.godkjenninger.length > 0
        && oppfolgingsplan.godkjenninger[0].godkjent
        && oppfolgingsplan.godkjenninger[0].godkjentAv.fnr === oppfolgingsplan.arbeidsgiver.naermesteLeder.fnr;
};

export const finnNyesteGodkjenning = (godkjenninger) => {
    return godkjenninger.sort((g1, g2) => {
        return new Date(g2.godkjenningsTidspunkt) - new Date(g1.godkjenningsTidspunkt);
    })[0];
};

export const hentGodkjenningsTidspunkt = (oppfolgingsdialog) => {
    return oppfolgingsdialog.godkjenninger.filter((godkjenning) => {
        return godkjenning.godkjent === true;
    })[0].gyldighetstidspunkt;
};

export const sorterOppfolgingsdialogerEtterSluttdato = (oppfolgingsdialoger) => {
    return oppfolgingsdialoger.sort((o1, o2) => {
        return new Date(o2.godkjentPlan.gyldighetstidspunkt.tom) - new Date(o1.godkjentPlan.gyldighetstidspunkt.tom);
    });
};

export const erSykmeldingGyldigForOppfolgingMedGrensedato = (sykmelding, dato) => {
    return sykmelding.mulighetForArbeid.perioder.filter((periode) => {
        const tomGrenseDato = new Date(dato);
        tomGrenseDato.setHours(0, 0, 0, 0);
        tomGrenseDato.setMonth(tomGrenseDato.getMonth() - MND_SIDEN_SYKMELDING_GRENSE_FOR_OPPFOELGING);
        return new Date(periode.tom) >= new Date(tomGrenseDato);
    }).length > 0;
};

export const sykmeldtHarGyldigSykmelding = (sykmeldinger) => {
    const dagensDato = new Date();
    return sykmeldinger.filter((sykmelding) => {
        return erSykmeldingGyldigForOppfolgingMedGrensedato(sykmelding, dagensDato);
    }).length > 0;
};

export const erOppfolgingsdialogAktiv = (oppfolgingsdialog) => {
    return !oppfolgingsdialog.godkjentPlan ||
        (oppfolgingsdialog.status !== STATUS.AVBRUTT && !erGyldigDatoIFortiden(oppfolgingsdialog.godkjentPlan.gyldighetstidspunkt.tom));
};

export const erOppfolgingsdialogTidligere = (oppfolgingsdialog) => {
    return oppfolgingsdialog.godkjentPlan
        && erGyldigDatoIFortiden(oppfolgingsdialog.godkjentPlan.gyldighetstidspunkt.tom)
        && oppfolgingsdialog.status !== STATUS.AVBRUTT;
};

export const finnOppfolgingsplanerPaVirksomhet = (planer, orgnummer) => {
    return planer.filter((plan) => {
        return plan.virksomhet.virksomhetsnummer === orgnummer;
    });
};

export const finnTidligereOppfolgingsdialoger = (oppfolgingsdialoger) => {
    return sorterOppfolgingsdialogerEtterSluttdato(oppfolgingsdialoger.filter((oppfolgingsdialog) => {
        return erOppfolgingsdialogTidligere(oppfolgingsdialog);
    }));
};

export const finnNyesteTidligereOppfolgingsdialogMedVirksomhet = (oppfolgingsdialoger) => {
    return finnTidligereOppfolgingsdialoger(oppfolgingsdialoger)[0];
};

export const harTidligereOppfolgingsdialoger = (oppfolgingsdialoger) => {
    return finnTidligereOppfolgingsdialoger(oppfolgingsdialoger).length > 0;
};

export const erOppfolgingsdialogOpprettbarDirekte = (oppfolgingsdialoger) => {
    return !harTidligereOppfolgingsdialoger(oppfolgingsdialoger);
};

export const finnAktiveOppfolgingsdialoger = (oppfolgingsdialoger) => {
    return oppfolgingsdialoger.filter((oppfolgingsdialog) => {
        return !oppfolgingsdialog.godkjentPlan || erOppfolgingsdialogAktiv(oppfolgingsdialog);
    });
};

export const harAktivOppfolgingsdialog = (oppfolgingsdialoger) => {
    return finnAktiveOppfolgingsdialoger(oppfolgingsdialoger).length > 0;
};

export const finnNyOppfolgingsplanMedVirkshomhetEtterAvbrutt = (oppfolgingsdialoger, virksomhetsnummer) => {
    return finnAktiveOppfolgingsdialoger(oppfolgingsdialoger).filter((oppfolgingsdialog) => {
        return oppfolgingsdialog.virksomhet.virksomhetsnummer === virksomhetsnummer;
    })[0];
};

export const finnBrukersSisteInnlogging = (oppfolgingsdialoger) => {
    const innlogginger = oppfolgingsdialoger.map((oppfolgingsdialog) => {
        return new Date(oppfolgingsdialog.arbeidsgiver.naermesteLeder.sistInnlogget);
    });
    return new Date(Math.max.apply(null, innlogginger));
};

export const finnGodkjentedialogerAvbruttAvMotpartSidenSistInnlogging = (oppfolgingsdialoger) => {
    if (!oppfolgingsdialoger) {
        return [];
    }
    const sisteInnlogging = finnBrukersSisteInnlogging(oppfolgingsdialoger);
    return oppfolgingsdialoger.filter((oppfolgingsdialog) => {
        const avbruttplan = oppfolgingsdialog.godkjentPlan && oppfolgingsdialog.godkjentPlan.avbruttPlan;
        return oppfolgingsdialog.status === STATUS.AVBRUTT
            && (avbruttplan.av.fnr === oppfolgingsdialog.arbeidstaker.fnr)
            && oppfolgingsdialog.arbeidsgiver.naermesteLeder
            && (new Date(sisteInnlogging) < new Date(avbruttplan.tidspunkt));
    }).sort((o1, o2) => {
        return new Date(o2.godkjentPlan.avbruttPlan.tidspunkt) - new Date(o2.godkjentPlan.avbruttPlan.tidspunkt);
    });
};

export const finnOppfolgingsdialogMotpartNavn = (oppfolgingsdialog) => {
    return oppfolgingsdialog.arbeidstaker.navn;
};

export const finnSistEndretAvNavn = (oppfolgingsdialog) => {
    return oppfolgingsdialog.sistEndretAv.navn;
};

export const skalDeleMedNav = (delMedNav, oppfolgingsdialog) => {
    return delMedNav || oppfolgingsdialog.godkjenninger.find((godkjenning) => { return godkjenning.delMedNav; });
};

export const erArbeidstakerEgenLeder = (oppfolgingsdialog) => {
    return oppfolgingsdialog.arbeidstaker
        && oppfolgingsdialog.arbeidsgiver.naermesteLeder
        && oppfolgingsdialog.arbeidstaker.fnr === oppfolgingsdialog.arbeidsgiver.naermesteLeder.fnr;
};

export const manglerSamtykke = (oppfolgingsplan) => {
    if (erArbeidstakerEgenLeder(oppfolgingsplan)) {
        return oppfolgingsplan.arbeidstaker.samtykke === null;
    }
    return oppfolgingsplan.arbeidsgiver.naermesteLeder.samtykke === null;
};
