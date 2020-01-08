import React from 'react';
import PropTypes from 'prop-types';
import { oppfolgingsplanPt } from '../../../../proptypes/opproptypes';
import TidligereAvbruttePlaner from '../TidligereAvbruttePlaner';

const InnholdboksPilTidligerePlaner = (
    {
        oppfolgingsplan,
        rootUrlPlaner,
    }) => {
    return (<div className="innholdboksPil">
        <TidligereAvbruttePlaner
            oppfolgingsdialog={oppfolgingsplan}
            rootUrlPlaner={rootUrlPlaner}
        />
    </div>);
};

InnholdboksPilTidligerePlaner.propTypes = {
    oppfolgingsplan: oppfolgingsplanPt,
    rootUrlPlaner: PropTypes.string,
};

export default InnholdboksPilTidligerePlaner;
