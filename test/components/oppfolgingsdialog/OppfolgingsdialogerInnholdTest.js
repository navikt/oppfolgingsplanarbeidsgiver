import chai from 'chai';
import React from 'react';
import { shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import Sidetopp from '../../../js/components/Sidetopp';
import OppfolgingsdialogerInnhold from '../../../js/components/oppfolgingsdialog/OppfolgingsdialogerInnhold';
import OppfolgingsdialogerVisning from '../../../js/components/oppfolgingsdialog/OppfolgingsdialogerVisning';
import OppfolgingsdialogerInfoPersonvern from '../../../js/components/oppfolgingsdialog/OppfolgingsdialogerInfoPersonvern';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe('OppfolgingsdialogerInnhold', () => {
  let component;
  beforeEach(() => {
    component = shallow(<OppfolgingsdialogerInnhold oppfolgingsdialoger={[]} />);
  });

  it('Skal vise overskrift for Oppfolgingsdialoger', () => {
    expect(component.find(Sidetopp)).to.have.length(1);
  });

  it('Skal vise OppfolgingsdialogerInfoPersonvern', () => {
    expect(component.find(OppfolgingsdialogerInfoPersonvern)).to.have.length(1);
  });

  it('Skal vise OppfolgingsdialogerInnhold', () => {
    expect(component.find(OppfolgingsdialogerVisning)).to.have.length(1);
  });
});
