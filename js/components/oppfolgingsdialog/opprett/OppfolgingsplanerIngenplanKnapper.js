import React from 'react';
import PropTypes from 'prop-types';
import { getLedetekst, keyValue } from 'digisyfo-npm';
import { proptypes as oppfolgingProptypes } from 'oppfolgingsdialog-npm';
import { erOppfolgingsdialogOpprettbarDirekte } from '../../../utils/oppfolgingsdialogUtils';

const OppfolgingsplanerIngenplanKnapper = (
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
OppfolgingsplanerIngenplanKnapper.propTypes = {
    ledetekster: keyValue,
    oppfolgingsdialoger: PropTypes.arrayOf(oppfolgingProptypes.oppfolgingsdialogPt),
    opprett: PropTypes.func,
    visOppfolgingsdialogOpprett: PropTypes.func,
};

export default OppfolgingsplanerIngenplanKnapper;
