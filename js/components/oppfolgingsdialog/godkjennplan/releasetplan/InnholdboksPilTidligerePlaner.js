import React from 'react';
import PropTypes from 'prop-types';
import { oppfolgingsplanPt } from '../../../../proptypes/opproptypes';
import TidligereAvbruttePlaner from '../TidligereAvbruttePlaner';

const InnholdboksPilTidligerePlaner = ({ oppfolgingsdialog, rootUrlPlaner }) => {
    return (<div className="innholdboksPil">
        <TidligereAvbruttePlaner
            oppfolgingsdialog={oppfolgingsdialog}
            rootUrlPlaner={rootUrlPlaner}
        />
    </div>);
};

InnholdboksPilTidligerePlaner.propTypes = {
    oppfolgingsdialog: oppfolgingsplanPt,
    rootUrlPlaner: PropTypes.string,
};

export default InnholdboksPilTidligerePlaner;
