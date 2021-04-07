import React from 'react';
import chai from 'chai';
import { shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import TiltakListeRad from '../../../../../js/components/oppfolgingsdialog/utfylling/tiltak/liste/TiltakListeRad';
import getOppfolgingsplan from '../../../../mock/mockOppfolgingsdialog';
import TiltakInformasjonKnapper from '../../../../../js/components/oppfolgingsdialog/utfylling/tiltak/liste/TiltakInformasjonKnapper';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe('TiltakListeRad', () => {
  let komponent;
  let oppfolgingsdialog;
  beforeEach(() => {
    oppfolgingsdialog = getOppfolgingsplan();
    komponent = shallow(<TiltakListeRad tiltak={oppfolgingsdialog.tiltakListe[0]} erApen fnr="1000000000000" />);
  });

  it('Skal vise TiltakInformasjonKnapper', () => {
    expect(komponent.find(TiltakInformasjonKnapper)).to.have.length(1);
  });

  it('Skal vise <p> med info om f.o.m og t.o.m', () => {
    const paragraf = komponent.find('p');
    expect(paragraf).to.have.length(1);
    expect(paragraf.text()).to.contains('7. mai 2017');
    expect(paragraf.text()).to.contains('9. mai 2017');
  });

  it('Skal vise korrekt div', () => {
    expect(komponent.find('div.tiltaktabell__rad__navn')).to.have.length(1);
  });

  it('Skal vise korrekt span med tiltak navn', () => {
    const navn = komponent.find('span.tiltak__rad__navn--tittel');
    expect(navn).to.have.length(1);
    expect(navn.text()).to.contain(oppfolgingsdialog.tiltakListe[0].tiltaknavn);
  });
});
