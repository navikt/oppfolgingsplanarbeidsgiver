import React from 'react';
import chai from 'chai';
import { shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import getTiltak from '../../../mock/mockTiltak';
import TiltakDatovelger, {
  TiltakDatovelgerFelt,
} from '../../../../js/components/oppfolgingsdialog/utfylling/tiltak/TiltakDatovelger';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe('TiltakDatovelger', () => {
  let komponent;
  const felter = {
    startdato: {
      navn: 'tiltaknavn',
      tekst: 'startdato.tiltak.opprett.navn',
    },
    sluttdato: {
      navn: 'sluttdato',
      tekst: 'oppfolgingsdialog.tiltak.opprett.navn',
    },
  };
  const tiltak = getTiltak();

  beforeEach(() => {
    komponent = shallow(<TiltakDatovelger felter={felter} tiltak={tiltak} />);
  });

  it('Skal vise en div som inneholder datovelger ', () => {
    expect(komponent.find('div.tiltakSkjema__datovelger')).to.have.length(1);
    expect(komponent.find('div.tiltakSkjema__datovelger__rad')).to.have.length(1);
  });

  it('Skal vise TiltakDatovelgerFelt', () => {
    expect(komponent.find(TiltakDatovelgerFelt)).to.have.length(2);
  });
});
