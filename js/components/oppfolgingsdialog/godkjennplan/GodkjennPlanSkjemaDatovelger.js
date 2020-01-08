import React from 'react';
import PropTypes from 'prop-types';
import { Undertekst } from 'nav-frontend-typografi';
import Datovelger from '../../../skjema/Datovelger';
import { datovelgerFeltPt } from '../../../proptypes/tiltakproptypes';
import { oppfolgingsplanPt } from '../../../proptypes/opproptypes';
import {
    getEndDateFromTiltakListe,
    getStartDateFromTiltakListe,
} from '../../../utils/tiltakUtils';

const texts = {
    felter: {
        fom: 'Fra og med',
        tom: 'Til og med',
        evalueringinnen: 'Evalueres innen',
    },
    suggestion: 'Start- og sluttdato er foreslått basert på tiltak i planen',
};

export const FELTER = {
    fom: {
        navn: 'startdato',
        tekst: texts.felter.fom,
    },
    tom: {
        navn: 'sluttdato',
        tekst: texts.felter.tom,
    },
    evalueringinnen: {
        navn: 'evalueringsdato',
        tekst: texts.felter.evalueringinnen,
    },
};

export const GodkjennPlanSkjemaDatovelgerFelt = (
    {
        felt,
        date,
    }) => {
    return (
        <div className="skjemaelement godkjennPlanSkjema__datovelger__felt">
            <label
                className="skjemaelement__label"
                htmlFor={felt.navn}>
                {felt.tekst}
            </label>
            <Datovelger
                name={felt.navn}
                id={felt.navn}
                tidligsteFom={null}
                dato={date || window.sessionStorage.getItem(felt.navn)}
            />
        </div>
    );
};
GodkjennPlanSkjemaDatovelgerFelt.propTypes = {
    felt: datovelgerFeltPt,
    date: PropTypes.string,
};

const GodkjennPlanSkjemaDatovelger = ({ oppfolgingsplan }) => {
    const suggestedStartDate = getStartDateFromTiltakListe(oppfolgingsplan.tiltakListe);
    const suggestedEndDate = getEndDateFromTiltakListe(oppfolgingsplan.tiltakListe);
    return (
        <div>
            { suggestedStartDate && suggestedEndDate &&
                <Undertekst>{texts.suggestion}</Undertekst>
            }
            <div className="godkjennPlanSkjema__datovelger__rad">
                <GodkjennPlanSkjemaDatovelgerFelt
                    felt={FELTER.fom}
                    date={suggestedStartDate}
                />

                <GodkjennPlanSkjemaDatovelgerFelt
                    felt={FELTER.tom}
                    date={suggestedEndDate}
                />
            </div>
            <div className="godkjennPlanSkjema__datovelger__rad">
                <GodkjennPlanSkjemaDatovelgerFelt
                    felt={FELTER.evalueringinnen}
                />
            </div>
        </div>
    );
};
GodkjennPlanSkjemaDatovelger.propTypes = {
    oppfolgingsplan: oppfolgingsplanPt,
};

export default GodkjennPlanSkjemaDatovelger;
