import chai from 'chai';
import sinon from 'sinon';
import {
  finnAktiveOppfolgingsdialoger,
  finnBrukersSisteInnlogging,
  finnGodkjentedialogerAvbruttAvMotpartSidenSistInnlogging,
} from '../../js/utils/oppfolgingsplanUtils';

const expect = chai.expect;

describe('OppfolgingplanUtils', () => {
  let clock;
  const today = new Date('2017-09-28');
  today.setHours(0, 0, 0, 0);
  beforeEach(() => {
    clock = sinon.useFakeTimers(today.getTime()); // 28. september 2017
  });

  afterEach(() => {
    clock.restore();
  });

  describe('finnAktiveOppfolgingsdialoger', () => {
    const gyldighetstidspunktPassert = {
      tom: new Date('2017.09.26'),
    };
    const gyldighetstidspunktIkkePassert = {
      tom: new Date('2017.12.15'),
    };

    it('finnAktiveOppfolgingsdialoger 1', () => {
      const dialog = [
        {
          godkjentPlan: null,
        },
      ];
      expect(finnAktiveOppfolgingsdialoger(dialog)).to.have.length(1);
    });

    it('finnAktiveOppfolgingsdialoger skal returnere 1 plan, om gyldighetstidspunkt ikke er passer, om plan ikke er godkjent', () => {
      const dialog = [
        {
          godkjentPlan: null,
        },
      ];
      expect(finnAktiveOppfolgingsdialoger(dialog)).to.have.length(1);
    });

    it('finnAktiveOppfolgingsdialoger skal returnere 1 plan, om gyldighetstidspunkt ikke er passert', () => {
      const dialog = [
        {
          godkjentPlan: {
            gyldighetstidspunkt: gyldighetstidspunktIkkePassert,
          },
        },
      ];
      expect(finnAktiveOppfolgingsdialoger(dialog)).to.have.length(1);
    });

    it('finnAktiveOppfolgingsdialoger skal returnere 1 plan, om gyldighetstidspunkt er passert', () => {
      const dialog = [
        {
          godkjentPlan: {
            gyldighetstidspunkt: gyldighetstidspunktPassert,
          },
        },
      ];
      expect(finnAktiveOppfolgingsdialoger(dialog)).to.have.length(0);
    });
  });

  describe('finnBrukersSisteInnlogging', () => {
    it('finnBrukersSisteInnlogging for arbeidsgiver', () => {
      const sisteInnloggingDato = new Date('2017-10-25T08:02:18');
      const dialoger = [
        {
          arbeidsgiver: {
            naermesteLeder: {
              sistInnlogget: '2017-10-25T08:02:18',
            },
          },
        },
        {
          arbeidsgiver: {
            naermesteLeder: {
              sistInnlogget: '2017-10-24T08:02:18.075',
            },
          },
        },
      ];
      const returnertInnlogging = finnBrukersSisteInnlogging(dialoger);
      expect(returnertInnlogging.getTime()).to.equal(sisteInnloggingDato.getTime());
    });
  });

  describe('finnGodkjentedialogerAvbruttAvMotpartSidenSistInnlogging', () => {
    it('finnGodkjentedialogerAvbruttAvMotpartSidenSistInnlogging skal returnere 1 dialog for ARBEIDSGIVER om SYKMELDT har AVBRUTT ', () => {
      const oppfolgingsdialoger = [
        {
          id: 403,
          status: 'AVBRUTT',
          godkjentPlan: {
            avbruttPlan: {
              av: {
                fnr: '1000004284466',
              },
              tidspunkt: '2017-10-25T07:54:23.467',
              id: 403,
            },
          },
          arbeidsgiver: {
            naermesteLeder: {
              fnr: '1000006119492',
              sistInnlogget: '2017-10-25T07:53:32.757',
            },
          },
          arbeidstaker: {
            fnr: '1000004284466',
            sistInnlogget: '2017-10-25T07:52:57.158',
          },
        },
        {
          id: 404,
          status: 'AKTIV',
          godkjentPlan: {
            avbruttPlan: null,
          },
          avbruttPlanListe: [
            {
              av: {
                fnr: '1000004284466',
              },
              tidspunkt: '2017-10-25T07:54:23.467',
              id: 403,
            },
          ],
          arbeidsgiver: {
            naermesteLeder: {
              fnr: '1000006119492',
              sistInnlogget: '2017-10-25T07:53:32.757',
            },
          },
          arbeidstaker: {
            fnr: '1000004284466',
            sistInnlogget: '2017-10-25T07:52:57.158',
          },
        },
      ];
      expect(finnGodkjentedialogerAvbruttAvMotpartSidenSistInnlogging(oppfolgingsdialoger)).to.have.length(1);
    });
  });
});
