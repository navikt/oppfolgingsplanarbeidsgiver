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
        feilMelding,
        visFeilMelding,
        rootUrlImg,
    }) => {
    return (
        <div className="oppfolgingsdialogtabell">
            {
                liste.map((element) => {
                    return (
                        <TiltakUtvidbar
                            key={element.tiltakId}
                            element={element}
                            fnr={fnr}
                            sendSlett={sendSlett}
                            sendLagre={sendLagre}
                            sendSlettKommentar={sendSlettKommentar}
                            sendLagreKommentar={sendLagreKommentar}
                            id={element.tiltakId}
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
    sendLagre: PropTypes.func,
    sendSlett: PropTypes.func,
    sendLagreKommentar: PropTypes.func,
    sendSlettKommentar: PropTypes.func,
    visFeilMelding: PropTypes.func,
    feilMelding: PropTypes.bool,
    rootUrlImg: PropTypes.string,
};

export default TiltakListe;
