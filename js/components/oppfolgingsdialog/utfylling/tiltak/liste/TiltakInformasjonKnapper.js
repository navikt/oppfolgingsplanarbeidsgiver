import React from 'react';
import PropTypes from 'prop-types';
import { Knapp } from 'nav-frontend-knapper';
import { tiltakPt } from '../../../../../proptypes/opproptypes';
import { skalVurdereTiltak } from '../../../../../utils/tiltakUtils';
import ButtonEditIcon from '../../../../app/buttons/ButtonEditIcon';
import ButtonDeleteIcon from '../../../../app/buttons/ButtonDeleteIcon';

const texts = {
    tiltakInformasjonKnapper: {
        buttonComment: 'Kommenter',
    },
};

const TiltakInformasjonKnapper = (
    {
        element,
        fnr,
        visLagreSkjema,
        sendSlett,
        lagreKommentarSkjema,
        visLagreKommentarSkjema,
    }) => {
    const aktoerHarOpprettetElement = fnr === (element.opprettetAv && element.opprettetAv.fnr);
    return (
        <div className="knapperad__tiltak knapperad--justervenstre">
            { !lagreKommentarSkjema &&
            <div className="knapperad__element">
                <Knapp
                    mini
                    autoFocus={!skalVurdereTiltak(element, fnr)}
                    onClick={visLagreKommentarSkjema}>
                    {texts.tiltakInformasjonKnapper.buttonComment}
                </Knapp>
            </div>
            }
            { (aktoerHarOpprettetElement || !skalVurdereTiltak(element, fnr)) &&
            <div className="knapperad__element">
                <ButtonEditIcon
                    click={visLagreSkjema}
                />
            </div>
            }
            { aktoerHarOpprettetElement &&
            <div className="knapperad__element">
                <ButtonDeleteIcon
                    click={() => { sendSlett(element.tiltakId); }}
                />
            </div>
            }
        </div>
    );
};
TiltakInformasjonKnapper.propTypes = {
    element: tiltakPt,
    fnr: PropTypes.string,
    visLagreSkjema: PropTypes.func,
    sendSlett: PropTypes.func,
    lagreKommentarSkjema: PropTypes.bool,
    visLagreKommentarSkjema: PropTypes.func,
};

export default TiltakInformasjonKnapper;
