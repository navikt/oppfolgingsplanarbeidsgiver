import React from 'react';
import PropTypes from 'prop-types';
import { HjelpetekstUnderVenstre } from 'nav-frontend-hjelpetekst';
import {
    toDatePrettyPrint,
    Utvidbar,
} from '@navikt/digisyfo-npm';
import { KANGJENNOMFOERES, STATUS_TILTAK } from '../../../konstanter';
import { toDateMedMaanedNavn } from '../../../utils/datoUtils';
import { capitalizeFirstLetter } from '../../../utils/tekstUtils';
import { slaaSammenPerioder } from '../../../utils/periodeUtils';
import { sorterTiltakerEtterStatus } from '../../../utils/tiltakUtils';
import { sorterArbeidsoppgaverEtterOpprettet } from '../../../utils/arbeidsoppgaveUtils';
import {
    arbeidsoppgavePt,
    oppfolgingsplanPt,
    personPt,
    stillingPt,
    tiltakPt,
} from '../../../proptypes/opproptypes';
import { periodePt } from '../../../proptypes/periodeProptypes';

const texts = {
    informasjonPanelOverskrift: {
        title: 'Oppfølgingsplan',
    },
    informasjonPanelArbeidsgiver: {
        title: 'Arbeidsgiverens kontaktinformasjon',
        labels: {
            virksomhetsnummer: 'Organisasjonsnummer',
            name: 'Navn på nærmeste leder',
            telephone: 'Telefonnummer',
            email: 'E-post',
        },
    },
    informasjonPanelTiltak: {
        title: 'Tiltak',
        status: {
            avtalt: 'Avtalt',
            ikkeAktuelt: 'Ikke aktuelt',
            foreslatt: 'Foreslått',
        },
    },
    informasjonPanelSykmeldt: {
        title: 'Den sykmeldtes kontaktinformasjon',
        labels: {
            fnr: 'Fødselsnummer',
            name: 'Navn',
            telephone: 'Telefonnummer',
            email: 'E-post',
            stilling: 'Stilling',
        },
    },
    informasjonPanelArbeidsoppgaverEtterGjennomfoering: {
        titles: {
            kan: 'Arbeidsoppgaver som kan gjøres',
            tilrettelegging: 'Arbeidsoppgaver som kan gjøres med tilrettelegging',
            kanIkke: 'Arbeidsoppgaver som ikke kan gjøres',
            ikkeVurdert: 'Arbeidsoppgaver som ikke er blitt vurdert',
        },
        labels: {
            sted: 'Fra annet sted',
            tid: 'Med mer tid',
            hjelp: 'Med hjelp/hjelpemiddel',
        },
    },
    informasjonPanelSykeforlopsPerioder: {
        title: 'Informasjon fra dette sykefraværet',
        hjelpetekst: 'Ett sykefravær kan bestå av flere perioder hvis det er mindre enn 16 dager mellom dem. Har det gått mer enn 16 dager, regnes det som et nytt sykefravær.',
        sykmeldingprosentLabel: 'Sykmeldingsprosent',
    },
    sykeforlopsPeriode: {
        grad: 'sykmeldt',
        gradReisetilskudd: 'sykmeldt med reisetilskudd',
        behandlingsdager: 'Behandlingsdag(er)',
        reisetilskudd: 'Reisetilskudd',
        avventende: 'Avventende sykmelding',
    },
    tiltakBeskrivelse: {
        label: 'Beskrivelse',
    },
    tiltakOppfoelging: {
        label: 'OPPFØLGING OG GJENNOMFØRING',
    },
    tiltakBeskrivelseIkkeAktuelt: {
        label: 'ARBEIDSGIVERS VURDERING',
    },
    tiltakForeslaattAv: {
        label: 'FORESLÅTT AV',
    },
};
const textInformasjonPanelOverskriftParagraph = (arbeidstaker, leader) => {
    return `Mellom ${arbeidstaker} og ${leader}`;
};

