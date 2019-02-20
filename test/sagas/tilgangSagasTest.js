import { expect } from 'chai';
import { put, call } from 'redux-saga/effects';
import { get } from 'digisyfo-npm';
import { sjekkerTilgang } from '../../js/sagas/oppfolgingsplan/tilgangSagas';
import * as actions from '../../js/actions/oppfolgingsplan/sjekkTilgang_actions';

describe('tilgangSagas', () => {
    describe('sjekkerTilgang', () => {
        beforeEach(() => {
            process.env = {
                REACT_APP_OPPFOELGINGSDIALOGREST_ROOT: '/restoppfoelgingsdialog/api',
            };
        });

        const fnr = '12345678';
        const generator = sjekkerTilgang({
            sykmeldt: {
                fnr,
            },
        });

        it('Skal dispatche SJEKKER_TILGANG', () => {
            const nextPut = put({
                type: actions.SJEKKER_TILGANG,
                fnr,
            });
            expect(generator.next().value).to.deep.equal(nextPut);
        });

        it('Skal dernest kalle resttjenesten', () => {
            const url = `${process.env.REACT_APP_OPPFOELGINGSDIALOGREST_ROOT}/tilgang?fnr=${fnr}`;
            const nextCall = call(get, url);
            expect(generator.next().value).to.deep.equal(nextCall);
        });

        it('Skal dernest sette tilgang sjekket', () => {
            const nextPut = put({
                type: actions.SJEKKET_TILGANG,
                fnr,
                data: {
                    noedata: 'noedata',
                },
            });
            expect(generator.next({
                noedata: 'noedata',
            }).value).to.deep.equal(nextPut);
        });
    });
});
