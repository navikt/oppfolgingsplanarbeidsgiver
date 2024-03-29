import React from 'react';
import chai from 'chai';
import { shallow } from 'enzyme';
import AlertStripe from 'nav-frontend-alertstriper';
import chaiEnzyme from 'chai-enzyme';
import OppfolgingsdialogPlanInfoboks from '../../../../../js/components/oppfolgingsdialog/godkjennplan/releasetplan/OppfolgingsdialogPlanInfoboks';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe('OppfolgingsdialogInfoboks', () => {
  const komponent = shallow(<OppfolgingsdialogPlanInfoboks />);

  it('Viser en AlertStripe', () => {
    expect(komponent.find(AlertStripe)).to.have.length(1);
  });

  it('Viser en h3', () => {
    expect(komponent.find('h3.panel__tittel')).to.have.length(1);
  });

  it('Viser en p', () => {
    expect(komponent.find('p')).to.have.length(1);
  });
});
