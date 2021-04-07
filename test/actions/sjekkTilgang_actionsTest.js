import { expect } from 'chai';
import * as actions from '../../js/actions/oppfolgingsplan/sjekkTilgang_actions';

describe('sjekkTilgang_actions', () => {
  let sykmeldt;
  let fnr;

  beforeEach(() => {
    fnr = '12345678';
    sykmeldt = { fnr };
  });

  it('Skal ha en sjekkTilgang()-funksjon som returnerer riktig action', () => {
    expect(actions.sjekkTilgang(sykmeldt)).to.deep.equal({
      type: actions.SJEKK_TILGANG_FORESPURT,
      sykmeldt,
    });
  });

  it('Skal ha en sjekkerTilgang()-funksjon som returnerer riktig action', () => {
    expect(actions.sjekkerTilgang(fnr)).to.deep.equal({
      type: actions.SJEKKER_TILGANG,
      fnr,
    });
  });

  it('har en sjekketTilgang()-funksjon som returnerer riktig action', () => {
    expect(actions.sjekketTilgang([{ tilgang: 'tilgang' }], fnr)).to.deep.equal({
      type: actions.SJEKKET_TILGANG,
      data: [{ tilgang: 'tilgang' }],
      fnr,
    });
  });

  it('Skal ha en sjekkTilgangFeilet()-funksjon som returnerer riktig action', () => {
    expect(actions.sjekkTilgangFeilet(fnr)).to.deep.equal({
      type: actions.SJEKK_TILGANG_FEILET,
      fnr,
    });
  });
});
