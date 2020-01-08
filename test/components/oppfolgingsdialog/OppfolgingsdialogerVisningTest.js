import React from 'react';
import chai from 'chai';
import { shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import OppfolgingsdialogerVisning from '../../../js/components/oppfolgingsdialog/OppfolgingsdialogerVisning';
import OppfolgingsplanerIngenplan from '../../../js/components/oppfolgingsdialog/opprett/OppfolgingsplanerIngenplan';
import OppfolgingsplanFilm from '../../../js/components/oppfolgingsplaner/OppfolgingsplanFilm';
import OppfolgingsdialogTeasere from '../../../js/components/oppfolgingsplaner/OppfolgingsdialogTeasere';
import getOppfolgingsplan from '../../mock/mockOppfolgingsdialog';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe('OppfolgingsdialogerVisning', () => {
    let component;
    const oppfolgingsdialoger = [getOppfolgingsplan()];
    beforeEach(() => {
        component = shallow(<OppfolgingsdialogerVisning
            oppfolgingsdialoger={[]}
        />);
    });

    it('Skal vise OppfolgingsplanFilm', () => {
        expect(component.find(OppfolgingsplanFilm)).to.have.length(1);
    });

    describe('Uten Aktiv(e) Oppfolgingsdialog(er)', () => {
        it('Skal ikke vise OppfolgingsdialogerTeasere dersom man ikke har oppfolgingsdialoger', () => {
            component = shallow(<OppfolgingsdialogerVisning
                oppfolgingsdialoger={[]}
                bekreftetNyNaermesteLeder={false}
            />);
            expect(component.find(OppfolgingsdialogTeasere)).to.have.length(0);
        });

        it('Skal vise OppfolgingsplanerIngenplan, dersom det ikke er oppfolgingsdialoger', () => {
            component = shallow(<OppfolgingsdialogerVisning
                oppfolgingsdialoger={[]}
            />);
            expect(component.find(OppfolgingsplanerIngenplan)).to.have.length(1);
        });

        it('Skal vise OppfolgingsplanerIngenplan, dersom det ikke er aktive oppfolgingsdialoger', () => {
            const oppfolgingsdialogListe = [Object.assign({}, getOppfolgingsplan(), {
                godkjentPlan: {
                    gyldighetstidspunkt: {
                        tom: '2017-01-01T00:00:00.000',
                    },
                },
            })];
            component = shallow(<OppfolgingsdialogerVisning
                oppfolgingsdialoger={oppfolgingsdialogListe}
            />);
            expect(component.find(OppfolgingsplanerIngenplan)).to.have.length(1);
        });
    });

    describe('Med Oppfolgingsdialoger', () => {
        describe('Har Aktiv Oppfolgingsdialog', () => {
            it('Skal vise en OppfolgingsdialogerTeasere dersom man har oppfolgingsdialoger', () => {
                const oppfolgingsdialogListe = [Object.assign((oppfolgingsdialoger[0]), {
                    godkjentPlan: null,
                })];
                component = shallow(<OppfolgingsdialogerVisning oppfolgingsdialoger={oppfolgingsdialogListe}
                />);
                expect(component.find(OppfolgingsdialogTeasere)).to.have.length(1);
            });
        });

        describe('Har Tidligere Oppfolgingsdialoger', () => {
            it('Skal vise en OppfolgingsdialogerTeasere dersom man har oppfolgingsdialoger', () => {
                const oppfolgingsdialogListe = [Object.assign((oppfolgingsdialoger[0]), {
                    godkjentPlan: {
                        gyldighetstidspunkt: {
                            tom: '2017-01-01T00:00:00.000',
                        },
                    },
                })];
                component = shallow(<OppfolgingsdialogerVisning
                    oppfolgingsdialoger={oppfolgingsdialogListe}
                />);
                expect(component.find(OppfolgingsdialogTeasere)).to.have.length(1);
            });
        });
    });
});
