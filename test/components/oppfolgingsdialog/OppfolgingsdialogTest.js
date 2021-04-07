import React from 'react';
import chai from 'chai';
import { shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import sinon from 'sinon';
import Oppfolgingsdialog, { erAvvistAvArbeidsgiver } from '../../../js/components/oppfolgingsdialog/Oppfolgingsdialog';
import SideOverskrift from '../../../js/components/oppfolgingsdialog/SideOverskrift';
import AvbruttGodkjentPlanVarsel from '../../../js/components/oppfolgingsdialog/AvbruttGodkjentPlanVarsel';
import Godkjenn from '../../../js/components/oppfolgingsdialog/godkjennplan/Godkjenn';
import Godkjenninger from '../../../js/components/oppfolgingsdialog/godkjennplan/godkjenninger/Godkjenninger';
import ReleasetPlan from '../../../js/components/oppfolgingsdialog/godkjennplan/releasetplan/ReleasetPlan';
import NavigasjonsBunn from '../../../js/components/oppfolgingsdialog/NavigasjonsBunn';
import NavigasjonsTopp from '../../../js/components/oppfolgingsdialog/NavigasjonsTopp';
import Arbeidsoppgaver from '../../../js/components/oppfolgingsdialog/utfylling/arbeidsoppgaver/Arbeidsoppgaver';
import Samtykke from '../../../js/components/oppfolgingsdialog/godkjennplan/samtykke/Samtykke';
import Tiltak from '../../../js/components/oppfolgingsdialog/utfylling/tiltak/Tiltak';
import getOppfolgingsplan from '../../mock/mockOppfolgingsdialog';

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
  const avbrytdialogReducer = {};
  const sykmeldinger = [
    {
      identdato: new Date(2017, 12, 31),
      orgnummer: getOppfolgingsplan().virksomhet.virksomhetsnummer,
      mulighetForArbeid: {
        perioder: [
          {
            fom: new Date(2018, 1, 1),
            tom: new Date(2018, 2, 1),
            grad: 100,
          },
        ],
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
    navigasjontoggles = { steg: 1 };
    oppfolgingsdialog = getOppfolgingsplan();
    component = shallow(
      <Oppfolgingsdialog
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
        virksomhet={virksomhet}
        person={person}
        kontaktinfo={kontaktinfo}
        arbeidsforhold={arbeidsforhold}
        hentArbeidsforhold={hentArbeidsforhold}
        sykmeldinger={sykmeldinger}
      />
    );
  });

  it('Skal vise SideOverskrift', () => {
    expect(component.find(SideOverskrift)).to.have.length(1);
  });

  it('Skal ikke vise NavigasjonsTopp, dersom dialog ikke er under arbeid(disabledNavigation er true)', () => {
    expect(component.find(NavigasjonsTopp)).to.have.length(0);
  });

  it('Skal vise NavigasjonsTopp, dersom dialog er under arbeid(disabledNavigation er false)', () => {
    const oppfolgingsdialogUnderArbeid = Object.assign({}, getOppfolgingsplan(), {
      godkjentPlan: null,
      godkjenninger: [],
    });
    const componentUnderArbeid = shallow(
      <Oppfolgingsdialog
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
        virksomhet={virksomhet}
        person={person}
        kontaktinfo={kontaktinfo}
        arbeidsforhold={arbeidsforhold}
        hentArbeidsforhold={hentArbeidsforhold}
        sykmeldinger={sykmeldinger}
      />
    );
    expect(componentUnderArbeid.find(NavigasjonsTopp)).to.have.length(1);
  });

  it('Skal vise NavigasjonsBunn', () => {
    expect(component.find(NavigasjonsBunn)).to.have.length(1);
  });

  it('Skal ikke vise AvbruttGodkjentPlanVarsel, om oppfolgingsdialogAvbrutt er false', () => {
    expect(component.find(AvbruttGodkjentPlanVarsel)).to.have.length(0);
  });

  it('Skal vise AvbruttGodkjentPlanVarsel, om oppfolgingsdialogAvbrutt er true', () => {
    component = shallow(
      <Oppfolgingsdialog
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
        virksomhet={virksomhet}
        person={person}
        kontaktinfo={kontaktinfo}
        oppfolgingsdialogAvbrutt
        arbeidsforhold={arbeidsforhold}
        hentArbeidsforhold={hentArbeidsforhold}
        sykmeldinger={sykmeldinger}
      />
    );
    expect(component.find(AvbruttGodkjentPlanVarsel)).to.have.length(1);
  });

  it('Skal vise Samtykke, om arbeidstaker ikke har svart paa samtykke og visSamtykke er true og er ikke egen leder', () => {
    oppfolgingsdialog = Object.assign({}, getOppfolgingsplan(), {
      arbeidstaker: {
        fnr: '101',
        samtykke: true,
      },
      arbeidsgiver: {
        naermesteLeder: {
          fnr: '102',
          samtykke: null,
        },
      },
    });
    component = shallow(
      <Oppfolgingsdialog
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
        virksomhet={virksomhet}
        person={person}
        kontaktinfo={kontaktinfo}
        arbeidsforhold={arbeidsforhold}
        hentArbeidsforhold={hentArbeidsforhold}
        sykmeldinger={sykmeldinger}
      />
    );
    expect(component.find(Samtykke)).to.have.length(1);
  });

  it('Skal vise Samtykke, om arbeidstaker ikke har svart paa samtykke og visSamtykke er true og er egen leder', () => {
    oppfolgingsdialog = Object.assign({}, getOppfolgingsplan(), {
      arbeidstaker: {
        fnr: '102',
        samtykke: null,
      },
      arbeidsgiver: {
        naermesteLeder: {
          fnr: '102',
          samtykke: true,
        },
      },
    });
    component = shallow(
      <Oppfolgingsdialog
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
        virksomhet={virksomhet}
        person={person}
        kontaktinfo={kontaktinfo}
        arbeidsforhold={arbeidsforhold}
        hentArbeidsforhold={hentArbeidsforhold}
        sykmeldinger={sykmeldinger}
      />
    );
    expect(component.find(Samtykke)).to.have.length(1);
  });

  it('Skal vise Godkjenninger, om oppfolgingsdialoger inneholder Godkjenninger og ikke er avvist av arbeidsgiver', () => {
    const fnr = '123456789';
    oppfolgingsdialog = Object.assign({}, getOppfolgingsplan(), {
      godkjenninger: [
        {
          godkjent: true,
          godkjentAv: {
            fnr,
          },
        },
      ],
      arbeidsgiver: {
        naermesteLeder: {
          fnr,
          samtykke: true,
        },
        forrigeNaermesteLeder: null,
      },
    });
    component = shallow(
      <Oppfolgingsdialog
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
        virksomhet={virksomhet}
        person={person}
        kontaktinfo={kontaktinfo}
        arbeidsforhold={arbeidsforhold}
        hentArbeidsforhold={hentArbeidsforhold}
        sykmeldinger={sykmeldinger}
      />
    );
    expect(component.find(Godkjenninger)).to.have.length(1);
  });

  it('Skal vise ReleasetPlan, om oppfolgingsdialoger inneholder GodkjentPlan og ikke er avvist av arbeidsgiver', () => {
    oppfolgingsdialog = Object.assign({}, getOppfolgingsplan(), {
      godkjentPlan: {},
      arbeidsgiver: {
        naermesteLeder: {
          samtykke: true,
        },
        forrigeNaermesteLeder: null,
      },
    });
    component = shallow(
      <Oppfolgingsdialog
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
        virksomhet={virksomhet}
        person={person}
        kontaktinfo={kontaktinfo}
        arbeidsforhold={arbeidsforhold}
        hentArbeidsforhold={hentArbeidsforhold}
        sykmeldinger={sykmeldinger}
      />
    );
    expect(component.find(ReleasetPlan)).to.have.length(1);
  });

  it('Skal vise Arbeidsoppgaver, om steg er 1 ', () => {
    oppfolgingsdialog = Object.assign({}, getOppfolgingsplan(), {
      godkjentPlan: null,
      godkjenninger: [],
      avbruttPlanListe: [],
    });
    navigasjontoggles = { steg: 1 };
    component = shallow(
      <Oppfolgingsdialog
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
        virksomhet={virksomhet}
        person={person}
        kontaktinfo={kontaktinfo}
        arbeidsforhold={arbeidsforhold}
        hentArbeidsforhold={hentArbeidsforhold}
        sykmeldinger={sykmeldinger}
      />
    );
    expect(component.find(Arbeidsoppgaver)).to.have.length(1);
  });

  it('Skal vise Tiltak, om steg er 3 ', () => {
    oppfolgingsdialog = Object.assign({}, getOppfolgingsplan(), {
      godkjentPlan: null,
      godkjenninger: [],
      avbruttPlanListe: [],
    });
    navigasjontoggles = { steg: 2 };
    component = shallow(
      <Oppfolgingsdialog
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
        virksomhet={virksomhet}
        person={person}
        kontaktinfo={kontaktinfo}
        arbeidsforhold={arbeidsforhold}
        hentArbeidsforhold={hentArbeidsforhold}
        sykmeldinger={sykmeldinger}
      />
    );
    expect(component.find(Tiltak)).to.have.length(1);
  });

  it('Skal vise Godkjenn, om steg er 3 ', () => {
    oppfolgingsdialog = Object.assign({}, getOppfolgingsplan(), {
      godkjentPlan: null,
      godkjenninger: [],
      avbruttPlanListe: [],
    });
    navigasjontoggles = { steg: 3 };
    component = shallow(
      <Oppfolgingsdialog
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
        virksomhet={virksomhet}
        person={person}
        kontaktinfo={kontaktinfo}
        arbeidsforhold={arbeidsforhold}
        hentArbeidsforhold={hentArbeidsforhold}
        sykmeldinger={sykmeldinger}
      />
    );
    expect(component.find(Godkjenn)).to.have.length(1);
  });

  describe('erAvvistAvArbeidsgiver', () => {
    const arbeidstaker = { fnr: '123456789' };
    const naermesteLeder = { fnr: '123456788' };
    it('Skal returnere false, om plan er avvist og saa godkjent', () => {
      oppfolgingsdialog = Object.assign({}, getOppfolgingsplan(), {
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
          forrigeNaermesteLeder: null,
        },
      });
      expect(erAvvistAvArbeidsgiver(oppfolgingsdialog)).to.equal(false);
    });
    it('Skal returnere false, om plan er godkjent', () => {
      oppfolgingsdialog = Object.assign({}, getOppfolgingsplan(), {
        godkjenninger: [
          {
            godkjent: true,
            godkjentAv: {
              fnr: naermesteLeder.fnr,
            },
          },
        ],
        arbeidsgiver: {
          naermesteLeder,
          forrigeNaermesteLeder: null,
        },
      });
      expect(erAvvistAvArbeidsgiver(oppfolgingsdialog)).to.equal(false);
    });

    it('Skal returnere false, om plan er avvist av en annen enn Arbeidsgiver', () => {
      oppfolgingsdialog = Object.assign({}, getOppfolgingsplan(), {
        godkjenninger: [
          {
            godkjent: false,
            godkjentAv: {
              fnr: arbeidstaker.fnr,
            },
          },
        ],
        arbeidsgiver: {
          naermesteLeder,
          forrigeNaermesteLeder: null,
        },
      });
      expect(erAvvistAvArbeidsgiver(oppfolgingsdialog)).to.equal(false);
    });

    it('Skal returnere true, om plan er avvist av Arbeidsgiver', () => {
      oppfolgingsdialog = Object.assign({}, getOppfolgingsplan(), {
        godkjenninger: [
          {
            godkjent: false,
            godkjentAv: {
              fnr: naermesteLeder.fnr,
            },
          },
        ],
        arbeidsgiver: {
          naermesteLeder,
          forrigeNaermesteLeder: null,
        },
      });
      expect(erAvvistAvArbeidsgiver(oppfolgingsdialog)).to.equal(true);
    });
  });
});
