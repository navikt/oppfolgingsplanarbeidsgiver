import React from 'react';
import chai from 'chai';
import { shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import sinon from 'sinon';
import { Hovedknapp } from 'nav-frontend-knapper';
import Samtykke from '../../../../../js/components/oppfolgingsdialog/godkjennplan/samtykke/Samtykke';

chai.use(chaiEnzyme());
const expect = chai.expect;
const assert = chai.assert;

describe('Samtykke', () => {
    let comp;

    beforeEach(() => {
        comp = shallow(<Samtykke />);
    });

    it('Knapp skal være disabled før et alternativ har blitt valgt', () => {
        expect(comp.find(Hovedknapp)).to.be.disabled();
    });

    it('Ingen av alternativene skal være pre-valgt', () => {
        expect(comp.find('input#ikkeGiSamtykke')).to.not.be.checked();
        expect(comp.find('input#giSamtykke')).to.not.be.checked();
    });

    it('Knapp skal være enabled etter at et alternativ har blitt valg', () => {
        const wrapper = comp.instance();
        const settSamtykke = sinon.spy(wrapper, 'settSamtykke');
        const event = { target: { value: 'true' } };
        comp.find('input#giSamtykke').simulate('change', event);

        assert(settSamtykke.calledOnce, true);
        expect(comp.find(Hovedknapp)).to.be.not.disabled();
    });
});
