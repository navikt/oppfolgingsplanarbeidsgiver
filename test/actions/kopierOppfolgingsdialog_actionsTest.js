import { expect } from 'chai';
import * as actions from '../../js/actions/oppfolgingsplan/kopierOppfolgingsdialog_actions';

describe('avbrytdialog_actions', () => {
    beforeEach(() => {
        window = window || {};
        window.APP_SETTINGS = {
            OPPFOELGINGSDIALOGREST_ROOT: '/restoppfoelgingsdialog/api',
        };
    });

    it('Skal ha en kopierOppfolgingsdialog()-funksjon som returnerer riktig action', () => {
        expect(actions.kopierOppfolgingsdialog(1)).to.deep.equal({
            type: actions.KOPIER_OPPFOLGINGSDIALOG_FORESPURT,
            id: 1,
        });
    });

    it('Skal ha en kopiererOppfolgingsdialog()-funksjon som returnerer riktig action', () => {
        expect(actions.kopiererOppfolgingsdialog()).to.deep.equal({
            type: actions.KOPIERER_OPPFOLGINGSDIALOG,
        });
    });

    it('har en oppfolgingsdialogKopiert()-funksjon som returnerer riktig action', () => {
        expect(actions.oppfolgingsdialogKopiert(1)).to.deep.equal({
            type: actions.OPPFOLGINGSDIALOG_KOPIERT,
            id: 1,
        });
    });

    it('Skal ha en kopierOppfolgingsdialogFeilet()-funksjon som returnerer riktig action', () => {
        expect(actions.kopierOppfolgingsdialogFeilet()).to.deep.equal({
            type: actions.KOPIER_OPPFOLGINGSDIALOG_FEILET,
        });
    });
});
