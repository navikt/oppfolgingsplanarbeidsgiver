import React from 'react';
import PropTypes from 'prop-types';
import { getLedetekst, keyValue } from '@navikt/digisyfo-npm';
import {
    BRUKERTYPE,
    KANGJENNOMFOERES,
} from '../../../../konstanter';
import { ArbeidsoppgaveVarselFeil } from './ArbeidsoppgaveVarselFeil';
import * as opProptypes from '../../../../proptypes/opproptypes';

export const ArbeidsoppgaveInformasjonKnapper = (
    {
        ledetekster,
        element,
        fnr,
        sendSlett,
    }) => {
    const elementId = element.arbeidsoppgaveId;
    const aktoerHarOpprettetElement = fnr === (element.opprettetAv && element.opprettetAv.fnr);
    return (
        aktoerHarOpprettetElement ? (<div className="arbeidsoppgaveInformasjonKnapper knapperad knapperad--justervenstre">
            <button
                type="button"
                onClick={() => { sendSlett(elementId); }}
                className="knapperad__element knapp--slett">
                {getLedetekst('oppfolgingsdialog.knapp.slett-element', ledetekster)}
            </button>
        </div>) : null
    );
};
ArbeidsoppgaveInformasjonKnapper.propTypes = {
    ledetekster: keyValue,
    element: opProptypes.arbeidsoppgavePt,
    fnr: PropTypes.string,
    sendSlett: PropTypes.func,
};

export const ArbeidsoppgaveInformasjonInnhold = ({ ledetekster, arbeidsoppgave, brukerType }) => {
    let beskrivelseTekst = '';
    let hentPanelType;
    switch (arbeidsoppgave && arbeidsoppgave.gjennomfoering && arbeidsoppgave.gjennomfoering.kanGjennomfoeres) {
        case KANGJENNOMFOERES.KAN: {
            hentPanelType = 'arbeidsoppgaveInformasjonInnhold--groenn';
            break;
        }
        case KANGJENNOMFOERES.TILRETTELEGGING: {
            beskrivelseTekst = arbeidsoppgave.gjennomfoering.kanBeskrivelse;
            hentPanelType = 'arbeidsoppgaveInformasjonInnhold--gul';
            break;
        }
        case KANGJENNOMFOERES.KAN_IKKE: {
            beskrivelseTekst = arbeidsoppgave.gjennomfoering.kanIkkeBeskrivelse;
            hentPanelType = 'arbeidsoppgaveInformasjonInnhold--roed';
            break;
        }
        default: {
            hentPanelType = 'arbeidsoppgaveInformasjonInnhold--graa';
            break;
        }
    }
    return (
        <div className={`arbeidsoppgaveInformasjonInnhold ${hentPanelType}`}>
            {!arbeidsoppgave.gjennomfoering && brukerType === BRUKERTYPE.ARBEIDSGIVER &&
            <p>{getLedetekst('oppfolgingsdialoger.arbeidsoppgaveInformasjon.ikke-vurdert.arbeidsgiver', ledetekster)}</p>
            }
            {!arbeidsoppgave.gjennomfoering && brukerType === BRUKERTYPE.ARBEIDSTAKER &&
            <p>{getLedetekst('oppfolgingsdialoger.arbeidsoppgaveInformasjon.ikke-vurdert.arbeidstaker', ledetekster)}</p>
            }
            { arbeidsoppgave.gjennomfoering &&
            <dl>
                { arbeidsoppgave.gjennomfoering && arbeidsoppgave.gjennomfoering.kanGjennomfoeres === KANGJENNOMFOERES.TILRETTELEGGING &&
                <dt>{getLedetekst('oppfolgingsdialoger.arbeidsoppgaveInformasjon.tilrettelegging', ledetekster)}</dt>
                }
                { arbeidsoppgave.gjennomfoering && arbeidsoppgave.gjennomfoering.kanGjennomfoeres === KANGJENNOMFOERES.TILRETTELEGGING &&
                <dd>
                    { arbeidsoppgave.gjennomfoering.paaAnnetSted &&
                    <p>{getLedetekst('oppfolgingsdialoger.arbeidsoppgaveInformasjon.tilrettelegging.paaAnnetSted', ledetekster)}</p>
                    }
                    { arbeidsoppgave.gjennomfoering.medMerTid &&
                    <p>{getLedetekst('oppfolgingsdialoger.arbeidsoppgaveInformasjon.tilrettelegging.medMerTid', ledetekster)}</p>
                    }
                    { arbeidsoppgave.gjennomfoering.medHjelp &&
                    <p>{getLedetekst('oppfolgingsdialoger.arbeidsoppgaveInformasjon.tilrettelegging.medHjelp', ledetekster)}</p>
                    }
                </dd>
                }

                { beskrivelseTekst.length > 0 && arbeidsoppgave.gjennomfoering.kanGjennomfoeres !== KANGJENNOMFOERES.KAN &&
                <dt>{getLedetekst('oppfolgingsdialoger.arbeidsoppgaveInformasjon.beskrivelse', ledetekster)}</dt>
                }
                { beskrivelseTekst.length > 0 && arbeidsoppgave.gjennomfoering.kanGjennomfoeres !== KANGJENNOMFOERES.KAN &&
                <dd className="arbeidsoppgaveInformasjonInnhold__beskrivelse">{beskrivelseTekst}</dd>
                }
                <dt>{getLedetekst('oppfolgingsdialoger.arbeidsoppgaveInformasjon.opprettetAv', ledetekster)}</dt>
                <dd>{arbeidsoppgave.opprettetAv.navn}</dd>
            </dl>
            }
        </div>
    );
};
ArbeidsoppgaveInformasjonInnhold.propTypes = {
    ledetekster: keyValue,
    arbeidsoppgave: opProptypes.arbeidsoppgavePt,
    brukerType: PropTypes.string,
};

const ArbeidsoppgaveInformasjon = (
    {
        ledetekster,
        element,
        fnr,
        brukerType,
        sendSlett,
        oppdateringFeilet,
        varselTekst,
        rootUrlImg,
    }) => {
    return (
        <div className="arbeidsoppgaveInformasjon">
            <ArbeidsoppgaveInformasjonInnhold
                ledetekster={ledetekster}
                arbeidsoppgave={element}
                brukerType={brukerType}
            />

            { oppdateringFeilet &&
            <ArbeidsoppgaveVarselFeil
                tekst={varselTekst}
                rootUrlImg={rootUrlImg}
            />
            }

            <ArbeidsoppgaveInformasjonKnapper
                ledetekster={ledetekster}
                element={element}
                fnr={fnr}
                sendSlett={sendSlett}
            />
        </div>
    );
};

ArbeidsoppgaveInformasjon.propTypes = {
    ledetekster: keyValue,
    element: opProptypes.arbeidsoppgavePt,
    fnr: PropTypes.string,
    brukerType: PropTypes.string,
    sendSlett: PropTypes.func,
    oppdateringFeilet: PropTypes.bool,
    varselTekst: PropTypes.string,
    rootUrlImg: PropTypes.string,
};

export default ArbeidsoppgaveInformasjon;
