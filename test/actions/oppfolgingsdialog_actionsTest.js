import { expect } from 'chai';
import * as actions from '../../js/actions/oppfolgingsplan/oppfolgingsplan_actions';

describe('oppfolgingsplan_actions', () => {
  let fnr;

  beforeEach(() => {
    fnr = '12345678';
  });

  describe('hent', () => {
    it('Skal ha en hentOppfolgingsplaner()-funksjon som returnerer riktig action', () => {
      expect(actions.hentOppfolgingsplaner()).to.deep.equal({
        type: actions.HENT_OPPFOLGINGSPLANER_FORESPURT,
      });
    });

    it('Skal ha en henterOppfolgingsplaner()-funksjon som returnerer riktig action', () => {
      expect(actions.henterOppfolgingsplaner()).to.deep.equal({
        type: actions.HENTER_OPPFOLGINGSPLANER,
      });
    });

    it('har en oppfolgingsplanerHentet()-funksjon som returnerer riktig action', () => {
      expect(actions.oppfolgingsplanerHentet([{ id: 12345, navn: 'Ole' }])).to.deep.equal({
        type: actions.OPPFOLGINGSPLANER_HENTET,
        data: [{ id: 12345, navn: 'Ole' }],
      });
    });

    it('Skal ha en hentOppfolgingsplanerFeilet()-funksjon som returnerer riktig action', () => {
      expect(actions.hentOppfolgingsplanerFeilet()).to.deep.equal({
        type: actions.HENT_OPPFOLGINGSPLANER_FEILET,
      });
    });
  });

  describe('opprett', () => {
    it('Skal ha en opprettOppfolgingsplan()-funksjon som returnerer riktig action', () => {
      expect(actions.opprettOppfolgingsplan({}, fnr)).to.deep.equal({
        type: actions.OPPRETT_OPPFOLGINGSPLAN_FORESPURT,
        oppfolgingsplan: {},
        fnr,
      });
    });

    it('Skal ha en oppretterOppfolgingsplan()-funksjon som returnerer riktig action', () => {
      expect(actions.oppretterOppfolgingsplan(fnr)).to.deep.equal({
        type: actions.OPPRETTER_OPPFOLGINGSPLAN,
        fnr,
      });
    });

    it('har en oppfolgingsplanOpprettet()-funksjon som returnerer riktig action', () => {
      expect(actions.oppfolgingsplanOpprettet([{ id: 12345, navn: 'Ole' }], fnr)).to.deep.equal({
        type: actions.OPPFOLGINGSPLAN_OPPRETTET,
        data: [{ id: 12345, navn: 'Ole' }],
        fnr,
      });
    });

    it('Skal ha en hentOppfolgingsplanerFeilet()-funksjon som returnerer riktig action', () => {
      expect(actions.opprettOppfolgingsplanFeilet(fnr)).to.deep.equal({
        type: actions.OPPRETT_OPPFOLGINGSPLAN_FEILET,
        fnr,
      });
    });
  });

  describe('godkjenn', () => {
    it('Skal ha en godkjennPlan()-funksjon som returnerer riktig action', () => {
      expect(actions.godkjennPlan(1, {}, '', fnr, true)).to.deep.equal({
        type: actions.GODKJENN_PLAN_FORESPURT,
        id: 1,
        gyldighetstidspunkt: {},
        status: '',
        fnr,
        delMedNav: true,
      });
    });

    it('Skal ha en godkjennerPlan()-funksjon som returnerer riktig action', () => {
      expect(actions.godkjennerPlan(fnr)).to.deep.equal({
        type: actions.GODKJENNER_PLAN,
        fnr,
      });
    });

    it('Skal ha en planGodkjent()-funksjon som returnerer riktig action', () => {
      expect(actions.planGodkjent(1, {}, '', fnr, true)).to.deep.equal({
        type: actions.PLAN_GODKJENT,
        id: 1,
        gyldighetstidspunkt: {},
        status: '',
        fnr,
        delMedNav: true,
      });
    });

    it('Skal ha en godkjennPlanFeilet()-funksjon som returnerer riktig action', () => {
      expect(actions.godkjennPlanFeilet(fnr)).to.deep.equal({
        type: actions.GODKJENN_PLAN_FEILET,
        fnr,
      });
    });
  });

  describe('avvis', () => {
    it('Skal ha en avvisPlan()-funksjon som returnerer riktig action', () => {
      expect(actions.avvisPlan(1, fnr)).to.deep.equal({
        type: actions.AVVIS_PLAN_FORESPURT,
        id: 1,
        fnr,
      });
    });

    it('Skal ha en avviserPlan()-funksjon som returnerer riktig action', () => {
      expect(actions.avviserPlan(fnr)).to.deep.equal({
        type: actions.AVVISER_PLAN,
        fnr,
      });
    });

    it('har en planAvvist()-funksjon som returnerer riktig action', () => {
      expect(actions.planAvvist(1, fnr)).to.deep.equal({
        type: actions.PLAN_AVVIST,
        id: 1,
        fnr,
      });
    });

    it('Skal ha en avvisPlanFeilet()-funksjon som returnerer riktig action', () => {
      expect(actions.avvisPlanFeilet(fnr)).to.deep.equal({
        type: actions.AVVIS_PLAN_FEILET,
        fnr,
      });
    });
  });
});
