import React from 'react';
import PropTypes from 'prop-types';

const ButtonEditIcon = ({ click, text }) => {
    return (
        <button
            className="knapp--endre"
            onClick={click}>
            {text}
        </button>
    );
};
ButtonEditIcon.propTypes = {
    click: PropTypes.func,
    text: PropTypes.string,
};
export default ButtonEditIcon;
