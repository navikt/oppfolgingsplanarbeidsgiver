import React from 'react';
import PropTypes from 'prop-types';
import Knapp from 'nav-frontend-knapper';

const texts = {
    buttonVurdering: 'Gi din vurdering',
};

const ButtonVurdering = (
    {
        click,
        text = texts.buttonVurdering,
    }) => {
    return (
        <Knapp
            mini
            autoFocus
            type="standard"
            onClick={click}>
            {text}
        </Knapp>
    );
};
ButtonVurdering.propTypes = {
    click: PropTypes.func,
    text: PropTypes.string,
};
export default ButtonVurdering;
