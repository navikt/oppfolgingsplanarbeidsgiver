import React from 'react';
import chai from 'chai';
import { shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import AlertStripe from 'nav-frontend-alertstriper';
import GodkjennPlanVenterInfo from '../../../../../js/components/oppfolgingsdialog/godkjennplan/GodkjennPlanVenterInfo';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe('GodkjennPlanVenterInfo', () => {
  const komponent = shallow(<GodkjennPlanVenterInfo />);

  it('Skal vise en GodkjennPlanVenterInfo med overskrift og tekst', () => {
    expect(komponent.find(AlertStripe)).to.have.length(1);
    expect(komponent.find('h3')).to.have.length(1);
  });
});