export const InformasjonPanelOverskrift = ({ oppfolgingsdialog }) => {
    return (
        <div className="panel godkjennPlanOversiktInformasjon__panel">
            <h2>{texts.informasjonPanelOverskrift.title}</h2>
            <p>
                {textInformasjonPanelOverskriftParagraph(oppfolgingsdialog.arbeidstaker.navn, oppfolgingsdialog.arbeidsgiver.naermesteLeder.navn)}
            </p>
        </div>
    );
};
InformasjonPanelOverskrift.propTypes = {
    oppfolgingsdialog: oppfolgingsplanPt,
};

export const InformasjonPanelArbeidsgiver = ({ naermesteLeder, virksomhetsnummer }) => {
    return (
        <Utvidbar className="informasjonPanelUtvidbar" tittel={texts.informasjonPanelArbeidsgiver.title}>
            <dl className="godkjennPlanOversiktInformasjon__panel__info">
                <dt>{texts.informasjonPanelArbeidsgiver.labels.virksomhetsnummer}</dt>
                <dd>{virksomhetsnummer}</dd>

                {naermesteLeder && [
                    <dt key={0}>{texts.informasjonPanelArbeidsgiver.labels.name}</dt>,
                    <dd key={1}>{naermesteLeder.navn}</dd>,

                    naermesteLeder.tlf &&
                    <div key={2}>
                        <dt>{texts.informasjonPanelArbeidsgiver.labels.telephone}</dt>
                        <dd>{naermesteLeder.tlf}</dd>
                    </div>,

                    naermesteLeder.epost &&
                    <div key={3}>
                        <dt>{texts.informasjonPanelArbeidsgiver.labels.email}</dt>
                        <dd>{naermesteLeder.epost}</dd>
                    </div>,
                ]}
            </dl>
        </Utvidbar>
    );
};
InformasjonPanelArbeidsgiver.propTypes = {
    naermesteLeder: personPt,
    virksomhetsnummer: PropTypes.string,
};

export const RenderStilling = ({ stilling }) => {
    return (<p>{capitalizeFirstLetter(stilling.yrke.toLowerCase())}: {stilling.prosent}%</p>);
};

RenderStilling.propTypes = {
    stilling: stillingPt,
};

export const InformasjonPanelSykmeldt = ({ arbeidstaker }) => {
    return (
        <Utvidbar className="informasjonPanelUtvidbar" tittel={texts.informasjonPanelSykmeldt.title}>
            <dl className="godkjennPlanOversiktInformasjon__panel__info">
                <dt>{texts.informasjonPanelSykmeldt.labels.fnr}</dt>
                <dd>{arbeidstaker.fnr}</dd>

                <dt>{texts.informasjonPanelSykmeldt.labels.name}</dt>
                <dd>{arbeidstaker.navn}</dd>
                { arbeidstaker.tlf &&
                <div>
                    <dt>{texts.informasjonPanelSykmeldt.labels.telephone}</dt>
                    <dd>{arbeidstaker.tlf}</dd>
                </div>
                }
                { arbeidstaker.epost &&
                <div>
                    <dt>{texts.informasjonPanelSykmeldt.labels.email}</dt>
                    <dd>{arbeidstaker.epost}</dd>
                </div>
                }
                { arbeidstaker.stillinger.length > 0 &&
                <div>
                    <dt>{texts.informasjonPanelSykmeldt.labels.stilling}</dt>
                    { arbeidstaker.stillinger.map((stilling, idx) => {
                        if (stilling.prosent > -1) {
                            return (<RenderStilling stilling={stilling} key={idx} />);
                        } return (null);
                    })
                    }
                </div>
                }
            </dl>
        </Utvidbar>
    );
};
InformasjonPanelSykmeldt.propTypes = {
    arbeidstaker: personPt,
};

