import { expect } from 'chai';
import * as actions from '../../js/actions/oppfolgingsplan/delMedFastlege_actions';

describe('delMedFastlege_actions', () => {
  let fnr;

  beforeEach(() => {
    fnr = '12345678';
  });

  it('Skal ha en delMedFastlege()-funksjon som returnerer riktig action', () => {
    expect(actions.delMedFastlege(1, fnr)).to.deep.equal({
      type: actions.DEL_MED_FASTLEGE_FORESPURT,
      id: 1,
      fnr,
    });
  });

  it('Skal ha en delerMedFastlege()-funksjon som returnerer riktig action', () => {
    expect(actions.delerMedFastlege(fnr)).to.deep.equal({
      type: actions.DELER_MED_FASTLEGE,
      fnr,
    });
  });

  it('har en deltMedFastlege()-funksjon som returnerer riktig action', () => {
    expect(actions.deltMedFastlege(1, fnr)).to.deep.equal({
      type: actions.DELT_MED_FASTLEGE,
      id: 1,
      fnr,
    });
  });

  it('Skal ha en delMedFastlegeFeilet(fnr)()-funksjon som returnerer riktig action', () => {
    expect(actions.delMedFastlegeFeilet(fnr)).to.deep.equal({
      type: actions.DEL_MED_FASTLEGE_FEILET,
      fnr,
    });
  });
});
