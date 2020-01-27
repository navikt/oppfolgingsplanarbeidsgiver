import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { CSSTransition } from 'react-transition-group';
import { getContextRoot } from '../../../../routers/paths';

const IconAndText = styled.div`
    margin: 1em 0 0 0;
    display: flex;
`;

const Text = styled.p`
    margin: 0 .5em;
`;

const Icon = styled.img`
    width: 1.5em;
`;

const fadeOutDelay = 6000;
const DOMTimeoutDelay = 4000;


const FadingIconWithText = (
    {
        text,
    }) => {
    const [shouldShow, setShouldShow] = useState(true);

    useEffect(() => {
        setTimeout(() => { setShouldShow(false); }, fadeOutDelay);
    });

    return (<CSSTransition
        in={shouldShow}
        classNames="iconTextFade"
        appear
        timeout={DOMTimeoutDelay}
        unmountOnExit>
        <div>
            <IconAndText>
                <Icon src={`${getContextRoot()}/img/svg/hake-groenn.svg`} alt="hake" />
                <Text>{text}</Text>
            </IconAndText>
        </div>
    </CSSTransition>);
};

FadingIconWithText.propTypes = {
    text: PropTypes.string,
};

export default FadingIconWithText;
