import * as actions from '../actions/oppfolgingsplan/oppfolgingsdialog_actions';
import {
    ARBEIDSOPPGAVE_LAGRET,
    ARBEIDSOPPGAVE_SLETTET,
} from '../actions/oppfolgingsplan/arbeidsoppgave_actions';
import {
    TILTAK_LAGRET,
    TILTAK_SLETTET,
} from '../actions/oppfolgingsplan/tiltak_actions';
import {
    KOMMENTAR_LAGRET,
    KOMMENTAR_SLETTET,
} from '../actions/oppfolgingsplan/kommentar_actions';
import { NULLSTILT_GODKJENNING } from '../actions/oppfolgingsplan/nullstillGodkjenning_actions';
import { DELT_MED_NAV } from '../actions/oppfolgingsplan/delmednav_actions';
import { DELT_MED_FASTLEGE } from '../actions/oppfolgingsplan/delMedFastlege_actions';
import { SAMTYKKE_GITT } from '../actions/oppfolgingsplan/samtykke_actions';
import { finnNyesteGodkjenning } from '../utils/oppfolgingsdialogUtils';

const initiellState = {
    henter: false,
    hentet: false,
    hentingFeilet: false,
    hentingForsokt: false,
    data: {},
};

const setStateVedOppfolgingsdialogerHentet = (state, oppfolgingsdialoger) => {
    const unikeFnr = [...new Set(oppfolgingsdialoger.map((dialog) => {
        return dialog.arbeidstaker.fnr;
    }))];
    let nyState = Object.assign({}, state, {
        henter: false,
        hentet: true,
        hentingForsokt: true,
    });
    unikeFnr.forEach((fnr) => {
        const oppfolgingsdialogerFnr = oppfolgingsdialoger.filter((dialog) => {
            return dialog.arbeidstaker.fnr === fnr;
        });
        nyState = Object.assign({}, nyState, {
            [fnr]: {
                data: oppfolgingsdialogerFnr,
            },
        });
    });
    return nyState;
};

