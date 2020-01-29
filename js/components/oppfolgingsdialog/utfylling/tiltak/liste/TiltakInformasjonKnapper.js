import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
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

const TiltakButtonsRow = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 3fr;
    padding-top: 1em;
`;

const TiltakInformasjonKnapper = (
    {
        element,
        fnr,
        lagreSkjema,
        visLagreSkjema,
        sendSlett,
        lagreKommentarSkjema,
        visLagreKommentarSkjema,
    }) => {
    const aktoerHarOpprettetElement = fnr === (element.opprettetAv && element.opprettetAv.fnr);
    return (
        <TiltakButtonsRow>
            <div>
                {!lagreSkjema && (aktoerHarOpprettetElement || !skalVurdereTiltak(element, fnr)) &&
                <ButtonEditIcon
                    click={(event) => { visLagreSkjema(event); }}
                />
                }
            </div>
            <div>
                {aktoerHarOpprettetElement &&
                <ButtonDeleteIcon
                    click={(event) => {
                        sendSlett(event, element.tiltakId);
                    }}
                />
                }
            </div>
            <div>
                {!lagreKommentarSkjema &&
                <Knapp
                    mini
                    autoFocus={!skalVurdereTiltak(element, fnr)}
                    onClick={(event) => {
                        visLagreKommentarSkjema(event);
                    }}>
                    {texts.tiltakInformasjonKnapper.buttonComment}
                </Knapp>
                }
            </div>
        </TiltakButtonsRow>
    );
};
TiltakInformasjonKnapper.propTypes = {
    element: tiltakPt,
    fnr: PropTypes.string,
    lagreSkjema: PropTypes.bool,
    visLagreSkjema: PropTypes.func,
    sendSlett: PropTypes.func,
    lagreKommentarSkjema: PropTypes.bool,
    visLagreKommentarSkjema: PropTypes.func,
};

export default TiltakInformasjonKnapper;
