import chai from 'chai';
import {
    harForrigeNaermesteLeder,
    harNaermesteLeder,
} from '../../js/utils/oppfolgingsdialogUtils';

const expect = chai.expect;

describe('OppfolgingdialogUtils', () => {
    describe('harForrigeNaermesteLeder', () => {
        const forrigeNaermesteLeder = {};
        it('Skal returnere forrigeNaermesteLeder', () => {
            const res = harForrigeNaermesteLeder({
                arbeidsgiver: {
                    forrigeNaermesteLeder,
                },
            });
            expect(res).to.deep.equal(forrigeNaermesteLeder);
        });
    });

    describe('harNaermesteLeder', () => {
        it('Skal returnere naermesteLeder fnr', () => {
            const fnr = '1234';
            const res = harNaermesteLeder({
                arbeidsgiver: {
                    naermesteLeder: {
                        fnr,
                    },
                },
            });
            expect(res).to.equal(fnr);
        });
    });
});
