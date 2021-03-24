import deepFreeze from 'deep-freeze';
import { expect } from 'chai';
import fastlegeDeling from '../../js/reducers/fastlegeDeling';
import * as actions from '../../js/actions/oppfolgingsplan/delMedFastlege_actions';

describe('fastlegeDeling', () => {
  const initialState = deepFreeze({
    sender: false,
    sendt: false,
    sendingFeilet: false,
    data: {},
  });

  it('håndterer DELER_MED_FASTLEGE', () => {
    const action = actions.delerMedFastlege();
    const nextState = fastlegeDeling(initialState, action);
    expect(nextState).to.deep.equal({
      sender: true,
      sendt: false,
      sendingFeilet: false,
      data: {},
    });
  });

  it('håndterer DELT_MED_FASTLEGE', () => {
    const action = actions.deltMedFastlege(1);
    const nextState = fastlegeDeling(initialState, action);

    expect(nextState).to.deep.equal({
      sender: false,
      sendt: true,
      sendingFeilet: false,
      data: 1,
    });
  });

  it('håndterer DEL_MED_FASTLEGE_FEILET', () => {
    const action = actions.delMedFastlegeFeilet();
    const nextState = fastlegeDeling(initialState, action);
    expect(nextState).to.deep.equal({
      sender: false,
      sendt: false,
      sendingFeilet: true,
      data: {},
    });
  });
});
