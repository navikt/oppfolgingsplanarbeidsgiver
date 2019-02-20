import chai from 'chai';
import React from 'react';
import { shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import sinon from 'sinon';
import {
    OppfolgingsdialogInfoboks,
} from 'oppfolgingsdialog-npm';
import {
    hentSykmeldingGyldigForOppfoelging,
    hentSykmeldingIkkeGyldigForOppfoelging,
} from '../mock/mockSykmeldinger';
import {
    OppfolgingsplanSide as Container,
    mapStateToProps,
} from '../../js/sider/OppfolgingsplanSide';
import AppSpinner from '../../js/components/AppSpinner';
import Feilmelding from '../../js/components/Feilmelding';
import Oppfolgingsdialog from '../../js/components/oppfolgingsdialog/Oppfolgingsdialog';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe('OppfolgingsplanSide', () => {
    describe('mapStateToProps', () => {
        let clock;
        const dagensDato = new Date('2017-01-01');
        beforeEach(() => {
            clock = sinon.useFakeTimers(dagensDato.getTime());
        });

        afterEach(() => {
            clock.restore();
        });
        const sykmeldt1 = {
            fnr: '81549300',
            navn: 'test testersen',
            orgnummer: '81549300',
            koblingId: '123',
        };
        const sykmeldt2 = {
            fnr: '12304829',
            navn: 'Tore Tang',
            orgnummer: '12304829',
            koblingId: '456',
        };

        const ownProps = {
            params: {
                koblingId: sykmeldt1.koblingId,
                oppfolgingsplanId: '1',
            },
        };
        const state = {
            ledetekster: {
                data: {
                    'min.tekst': 'Dette er en test',
                },
            },
            sykmeldte: {
                data: [sykmeldt1, sykmeldt2],
            },
            sykmeldinger: {
                [sykmeldt1.koblingId]: {
                    data: [],
                },
            },
            oppfolgingsdialoger: {
                [sykmeldt1.fnr]: {
                    data: [{
                        id: ownProps.params.oppfolgingsplanId,
                        virksomhet: {
                            virksomhetsnummer: '12345678',
                        },
                        arbeidstaker: {
                            fnr: sykmeldt1.fnr,
                        },
                        arbeidsgiver: {
                            naermesteLeder: {},
                            forrigeNaermesteLeder: {},
                        },
                        sistEndretAv: {},
                        arbeidsoppgaveListe: [],
                        tiltakListe: [],
                        godkjenninger: [],
                    }],
                },
            },
            arbeidsforhold: {
                data: [],
            },
            forrigenaermesteleder: null,
            kontaktinfo: {
                data: [],
            },
            naermesteleder: {
                data: [],
            },
            person: {
                data: [],
            },
            virksomhet: {
                data: [],
            },
            tilgang: {
                [sykmeldt1.fnr]: {
                    data: {
                        harTilgang: true,
                        ikkeTilgangGrunn: null,
                    },
                },
            },
            avbrytdialogReducer: {

            },
            nullstill: {

            },
            samtykke: {

            },
            sykeforlopsPerioder: {
                data: [],
            },
        };

        it('Skal returnere props', () => {
            const res = mapStateToProps(state, ownProps);
            expect(res.koblingId).to.deep.equal('123');
            expect(res.tilgang).to.deep.equal(
                {
                    data: {
                        harTilgang: true,
                        ikkeTilgangGrunn: null,
                    },
                },
            );
            expect(res.harSykmeldtGyldigSykmelding).to.deep.equal(false);
        });

        it('Skal returnere harSykmeldtGyldigSykmelding lik false, om det ikke er sykmeldinger gyldig for oppfoelging', () => {
            const res = mapStateToProps(Object.assign({}, state, {
                sykmeldinger: {
                    [sykmeldt1.koblingId]: {
                        data: [hentSykmeldingIkkeGyldigForOppfoelging(dagensDato)],
                    },
                },
            }), ownProps);
            expect(res.harSykmeldtGyldigSykmelding).to.deep.equal(false);
        });

        it('Skal returnere harSykmeldtGyldigSykmelding lik true, om det er sykmeldinger gyldig for oppfoelging', () => {
            const res = mapStateToProps(Object.assign({}, state, {
                sykmeldinger: {
                    [sykmeldt1.koblingId]: {
                        data: [hentSykmeldingGyldigForOppfoelging(dagensDato)],
                    },
                },
            }), ownProps);
            expect(res.harSykmeldtGyldigSykmelding).to.deep.equal(true);
        });
    });

    describe('OppfolgingsdialogSideComponent', () => {
        let sjekkTilgang;
        let hentOppfolgingsplaner;
        let hentSykmeldinger;
        let settDialog;
        let hentArbeidsforhold;
        let hentToggles;
        let alleOppfolgingsdialogerReducer;
        let oppfolgingsdialogerReducer;
        let sykmeldinger;
        let tilgang;
        const sykmeldt = {
            fnr: '1000000000000',
            navn: 'fornavn etternavn',
            orgnummer: '81549300',
            koblingId: '123',
        };
        const harTilgang = {
            harTilgang: true,
        };
        const ikkeTilgang = {
            harTilgang: false,
        };
        const toggles = {
            henter: false,
            hentet: false,
        };
        const navigasjontoggles = {
            steg: 1,
        };

        beforeEach(() => {
            alleOppfolgingsdialogerReducer = {};
            oppfolgingsdialogerReducer = {};
            sykmeldinger = {};
            tilgang = { data: {} };
            sjekkTilgang = sinon.spy();
            hentOppfolgingsplaner = sinon.spy();
            hentSykmeldinger = sinon.spy();
            settDialog = sinon.spy();
            hentArbeidsforhold = sinon.spy();
            hentToggles = sinon.spy();
        });

        it('Skal vise spinner dersom data hentes', () => {
            const component = shallow(<Container
                alleOppfolgingsdialogerReducer={alleOppfolgingsdialogerReducer}
                oppfolgingsdialogerReducer={oppfolgingsdialogerReducer}
                sykmeldinger={sykmeldinger}
                tilgang={tilgang}
                oppfolgingsdialoger={[]}
                henter
                hentet={false}
                toggles={toggles}
                hentOppfolgingsplaner={hentOppfolgingsplaner}
                hentSykmeldinger={hentSykmeldinger}
                sjekkTilgang={sjekkTilgang}
                settDialog={settDialog}
                hentArbeidsforhold={hentArbeidsforhold}
                hentToggles={hentToggles}
            />);
            expect(component.contains(<AppSpinner />)).to.equal(true);
        });

        it('Skal vise spinner dersom sender', () => {
            const component = shallow(<Container
                alleOppfolgingsdialogerReducer={alleOppfolgingsdialogerReducer}
                oppfolgingsdialogerReducer={oppfolgingsdialogerReducer}
                sykmeldinger={sykmeldinger}
                tilgang={tilgang}
                oppfolgingsdialoger={[]}
                sender
                hentet={false}
                toggles={toggles}
                hentOppfolgingsplaner={hentOppfolgingsplaner}
                hentSykmeldinger={hentSykmeldinger}
                sjekkTilgang={sjekkTilgang}
                settDialog={settDialog}
                hentArbeidsforhold={hentArbeidsforhold}
                hentToggles={hentToggles}
            />);
            expect(component.contains(<AppSpinner />)).to.equal(true);
        });

        it('Skal vise feilmelding dersom hentingFeilet', () => {
            const component = shallow(<Container
                alleOppfolgingsdialogerReducer={alleOppfolgingsdialogerReducer}
                oppfolgingsdialogerReducer={oppfolgingsdialogerReducer}
                sykmeldinger={sykmeldinger}
                tilgang={tilgang}
                oppfolgingsdialoger={[]}
                hentet={false}
                hentingFeilet
                toggles={toggles}
                hentOppfolgingsplaner={hentOppfolgingsplaner}
                hentSykmeldinger={hentSykmeldinger}
                sjekkTilgang={sjekkTilgang}
                settDialog={settDialog}
                hentArbeidsforhold={hentArbeidsforhold}
                hentToggles={hentToggles}
            />);
            expect(component.contains(<Feilmelding />)).to.equal(true);
        });

        it('Skal vise feilmelding dersom sendingFeilet', () => {
            const component = shallow(<Container
                alleOppfolgingsdialogerReducer={alleOppfolgingsdialogerReducer}
                oppfolgingsdialogerReducer={oppfolgingsdialogerReducer}
                sykmeldinger={sykmeldinger}
                tilgang={tilgang}
                oppfolgingsdialoger={[]}
                hentet={false}
                sendingFeilet
                toggles={toggles}
                hentOppfolgingsplaner={hentOppfolgingsplaner}
                hentSykmeldinger={hentSykmeldinger}
                sjekkTilgang={sjekkTilgang}
                settDialog={settDialog}
                hentArbeidsforhold={hentArbeidsforhold}
                hentToggles={hentToggles}
            />);
            expect(component.contains(<Feilmelding />)).to.equal(true);
        });

        it('Skal vise OppfolgingsdialogInfoboks dersom leder ikke har tilgang', () => {
            const component = shallow(<Container
                alleOppfolgingsdialogerReducer={alleOppfolgingsdialogerReducer}
                oppfolgingsdialogerReducer={oppfolgingsdialogerReducer}
                sykmeldinger={sykmeldinger}
                oppfolgingsdialoger={[]}
                tilgang={{ data: ikkeTilgang }}
                toggles={toggles}
                hentOppfolgingsplaner={hentOppfolgingsplaner}
                hentSykmeldinger={hentSykmeldinger}
                sjekkTilgang={sjekkTilgang}
                settDialog={settDialog}
                hentArbeidsforhold={hentArbeidsforhold}
                hentToggles={hentToggles}
                sykmeldt={sykmeldt}
            />);
            expect(component.find(OppfolgingsdialogInfoboks)).to.have.length(1);
        });

        it('Skal vise OppfolgingsdialogInfoboks, om oppfolgingsdialog er knyttet til gyldig sykmelding', () => {
            const component = shallow(<Container
                alleOppfolgingsdialogerReducer={alleOppfolgingsdialogerReducer}
                oppfolgingsdialogerReducer={oppfolgingsdialogerReducer}
                sykmeldinger={sykmeldinger}
                oppfolgingsdialoger={[]}
                tilgang={{ data: ikkeTilgang }}
                toggles={toggles}
                hentOppfolgingsplaner={hentOppfolgingsplaner}
                hentSykmeldinger={hentSykmeldinger}
                sjekkTilgang={sjekkTilgang}
                settDialog={settDialog}
                hentArbeidsforhold={hentArbeidsforhold}
                hentToggles={hentToggles}
                sykmeldt={null}
                harSykmeldtGyldigSykmelding={false}
            />);
            expect(component.find(OppfolgingsdialogInfoboks)).to.have.length(1);
        });

        it('Skal vise Oppfolgingsdialoger dersom henting er OK, og oppfolgingsdialog er knyttet til gyldig sykmelding', () => {
            const component = shallow(<Container
                alleOppfolgingsdialogerReducer={alleOppfolgingsdialogerReducer}
                oppfolgingsdialogerReducer={oppfolgingsdialogerReducer}
                sykmeldinger={sykmeldinger}
                oppfolgingsdialoger={[]}
                tilgang={{ data: harTilgang }}
                toggles={toggles}
                hentOppfolgingsplaner={hentOppfolgingsplaner}
                hentSykmeldinger={hentSykmeldinger}
                sjekkTilgang={sjekkTilgang}
                settDialog={settDialog}
                hentArbeidsforhold={hentArbeidsforhold}
                hentToggles={hentToggles}
                navigasjontoggles={navigasjontoggles}
                sykmeldt={sykmeldt}
                harSykmeldtGyldigSykmelding
            />);
            expect(component.find(Oppfolgingsdialog)).to.have.length(1);
        });
    });
});
