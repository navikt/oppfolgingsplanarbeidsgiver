import React from 'react';
import chai from 'chai';
import { shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import sinon from 'sinon';
import GodkjentPlanKnapper from '../../../../js/components/oppfolgingsdialog/godkjennplan/releasetPlan/GodkjentPlanKnapper';
import InnholdboksPilDelplan from '../../../../js/components/oppfolgingsdialog/godkjennplan/releasetPlan/InnholdboksPilDelplan';
import InnholdboksPilTidligerePlaner from '../../../../js/components/oppfolgingsdialog/godkjennplan/releasetPlan/InnholdboksPilTidligerePlaner';
import { STATUS } from '../../../../js/konstanter';
import getOppfolgingsdialog from '../../../mock/mockOppfolgingsdialog';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe('GodkjentPlanKnapper', () => {
    let clock;
    let oppfolgingsdialog;
    let apneBekreftelse;
    let delmednav;
    let delMedNavFunc;
    let komponentDefault;

    beforeEach(() => {
        oppfolgingsdialog = getOppfolgingsdialog({
            status: STATUS.AKTIV,
            avbruttPlanListe: [],
            godkjentPlan: {
                gyldighetstidspunkt: {
                    tom: '2017-01-01',
                },
            },
        });
        apneBekreftelse = sinon.spy();
        delmednav = {
            sendingFeilet: false,
        };
        delMedNavFunc = sinon.spy();
        komponentDefault = shallow(<GodkjentPlanKnapper
            oppfolgingsdialog={oppfolgingsdialog}
            apneBekreftelse={apneBekreftelse}
            delmednav={delmednav}
            delMedNavFunc={delMedNavFunc}
        />);
    });

    afterEach(() => {
        clock.restore();
    });

    it('Skal kun vise 1 knapp for deling, naar gyldighetstidspunkt er passert, det er ingen tidligere avbrutte planer, og ingen visning er valgt', () => {
        clock = sinon.useFakeTimers(1484524800000); // 16. januar 2017
        const oppfolgingsdialogPassert = getOppfolgingsdialog({
            godkjentPlan: {
                gyldighetstidspunkt: {
                    tom: '2017-01-15',
                },
            },
            avbruttPlanListe: [],
        });
        komponentDefault = shallow(<GodkjentPlanKnapper
            oppfolgingsdialog={oppfolgingsdialogPassert}
            apneBekreftelse={apneBekreftelse}
            delmednav={delmednav}
            delMedNavFunc={delMedNavFunc}
        />);
        expect(komponentDefault.find('div.godkjentPlanKnapper__knapp')).to.have.length(1);
    });

    it('Skal vise knapp for tidligere avbrutte planer, naar det eksisterer tidligere avbrutte planer', () => {
        const oppfolgingsdialogMedTidligere = getOppfolgingsdialog({
            avbruttPlanListe: [
                {}, {},
            ],
        });
        const komponent = shallow(<GodkjentPlanKnapper
            oppfolgingsdialog={oppfolgingsdialogMedTidligere}
            apneBekreftelse={apneBekreftelse}
            delmednav={delmednav}
            delMedNavFunc={delMedNavFunc}
        />);
        expect(komponent.find('div.godkjentPlanKnapper__knapp--tidligere')).to.have.length(1);
    });

    it('Skal vise knapp for endre plan, naar gyldighetstidspunkt er passert og plan ikke plan er avbrutt', () => {
        clock = sinon.useFakeTimers(1484524800000); // 16. januar 2017
        const oppfolgingsdialogMedTidligere = getOppfolgingsdialog({
            godkjentPlan: {
                gyldighetstidspunkt: {
                    tom: '2018-01-01',
                },
            },
            status: STATUS.AKTIV,
        });
        const komponent = shallow(<GodkjentPlanKnapper
            oppfolgingsdialog={oppfolgingsdialogMedTidligere}
            apneBekreftelse={apneBekreftelse}
            delmednav={delmednav}
            delMedNavFunc={delMedNavFunc}
        />);
        expect(komponent.find('div.godkjentPlanKnapper__knapp--endre')).to.have.length(1);
    });

    it('Skal ikke vise knapp for endre plan, naar gyldighetstidspunkt er passert og plan er avbrutt', () => {
        clock = sinon.useFakeTimers(1484524800000); // 16. januar 2017
        const oppfolgingsdialogMedTidligere = getOppfolgingsdialog({
            godkjentPlan: {
                gyldighetstidspunkt: {
                    tom: '2018-01-01',
                },
            },
            status: STATUS.AVBRUTT,
        });
        const komponent = shallow(<GodkjentPlanKnapper
            oppfolgingsdialog={oppfolgingsdialogMedTidligere}
            apneBekreftelse={apneBekreftelse}
            delmednav={delmednav}
            delMedNavFunc={delMedNavFunc}
        />);
        expect(komponent.find('div.godkjentPlanKnapper__knapp--endre')).to.have.length(0);
    });


    it('Skal vise InnholdboksPilTidligerePlaner, dersom visning er tidligereUtgaver', () => {
        const oppfolgingsdialogMedTidligere = getOppfolgingsdialog({
            avbruttPlanListe: [
                {}, {},
            ],
        });
        const komponent = shallow(<GodkjentPlanKnapper
            oppfolgingsdialog={oppfolgingsdialogMedTidligere}
            apneBekreftelse={apneBekreftelse}
            delmednav={delmednav}
            delMedNavFunc={delMedNavFunc}
        />);
        komponent.setState({ visning: 'tidligereUtgaver' });
        expect(komponent.find(InnholdboksPilTidligerePlaner)).to.have.length(1);
    });

    it('Skal vise InnholdboksPilDelplan, dersom visning er deling', () => {
        const komponent = shallow(<GodkjentPlanKnapper
            oppfolgingsdialog={oppfolgingsdialog}
            apneBekreftelse={apneBekreftelse}
            delmednav={delmednav}
            delMedNavFunc={delMedNavFunc}
        />);
        komponent.setState({ visning: 'deling' });
        expect(komponent.find(InnholdboksPilDelplan)).to.have.length(1);
    });
});
