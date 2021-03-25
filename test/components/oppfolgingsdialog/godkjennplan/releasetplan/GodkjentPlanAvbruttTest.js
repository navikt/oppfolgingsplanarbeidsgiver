import React from 'react';
import chai from 'chai';
import { shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import sinon from 'sinon';
import GodkjentPlanAvbrutt from '../../../../../js/components/oppfolgingsdialog/godkjennplan/releasetplan/GodkjentPlanAvbrutt';
import GodkjentPlanDelKnapper from '../../../../../js/components/oppfolgingsdialog/godkjennplan/releasetplan/GodkjentPlanDelKnapper';
import GodkjentPlanAvbruttTidspunkt from '../../../../../js/components/oppfolgingsdialog/godkjennplan/releasetplan/GodkjentPlanAvbruttTidspunkt';
import { ButtonDownload } from '../../../../../js/components/oppfolgingsdialog/godkjennplan/releasetplan/GodkjentPlanHandlingKnapper';
import PlanEkspanderbar from '../../../../../js/components/oppfolgingsdialog/godkjennplan/PlanEkspanderbar';
import getOppfolgingsplan from '../../../../mock/mockOppfolgingsdialog';
import OppfolgingsplanInnholdboks from '../../../../../js/components/app/OppfolgingsplanInnholdboks';


chai.use(chaiEnzyme());
const expect = chai.expect;

describe('GodkjentPlanAvbrutt', () => {
    let clock;
    let oppfolgingsdialog;
    let oppfolgingsdialoger;
    let delmednav;
    let fastlegeDeling;
    let komponent;

    beforeEach(() => {
        clock = sinon.useFakeTimers(new Date('2017-02-01'));
        oppfolgingsdialog = getOppfolgingsplan({
            id: 1,
            arbeidsgiver: {
                navn: 'Test Testesen',
            },
            arbeidstaker: {
                navn: 'Test Testesen',
            },
            godkjentPlan: {
                gyldighetstidspunkt: {
                    fom: '2017-01-03',
                    tom: '2017-02-03',
                    evalueres: '2018-01-03',
                },
                avbruttPlan: {
                    tidspunkt: '2017-01-05',
                },
            },
        });
        oppfolgingsdialoger = [oppfolgingsdialog];
        delmednav = {
            sendingFeilet: false,
        };
        fastlegeDeling = {
            sendingFeilet: false,
        };
        komponent = shallow(<GodkjentPlanAvbrutt
            delmednav={delmednav}
            fastlegeDeling={fastlegeDeling}
            oppfolgingsdialog={oppfolgingsdialog}
            oppfolgingsdialoger={oppfolgingsdialoger}
        />);
    });

    afterEach(() => {
        clock.restore();
    });

    it('Skal vise en lenke til aktiv plan', () => {
        const komponentAktiv = shallow(<GodkjentPlanAvbrutt
            delmednav={delmednav}
            fastlegeDeling={fastlegeDeling}
            oppfolgingsdialog={oppfolgingsdialog}
            oppfolgingsdialoger={oppfolgingsdialoger}
        />);
        expect(komponentAktiv.find('div.godkjentPlanAvbrutt_lenke')).to.have.length(1);
        expect(komponentAktiv.find('a')).to.have.length(1);
    });

    it('Skal vise ButtonDownload', () => {
        expect(komponent.find(ButtonDownload)).to.have.length(1);
    });

    it('Skal vise en OppfolgingsplanInnholdboks', () => {
        expect(komponent.find(OppfolgingsplanInnholdboks)).to.have.length(1);
    });

    it('Skal vise en GodkjentPlanAvbruttTidspunkt', () => {
        expect(komponent.find(GodkjentPlanAvbruttTidspunkt)).to.have.length(1);
    });

    it('Skal vise en PlanEkspanderbar', () => {
        expect(komponent.find(PlanEkspanderbar)).to.have.length(1);
    });

    it('Skal vise en GodkjentPlanDelKnapper', () => {
        expect(komponent.find(GodkjentPlanDelKnapper)).to.have.length(1);
    });
});
