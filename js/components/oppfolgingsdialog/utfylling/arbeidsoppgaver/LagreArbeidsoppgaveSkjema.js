import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Panel from 'nav-frontend-paneler';
import Inputfelt from '../../../../skjema/Inputfelt';
import * as opProptypes from '../../../../proptypes/opproptypes';


const LagreArbeidsoppgaveSkjema = ({ arbeidsoppgaverReducer, oppdateringFeilet, onSubmit, avbryt }) => {
    const [spinner, setSpinner] = useState(false);

    useEffect(() => {
        setSpinner(arbeidsoppgaverReducer.lagrer)
    }, [arbeidsoppgaverReducer.lagrer]);

    return (
      <Panel border>
        <Inputfelt 
            oppdateringFeilet={oppdateringFeilet}
            spinner={spinner}
            onSubmit={onSubmit}
            avbryt={avbryt}
        />
      </Panel>
    );
};

LagreArbeidsoppgaveSkjema.propTypes = {
  arbeidsoppgaverReducer: opProptypes.arbeidsoppgaverReducerPt,
  oppdateringFeilet: PropTypes.bool,
  onSubmit: PropTypes.func,
  avbryt: PropTypes.func,
};

export default LagreArbeidsoppgaveSkjema;
