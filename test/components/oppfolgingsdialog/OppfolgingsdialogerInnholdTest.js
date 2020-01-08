import chai from 'chai';
import React from 'react';
import { shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import Sidetopp from '../../../js/components/Sidetopp';
import OppfolgingsdialogerInnhold from '../../../js/components/oppfolgingsdialog/OppfolgingsdialogerInnhold';
import OppfolgingsdialogerVisning from '../../../js/components/oppfolgingsdialog/OppfolgingsdialogerVisning';
import OppfolgingsdialogerInfoPersonvern from '../../../js/components/oppfolgingsdialog/OppfolgingsdialogerInfoPersonvern';
import NyNaermestelederInfoboks from '../../../js/components/oppfolgingsplaner/NyNaermestelederInfoboks';
import getOppfolgingsplan from '../../mock/mockOppfolgingsdialog';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe('OppfolgingsdialogerInnhold', () => {
    let component;
    beforeEach(() => {
        component = shallow(<OppfolgingsdialogerInnhold
            oppfolgingsdialoger={[]}
        />);
    });

    it('Skal vise overskrift for Oppfolgingsdialoger', () => {
        expect(component.find(Sidetopp)).to.have.length(1);
    });

    it('Skal vise OppfolgingsdialogerInfoPersonvern', () => {
        expect(component.find(OppfolgingsdialogerInfoPersonvern)).to.have.length(1);
    });

    describe('Ny NaermesteLeder', () => {
        it('Skal vise NyNaermestelederInfoboks, dersom det er en oppfolgingsdialog med ny naermeste leder siden sist ' +
            'innlogging av ny naermeste leder og bekreftetNyNaermesteLeder er false', () => {
            const oppfolgingsdialogListe = [Object.assign({}, getOppfolgingsplan(), {
                arbeidsgiver: {
                    naermesteLeder: {
                        aktivFom: '2017-01-01',
                        fnr: '123456789',
                        sistInnlogget: null,
                    },
                    forrigeNaermesteLeder: {},
                },
                arbeidstaker: {
                    sistInnlogget: '2017-01-01T12:12:12.000',
                },
            })];
            component = shallow(<OppfolgingsdialogerInnhold
                oppfolgingsdialoger={oppfolgingsdialogListe}
                bekreftetNyNaermesteLeder={false}
            />);
            expect(component.find(NyNaermestelederInfoboks)).to.have.length(1);
        });
    });

    describe('Standard visning', () => {
        it('Skal vise OppfolgingsdialogerVisning', () => {
            expect(component.find(OppfolgingsdialogerVisning)).to.have.length(1);
        });
    });
});
