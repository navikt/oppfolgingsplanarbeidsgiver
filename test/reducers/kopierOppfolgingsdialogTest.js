import { expect } from 'chai';
import deepFreeze from 'deep-freeze';
import * as actions from '../../js/actions/oppfolgingsplan/kopierOppfolgingsdialog_actions';
import kopierOppfolgingsdialog from '../../js/reducers/kopierOppfolgingsdialog';

describe('kopierOppfolgingsdialog', () => {
  const initialState = deepFreeze({
    data: {},
    sender: false,
    sendt: false,
    sendingFeilet: false,
  });

  it('håndterer KOPIERER_OPPFOLGINGSDIALOG', () => {
    const action = actions.kopiererOppfolgingsdialog();
    const nextState = kopierOppfolgingsdialog(initialState, action);
    expect(nextState).to.deep.equal({
      data: null,
      sender: true,
      sendt: false,
      sendingFeilet: false,
    });
  });

  it('håndterer OPPFOLGINGSDIALOG_KOPIERT', () => {
    const action = actions.oppfolgingsdialogKopiert(1);
    const nextState = kopierOppfolgingsdialog(initialState, action);
    expect(nextState).to.deep.equal({
      data: 1,
      sender: false,
      sendt: true,
      sendingFeilet: false,
    });
  });

  it('håndterer KOPIER_OPPFOLGINGSDIALOG_FEILET', () => {
    const action = actions.kopierOppfolgingsdialogFeilet();
    const nextState = kopierOppfolgingsdialog(initialState, action);
    expect(nextState).to.deep.equal({
      data: {},
      sender: false,
      sendt: false,
      sendingFeilet: true,
    });
  });
});
