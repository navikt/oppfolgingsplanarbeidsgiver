import deepFreeze from 'deep-freeze';
import { expect } from 'chai';
import * as oppfolgingsdialogActions from '../../js/actions/oppfolgingsplan/oppfolgingsdialog_actions';
import * as nullstillGodkjenningAction from '../../js/actions/oppfolgingsplan/nullstillGodkjenning_actions';
import * as samtykkeAction from '../../js/actions/oppfolgingsplan/samtykke_actions';
import * as arbeidsoppgaveAction from '../../js/actions/oppfolgingsplan/arbeidsoppgave_actions';
import * as tiltakAction from '../../js/actions/oppfolgingsplan/tiltak_actions';
import oppfolgingsdialoger from '../../js/reducers/oppfolgingsdialog';
import getOppfolgingsdialog from '../mock/mockOppfolgingsdialog';

describe('oppfolgingsdialoger', () => {
    const fnr = '12345678';
    const fnr2 = '12345670';
    const mockdata = {
        oppfolgingsdialoger: [getOppfolgingsdialog()],
    };
    const initialStateUtenData = deepFreeze({
        henter: false,
        hentet: false,
        hentingFeilet: false,
    });
    const initialState = deepFreeze({
        [fnr]: {
            data: mockdata.oppfolgingsdialoger,
        },
    });

    describe('henter', () => {
        it('håndterer HENTER_OPPFOLGINGSDIALOGER', () => {
            const action = oppfolgingsdialogActions.henterOppfolgingsdialoger();
            const nextState = oppfolgingsdialoger(initialStateUtenData, action);
            expect(nextState).to.deep.equal({
                henter: true,
                hentet: false,
                hentingFeilet: false,
            });
        });

        it('håndterer OPPFOLGINGSDIALOGER_HENTET', () => {
            const oppfolgingsdialogListeSykmeldt = [
                Object.assign({}, mockdata.oppfolgingsdialoger[0], {
                    id: 1,
                    arbeidstaker: Object.assign({}, mockdata.oppfolgingsdialoger[0].arbeidstaker, {
                        fnr,
                    }),
                }),
                Object.assign({}, mockdata.oppfolgingsdialoger[0], {
                    id: 2,
                    arbeidstaker: Object.assign({}, mockdata.oppfolgingsdialoger[0].arbeidstaker, {
                        fnr,
                    }),
                }),
            ];
            const oppfolgingsdialogListeSykmeldt2 = [
                Object.assign({}, mockdata.oppfolgingsdialoger[0], {
                    id: 3,
                    arbeidstaker: Object.assign({}, mockdata.oppfolgingsdialoger[0].arbeidstaker, {
                        fnr: fnr2,
                    }),
                }),
                Object.assign({}, mockdata.oppfolgingsdialoger[0], {
                    id: 4,
                    arbeidstaker: Object.assign({}, mockdata.oppfolgingsdialoger[0].arbeidstaker, {
                        fnr: fnr2,
                    }),
                }),
            ];
            const action = oppfolgingsdialogActions.oppfolgingsdialogerHentet(oppfolgingsdialogListeSykmeldt.concat(oppfolgingsdialogListeSykmeldt2));
            const nextState = oppfolgingsdialoger(initialStateUtenData, action);
            expect(nextState).to.deep.equal({
                henter: false,
                hentet: true,
                hentingFeilet: false,
                [fnr]: {
                    data: oppfolgingsdialogListeSykmeldt,
                },
                [fnr2]: {
                    data: oppfolgingsdialogListeSykmeldt2,
                },
            });
        });

        it('håndterer HENT_OPPFOLGINGSDIALOGER_FEILET', () => {
            const action = oppfolgingsdialogActions.hentOppfolgingsdialogerFeilet();
            const nextState = oppfolgingsdialoger(initialStateUtenData, action);
            expect(nextState).to.deep.equal({
                henter: false,
                hentet: false,
                hentingFeilet: true,
            });
        });
    });

    describe('oppretter', () => {
        it('håndterer OPPRETTER_OPPFOLGINGSDIALOG', () => {
            const action = oppfolgingsdialogActions.oppretterOppfolgingsdialog(fnr);
            const nextState = oppfolgingsdialoger(initialStateUtenData, action);
            expect(nextState).to.deep.equal({
                henter: false,
                hentet: false,
                hentingFeilet: false,
                [fnr]: {
                    oppretter: true,
                    opprettet: false,
                    opprettingFeilet: false,
                },
            });
        });

        it('håndterer OPPFOLGINGSDIALOG_OPPRETTET', () => {
            const action = oppfolgingsdialogActions.oppfolgingsdialogOpprettet(1, fnr);
            const nextState = oppfolgingsdialoger(initialStateUtenData, action);
            expect(nextState).to.deep.equal({
                henter: false,
                hentet: false,
                hentingFeilet: false,
                [fnr]: {
                    oppretter: false,
                    opprettet: true,
                    opprettetId: 1,
                },
            });
        });

        it('håndterer OPPRETT_OPPFOLGINGSDIALOG_FEILET', () => {
            const action = oppfolgingsdialogActions.opprettOppfolgingsdialogFeilet(fnr);
            const nextState = oppfolgingsdialoger(initialStateUtenData, action);
            expect(nextState).to.deep.equal({
                henter: false,
                hentet: false,
                hentingFeilet: false,
                [fnr]: {
                    oppretter: false,
                    opprettingFeilet: true,
                },
            });
        });
    });

    describe('godkjenner', () => {
        it('håndterer GODKJENNER_DIALOG', () => {
            const action = oppfolgingsdialogActions.godkjennerDialog(fnr);
            const nextState = oppfolgingsdialoger(initialState, action);
            expect(nextState).to.deep.equal({
                [fnr]: {
                    data: mockdata.oppfolgingsdialoger,
                    godkjenner: true,
                    godkjenningFeilet: false,
                    godkjent: false,
                },
            });
        });


        it('håndterer DIALOG_GODKJENT', () => {
            const action = oppfolgingsdialogActions.dialogGodkjent(1, 'tvungenGodkjenning', new Date(), fnr);
            const nextState = oppfolgingsdialoger(initialState, action);
            expect(nextState).to.deep.equal({
                [fnr]: {
                    data: mockdata.oppfolgingsdialoger,
                    godkjenner: false,
                    godkjent: true,
                },
            });
        });

        it('håndterer GODKJENN_DIALOG_FEILET', () => {
            const action = oppfolgingsdialogActions.godkjennDialogFeilet(fnr);
            const nextState = oppfolgingsdialoger(initialState, action);
            expect(nextState).to.deep.equal({
                [fnr]: {
                    data: mockdata.oppfolgingsdialoger,
                    godkjenner: false,
                    godkjenningFeilet: true,
                },
            });
        });
    });

    it('håndterer NULLSTILT_GODKJENNING', () => {
        const action = nullstillGodkjenningAction.nullstiltGodkjenning(mockdata.oppfolgingsdialoger, fnr);
        const nextState = oppfolgingsdialoger(initialState, action);
        expect(nextState).to.deep.equal({
            [fnr]: {
                data: mockdata.oppfolgingsdialoger,
            },
        });
    });

    it('håndterer SAMTYKKE_GITT', () => {
        const action = samtykkeAction.samtykkeGitt(1, true, fnr);
        const nextState = oppfolgingsdialoger(initialState, action);
        expect(nextState).to.deep.equal({
            [fnr]: {
                data: mockdata.oppfolgingsdialoger,
            },
        });
    });

    it('håndterer AVVISER_DIALOG', () => {
        const action = oppfolgingsdialogActions.avviserDialog(fnr);
        const nextState = oppfolgingsdialoger(initialState, action);
        expect(nextState).to.deep.equal({
            [fnr]: {
                data: mockdata.oppfolgingsdialoger,
                avviser: true,
                avvist: false,
                avvisFeilet: false,
            },
        });
    });

    it('håndterer DIALOG_AVVIST', () => {
        const action = oppfolgingsdialogActions.dialogAvvist(1, fnr);
        const nextState = oppfolgingsdialoger(initialState, action);
        expect(nextState).to.deep.equal({
            [fnr]: {
                data: mockdata.oppfolgingsdialoger,
                avvist: true,
                avviser: false,
            },
        });
    });

    it('håndterer AVVIS_DIALOG_FEILET', () => {
        const action = oppfolgingsdialogActions.avvisDialogFeilet(fnr);
        const nextState = oppfolgingsdialoger(initialState, action);
        expect(nextState).to.deep.equal({
            [fnr]: {
                data: mockdata.oppfolgingsdialoger,
                godkjenner: false,
                avviser: false,
                avvisFeilet: true,
            },
        });
    });

    it('håndterer ARBEIDSOPPGAVE_SLETTET', () => {
        const action = arbeidsoppgaveAction.arbeidsoppgaveSlettet(1, 1, fnr);
        const nextState = oppfolgingsdialoger(initialState, action);
        expect(nextState).to.deep.equal({
            [fnr]: {
                data: mockdata.oppfolgingsdialoger,
            },
        });
    });

    it('håndterer TILTAK_SLETTET', () => {
        const action = tiltakAction.tiltakSlettet(1, 1, fnr);
        const nextState = oppfolgingsdialoger(initialState, action);
        expect(nextState).to.deep.equal({
            [fnr]: {
                data: mockdata.oppfolgingsdialoger,
            },
        });
    });

    it('håndterer TILTAK_SLETTET endret ID', () => {
        const action = tiltakAction.tiltakSlettet(2, 1, fnr);
        const nextState = oppfolgingsdialoger(initialState, action);
        expect(nextState).to.deep.equal({
            [fnr]: {
                data: mockdata.oppfolgingsdialoger,
            },
        });
    });

    it('håndterer TILTAK_LAGRET endret ID', () => {
        const action = tiltakAction.tiltakLagret(2, mockdata.oppfolgingsdialoger, mockdata.oppfolgingsdialoger[0].tiltakListe, fnr);
        const nextState = oppfolgingsdialoger(initialState, action);
        expect(nextState).to.deep.equal({
            [fnr]: {
                data: mockdata.oppfolgingsdialoger,
            },
        });
    });

    it('håndterer TILTAK_LAGRET', () => {
        const action = tiltakAction.tiltakLagret(1, mockdata.oppfolgingsdialoger, mockdata.oppfolgingsdialoger[0].tiltakListe, fnr);
        const nextState = oppfolgingsdialoger(initialState, action);
        expect(nextState).to.deep.equal({
            [fnr]: {
                data: mockdata.oppfolgingsdialoger,
            },
        });
    });

    it('håndterer ARBEIDSOPPGAVE_LAGRET', () => {
        const action = arbeidsoppgaveAction.arbeidsoppgaveLagret(1, mockdata.oppfolgingsdialoger, mockdata.oppfolgingsdialoger[0].arbeidsoppgaveListe, fnr);
        const nextState = oppfolgingsdialoger(initialState, action);
        expect(nextState).to.deep.equal({
            [fnr]: {
                data: mockdata.oppfolgingsdialoger,
            },
        });
    });
});
