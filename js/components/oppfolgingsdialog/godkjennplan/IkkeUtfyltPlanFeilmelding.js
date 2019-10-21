import React from 'react';
import PropTypes from 'prop-types';
import Alertstripe from 'nav-frontend-alertstriper';
import { getLedetekst } from 'digisyfo-npm';
import { oppfolgingsdialogPt } from '../../../proptypes/opproptypes';

const handleKeyPress = (settAktivtSteg, nesteSteg, e) => {
    e.preventDefault();
    if (e.nativeEvent.keyCode === 13) {
        settAktivtSteg(nesteSteg);
    }
};

const IkkeUtfyltPlanFeilmelding = (
    {
        oppfolgingsdialog,
        settAktivtSteg,
    }) => {
    const varseltripeTekst = getLedetekst('oppfolgingsdialog.ikkeUtfyltPlanFeilmelding.beskrivelse.ag');
    return (<Alertstripe
        className="ikkeUtfyltPlanFeilmelding"
        type="advarsel">
        <p>{varseltripeTekst}</p>
        <div className="ikkeUtfyltPlanFeilmelding__lenker">
            { oppfolgingsdialog.arbeidsoppgaveListe.length === 0 &&
            <button
                className="lenke"
                onKeyPress={(e) => {
                    handleKeyPress(settAktivtSteg, 1, e);
                }}
                onMouseDown={() => {
                    settAktivtSteg(1);
                }}>
                {getLedetekst('oppfolgingsdialog.ikkeUtfyltPlanFeilmelding.lenke.arbeidsoppgave')}
            </button>
            }
            { oppfolgingsdialog.tiltakListe.length === 0 &&
            <button
                className="lenke"
                onKeyPress={(e) => {
                    handleKeyPress(settAktivtSteg, 2, e);
                }}
                onMouseDown={() => {
                    settAktivtSteg(2);
                }}>
                {getLedetekst('oppfolgingsdialog.ikkeUtfyltPlanFeilmelding.lenke.tiltak')}
            </button>
            }
        </div>
    </Alertstripe>);
};
IkkeUtfyltPlanFeilmelding.propTypes = {
    oppfolgingsdialog: oppfolgingsdialogPt,
    settAktivtSteg: PropTypes.func,
};

export default IkkeUtfyltPlanFeilmelding;