export const SykeforlopsPeriode = ({ periode, antallDager }) => {
    return (
        <div>
            <p>
                <strong>{toDatePrettyPrint(periode.fom)} &ndash; {toDatePrettyPrint(periode.tom)} &bull; </strong>
                {antallDager} dager
            </p>
            {
                periode.grad ? <p>
                    {periode.grad} &#37; {' '}
                    {periode.reisetilskudd && (periode.grad > 0 && periode.grad < 100)
                        ? texts.sykeforlopsPeriode.gradReisetilskudd
                        : texts.sykeforlopsPeriode.grad}
                </p> : null
            }
            {
                periode.behandlingsdager ? <p>
                    {texts.sykeforlopsPeriode.behandlingsdager}
                </p> : null
            }
            {
                (periode.reisetilskudd === true && periode.grad === 0) ? <p>
                    {texts.sykeforlopsPeriode.reisetilskudd}
                </p> : null
            }
            {
                periode.avventende !== null ? <p>
                    {texts.sykeforlopsPeriode.avventende}
                </p> : null
            }
        </div>
    );
};
SykeforlopsPeriode.propTypes = {
    periode: periodePt,
    antallDager: PropTypes.number,
};

export const InformasjonPanelSykeforlopsPerioder = ({ arbeidstaker }) => {
    return (
        <div className="panel godkjennPlanOversiktInformasjon__panel">
            <div className="godkjennPlanOversiktInformasjon__panel__header--sykeforlopsperioder">
                <h3>{texts.informasjonPanelSykeforlopsPerioder.title}</h3>
                <HjelpetekstUnderVenstre>
                    {texts.informasjonPanelSykeforlopsPerioder.hjelpetekst}
                </HjelpetekstUnderVenstre>
            </div>
            <dl className="godkjennPlanOversiktInformasjon__panel__info">
                <dt>{texts.informasjonPanelSykeforlopsPerioder.sykmeldingprosentLabel}</dt>
                {
                    slaaSammenPerioder(arbeidstaker.sykeforlopsPerioder).map((periode, idx) => {
                        const antallDager = ((new Date(periode.tom) - new Date(periode.fom)) / 86400000) + 1;
                        return (
                            <dd key={idx}>
                                <SykeforlopsPeriode periode={periode} antallDager={antallDager} />
                            </dd>
                        );
                    })
                }
            </dl>
        </div>
    );
};
InformasjonPanelSykeforlopsPerioder.propTypes = {
    arbeidstaker: personPt,
};

export const InformasjonPanelArbeidsoppgaverEtterGjennomfoering = ({ oppfolgingsdialog, arbeidsoppgaver, type, tittel, rootUrl }) => {
    let hentPanelType;
    let imgUrl;
    switch (type) {
        case KANGJENNOMFOERES.KAN:
            hentPanelType = 'oppfolgingsplanLapp--groenn';
            imgUrl = `${rootUrl}/img/svg/hake-groenn--lys.svg`;
            break;
        case KANGJENNOMFOERES.TILRETTELEGGING:
            hentPanelType = 'oppfolgingsplanLapp--gul';
            imgUrl = `${rootUrl}/img/svg/hake-oransje.svg`;
            break;
        case KANGJENNOMFOERES.KAN_IKKE:
            hentPanelType = 'oppfolgingsplanLapp--roed';
            imgUrl = `${rootUrl}/img/svg/kryss-roed.svg`;
            break;
        default:
            hentPanelType = 'oppfolgingsplanLapp--graa';
            imgUrl = `${rootUrl}/img/svg/varseltrekant.svg`;
            break;
    }
    const arbeidstaker = oppfolgingsdialog.arbeidstaker;
    return (
        <div>
            { arbeidsoppgaver.length > 0 &&
            <div className="godkjennPlanOversiktInformasjon__panel__gjennomfoering">
                <img alt="" src={imgUrl} />
                <h3>{tittel}</h3>
            </div>
            }
            {
                arbeidsoppgaver.map((arbeidsoppgave, idx) => {
                    return (
                        <div className={`godkjennPlanOversiktInformasjon__panel__arbeidsoppgave ${hentPanelType}`} key={idx}>
                            <h4>
                                {arbeidsoppgave.arbeidsoppgavenavn}
                            </h4>
                            { type === KANGJENNOMFOERES.TILRETTELEGGING &&
                            <div className="arbeidsoppgave__tilrettelegging">
                                { arbeidsoppgave.gjennomfoering.paaAnnetSted &&
                                <span>
                                    {texts.informasjonPanelArbeidsoppgaverEtterGjennomfoering.labels.sted}
                                </span>
                                }
                                { arbeidsoppgave.gjennomfoering.medMerTid &&
                                <span>
                                    {texts.informasjonPanelArbeidsoppgaverEtterGjennomfoering.labels.tid}
                                </span>
                                }
                                { arbeidsoppgave.gjennomfoering.medHjelp &&
                                <span>
                                    {texts.informasjonPanelArbeidsoppgaverEtterGjennomfoering.labels.hjelp}
                                </span>
                                }
                            </div>
                            }
                            { type !== KANGJENNOMFOERES.KAN && type !== KANGJENNOMFOERES.IKKE_VURDERT && arbeidstaker && arbeidstaker.navn &&
                            <div className="arbeidsoppgave__beskrivelse">
                                <label>{arbeidstaker.navn}</label>
                                { type === KANGJENNOMFOERES.TILRETTELEGGING &&
                                <q>{arbeidsoppgave.gjennomfoering.kanBeskrivelse}</q>
                                }
                                { type === KANGJENNOMFOERES.KAN_IKKE &&
                                <q>{arbeidsoppgave.gjennomfoering.kanIkkeBeskrivelse}</q>
                                }
                            </div>
                            }
                        </div>
                    );
                })
            }
        </div>
    );
};
InformasjonPanelArbeidsoppgaverEtterGjennomfoering.propTypes = {
    oppfolgingsdialog: oppfolgingsplanPt,
    arbeidsoppgaver: personPt,
    type: PropTypes.string,
    tittel: PropTypes.string,
    rootUrl: PropTypes.string,
};

