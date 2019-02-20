import chai from 'chai';
import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import { OppfolgingsdialogInfoboks } from 'oppfolgingsdialog-npm';
import { hentSykmeldingGyldigForOppfoelging, hentSykmeldingIkkeGyldigForOppfoelging } from '../mock/mockSykmeldinger';
import { OppfolgingsdialogerSide, mapStateToProps } from '../../js/sider/OppfolgingsdialogerSide';
import Oppfolgingsdialoger from '../../js/components/oppfolgingsdialog/Oppfolgingsdialoger';
import AppSpinner from '../../js/components/AppSpinner';
import Feilmelding from '../../js/components/Feilmelding';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe('OppfolgingsdialogerSideTest', () => {
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
                oppfolgingsdialogId: '1',
            },
        };
        const state = {
            ledetekster: {
                data: {
                    'min.tekst': 'Dette er en test',
                },
            },
            sykmeldte: {
                hentet: true,
                data: [sykmeldt1, sykmeldt2],
                henterBerikelser: [],
            },
            sykmeldinger: {
                [sykmeldt1.koblingId]: {
                    hentet: true,
                    data: [],
                },
            },
            oppfolgingsdialoger: {
                henter: false,
                hentet: true,
                hentingFeilet: false,
                hentingForsokt: true,
                [sykmeldt1.fnr]: {
                    data: [{
                        opprettetDato: '05-05-2017',
                        arbeidstaker: {
                            fnr: '81549300',
                        },
                        virksomhet: {
                            virksomhetsnummer: '123456789',
                        },
                        arbeidsgiver: {
                            naermesteLeder: {},
                            forrigeNaermesteLeder: null,
                        },
                        sistEndretAv: {
                            fnr: '81549300',
                        },
                        arbeidsoppgaveListe: [],
                        tiltakListe: [],
                        godkjenninger: [],
                    }],
                },
            },
            tilgang: {
                [sykmeldt1.fnr]: {
                    henter: false,
                    hentet: true,
                    hentingFeilet: false,
                    hentingForsokt: true,
                    data: {
                        harTilgang: true,
                        ikkeTilgangGrunn: null,
                    },
                },
            },
            nyNaermesteLeder: {
                bekreftet: false,
            },
            kontaktinfo: {
                data: [{ fnr: sykmeldt1.fnr, kontaktinfo: { skalHaVarsel: true, epost: 'test@nav.no', tlf: '22229999' } }],
            },
            kopierDialogReducer: {

            },
            person: {
                data: [{ fnr: sykmeldt1.fnr, navn: 'Test Testesen' }],
            },
            naermesteleder: {
                data: [],
            },
            arbeidsforhold: {
                data: [],
            },
            virksomhet: {
                data: [{ virksomhetsnummer: '123456789', navn: 'DigiTech Consulting AS' }],
            },
            sykeforlopsPerioder: {
                data: [],
            },
        };

        it('Skal returnere props', () => {
            const res = mapStateToProps(state, ownProps);
            expect(res.oppfolgingsdialoger).to.deep.equal(
                [{
                    opprettetDato: '05-05-2017',
                    arbeidstaker: {
                        fnr: '81549300',
                        navn: 'Test Testesen',
                        stillinger: [],
                        epost: 'test@nav.no',
                        tlf: '22229999',
                        sykeforlopsPerioder: [],
                        skalHaVarsel: true,
                    },
                    virksomhet: {
                        virksomhetsnummer: '123456789',
                        navn: 'DigiTech Consulting AS',
                    },
                    arbeidsgiver: {
                        naermesteLeder: {
                            navn: null,
                            fnr: null,
                            epost: null,
                            tlf: null,
                            virksomhetsnummer: null,
                            erAktiv: null,
                            aktivFom: null,
                            aktivTom: null,
                        },
                        forrigeNaermesteLeder: null,
                    },
                    sistEndretAv: {
                        fnr: '81549300',
                        navn: 'Test Testesen',
                    },
                    arbeidsoppgaveListe: [],
                    tiltakListe: [],
                    godkjenninger: [],
                }]);

            expect(res.koblingId).to.deep.equal(sykmeldt1.koblingId);
            expect(res.hentingFeilet).to.deep.not.equal(true);
            expect(res.oppfolgingIkkeFunnet).to.deep.not.equal(true);
            expect(res.henter).to.deep.not.equal(true);
            expect(res.tilgang).to.deep.equal(
                {
                    henter: false,
                    hentet: true,
                    hentingFeilet: false,
                    hentingForsokt: true,
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

    describe('OppfolgingsdialogerSide', () => {
        let clock;
        const dagensDato = new Date('2017-01-01');
        let ledetekster;
        let sjekkTilgang;
        let hentOppfolgingsdialoger;
        let hentSykmeldinger;
        let hentSykmeldte;
        let hentToggles;
        let alleOppfolgingsdialogerReducer;
        let oppfolgingsdialogerReducer;
        let sykmeldinger;
        let tilgang;
        let toggles;
        let loggError;
        let hentingFeiletMap;
        const sykmeldt = {
            fnr: '1000000000000',
            navn: 'fornavn etternavn',
            orgnummer: '81549300',
            koblingId: '123',
        };
        const params = {
            koblingId: '123',
        };
        const harTilgang = {
            harTilgang: true,
        };
        const ikkeTilgang = {
            harTilgang: false,
        };

        beforeEach(() => {
            clock = sinon.useFakeTimers(dagensDato.getTime());
            ledetekster = {};
            sykmeldinger = {};
            oppfolgingsdialogerReducer = {};
            alleOppfolgingsdialogerReducer = {};
            tilgang = { data: {} };
            toggles = { data: {} };
            sjekkTilgang = sinon.spy();
            hentOppfolgingsdialoger = sinon.spy();
            hentSykmeldinger = sinon.spy();
            hentSykmeldte = sinon.spy();
            hentToggles = sinon.spy();
            loggError = sinon.spy();
            hentingFeiletMap = {};
        });

        afterEach(() => {
            clock.restore();
        });

        it('Skal vise spinner dersom data hentes', () => {
            const component = shallow(<OppfolgingsdialogerSide
                tilgang={tilgang}
                toggles={toggles}
                alleOppfolgingsdialogerReducer={alleOppfolgingsdialogerReducer}
                oppfolgingsdialogerReducer={oppfolgingsdialogerReducer}
                sykmeldinger={sykmeldinger}
                oppfolgingsdialoger={[]}
                henter
                hentOppfolgingsdialoger={hentOppfolgingsdialoger}
                hentSykmeldinger={hentSykmeldinger}
                hentToggles={hentToggles}
                sjekkTilgang={sjekkTilgang}
                params={params}
                hentSykmeldte={hentSykmeldte}
            />);
            expect(component.contains(<AppSpinner />)).to.equal(true);
        });

        it('Skal vise spinner dersom sender', () => {
            const component = shallow(<OppfolgingsdialogerSide
                tilgang={tilgang}
                toggles={toggles}
                alleOppfolgingsdialogerReducer={alleOppfolgingsdialogerReducer}
                oppfolgingsdialogerReducer={oppfolgingsdialogerReducer}
                sykmeldinger={sykmeldinger}
                oppfolgingsdialoger={[]}
                sender
                hentOppfolgingsdialoger={hentOppfolgingsdialoger}
                hentSykmeldinger={hentSykmeldinger}
                hentToggles={hentToggles}
                sjekkTilgang={sjekkTilgang}
                params={params}
                hentSykmeldte={hentSykmeldte}
            />);
            expect(component.contains(<AppSpinner />)).to.equal(true);
        });

        it('Skal vise feilmelding dersom hentingFeilet', () => {
            const component = shallow(<OppfolgingsdialogerSide
                ledetekster={ledetekster}
                tilgang={tilgang}
                toggles={toggles}
                alleOppfolgingsdialogerReducer={alleOppfolgingsdialogerReducer}
                oppfolgingsdialogerReducer={oppfolgingsdialogerReducer}
                sykmeldinger={sykmeldinger}
                oppfolgingsdialoger={[]}
                hentingFeilet
                hentOppfolgingsdialoger={hentOppfolgingsdialoger}
                hentSykmeldinger={hentSykmeldinger}
                hentToggles={hentToggles}
                sjekkTilgang={sjekkTilgang}
                params={params}
                hentSykmeldte={hentSykmeldte}
                loggError={loggError}
                hentingFeiletMap={hentingFeiletMap}
            />);
            expect(component.contains(<Feilmelding />)).to.equal(true);
        });

        it('Skal vise feilmelding dersom sendingFeilet', () => {
            const component = shallow(<OppfolgingsdialogerSide
                ledetekster={ledetekster}
                tilgang={tilgang}
                toggles={toggles}
                alleOppfolgingsdialogerReducer={alleOppfolgingsdialogerReducer}
                oppfolgingsdialogerReducer={oppfolgingsdialogerReducer}
                sykmeldinger={sykmeldinger}
                sendingFeilet
                oppfolgingsdialoger={[]}
                hentOppfolgingsdialoger={hentOppfolgingsdialoger}
                hentSykmeldinger={hentSykmeldinger}
                hentToggles={hentToggles}
                sjekkTilgang={sjekkTilgang}
                params={params}
                hentSykmeldte={hentSykmeldte}
                loggError={loggError}
                hentingFeiletMap={hentingFeiletMap}
            />);
            expect(component.contains(<Feilmelding />)).to.equal(true);
        });

        it('Skal vise OppfolgingsdialogInfoboks dersom leder ikke har tilgang', () => {
            const component = shallow(<OppfolgingsdialogerSide
                alleOppfolgingsdialogerReducer={alleOppfolgingsdialogerReducer}
                oppfolgingsdialogerReducer={oppfolgingsdialogerReducer}
                sykmeldinger={sykmeldinger}
                oppfolgingsdialoger={[]}
                tilgang={{ data: ikkeTilgang }}
                toggles={toggles}
                hentOppfolgingsdialoger={hentOppfolgingsdialoger}
                hentSykmeldinger={hentSykmeldinger}
                hentToggles={hentToggles}
                sjekkTilgang={sjekkTilgang}
                params={params}
                hentSykmeldte={hentSykmeldte}
                sykmeldt={sykmeldt}
            />);
            expect(component.find(OppfolgingsdialogInfoboks)).to.have.length(1);
        });

        it('Skal vise OppfolgingsdialogInfoboks dersom leder ikke har sykmeldt, ' +
            'og det ikke eksisterer en sykmelding gyldig for oppfoelging', () => {
            const component = shallow(<OppfolgingsdialogerSide
                alleOppfolgingsdialogerReducer={alleOppfolgingsdialogerReducer}
                oppfolgingsdialogerReducer={oppfolgingsdialogerReducer}
                sykmeldinger={sykmeldinger}
                oppfolgingsdialoger={[]}
                tilgang={{ data: harTilgang }}
                toggles={toggles}
                hentOppfolgingsdialoger={hentOppfolgingsdialoger}
                hentSykmeldinger={hentSykmeldinger}
                hentToggles={hentToggles}
                sjekkTilgang={sjekkTilgang}
                params={params}
                hentSykmeldte={hentSykmeldte}
                sykmeldt={null}
                harSykmeldtGyldigSykmelding={false}
            />);
            expect(component.find(OppfolgingsdialogInfoboks)).to.have.length(1);
        });

        it('Skal vise Oppfolgingsdialoger dersom henting er OK, ' +
            'og det eksisterer minst en sykmelding gyldig for oppfoelging', () => {
            const component = shallow(<OppfolgingsdialogerSide
                alleOppfolgingsdialogerReducer={alleOppfolgingsdialogerReducer}
                oppfolgingsdialogerReducer={oppfolgingsdialogerReducer}
                sykmeldinger={sykmeldinger}
                oppfolgingsdialoger={[]}
                tilgang={{ data: harTilgang }}
                toggles={toggles}
                hentOppfolgingsdialoger={hentOppfolgingsdialoger}
                hentSykmeldinger={hentSykmeldinger}
                hentToggles={hentToggles}
                sjekkTilgang={sjekkTilgang}
                params={params}
                hentSykmeldte={hentSykmeldte}
                sykmeldt={sykmeldt}
                harSykmeldtGyldigSykmelding
            />);
            expect(component.find(Oppfolgingsdialoger)).to.have.length(1);
        });
    });
});
