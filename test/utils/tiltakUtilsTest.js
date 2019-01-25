import chai from 'chai';
import rewire from 'rewire';
import getTiltak from '../mock/mockTiltak';
import {
    input2RSTiltak,
    sorterTiltakEtterNyeste,
    sorterKommentarerEtterOpprettet,
} from '../../js/utils/tiltakUtils';

const expect = chai.expect;

describe('tiltakUtils', () => {
    const tiltak = getTiltak();

    const file = rewire('../../js/utils/tiltakUtils');
    const isDefined = file.__get__('isDefined');

    it('Skal isDefined retunere true', () => {
        expect(isDefined('test')).to.deep.equal(true);
    });

    it('Skal isDefined retunere false', () => {
        expect(isDefined()).to.deep.equal(false);
    });

    it('Skal kontrollre input2RSTiltak', () => {
        expect(input2RSTiltak(tiltak).tiltaknavn).to.deep.equal('Tiltak1');
    });

    describe('sorterTiltakEtterNyeste', () => {
        it('Skal sortere kommentarer etter nyligste opprettet, basert på Id', () => {
            const tiltakListe = [
                {
                    tiltakId: 1,
                    tiltaknavn: 'Tiltak 1',
                },
                {
                    tiltakId: 2,
                    tiltaknavn: 'Tiltak 2',
                },
                {
                    tiltakId: 3,
                    tiltaknavn: 'Tiltak 3',
                },
            ];
            const resultat = sorterTiltakEtterNyeste([...tiltakListe]);
            expect(resultat[0].tiltaknavn).to.equal(tiltakListe[tiltakListe.length - 1].tiltaknavn);
        });
    });

    describe('sorterKommentarerEtterOpprettet', () => {
        it('Skal sortere kommentarer etter nyligste opprettet, basert på Id', () => {
            const kommentarer = [
                {
                    tekst: 'Kommentar1',
                    id: 1,
                },
                {
                    tekst: 'Kommentar2',
                    id: 2,
                },
                {
                    tekst: 'Kommentar3',
                    id: 3,
                },
            ];
            const resultat = sorterKommentarerEtterOpprettet([...kommentarer]);
            expect(resultat[0].tekst).to.equal(kommentarer[kommentarer.length - 1].tekst);
        });
    });
});
