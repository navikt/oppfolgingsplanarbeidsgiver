import React from 'react';
import PropTypes from 'prop-types';
import { keyValue } from '@navikt/digisyfo-npm';
import * as opProptypes from '../../../../proptypes/opproptypes';
import ArbeidsoppgaveUtvidbar from './ArbeidsoppgaveUtvidbar';

const ArbeidsoppgaverListe = (
    {
        ledetekster,
        liste,
        sendLagre,
        sendSlett,
        sendLagreKommentar,
        sendSlettKommentar,
        fnr,
        rootUrlImg,
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
                            ledetekster={ledetekster}
                            element={element}
                            fnr={fnr}
                            sendSlett={sendSlett}
                            sendLagre={sendLagre}
                            sendSlettKommentar={sendSlettKommentar}
                            sendLagreKommentar={sendLagreKommentar}
                            id={index}
                            rootUrlImg={rootUrlImg}
                            visFeilMelding={visFeilMelding}
                            feilMelding={feilMelding}
                        />);
                })
            }
        </div>
    );
};

ArbeidsoppgaverListe.propTypes = {
    ledetekster: keyValue,
    liste: PropTypes.arrayOf(opProptypes.arbeidsoppgavePt),
    fnr: PropTypes.string,
    sendLagre: PropTypes.func,
    sendSlett: PropTypes.func,
    sendLagreKommentar: PropTypes.func,
    sendSlettKommentar: PropTypes.func,
    rootUrlImg: PropTypes.string,
    visFeilMelding: PropTypes.func,
    feilMelding: PropTypes.bool,
};

export default ArbeidsoppgaverListe;

