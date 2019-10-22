import React from 'react';
import chai from 'chai';
import { shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import sinon from 'sinon';
import GodkjentPlanAvbrutt, {
    GodkjentPlanUtvidbar,
} from '../../../../../js/components/oppfolgingsdialog/godkjennplan/releasetPlan/GodkjentPlanAvbrutt';
import GodkjentPlanDelKnapper from '../../../../../js/components/oppfolgingsdialog/godkjennplan/releasetPlan/GodkjentPlanDelKnapper';
import GodkjentPlanAvbruttTidspunkt from '../../../../../js/components/oppfolgingsdialog/godkjennplan/releasetPlan/GodkjentPlanAvbruttTidspunkt';
import getOppfolgingsdialog from '../../../../mock/mockOppfolgingsdialog';
import OppfolgingsplanInnholdboks from '../../../../../js/components/app/OppfolgingsplanInnholdboks';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe('GodkjentPlanAvbrutt', () => {
    let clock;
    let oppfolgingsdialog;
    let oppfolgingsdialoger;
    let hentPdfurler = sinon.spy();
    let dokument;
    let delmednav;
    let fastlegeDeling;
    let komponent;

    beforeEach(() => {
        clock = sinon.useFakeTimers(new Date('2017-02-01'));
        oppfolgingsdialog = getOppfolgingsdialog({
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
        hentPdfurler = sinon.spy();
        dokument = {
            hentet: true,
            henter: false,
            hentingFeilet: false,
            data: ['enUrl', 'toUrl'],
        };
        delmednav = {
            sendingFeilet: false,
        };
        fastlegeDeling = {
            sendingFeilet: false,
        };
        komponent = shallow(<GodkjentPlanAvbrutt
            delmednav={delmednav}
            fastlegeDeling={fastlegeDeling}
            hentPdfurler={hentPdfurler}
            dokument={dokument}
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
            hentPdfurler={hentPdfurler}
            dokument={dokument}
            oppfolgingsdialog={oppfolgingsdialog}
            oppfolgingsdialoger={oppfolgingsdialoger}
        />);
        expect(komponentAktiv.find('div.godkjentPlanAvbrutt_lenke')).to.have.length(1);
        expect(komponentAktiv.find('a')).to.have.length(1);
    });

    it('Skal vise en OppfolgingsplanInnholdboks', () => {
        expect(komponent.find(OppfolgingsplanInnholdboks)).to.have.length(1);
    });

    it('Skal vise en GodkjentPlanAvbruttTidspunkt', () => {
        expect(komponent.find(GodkjentPlanAvbruttTidspunkt)).to.have.length(1);
    });

    it('Skal vise en GodkjentPlanUtvidbar', () => {
        expect(komponent.find(GodkjentPlanUtvidbar)).to.have.length(1);
    });

    it('Skal vise en GodkjentPlanDelKnapper', () => {
        expect(komponent.find(GodkjentPlanDelKnapper)).to.have.length(1);
    });
});
