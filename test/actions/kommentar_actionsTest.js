import { expect } from 'chai';
import * as actions from '../../js/actions/oppfolgingsplan/kommentar_actions';

describe('kommentar_actions', () => {
    const fnr = '1245678';
    const tiltakId = 1;

    it('Skal ha en lagreKommentar()-funksjon som returnerer riktig action', () => {
        expect(actions.lagreKommentar(1, 1, {}, fnr)).to.deep.equal({
            type: actions.LAGRE_KOMMENTAR_FORESPURT,
            id: 1,
            tiltakId: 1,
            kommentar: {},
            fnr,
        });
    });

    it('Skal ha en lagrerKommentar()-funksjon som returnerer riktig action', () => {
        expect(actions.lagrerKommentar(fnr, 1)).to.deep.equal({
            type: actions.LAGRER_KOMMENTAR,
            fnr,
            tiltakId,
        });
    });

    it('har en kommentarLagret()-funksjon som returnerer riktig action', () => {
        expect(actions.kommentarLagret(1, 1, 1, { tekst: 'test' }, fnr)).to.deep.equal({
            type: actions.KOMMENTAR_LAGRET,
            data: 1,
            id: 1,
            tiltakId: 1,
            kommentar: { tekst: 'test' },
            fnr,
        });
    });

    it('Skal ha en lagreKommentarFeilet()-funksjon som returnerer riktig action', () => {
        expect(actions.lagreKommentarFeilet(fnr, 1)).to.deep.equal({
            type: actions.LAGRE_KOMMENTAR_FEILET,
            fnr,
            tiltakId: 1,
        });
    });


    it('Skal ha en slettKommentar()-funksjon som returnerer riktig action', () => {
        expect(actions.slettKommentar(1, 1, 1, fnr)).to.deep.equal({
            type: actions.SLETT_KOMMENTAR_FORESPURT,
            id: 1,
            tiltakId: 1,
            kommentarId: 1,
            fnr,
        });
    });

    it('Skal ha en sletterKommentar()-funksjon som returnerer riktig action', () => {
        expect(actions.sletterKommentar(fnr)).to.deep.equal({
            type: actions.SLETTER_KOMMENTAR,
            fnr,
        });
    });

    it('har en kommentarSlettet()-funksjon som returnerer riktig action', () => {
        expect(actions.kommentarSlettet(1, 1, 1, fnr)).to.deep.equal({
            type: actions.KOMMENTAR_SLETTET,
            id: 1,
            tiltakId: 1,
            kommentarId: 1,
            fnr,
        });
    });

    it('Skal ha en slettKommentarFeilet()-funksjon som returnerer riktig action', () => {
        expect(actions.slettKommentarFeilet(fnr, 1, 2)).to.deep.equal({
            type: actions.SLETT_KOMMENTAR_FEILET,
            fnr,
            tiltakId: 1,
            kommentarId: 2,
        });
    });
});
