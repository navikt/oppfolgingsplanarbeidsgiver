import React from 'react';
import chai from 'chai';
import { shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import {
    OppfolgingsdialogTeasere,
} from 'oppfolgingsdialog-npm';
import OppfolgingsdialogerVisning from '../../../js/components/oppfolgingsdialog/OppfolgingsdialogerVisning';
import OppfolgingsdialogerIngenplanAG from '../../../js/components/oppfolgingsdialog/opprett/OppfolgingsdialogerIngenplanAG';
import OppfolgingsdialogFilm from '../../../js/filmer/OppfolgingsdialogFilm';
import getOppfolgingsdialog, { getOppfolgingsdialoger } from '../../mock/mockOppfolgingsdialog';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe('OppfolgingsdialogerVisning', () => {
    let component;
    const oppfolgingsdialoger = getOppfolgingsdialoger;
    beforeEach(() => {
        component = shallow(<OppfolgingsdialogerVisning
            oppfolgingsdialoger={[]}
        />);
    });

    it('Skal vise OppfolgingsdialogFilm', () => {
        expect(component.find(OppfolgingsdialogFilm)).to.have.length(1);
    });

    describe('Uten Aktiv(e) Oppfolgingsdialog(er)', () => {
        it('Skal ikke vise OppfolgingsdialogerTeasere dersom man ikke har oppfolgingsdialoger', () => {
            component = shallow(<OppfolgingsdialogerVisning
                oppfolgingsdialoger={[]}
                bekreftetNyNaermesteLeder={false}
            />);
            expect(component.find(OppfolgingsdialogTeasere)).to.have.length(0);
        });

        it('Skal vise OppfolgingsdialogerIngenplanAG, dersom det ikke er oppfolgingsdialoger', () => {
            component = shallow(<OppfolgingsdialogerVisning
                oppfolgingsdialoger={[]}
            />);
            expect(component.find(OppfolgingsdialogerIngenplanAG)).to.have.length(1);
        });

        it('Skal vise OppfolgingsdialogerIngenplanAG, dersom det ikke er aktive oppfolgingsdialoger', () => {
            const oppfolgingsdialogListe = [Object.assign({}, getOppfolgingsdialog(), {
                godkjentPlan: {
                    gyldighetstidspunkt: {
                        tom: '2017-01-01T00:00:00.000',
                    },
                },
            })];
            component = shallow(<OppfolgingsdialogerVisning
                oppfolgingsdialoger={oppfolgingsdialogListe}
            />);
            expect(component.find(OppfolgingsdialogerIngenplanAG)).to.have.length(1);
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
