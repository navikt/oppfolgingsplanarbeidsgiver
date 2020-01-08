import chai from 'chai';
import React from 'react';
import { shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import Alertstripe from 'nav-frontend-alertstriper';
import IkkeUtfyltPlanFeilmelding from '../../../../js/components/oppfolgingsdialog/godkjennplan/IkkeUtfyltPlanFeilmelding';
import getOppfolgingsplan from '../../../mock/mockOppfolgingsdialog';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe('IkkeUtfyltPlanFeilmelding', () => {
    const oppfolgingsplan = getOppfolgingsplan({
        arbeidsgiver: {
            navn: 'Test Testesen',
        },
        arbeidstaker: {
            navn: 'Test Testesen',
        },
        tiltakListe: [],
        arbeidsoppgaveListe: [],
    });

    const komponent = shallow(<IkkeUtfyltPlanFeilmelding oppfolgingsplan={oppfolgingsplan} />);

    it('Skal vise en Alertstripe', () => {
        expect(komponent.find(Alertstripe)).to.have.length(1);
    });

    it('Skal vise en div', () => {
        expect(komponent.find('div.ikkeUtfyltPlanFeilmelding__lenker')).to.have.length(1);
    });

    it('Skal vise en knapp', () => {
        expect(komponent.find('button.lenke')).to.have.length(2);
    });
});
