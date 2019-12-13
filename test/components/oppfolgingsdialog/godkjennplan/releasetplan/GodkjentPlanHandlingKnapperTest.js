import React from 'react';
import chai from 'chai';
import { shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import sinon from 'sinon';
import GodkjentPlanHandlingKnapper, { ButtonDownload } from '../../../../../js/components/oppfolgingsdialog/godkjennplan/releasetplan/GodkjentPlanHandlingKnapper';
import getOppfolgingsdialog from '../../../../mock/mockOppfolgingsdialog';
import { STATUS } from '../../../../../js/konstanter';
import InnholdboksPilTidligerePlaner from '../../../../../js/components/oppfolgingsdialog/godkjennplan/releasetplan/InnholdboksPilTidligerePlaner';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe('GodkjentPlanHandlingKnapper', () => {
    let clock;
    let oppfolgingsplan;
    let apneBekreftelse;
    let komponentDefault;
    const today = new Date('2017-02-02');

    beforeEach(() => {
        clock = sinon.useFakeTimers(today.getTime());
        oppfolgingsplan = getOppfolgingsdialog({
            status: STATUS.AKTIV,
            avbruttPlanListe: [],
            godkjentPlan: {
                gyldighetstidspunkt: {
                    tom: '2017-01-01',
                },
            },
        });
        apneBekreftelse = sinon.spy();
        komponentDefault = shallow(<GodkjentPlanHandlingKnapper
            oppfolgingsplan={oppfolgingsplan}
            apneBekreftelse={apneBekreftelse}
        />);
    });

    afterEach(() => {
        clock.restore();
    });

    it('Skal vise ButtonDownload', () => {
        expect(komponentDefault.find(ButtonDownload)).to.have.length(1);
    });

    it('Skal kun vise 1 knapp aa laste ned plan, naar gyldighetstidspunkt er passert, det er ingen tidligere avbrutte planer, og ingen visning er valgt', () => {
        const oppfolgingsplanPassert = getOppfolgingsdialog({
            godkjentPlan: {
                gyldighetstidspunkt: {
                    tom: '2017-01-01',
                },
            },
            avbruttPlanListe: [],
        });
        komponentDefault = shallow(<GodkjentPlanHandlingKnapper
            oppfolgingsplan={oppfolgingsplanPassert}
            apneBekreftelse={apneBekreftelse}
        />);
        expect(komponentDefault.find('div.godkjentPlanKnapper__knapp')).to.have.length(0);
    });

    it('Skal vise knapp for tidligere avbrutte planer, naar det eksisterer tidligere avbrutte planer', () => {
        const oppfolgingsplanMedTidligere = getOppfolgingsdialog({
            avbruttPlanListe: [
                {}, {},
            ],
        });
        const komponent = shallow(<GodkjentPlanHandlingKnapper
            oppfolgingsplan={oppfolgingsplanMedTidligere}
            apneBekreftelse={apneBekreftelse}
        />);
        expect(komponent.find('div.godkjentPlanKnapper__knapp--tidligere')).to.have.length(1);
    });

    it('Skal vise knapp for endre plan, naar gyldighetstidspunkt er passert og plan ikke plan er avbrutt', () => {
        const oppfolgingsplanMedTidligere = getOppfolgingsdialog({
            godkjentPlan: {
                gyldighetstidspunkt: {
                    tom: '2018-01-01',
                },
            },
            status: STATUS.AKTIV,
        });
        const komponent = shallow(<GodkjentPlanHandlingKnapper
            oppfolgingsplan={oppfolgingsplanMedTidligere}
            apneBekreftelse={apneBekreftelse}
        />);
        expect(komponent.find('div.godkjentPlanKnapper__knapp--endre')).to.have.length(1);
    });

    it('Skal ikke vise knapp for endre plan, naar gyldighetstidspunkt er passert og plan er avbrutt', () => {
        const oppfolgingsplanMedTidligere = getOppfolgingsdialog({
            godkjentPlan: {
                gyldighetstidspunkt: {
                    tom: '2018-01-01',
                },
            },
            status: STATUS.AVBRUTT,
        });
        const komponent = shallow(<GodkjentPlanHandlingKnapper
            oppfolgingsplan={oppfolgingsplanMedTidligere}
            apneBekreftelse={apneBekreftelse}
        />);
        expect(komponent.find('div.godkjentPlanKnapper__knapp--endre')).to.have.length(0);
    });


    it('Skal vise InnholdboksPilTidligerePlaner, dersom visning er tidligereUtgaver', () => {
        const oppfolgingsplanMedTidligere = getOppfolgingsdialog({
            avbruttPlanListe: [
                {}, {},
            ],
        });
        const komponent = shallow(<GodkjentPlanHandlingKnapper
            oppfolgingsplan={oppfolgingsplanMedTidligere}
            apneBekreftelse={apneBekreftelse}
        />);
        komponent.setState({ visning: 'tidligereUtgaver' });
        expect(komponent.find(InnholdboksPilTidligerePlaner)).to.have.length(1);
    });
});
