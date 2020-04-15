import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import * as opProptypes from '../../../../proptypes/opproptypes';
import ButtonDeleteIcon from '../../../app/buttons/ButtonDeleteIcon';
import MiniSpinner from '../../../MiniSpinner';

const ArbeidsoppgaveInformasjonKnapperStyled = styled.div`
    padding-top: 1em;
    text-align: left;
`;

const ArbeidsoppgaveInformasjonKnapper = (
    {
        arbeidsoppgave,
        fnr,
        sendSlett,
    }) => {
    const [sletter, setSletter] = useState(false);
    const arbeidsoppgaveId = arbeidsoppgave.arbeidsoppgaveId;
    const aktoerHarOpprettetElement = fnr === (arbeidsoppgave.opprettetAv && arbeidsoppgave.opprettetAv.fnr);
    return (
        aktoerHarOpprettetElement ? (
            <ArbeidsoppgaveInformasjonKnapperStyled className="arbeidsoppgaveInformasjonKnapper">
                {sletter
                    ? <MiniSpinner />
                    : <ButtonDeleteIcon
                        click={(event) => {
                            setSletter(true);
                            sendSlett(event, arbeidsoppgaveId);
                        }}
                    />
                }
            </ArbeidsoppgaveInformasjonKnapperStyled>
        ) : null
    );
};
ArbeidsoppgaveInformasjonKnapper.propTypes = {
    arbeidsoppgave: opProptypes.arbeidsoppgavePt,
    fnr: PropTypes.string,
    sendSlett: PropTypes.func,
};

export default ArbeidsoppgaveInformasjonKnapper;