export const InformasjonPanelArbeidsoppgaver = ({ oppfolgingsdialog, arbeidsoppgaver, rootUrl }) => {
    const arbeidsoppgaverKanGjennomfoeres = arbeidsoppgaver.filter((arbeidsoppgave) => {
        return arbeidsoppgave.gjennomfoering && arbeidsoppgave.gjennomfoering.kanGjennomfoeres === KANGJENNOMFOERES.KAN;
    });
    const arbeidsoppgaverMedTilrettelegging = arbeidsoppgaver.filter((arbeidsoppgave) => {
        return arbeidsoppgave.gjennomfoering && arbeidsoppgave.gjennomfoering.kanGjennomfoeres === KANGJENNOMFOERES.TILRETTELEGGING;
    });
    const arbeidsoppgaverKanIkkeGjennomfoeres = arbeidsoppgaver.filter((arbeidsoppgave) => {
        return arbeidsoppgave.gjennomfoering && arbeidsoppgave.gjennomfoering.kanGjennomfoeres === KANGJENNOMFOERES.KAN_IKKE;
    });
    const arbeidsoppgaverIkkeVurdert = arbeidsoppgaver.filter((arbeidsoppgave) => {
        return !arbeidsoppgave.gjennomfoering;
    });
    return (
        <div className="panel godkjennPlanOversiktInformasjon__panel">
            { arbeidsoppgaverKanGjennomfoeres.length > 0 &&
            <InformasjonPanelArbeidsoppgaverEtterGjennomfoering
                oppfolgingsdialog={oppfolgingsdialog}
                arbeidsoppgaver={arbeidsoppgaverKanGjennomfoeres}
                type={KANGJENNOMFOERES.KAN}
                tittel={texts.informasjonPanelArbeidsoppgaverEtterGjennomfoering.titles.kan}
                rootUrl={rootUrl}
            />
            }
            { arbeidsoppgaverMedTilrettelegging.length > 0 &&
            <InformasjonPanelArbeidsoppgaverEtterGjennomfoering
                oppfolgingsdialog={oppfolgingsdialog}
                arbeidsoppgaver={arbeidsoppgaverMedTilrettelegging}
                type={KANGJENNOMFOERES.TILRETTELEGGING}
                tittel={texts.informasjonPanelArbeidsoppgaverEtterGjennomfoering.titles.tilrettelegging}
                rootUrl={rootUrl}
            />
            }
            { arbeidsoppgaverKanIkkeGjennomfoeres.length > 0 &&
            <InformasjonPanelArbeidsoppgaverEtterGjennomfoering
                oppfolgingsdialog={oppfolgingsdialog}
                arbeidsoppgaver={arbeidsoppgaverKanIkkeGjennomfoeres}
                type={KANGJENNOMFOERES.KAN_IKKE}
                tittel={texts.informasjonPanelArbeidsoppgaverEtterGjennomfoering.titles.kanIkke}
                rootUrl={rootUrl}
            />
            }
            { arbeidsoppgaverIkkeVurdert.length > 0 &&
            <InformasjonPanelArbeidsoppgaverEtterGjennomfoering
                oppfolgingsdialog={oppfolgingsdialog}
                arbeidsoppgaver={arbeidsoppgaverIkkeVurdert}
                type={KANGJENNOMFOERES.IKKE_VURDERT}
                tittel={texts.informasjonPanelArbeidsoppgaverEtterGjennomfoering.titles.ikkeVurdert}
                rootUrl={rootUrl}
            />
            }
        </div>
    );
};
InformasjonPanelArbeidsoppgaver.propTypes = {
    oppfolgingsdialog: oppfolgingsplanPt,
    arbeidsoppgaver: arbeidsoppgavePt,
    rootUrl: PropTypes.string,
};

