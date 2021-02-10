import chai from 'chai';
import React from 'react';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';
import chaiEnzyme from 'chai-enzyme';
import { Field } from 'redux-form';
import { Hovedknapp } from 'nav-frontend-knapper';
import getTiltak from '../../../mock/mockTiltak';
import TiltakKnapper from '../../../../js/components/oppfolgingsdialog/utfylling/tiltak/TiltakKnapper';
import TiltakDatovelger from '../../../../js/components/oppfolgingsdialog/utfylling/tiltak/TiltakDatovelger';
import {
    TiltakNavn,
    TiltakBeskrivelse,
    TiltakSkjemaKomponent,
    FELTER,
} from '../../../../js/components/oppfolgingsdialog/utfylling/tiltak/TiltakSkjema';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe('TiltakSkjema', () => {
    let komponent;
    let handleSubmit;
    const tiltak = getTiltak();
    const fnr = '1010101010101';

    beforeEach(() => {
        handleSubmit = sinon.spy();
        komponent = shallow(<TiltakSkjemaKomponent
            initialize={sinon.spy()}
            handleSubmit={handleSubmit}
            tiltakReducer={tiltak}
        />);
    });

    it('Skal vise TiltakNavn', () => {
        expect(komponent.find(TiltakNavn)).to.have.length(1);
    });

    it('Skal vise TiltakBeskrivelse', () => {
        expect(komponent.find(TiltakBeskrivelse)).to.have.length(1);
    });

    it('Skal vise TiltakDatovelger', () => {
        expect(komponent.find(TiltakDatovelger)).to.have.length(1);
    });

    it('Skal vise TiltakKnapper', () => {
        expect(komponent.find(TiltakKnapper)).to.have.length(1);
    });

    describe('TiltakNavn', () => {
        const felt = FELTER.tiltaknavn;
        const komponent1 = shallow(<TiltakNavn felt={felt} />);

        it('Skal vise en label', () => {
            expect(komponent1.find('label')).to.have.length(1);
        });

        it('Skal vise et Field med feltets navn', () => {
            expect(komponent1.find(Field).prop('name')).to.equal(felt.navn);
            expect(komponent1.find(Field)).to.have.length(1);
        });
    });

    describe('TiltakBeskrivelse', () => {
        const felt = FELTER.beskrivelse;
        const komponent1 = shallow(<TiltakBeskrivelse
            felt={felt}
            tiltak={tiltak}
            fnr={fnr}
        />);

        it('Skal vise en label', () => {
            expect(komponent1.find('label')).to.have.length(1);
        });

        it('Skal vise et Field med feltets navn', () => {
            expect(komponent1.find(Field).prop('name')).to.equal(felt.navn);
            expect(komponent1.find(Field)).to.have.length(1);
        });
    });

    describe('TiltakKnapper', () => {
        it('Skal vise rett submit knapp og avbryt lenke,', () => {
            komponent = mount(<TiltakKnapper tiltak={tiltak} />);
            expect(komponent.find(Hovedknapp)).to.have.length(1);
            expect(komponent.find('button.lenke')).to.have.length(1);
        });
    });
});
