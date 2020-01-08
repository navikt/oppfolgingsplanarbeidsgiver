import React from 'react';
import chai from 'chai';
import { shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import { Utvidbar } from '@navikt/digisyfo-npm';
import GodkjennPlanSendt, {
    CancelButton,
    GodkjennPlanSendtInfoTekst,
    GodkjennPlanSendtUtvidbar,
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
        expect(komponentDefault.find(GodkjennPlanSendtUtvidbar)).to.have.length(1);
    });

    it('Skal vise CancelButton', () => {
        expect(komponentDefault.find(CancelButton)).to.have.length(1);
    });

    describe('GodkjennPlanSendtUtvidbar', () => {
        const komponent = shallow(<GodkjennPlanSendtUtvidbar />);

        it('Skal vise en Utvidbar med en GodkjennPlanOversiktInformasjon', () => {
            expect(komponent.find(Utvidbar)).to.have.length(1);
            expect(komponent.find(GodkjennPlanOversiktInformasjon)).to.have.length(1);
        });
    });

    describe('GodkjennPlanSendtInfoTekst', () => {
        const komponent = shallow(<GodkjennPlanSendtInfoTekst />);

        it('Skal vise en GodkjennPlanSendtInfoTekst med overskrift og tekst', () => {
            expect(komponent.find('div.godkjennPlanSendt_infoTekst')).to.have.length(1);
            expect(komponent.find('h3')).to.have.length(1);
        });

        it('Skal vise GodkjennPlanVenterInfo', () => {
            expect(komponent.find(GodkjennPlanVenterInfo)).to.have.length(1);
        });
    });
});
