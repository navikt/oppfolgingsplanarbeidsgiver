import chai from 'chai';
import {
    MND_SIDEN_SYKMELDING_GRENSE_FOR_OPPFOELGING,
} from 'oppfolgingsdialog-npm';
import {
    harOppfolgingsdialog,
} from '../../js/utils/oppfolgingsdialogUtils';
import getSykmelding from '../mock/mockSykmeldinger';

const expect = chai.expect;

const MILLISEKUNDER_PER_DAG = 86400000;

export const leggTilDagerPaaDato = (dato, dager) => {
    const nyDato = new Date(dato);
    nyDato.setTime(nyDato.getTime() + (dager * MILLISEKUNDER_PER_DAG));
    return new Date(nyDato);
};

export const leggTilMnderPaaDato = (dato, mnder) => {
    const nyDato = new Date(dato);
    nyDato.setMonth(nyDato.getMonth() + mnder);
    return new Date(nyDato);
};

export const leggTilMnderOgDagerFraDato = (dato, mnder, dager) => {
    let nyDato = new Date(dato);
    nyDato = leggTilMnderPaaDato(nyDato, mnder);
    nyDato = leggTilDagerPaaDato(nyDato, dager);
    return new Date(nyDato);
};

export const hentsykmeldingUtgaattOver4mnd = (dagensDato) => {
    return getSykmelding({
        mulighetForArbeid: {
            perioder: [
                {
                    fom: leggTilMnderPaaDato(dagensDato, -(MND_SIDEN_SYKMELDING_GRENSE_FOR_OPPFOELGING + 3)).toISOString(),
                    tom: leggTilMnderPaaDato(dagensDato, -(MND_SIDEN_SYKMELDING_GRENSE_FOR_OPPFOELGING + 2)).toISOString(),
                },
                {
                    fom: leggTilMnderPaaDato(dagensDato, -(MND_SIDEN_SYKMELDING_GRENSE_FOR_OPPFOELGING + 1)).toISOString(),
                    tom: leggTilMnderOgDagerFraDato(dagensDato, -MND_SIDEN_SYKMELDING_GRENSE_FOR_OPPFOELGING, -1).toISOString(),
                },
            ],
        },
    });
};

export const hentSykmeldingAktiv = (dagensDato) => {
    return getSykmelding({
        mulighetForArbeid: {
            perioder: [
                {
                    fom: leggTilDagerPaaDato(dagensDato, -35).toISOString(),
                    tom: leggTilDagerPaaDato(dagensDato, -5).toISOString(),
                },
                {
                    fom: leggTilDagerPaaDato(dagensDato, -5).toISOString(),
                    tom: leggTilDagerPaaDato(dagensDato, 35).toISOString(),
                },
            ],
        },
    });
};

describe('OppfolgingdialogUtils', () => {
    describe('harOppfolgingsdialog', () => {
        it('Returnerer true hvis sykmeldt har dialog', () => {
            const state = {
                oppfolgingsdialoger: {
                    data: [{ arbeidstaker: { fnr: '123' } }],
                },
            };
            const sykmeldt = {
                fnr: '123',
            };
            expect(harOppfolgingsdialog(state, sykmeldt)).to.equal(true);
        });
        it('Returnerer false hvis sykmeldt ikke har dialog', () => {
            const state = {
                oppfolgingsdialoger: {
                    data: [{ arbeidstaker: { fnr: '321' } }],
                },
            };
            const sykmeldt = {
                fnr: '123',
            };
            expect(harOppfolgingsdialog(state, sykmeldt)).to.equal(false);
        });
    });
});
