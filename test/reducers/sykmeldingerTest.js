import deepFreeze from 'deep-freeze';
import { expect } from 'chai';
import * as actions from '../../js/actions/sykmeldinger_actions';
import sykmeldinger from '../../js/reducers/sykmeldinger';
import getSykmelding from '../mock/mockSykmeldinger';
import getSykmeldt from '../mock/mockSykmeldt';
import { sykmeldteHentet } from '../../js/actions/sykmeldte_actions';

describe('sykmeldinger', () => {
  let initialState = sykmeldinger();

  it('håndterer SYKMELDTE_HENTET', () => {
    const action = sykmeldteHentet([
      getSykmeldt({ navn: 'Ole', koblingId: 1 }),
      getSykmeldt({ navn: 'Per', koblingId: 2 }),
    ]);
    const nextState = sykmeldinger(deepFreeze({}), action);

    expect(nextState).to.deep.equal({
      1: {
        data: [],
        hentet: false,
        henter: false,
        hentingFeilet: false,
      },
      2: {
        data: [],
        hentet: false,
        henter: false,
        hentingFeilet: false,
      },
    });
  });

  it('håndterer SYKMELDTE_HENTET når det allerede finnes data', () => {
    const action = sykmeldteHentet([
      getSykmeldt({ navn: 'Ole', koblingId: 1 }),
      getSykmeldt({ navn: 'Per', koblingId: 2 }),
    ]);
    const state = {
      1: {
        data: [{}, {}],
        hentet: true,
        henter: false,
        hentingFeilet: false,
      },
    };
    const nextState = sykmeldinger(deepFreeze(state), action);

    expect(nextState).to.deep.equal({
      1: {
        data: [{}, {}],
        hentet: true,
        henter: false,
        hentingFeilet: false,
      },
      2: {
        data: [],
        hentet: false,
        henter: false,
        hentingFeilet: false,
      },
    });
  });

  it('håndterer SYKMELDINGER_HENTET når det ikke finnes sykmeldinger for noen før', () => {
    const action = actions.sykmeldingerHentet([getSykmelding({ id: '1' }), getSykmelding({ id: '2' })], '123');
    const nextState = sykmeldinger(initialState, action);

    expect(nextState).to.deep.equal({
      123: {
        data: [getSykmelding({ id: '1' }), getSykmelding({ id: '2' })],
        henter: false,
        hentingFeilet: false,
        hentet: true,
      },
    });
  });

  it('håndterer SYKMELDINGER_HENTET når det finnes sykmeldinger for en annen bruker fra før', () => {
    initialState = {
      123: {
        data: [getSykmelding({ id: '1' }), getSykmelding({ id: '2' })],
        henter: false,
        hentingFeilet: false,
        hentet: true,
      },
    };
    const action = actions.sykmeldingerHentet([getSykmelding({ id: '3' }), getSykmelding({ id: '4' })], '456');
    const nextState = sykmeldinger(initialState, action);
    expect(nextState).to.deep.equal({
      123: {
        data: [getSykmelding({ id: '1' }), getSykmelding({ id: '2' })],
        henter: false,
        hentingFeilet: false,
        hentet: true,
      },
      456: {
        data: [getSykmelding({ id: '3' }), getSykmelding({ id: '4' })],
        henter: false,
        hentingFeilet: false,
        hentet: true,
      },
    });
  });

  it('håndterer SYKMELDINGER_HENTET når det finnes sykmeldinger for denne brukeren fra før', () => {
    initialState = {
      123: {
        data: [getSykmelding({ id: '1' }), getSykmelding({ id: '2' })],
        henter: false,
        hentingFeilet: false,
        hentet: true,
      },
    };
    const action = actions.sykmeldingerHentet([getSykmelding({ id: '3' }), getSykmelding({ id: '4' })], '123');
    const nextState = sykmeldinger(initialState, action);
    expect(nextState).to.deep.equal({
      123: {
        data: [getSykmelding({ id: '3' }), getSykmelding({ id: '4' })],
        henter: false,
        hentingFeilet: false,
        hentet: true,
      },
    });
  });

  it('håndterer HENTER_SYKMELDINGER', () => {
    initialState = deepFreeze({});
    const action = actions.henterSykmeldinger('123');
    const nextState = sykmeldinger(initialState, action);
    expect(nextState).to.deep.equal({
      123: {
        data: [],
        henter: true,
        hentingFeilet: false,
        hentet: false,
      },
    });
  });

  it('håndterer HENT_SYKMELDINGER_FEILET', () => {
    initialState = deepFreeze({});

    const action = actions.hentSykmeldingerFeilet('123');
    const nextState = sykmeldinger(initialState, action);
    expect(nextState).to.deep.equal({
      123: {
        data: [],
        henter: false,
        hentingFeilet: true,
        hentet: true,
      },
    });
  });
});
