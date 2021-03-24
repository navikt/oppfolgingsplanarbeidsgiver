import React from 'react';
import chai from 'chai';
import { shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import sinon from 'sinon';
import GodkjentPlan from '../../../../../js/components/oppfolgingsdialog/godkjennplan/releasetplan/GodkjentPlan';
import TextForcedApprovedOppfolgingsplan from '../../../../../js/components/oppfolgingsdialog/godkjennplan/releasetplan/TextForcedApprovedOppfolgingsplan';
import GodkjentPlanDelKnapper from '../../../../../js/components/oppfolgingsdialog/godkjennplan/releasetplan/GodkjentPlanDelKnapper';
import OppfolgingsplanInnholdboks from '../../../../../js/components/app/OppfolgingsplanInnholdboks';
import getOppfolgingsplan from '../../../../mock/mockOppfolgingsdialog';
import GodkjentPlanDeltBekreftelse from '../../../../../js/components/oppfolgingsdialog/godkjennplan/releasetplan/GodkjentPlanDeltBekreftelse';
import GodkjentPlanHandlingKnapper from '../../../../../js/components/oppfolgingsdialog/godkjennplan/releasetplan/GodkjentPlanHandlingKnapper';
import PlanEkspanderbar from '../../../../../js/components/oppfolgingsdialog/godkjennplan/PlanEkspanderbar';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe('GodkjentPlan', () => {
  const oppfolgingsdialog = getOppfolgingsplan({
    arbeidsgiver: {
      navn: 'Test Testesen',
    },
    arbeidstaker: {
      navn: 'Test Testesen',
    },
  });
  const delmednav = {
    sendingFeilet: false,
  };

  const komponentDefault = shallow(<GodkjentPlan delmednav={delmednav} oppfolgingsplan={oppfolgingsdialog} />);

  it('Skal vise en GodkjentPlan', () => {
    expect(komponentDefault.find(OppfolgingsplanInnholdboks)).to.have.length(1);
  });

  it('Skal vise en innholdstekst', () => {
    expect(komponentDefault.find('p')).to.have.length(1);
  });

  it('Skal vise en GodkjentPlanDeltBekreftelse', () => {
    expect(komponentDefault.find(GodkjentPlanDeltBekreftelse)).to.have.length(1);
  });

  it('Skal vise en PlanEkspanderbar ', () => {
    expect(komponentDefault.find(PlanEkspanderbar)).to.have.length(1);
  });

  it('Skal vise en GodkjentPlanDelKnapper', () => {
    expect(komponentDefault.find(GodkjentPlanDelKnapper)).to.have.length(1);
  });

  it('Skal vise en GodkjentPlanHandlingKnapper', () => {
    expect(komponentDefault.find(GodkjentPlanHandlingKnapper)).to.have.length(1);
  });

  describe('Tvungen Godkjenning', () => {
    const tvungenGodkjentPlan = getOppfolgingsplan({
      arbeidsgiver: {
        naermesteLeder: {
          navn: 'Test Testesen',
        },
      },
      arbeidstaker: {
        navn: 'Test Testesen',
      },
      godkjentPlan: {
        tvungenGodkjenning: true,
        gyldighetstidspunkt: {
          fom: '',
          tom: '',
          evalueres: '',
        },
      },
    });

    const k2 = shallow(<GodkjentPlan delmednav={delmednav} oppfolgingsplan={tvungenGodkjentPlan} />);

    it('Skal ikke vise infotekst', () => {
      expect(k2.find('p')).to.have.length(0);
    });

    it('Skal vise infotekst om tvungen godkjenning', () => {
      expect(k2.find(TextForcedApprovedOppfolgingsplan)).to.have.length(1);
    });
  });
});
