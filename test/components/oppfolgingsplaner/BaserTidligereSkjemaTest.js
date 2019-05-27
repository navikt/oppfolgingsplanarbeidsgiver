import React from 'react';
import chai from 'chai';
import { shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import sinon from 'sinon';
import { Field } from 'redux-form';
import { Hovedknapp } from 'nav-frontend-knapper';
import { BaserTidligereSkjemaKomponent } from '../../../js/components/oppfolgingsplaner/opprett/BaserTidligereSkjema';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe('BaserTidligereSkjema', () => {
    let komponent;
    let handleSubmit;

    beforeEach(() => {
        handleSubmit = sinon.spy();
        komponent = shallow(<BaserTidligereSkjemaKomponent
            onSubmit={handleSubmit}
        />);
    });

    it('Skal vise BaserTidligereSkjema', () => {
        expect(komponent.find('form.baserTidligereSkjema')).to.have.length(1);
    });

    it('Skal vise redux Field for radioknapper', () => {
        expect(komponent.find(Field)).to.have.length(1);
    });

    it('Skal vise 2 radioknapper', () => {
        expect(komponent.find('input')).to.have.length(2);
    });

    it('Skal vise radioknapp med verdi true', () => {
        expect(komponent.find('input').at(0).prop('value')).to.equal(true);
    });

    it('Skal vise radioknapp med verdi true', () => {
        expect(komponent.find('input').at(1).prop('value')).to.equal(false);
    });

    it('Skal vise submit knapp', () => {
        expect(komponent.find(Hovedknapp)).to.have.length(1);
    });
});
