import { expect } from 'chai';
import { put, call } from 'redux-saga/effects';
import { post } from 'digisyfo-npm';
import { giSamtykke } from '../../js/sagas/oppfolgingsplan/samtykkeSagas';
import * as actions from '../../js/actions/oppfolgingsplan/samtykke_actions';

describe('samtykkeSagas', () => {
    const fnr = '12345678';

    describe('giSamtykke', () => {
        const generator = giSamtykke({
            id: 1,
            samtykke: true,
            fnr,
        });

        it('Skal dispatche GIR_SAMTYKKE', () => {
            const nextPut = put({
                type: actions.GIR_SAMTYKKE,
                fnr,
            });
            expect(generator.next().value).to.deep.equal(nextPut);
        });

        it('Skal dernest kalle resttjenesten', () => {
            const url = `${process.env.REACT_APP_OPPFOELGINGSDIALOGREST_ROOT}/oppfoelgingsdialoger/actions/1/samtykke?samtykke=true`;
            const nextCall = call(post, url);
            expect(generator.next().value).to.deep.equal(nextCall);
        });

        it('Skal dernest sette SAMTYKKE_GITT', () => {
            const nextPut = put({
                type: actions.SAMTYKKE_GITT,
                id: 1,
                samtykke: true,
                fnr,
            });
            expect(generator.next().value).to.deep.equal(nextPut);
        });
    });
});
