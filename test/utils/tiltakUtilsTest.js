import chai from 'chai';
import sinon from 'sinon';
import rewire from 'rewire';
import getTiltak from '../mock/mockTiltak';
import {
  input2RSTiltak,
  sorterTiltakEtterNyeste,
  sorterKommentarerEtterOpprettet,
  getStartDateFromTiltakListe,
  getEndDateFromTiltakListe,
} from '../../js/utils/tiltakUtils';
import { leggTilDagerPaaDato } from '../mock/testUtils';
import { restdatoTildato } from '../../js/utils/datoUtils';

const expect = chai.expect;

describe('tiltakUtils', () => {
  const tiltak = getTiltak();

  const file = rewire('../../js/utils/tiltakUtils');
  const isDefined = file.__get__('isDefined');

  let clock;

  beforeEach(() => {
    const today = new Date('2000-01-15');
    today.setHours(0);
    clock = sinon.useFakeTimers(today.getTime());
  });

  afterEach(() => {
    clock.restore();
  });

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

  describe('getStartDateFromTiltakListe', () => {
    it('Skal hente tidligste fom fra liste over tiltak', () => {
      const tiltakList = [
        {
          fom: leggTilDagerPaaDato(new Date(), 5).toISOString(),
        },
        {
          fom: leggTilDagerPaaDato(new Date(), 1).toISOString(),
        },
        {
          fom: leggTilDagerPaaDato(new Date(), 10).toISOString(),
        },
      ];
      const result = getStartDateFromTiltakListe([...tiltakList]);
      const expected = restdatoTildato(tiltakList[1].fom);
      expect(result).to.equal(expected);
    });

    it('Skal hente tidligste fom fra liste over tiltak, om det er tiltak med og uten fom dato', () => {
      const tiltakList = [
        {
          fom: null,
        },
        {
          fom: leggTilDagerPaaDato(new Date(), 1).toISOString(),
        },
        {
          fom: leggTilDagerPaaDato(new Date(), 10).toISOString(),
        },
      ];
      const result = getStartDateFromTiltakListe([...tiltakList]);
      const expected = restdatoTildato(tiltakList[1].fom);
      expect(result).to.equal(expected);
    });

    it('Skal ikke returnere en dato om det ikke er noen tiltak med fom', () => {
      const tiltakList = [
        {
          fom: null,
        },
      ];
      const result = getStartDateFromTiltakListe([...tiltakList]);
      const expected = undefined;
      expect(result).to.equal(expected);
    });
  });

  describe('getEndDateFromTiltakListe', () => {
    it('Skal hente siste tom fra liste over tiltak', () => {
      const tiltakList = [
        {
          tom: leggTilDagerPaaDato(new Date(), 5).toISOString(),
        },
        {
          tom: leggTilDagerPaaDato(new Date(), 10).toISOString(),
        },
        {
          tom: leggTilDagerPaaDato(new Date(), 1).toISOString(),
        },
      ];
      const result = getEndDateFromTiltakListe([...tiltakList]);
      const expected = restdatoTildato(tiltakList[1].tom);
      expect(result).to.equal(expected);
    });

    it('Skal hente siste tom fra liste over tiltak, om det er tiltak med og uten tom dato', () => {
      const tiltakList = [
        {
          tom: null,
        },
        {
          tom: leggTilDagerPaaDato(new Date(), 10).toISOString(),
        },
        {
          tom: leggTilDagerPaaDato(new Date(), 1).toISOString(),
        },
      ];
      const result = getEndDateFromTiltakListe([...tiltakList]);
      const expected = restdatoTildato(tiltakList[1].tom);
      expect(result).to.equal(expected);
    });

    it('Skal ikke returnere en dato om det ikke er noen tiltak med tom', () => {
      const tiltakList = [
        {
          tom: null,
        },
      ];
      const result = getEndDateFromTiltakListe([...tiltakList]);
      const expected = undefined;
      expect(result).to.equal(expected);
    });
  });
});
