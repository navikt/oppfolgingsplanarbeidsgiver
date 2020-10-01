import chai from 'chai';
import React from 'react';
import { shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import { Utvidbar } from '@navikt/digisyfo-npm';
import GodkjennPlanOversiktInformasjon, {
    InformasjonPanelOverskrift,
    InformasjonPanelSykmeldt,
    InformasjonPanelArbeidsgiver,
    InformasjonPanelArbeidsoppgaver,
    InformasjonPanelArbeidsoppgaverEtterGjennomfoering,
    InformasjonPanelTiltak,
    InformasjonPanelSykeforlopsPerioder,
} from '../../../../js/components/oppfolgingsdialog/godkjennplan/GodkjennPlanOversiktInformasjon';
import getOppfolgingsplan from '../../../mock/mockOppfolgingsdialog';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe('GodkjennPlanOversiktInformasjon', () => {
    const oppfolgingsdialog = getOppfolgingsplan({
        arbeidsgiver: {
            naermesteLeder: {
                navn: 'Test Testesen',
                fnr: '1000042149824',
                samtykke: false,
                godkjent: false,
                epost: 'frode@bjelland.no',
                tlf: '81549300',
            },
        },
        arbeidstaker: {
            navn: 'Test Testesen',
            fnr: '1000042149824',
            samtykke: false,
            godkjent: false,
            epost: 'test@testesen.no',
            tlf: '81549300',
            stillinger: [],
            sykeforlopsPerioder: [{
                fom: '1.1.2017',
                tom: '2.1.2017',
                grad: 100,
                aktivitet: 'Test aktivitet',
            }],
        },
    });

    const komponentDefault = shallow(<GodkjennPlanOversiktInformasjon
        oppfolgingsdialog={oppfolgingsdialog}
    />);

    it('Skal vise en GodkjennPlanOversiktInformasjon', () => {
        expect(komponentDefault.find('div.godkjennPlanOversiktInformasjon')).to.have.length(1);
    });

    it('Skal vise et InformasjonPanelOverskrift', () => {
        expect(komponentDefault.find(InformasjonPanelOverskrift)).to.have.length(1);
    });

    it('Skal vise et InformasjonPanelSykmeldt', () => {
        expect(komponentDefault.find(InformasjonPanelSykmeldt)).to.have.length(1);
    });

    it('Skal vise et InformasjonPanelArbeidsgiver', () => {
        expect(komponentDefault.find(InformasjonPanelArbeidsgiver)).to.have.length(1);
    });

    it('Skal vise et InformasjonPanelArbeidsoppgaver', () => {
        expect(komponentDefault.find(InformasjonPanelArbeidsoppgaver)).to.have.length(1);
    });

    it('Skal vise et InformasjonPanelTiltak', () => {
        expect(komponentDefault.find(InformasjonPanelTiltak)).to.have.length(1);
    });

    it('Skal vise et InformasjonPanelSykeforlopsPerioder', () => {
        expect(komponentDefault.find(InformasjonPanelSykeforlopsPerioder)).to.have.length(1);
    });

    describe('InformasjonPanelOverskrift', () => {
        const komponent = shallow(<InformasjonPanelOverskrift oppfolgingsdialog={oppfolgingsdialog} />);

        it('Skal vise en InformasjonPanelOverskrift', () => {
            expect(komponent.find('div.godkjennPlanOversiktInformasjon__panel')).to.have.length(1);
        });

        it('Skal vise en Overskrift', () => {
            expect(komponent.find('h2')).to.have.length(1);
        });

        it('Skal vise en Undertekst', () => {
            expect(komponent.find('p')).to.have.length(1);
        });
    });

    describe('InformasjonPanelSykmeldt', () => {
        const komponent = shallow(<InformasjonPanelSykmeldt
            arbeidstaker={oppfolgingsdialog.arbeidstaker}
            virksomhetsnummer={oppfolgingsdialog.virksomhetsnummer}
        />);

        it('Skal vise en div', () => {
            expect(komponent.find('div.informasjonPanel')).to.have.length(1);
        });

        it('Skal vise Felter med informasjon', () => {
            expect(komponent.find('dl.godkjennPlanOversiktInformasjon__panel__info')).to.have.length(1);
            expect(komponent.find('dt')).to.have.length(4);
            expect(komponent.find('dd')).to.have.length(4);
        });
    });

    describe('InformasjonPanelArbeidsgiver', () => {
        const komponent = shallow(<InformasjonPanelArbeidsgiver
            naermesteLeder={oppfolgingsdialog.arbeidsgiver.naermesteLeder}
            virksomhet={oppfolgingsdialog.virksomhet}
        />);

        it('Skal vise en div', () => {
            expect(komponent.find('div.informasjonPanel')).to.have.length(1);
        });

        it('Skal vise Felter med informasjon', () => {
            expect(komponent.find('dl.godkjennPlanOversiktInformasjon__panel__info')).to.have.length(1);
            expect(komponent.find('dt')).to.have.length(5);
            expect(komponent.find('dd')).to.have.length(5);
        });
    });

    describe('InformasjonPanelArbeidsoppgaver', () => {
        const komponent = shallow(<InformasjonPanelArbeidsoppgaver arbeidsoppgaver={oppfolgingsdialog.arbeidsoppgaveListe} />);

        it('Skal vise en InformasjonPanelArbeidsoppgaverEtterGjennomfoering, dersom det er 1 arbeidsoppgaver som KAN gjennomfoeres', () => {
            expect(komponent.find(InformasjonPanelArbeidsoppgaverEtterGjennomfoering)).to.have.length(1);
        });
    });

    describe('InformasjonPanelArbeidsoppgaverEtterGjennomfoering', () => {
        const arbeidsoppgaveListe = oppfolgingsdialog.arbeidsoppgaveListe;
        const komponent = shallow(<InformasjonPanelArbeidsoppgaverEtterGjennomfoering
            oppfolgingsdialog={oppfolgingsdialog}
            arbeidsoppgaver={arbeidsoppgaveListe}
            arbeidsgiver={oppfolgingsdialog.arbeidsgiver}
        />);

        it('Skal vise en tittel', () => {
            expect(komponent.find('div.godkjennPlanOversiktInformasjon__panel__gjennomfoering')).to.have.length(1);
        });

        it('Skal vise en div med informasjon per Arbeidsoppgave', () => {
            expect(komponent.find('div.godkjennPlanOversiktInformasjon__panel__arbeidsoppgave')).to.have.length(arbeidsoppgaveListe.length);
        });
    });

    describe('InformasjonPanelTiltak', () => {
        const tiltakListe = oppfolgingsdialog.tiltakListe;
        const komponent = shallow(<InformasjonPanelTiltak tiltakListe={tiltakListe} />);

        it('Skal vise en div med informasjon per Tiltak', () => {
            expect(komponent.find('div.godkjennPlanOversiktInfo__panel__tiltak')).to.have.length(tiltakListe.length);
        });
    });
});
