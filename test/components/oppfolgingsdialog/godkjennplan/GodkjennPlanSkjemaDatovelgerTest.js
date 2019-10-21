import React from 'react';
import chai from 'chai';
import { shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import GodkjennPlanSkjemaDatovelger, {
    FELTER,
    GodkjennPlanSkjemaDatovelgerFelt,
} from '../../../../js/components/oppfolgingsdialog/godkjennplan/GodkjennPlanSkjemaDatovelger';
import Datovelger from '../../../../js/skjema/Datovelger';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe('GodkjennPlanSkjemaDatovelger', () => {
    let komponentDefault;

    beforeEach(() => {
        komponentDefault = shallow(<GodkjennPlanSkjemaDatovelger />);
    });


    it('Skal vise en GodkjennPlanSkjemaDatovelger', () => {
        expect(komponentDefault.find('div.godkjennPlanSkjema__datovelger__rad')).to.have.length(1);
    });

    it('Skal vise 3 GodkjennPlanSkjemaDatovelgerFelt', () => {
        expect(komponentDefault.find(GodkjennPlanSkjemaDatovelgerFelt)).to.have.length(3);
    });

    it('Skal vise 1 GodkjennPlanSkjemaDatovelgerFelt for startdato', () => {
        expect(komponentDefault.find(GodkjennPlanSkjemaDatovelgerFelt).at(0).prop('felt').navn).to.equal(FELTER.fom.navn);
    });

    it('Skal vise 1 GodkjennPlanSkjemaDatovelgerFelt for sluttdato', () => {
        expect(komponentDefault.find(GodkjennPlanSkjemaDatovelgerFelt).at(1).prop('felt').navn).to.equal(FELTER.tom.navn);
    });

    it('Skal vise 1 GodkjennPlanSkjemaDatovelgerFelt for evalueringsdato', () => {
        expect(komponentDefault.find(GodkjennPlanSkjemaDatovelgerFelt).at(2).prop('felt').navn).to.equal(FELTER.evalueringinnen.navn);
    });


    describe('GodkjennPlanSkjemaDatovelgerFelt', () => {
        function storageMock() {
            const storage = {};

            return {
                setItem: (key, value) => {
                    storage[key] = value || '';
                },
                getItem: (key) => {
                    return key in storage ? storage[key] : null;
                },
                removeItem: (key) => {
                    delete storage[key];
                },
                get length() {
                    return Object.keys(storage).length;
                },
                key: (i) => {
                    const keys = Object.keys(storage);
                    return keys[i] || null;
                },
            };
        }

        window.sessionStorage = storageMock();
        const felt = FELTER.fom;
        const komponent = shallow(<GodkjennPlanSkjemaDatovelgerFelt
            felt={felt}
            dato="01.12.2017"
        />);

        it('Skal vise en GodkjennPlanSkjemaDatovelgerFelt', () => {
            expect(komponent.find('div.godkjennPlanSkjema__datovelger__felt')).to.have.length(1);
        });

        it('Skal vise en overskrift', () => {
            expect(komponent.find('label')).to.have.length(1);
        });

        it('Skal vise en Datovelger med feltets navn', () => {
            expect(komponent.find(Datovelger).prop('name')).to.equal(felt.navn);
            expect(komponent.find(Datovelger)).to.have.length(1);
        });
    });
});
