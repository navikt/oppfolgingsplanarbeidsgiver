import React from 'react';
import chai from 'chai';
import { shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import sinon from 'sinon';
import Alertstripe from 'nav-frontend-alertstriper';
import { Knapp } from 'nav-frontend-knapper';
import GodkjentPlanDelKnapper, {
    delingFeiletNav, delingFeiletFastlege,
} from '../../../../../js/components/oppfolgingsdialog/godkjennplan/releasetplan/GodkjentPlanDelKnapper';
import getOppfolgingsdialog from '../../../../mock/mockOppfolgingsdialog';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe('GodkjentPlanDelKnapper', () => {
    let komponent;
    let oppfolgingsplan;
    let delmednav;
    let delMedNavFunc;
    let fastlegeDeling;
    let delMedFastlege;

    beforeEach(() => {
        oppfolgingsplan = getOppfolgingsdialog({});
        delmednav = {
            sender: false,
            sendingFeilet: false,
        };
        fastlegeDeling = {
            sender: false,
            sendt: false,
            sendingFeilet: false,
        };
        delMedNavFunc = sinon.spy();
        delMedFastlege = sinon.spy();

        komponent = shallow(<GodkjentPlanDelKnapper
            oppfolgingsplan={oppfolgingsplan}
            delmednav={delmednav}
            delMedNavFunc={delMedNavFunc}
            fastlegeDeling={fastlegeDeling}
            delMedFastlege={delMedFastlege}
        />);
    });

    it('Skal vise knapperad', () => {
        expect(komponent.find('div.knapperad')).to.have.length(1);
    });

    it('Skal vise Alertstripe dersom delmednav sendingFeilet er true', () => {
        const delmednavFeilet = Object.assign({}, delmednav, {
            sendingFeilet: true,
        });
        komponent = shallow(<GodkjentPlanDelKnapper
            oppfolgingsplan={oppfolgingsplan}
            delmednav={delmednavFeilet}
            delMedNavFunc={delMedNavFunc}
            fastlegeDeling={fastlegeDeling}
            delMedFastlege={delMedFastlege}
        />);
        expect(komponent.find(Alertstripe)).to.have.length(1);
    });

    it('Skal vise Alertstripe dersom fastlegeDeling sendingFeilet er true', () => {
        const fastlegeDelingFeilet = Object.assign({}, fastlegeDeling, {
            sendingFeilet: true,
        });
        komponent = shallow(<GodkjentPlanDelKnapper
            oppfolgingsplan={oppfolgingsplan}
            delmednav={delmednav}
            delMedNavFunc={delMedNavFunc}
            fastlegeDeling={fastlegeDelingFeilet}
            delMedFastlege={delMedFastlege}
        />);
        expect(komponent.find(Alertstripe)).to.have.length(1);
    });

    it('Skal vise 2 knapper dersom godkjent plan ikke er delt med NAV eller fastlege', () => {
        const oppfolgingsplanIkkeDeltMedNavEllerFastlege = Object.assign({}, oppfolgingsplan, {
            godkjentPlan: {
                deltMedNAV: false,
                deltMedNAVTidspunkt: null,
                deltMedFastlege: false,
                deltMedFastlegeTidspunkt: null,
            },
        });
        komponent = shallow(<GodkjentPlanDelKnapper
            oppfolgingsplan={oppfolgingsplanIkkeDeltMedNavEllerFastlege}
            delmednav={delmednav}
            delMedNavFunc={delMedNavFunc}
            fastlegeDeling={fastlegeDeling}
            delMedFastlege={delMedFastlege}
        />);
        expect(komponent.find(Knapp)).to.have.length(2);
    });

    it('Skal vise 1 knapp dersom godkjent plan er delt med NAV, men ikke fastlege', () => {
        const oppfolgingsplanIkkeDeltMedFastlege = Object.assign({}, oppfolgingsplan, {
            godkjentPlan: {
                deltMedNAV: true,
                deltMedNAVTidspunkt: null,
                deltMedFastlege: false,
                deltMedFastlegeTidspunkt: null,
            },
        });
        komponent = shallow(<GodkjentPlanDelKnapper
            oppfolgingsplan={oppfolgingsplanIkkeDeltMedFastlege}
            delmednav={delmednav}
            delMedNavFunc={delMedNavFunc}
            fastlegeDeling={fastlegeDeling}
            delMedFastlege={delMedFastlege}
        />);
        expect(komponent.find(Knapp)).to.have.length(1);
    });

    it('Skal vise 1 knapp dersom godkjent plan er delt med fastlege, men ikke NAV', () => {
        const oppfolgingsplanIkkeDeltMedFastlege = Object.assign({}, oppfolgingsplan, {
            godkjentPlan: {
                deltMedNAV: false,
                deltMedNAVTidspunkt: null,
                deltMedFastlege: true,
                deltMedFastlegeTidspunkt: null,
            },
        });
        komponent = shallow(<GodkjentPlanDelKnapper
            oppfolgingsplan={oppfolgingsplanIkkeDeltMedFastlege}
            delmednav={delmednav}
            delMedNavFunc={delMedNavFunc}
            fastlegeDeling={fastlegeDeling}
            delMedFastlege={delMedFastlege}
        />);
        expect(komponent.find(Knapp)).to.have.length(1);
    });

    describe('delingFeiletNav', () => {
        it('Skal returnere false, om sendingFeilet er false for delmednav', () => {
            const delmednavReducer = { sendingFeilet: false };
            expect(delingFeiletNav(delmednavReducer)).to.equal(false);
        });

        it('Skal returnere true, om sendingFeilet er true for delmednav', () => {
            const delmednavReducer = { sendingFeilet: true };
            expect(delingFeiletNav(delmednavReducer)).to.equal(true);
        });
    });

    describe('delingFeiletFastlege', () => {
        it('Skal returnere false, om sendingFeilet er false for fastlegeDeling', () => {
            const fastlegeDelingReducer = { sendingFeilet: false };
            expect(delingFeiletFastlege(fastlegeDelingReducer)).to.equal(false);
        });

        it('Skal returnere true, om sendingFeilet er true for delmednav', () => {
            const fastlegeDelingReducer = { sendingFeilet: true };
            expect(delingFeiletFastlege(fastlegeDelingReducer)).to.equal(true);
        });
    });
});
