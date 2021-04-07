import chai from 'chai';
import React from 'react';
import { shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import KommentarListe, {
  hentAktoerNavnInitialer,
  KommentarListeElement,
} from '../../../../../js/components/oppfolgingsdialog/utfylling/tiltak/kommentar/KommentarListe';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe('KommentarListe', () => {
  let kommentarer;
  let komponent;
  let kommentarReducer;

  beforeEach(() => {
    kommentarReducer = {};
    kommentarer = [{}, {}, {}];
    komponent = shallow(<KommentarListe kommentarer={kommentarer} kommentarReducer={kommentarReducer} />);
  });

  it('Skal vise antall KommentarListeElement likt antall elementer i KommentarListe', () => {
    expect(komponent.find(KommentarListeElement)).to.have.length(kommentarer.length);
  });

  describe('KommentarListeElement', () => {
    it('Skal vise slett-knapp om aktoer har opprettet kommentar', () => {
      const sykmeldt = {
        navn: 'Sigve Sykmeldt',
        fnr: '1000000000001',
        opprettetTidspunkt: '2017-01-01',
      };
      const kommentar = {
        opprettetAv: sykmeldt,
      };
      komponent = shallow(
        <KommentarListeElement fnr={sykmeldt.fnr} kommentar={kommentar} kommentarReducer={kommentarReducer} />
      );
      expect(komponent.find('button')).to.have.length(1);
    });
  });

  describe('hentAktoerNavnInitialer', () => {
    it('Skal vise riktig initialer for aktoer', () => {
      const aktoerNavn = 'Are Arbeidsgiver';
      expect(hentAktoerNavnInitialer(aktoerNavn)).to.equal('AA');
    });

    it('Skal vise inital til fornavn og etternavn, dersom aktoer har flere enn to navn', () => {
      const aktoerNavn = 'Are Mellomnavn Arbeidsgiver';
      expect(hentAktoerNavnInitialer(aktoerNavn)).to.equal('AA');
    });
  });
});
