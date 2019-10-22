import React from 'react';
import chai from 'chai';
import { shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import ReleasetPlan from '../../../../../js/components/oppfolgingsdialog/godkjennplan/releasetplan/ReleasetPlan';
import GodkjentPlanAvbrutt from '../../../../../js/components/oppfolgingsdialog/godkjennplan/releasetplan/GodkjentPlanAvbrutt';
import GodkjentPlan from '../../../../../js/components/oppfolgingsdialog/godkjennplan/releasetplan/GodkjentPlan';
import Samtykke from '../../../../../js/components/oppfolgingsdialog/godkjennplan/samtykke/Samtykke';
import getOppfolgingsdialog from '../../../../mock/mockOppfolgingsdialog';
import OppfolgingsdialogPlanInfoboks from '../../../../../js/components/oppfolgingsdialog/godkjennplan/releasetplan/OppfolgingsdialogPlanInfoboks';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe('ReleasetPlan', () => {
    let komponent;
    const oppfolgingsdialog = getOppfolgingsdialog({
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
    const oppfolgingsdialogMedSamtykke = Object.assign({}, oppfolgingsdialog, {
        arbeidsgiver: {
            samtykke: true,
        },
        arbeidstaker: {
            samtykke: true,
        },
    });
    const oppfolgingsdialogMedSamtykkeOgAvbruttplan = getOppfolgingsdialog({
        arbeidsgiver: {
            samtykke: true,
            naermesteLeder: {
                fnr: '1000042179824',
                navn: 'Arbeidsgiver navn',
            },
            forrigeNaermesteLeder: {
                fnr: '1000042179824',
                navn: 'Arbeidsgiver navn',
            },
        },
        arbeidstaker: {
            samtykke: true,
            naermesteLeder: {
                fnr: '1000042179824',
                navn: 'Arbeidsgiver navn',
            },
            forrigeNaermesteLeder: {
                fnr: '1000042179824',
                navn: 'Arbeidsgiver navn',
            },
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
    const oppfolgingsdialoger = [getOppfolgingsdialog()];

    it('Skal vise en Samtykke når det savnes', () => {
        komponent = shallow(<ReleasetPlan oppfolgingsdialog={getOppfolgingsdialog({
            arbeidsgiver: {
                samtykke: null,
            },
        })} />);
        expect(komponent.find(Samtykke)).to.have.length(1);
    });

    it('Skal vise en GodkjentPlan med samtykke', () => {
        komponent = shallow(<ReleasetPlan oppfolgingsdialog={oppfolgingsdialogMedSamtykke} />);
        expect(komponent.find(GodkjentPlan)).to.have.length(1);
    });

    it('Skal vise en OppfolgingsdialogPlanInfoboks med samtykke', () => {
        komponent = shallow(<ReleasetPlan oppfolgingsdialog={oppfolgingsdialogMedSamtykke} />);
        expect(komponent.find(OppfolgingsdialogPlanInfoboks)).to.have.length(1);
    });

    it('Skal vise en GodkjentPlanAvbrutt med samtykke og avbruttplan', () => {
        komponent = shallow(<ReleasetPlan oppfolgingsdialog={oppfolgingsdialogMedSamtykkeOgAvbruttplan} oppfolgingsdialoger={oppfolgingsdialoger} />);
        expect(komponent.find(GodkjentPlanAvbrutt)).to.have.length(1);
    });
});
