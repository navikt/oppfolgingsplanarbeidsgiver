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
        label,
    } = props;

    const feilmelding = meta.error && meta.touched
        ? { feilmelding: meta.error }
        : undefined;

    return (<Textarea
        maxLength={maxLength}
        id={id}
        feil={feilmelding}
        label={label}
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
    label: PropTypes.string,
};

export default Tekstomrade;
