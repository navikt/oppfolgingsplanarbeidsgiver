import React from 'react';
import PropTypes from 'prop-types';
import { HjelpetekstUnderVenstre } from 'nav-frontend-hjelpetekst';
import {
    getLedetekst,
    toDatePrettyPrint,
} from '@navikt/digisyfo-npm';
import { KANGJENNOMFOERES, STATUS_TILTAK } from '../../../konstanter';
import { toDateMedMaanedNavn } from '../../../utils/datoUtils';
import { capitalizeFirstLetter } from '../../../utils/tekstUtils';
import { slaaSammenPerioder } from '../../../utils/periodeUtils';
import { sorterTiltakerEtterStatus } from '../../../utils/tiltakUtils';
import { sorterArbeidsoppgaverEtterOpprettet } from '../../../utils/arbeidsoppgaveUtils';
import {
    arbeidsoppgavePt,
    oppfolgingsdialogPt,
    personPt,
    stillingPt,
    tiltakPt,
} from '../../../proptypes/opproptypes';
import { periodePt } from '../../../proptypes/periodeProptypes';

export const InformasjonPanelOverskrift = ({ oppfolgingsdialog }) => {
    return (
        <div className="panel godkjennPlanOversiktInformasjon__panel">
            <h2>{getLedetekst('oppfolgingsdialog.tittel')}</h2>
            <p>{getLedetekst('oppfolgingsdialog.godkjennplanoversiktinformasjon.undertittel', {
                '%ARBEIDSTAKER%': oppfolgingsdialog.arbeidstaker.navn,
                '%ARBEIDSGIVER%': oppfolgingsdialog.arbeidsgiver.naermesteLeder.navn,
            })}</p>
        </div>
    );
};
InformasjonPanelOverskrift.propTypes = {
    oppfolgingsdialog: oppfolgingsdialogPt,
};

