import React from 'react';
import PropTypes from 'prop-types';
import { getLedetekst, keyValue } from 'digisyfo-npm';
import {
    proptypes as oppfolgingProptypes,
    OppfolgingsdialogerIngenplan,
} from 'oppfolgingsdialog-npm';
import { erOppfolgingsdialogOpprettbarDirekte } from '../../../utils/oppfolgingsdialogUtils';

export const OppfolgingsdialogerIngenplanKnapper = (
    {
        ledetekster,
        oppfolgingsdialoger,
        opprett,
        visOppfolgingsdialogOpprett,
    }) => {
    return (
        <div className="knapperad knapperad--justervenstre">
            { erOppfolgingsdialogOpprettbarDirekte(oppfolgingsdialoger) ?
                <button
                    className="knapp knapperad__element"
                    onClick={opprett}>
                    {getLedetekst('oppfolgingsdialog.knapp.ny-oppfolgingsdialog', ledetekster)}
                </button>
                :
                <button
                    className="knapp knapperad__element"
                    onClick={() => {
                        visOppfolgingsdialogOpprett(true);
                    }}>
                    {getLedetekst('oppfolgingsdialog.knapp.ny-oppfolgingsdialog')}
                </button>
            }
        </div>
    );
};
OppfolgingsdialogerIngenplanKnapper.propTypes = {
    ledetekster: keyValue,
    oppfolgingsdialoger: PropTypes.arrayOf(oppfolgingProptypes.oppfolgingsdialogPt),
    opprett: PropTypes.func,
    visOppfolgingsdialogOpprett: PropTypes.func,
};

const OppfolgingsdialogerIngenplanAG = (
    {
        ledetekster,
        oppfolgingsdialoger,
        opprett,
        visOppfolgingsdialogOpprett,
        rootUrl,
    }) => {
    return (<OppfolgingsdialogerIngenplan
        ledetekster={ledetekster}
        rootUrl={rootUrl}
    >
        <OppfolgingsdialogerIngenplanKnapper
            ledetekster={ledetekster}
            oppfolgingsdialoger={oppfolgingsdialoger}
            opprett={opprett}
            visOppfolgingsdialogOpprett={visOppfolgingsdialogOpprett}

        />
    </OppfolgingsdialogerIngenplan>);
};

OppfolgingsdialogerIngenplanAG.propTypes = {
    ledetekster: keyValue,
    oppfolgingsdialoger: PropTypes.arrayOf(oppfolgingProptypes.oppfolgingsdialogPt),
    opprett: PropTypes.func,
    visOppfolgingsdialogOpprett: PropTypes.func,
    rootUrl: PropTypes.string,
};

export default OppfolgingsdialogerIngenplanAG;
