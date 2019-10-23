import React from 'react';
import PropTypes from 'prop-types';
import { getLedetekst } from '@navikt/digisyfo-npm';
import { oppfolgingsdialogPt } from '../../../proptypes/opproptypes';
import { erOppfolgingsdialogOpprettbarDirekte } from '../../../utils/oppfolgingsplanUtils';

const OppfolgingsplanerIngenplanKnapper = (
    {
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
                    {getLedetekst('oppfolgingsdialog.knapp.ny-oppfolgingsdialog')}
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
    oppfolgingsdialoger: PropTypes.arrayOf(oppfolgingsdialogPt),
    opprett: PropTypes.func,
    visOppfolgingsdialogOpprett: PropTypes.func,
};

export default OppfolgingsplanerIngenplanKnapper;
