import React from 'react';
import PropTypes from 'prop-types';
import { keyValue } from 'digisyfo-npm';
import {
    proptypes as oppfolgingProptypes,
    OppfolgingsdialogerIngenplan,
} from 'oppfolgingsdialog-npm';
import OppfolgingsdialogerIngenplanKnapper from './OppfolgingsdialogerIngenplanKnapper';

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