const oppfolgingsdialoger = (state = initiellState, action = {}) => {
    const fnr = action.fnr;
    const oppfolgingsdialogerSykmeldt = {};

    switch (action.type) {
        case NULLSTILT_GODKJENNING: {
            const data = state[fnr].data.map((dialog) => {
                if (dialog.id === Number(action.id)) {
                    return Object.assign({}, dialog, {
                        godkjenninger: [],
                        arbeidstaker: Object.assign({}, dialog.arbeidstaker, {
                            samtykke: null,
                        }),
                        arbeidsgiver: Object.assign({}, dialog.arbeidsgiver, {
                            naermesteLeder: Object.assign({}, dialog.arbeidsgiver.naermesteLeder, {
                                samtykke: null,
                            }),
                        }),
                    });
                }
                return dialog;
            });

            oppfolgingsdialogerSykmeldt[fnr] = Object.assign({}, state[fnr], {
                data,
            });
            return Object.assign({}, state, oppfolgingsdialogerSykmeldt);
        }
        case ARBEIDSOPPGAVE_LAGRET: {
            const data = state[fnr].data.map((oppfolgingsdialog) => {
                if (oppfolgingsdialog.id === Number(action.id)) {
                    if (!action.arbeidsoppgave.arbeidsoppgaveId) {
                        const nyArbeidsoppgave = Object.assign({}, action.arbeidsoppgave, {
                            arbeidsoppgaveId: action.data,
                            arbeidsoppgavenavn: action.arbeidsoppgave.arbeidsoppgavenavn,
                            sistEndretAv: oppfolgingsdialog.arbeidsgiver.naermesteLeder,
                            opprettetDato: new Date(),
                            sistEndretDato: new Date(),
                            erVurdertAvSykmeldt: false,
                            opprettetAv: oppfolgingsdialog.arbeidsgiver.naermesteLeder,
                        });
                        return Object.assign({}, oppfolgingsdialog, {
                            arbeidsoppgaveListe: [...oppfolgingsdialog.arbeidsoppgaveListe, nyArbeidsoppgave],
                        });
                    }
                    const arbeidsoppgaveListe = [...oppfolgingsdialog.arbeidsoppgaveListe].map((arbeidsoppgave) => {
                        if (Number(action.arbeidsoppgave.arbeidsoppgaveId) === arbeidsoppgave.arbeidsoppgaveId) {
                            return Object.assign({}, arbeidsoppgave, {
                                sistEndretAv: oppfolgingsdialog.arbeidsgiver.naermesteLeder,
                                sistEndretDato: new Date(),
                                arbeidsoppgavenavn: action.arbeidsoppgave.arbeidsoppgavenavn,
                            });
                        }
                        return arbeidsoppgave;
                    });
                    return Object.assign({}, oppfolgingsdialog, {
                        arbeidsoppgaveListe,
                        sistEndretAv: oppfolgingsdialog.arbeidsgiver.naermesteLeder,
                        sistEndretDato: new Date(),
                    });
                }
                return oppfolgingsdialog;
            });

            oppfolgingsdialogerSykmeldt[fnr] = Object.assign({}, state[fnr], {
                data,
            });
            return Object.assign({}, state, oppfolgingsdialogerSykmeldt);
        }
        case ARBEIDSOPPGAVE_SLETTET: {
            const data = state[fnr].data.map((oppfolgingsdialog) => {
                if (oppfolgingsdialog.id === Number(action.id)) {
                    const arbeidsoppgaveListe = oppfolgingsdialog.arbeidsoppgaveListe.filter((arbeidsoppgave) => {
                        return action.arbeidsoppgaveId !== arbeidsoppgave.arbeidsoppgaveId;
                    });
                    return Object.assign({}, oppfolgingsdialog, {
                        arbeidsoppgaveListe,
                        sistEndretAv: oppfolgingsdialog.arbeidsgiver.naermesteLeder,
                        sistEndretDato: new Date(),
                    });
                }
                return oppfolgingsdialog;
            });

            oppfolgingsdialogerSykmeldt[fnr] = Object.assign({}, state[fnr], {
                data,
            });
            return Object.assign({}, state, oppfolgingsdialogerSykmeldt);
        }
        case TILTAK_LAGRET: {
            const data = state[fnr].data.map((oppfolgingsdialog) => {
                if (oppfolgingsdialog.id === Number(action.id)) {
                    if (!action.tiltak.tiltakId) {
                        const nyttTiltak = Object.assign({}, action.tiltak, {
                            tiltakId: action.data,
                            tiltaknavn: action.tiltak.tiltaknavn,
                            beskrivelse: action.tiltak.beskrivelse,
                            beskrivelseIkkeAktuelt: action.tiltak.beskrivelseIkkeAktuelt,
                            sistEndretAv: oppfolgingsdialog.arbeidsgiver.naermesteLeder,
                            opprettetDato: new Date(),
                            sistEndretDato: new Date(),
                            opprettetAv: oppfolgingsdialog.arbeidsgiver.naermesteLeder,
                            gjennomfoering: action.tiltak.gjennomfoering,
                            status: action.tiltak.status,
                            fom: action.tiltak.fom,
                            tom: action.tiltak.tom,
                            kommentarer: [],
                        });
                        return Object.assign({}, oppfolgingsdialog, {
                            tiltakListe: [nyttTiltak, ...oppfolgingsdialog.tiltakListe],
                            sistEndretAv: oppfolgingsdialog.arbeidsgiver.naermesteLeder,
                            sistEndretDato: new Date(),
                        });
                    }
                    const tiltakListe = [...oppfolgingsdialog.tiltakListe].map((tiltak) => {
                        if (Number(action.tiltak.tiltakId) === tiltak.tiltakId) {
                            return Object.assign({}, tiltak, {
                                sistEndretAv: oppfolgingsdialog.arbeidsgiver.naermesteLeder,
                                sistEndretDato: new Date(),
                                tiltaknavn: action.tiltak.tiltaknavn,
                                beskrivelse: action.tiltak.beskrivelse,
                                beskrivelseIkkeAktuelt: action.tiltak.beskrivelseIkkeAktuelt,
                                gjennomfoering: action.tiltak.gjennomfoering,
                                status: action.tiltak.status,
                                fom: action.tiltak.fom,
                                tom: action.tiltak.tom,
                            });
                        }
                        return tiltak;
                    });
                    return Object.assign({}, oppfolgingsdialog, {
                        tiltakListe,
                        sistEndretAv: oppfolgingsdialog.arbeidsgiver.naermesteLeder,
                        sistEndretDato: new Date(),
                    });
                }
                return oppfolgingsdialog;
            });

            oppfolgingsdialogerSykmeldt[fnr] = Object.assign({}, state[fnr], {
                data,
            });
            return Object.assign({}, state, oppfolgingsdialogerSykmeldt);
        }
        case TILTAK_SLETTET: {
            const data = state[fnr].data.map((oppfolgingsdialog) => {
                if (oppfolgingsdialog.id === Number(action.id)) {
                    const tiltakListe = oppfolgingsdialog.tiltakListe.filter((tiltak) => {
                        return action.tiltakId !== tiltak.tiltakId;
                    });
                    return Object.assign({}, oppfolgingsdialog, {
                        tiltakListe,
                        sistEndretAv: oppfolgingsdialog.arbeidsgiver.naermesteLeder,
                        sistEndretDato: new Date(),
                    });
                }
                return oppfolgingsdialog;
            });

            oppfolgingsdialogerSykmeldt[fnr] = Object.assign({}, state[fnr], {
                data,
            });
            return Object.assign({}, state, oppfolgingsdialogerSykmeldt);
        }
        case KOMMENTAR_LAGRET: {
            const data = state[fnr].data.map((oppfolgingsdialog) => {
                if (oppfolgingsdialog.id === Number(action.id)) {
                    const tiltakListe = [...oppfolgingsdialog.tiltakListe].map((tiltak) => {
                        if (tiltak.tiltakId === Number(action.tiltakId)) {
                            if (!action.kommentar.kommentarId) {
                                const nyKommentar = Object.assign({}, action.kommentar, {
                                    id: action.data,
                                    tekst: action.kommentar.tekst,
                                    opprettetTidspunkt: new Date(),
                                    opprettetAv: oppfolgingsdialog.arbeidsgiver.naermesteLeder,
                                    sistEndretAv: oppfolgingsdialog.arbeidstaker,
                                });
                                return Object.assign({}, tiltak, {
                                    kommentarer: [nyKommentar, ...tiltak.kommentarer],
                                    sistEndretAv: oppfolgingsdialog.arbeidsgiver.naermesteLeder,
                                    sistEndretDato: new Date(),
                                });
                            }
                        }
                        return tiltak;
                    });
                    return Object.assign({}, oppfolgingsdialog, {
                        tiltakListe,
                        sistEndretAv: oppfolgingsdialog.arbeidsgiver.naermesteLeder,
                        sistEndretDato: new Date(),
                    });
                }
                return oppfolgingsdialog;
            });

            oppfolgingsdialogerSykmeldt[fnr] = Object.assign({}, state[fnr], {
                data,
            });
            return Object.assign({}, state, oppfolgingsdialogerSykmeldt);
        }
        case KOMMENTAR_SLETTET: {
            const data = state[fnr].data.map((oppfolgingsdialog) => {
                if (oppfolgingsdialog.id === Number(action.id)) {
                    const tiltakListe = [...oppfolgingsdialog.tiltakListe].map((tiltak) => {
                        if (tiltak.tiltakId === Number(action.tiltakId)) {
                            const kommentarer = [...tiltak.kommentarer].filter((kommentar) => {
                                return action.kommentarId !== kommentar.id;
                            });
                            return Object.assign({}, tiltak, {
                                kommentarer,
                                sistEndretAv: oppfolgingsdialog.arbeidsgiver.naermesteLeder,
                                sistEndretDato: new Date(),
                            });
                        }
                        return tiltak;
                    });
                    return Object.assign({}, oppfolgingsdialog, {
                        tiltakListe,
                        sistEndretAv: oppfolgingsdialog.arbeidsgiver.naermesteLeder,
                        sistEndretDato: new Date(),
                    });
                }
                return oppfolgingsdialog;
            });

            oppfolgingsdialogerSykmeldt[fnr] = Object.assign({}, state[fnr], {
                data,
            });
            return Object.assign({}, state, oppfolgingsdialogerSykmeldt);
        }
        case actions.HENTER_OPPFOLGINGSDIALOGER: {
            return Object.assign({}, state, {
                henter: true,
                hentet: false,
                hentingFeilet: false,
                hentingForsokt: false,
            });
        }
        case actions.OPPFOLGINGSDIALOGER_HENTET: {
            return setStateVedOppfolgingsdialogerHentet(state, action.data);
        }
        case actions.HENT_OPPFOLGINGSDIALOGER_FEILET: {
            return Object.assign({}, state, {
                henter: false,
                hentingFeilet: true,
                hentingForsokt: true,
            });
        }
        case actions.OPPRETTER_OPPFOLGINGSDIALOG: {
            oppfolgingsdialogerSykmeldt[fnr] = Object.assign({}, state[fnr], {
                oppretter: true,
                opprettet: false,
                opprettingFeilet: false,
            });
            return Object.assign({}, state, oppfolgingsdialogerSykmeldt);
        }
        case actions.OPPFOLGINGSDIALOG_OPPRETTET: {
            oppfolgingsdialogerSykmeldt[fnr] = Object.assign({}, state[fnr], {
                oppretter: false,
                opprettet: true,
                opprettetId: action.data,
            });
            return Object.assign({}, state, oppfolgingsdialogerSykmeldt);
        }
        case actions.OPPRETT_OPPFOLGINGSDIALOG_FEILET: {
            oppfolgingsdialogerSykmeldt[fnr] = Object.assign({}, state[fnr], {
                oppretter: false,
                opprettingFeilet: true,
            });
            return Object.assign({}, state, oppfolgingsdialogerSykmeldt);
        }
        case actions.GODKJENNER_DIALOG: {
            oppfolgingsdialogerSykmeldt[fnr] = Object.assign({}, state[fnr], {
                godkjenner: true,
                godkjent: false,
                godkjenningFeilet: false,
            });
            return Object.assign({}, state, oppfolgingsdialogerSykmeldt);
        }
        case actions.DIALOG_GODKJENT: {
            const data = state[fnr].data.map((oppfolgingsdialog) => {
                if (Number(action.id) === oppfolgingsdialog.id) {
                    if ((oppfolgingsdialog.godkjenninger.length > 0 && finnNyesteGodkjenning(oppfolgingsdialog.godkjenninger).godkjent) || action.status === 'tvungenGodkjenning') {
                        return Object.assign({}, oppfolgingsdialog, {
                            godkjenninger: [],
                            status: 'AKTIV',
                            godkjentPlan: {
                                tvungenGodkjenning: action.status === 'tvungenGodkjenning',
                                opprettetTidspunkt: new Date(),
                                gyldighetstidspunkt: {
                                    fom: action.gyldighetstidspunkt.fom,
                                    tom: action.gyldighetstidspunkt.tom,
                                    evalueres: action.gyldighetstidspunkt.evalueres,
                                },
                            },
                        });
                    }
                    return Object.assign({}, oppfolgingsdialog, {
                        godkjenninger: [{
                            godkjent: true,
                            godkjenningsTidspunkt: new Date(),
                            godkjentAv: oppfolgingsdialog.arbeidsgiver.naermesteLeder,
                            gyldighetstidspunkt: {
                                fom: action.gyldighetstidspunkt.fom,
                                tom: action.gyldighetstidspunkt.tom,
                                evalueres: action.gyldighetstidspunkt.evalueres,
                            },
                        }],
                        sistEndretAv: oppfolgingsdialog.arbeidsgiver.naermesteLeder,
                        sistEndretDato: new Date(),
                    });
                }
                return oppfolgingsdialog;
            });
            oppfolgingsdialogerSykmeldt[fnr] = Object.assign({}, state[fnr], {
                godkjenner: false,
                godkjent: true,
                data,
            });
            return Object.assign({}, state, oppfolgingsdialogerSykmeldt);
        }
        case actions.GODKJENN_DIALOG_FEILET: {
            oppfolgingsdialogerSykmeldt[fnr] = Object.assign({}, state[fnr], {
                godkjenner: false,
                godkjenningFeilet: true,
            });
            return Object.assign({}, state, oppfolgingsdialogerSykmeldt);
        }

        case actions.AVVISER_DIALOG: {
            oppfolgingsdialogerSykmeldt[fnr] = Object.assign({}, state[fnr], {
                avviser: true,
                avvist: false,
                avvisFeilet: false,
            });
            return Object.assign({}, state, oppfolgingsdialogerSykmeldt);
        }

        case actions.DIALOG_AVVIST: {
            const data = state[fnr].data.map((oppfolgingsdialog) => {
                if (Number(action.id) === oppfolgingsdialog.id) {
                    return Object.assign({}, oppfolgingsdialog, {
                        godkjenninger: [{
                            godkjent: false,
                            godkjenningsTidspunkt: new Date(),
                            godkjentAv: oppfolgingsdialog.arbeidsgiver.naermesteLeder,
                        }],
                        sistEndretAv: oppfolgingsdialog.arbeidsgiver.naermesteLeder,
                        sistEndretDato: new Date(),
                        arbeidstaker: Object.assign({}, oppfolgingsdialog.arbeidstaker, {
                            samtykke: null,
                        }),
                        arbeidsgiver: Object.assign({}, oppfolgingsdialog.arbeidsgiver, {
                            naermesteLeder: Object.assign({}, oppfolgingsdialog.arbeidsgiver.naermesteLeder, {
                                samtykke: null,
                            }),
                        }),
                    });
                }
                return oppfolgingsdialog;
            });
            oppfolgingsdialogerSykmeldt[fnr] = Object.assign({}, state[fnr], {
                data,
                avviser: false,
                avvist: true,
            });
            return Object.assign({}, state, oppfolgingsdialogerSykmeldt);
        }
        case SAMTYKKE_GITT: {
            const data = state[fnr].data.map((oppfolgingsdialog) => {
                if (Number(action.id) === oppfolgingsdialog.id) {
                    return Object.assign({}, oppfolgingsdialog, {
                        arbeidsgiver: Object.assign({}, oppfolgingsdialog.arbeidsgiver, {
                            naermesteLeder: Object.assign({}, oppfolgingsdialog.arbeidsgiver.naermesteLeder, {
                                samtykke: action.samtykke,
                            }),
                        }),
                    });
                }
                return oppfolgingsdialog;
            });
            oppfolgingsdialogerSykmeldt[fnr] = Object.assign({}, state[fnr], {
                data,
            });
            return Object.assign({}, state, oppfolgingsdialogerSykmeldt);
        }
        case DELT_MED_FASTLEGE: {
            const data = state[fnr].data.map((oppfolgingsdialog) => {
                if (Number(action.id) === oppfolgingsdialog.id) {
                    return Object.assign({}, oppfolgingsdialog, {
                        godkjentPlan: Object.assign({}, oppfolgingsdialog.godkjentPlan, {
                            deltMedFastlege: true,
                            deltMedFastlegeTidspunkt: new Date(),
                        }),
                    });
                }
                return oppfolgingsdialog;
            });
            oppfolgingsdialogerSykmeldt[fnr] = Object.assign({}, state[fnr], {
                data,
            });
            return Object.assign({}, state, oppfolgingsdialogerSykmeldt);
        }
        case DELT_MED_NAV: {
            const data = state[fnr].data.map((oppfolgingsdialog) => {
                if (Number(action.id) === oppfolgingsdialog.id) {
                    return Object.assign({}, oppfolgingsdialog, {
                        godkjentPlan: Object.assign({}, oppfolgingsdialog.godkjentPlan, {
                            deltMedNAV: true,
                            deltMedNAVTidspunkt: new Date(),
                        }),
                    });
                }
                return oppfolgingsdialog;
            });
            oppfolgingsdialogerSykmeldt[fnr] = Object.assign({}, state[fnr], {
                data,
            });
            return Object.assign({}, state, oppfolgingsdialogerSykmeldt);
        }
        case actions.AVVIS_DIALOG_FEILET: {
            oppfolgingsdialogerSykmeldt[fnr] = Object.assign({}, state[fnr], {
                godkjenner: false,
                avviser: false,
                avvisFeilet: true,
            });
            return Object.assign({}, state, oppfolgingsdialogerSykmeldt);
        }
        default:
            return state;
    }
};

export default oppfolgingsdialoger;
