import React from 'react';
import chai from 'chai';
import { shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import GodkjennPlanSendt, {
    CancelButton,
    GodkjennPlanSendtEkspanderbar,
} from '../../../../../js/components/oppfolgingsdialog/godkjennplan/godkjenninger/GodkjennPlanSendt';
import GodkjennPlanOversiktInformasjon from '../../../../../js/components/oppfolgingsdialog/godkjennplan/GodkjennPlanOversiktInformasjon';
import GodkjennPlanVenterInfo from '../../../../../js/components/oppfolgingsdialog/godkjennplan/GodkjennPlanVenterInfo';
import OppfolgingsplanInnholdboks from '../../../../../js/components/app/OppfolgingsplanInnholdboks';
import getOppfolgingsplan from '../../../../mock/mockOppfolgingsdialog';

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

    it('Skal vise en GodkjentPlanUtvidbar', () => {
        expect(komponentDefault.find(GodkjennPlanSendtEkspanderbar)).to.have.length(1);
    });

    it('Skal vise CancelButton', () => {
        expect(komponentDefault.find(CancelButton)).to.have.length(1);
    });

    it('Skal vise GodkjennPlanVenterInfo', () => {
        expect(komponentDefault.find(GodkjennPlanVenterInfo)).to.have.length(1);
    });

    describe('GodkjennPlanSendtEkspanderbar', () => {
        const komponent = shallow(<GodkjennPlanSendtEkspanderbar />);

        it('Skal vise et Ekspanderbartpanel med en GodkjennPlanOversiktInformasjon', () => {
            expect(komponent.find(Ekspanderbartpanel)).to.have.length(1);
            expect(komponent.find(GodkjennPlanOversiktInformasjon)).to.have.length(1);
        });
    });
});
