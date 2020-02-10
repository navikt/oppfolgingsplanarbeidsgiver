import React from 'react';
import chai from 'chai';
import { shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import { Hovedknapp } from 'nav-frontend-knapper';
import TiltakKnapper from '../../../../js/components/oppfolgingsdialog/utfylling/tiltak/TiltakKnapper';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe('TiltakKnapper', () => {
    let komponent;

    beforeEach(() => {
        komponent = shallow(<TiltakKnapper />);
    });

    it('Skal vise en div', () => {
        expect(komponent.find('div.knapperad')).to.have.length(1);
    });

    it('Skal vise en Knapp', () => {
        expect(komponent.find(Hovedknapp)).to.have.length(1);
        expect(komponent.find('button.lenke')).to.have.length(1);
    });
});
