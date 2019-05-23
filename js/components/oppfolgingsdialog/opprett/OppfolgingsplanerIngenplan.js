import React from 'react';
import PropTypes from 'prop-types';
import { keyValue } from 'digisyfo-npm';
import {
    proptypes as oppfolgingProptypes,
    OppfolgingsdialogerIngenplan,
} from 'oppfolgingsdialog-npm';
import OppfolgingsplanerIngenplanKnapper from './OppfolgingsplanerIngenplanKnapper';

const OppfolgingsplanerIngenplan = (
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
        <OppfolgingsplanerIngenplanKnapper
            ledetekster={ledetekster}
            oppfolgingsdialoger={oppfolgingsdialoger}
            opprett={opprett}
            visOppfolgingsdialogOpprett={visOppfolgingsdialogOpprett}

        />
    </OppfolgingsdialogerIngenplan>);
};

OppfolgingsplanerIngenplan.propTypes = {
    ledetekster: keyValue,
    oppfolgingsdialoger: PropTypes.arrayOf(oppfolgingProptypes.oppfolgingsdialogPt),
    opprett: PropTypes.func,
    visOppfolgingsdialogOpprett: PropTypes.func,
    rootUrl: PropTypes.string,
};

export default OppfolgingsplanerIngenplan;
