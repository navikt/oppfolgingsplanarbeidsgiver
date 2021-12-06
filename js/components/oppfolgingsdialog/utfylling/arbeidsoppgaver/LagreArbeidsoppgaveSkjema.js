import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Panel from 'nav-frontend-paneler';
import Inputfelt from '../../../../skjema/Inputfelt';
import * as opProptypes from '../../../../proptypes/opproptypes';


const LagreArbeidsoppgaveSkjema = ({ arbeidsoppgaverReducer, avbryt, oppdateringFeilet, varselTekst, onSubmit }) => {
    const [spinner, setSpinner] = useState(false);

    useEffect(() => {
        setSpinner(arbeidsoppgaverReducer.lagrer)
    }, [arbeidsoppgaverReducer.lagrer]);

    return (
      <Panel border>
        <Inputfelt 
            avbryt={avbryt}
            oppdateringFeilet={oppdateringFeilet}
            spinner={spinner}
            varselTekst={varselTekst}
            onSubmit={onSubmit}
        />
      </Panel>
    );
};

LagreArbeidsoppgaveSkjema.propTypes = {
  arbeidsoppgaverReducer: opProptypes.arbeidsoppgaverReducerPt,
  avbryt: PropTypes.func,
  oppdateringFeilet: PropTypes.bool,
  varselTekst: PropTypes.string,
  onSubmit: PropTypes.func,
};

export default LagreArbeidsoppgaveSkjema;
