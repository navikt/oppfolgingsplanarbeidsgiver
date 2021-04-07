import React from 'react';
import chai from 'chai';
import { shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import getOppfolgingsplan from '../../../../mock/mockOppfolgingsdialog';
import GodkjentPlanDeltBekreftelse from '../../../../../js/components/oppfolgingsdialog/godkjennplan/releasetplan/GodkjentPlanDeltBekreftelse';
import BildeTekstLinje from '../../../../../js/components/app/BildeTekstLinje';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe('GodkjentPlanDeltBekreftelse', () => {
  let component;
  let oppfolgingsplan;

  beforeEach(() => {
    oppfolgingsplan = getOppfolgingsplan({});
    component = shallow(<GodkjentPlanDeltBekreftelse oppfolgingsplan={oppfolgingsplan} />);
  });

  it('Skal vise tekst dersom godkjent plan er delt med NAV', () => {
    const oppfolgingsplanDeltMedNav = Object.assign({}, oppfolgingsplan, {
      godkjentPlan: {
        deltMedNAV: true,
        deltMedNAVTidspunkt: '2017-01-01',
      },
    });
    component = shallow(<GodkjentPlanDeltBekreftelse oppfolgingsplan={oppfolgingsplanDeltMedNav} />);
    expect(component.find(BildeTekstLinje)).to.have.length(1);
  });

  it('Skal vise tekst dersom godkjent plan er delt med fastlege', () => {
    const oppfolgingsplanDeltMedFastlege = Object.assign({}, oppfolgingsplan, {
      godkjentPlan: {
        deltMedFastlege: true,
        deltMedFastlegeTidspunkt: '2017-01-01',
      },
    });
    component = shallow(<GodkjentPlanDeltBekreftelse oppfolgingsplan={oppfolgingsplanDeltMedFastlege} />);
    expect(component.find(BildeTekstLinje)).to.have.length(1);
  });
});
