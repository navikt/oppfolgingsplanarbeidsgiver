import { expect } from 'chai';
import { put, call } from 'redux-saga/effects';
import { post, hentSyfoapiUrl, API_NAVN } from '../../js/gateway-api/gatewayApi';
import { avbrytDialog } from '../../js/sagas/oppfolgingsplan/avbrytdialogSagas';
import * as actions from '../../js/actions/oppfolgingsplan/avbrytdialog_actions';

describe('avbrytdialogSagas', () => {
  const fnr = '12345678';
  let apiUrlBase;

  beforeEach(() => {
    apiUrlBase = hentSyfoapiUrl(API_NAVN.SYFOOPPFOLGINGSPLANSERVICE);
  });

  describe('avbrytDialog', () => {
    const generator = avbrytDialog({
      id: 1,
      fnr,
    });

    it('Skal dispatche AVBRYTER_DIALOG', () => {
      const nextPut = put({
        type: actions.AVBRYTER_DIALOG,
        fnr,
      });
      expect(generator.next().value).to.deep.equal(nextPut);
    });

    it('Skal dernest kalle resttjenesten', () => {
      const url = `${apiUrlBase}/oppfolgingsplan/actions/1/avbryt`;
      const nextCall = call(post, url);
      expect(generator.next().value).to.deep.equal(nextCall);
    });

    it('Skal dernest sette DIALOG_AVBRUTT', () => {
      const nextPut = put({
        type: actions.DIALOG_AVBRUTT,
        id: 1,
        fnr,
      });
      expect(
        generator.next({
          id: 1,
        }).value
      ).to.deep.equal(nextPut);
    });
  });
});
