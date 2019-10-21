import chai from 'chai';
import React from 'react';
import { shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import { Knapp, Hovedknapp } from 'nav-frontend-knapper';
import { Utvidbar } from 'digisyfo-npm';
import OppfolgingsplanInnholdboks from '../../../../../js/components/app/OppfolgingsplanInnholdboks';
import GodkjennPlanMottatt, {
    GodkjennPlanMottattUtvidbar,
    GodkjennPlanMottattKnapper,
} from '../../../../../js/components/oppfolgingsdialog/godkjennplan/godkjenninger/GodkjennPlanMottatt';
import GodkjennPlanOversiktInformasjon from '../../../../../js/components/oppfolgingsdialog/godkjennplan/GodkjennPlanOversiktInformasjon';
import GodkjennPlanTilAltinnTekst from '../../../../../js/components/oppfolgingsdialog/godkjennplan/godkjenninger/GodkjennPlanTilAltinnTekst';
import getOppfolgingsdialog from '../../../../mock/mockOppfolgingsdialog';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe('GodkjennPlanMottatt', () => {
    const oppfolgingsdialog = getOppfolgingsdialog({
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
    const komponentDefault = shallow(<GodkjennPlanMottatt oppfolgingsdialog={oppfolgingsdialog} />);

    it('Skal vise en GodkjennPlanMottatt', () => {
        expect(komponentDefault.find(OppfolgingsplanInnholdboks)).to.have.length(1);
    });

    it('Skal vise en innholdstekst', () => {
        expect(komponentDefault.find('p')).to.have.length(1);
    });

    it('Skal vise en GodkjennPlanMottattUtvidbar', () => {
        expect(komponentDefault.find(GodkjennPlanMottattUtvidbar)).to.have.length(1);
    });

    it('Skal vise GodkjennPlanTilAltinnTekst', () => {
        expect(komponentDefault.find(GodkjennPlanTilAltinnTekst)).to.have.length(1);
    });

    it('Skal vise et GodkjennPlanMottattKnapper', () => {
        expect(komponentDefault.find(GodkjennPlanMottattKnapper)).to.have.length(1);
    });

    describe('GodkjennPlanMottattUtvidbar', () => {
        const komponent = shallow(<GodkjennPlanMottattUtvidbar />);

        it('Skal vise en Utvidbar med en GodkjennPlanOversiktInformasjon', () => {
            expect(komponent.find(Utvidbar)).to.have.length(1);
            expect(komponent.find(GodkjennPlanOversiktInformasjon)).to.have.length(1);
        });
    });

    describe('GodkjennPlanMottattKnapper', () => {
        const komponent = shallow(<GodkjennPlanMottattKnapper />);

        it('Skal vise en submit knapp', () => {
            expect(komponent.find(Hovedknapp)).to.have.length(1);
        });

        it('Skal vise en avbryt lenke', () => {
            expect(komponent.find(Knapp)).to.have.length(1);
        });
    });
});