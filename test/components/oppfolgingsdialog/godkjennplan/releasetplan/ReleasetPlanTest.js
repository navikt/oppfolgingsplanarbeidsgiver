import React from 'react';
import chai from 'chai';
import { shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import ReleasetPlan from '../../../../../js/components/oppfolgingsdialog/godkjennplan/releasetplan/ReleasetPlan';
import GodkjentPlanAvbrutt from '../../../../../js/components/oppfolgingsdialog/godkjennplan/releasetplan/GodkjentPlanAvbrutt';
import GodkjentPlan from '../../../../../js/components/oppfolgingsdialog/godkjennplan/releasetplan/GodkjentPlan';
import Samtykke from '../../../../../js/components/oppfolgingsdialog/godkjennplan/samtykke/Samtykke';
import getOppfolgingsplan from '../../../../mock/mockOppfolgingsdialog';
import OppfolgingsdialogPlanInfoboks from '../../../../../js/components/oppfolgingsdialog/godkjennplan/releasetplan/OppfolgingsdialogPlanInfoboks';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe('ReleasetPlan', () => {
  let komponent;
  const oppfolgingsplan = getOppfolgingsplan({
    godkjentPlan: {
      opprettetTidspunkt: '2017-09-26T09:20:10.72',
      gyldighetstidspunkt: {
        fom: '2017-09-29',
        tom: '2017-10-29',
        evalueres: '2017-11-05',
      },
      tvungenGodkjenning: false,
      deltMedNAVTidspunkt: null,
      deltMedNAV: false,
      dokumentUuid: null,
    },
  });
  const oppfolgingsplanMedSamtykke = Object.assign({}, oppfolgingsplan, {
    arbeidsgiver: {
      naermesteLeder: {
        fnr: '102',
        samtykke: true,
      },
    },
    arbeidstaker: {
      fnr: '101',
      samtykke: true,
    },
  });
  const oppfolgingsplanMedSamtykkeOgAvbruttplan = getOppfolgingsplan({
    arbeidsgiver: {
      samtykke: true,
      naermesteLeder: {
        fnr: '102',
        navn: 'Arbeidsgiver navn',
      },
      forrigeNaermesteLeder: null,
    },
    arbeidstaker: {
      samtykke: true,
      fnr: '101',
      forrigeNaermesteLeder: null,
    },
    godkjentPlan: {
      avbruttPlan: {
        av: {
          navn: 'Sygve Sykmeldt',
          fnr: '1000028073889',
        },
        tidspunkt: new Date(),
      },
    },
  });
  const oppfolgingsplaner = [getOppfolgingsplan()];

  it('Skal vise en Samtykke når det savnes', () => {
    komponent = shallow(
      <ReleasetPlan
        oppfolgingsplan={getOppfolgingsplan({
          arbeidstaker: {
            fnr: '101',
            samtykke: null,
          },
          arbeidsgiver: {
            naermesteLeder: {
              fnr: '102',
              samtykke: null,
            },
          },
        })}
      />
    );
    expect(komponent.find(Samtykke)).to.have.length(1);
  });

  it('Skal vise en GodkjentPlan med samtykke', () => {
    komponent = shallow(<ReleasetPlan oppfolgingsplan={oppfolgingsplanMedSamtykke} />);
    expect(komponent.find(GodkjentPlan)).to.have.length(1);
  });

  it('Skal vise en OppfolgingsdialogPlanInfoboks med samtykke', () => {
    komponent = shallow(<ReleasetPlan oppfolgingsplan={oppfolgingsplanMedSamtykke} />);
    expect(komponent.find(OppfolgingsdialogPlanInfoboks)).to.have.length(1);
  });

  it('Skal vise en GodkjentPlanAvbrutt med samtykke og avbruttplan', () => {
    komponent = shallow(
      <ReleasetPlan oppfolgingsplan={oppfolgingsplanMedSamtykkeOgAvbruttplan} oppfolgingsplaner={oppfolgingsplaner} />
    );
    expect(komponent.find(GodkjentPlanAvbrutt)).to.have.length(1);
  });
});