export const getTiltakStatus = (tiltak) => {
    switch (tiltak.status) {
        case STATUS_TILTAK.AVTALT:
            return texts.informasjonPanelTiltak.status.avtalt;
        case STATUS_TILTAK.IKKE_AKTUELT:
            return texts.informasjonPanelTiltak.status.ikkeAktuelt;
        default:
            return texts.informasjonPanelTiltak.status.foreslatt;
    }
};

export const getTiltakStatusKlass = (tiltak) => {
    switch (tiltak.status) {
        case STATUS_TILTAK.AVTALT:
            return 'etikett--suksess';
        case STATUS_TILTAK.IKKE_AKTUELT:
            return 'etikett--advarsel';
        default:
            return 'etikett--fokus';
    }
};

export const TiltakBeskrivelse = ({ tiltak }) => {
    return (
        <div className="godkjennPlanOversiktInfo__panel__tiltak--beskrivelse">
            <label key={`tiltak-besk-label-${tiltak.tiltakId}`} >
                {texts.tiltakBeskrivelse.label}
            </label>
            <q key={`tiltak-besk-p-${tiltak.tiltakId}`} >{tiltak.beskrivelse}</q>
        </div>
    );
};
TiltakBeskrivelse.propTypes = {
    tiltak: tiltakPt,
};

export const TiltakOppfoelging = ({ tiltak }) => {
    return (
        <div className="godkjennPlanOversiktInfo__panel__tiltak--beskrivelse">
            { tiltak.gjennomfoering &&
            [
                <label key={`tiltak-gjenn-label-${tiltak.tiltakId}`} >
                    {texts.tiltakOppfoelging.label}
                </label>,
                <q key={`tiltak-gjenn-p-${tiltak.tiltakId}`} >{tiltak.gjennomfoering}</q>,
            ]
            }
        </div>
    );
};
TiltakOppfoelging.propTypes = {
    tiltak: tiltakPt,
};

export const TiltakBeskrivelseIkkeAktuelt = ({ tiltak }) => {
    return (<div className="godkjennPlanOversiktInfo__panel__tiltak--beskrivelse">
        { tiltak.beskrivelseIkkeAktuelt &&
        [
            <label key={`tiltak-gjenn-label-${tiltak.tiltakId}`} >
                {texts.tiltakBeskrivelseIkkeAktuelt.label}
            </label>,
            <q key={`tiltak-gjenn-p-${tiltak.tiltakId}`} >{tiltak.beskrivelseIkkeAktuelt}</q>,
        ]
        }
    </div>);
};
TiltakBeskrivelseIkkeAktuelt.propTypes = {
    tiltak: tiltakPt,
};

