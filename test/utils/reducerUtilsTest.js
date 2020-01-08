import chai from 'chai';
import sinon from 'sinon';
import {
    henterEllerHarHentetKontaktinfo,
    henterEllerHarHentetForrigeNaermesteLeder,
    henterEllerHarHentetPerson,
    henterEllerHarHentetNaermesteLeder,
    henterEllerHarHentetVirksomhet,
    henterEllerHarHentetArbeidsforhold,
    finnFodselsnumreKnyttetTilDialog,
    finnUnikeElementer,
    finnOgHentArbeidsforholdSomMangler,
    finnOgHentVirksomheterSomMangler,
    finnOgHentPersonerSomMangler,
    finnOgHentKontaktinfoSomMangler,
    finnOgHentNaermesteLedereSomMangler,
    finnOgHentForrigeNaermesteLedereSomMangler,
} from '../../js/utils/reducerUtils';
import getOppfolgingsplan from '../mock/mockOppfolgingsdialog';

const expect = chai.expect;


describe('reducerUtils', () => {
    let clock;
    let oppfolgingsdialog;
    beforeEach(() => {
        const today = new Date('2017-09-28');
        today.setHours(0, 0, 0, 0);
        oppfolgingsdialog = getOppfolgingsplan();
        clock = sinon.useFakeTimers(today.getTime());
    });

    afterEach(() => {
        clock.restore();
    });


    describe('finnFodselsnumreKnyttetTilDialog', () => {
        it('Finner alle fødselsnumre fra dialogen', () => {
            const fnrSet = new Set();
            fnrSet.add('1000000000000');
            expect(finnFodselsnumreKnyttetTilDialog(oppfolgingsdialog)).to.deep.equal(fnrSet);
        });
    });

    describe('finnOgHentVirksomheterSomMangler', () => {
        it('Finner virksomheter som skal hentes og kaller hentVirksomhet', () => {
            const hentVirksomhet = sinon.spy();
            const virksomhet = {
                henter: [],
                hentet: [],
            };
            finnOgHentVirksomheterSomMangler([oppfolgingsdialog], virksomhet, hentVirksomhet);
            sinon.assert.calledOnce(hentVirksomhet);
            sinon.assert.calledWith(hentVirksomhet, '123456789');
        });
    });

    describe('', () => {
        it('Finner personer som skal hentes og kaller hentPerson', () => {
            const hentPerson = sinon.spy();
            const person = {
                henter: [],
                hentet: [],
            };
            finnOgHentPersonerSomMangler([oppfolgingsdialog], person, hentPerson);
            sinon.assert.calledOnce(hentPerson);
            sinon.assert.calledWith(hentPerson, '1000000000000');
        });
    });

    describe('finnOgHentKontaktinfoSomMangler', () => {
        it('Finner personer som skal hentes og kaller hentPerson', () => {
            const hentKontaktinfo = sinon.spy();
            const kontaktinfo = {
                henter: [],
                hentet: [],
            };
            finnOgHentKontaktinfoSomMangler([oppfolgingsdialog], kontaktinfo, hentKontaktinfo);
            sinon.assert.calledOnce(hentKontaktinfo);
            sinon.assert.calledWith(hentKontaktinfo, '1000000000000');
        });
    });

    describe('finnOgHentNaermesteLedereSomMangler', () => {
        it('Finner naermesteledere som skal hentes og kaller hentNaermesteLeder', () => {
            const hentNaermesteLeder = sinon.spy();
            const naermesteleder = {
                henter: [],
                hentet: [],
            };
            finnOgHentNaermesteLedereSomMangler([oppfolgingsdialog], naermesteleder, hentNaermesteLeder);
            sinon.assert.calledOnce(hentNaermesteLeder);
            sinon.assert.calledWith(hentNaermesteLeder, '1000000000000', '123456789');
        });
    });

    describe('finnOgHentForrigeNaermesteLedereSomMangler', () => {
        it('Finner forrige naermesteledere som skal hentes og kaller hentForrigeNaermesteLeder', () => {
            const hentForrigeNaermesteLeder = sinon.spy();
            const forrigenaermesteleder = {
                henter: [],
                hentet: [],
            };
            finnOgHentForrigeNaermesteLedereSomMangler([oppfolgingsdialog], forrigenaermesteleder, hentForrigeNaermesteLeder);
            sinon.assert.calledOnce(hentForrigeNaermesteLeder);
            sinon.assert.calledWith(hentForrigeNaermesteLeder, '1000000000000', '123456789');
        });
    });

    describe('finnOgHentForrigeNaermesteLedereSomMangler', () => {
        it('Finner arbeidsforhold som skal hentes og kaller hentArbeidsforhold', () => {
            const hentArbeidsforhold = sinon.spy();
            const arbeidsforhold = {
                henter: [],
                hentet: [],
            };
            finnOgHentArbeidsforholdSomMangler([oppfolgingsdialog], arbeidsforhold, hentArbeidsforhold);
            sinon.assert.calledOnce(hentArbeidsforhold);
            sinon.assert.calledWith(hentArbeidsforhold, '1000000000000', '123456789');
        });
    });

    describe('finnUnikeElementer', () => {
        it('finnUnikeElementer returnerer Set med unike elementer', () => {
            const liste = [1, 1, 1, 2, 2, 3, 4, 5, 5];
            const set = new Set([1, 2, 3, 4, 5]);
            expect(finnUnikeElementer(liste)).to.deep.equal(set);
        });
    });

    describe('henterEllerHarHentetKontaktinfo', () => {
        it('Finner kontaktinfo når det hentes', () => {
            const kontaktinfo = {
                henter: ['123'],
                hentet: ['321'],
            };
            expect(henterEllerHarHentetKontaktinfo('123', kontaktinfo)).to.deep.equal(true);
        });
        it('Finner kontaktinfo når det ikke er hentet eller hentes', () => {
            const kontaktinfo = {
                henter: ['321'],
                hentet: [],
            };
            expect(henterEllerHarHentetKontaktinfo('123', kontaktinfo)).to.deep.equal(false);
        });
    });

    describe('henterEllerHarHentetVirksomhet', () => {
        it('Finner virksomhet når det hentes', () => {
            const virksomhet = {
                henter: ['123'],
                hentet: ['321'],
            };
            expect(henterEllerHarHentetVirksomhet('123', virksomhet)).to.deep.equal(true);
        });
        it('Finner virksomhet når det er hentet', () => {
            const virksomhet = {
                henter: ['321'],
                hentet: ['123'],
            };
            expect(henterEllerHarHentetVirksomhet('123', virksomhet)).to.deep.equal(true);
        });
        it('Finner virksomhet når det ikke er hentet eller hentes', () => {
            const virksomhet = {
                henter: ['321'],
                hentet: [],
            };
            expect(henterEllerHarHentetVirksomhet('123', virksomhet)).to.deep.equal(false);
        });
    });

    describe('henterEllerHarHentetPerson', () => {
        it('Finner person når det hentes', () => {
            const person = {
                henter: ['123'],
                hentet: ['321'],
            };
            expect(henterEllerHarHentetPerson('123', person)).to.deep.equal(true);
        });
        it('Finner person når det er hentet', () => {
            const person = {
                henter: ['321'],
                hentet: ['123'],
            };
            expect(henterEllerHarHentetPerson('123', person)).to.deep.equal(true);
        });
        it('Finner person når det ikke er hentet eller hentes', () => {
            const person = {
                henter: ['321'],
                hentet: [],
            };
            expect(henterEllerHarHentetPerson('123', person)).to.deep.equal(false);
        });
    });

    describe('henterEllerHarHentetForrigeNaermesteLeder', () => {
        it('Finner forrigenaermesteleder når det hentes', () => {
            const forrigenaermesteleder = {
                henter: [{ fnr: '123', virksomhetsnummer: 'virksomhetsnummer' }],
                hentet: [{ fnr: '321', virksomhetsnummer: 'virksomhetsnummer' }],
            };
            expect(henterEllerHarHentetForrigeNaermesteLeder('123', 'virksomhetsnummer', forrigenaermesteleder)).to.deep.equal(true);
        });
        it('Finner forrigenaermesteleder når det er hentet', () => {
            const forrigenaermesteleder = {
                henter: [{ fnr: '321', virksomhetsnummer: 'virksomhetsnummer' }],
                hentet: [{ fnr: '123', virksomhetsnummer: 'virksomhetsnummer' }],
            };
            expect(henterEllerHarHentetForrigeNaermesteLeder('123', 'virksomhetsnummer', forrigenaermesteleder)).to.deep.equal(true);
        });
        it('Finner forrigenaermesteleder når det ikke er hentet eller hentes', () => {
            const forrigenaermesteleder = {
                henter: [{ fnr: '321', virksomhetsnummer: 'virksomhetsnummer' }],
                hentet: [],
            };
            expect(henterEllerHarHentetForrigeNaermesteLeder('123', 'virksomhetsnummer', forrigenaermesteleder)).to.deep.equal(false);
        });
    });

    describe('henterEllerHarHentetArbeidsforhold', () => {
        it('Finner arbeidsforhold når det hentes', () => {
            const arbeidsforhold = {
                henter: [{ fnr: '123', virksomhetsnummer: 'virksomhetsnummer' }],
                hentet: [{ fnr: '321', virksomhetsnummer: 'virksomhetsnummer' }],
            };
            expect(henterEllerHarHentetArbeidsforhold('123', 'virksomhetsnummer', arbeidsforhold)).to.deep.equal(true);
        });
        it('Finner arbeidsforhold når det er hentet', () => {
            const arbeidsforhold = {
                henter: [{ fnr: '321', virksomhetsnummer: 'virksomhetsnummer' }],
                hentet: [{ fnr: '123', virksomhetsnummer: 'virksomhetsnummer' }],
            };
            expect(henterEllerHarHentetArbeidsforhold('123', 'virksomhetsnummer', arbeidsforhold)).to.deep.equal(true);
        });
        it('Finner arbeidsforhold når det ikke er hentet eller hentes', () => {
            const arbeidsforhold = {
                henter: [{ fnr: '321', virksomhetsnummer: 'virksomhetsnummer' }],
                hentet: [],
            };
            expect(henterEllerHarHentetArbeidsforhold('123', 'virksomhetsnummer', arbeidsforhold)).to.deep.equal(false);
        });
    });

    describe('henterEllerHarHentetNaermesteLeder', () => {
        it('Finner naermesteleder når det hentes', () => {
            const naermesteleder = {
                henter: [{ fnr: '123', virksomhetsnummer: 'virksomhetsnummer' }],
                hentet: [{ fnr: '321', virksomhetsnummer: 'virksomhetsnummer' }],
            };
            expect(henterEllerHarHentetNaermesteLeder('123', 'virksomhetsnummer', naermesteleder)).to.deep.equal(true);
        });
        it('Finner naermesteleder når det er hentet', () => {
            const naermesteleder = {
                henter: [{ fnr: '321', virksomhetsnummer: 'virksomhetsnummer' }],
                hentet: [{ fnr: '123', virksomhetsnummer: 'virksomhetsnummer' }],
            };
            expect(henterEllerHarHentetNaermesteLeder('123', 'virksomhetsnummer', naermesteleder)).to.deep.equal(true);
        });
        it('Finner naermesteleder når det ikke er hentet eller hentes', () => {
            const naermesteleder = {
                henter: [{ fnr: '321', virksomhetsnummer: 'virksomhetsnummer' }],
                hentet: [],
            };
            expect(henterEllerHarHentetNaermesteLeder('123', 'virksomhetsnummer', naermesteleder)).to.deep.equal(false);
        });
    });
});
