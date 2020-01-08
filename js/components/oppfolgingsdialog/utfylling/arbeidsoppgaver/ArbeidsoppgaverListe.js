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
                liste.map((element, index) => {
                    return (
                        <ArbeidsoppgaveUtvidbar
                            key={index}
                            element={element}
                            fnr={fnr}
                            sendSlett={sendSlett}
                            id={index}
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

