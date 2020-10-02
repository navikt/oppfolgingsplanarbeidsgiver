import React from 'react';
import chai from 'chai';
import { mount, shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import { Hovedknapp } from 'nav-frontend-knapper';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import OppfolgingsplanInnholdboks from '../../../../../js/components/app/OppfolgingsplanInnholdboks';
import GodkjennPlanMottatt, {
    GodkjennPlanMottattEkspanderbar,
    GodkjennPlanMottattKnapper,
} from '../../../../../js/components/oppfolgingsdialog/godkjennplan/godkjenninger/GodkjennPlanMottatt';
import GodkjennPlanOversiktInformasjon from '../../../../../js/components/oppfolgingsdialog/godkjennplan/GodkjennPlanOversiktInformasjon';
import GodkjennPlanTilAltinnTekst from '../../../../../js/components/oppfolgingsdialog/godkjennplan/godkjenninger/GodkjennPlanTilAltinnTekst';
import getOppfolgingsplan from '../../../../mock/mockOppfolgingsdialog';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe('GodkjennPlanMottatt', () => {
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
    const komponentDefault = shallow(<GodkjennPlanMottatt oppfolgingsplan={oppfolgingsplan} />);

    it('Skal vise en GodkjennPlanMottatt', () => {
        expect(komponentDefault.find(OppfolgingsplanInnholdboks)).to.have.length(1);
    });

    it('Skal vise en innholdstekst', () => {
        expect(komponentDefault.find('p')).to.have.length(1);
    });

    it('Skal vise en GodkjennPlanMottattUtvidbar', () => {
        expect(komponentDefault.find(GodkjennPlanMottattEkspanderbar)).to.have.length(1);
    });

    it('Skal vise GodkjennPlanTilAltinnTekst', () => {
        expect(komponentDefault.find(GodkjennPlanTilAltinnTekst)).to.have.length(1);
    });

    it('Skal vise et GodkjennPlanMottattKnapper', () => {
        expect(komponentDefault.find(GodkjennPlanMottattKnapper)).to.have.length(1);
    });

    describe('GodkjennPlanMottattEskpanderbar', () => {
        const komponent = shallow(<GodkjennPlanMottattEkspanderbar />);

        it('Skal vise et Ekspanderbartpanel med en GodkjennPlanOversiktInformasjon', () => {
            expect(komponent.find(Ekspanderbartpanel)).to.have.length(1);
            expect(komponent.find(GodkjennPlanOversiktInformasjon)).to.have.length(1);
        });
    });

    describe('GodkjennPlanMottattKnapper', () => {
        const komponent = mount(<GodkjennPlanMottattKnapper oppfolgingsplan={oppfolgingsplan} />);

        it('Skal vise en submit knapp', () => {
            expect(komponent.find(Hovedknapp)).to.have.length(1);
        });
    });
});
