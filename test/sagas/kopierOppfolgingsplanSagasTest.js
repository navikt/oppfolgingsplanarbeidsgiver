import { expect } from 'chai';
import { put, call } from 'redux-saga/effects';
import { API_NAVN, hentSyfoapiUrl, post } from '../../js/gateway-api/gatewayApi';
import { kopierOppfolgingsplan } from '../../js/sagas/oppfolgingsplan/kopierOppfolgingsplanSagas';
import {
  KOPIERER_OPPFOLGINGSDIALOG,
  OPPFOLGINGSDIALOG_KOPIERT,
} from '../../js/actions/oppfolgingsplan/kopierOppfolgingsdialog_actions';

describe('kopierOppfolgingsdialogSagas', () => {
  let apiUrlBase;
  beforeEach(() => {
    apiUrlBase = hentSyfoapiUrl(API_NAVN.SYFOOPPFOLGINGSPLANSERVICE);
  });

  describe('avbrytDialog', () => {
    const generator = kopierOppfolgingsplan({
      id: 1,
    });

    it(`Skal dispatche ${KOPIERER_OPPFOLGINGSDIALOG}`, () => {
      const nextPut = put({
        type: KOPIERER_OPPFOLGINGSDIALOG,
      });
      expect(generator.next().value).to.deep.equal(nextPut);
    });

    it('Skal dernest kalle resttjenesten', () => {
      const url = `${apiUrlBase}/oppfolgingsplan/actions/1/kopier`;
      const nextCall = call(post, url);
      expect(generator.next().value).to.deep.equal(nextCall);
    });

    it(`Skal dernest sette ${OPPFOLGINGSDIALOG_KOPIERT}`, () => {
      const nextPut = put({
        type: OPPFOLGINGSDIALOG_KOPIERT,
        id: 1,
      });
      expect(generator.next(1).value).to.deep.equal(nextPut);
    });
  });
});
