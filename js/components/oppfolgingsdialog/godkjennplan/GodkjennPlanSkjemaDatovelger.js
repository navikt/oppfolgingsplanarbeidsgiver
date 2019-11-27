import React from 'react';
import Datovelger from '../../../skjema/Datovelger';
import { datovelgerFeltPt } from '../../../proptypes/tiltakproptypes';

const texts = {
    felter: {
        fom: 'Fra og med',
        tom: 'Til og med',
        evalueringinnen: 'Evalueres innen',
    },
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

export const GodkjennPlanSkjemaDatovelgerFelt = ({ felt }) => {
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
                dato={window.sessionStorage.getItem(felt.navn)}
            />
        </div>
    );
};
GodkjennPlanSkjemaDatovelgerFelt.propTypes = {
    felt: datovelgerFeltPt,
};

const GodkjennPlanSkjemaDatovelger = () => {
    return (
        <div>
            <div className="godkjennPlanSkjema__datovelger__rad">
                <GodkjennPlanSkjemaDatovelgerFelt
                    felt={FELTER.fom}
                />

                <GodkjennPlanSkjemaDatovelgerFelt
                    felt={FELTER.tom}
                />

                <GodkjennPlanSkjemaDatovelgerFelt
                    felt={FELTER.evalueringinnen}
                />
            </div>
        </div>
    );
};

export default GodkjennPlanSkjemaDatovelger;
