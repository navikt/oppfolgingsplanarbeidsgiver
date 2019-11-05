import React from 'react';
import PropTypes from 'prop-types';
import { Textarea } from 'nav-frontend-skjema';
import { fieldPropTypes } from '../proptypes/fieldproptypes';

const Tekstomrade = (props) => {
    const {
        meta,
        input,
        id,
        maxLength,
    } = props;

    const feilmelding = meta.error && meta.touched
        ? { feilmelding: meta.error }
        : undefined;

    return (<Textarea
        maxLength={maxLength}
        id={id}
        feil={feilmelding}
        {...input} />);
};

Tekstomrade.propTypes = {
    meta: fieldPropTypes.meta,
    id: PropTypes.string,
    rows: PropTypes.string,
    input: fieldPropTypes.input,
    className: PropTypes.string,
    placeholder: PropTypes.string,
    autoFocus: PropTypes.bool,
    maxLength: PropTypes.number,
};

export default Tekstomrade;
