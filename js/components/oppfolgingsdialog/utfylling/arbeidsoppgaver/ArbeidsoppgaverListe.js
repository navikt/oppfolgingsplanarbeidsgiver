import React from 'react';
import PropTypes from 'prop-types';
import * as opProptypes from '../../../../proptypes/opproptypes';
import ArbeidsoppgaveUtvidbar from './ArbeidsoppgaveUtvidbar';

const ArbeidsoppgaverListe = (
    {
        liste,
        sendSlett,
        fnr,
        feilMelding,
        visFeilMelding,
    }) => {
    return (
        <div className="oppfolgingsdialogtabell">
            {
                liste.map((element) => {
                    return (
                        <ArbeidsoppgaveUtvidbar
                            key={element.arbeidsoppgaveId}
                            element={element}
                            fnr={fnr}
                            sendSlett={sendSlett}
                            id={element.arbeidsoppgaveId}
                            visFeilMelding={visFeilMelding}
                            feilMelding={feilMelding}
                        />);
                })
            }
        </div>
    );
};

ArbeidsoppgaverListe.propTypes = {
    liste: PropTypes.arrayOf(opProptypes.arbeidsoppgavePt),
    fnr: PropTypes.string,
    sendSlett: PropTypes.func,
    visFeilMelding: PropTypes.func,
    feilMelding: PropTypes.bool,
};

export default ArbeidsoppgaverListe;

