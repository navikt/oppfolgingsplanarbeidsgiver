import chai from 'chai';
import sinon from 'sinon';
import {
    erSykmeldingGyldigForOppfolgingMedGrensedato,
    finnAktiveOppfolgingsdialoger,
    harForrigeNaermesteLeder,
    harNaermesteLeder,
} from '../../js/utils/oppfolgingsplanUtils';
import {
    leggTilDagerPaaDato,
    leggTilMnderPaaDato,
    leggTilMnderOgDagerPaaDato,
} from '../mock/testUtils';
import { MND_SIDEN_SYKMELDING_GRENSE_FOR_OPPFOELGING } from '../../js/konstanter';

const expect = chai.expect;

describe('OppfolgingplanUtils', () => {
    let clock;
    const today = new Date('2017-09-28');
    today.setHours(0, 0, 0, 0);
    beforeEach(() => {
        clock = sinon.useFakeTimers(today.getTime()); // 28. september 2017
    });

    afterEach(() => {
        clock.restore();
    });

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

    describe('erSykmeldingGyldigForOppfolgingMedGrensedato', () => {
        const virksomhet = {
            virksomhetsnummer: '12345678',
        };
        const sykmeldingUtgaattOver3mnder = {
            orgnummer: virksomhet.virksomhetsnummer,
            mulighetForArbeid: {
                perioder: [
                    {
                        fom: leggTilMnderPaaDato(today, -(MND_SIDEN_SYKMELDING_GRENSE_FOR_OPPFOELGING + 3)).toISOString(),
                        tom: leggTilMnderPaaDato(today, -(MND_SIDEN_SYKMELDING_GRENSE_FOR_OPPFOELGING + 2)).toISOString(),
                    },
                    {
                        fom: leggTilMnderPaaDato(today, -(MND_SIDEN_SYKMELDING_GRENSE_FOR_OPPFOELGING + 1)).toISOString(),
                        tom: leggTilMnderOgDagerPaaDato(today, -MND_SIDEN_SYKMELDING_GRENSE_FOR_OPPFOELGING, -1).toISOString(),
                    },
                ],
            },
        };
        const sykmeldingGyldig = {
            orgnummer: virksomhet.virksomhetsnummer,
            mulighetForArbeid: {
                perioder: [
                    {
                        fom: leggTilMnderPaaDato(today, -4).toISOString(),
                        tom: leggTilMnderOgDagerPaaDato(today, -MND_SIDEN_SYKMELDING_GRENSE_FOR_OPPFOELGING, -0).toISOString(),
                    },
                    {
                        fom: leggTilMnderPaaDato(today, -5).toISOString(),
                        tom: leggTilDagerPaaDato(today, 35).toISOString(),
                    },
                ],
            },
        };

        it('skal returnere false dersom det er 1 sykmelding som ikke er ', () => {
            expect(erSykmeldingGyldigForOppfolgingMedGrensedato(sykmeldingUtgaattOver3mnder, today)).to.equal(false);
        });

        it('skal returnere true dersom det er 1 sykmelding som gyldig for oppfolging', () => {
            expect(erSykmeldingGyldigForOppfolgingMedGrensedato(sykmeldingGyldig, today)).to.equal(true);
        });
    });

    describe('finnAktiveOppfolgingsdialoger', () => {
        const gyldighetstidspunktPassert = {
            tom: new Date('2017.09.26'),
        };
        const gyldighetstidspunktIkkePassert = {
            tom: new Date('2017.12.15'),
        };
        const virksomhet = {
            virksomhetsnummer: '12345678',
        };
        const sykmeldingUtgaatt = {
            orgnummer: virksomhet.virksomhetsnummer,
            mulighetForArbeid: {
                perioder: [
                    {
                        fom: leggTilMnderPaaDato(today, -(MND_SIDEN_SYKMELDING_GRENSE_FOR_OPPFOELGING + 2)).toISOString(),
                        tom: leggTilMnderPaaDato(today, -(MND_SIDEN_SYKMELDING_GRENSE_FOR_OPPFOELGING + 1)).toISOString(),
                    },
                    {
                        fom: leggTilMnderPaaDato(today, -4).toISOString(),
                        tom: leggTilMnderOgDagerPaaDato(today, -MND_SIDEN_SYKMELDING_GRENSE_FOR_OPPFOELGING, -1).toISOString(),
                    },
                ],
            },
        };
        const sykmeldingAktiv = {
            orgnummer: virksomhet.virksomhetsnummer,
            mulighetForArbeid: {
                perioder: [
                    {
                        fom: leggTilMnderPaaDato(today, -4).toISOString(),
                        tom: leggTilMnderOgDagerPaaDato(today, -2, -28).toISOString(),
                    },
                    {
                        fom: leggTilDagerPaaDato(today, -5).toISOString(),
                        tom: leggTilDagerPaaDato(today, 35).toISOString(),
                    },
                ],
            },
        };

        it('finnAktiveOppfolgingsdialoger 1', () => {
            const dialog = [{
                godkjentPlan: null,
            }];
            expect(finnAktiveOppfolgingsdialoger(dialog)).to.have.length(1);
        });

        it('finnAktiveOppfolgingsdialoger skal returnere 1 plan, om gyldighetstidspunkt ikke er passer, om plan ikke er godkjent', () => {
            const dialog = [{
                godkjentPlan: null,
            }];
            expect(finnAktiveOppfolgingsdialoger(dialog)).to.have.length(1);
        });

        it('finnAktiveOppfolgingsdialoger skal returnere 1 plan, om gyldighetstidspunkt ikke er passert', () => {
            const dialog = [{
                godkjentPlan: {
                    gyldighetstidspunkt: gyldighetstidspunktIkkePassert,
                },
            }];
            expect(finnAktiveOppfolgingsdialoger(dialog)).to.have.length(1);
        });

        it('finnAktiveOppfolgingsdialoger skal returnere 1 plan, om gyldighetstidspunkt er passert', () => {
            const dialog = [{
                godkjentPlan: {
                    gyldighetstidspunkt: gyldighetstidspunktPassert,
                },
            }];
            expect(finnAktiveOppfolgingsdialoger(dialog)).to.have.length(0);
        });

        it('finnAktiveOppfolgingsdialoger skal returnere 1 plan, om det eksisterer en plan knyttet til gyldig sykmelding', () => {
            const sykmeldinger = [sykmeldingAktiv];
            const dialog = [{
                virksomhet,
                godkjentPlan: null,
            }];
            expect(finnAktiveOppfolgingsdialoger(dialog, sykmeldinger)).to.have.length(1);
        });

        it('finnAktiveOppfolgingsdialoger skal returnere 0 planer, om det ikke eksisterer en plan knyttet til gyldig sykmelding', () => {
            const sykmeldinger = [sykmeldingUtgaatt];
            const dialog = [{
                virksomhet,
                godkjentPlan: null,
            }];
            expect(finnAktiveOppfolgingsdialoger(dialog, sykmeldinger)).to.have.length(0);
        });

        it('finnAktiveOppfolgingsdialoger skal returnere 0 planer, om det eksisterer en godkjent plan knyttet til gyldig sykmelding', () => {
            const sykmeldinger = [sykmeldingAktiv];
            const dialog = [{
                virksomhet,
                godkjentPlan: {
                    gyldighetstidspunkt: gyldighetstidspunktPassert,
                },
            }];
            expect(finnAktiveOppfolgingsdialoger(dialog, sykmeldinger)).to.have.length(0);
        });
    });
});