export const InformasjonPanelArbeidsgiver = ({ naermesteLeder, virksomhetsnummer }) => {
    return (
        <div className="panel godkjennPlanOversiktInformasjon__panel">
            <div className="godkjennPlanOversiktInformasjon__panel__header">
                <h3>{getLedetekst('oppfolgingsdialog.godkjennplanoversiktinformasjon.arbeidsgiver.tittel')}</h3>
            </div>

            <dl className="godkjennPlanOversiktInformasjon__panel__info">
                <dt>{getLedetekst('oppfolgingsdialog.godkjennplanoversiktinformasjon.arbeidsgiver.orgnummer')}</dt>
                <dd>{virksomhetsnummer}</dd>

                {naermesteLeder && [
                    <dt key={0}>{getLedetekst('oppfolgingsdialog.godkjennplanoversiktinformasjon.arbeidsgiver.navn')}</dt>,
                    <dd key={1}>{naermesteLeder.navn}</dd>,

                    naermesteLeder.tlf &&
                    <div key={2}>
                        <dt>{getLedetekst('oppfolgingsdialog.godkjennplanoversiktinformasjon.arbeidsgiver.tlf')}</dt>
                        <dd>{naermesteLeder.tlf}</dd>
                    </div>,

                    naermesteLeder.epost &&
                    <div key={3}>
                        <dt>{getLedetekst('oppfolgingsdialog.godkjennplanoversiktinformasjon.arbeidsgiver.epost')}</dt>
                        <dd>{naermesteLeder.epost}</dd>
                    </div>,
                ]}
            </dl>
        </div>
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
        <div className="panel godkjennPlanOversiktInformasjon__panel">
            <div className="godkjennPlanOversiktInformasjon__panel__header">
                <h3>{getLedetekst('oppfolgingsdialog.godkjennplanoversiktinformasjon.arbeidstaker.tittel')}</h3>
            </div>
            <dl className="godkjennPlanOversiktInformasjon__panel__info">
                <dt>{getLedetekst('oppfolgingsdialog.godkjennplanoversiktinformasjon.arbeidstaker.fnr')}</dt>
                <dd>{arbeidstaker.fnr}</dd>

                <dt>{getLedetekst('oppfolgingsdialog.godkjennplanoversiktinformasjon.arbeidstaker.navn')}</dt>
                <dd>{arbeidstaker.navn}</dd>
                { arbeidstaker.tlf &&
                <div>
                    <dt>{getLedetekst('oppfolgingsdialog.godkjennplanoversiktinformasjon.arbeidstaker.tlf')}</dt>
                    <dd>{arbeidstaker.tlf}</dd>
                </div>
                }
                { arbeidstaker.epost &&
                <div>
                    <dt>{getLedetekst('oppfolgingsdialog.godkjennplanoversiktinformasjon.arbeidstaker.epost')}</dt>
                    <dd>{arbeidstaker.epost}</dd>
                </div>
                }
                { arbeidstaker.stillinger.length > 0 &&
                <div>
                    <dt>{getLedetekst('oppfolgingsdialog.godkjennplanoversiktinformasjon.arbeidstaker.stilling')}</dt>
                    { arbeidstaker.stillinger.map((stilling, idx) => {
                        if (stilling.prosent > -1) {
                            return (<RenderStilling stilling={stilling} key={idx} />);
                        } return (null);
                    })
                    }
                </div>
                }
            </dl>
        </div>
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
                    {periode.reisetilskudd && (periode.grad > 0 && periode.grad < 100) ?
                        getLedetekst('oppfolgingsdialog.godkjennplanoversiktinformasjon.sykeforlop.sykmeldt_med_reisetilskudd')
                        : getLedetekst('oppfolgingsdialog.godkjennplanoversiktinformasjon.sykeforlop.sykmeldt')}
                </p> : null
            }
            {
                periode.behandlingsdager ? <p>
                    {getLedetekst('oppfolgingsdialog.godkjennplanoversiktinformasjon.sykeforlop.behandlingsdag')}
                </p> : null
            }
            {
                (periode.reisetilskudd === true && periode.grad === 0) ? <p>
                    {getLedetekst('oppfolgingsdialog.godkjennplanoversiktinformasjon.sykeforlop.reisetilskudd')}
                </p> : null
            }
            {
                periode.avventende !== null ? <p>
                    {getLedetekst('oppfolgingsdialog.godkjennplanoversiktinformasjon.sykeforlop.avventende')}
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
                <h3>{getLedetekst('oppfolgingsdialog.godkjennplanoversiktinformasjon.sykeforlop.tittel')}</h3>
                <HjelpetekstUnderVenstre>
                    {getLedetekst('oppfolgingsdialog.godkjennplanoversiktinformasjon.sykeforlop.hjelpetekst')}
                </HjelpetekstUnderVenstre>
            </div>
            <dl className="godkjennPlanOversiktInformasjon__panel__info">
                <dt>{getLedetekst('oppfolgingsdialog.godkjennplanoversiktinformasjon.sykeforlop.prosent')}</dt>
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
                                    {getLedetekst('oppfolgingsdialog.godkjennplanoversiktinformasjon.arbeidsoppgaver.gjennomfoering.tilrettelegging.paa-annet-sted')}
                                </span>
                                }
                                { arbeidsoppgave.gjennomfoering.medMerTid &&
                                <span>
                                    {getLedetekst('oppfolgingsdialog.godkjennplanoversiktinformasjon.arbeidsoppgaver.gjennomfoering.tilrettelegging.med-mer-tid')}
                                </span>
                                }
                                { arbeidsoppgave.gjennomfoering.medHjelp &&
                                <span>
                                    {getLedetekst('oppfolgingsdialog.godkjennplanoversiktinformasjon.arbeidsoppgaver.gjennomfoering.tilrettelegging.med-hjelp')}
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
    oppfolgingsdialog: oppfolgingsdialogPt,
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
                tittel={getLedetekst('oppfolgingsdialog.godkjennplanoversiktinformasjon.arbeidsoppgaver.gjennomfoering.kan')}
                rootUrl={rootUrl}
            />
            }
            { arbeidsoppgaverMedTilrettelegging.length > 0 &&
            <InformasjonPanelArbeidsoppgaverEtterGjennomfoering
                oppfolgingsdialog={oppfolgingsdialog}
                arbeidsoppgaver={arbeidsoppgaverMedTilrettelegging}
                type={KANGJENNOMFOERES.TILRETTELEGGING}
                tittel={getLedetekst('oppfolgingsdialog.godkjennplanoversiktinformasjon.arbeidsoppgaver.gjennomfoering.tilrettelegging')}
                rootUrl={rootUrl}
            />
            }
            { arbeidsoppgaverKanIkkeGjennomfoeres.length > 0 &&
            <InformasjonPanelArbeidsoppgaverEtterGjennomfoering
                oppfolgingsdialog={oppfolgingsdialog}
                arbeidsoppgaver={arbeidsoppgaverKanIkkeGjennomfoeres}
                type={KANGJENNOMFOERES.KAN_IKKE}
                tittel={getLedetekst('oppfolgingsdialog.godkjennplanoversiktinformasjon.arbeidsoppgaver.gjennomfoering.kan-ikke')}
                rootUrl={rootUrl}
            />
            }
            { arbeidsoppgaverIkkeVurdert.length > 0 &&
            <InformasjonPanelArbeidsoppgaverEtterGjennomfoering
                oppfolgingsdialog={oppfolgingsdialog}
                arbeidsoppgaver={arbeidsoppgaverIkkeVurdert}
                type={KANGJENNOMFOERES.IKKE_VURDERT}
                tittel={getLedetekst('oppfolgingsdialog.godkjennplanoversiktinformasjon.arbeidsoppgaver.ikke-vurdert.tittel')}
                rootUrl={rootUrl}
            />
            }
        </div>
    );
};
InformasjonPanelArbeidsoppgaver.propTypes = {
    oppfolgingsdialog: oppfolgingsdialogPt,
    arbeidsoppgaver: arbeidsoppgavePt,
    rootUrl: PropTypes.string,
};

export const getTiltakStatus = (tiltak) => {
    switch (tiltak.status) {
        case STATUS_TILTAK.AVTALT:
            return 'oppfolgingsdialog.tiltak.status.godkjent';
        case STATUS_TILTAK.IKKE_AKTUELT:
            return 'oppfolgingsdialog.tiltak.status.ikke.aktuelt';
        default:
            return 'oppfolgingsdialog.tiltak.status.foreslaatt';
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
                {getLedetekst('oppfolgingsdialog.godkjennPlanOversiktInformasjon.tiltakBeskrivelse.label')}
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
                    {getLedetekst('oppfolgingsdialog.tiltak.oppfoelging')}
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
                {getLedetekst('oppfolgingsdialog.arbeidstaker.tiltak.vurdering.tittel')}
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
                {getLedetekst('oppfolgingsdialog.tiltak.foreslaattav')}
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
                <h3>{getLedetekst('oppfolgingsdialog.godkjennplanoversiktinformasjon.tiltak.tittel')}</h3>
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
                                {getLedetekst(getTiltakStatus(tiltak))}
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
    oppfolgingsdialog: oppfolgingsdialogPt,
    rootUrl: PropTypes.string,
};

export default GodkjennPlanOversiktInformasjon;
