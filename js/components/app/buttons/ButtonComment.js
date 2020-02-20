import React from 'react';
import PropTypes from 'prop-types';

const texts = {
    title: 'Kommenter',
};

const ButtonComment = ({ count, onClick }) => {
    return (
        <button className="knapp--kommenter" onClick={onClick}>
            {`${texts.title} ${count ? `(${count})` : ''}`}
        </button>
    );
};

ButtonComment.propTypes = {
    count: PropTypes.number,
    onClick: PropTypes.func,
};

export default ButtonComment;
