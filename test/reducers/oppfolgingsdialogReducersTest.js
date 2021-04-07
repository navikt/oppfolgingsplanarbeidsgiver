import deepFreeze from 'deep-freeze';
import { expect } from 'chai';
import * as oppfolgingsdialogActions from '../../js/actions/oppfolgingsplan/oppfolgingsplan_actions';
import * as nullstillGodkjenningAction from '../../js/actions/oppfolgingsplan/nullstillGodkjenning_actions';
import * as samtykkeAction from '../../js/actions/oppfolgingsplan/samtykke_actions';
import * as arbeidsoppgaveAction from '../../js/actions/oppfolgingsplan/arbeidsoppgave_actions';
import * as tiltakAction from '../../js/actions/oppfolgingsplan/tiltak_actions';
import oppfolgingsdialoger from '../../js/reducers/oppfolgingsplaner';
import getOppfolgingsplan from '../mock/mockOppfolgingsdialog';

describe('oppfolgingsdialoger', () => {
  const fnr = '12345678';
  const fnr2 = '12345670';
  const mockdata = {
    oppfolgingsdialoger: [getOppfolgingsplan()],
  };
  const initialStateUtenData = deepFreeze({
    henter: false,
    hentet: false,
    hentingFeilet: false,
    hentingForsokt: false,
  });
  const initialState = deepFreeze({
    [fnr]: {
      data: mockdata.oppfolgingsdialoger,
    },
  });

  describe('henter', () => {
    it('håndterer HENTER_OPPFOLGINGSPLANER', () => {
      const action = oppfolgingsdialogActions.henterOppfolgingsplaner();
      const nextState = oppfolgingsdialoger(initialStateUtenData, action);
      expect(nextState).to.deep.equal({
        henter: true,
        hentet: false,
        hentingFeilet: false,
        hentingForsokt: false,
      });
    });

    it('håndterer OPPFOLGINGSPLANER_HENTET', () => {
      const oppfolgingsdialogListeSykmeldt = [
        Object.assign({}, mockdata.oppfolgingsdialoger[0], {
          id: 1,
          arbeidstaker: Object.assign({}, mockdata.oppfolgingsdialoger[0].arbeidstaker, {
            fnr,
          }),
        }),
        Object.assign({}, mockdata.oppfolgingsdialoger[0], {
          id: 2,
          arbeidstaker: Object.assign({}, mockdata.oppfolgingsdialoger[0].arbeidstaker, {
            fnr,
          }),
        }),
      ];
      const oppfolgingsdialogListeSykmeldt2 = [
        Object.assign({}, mockdata.oppfolgingsdialoger[0], {
          id: 3,
          arbeidstaker: Object.assign({}, mockdata.oppfolgingsdialoger[0].arbeidstaker, {
            fnr: fnr2,
          }),
        }),
        Object.assign({}, mockdata.oppfolgingsdialoger[0], {
          id: 4,
          arbeidstaker: Object.assign({}, mockdata.oppfolgingsdialoger[0].arbeidstaker, {
            fnr: fnr2,
          }),
        }),
      ];
      const action = oppfolgingsdialogActions.oppfolgingsplanerHentet(
        oppfolgingsdialogListeSykmeldt.concat(oppfolgingsdialogListeSykmeldt2)
      );
      const nextState = oppfolgingsdialoger(initialStateUtenData, action);
      expect(nextState).to.deep.equal({
        henter: false,
        hentet: true,
        hentingFeilet: false,
        hentingForsokt: true,
        [fnr]: {
          data: oppfolgingsdialogListeSykmeldt,
        },
        [fnr2]: {
          data: oppfolgingsdialogListeSykmeldt2,
        },
      });
    });

    it('håndterer HENT_OPPFOLGINGSPLANER_FEILET', () => {
      const action = oppfolgingsdialogActions.hentOppfolgingsplanerFeilet();
      const nextState = oppfolgingsdialoger(initialStateUtenData, action);
      expect(nextState).to.deep.equal({
        henter: false,
        hentet: false,
        hentingFeilet: true,
        hentingForsokt: true,
      });
    });
  });

  describe('oppretter', () => {
    it('håndterer OPPRETTER_OPPFOLGINGSPLAN', () => {
      const action = oppfolgingsdialogActions.oppretterOppfolgingsplan(fnr);
      const nextState = oppfolgingsdialoger(initialStateUtenData, action);
      expect(nextState).to.deep.equal({
        henter: false,
        hentet: false,
        hentingFeilet: false,
        hentingForsokt: false,
        [fnr]: {
          oppretter: true,
          opprettet: false,
          opprettingFeilet: false,
        },
      });
    });

    it('håndterer OPPFOLGINGSPLAN_OPPRETTET', () => {
      const action = oppfolgingsdialogActions.oppfolgingsplanOpprettet(1, fnr);
      const nextState = oppfolgingsdialoger(initialStateUtenData, action);
      expect(nextState).to.deep.equal({
        henter: false,
        hentet: false,
        hentingFeilet: false,
        hentingForsokt: false,
        [fnr]: {
          oppretter: false,
          opprettet: true,
          opprettetId: 1,
        },
      });
    });

    it('håndterer OPPRETT_OPPFOLGINGSPLAN_FEILET', () => {
      const action = oppfolgingsdialogActions.opprettOppfolgingsplanFeilet(fnr);
      const nextState = oppfolgingsdialoger(initialStateUtenData, action);
      expect(nextState).to.deep.equal({
        henter: false,
        hentet: false,
        hentingFeilet: false,
        hentingForsokt: false,
        [fnr]: {
          oppretter: false,
          opprettingFeilet: true,
        },
      });
    });
  });

  describe('godkjenner', () => {
    it('håndterer GODKJENNER_PLAN', () => {
      const action = oppfolgingsdialogActions.godkjennerPlan(fnr);
      const nextState = oppfolgingsdialoger(initialState, action);
      expect(nextState).to.deep.equal({
        [fnr]: {
          data: mockdata.oppfolgingsdialoger,
          godkjenner: true,
          godkjenningFeilet: false,
          godkjent: false,
        },
      });
    });

    it('håndterer PLAN_GODKJENT', () => {
      const action = oppfolgingsdialogActions.planGodkjent(1, 'tvungenGodkjenning', new Date(), fnr);
      const nextState = oppfolgingsdialoger(initialState, action);
      expect(nextState).to.deep.equal({
        [fnr]: {
          data: mockdata.oppfolgingsdialoger,
          godkjenner: false,
          godkjent: true,
        },
      });
    });

    it('håndterer GODKJENN_PLAN_FEILET', () => {
      const action = oppfolgingsdialogActions.godkjennPlanFeilet(fnr);
      const nextState = oppfolgingsdialoger(initialState, action);
      expect(nextState).to.deep.equal({
        [fnr]: {
          data: mockdata.oppfolgingsdialoger,
          godkjenner: false,
          godkjenningFeilet: true,
        },
      });
    });
  });

  it('håndterer NULLSTILT_GODKJENNING', () => {
    const action = nullstillGodkjenningAction.nullstiltGodkjenning(mockdata.oppfolgingsdialoger, fnr);
    const nextState = oppfolgingsdialoger(initialState, action);
    expect(nextState).to.deep.equal({
      [fnr]: {
        data: mockdata.oppfolgingsdialoger,
      },
    });
  });

  it('håndterer SAMTYKKE_GITT', () => {
    const action = samtykkeAction.samtykkeGitt(1, true, fnr);
    const nextState = oppfolgingsdialoger(initialState, action);
    expect(nextState).to.deep.equal({
      [fnr]: {
        data: mockdata.oppfolgingsdialoger,
      },
    });
  });

  it('håndterer AVVISER_PLAN', () => {
    const action = oppfolgingsdialogActions.avviserPlan(fnr);
    const nextState = oppfolgingsdialoger(initialState, action);
    expect(nextState).to.deep.equal({
      [fnr]: {
        data: mockdata.oppfolgingsdialoger,
        avviser: true,
        avvist: false,
        avvisFeilet: false,
      },
    });
  });

  it('håndterer PLAN_AVVIST', () => {
    const action = oppfolgingsdialogActions.planAvvist(1, fnr);
    const nextState = oppfolgingsdialoger(initialState, action);
    expect(nextState).to.deep.equal({
      [fnr]: {
        data: mockdata.oppfolgingsdialoger,
        avvist: true,
        avviser: false,
      },
    });
  });

  it('håndterer AVVIS_PLAN_FEILET', () => {
    const action = oppfolgingsdialogActions.avvisPlanFeilet(fnr);
    const nextState = oppfolgingsdialoger(initialState, action);
    expect(nextState).to.deep.equal({
      [fnr]: {
        data: mockdata.oppfolgingsdialoger,
        godkjenner: false,
        avviser: false,
        avvisFeilet: true,
      },
    });
  });

  it('håndterer ARBEIDSOPPGAVE_SLETTET', () => {
    const action = arbeidsoppgaveAction.arbeidsoppgaveSlettet(1, 1, fnr);
    const nextState = oppfolgingsdialoger(initialState, action);
    expect(nextState).to.deep.equal({
      [fnr]: {
        data: mockdata.oppfolgingsdialoger,
      },
    });
  });

  it('håndterer TILTAK_SLETTET', () => {
    const action = tiltakAction.tiltakSlettet(1, 1, fnr);
    const nextState = oppfolgingsdialoger(initialState, action);
    expect(nextState).to.deep.equal({
      [fnr]: {
        data: mockdata.oppfolgingsdialoger,
      },
    });
  });

  it('håndterer TILTAK_SLETTET endret ID', () => {
    const action = tiltakAction.tiltakSlettet(2, 1, fnr);
    const nextState = oppfolgingsdialoger(initialState, action);
    expect(nextState).to.deep.equal({
      [fnr]: {
        data: mockdata.oppfolgingsdialoger,
      },
    });
  });

  it('håndterer TILTAK_LAGRET endret ID', () => {
    const action = tiltakAction.tiltakLagret(
      2,
      mockdata.oppfolgingsdialoger,
      mockdata.oppfolgingsdialoger[0].tiltakListe,
      fnr
    );
    const nextState = oppfolgingsdialoger(initialState, action);
    expect(nextState).to.deep.equal({
      [fnr]: {
        data: mockdata.oppfolgingsdialoger,
      },
    });
  });

  it('håndterer TILTAK_LAGRET', () => {
    const action = tiltakAction.tiltakLagret(
      1,
      mockdata.oppfolgingsdialoger,
      mockdata.oppfolgingsdialoger[0].tiltakListe,
      fnr
    );
    const nextState = oppfolgingsdialoger(initialState, action);
    expect(nextState).to.deep.equal({
      [fnr]: {
        data: mockdata.oppfolgingsdialoger,
      },
    });
  });

  it('håndterer ARBEIDSOPPGAVE_LAGRET', () => {
    const action = arbeidsoppgaveAction.arbeidsoppgaveLagret(
      1,
      mockdata.oppfolgingsdialoger,
      mockdata.oppfolgingsdialoger[0].arbeidsoppgaveListe,
      fnr
    );
    const nextState = oppfolgingsdialoger(initialState, action);
    expect(nextState).to.deep.equal({
      [fnr]: {
        data: mockdata.oppfolgingsdialoger,
      },
    });
  });
});
