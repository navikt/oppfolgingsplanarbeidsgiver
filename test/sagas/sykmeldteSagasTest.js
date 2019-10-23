import { expect } from 'chai';
import {
    put,
    call,
} from 'redux-saga/effects';
import {
    get,
    post,
} from '@navikt/digisyfo-npm';
import {
    hentArbeidsgiversSykmeldte,
    berikSykmeldte,
    slettSykmeldt,
} from '../../js/sagas/sykmeldteSagas';
import * as actiontyper from '../../js/actions/actiontyper';
import {
    henterSykmeldteBerikelser,
    hentSykmeldteBerikelser,
    sykmeldteBerikelserHentet,
} from '../../js/actions/sykmeldte_actions';
import * as sykmeldtActions from '../../js/actions/sykmeldt_actions';

describe('sykmeldteSagas', () => {
    beforeEach(() => {
        process.env = {
            REACT_APP_SYFOREST_ROOT: '/syforest',
        };
    });

    describe('hentSykmeldte', () => {
        const generator = hentArbeidsgiversSykmeldte();

        it('Skal dispatche HENTER_SYKMELDTE', () => {
            const nextPut = put({
                type: actiontyper.HENTER_SYKMELDTE,
            });
            expect(generator.next().value).to.deep.equal(nextPut);
        });

        it('Skal dernest hente sykmeldte', () => {
            const nextCall = call(get, `${process.env.REACT_APP_SYFOREST_ROOT}/arbeidsgiver/sykmeldte`);
            expect(generator.next().value).to.deep.equal(nextCall);
        });

        it('Skal dernest sette sykmeldte', () => {
            const nextPut = put({
                type: actiontyper.SYKMELDTE_HENTET,
                sykmeldte: [{
                    navn: 'Ole Olsen',
                    fnr: 'fnr',
                    orgnr: 'orgnr',

                }],
            });
            expect(generator.next([{
                navn: 'Ole Olsen',
                fnr: 'fnr',
                orgnr: 'orgnr',

            }]).value).to.deep.equal(nextPut);
        });
    });

    describe('berikSykmeldte', () => {
        const action1 = hentSykmeldteBerikelser(['1', '2']);
        const generator = berikSykmeldte(action1);

        it('Skal dispatche BERIKER_SYKMELDTE', () => {
            const nextPut = put(henterSykmeldteBerikelser(['1', '2']));
            expect(generator.next().value).to.deep.equal(nextPut);
        });

        it('Skal dernest berike sykmeldte', () => {
            const nextCall = call(get, `${process.env.REACT_APP_SYFOREST_ROOT}/arbeidsgiver/sykmeldte/berik?koblingsIder=1,2`);
            expect(generator.next().value).to.deep.equal(nextCall);
        });

        it('Skal dernest sette sykmeldte', () => {
            const data = [{
                koblingId: 1,
                fnr: '123',
                navn: 'Kari',
            }, {
                koblingId: 2,
                fnr: '456',
                navn: 'Ola',
            }];
            const action = sykmeldteBerikelserHentet(data);
            const nextPut = put(action);
            expect(generator.next(data).value).to.deep.equal(nextPut);
        });
    });

    describe('avkreft', () => {
        const fnr = '10101010101';
        const orgnr = '123456789';
        const generator = slettSykmeldt({
            fnr,
            orgnr,
        });

        it(`Skal dispatche ${sykmeldtActions.SLETTER_SYKMELDT}`, () => {
            const nextPut = put({
                type: sykmeldtActions.SLETTER_SYKMELDT,
            });
            expect(generator.next().value).to.deep.equal(nextPut);
        });

        it('Skal dernest slette sykmeldt', () => {
            const nextCall = call(post, `${process.env.REACT_APP_SYFOREST_ROOT}/arbeidsgiver/${fnr}/${orgnr}/actions/avkreft`);
            expect(generator.next().value).to.deep.equal(nextCall);
        });

        it(`Skal dernest dispatche ${sykmeldtActions.SYKMELDT_SLETTET}`, () => {
            const nextPut = put({
                type: sykmeldtActions.SYKMELDT_SLETTET,
                fnr,
                orgnr,
            });
            expect(generator.next().value).to.deep.equal(nextPut);
        });
    });
});
