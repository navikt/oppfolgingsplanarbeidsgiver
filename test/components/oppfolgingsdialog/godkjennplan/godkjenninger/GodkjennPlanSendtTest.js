import React from 'react';
import chai from 'chai';
import { shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import GodkjennPlanSendt, {
    CancelButton,
} from '../../../../../js/components/oppfolgingsdialog/godkjennplan/godkjenninger/GodkjennPlanSendt';
import GodkjennPlanVenterInfo from '../../../../../js/components/oppfolgingsdialog/godkjennplan/GodkjennPlanVenterInfo';
import OppfolgingsplanInnholdboks from '../../../../../js/components/app/OppfolgingsplanInnholdboks';
import getOppfolgingsplan from '../../../../mock/mockOppfolgingsdialog';
import PlanEkspanderbar from '../../../../../js/components/oppfolgingsdialog/godkjennplan/PlanEkspanderbar';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe('GodkjennPlanSendt', () => {
    const oppfolgingsplan = getOppfolgingsplan({
        godkjenninger: [{
            godkjent: false,
            beskrivelse: 'Ikke godkjent fordi...',
            godkjentAv: {
                fnr: '1000000000000',
            },
        }],
        arbeidsgiver: {
            navn: 'Test Testesen',
        },
        arbeidstaker: {
            navn: 'Test Testesen',
        },
    });
    const komponentDefault = shallow(<GodkjennPlanSendt oppfolgingsplan={oppfolgingsplan} />);

    it('Skal vise en GodkjentPlan', () => {
        expect(komponentDefault.find(OppfolgingsplanInnholdboks)).to.have.length(1);
    });

    it('Skal vise en innholdstekst', () => {
        expect(komponentDefault.find('p')).to.have.length(1);
    });

    it('Skal vise en PlanEkspanderbar ', () => {
        expect(komponentDefault.find(PlanEkspanderbar)).to.have.length(1);
    });

    it('Skal vise CancelButton', () => {
        expect(komponentDefault.find(CancelButton)).to.have.length(1);
    });

    it('Skal vise GodkjennPlanVenterInfo', () => {
        expect(komponentDefault.find(GodkjennPlanVenterInfo)).to.have.length(1);
    });
});
