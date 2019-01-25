import { expect } from 'chai';
import * as actions from '../../js/actions/oppfolgingsplan/oppfolgingsdialog_actions';

describe('oppfolgingsdialoger_actions', () => {
    const fnr = '12345678';

    beforeEach(() => {
        window = window || {};
        window.APP_SETTINGS = {
            OPPFOELGINGSDIALOGREST_ROOT: 'http://tjenester.nav.no/oppfoelgingsdialogrest/api',
        };
    });

    describe('hent', () => {
        it('Skal ha en hentOppfolgingsdialoger()-funksjon som returnerer riktig action', () => {
            expect(actions.hentOppfolgingsdialoger()).to.deep.equal({
                type: actions.HENT_OPPFOLGINGSDIALOGER_FORESPURT,
            });
        });

        it('Skal ha en henterOppfolgingsdialoger()-funksjon som returnerer riktig action', () => {
            expect(actions.henterOppfolgingsdialoger()).to.deep.equal({
                type: actions.HENTER_OPPFOLGINGSDIALOGER,
            });
        });

        it('har en oppfolgingsdialogerHentet()-funksjon som returnerer riktig action', () => {
            expect(actions.oppfolgingsdialogerHentet([{ id: 12345, navn: 'Ole' }])).to.deep.equal({
                type: actions.OPPFOLGINGSDIALOGER_HENTET,
                data: [{ id: 12345, navn: 'Ole' }],
            });
        });

        it('Skal ha en hentOppfolgingsdialogerFeilet()-funksjon som returnerer riktig action', () => {
            expect(actions.hentOppfolgingsdialogerFeilet()).to.deep.equal({
                type: actions.HENT_OPPFOLGINGSDIALOGER_FEILET,
            });
        });
    });

    describe('opprett', () => {
        it('Skal ha en opprettOppfolgingsdialog()-funksjon som returnerer riktig action', () => {
            expect(actions.opprettOppfolgingsdialog({}, fnr)).to.deep.equal({
                type: actions.OPPRETT_OPPFOLGINGSDIALOG_FORESPURT,
                oppfolgingsdialog: {},
                fnr,
            });
        });

        it('Skal ha en oppretterOppfolgingsdialog()-funksjon som returnerer riktig action', () => {
            expect(actions.oppretterOppfolgingsdialog(fnr)).to.deep.equal({
                type: actions.OPPRETTER_OPPFOLGINGSDIALOG,
                fnr,
            });
        });

        it('har en oppfolgingsdialogOpprettet()-funksjon som returnerer riktig action', () => {
            expect(actions.oppfolgingsdialogOpprettet([{ id: 12345, navn: 'Ole' }], fnr)).to.deep.equal({
                type: actions.OPPFOLGINGSDIALOG_OPPRETTET,
                data: [{ id: 12345, navn: 'Ole' }],
                fnr,
            });
        });

        it('Skal ha en hentOppfolgingsdialogerFeilet()-funksjon som returnerer riktig action', () => {
            expect(actions.opprettOppfolgingsdialogFeilet(fnr)).to.deep.equal({
                type: actions.OPPRETT_OPPFOLGINGSDIALOG_FEILET,
                fnr,
            });
        });
    });

    describe('godkjenn', () => {
        it('Skal ha en godkjennDialog()-funksjon som returnerer riktig action', () => {
            expect(actions.godkjennDialog(1, {}, '', fnr)).to.deep.equal({
                type: actions.GODKJENN_DIALOG_FORESPURT,
                id: 1,
                gyldighetstidspunkt: {},
                status: '',
                fnr,
            });
        });

        it('Skal ha en godkjennerDialog()-funksjon som returnerer riktig action', () => {
            expect(actions.godkjennerDialog(fnr)).to.deep.equal({
                type: actions.GODKJENNER_DIALOG,
                fnr,
            });
        });

        it('Skal ha en dialogGodkjent()-funksjon som returnerer riktig action', () => {
            expect(actions.dialogGodkjent(1, {}, '', fnr)).to.deep.equal({
                type: actions.DIALOG_GODKJENT,
                id: 1,
                gyldighetstidspunkt: {},
                status: '',
                fnr,
            });
        });

        it('Skal ha en godkjennDialogFeilet()-funksjon som returnerer riktig action', () => {
            expect(actions.godkjennDialogFeilet(fnr)).to.deep.equal({
                type: actions.GODKJENN_DIALOG_FEILET,
                fnr,
            });
        });
    });

    describe('avvis', () => {
        it('Skal ha en avvisDialog()-funksjon som returnerer riktig action', () => {
            expect(actions.avvisDialog(1, fnr)).to.deep.equal({
                type: actions.AVVIS_DIALOG_FORESPURT,
                id: 1,
                fnr,
            });
        });

        it('Skal ha en avviserDialog()-funksjon som returnerer riktig action', () => {
            expect(actions.avviserDialog(fnr)).to.deep.equal({
                type: actions.AVVISER_DIALOG,
                fnr,
            });
        });

        it('har en dialogAvvist()-funksjon som returnerer riktig action', () => {
            expect(actions.dialogAvvist(1, fnr)).to.deep.equal({
                type: actions.DIALOG_AVVIST,
                id: 1,
                fnr,
            });
        });

        it('Skal ha en avvisDialogFeilet()-funksjon som returnerer riktig action', () => {
            expect(actions.avvisDialogFeilet(fnr)).to.deep.equal({
                type: actions.AVVIS_DIALOG_FEILET,
                fnr,
            });
        });
    });
});
