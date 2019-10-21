import React from 'react';
import PropTypes from 'prop-types';
import TiltakUtvidbar from './TiltakUtvidbar';
import { tiltakPt } from '../../../../../proptypes/opproptypes';

const TiltakListe = (
    {
        liste,
        sendLagre,
        sendSlett,
        sendLagreKommentar,
        sendSlettKommentar,
        fnr,
        brukerType,
        feilMelding,
        visFeilMelding,
        rootUrlImg,
    }) => {
    return (
        <div className="oppfolgingsdialogtabell">
            {
                liste.map((element, index) => {
                    return (
                        <TiltakUtvidbar
                            key={index}
                            element={element}
                            fnr={fnr}
                            brukerType={brukerType}
                            sendSlett={sendSlett}
                            sendLagre={sendLagre}
                            sendSlettKommentar={sendSlettKommentar}
                            sendLagreKommentar={sendLagreKommentar}
                            id={index}
                            visFeilMelding={visFeilMelding}
                            feilMelding={feilMelding}
                            rootUrlImg={rootUrlImg}
                        />);
                })
            }
        </div>);
};

TiltakListe.propTypes = {
    liste: PropTypes.arrayOf(tiltakPt),
    fnr: PropTypes.string,
    brukerType: PropTypes.string,
    sendLagre: PropTypes.func,
    sendSlett: PropTypes.func,
    sendLagreKommentar: PropTypes.func,
    sendSlettKommentar: PropTypes.func,
    visFeilMelding: PropTypes.func,
    feilMelding: PropTypes.bool,
    rootUrlImg: PropTypes.string,
};

export default TiltakListe;
