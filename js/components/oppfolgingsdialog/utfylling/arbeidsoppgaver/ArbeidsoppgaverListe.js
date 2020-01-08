import React from 'react';
import PropTypes from 'prop-types';
import * as opProptypes from '../../../../proptypes/opproptypes';
import ArbeidsoppgaveUtvidbar from './ArbeidsoppgaveUtvidbar';

const ArbeidsoppgaverListe = (
    {
        liste,
        sendLagre,
        sendSlett,
        sendLagreKommentar,
        sendSlettKommentar,
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
                            sendLagre={sendLagre}
                            sendSlettKommentar={sendSlettKommentar}
                            sendLagreKommentar={sendLagreKommentar}
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
    sendLagre: PropTypes.func,
    sendSlett: PropTypes.func,
    sendLagreKommentar: PropTypes.func,
    sendSlettKommentar: PropTypes.func,
    visFeilMelding: PropTypes.func,
    feilMelding: PropTypes.bool,
};

export default ArbeidsoppgaverListe;

