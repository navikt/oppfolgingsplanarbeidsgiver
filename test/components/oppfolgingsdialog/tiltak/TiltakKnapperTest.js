import React from 'react';
import chai from 'chai';
import { shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import { Knapp } from 'nav-frontend-knapper';
import { setLedetekster } from '@navikt/digisyfo-npm';
import TiltakKnapper from '../../../../js/components/oppfolgingsdialog/utfylling/tiltak/TiltakKnapper';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe('TiltakKnapper', () => {
    let komponent;
    let ledetekster;

    beforeEach(() => {
        ledetekster = {
            'oppfolgingsdialog.knapp.lagre': 'lagre',
            'oppfolgingsdialog.knapp.endre': 'endre',
        };
        setLedetekster(ledetekster);
        komponent = shallow(<TiltakKnapper
            ledetekster={ledetekster}
        />);
    });

    it('Skal vise en div', () => {
        expect(komponent.find('div.knapperad')).to.have.length(1);
    });

    it('Skal vise en Knapp', () => {
        expect(komponent.find(Knapp)).to.have.length(2);
    });
});
