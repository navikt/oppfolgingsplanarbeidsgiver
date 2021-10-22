import React from 'react';
import chai from 'chai';
import { shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import Godkjenn from '../../../../js/components/oppfolgingsdialog/godkjennplan/Godkjenn';
import GodkjennPlanOversiktInformasjon from '../../../../js/components/oppfolgingsdialog/godkjennplan/GodkjennPlanOversiktInformasjon';
import GodkjennPlanLightboks from '../../../../js/components/oppfolgingsdialog/godkjennplan/GodkjennPlanLightboks';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe('Godkjenn', () => {
  const komponentDefault = shallow(<Godkjenn />, { disableLifecycleMethods: true });

  it('Skal vise en GodkjennPlanOversikt', () => {
    expect(komponentDefault.find('div.godkjennPlanOversikt')).to.have.length(1);
  });

  it('Skal vise en GodkjennPlanOversiktInformasjon', () => {
    expect(komponentDefault.find(GodkjennPlanOversiktInformasjon)).to.have.length(1);
  });

  it('Skal vise et GodkjennPlanLightboks, dersom visGodkjenPlanSkjema er true', () => {
    const komponent = shallow(<Godkjenn />, { disableLifecycleMethods: true });
    komponent.setState({
      visGodkjenPlanSkjema: true,
    });
    expect(komponent.find(GodkjennPlanLightboks)).to.have.length(1);
  });
});
