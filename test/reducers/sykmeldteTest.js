import deepFreeze from 'deep-freeze';
import { expect } from 'chai';
import * as actions from '../../js/actions/sykmeldte_actions';
import sykmeldte from '../../js/reducers/sykmeldte';
import getSykmeldt, { getExpectedSykmeldt } from '../mock/mockSykmeldt';

describe('sykmeldte', () => {
  let initialState = deepFreeze({
    data: [],
    henter: false,
    hentet: false,
    hentingFeilet: false,
  });

  it('håndterer SYKMELDTE_HENTET', () => {
    const action = actions.sykmeldteHentet([
      getSykmeldt({ navn: 'Ole', koblingId: 1 }),
      getSykmeldt({ navn: 'Per', koblingId: 2 }),
    ]);
    const nextState = sykmeldte(initialState, action);

    expect(nextState).to.deep.equal({
      data: [getExpectedSykmeldt({ koblingId: 1 }), getExpectedSykmeldt({ koblingId: 2 })],
      henter: false,
      hentet: true,
      hentingFeilet: false,
    });
  });

  it('håndterer HENTER_SYKMELDTE', () => {
    const action = actions.henterSykmeldte();
    const nextState = sykmeldte(initialState, action);
    expect(nextState).to.deep.equal({
      data: [],
      henter: true,
      hentet: false,
      hentingFeilet: false,
    });
  });

  it('håndterer HENT_SYKMELDTE_FEILET', () => {
    initialState = deepFreeze({
      data: [],
      henter: false,
      hentingFeilet: false,
    });

    const action = actions.hentSykmeldteFeilet();
    const nextState = sykmeldte(initialState, action);
    expect(nextState).to.deep.equal({
      data: [],
      henter: false,
      hentingFeilet: true,
      hentet: true,
    });
  });

  it('Håndterer HENTER_SYKMELDTE_BERIKELSER', () => {
    const sykmeldt1 = {
      koblingId: 5,
    };
    initialState = deepFreeze({
      data: [sykmeldt1],
      henterBerikelser: [],
    });
    const action = actions.henterSykmeldteBerikelser([5]);
    const nextState = sykmeldte(initialState, action);
    expect(nextState.henterBerikelser).to.deep.equal([5]);
  });

  it('Håndterer HENTER_SYKMELDTE_BERIKELSER når henterSykmeldteBerikelser() har blitt kalt med en streng', () => {
    const sykmeldt1 = {
      koblingId: 5,
    };
    initialState = deepFreeze({
      data: [sykmeldt1],
      henterBerikelser: [],
    });
    const action = actions.henterSykmeldteBerikelser(['5']);
    const nextState = sykmeldte(initialState, action);
    expect(nextState.henterBerikelser).to.deep.equal([5]);
  });

  it('Håndterer HENTER_SYKMELDTE_BERIKELSER når det allerede hentes berikelser for en kobling', () => {
    const sykmeldt1 = {
      koblingId: 5,
    };
    initialState = deepFreeze({
      data: [sykmeldt1],
      henterBerikelser: [5],
    });
    const action = actions.henterSykmeldteBerikelser([5]);
    const nextState = sykmeldte(initialState, action);
    expect(nextState.henterBerikelser).to.deep.equal([5]);
  });

  it('Håndterer SYKMELDTE_BERIKELSER_HENTET når det allerede er hentet berikelser for en kobling', () => {
    const sykmeldt1 = {
      navn: 'Kurt',
      fnr: '1234',
      koblingId: 5,
    };
    initialState = deepFreeze({
      data: [sykmeldt1],
      henterBerikelser: [],
    });
    const action = actions.sykmeldteBerikelserHentet([
      {
        koblingId: 5,
      },
    ]);
    const nextState = sykmeldte(initialState, action);
    expect(nextState.data).to.deep.equal([sykmeldt1]);
  });

  it('Håndterer SYKMELDTE_BERIKELSER_HENTET', () => {
    const sykmeldt1 = {
      koblingId: 5,
    };
    const sykmeldt2 = {
      koblingId: 6,
    };
    initialState = deepFreeze({
      data: [sykmeldt1, sykmeldt2],
      henterBerikelser: [5, 6],
    });
    const action = actions.sykmeldteBerikelserHentet([
      {
        navn: 'Kurt',
        fnr: '1234',
        koblingId: 5,
      },
    ]);
    const nextState = sykmeldte(initialState, action);
    expect(nextState.henterBerikelser).to.deep.equal([6]);
    expect(nextState.data).to.deep.equal([
      {
        navn: 'Kurt',
        fnr: '1234',
        koblingId: 5,
      },
      sykmeldt2,
    ]);
  });

  it('Håndterer HENT_SYKMELDTE_BERIKELSER_FEILET', () => {
    const state = {};
    const action = actions.hentSykmeldteBerikelserFeilet();
    const nextState = sykmeldte(state, action);
    expect(nextState.hentingFeilet).to.equal(true);
  });
});
