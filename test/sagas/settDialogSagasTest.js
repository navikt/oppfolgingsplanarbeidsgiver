import { expect } from 'chai';
import { put, call } from 'redux-saga/effects';
import {
    API_NAVN,
    hentSyfoapiUrl,
    post,
} from '../../js/gateway-api/gatewayApi';
import { settDialoger } from '../../js/sagas/oppfolgingsplan/settDialogSagas';
import * as actions from '../../js/actions/oppfolgingsplan/sett_actions';

describe('settDialogSagas', () => {
    let apiUrlBase;

    beforeEach(() => {
        apiUrlBase = hentSyfoapiUrl(API_NAVN.SYFOOPPFOLGINGSPLANSERVICE);
    });

    describe('settDialoger', () => {
        const generator = settDialoger({
            id: 1,
        });

        it(`Skal dispatche ${actions.SETTER_SETT_DIALOG}`, () => {
            const nextPut = put({
                type: actions.SETTER_SETT_DIALOG,
            });
            expect(generator.next().value).to.deep.equal(nextPut);
        });

        it('Skal dernest kalle resttjenesten', () => {
            const url = `${apiUrlBase}/oppfolgingsplan/actions/1/sett`;
            const nextCall = call(post, url);
            expect(generator.next().value).to.deep.equal(nextCall);
        });

        it(`Skal dernest sette ${actions.DIALOG_SETT}`, () => {
            const nextPut = put({
                type: actions.DIALOG_SETT,
                id: 1,
            });
            expect(generator.next().value).to.deep.equal(nextPut);
        });
    });
});