export const TiltakForeslaattAv = ({ tiltak }) => {
    return (<div className="godkjennPlanOversiktInfo__panel__tiltak--foreslaattAv">
        { tiltak.opprettetAv &&
        [
            <label key={`tiltak-gjenn-label-${tiltak.tiltakId}`} >
                {texts.tiltakForeslaattAv.label}
            </label>,
            <p key={`tiltak-gjenn-p-${tiltak.opprettetAv.navn}`} >{tiltak.opprettetAv.navn}</p>,
        ]
        }
    </div>);
};

TiltakForeslaattAv.propTypes = {
    tiltak: tiltakPt,
};

export const InformasjonPanelTiltak = ({ tiltakListe }) => {
    return (
        <div className="panel godkjennPlanOversiktInformasjon__panel">
            <div className="godkjennPlanOversiktInformasjon__panel__header--tiltak">
                <h3>{texts.informasjonPanelTiltak.title}</h3>
            </div>
            {
                tiltakListe.map((tiltak, idx) => {
                    return (<div className="godkjennPlanOversiktInfo__panel__tiltak" key={idx}>
                        { tiltak.fom && tiltak.tom && tiltak.status !== STATUS_TILTAK.IKKE_AKTUELT &&
                        <div>{toDateMedMaanedNavn(tiltak.fom)} - {toDateMedMaanedNavn(tiltak.tom)}</div>
                        }
                        <div className="godkjennPlanOversiktInfo__panel__tiltak--navn">
                            <h4>{tiltak.tiltaknavn}</h4>
                        </div>
                        { tiltak.status &&
                        <div className={`etikett ${getTiltakStatusKlass(tiltak)}`} >
                            <span className="typo-normal">
                                {getTiltakStatus(tiltak)}
                            </span>
                        </div>
                        }
                        <TiltakBeskrivelse
                            tiltak={tiltak}
                        />
                        <TiltakForeslaattAv
                            tiltak={tiltak}
                        />
                        { tiltak.status === STATUS_TILTAK.AVTALT &&
                        <TiltakOppfoelging
                            tiltak={tiltak}
                        />
                        }
                        { tiltak.status === STATUS_TILTAK.IKKE_AKTUELT &&
                        <TiltakBeskrivelseIkkeAktuelt
                            tiltak={tiltak}
                        />
                        }
                    </div>);
                })
            }
        </div>
    );
};
InformasjonPanelTiltak.propTypes = {
    tiltakListe: PropTypes.arrayOf(tiltakPt),
};

const GodkjennPlanOversiktInformasjon = ({ oppfolgingsdialog, rootUrl }) => {
    return (
        <div className="godkjennPlanOversiktInformasjon">

            <InformasjonPanelOverskrift
                oppfolgingsdialog={oppfolgingsdialog}
            />

            <InformasjonPanelSykmeldt
                arbeidstaker={oppfolgingsdialog.arbeidstaker}
            />

            <InformasjonPanelArbeidsgiver
                naermesteLeder={oppfolgingsdialog.arbeidsgiver.naermesteLeder}
                virksomhetsnummer={oppfolgingsdialog.virksomhet.virksomhetsnummer}
            />

            {oppfolgingsdialog.arbeidstaker.sykeforlopsPerioder.length > 0 &&
            <InformasjonPanelSykeforlopsPerioder
                arbeidstaker={oppfolgingsdialog.arbeidstaker}
            />
            }

            { oppfolgingsdialog.arbeidsoppgaveListe.length > 0 &&
            <InformasjonPanelArbeidsoppgaver
                oppfolgingsdialog={oppfolgingsdialog}
                arbeidsoppgaver={sorterArbeidsoppgaverEtterOpprettet(oppfolgingsdialog.arbeidsoppgaveListe)}
                rootUrl={rootUrl}
            />
            }

            { oppfolgingsdialog.tiltakListe.length > 0 &&
            <InformasjonPanelTiltak
                tiltakListe={sorterTiltakerEtterStatus(oppfolgingsdialog.tiltakListe)}
            />
            }
        </div>
    );
};
GodkjennPlanOversiktInformasjon.propTypes = {
    oppfolgingsdialog: oppfolgingsplanPt,
    rootUrl: PropTypes.string,
};

export default GodkjennPlanOversiktInformasjon;
