import React from 'react';
import chai from 'chai';
import { shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import { Hovedknapp } from 'nav-frontend-knapper';
import GodkjennPlanAvslaatt from '../../../../../js/components/oppfolgingsdialog/godkjennplan/godkjenninger/GodkjennPlanAvslaatt';
import OppfolgingsplanInnholdboks from '../../../../../js/components/app/OppfolgingsplanInnholdboks';
import getOppfolgingsplan from '../../../../mock/mockOppfolgingsdialog';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe('GodkjennPlanAvslaatt', () => {
  const oppfolgingsplan = getOppfolgingsplan();
  const komponent = shallow(<GodkjennPlanAvslaatt oppfolgingsplan={oppfolgingsplan} />);

  it('Skal vise en GodkjennPlanMottatt', () => {
    expect(komponent.find(OppfolgingsplanInnholdboks)).to.have.length(1);
  });

  it('Skal vise en innholdstekst', () => {
    expect(komponent.find('p')).to.have.length(1);
  });

  it('Skal vise Hovedknapp', () => {
    expect(komponent.find(Hovedknapp)).to.have.length(1);
  });
});
