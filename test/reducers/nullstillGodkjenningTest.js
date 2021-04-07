import deepFreeze from 'deep-freeze';
import { expect } from 'chai';
import * as actions from '../../js/actions/oppfolgingsplan/nullstillGodkjenning_actions';
import nullstillGodkjenning from '../../js/reducers/nullstillGodkjenning';

describe('nullstillGodkjenning', () => {
  const initialState = deepFreeze({
    sender: false,
    sendt: false,
    sendingFeilet: false,
  });

  it('håndterer NULLSTILLER_GODKJENNING', () => {
    const action = actions.nullstillerGodkjenning();
    const nextState = nullstillGodkjenning(initialState, action);
    expect(nextState).to.deep.equal({
      sender: true,
      sendt: false,
      sendingFeilet: false,
    });
  });

  it('håndterer NULLSTILT_GODKJENNING', () => {
    const action = actions.nullstiltGodkjenning(1);
    const nextState = nullstillGodkjenning(initialState, action);

    expect(nextState).to.deep.equal({
      sender: false,
      sendt: true,
      sendingFeilet: false,
    });
  });

  it('håndterer NULLSTILL_GODKJENNING_FEILET', () => {
    const action = actions.nullstillGodkjenningFeilet();
    const nextState = nullstillGodkjenning(initialState, action);
    expect(nextState).to.deep.equal({
      sender: false,
      sendt: false,
      sendingFeilet: true,
    });
  });
});
