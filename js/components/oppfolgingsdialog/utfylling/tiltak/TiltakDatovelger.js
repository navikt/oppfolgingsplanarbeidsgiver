import React from 'react';
import PropTypes from 'prop-types';
import { getLedetekst } from '@navikt/digisyfo-npm';
import DatovelgerTiltak from '../../../../skjema/DatovelgerTiltak';
import { restdatoTildato } from '../../../../utils/datoUtils';
import { tiltakPt } from '../../../../proptypes/opproptypes';
import {
    tiltakSkjemaFelterPt,
    tiltakSkjemaFeltPt,
} from '../../../../proptypes/tiltakproptypes';

export const TiltakDatovelgerFelt = (
    {
        felt,
        dato,
    }) => {
    return (
        <div className="tiltakSkjema__datovelger__felt">
            <label htmlFor={felt.navn}>{getLedetekst(felt.tekst)}</label>
            <DatovelgerTiltak
                name={felt.navn}
                id={felt.navn}
                dato={dato ? restdatoTildato(dato) : null}
            />
        </div>
    );
};
TiltakDatovelgerFelt.propTypes = {
    felt: tiltakSkjemaFeltPt,
    dato: PropTypes.string,
};

const TiltakDatovelger = (
    {
        tiltak,
        felter,
    }) => {
    return (
        <div className="tiltakSkjema__datovelger">
            <div className="tiltakSkjema__datovelger__rad">
                <TiltakDatovelgerFelt
                    felt={felter.startdato}
                    dato={tiltak && tiltak.fom ? tiltak.fom : null}
                />

                <TiltakDatovelgerFelt
                    felt={felter.sluttdato}
                    dato={tiltak && tiltak.tom ? tiltak.tom : null}
                />
            </div>
        </div>
    );
};
TiltakDatovelger.propTypes = {
    felter: tiltakSkjemaFelterPt,
    tiltak: tiltakPt,
};

export default TiltakDatovelger;

