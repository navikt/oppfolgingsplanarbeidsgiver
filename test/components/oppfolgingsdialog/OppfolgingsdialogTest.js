import chai from 'chai';
import React from 'react';
import { shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import sinon from 'sinon';
import {
    Godkjenn,
    Godkjenninger,
    ReleasetPlan,
} from 'oppfolgingsdialog-npm';
import Oppfolgingsdialog, { erAvvistAvArbeidsgiver } from '../../../js/components/oppfolgingsdialog/Oppfolgingsdialog';
import SideOverskrift from '../../../js/components/oppfolgingsdialog/SideOverskrift';
import AvbruttGodkjentPlanVarsel from '../../../js/components/oppfolgingsdialog/AvbruttGodkjentPlanVarsel';
import NavigasjonsBunn from '../../../js/components/oppfolgingsdialog/NavigasjonsBunn';
import NavigasjonsTopp from '../../../js/components/oppfolgingsdialog/NavigasjonsTopp';
import Arbeidsoppgaver from '../../../js/components/oppfolgingsdialog/utfylling/Arbeidsoppgaver';
import Samtykke from '../../../js/components/oppfolgingsdialog/godkjennplan/samtykke/Samtykke';
import Tiltak from '../../../js/components/oppfolgingsdialog/utfylling/Tiltak';
import getOppfolgingsdialog from '../../mock/mockOppfolgingsdialog';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe('Oppfolgingsdialog', () => {
    let component;
    let settAktivtSteg;
    let navigasjontoggles;
    let oppfolgingsdialog;
    let hentVirksomhet;
    let hentPerson;
    let hentNaermesteLeder;
    let hentKontaktinfo;
    let hentArbeidsforhold;
    let hentSykeforlopsPerioder;
    let settDialog;
    const data = {
        henter: [],
        hentet: [],
        hentingFeilet: [],
        data: [],
    };
    const virksomhet = data;
    const person = data;
    const kontaktinfo = data;
    const arbeidsforhold = data;
    const naermesteleder = data;
    const sykeforlopsPerioderReducer = data;
    const avbrytdialogReducer = {};
    const sykmeldinger = [
        {
            identdato: new Date(2017, 12, 31),
            orgnummer: getOppfolgingsdialog().virksomhet.virksomhetsnummer,
            mulighetForArbeid: {
                perioder: [{
                    fom: new Date(2018, 1, 1),
                    tom: new Date(2018, 2, 1),
                    grad: 100,
                }],
            },
        },
    ];


    beforeEach(() => {
        settDialog = sinon.spy();
        settAktivtSteg = sinon.spy();
        hentPerson = sinon.spy();
        hentVirksomhet = sinon.spy();
        hentArbeidsforhold = sinon.spy();
        hentNaermesteLeder = sinon.spy();
        hentKontaktinfo = sinon.spy();
        hentSykeforlopsPerioder = sinon.spy();
        navigasjontoggles = { steg: 1 };
        oppfolgingsdialog = getOppfolgingsdialog();
        component = shallow(<Oppfolgingsdialog
            avbrytdialogReducer={avbrytdialogReducer}
            settAktivtSteg={settAktivtSteg}
            oppfolgingsdialog={oppfolgingsdialog}
            navigasjontoggles={navigasjontoggles}
            settDialog={settDialog}
            hentNaermesteLeder={hentNaermesteLeder}
            naermesteleder={naermesteleder}
            hentVirksomhet={hentVirksomhet}
            hentPerson={hentPerson}
            hentKontaktinfo={hentKontaktinfo}
            hentSykeforlopsPerioder={hentSykeforlopsPerioder}
            virksomhet={virksomhet}
            person={person}
            kontaktinfo={kontaktinfo}
            arbeidsforhold={arbeidsforhold}
            hentArbeidsforhold={hentArbeidsforhold}
            sykmeldinger={sykmeldinger}
            sykeforlopsPerioderReducer={sykeforlopsPerioderReducer}
        />);
    });

    it('Skal vise SideOverskrift', () => {
        expect(component.find(SideOverskrift)).to.have.length(1);
    });

    it('Skal ikke vise NavigasjonsTopp, dersom dialog ikke er under arbeid(disabledNavigation er true)', () => {
        expect(component.find(NavigasjonsTopp)).to.have.length(0);
    });

    it('Skal vise NavigasjonsTopp, dersom dialog er under arbeid(disabledNavigation er false)', () => {
        const oppfolgingsdialogUnderArbeid = Object.assign({}, getOppfolgingsdialog(), {
            godkjentPlan: null,
            godkjenninger: [],
        });
        const componentUnderArbeid = shallow(<Oppfolgingsdialog
            avbrytdialogReducer={avbrytdialogReducer}
            settAktivtSteg={settAktivtSteg}
            oppfolgingsdialog={oppfolgingsdialogUnderArbeid}
            navigasjontoggles={navigasjontoggles}
            settDialog={settDialog}
            hentNaermesteLeder={hentNaermesteLeder}
            naermesteleder={naermesteleder}
            hentVirksomhet={hentVirksomhet}
            hentPerson={hentPerson}
            hentKontaktinfo={hentKontaktinfo}
            hentSykeforlopsPerioder={hentSykeforlopsPerioder}
            virksomhet={virksomhet}
            person={person}
            kontaktinfo={kontaktinfo}
            arbeidsforhold={arbeidsforhold}
            hentArbeidsforhold={hentArbeidsforhold}
            sykmeldinger={sykmeldinger}
            sykeforlopsPerioderReducer={sykeforlopsPerioderReducer}
        />);
        expect(componentUnderArbeid.find(NavigasjonsTopp)).to.have.length(1);
    });

    it('Skal vise NavigasjonsBunn', () => {
        expect(component.find(NavigasjonsBunn)).to.have.length(1);
    });

    it('Skal ikke vise AvbruttGodkjentPlanVarsel, om oppfolgingsdialogAvbrutt er false', () => {
        expect(component.find(AvbruttGodkjentPlanVarsel)).to.have.length(0);
    });

    it('Skal vise AvbruttGodkjentPlanVarsel, om oppfolgingsdialogAvbrutt er true', () => {
        component = shallow(<Oppfolgingsdialog
            avbrytdialogReducer={{ sendt: true, nyPlanId: oppfolgingsdialog.id }}
            settAktivtSteg={settAktivtSteg}
            oppfolgingsdialog={oppfolgingsdialog}
            navigasjontoggles={navigasjontoggles}
            settDialog={settDialog}
            hentNaermesteLeder={hentNaermesteLeder}
            naermesteleder={naermesteleder}
            hentVirksomhet={hentVirksomhet}
            hentPerson={hentPerson}
            hentKontaktinfo={hentKontaktinfo}
            hentSykeforlopsPerioder={hentSykeforlopsPerioder}
            virksomhet={virksomhet}
            person={person}
            kontaktinfo={kontaktinfo}
            oppfolgingsdialogAvbrutt
            arbeidsforhold={arbeidsforhold}
            hentArbeidsforhold={hentArbeidsforhold}
            sykmeldinger={sykmeldinger}
            sykeforlopsPerioderReducer={sykeforlopsPerioderReducer}
        />);
        expect(component.find(AvbruttGodkjentPlanVarsel)).to.have.length(1);
    });

    it('Skal vise Samtykke, om arbeidstaker ikke har svart paa samtykke og visSamtykke er true', () => {
        oppfolgingsdialog = Object.assign({}, getOppfolgingsdialog(), {
            arbeidstaker: {
                samtykke: null,
            },
        });
        component = shallow(<Oppfolgingsdialog
            avbrytdialogReducer={avbrytdialogReducer}
            settAktivtSteg={settAktivtSteg}
            oppfolgingsdialog={oppfolgingsdialog}
            navigasjontoggles={navigasjontoggles}
            settDialog={settDialog}
            hentNaermesteLeder={hentNaermesteLeder}
            naermesteleder={naermesteleder}
            hentVirksomhet={hentVirksomhet}
            hentPerson={hentPerson}
            hentKontaktinfo={hentKontaktinfo}
            hentSykeforlopsPerioder={hentSykeforlopsPerioder}
            virksomhet={virksomhet}
            person={person}
            kontaktinfo={kontaktinfo}
            arbeidsforhold={arbeidsforhold}
            hentArbeidsforhold={hentArbeidsforhold}
            sykmeldinger={sykmeldinger}
            sykeforlopsPerioderReducer={sykeforlopsPerioderReducer}
        />);
        expect(component.find(Samtykke)).to.have.length(1);
    });

    it('Skal vise Godkjenninger, om oppfolgingsdialoger inneholder Godkjenninger og ikke er avvist av arbeidsgiver', () => {
        const fnr = '123456789';
        oppfolgingsdialog = Object.assign({}, getOppfolgingsdialog(), {
            godkjenninger: [{
                godkjent: true,
                godkjentAv: {
                    fnr,
                },
            }],
            arbeidsgiver: {
                naermesteLeder: {
                    fnr,
                },
                forrigeNaermesteLeder: {
                    fnr: '1000000000000',
                    navn: 'Arbeidsgiver navn',
                },
            },
        });
        component = shallow(<Oppfolgingsdialog
            avbrytdialogReducer={avbrytdialogReducer}
            settAktivtSteg={settAktivtSteg}
            oppfolgingsdialog={oppfolgingsdialog}
            navigasjontoggles={navigasjontoggles}
            settDialog={settDialog}
            hentNaermesteLeder={hentNaermesteLeder}
            naermesteleder={naermesteleder}
            hentVirksomhet={hentVirksomhet}
            hentPerson={hentPerson}
            hentKontaktinfo={hentKontaktinfo}
            hentSykeforlopsPerioder={hentSykeforlopsPerioder}
            virksomhet={virksomhet}
            person={person}
            kontaktinfo={kontaktinfo}
            arbeidsforhold={arbeidsforhold}
            hentArbeidsforhold={hentArbeidsforhold}
            sykmeldinger={sykmeldinger}
            sykeforlopsPerioderReducer={sykeforlopsPerioderReducer}
        />);
        expect(component.find(Godkjenninger)).to.have.length(1);
    });

    it('Skal vise ReleasetPlan, om oppfolgingsdialoger inneholder GodkjentPlan og ikke er avvist av arbeidsgiver', () => {
        oppfolgingsdialog = Object.assign({}, getOppfolgingsdialog(), {
            godkjentPlan: {},
            arbeidsgiver: {
                naermesteLeder: {
                    samtykke: true,
                },
                forrigeNaermesteLeder: {
                    fnr: '1000000000000',
                    navn: 'Arbeidsgiver navn',
                },
            },
        });
        component = shallow(<Oppfolgingsdialog
            avbrytdialogReducer={avbrytdialogReducer}
            settAktivtSteg={settAktivtSteg}
            oppfolgingsdialog={oppfolgingsdialog}
            navigasjontoggles={navigasjontoggles}
            settDialog={settDialog}
            hentNaermesteLeder={hentNaermesteLeder}
            naermesteleder={naermesteleder}
            hentVirksomhet={hentVirksomhet}
            hentPerson={hentPerson}
            hentKontaktinfo={hentKontaktinfo}
            hentSykeforlopsPerioder={hentSykeforlopsPerioder}
            virksomhet={virksomhet}
            person={person}
            kontaktinfo={kontaktinfo}
            arbeidsforhold={arbeidsforhold}
            hentArbeidsforhold={hentArbeidsforhold}
            sykmeldinger={sykmeldinger}
            sykeforlopsPerioderReducer={sykeforlopsPerioderReducer}
        />);
        expect(component.find(ReleasetPlan)).to.have.length(1);
    });

    it('Skal vise Arbeidsoppgaver, om steg er 1 ', () => {
        oppfolgingsdialog = Object.assign({}, getOppfolgingsdialog(), {
            godkjentPlan: null,
            godkjenninger: [],
            avbruttPlanListe: [],
        });
        navigasjontoggles = { steg: 1 };
        component = shallow(<Oppfolgingsdialog
            avbrytdialogReducer={avbrytdialogReducer}
            settAktivtSteg={settAktivtSteg}
            oppfolgingsdialog={oppfolgingsdialog}
            navigasjontoggles={navigasjontoggles}
            settDialog={settDialog}
            hentNaermesteLeder={hentNaermesteLeder}
            naermesteleder={naermesteleder}
            hentVirksomhet={hentVirksomhet}
            hentPerson={hentPerson}
            hentKontaktinfo={hentKontaktinfo}
            hentSykeforlopsPerioder={hentSykeforlopsPerioder}
            virksomhet={virksomhet}
            person={person}
            kontaktinfo={kontaktinfo}
            arbeidsforhold={arbeidsforhold}
            hentArbeidsforhold={hentArbeidsforhold}
            sykmeldinger={sykmeldinger}
            sykeforlopsPerioderReducer={sykeforlopsPerioderReducer}
        />);
        expect(component.find(Arbeidsoppgaver)).to.have.length(1);
    });

    it('Skal vise Tiltak, om steg er 3 ', () => {
        oppfolgingsdialog = Object.assign({}, getOppfolgingsdialog(), {
            godkjentPlan: null,
            godkjenninger: [],
            avbruttPlanListe: [],
        });
        navigasjontoggles = { steg: 2 };
        component = shallow(<Oppfolgingsdialog
            avbrytdialogReducer={avbrytdialogReducer}
            settAktivtSteg={settAktivtSteg}
            oppfolgingsdialog={oppfolgingsdialog}
            navigasjontoggles={navigasjontoggles}
            settDialog={settDialog}
            hentNaermesteLeder={hentNaermesteLeder}
            naermesteleder={naermesteleder}
            hentVirksomhet={hentVirksomhet}
            hentPerson={hentPerson}
            hentKontaktinfo={hentKontaktinfo}
            hentSykeforlopsPerioder={hentSykeforlopsPerioder}
            virksomhet={virksomhet}
            person={person}
            kontaktinfo={kontaktinfo}
            arbeidsforhold={arbeidsforhold}
            hentArbeidsforhold={hentArbeidsforhold}
            sykmeldinger={sykmeldinger}
            sykeforlopsPerioderReducer={sykeforlopsPerioderReducer}
        />);
        expect(component.find(Tiltak)).to.have.length(1);
    });

    it('Skal vise Godkjenn, om steg er 3 ', () => {
        oppfolgingsdialog = Object.assign({}, getOppfolgingsdialog(), {
            godkjentPlan: null,
            godkjenninger: [],
            avbruttPlanListe: [],
        });
        navigasjontoggles = { steg: 3 };
        component = shallow(<Oppfolgingsdialog
            avbrytdialogReducer={avbrytdialogReducer}
            settAktivtSteg={settAktivtSteg}
            oppfolgingsdialog={oppfolgingsdialog}
            navigasjontoggles={navigasjontoggles}
            settDialog={settDialog}
            hentNaermesteLeder={hentNaermesteLeder}
            naermesteleder={naermesteleder}
            hentVirksomhet={hentVirksomhet}
            hentPerson={hentPerson}
            hentKontaktinfo={hentKontaktinfo}
            hentSykeforlopsPerioder={hentSykeforlopsPerioder}
            virksomhet={virksomhet}
            person={person}
            kontaktinfo={kontaktinfo}
            arbeidsforhold={arbeidsforhold}
            hentArbeidsforhold={hentArbeidsforhold}
            sykmeldinger={sykmeldinger}
            sykeforlopsPerioderReducer={sykeforlopsPerioderReducer}
        />);
        expect(component.find(Godkjenn)).to.have.length(1);
    });

    describe('erAvvistAvArbeidsgiver', () => {
        const arbeidstaker = { fnr: '123456789' };
        const naermesteLeder = { fnr: '123456788' };
        it('Skal returnere false, om plan er avvist og saa godkjent', () => {
            oppfolgingsdialog = Object.assign({}, getOppfolgingsdialog(), {
                godkjenninger: [
                    {
                        godkjent: true,
                        godkjentAv: {
                            fnr: arbeidstaker.fnr,
                        },
                    },
                    {
                        godkjent: false,
                        godkjentAv: {
                            fnr: naermesteLeder.fnr,
                        },
                    },
                ],
                arbeidsgiver: {
                    naermesteLeder,
                    forrigeNaermesteLeder: {
                        fnr: '1000000000000',
                        navn: 'Arbeidsgiver navn',
                    },
                },
            });
            expect(erAvvistAvArbeidsgiver(oppfolgingsdialog)).to.equal(false);
        });
        it('Skal returnere false, om plan er godkjent', () => {
            oppfolgingsdialog = Object.assign({}, getOppfolgingsdialog(), {
                godkjenninger: [{
                    godkjent: true,
                    godkjentAv: {
                        fnr: naermesteLeder.fnr,
                    },
                }],
                arbeidsgiver: {
                    naermesteLeder,
                    forrigeNaermesteLeder: {
                        fnr: '1000000000000',
                        navn: 'Arbeidsgiver navn',
                    },
                },
            });
            expect(erAvvistAvArbeidsgiver(oppfolgingsdialog)).to.equal(false);
        });

        it('Skal returnere false, om plan er avvist av en annen enn Arbeidsgiver', () => {
            oppfolgingsdialog = Object.assign({}, getOppfolgingsdialog(), {
                godkjenninger: [{
                    godkjent: false,
                    godkjentAv: {
                        fnr: arbeidstaker.fnr,
                    },
                }],
                arbeidsgiver: {
                    naermesteLeder,
                    forrigeNaermesteLeder: {
                        fnr: '1000000000000',
                        navn: 'Arbeidsgiver navn',
                    },
                },
            });
            expect(erAvvistAvArbeidsgiver(oppfolgingsdialog)).to.equal(false);
        });

        it('Skal returnere true, om plan er avvist av Arbeidsgiver', () => {
            oppfolgingsdialog = Object.assign({}, getOppfolgingsdialog(), {
                godkjenninger: [{
                    godkjent: false,
                    godkjentAv: {
                        fnr: naermesteLeder.fnr,
                    },
                }],
                arbeidsgiver: {
                    naermesteLeder,
                    forrigeNaermesteLeder: {
                        fnr: '1000000000000',
                        navn: 'Arbeidsgiver navn',
                    },
                },
            });
            expect(erAvvistAvArbeidsgiver(oppfolgingsdialog)).to.equal(true);
        });
    });
});
