import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import * as opProptypes from '../../../../proptypes/opproptypes';

const texts = {
    buttonDelete: 'Slett',
};

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
    const arbeidsoppgaveId = arbeidsoppgave.arbeidsoppgaveId;
    const aktoerHarOpprettetElement = fnr === (arbeidsoppgave.opprettetAv && arbeidsoppgave.opprettetAv.fnr);
    return (
        aktoerHarOpprettetElement ? (<ArbeidsoppgaveInformasjonKnapperStyled className="arbeidsoppgaveInformasjonKnapper">
            <button
                type="button"
                onClick={(event) => { sendSlett(event, arbeidsoppgaveId); }}
                className="knapp--slett">
                {texts.buttonDelete}
            </button>
        </ArbeidsoppgaveInformasjonKnapperStyled>) : null
    );
};
ArbeidsoppgaveInformasjonKnapper.propTypes = {
    arbeidsoppgave: opProptypes.arbeidsoppgavePt,
    fnr: PropTypes.string,
    sendSlett: PropTypes.func,
};

export default ArbeidsoppgaveInformasjonKnapper;
