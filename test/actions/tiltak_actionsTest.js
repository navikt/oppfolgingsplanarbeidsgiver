import { expect } from 'chai';
import * as actions from '../../js/actions/oppfolgingsplan/tiltak_actions';

describe('tiltak_actions', () => {
  const fnr = '12345678';
  const tiltakId = 1;

  it('Skal ha en lagreTiltak()-funksjon som returnerer riktig action', () => {
    expect(actions.lagreTiltak('id', {}, fnr)).to.deep.equal({
      type: actions.LAGRE_TILTAK_FORESPURT,
      id: 'id',
      tiltak: {},
      fnr,
    });
  });

  it('Skal ha en lagrerTiltak()-funksjon som returnerer riktig action', () => {
    expect(actions.lagrerTiltak(fnr, 1)).to.deep.equal({
      type: actions.LAGRER_TILTAK,
      fnr,
      tiltakId,
    });
  });

  it('har en tiltakLagret()-funksjon som returnerer riktig action', () => {
    expect(actions.tiltakLagret(1, {}, { noedata: 'test' }, fnr)).to.deep.equal({
      type: actions.TILTAK_LAGRET,
      data: {},
      id: 1,
      tiltak: { noedata: 'test' },
      fnr,
    });
  });

  it('Skal ha en lagreTiltakFeilet()-funksjon som returnerer riktig action', () => {
    expect(actions.lagreTiltakFeilet(fnr, 1)).to.deep.equal({
      type: actions.LAGRE_TILTAK_FEILET,
      fnr,
      tiltak: 1,
    });
  });

  it('Skal ha en slettTiltak()-funksjon som returnerer riktig action', () => {
    expect(actions.slettTiltak('123', '321', fnr)).to.deep.equal({
      type: actions.SLETT_TILTAK_FORESPURT,
      id: '123',
      tiltakId: '321',
      fnr,
    });
  });

  it('Skal ha en sletterTiltak()-funksjon som returnerer riktig action', () => {
    expect(actions.sletterTiltak(fnr)).to.deep.equal({
      type: actions.SLETTER_TILTAK,
      fnr,
    });
  });

  it('har en tiltakSlettet()-funksjon som returnerer riktig action', () => {
    expect(actions.tiltakSlettet('123', '312', fnr)).to.deep.equal({
      type: actions.TILTAK_SLETTET,
      id: '123',
      tiltakId: '312',
      fnr,
    });
  });

  it('Skal ha en slettTiltakFeilet()-funksjon som returnerer riktig action', () => {
    expect(actions.slettTiltakFeilet(fnr, 1)).to.deep.equal({
      type: actions.SLETT_TILTAK_FEILET,
      fnr,
      tiltakId: 1,
    });
  });
});
